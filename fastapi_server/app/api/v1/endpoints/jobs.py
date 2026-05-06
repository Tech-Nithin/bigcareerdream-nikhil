from fastapi import APIRouter, Depends, HTTPException, Query, Request, Body
from fastapi.responses import RedirectResponse
from typing import Optional, List, Dict, Any
import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.session import get_db
from app.core.config import settings
from app.services.storage import storage_service
from app.utils.security import deobfuscate_id, verify_secure_token, obfuscate_id
from app.services.scoring import get_scored_job, get_workday_scored_job
from app.utils.cache import cache  # ← In-memory TTL cache
from app.services.d1 import d1_service

router = APIRouter()

# Simple rate limiter for redirects (in-memory for now)
redirect_rate_limit = {} # { ip: { count, last_reset } }

def check_rate_limit(ip: str) -> bool:
    now = datetime.datetime.now().timestamp()
    record = redirect_rate_limit.get(ip, {"count": 0, "last_reset": now})
    
    if now - record["last_reset"] > 60:
        record["count"] = 0
        record["last_reset"] = now
        
    record["count"] += 1
    redirect_rate_limit[ip] = record
    return record["count"] <= 20

@router.get("/redirect/{hashed_id}")
async def job_redirect(
    hashed_id: str,
    request: Request,
    token: str = Query(...),
    client_id: str = Query(...),
    db: AsyncSession = Depends(get_db)
):
    """Secure redirect to the external job URL."""
    ip = request.client.host
    if not check_rate_limit(ip):
        raise HTTPException(status_code=429, detail="Too many requests")

    job_id = deobfuscate_id(hashed_id)
    if not job_id:
        raise HTTPException(status_code=400, detail="Invalid job identifier")

    if not verify_secure_token(job_id, client_id, token):
        raise HTTPException(status_code=403, detail="Link expired or invalid")

    # Determine table and fetch job_url
    is_numeric = job_id.isdigit()
    val_numeric = int(job_id) if is_numeric else None
    
    table_queries = []
    # Dice
    table_queries.append({"table": "dice_jobs", "id_col": "job_id", "val": job_id})
    if is_numeric: table_queries.append({"table": "dice_jobs", "id_col": "id", "val": val_numeric})
    table_queries.append({"table": "dice_job_links", "id_col": "job_id", "val": job_id})
    # LinkedIn
    table_queries.append({"table": "linkedin_jobs", "id_col": "job_id", "val": job_id})
    if is_numeric: table_queries.append({"table": "linkedin_jobs", "id_col": "id", "val": val_numeric})
    # Greenhouse/Lever
    table_queries.append({"table": "greenhouse_lever_jobs", "id_col": "platform_job_id", "val": job_id})
    if is_numeric: table_queries.append({"table": "greenhouse_lever_jobs", "id_col": "id", "val": val_numeric})
    # Generic Jobs
    if is_numeric: table_queries.append({"table": "jobs", "id_col": "id", "val": val_numeric})
    # Saved/Applied
    table_queries.append({"table": "saved_jobs", "id_col": "job_id", "val": job_id})
    if is_numeric: table_queries.append({"table": "saved_jobs", "id_col": "id", "val": val_numeric})
    table_queries.append({"table": "applied_jobs", "id_col": "job_id", "val": job_id})
    if is_numeric: table_queries.append({"table": "applied_jobs", "id_col": "id", "val": val_numeric})

    job_url = None
    for tq in table_queries:
        try:
            # We select * to find any possible URL column since naming varies
            query = text(f"SELECT * FROM {tq['table']} WHERE {tq['id_col']} = :job_id LIMIT 1")
            result = await db.execute(query, {"job_id": tq['val']})
            row = result.mappings().first()
            if row:
                # Priority: 1. External/Apply 2. Default Job URL 3. Platform specific
                job_url = (
                    row.get('job_url_external') or 
                    row.get('external_link') or
                    row.get('apply_url') or
                    row.get('job_url') or
                    row.get('job_url_dice')
                )
                if job_url: break
        except Exception as e:
            # Table mismatch or column missing, log and continue
            print(f"Redirect search failed in {tq['table']}: {e}")
            continue

    if not job_url:
        raise HTTPException(status_code=404, detail="Job link not found")

    return RedirectResponse(url=job_url)

