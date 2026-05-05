from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.session import get_db

router = APIRouter()

async def get_count(db: AsyncSession, table: str, condition: str = "") -> int:
    query = text(f"SELECT COUNT(*) as count FROM {table} {condition}")
    result = await db.execute(query)
    row = result.mappings().first()
    return row['count'] if row else 0

@router.get("/dashboard")
async def get_dashboard_stats(db: AsyncSession = Depends(get_db)):
    """Retrieves high-level dashboard statistics."""
    try:
        # Get counts from various tables
        job_count = await get_count(db, "dice_job_links")
        client_count = await get_count(db, "clients")
        lead_count = await get_count(db, "leads_information")
        active_client_count = await get_count(db, "clients", "WHERE is_active = TRUE")
        
        return {
            "success": True,
            "stats": {
                "totalJobs": job_count,
                "totalClients": client_count,
                "activeClients": active_client_count,
                "totalLeads": lead_count
            }
        }
    except Exception as e:
        print(f"❌ Dashboard stats error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/jobs-by-source")
async def get_jobs_by_source(db: AsyncSession = Depends(get_db)):
    """Retrieves job distribution by source."""
    try:
        dice_count = await get_count(db, "dice_job_links")
        workday_count = await get_count(db, "workday_icims")
        greenhouse_count = await get_count(db, "greenhouse_lever_jobs")
        linkedin_count = await get_count(db, "linkedin_jobs")
        
        return {
            "success": True,
            "data": [
                {"source": "Dice", "count": dice_count},
                {"source": "Workday/iCIMS", "count": workday_count},
                {"source": "Greenhouse/Lever", "count": greenhouse_count},
                {"source": "LinkedIn", "count": linkedin_count}
            ]
        }
    except Exception as e:
        print(f"❌ Jobs by source error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/scrapers-log")
async def get_scrapers_log(limit: int = 10, db: AsyncSession = Depends(get_db)):
    """Retrieves the recent scraper run logs."""
    try:
        query = text("SELECT * FROM scrapers_run_log ORDER BY run_at DESC LIMIT :limit")
        result = await db.execute(query, {"limit": limit})
        rows = result.mappings().all()
        return {"success": True, "data": [dict(row) for row in rows]}
    except Exception as e:
        print(f"❌ Scraper log error: {e}")
        return {"success": False, "data": [], "message": str(e)}