@router.get("/dice-jobs")
async def get_dice_jobs(
    client_id: str = "client-1",
    page: int = 1,
    limit: int = 15,
    search: str = "",
    filter: str = "",
    date: str = "",
    db: AsyncSession = Depends(get_db)
):
    """
    Fetches scored jobs from dice_jobs.
    ON-DEMAND: Fetches ONLY the rows for the requested page from DB.
    No pre-loading. Page 1 = rows 1-15. Page 2 = rows 16-30. Etc.
    """
    try:
        offset = (page - 1) * limit

        # 1. Fetch Client — cached 30s (rarely changes)
        client_cache_key = f"client:{client_id}"
        client = cache.get(client_cache_key)
        if client is None:
            result = await db.execute(
                text("SELECT * FROM clients WHERE client_id = :client_id LIMIT 1"),
                {"client_id": client_id}
            )
            row = result.mappings().first()
            client = dict(row) if row else {}
            cache.set(client_cache_key, client, ttl=3600)

        # 2. Build WHERE conditions
        conditions = []
        params: dict = {"limit": limit, "offset": offset}

        if search:
            conditions.append("(title ILIKE :search OR company ILIKE :search OR skills ILIKE :search)")
            params["search"] = f"%{search}%"

        where_clause = (" WHERE " + " AND ".join(conditions)) if conditions else ""

        # 3. Get total count for this filter — so frontend knows total pages
        #    Cached 60s per search term
        count_cache_key = f"dice_count:{search}"
        total_count = cache.get(count_cache_key)
        if total_count is None:
            count_q = text(f"SELECT COUNT(*) FROM dice_job_links{where_clause}")
            count_result = await db.execute(count_q, {k: v for k, v in params.items() if k not in ('limit', 'offset')})
            total_count = count_result.scalar() or 0
            cache.set(count_cache_key, total_count, ttl=60)

        # 4. Fetch ONLY this page's rows from DB — true on-demand
        data_query = text(f"""
            SELECT
                job_id AS id, job_id, title, company, company_image_url,
                location_city, location_state, location_country,
                (location_city || ', ' || location_state || ', ' || location_country) AS location_display,
                is_remote, work_location, employment_type,
                date_posted, salary, salary_min, salary_max, salary_interval,
                experience, skills, description, job_url, job_url_external
            FROM dice_job_links
            {where_clause}
            ORDER BY date_posted DESC
            LIMIT :limit OFFSET :offset
        """)
        result = await db.execute(data_query, params)
        rows = result.mappings().all()

        # 5. Score only the fetched rows (just this page)
        scored_jobs = [
            get_scored_job(dict(row), client or None, client_id)
            for row in rows
        ]

        return {
            "success": True,
            "data": scored_jobs,
            "page": page,
            "limit": limit,
            "total": total_count,                        # Total records in DB for this filter
            "totalPages": -(-total_count // limit),      # Ceiling division
            "hasNextPage": (offset + limit) < total_count,
            "client_skills": client.get('client_skills', '') if client else ""
        }
    except Exception as e:
        print(f"❌ Error in get_dice_jobs: {e}")
        return {"success": False, "error": str(e), "data": [], "total": 0}

@router.get("/workday-jobs")
async def get_workday_jobs(
    client_id: str = "client-1",
    page: int = 1,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    """Fetches scored jobs from Cloudflare D1 (pre-computed scores)."""
    print(f"🔍 Fetching jobs for client_id: {client_id}")
    try:
        # 1. Fetch scored jobs from D1 (specifically greenhouse for this tab)
        scored_jobs = await d1_service.get_scored_jobs_for_client(client_id, platform="greenhouse")
        print(f"📊 D1 returned {len(scored_jobs)} scored jobs for {client_id}")
        
        # 2. Fetch Client Skills — Cached 1 hour
        client_cache_key = f"client:{client_id}"
        client_data = cache.get(client_cache_key)
        if client_data is None:
            client_query = text("SELECT * FROM clients WHERE client_id = :client_id LIMIT 1")
            result = await db.execute(client_query, {"client_id": client_id})
            client_row = result.mappings().first()
            client_data = dict(client_row) if client_row else {}
            cache.set(client_cache_key, client_data, ttl=3600)
        
        client_skills = client_data.get('client_skills', '')

        # 3. Normalize for frontend
        normalized = []
        for job in scored_jobs:
            normalized.append({
                "id": job.get("id"),
                "job_id": job.get("job_id"),
                "title": job.get("job_title"),
                "company": job.get("company_name"),
                "company_image_url": job.get("company_logo_url"),
                "location_display": job.get("location_display") or f"{job.get('location_city', '')}, {job.get('location_state', '')}".strip(", "),
                "is_remote": job.get("work_mode") == "Remote" or job.get("is_remote", False),
                "final_match_percent": job.get("score"),
                "match_level": job.get("match_level"),
                "skills": job.get("skills"),
                "description": job.get("description"),
                "job_url_external": job.get("job_url_external") or job.get("apply_url") or job.get("job_url"),
                "date_posted": job.get("created_at_utc"),
                "experience_score": job.get("exp_pts"),
                "skills_score": job.get("skills_pts"),
                "domain_score": 10 if job.get("domain_match") else 0,
                "location_score": 10 if job.get("location_match") else 0,
            })
            
        # 4. Pagination
        start = (page - 1) * limit
        end = start + limit
        page_data = normalized[start:end]
        
        return {
            "success": True,
            "data": page_data,
            "page": page,
            "limit": limit,
            "total": len(normalized),
            "totalPages": -(-len(normalized) // limit),
            "isPersonalized": True,
            "client_skills": client_skills,
            "scannedTotal": len(scored_jobs)
        }
    except Exception as e:
        print(f"❌ Error in get_workday_jobs (D1): {e}")
        return {"success": False, "error": str(e)}

# Factory-like approach for other job types

async def fetch_scored_jobs_from_d1(
    client_id: str, 
    page: int, 
    limit: int, 
    db: AsyncSession,
    platform: Optional[str] = None,
    w2_only: bool = False
):
    """Generic helper to fetch pre-computed scores from D1 and normalize for frontend."""
    try:
        # 1. Fetch scored jobs from D1
        scored_jobs = await d1_service.get_scored_jobs_for_client(client_id, platform=platform, w2_only=w2_only)
        
        # 2. Fetch Client Skills — Cached 1 hour
        client_cache_key = f"client:{client_id}"
        client_data = cache.get(client_cache_key)
        if client_data is None:
            client_query = text("SELECT * FROM clients WHERE client_id = :client_id LIMIT 1")
            result = await db.execute(client_query, {"client_id": client_id})
            client_row = result.mappings().first()
            client_data = dict(client_row) if client_row else {}
            cache.set(client_cache_key, client_data, ttl=3600)
        
        client_skills = client_data.get('client_skills', '')

        # 3. Normalize for frontend
        normalized = []
        for job in scored_jobs:
            normalized.append({
                "id": job.get("id"),
                "job_id": job.get("job_id"),
                "title": job.get("job_title") or job.get("title"),
                "company": job.get("company_name") or job.get("company"),
                "company_image_url": job.get("company_logo_url") or job.get("company_image_url"),
                "location_display": job.get("location_display") or f"{job.get('location_city', '')}, {job.get('location_state', '')}".strip(", "),
                "is_remote": job.get("work_mode") == "Remote" or job.get("is_remote", False),
                "final_match_percent": job.get("score"),
                "match_level": job.get("match_level"),
                "skills": job.get("skills"),
                "description": job.get("description"),
                "job_url_external": job.get("job_url_external") or job.get("apply_url") or job.get("job_url"),
                "date_posted": job.get("created_at_utc") or job.get("date_posted"),
                "experience_score": job.get("exp_pts"),
                "skills_score": job.get("skills_pts"),
                "domain_score": 10 if job.get("domain_match") else 0,
                "location_score": 10 if job.get("location_match") else 0,
            })
            
        # 4. Pagination
        start = (page - 1) * limit
        end = start + limit
        page_data = normalized[start:end]
        
        return {
            "success": True,
            "data": page_data,
            "page": page,
            "limit": limit,
            "total": len(normalized),
            "totalPages": -(-len(normalized) // limit),
            "isPersonalized": True,
            "client_skills": client_skills,
            "scannedTotal": len(scored_jobs)
        }
    except Exception as e:
        print(f"❌ Error fetching from D1: {e}")
        return {"success": False, "error": str(e)}

@router.get("/quick-apply-jobs")
async def get_quick_apply_jobs(
    client_id: str = "client-1",
    page: int = 1,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    return await fetch_scored_jobs_from_d1(client_id, page, limit, db)

@router.get("/linkedin-jobs")
async def get_linkedin_jobs(
    client_id: str = "client-1",
    page: int = 1,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    return await fetch_scored_jobs_from_d1(client_id, page, limit, db, platform="linkedin")

@router.get("/w2-jobs")
async def get_w2_jobs(
    client_id: str = "client-1",
    page: int = 1,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    return await fetch_scored_jobs_from_d1(client_id, page, limit, db, w2_only=True)

@router.get("/staffing-agency")
async def get_staffing_agency_jobs(
    client_id: str = "client-1",
    page: int = 1,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    """Fetches Staffing Agency jobs (Dice) from Cloudflare D1."""
    return await fetch_scored_jobs_from_d1(client_id, page, limit, db, platform="dice")


@router.get("/jobs-json")
async def get_all_jobs_json(db: AsyncSession = Depends(get_db)):
    """Generic endpoint for all jobs in JSON format."""
    try:
        query = text("SELECT * FROM dice_job_links ORDER BY date_posted DESC LIMIT 100")
        result = await db.execute(query)
        rows = result.mappings().all()
        return {"success": True, "data": [dict(row) for row in rows]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/details/{job_id}")
async def get_job_details(job_id: str, client_id: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    """Retrieves full details for a single job, checking D1 first then local tables."""
    
    # 1. Check Cloudflare D1 (Primary source for new system)
    try:
        d1_q = "SELECT * FROM cron_parsed_jobs WHERE job_id = ? OR id = ? LIMIT 1"
        d1_res = await d1_service.query(d1_q, [job_id, job_id])
        if d1_res:
            return {"success": True, "data": d1_res[0]}
    except Exception as e:
        print(f"⚠️ D1 detail fetch failed: {e}")

    # 2. Fallback: Search in all local tables (legacy)
    tables = [
        {"name": "dice_jobs", "id_col": "id"},
        {"name": "dice_jobs", "id_col": "job_id"},
        {"name": "dice_job_links", "id_col": "job_id"},
        {"name": "linkedin_jobs", "id_col": "id"},
        {"name": "linkedin_jobs", "id_col": "job_id"},
        {"name": "greenhouse_lever_jobs", "id_col": "id"},
        {"name": "greenhouse_lever_jobs", "id_col": "platform_job_id"},
        {"name": "jobs", "id_col": "id"},
        {"name": "saved_jobs", "id_col": "id"},
        {"name": "saved_jobs", "id_col": "job_id"},
        {"name": "applied_jobs", "id_col": "id"},
        {"name": "applied_jobs", "id_col": "job_id"}
    ]
    
    for t in tables:
        try:
            is_numeric = job_id.isdigit()
            val = int(job_id) if is_numeric else None
            if not is_numeric and t['id_col'] == 'id': continue
            
            query = text(f"SELECT * FROM {t['name']} WHERE {t['id_col']} = :job_id LIMIT 1")
            result = await db.execute(query, {"job_id": val if t['id_col'] == 'id' else job_id})
            row = result.mappings().first()
            if row:
                return {"success": True, "data": dict(row)}
        except:
            continue
            
    raise HTTPException(status_code=404, detail="Job not found")

def map_job_params(client_id, job):
    """Helper to map frontend/D1 job keys to Postgres table schema."""
    def to_str(val):
        if val is None: return None
        if isinstance(val, list): return ", ".join(map(str, val))
        return str(val)

    def to_int(val):
        try: return int(val) if val is not None else None
        except: return None

    def to_float(val):
        try: return float(val) if val is not None else None
        except: return None

    return {
        "client_id": client_id,
        "job_id": to_str(job.get("job_id") or job.get("jobId") or job.get("id")),
        "platform": to_str(job.get("platform")),
        "job_title": to_str(job.get("job_title") or job.get("title")),
        "normalized_title": to_str(job.get("normalized_title")),
        "domain": to_str(job.get("domain")),
        "company_name": to_str(job.get("company_name") or job.get("company") or job.get("companyName")),
        "company_logo_url": to_str(job.get("company_logo_url") or job.get("company_image_url") or job.get("companyImageUrl")),
        "company_url": to_str(job.get("company_url")),
        "location_city": to_str(job.get("location_city") or job.get("locationCity")),
        "location_state": to_str(job.get("location_state") or job.get("locationState")),
        "location_country": to_str(job.get("location_country") or job.get("locationCountry")),
        "work_mode": to_str(job.get("work_mode") or job.get("work_location") or job.get("workLocation")),
        "experience_min": to_int(job.get("experience_min")),
        "experience_max": to_int(job.get("experience_max")),
        "seniority_level": to_str(job.get("seniority_level")),
        "skills": to_str(job.get("skills")),
        "salary_min": to_float(job.get("salary_min") or job.get("salaryMin")),
        "salary_max": to_float(job.get("salary_max") or job.get("salaryMax")),
        "salary_currency": to_str(job.get("salary_currency")),
        "salary_interval": to_str(job.get("salary_interval") or job.get("salaryInterval")),
        "employment_type": to_str(job.get("employment_type")),
        "contract_type": to_str(job.get("contract_type") or job.get("job_type_label") or job.get("contractType")),
        "w2_c2c_type": to_str(job.get("w2_c2c_type") or job.get("w2C2cType")),
        "visa_requirements": to_str(job.get("visa_requirements")),
        "work_authorization": to_str(job.get("work_authorization")),
        "description": to_str(job.get("description")),
        "job_url": to_str(job.get("job_url") or job.get("jobUrl")),
        "job_url_external": to_str(job.get("job_url_external") or job.get("jobUrlExternal")),
        "apply_url": to_str(job.get("apply_url") or job.get("applyUrl")),
        "is_easy_apply": bool(job.get("is_easy_apply") or job.get("isEasyApply") or False),
        "created_at_utc": to_str(job.get("created_at_utc") or job.get("date_posted") or job.get("postedTime"))
    }



@router.post("/save")
async def save_job(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
    """Saves a job snapshot for a client in Cloudflare D1."""
    try:
        client_id = payload.get("client_id")
        job = payload.get("job")
        if not client_id or not job:
            raise HTTPException(status_code=400, detail="client_id and job data are required")
            
        sql = """
            INSERT OR IGNORE INTO saved_jobs (
                client_id, job_id, platform, job_title, normalized_title, domain,
                company_name, company_logo_url, company_url, location_city, location_state,
                location_country, work_mode, experience_min, experience_max, seniority_level,
                skills, salary_min, salary_max, salary_currency, salary_interval,
                employment_type, contract_type, w2_c2c_type, visa_requirements,
                work_authorization, description, job_url, job_url_external,
                apply_url, is_easy_apply, created_at_utc
            ) VALUES (
                ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?
            )
        """
        
        p = map_job_params(client_id, job)
        params = [
            p["client_id"], p["job_id"], p["platform"], p["job_title"], p["normalized_title"], p["domain"],
            p["company_name"], p["company_logo_url"], p["company_url"], p["location_city"], p["location_state"],
            p["location_country"], p["work_mode"], p["experience_min"], p["experience_max"], p["seniority_level"],
            p["skills"], p["salary_min"], p["salary_max"], p["salary_currency"], p["salary_interval"],
            p["employment_type"], p["contract_type"], p["w2_c2c_type"], p["visa_requirements"],
            p["work_authorization"], p["description"], p["job_url"], p["job_url_external"],
            p["apply_url"], 1 if p["is_easy_apply"] else 0, p["created_at_utc"]
        ]
        
        await d1_service.query(sql, params)
        return {"success": True}
    except Exception as e:
        print(f"❌ D1 Save Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/unsave")
async def unsave_job(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
    """Removes a saved job from Cloudflare D1."""
    try:
        client_id = payload.get("client_id")
        job_id = payload.get("job_id")
        if not client_id or not job_id:
            raise HTTPException(status_code=400, detail="client_id and job_id are required")
            
        sql = "DELETE FROM saved_jobs WHERE client_id = ? AND job_id = ?"
        await d1_service.query(sql, [client_id, str(job_id)])
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/saved/{client_id}")
async def get_saved_jobs(client_id: str, db: AsyncSession = Depends(get_db)):
    """Lists saved jobs from Cloudflare D1."""
    try:
        # Load Client for scoring — Cached 1 hour
        client_cache_key = f"client:{client_id}"
        client = cache.get(client_cache_key)
        if client is None:
            client_query = text("SELECT * FROM clients WHERE client_id = :client_id")
            result = await db.execute(client_query, {"client_id": client_id})
            client_row = result.mappings().first()
            client = dict(client_row) if client_row else {}
            cache.set(client_cache_key, client, ttl=3600)
        
        # Load Jobs (D1)
        sql = "SELECT * FROM saved_jobs WHERE client_id = ? ORDER BY saved_at DESC"
        saved_jobs = await d1_service.query(sql, [client_id])
        
        # Score Jobs
        scored_jobs = [get_scored_job(job, dict(client) if client else None, client_id, options={"includeDetails": True}) for job in saved_jobs]
        
        return {
            "success": True,
            "data": scored_jobs,
            "client_skills": client.get('client_skills', "") if client else "",
            "isPersonalized": True
        }
    except Exception as e:
        print(f"❌ Get saved jobs D1 error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/apply")
async def apply_job(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
    """Records a job application event in Cloudflare D1."""
    try:
        client_id = payload.get("client_id")
        job = payload.get("job")
        if not client_id or not job:
            raise HTTPException(status_code=400, detail="client_id and job data are required")
            
        sql_insert = """
            INSERT OR IGNORE INTO applied_jobs (
                client_id, job_id, platform, job_title, normalized_title, domain,
                company_name, company_logo_url, company_url, location_city, location_state,
                location_country, work_mode, experience_min, experience_max, seniority_level,
                skills, salary_min, salary_max, salary_currency, salary_interval,
                employment_type, contract_type, w2_c2c_type, visa_requirements,
                work_authorization, description, job_url, job_url_external,
                apply_url, is_easy_apply, created_at_utc
            ) VALUES (
                ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?
            )
        """
        
        p = map_job_params(client_id, job)
        params = [
            p["client_id"], p["job_id"], p["platform"], p["job_title"], p["normalized_title"], p["domain"],
            p["company_name"], p["company_logo_url"], p["company_url"], p["location_city"], p["location_state"],
            p["location_country"], p["work_mode"], p["experience_min"], p["experience_max"], p["seniority_level"],
            p["skills"], p["salary_min"], p["salary_max"], p["salary_currency"], p["salary_interval"],
            p["employment_type"], p["contract_type"], p["w2_c2c_type"], p["visa_requirements"],
            p["work_authorization"], p["description"], p["job_url"], p["job_url_external"],
            p["apply_url"], 1 if p["is_easy_apply"] else 0, p["created_at_utc"]
        ]
        
        await d1_service.query(sql_insert, params)
        
        # Remove from saved_jobs (D1)
        sql_delete = "DELETE FROM saved_jobs WHERE client_id = ? AND job_id = ?"
        await d1_service.query(sql_delete, [client_id, p["job_id"]])
        
        return {"success": True}
    except Exception as e:
        print(f"❌ D1 Apply Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/applied/{client_id}")
async def get_applied_jobs(client_id: str, db: AsyncSession = Depends(get_db)):
    """Lists applied jobs from Cloudflare D1."""
    try:
        # Load Client — Cached 1 hour
        client_cache_key = f"client:{client_id}"
        client = cache.get(client_cache_key)
        if client is None:
            client_query = text("SELECT * FROM clients WHERE client_id = :client_id")
            result = await db.execute(client_query, {"client_id": client_id})
            client_row = result.mappings().first()
            client = dict(client_row) if client_row else {}
            cache.set(client_cache_key, client, ttl=3600)
        
        # Load Jobs (D1)
        sql = "SELECT * FROM applied_jobs WHERE client_id = ? ORDER BY applied_at DESC"
        applied_jobs = await d1_service.query(sql, [client_id])
        
        # Score Jobs
        scored_jobs = [get_scored_job(job, dict(client) if client else None, client_id, options={"includeDetails": True}) for job in applied_jobs]
        
        return {
            "success": True,
            "data": scored_jobs,
            "client_skills": client.get('client_skills', "") if client else "",
            "isPersonalized": True
        }
    except Exception as e:
        print(f"❌ Get applied jobs D1 error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
