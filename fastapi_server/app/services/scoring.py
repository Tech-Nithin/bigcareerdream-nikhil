# nikhil_a_new_job_board/nikhil_a_new_job_board/fastapi_server/app/services/scoring.py

import re
import math
from typing import List, Dict, Any, Optional
from ..utils.security import generate_secure_token, obfuscate_id

def extract_years(text: Any) -> int:
    """Extracts the first number found in text as years of experience."""
    if not text:
        return 0
    match = re.search(r'(\d+)', str(text))
    return int(match.group(1)) if match else 0

def get_variance(job_id: str, client_id: str) -> int:
    """Stable pseudo-random variance (-2 to +2) matching Node's Math.imul logic."""
    seed_str = f"{job_id}-{client_id}"
    h = 0
    for char in seed_str:
        # Node's Math.imul(31, hash) + charCodeAt(i) | 0
        h = (31 * h + ord(char)) & 0xFFFFFFFF
        # Handle signed 32-bit integer overflow like Javascript's | 0
        if h > 0x7FFFFFFF:
            h -= 0x100000000
            
    variance = (abs(h) % 5) - 2
    return variance

def get_workday_scored_job(job: Dict[str, Any], client: Optional[Dict[str, Any]], client_id: str) -> Dict[str, Any]:
    """Matches Node's getWorkdayScoredJob logic."""
    if not client:
        return {**job, "final_match_percent": 0}

    job_title = (job.get('title') or '').lower()
    job_description = (job.get('description') or '').lower()

    # 1. Domain Match
    client_domains = [s.strip().lower() for s in (client.get('client_job_domain') or '').split(',') if s.strip()]
    client_roles = [r.lower() for r in (client.get('client_chosen_alternative_jobroles') or [])]
    combined_domains = list(set(client_domains + client_roles))

    is_domain_match = False
    is_title_match = False

    for d in combined_domains:
        if d in job_title:
            is_domain_match = True
            is_title_match = True
        elif d in job_description:
            is_domain_match = True
        else:
            keywords = [k for k in d.split(' ') if len(k) > 3]
            if keywords and any(k in job_title for k in keywords):
                is_domain_match = True
                is_title_match = True
            elif keywords and any(k in job_description for k in keywords):
                is_domain_match = True

    # 2. Experience Match
    job_exp_req = extract_years(job.get('experience_level') or job.get('experience') or '')
    if job_exp_req == 0 and job_description:
        exp_match = re.search(r'(\d+)\+?\s*years?', job_description, re.IGNORECASE)
        if exp_match:
            job_exp_req = int(exp_match.group(1))

    client_exp = client.get('client_expereince_rounded') or 0
    is_exp_match = client_exp >= job_exp_req
    is_exp_close = abs(client_exp - job_exp_req) <= 2

    # 3. Skills Match
    def split_skills(s):
        return [sk.strip().lower() for sk in re.split(r'[,|]', str(s or '')) if sk.strip()]

    job_skills_arr = split_skills(job.get('skills'))
    client_skills_arr = split_skills(client.get('client_skills'))
    
    skill_overlap_percent = 0
    if client_skills_arr:
        intersect = [s for s in client_skills_arr if s in job_skills_arr or s in job_title or s in job_description]
        skill_overlap_percent = (len(intersect) / len(client_skills_arr)) * 100

    score = 0
    # Score Calculation
    if is_title_match and is_exp_match and skill_overlap_percent >= 50:
        score = 95
    elif is_title_match and is_exp_match:
        score = 90
    elif is_domain_match and (is_exp_match or is_exp_close) and skill_overlap_percent >= 30:
        score = 85
    elif is_domain_match and (is_exp_match or is_exp_close):
        score = 75
    elif skill_overlap_percent >= 50:
        score = 60
    elif skill_overlap_percent >= 30:
        score = 50
    elif is_domain_match or skill_overlap_percent > 0:
        score = 30
    else:
        score = 10

    match_level = "Low Match"
    if score >= 90: match_level = "High Match"
    elif score >= 75: match_level = "Mid Match"

    # Mask Link
    target_id = str(job.get('id', ''))
    secure_token = generate_secure_token(target_id, client_id)
    # Use settings.BASE_URL from core config
    from ..core.config import settings
    base_url = settings.BASE_URL
    masked_url = f"{base_url}/api/v1/jobs/redirect/{obfuscate_id(target_id)}?token={secure_token}&client_id={client_id}"

    return {
        **job,
        "final_match_percent": score,
        "match_level": match_level,
        "job_url": masked_url,
        "job_url_external": masked_url
    }

def get_scored_job(job: Dict[str, Any], client: Optional[Dict[str, Any]], client_id: str, options: Dict[str, Any] = {}) -> Dict[str, Any]:
    """Matches Node's getScoredJob logic."""
    include_details = options.get('includeDetails', False)
    
    skills = job.get('skills')
    skills_str = ", ".join(skills) if isinstance(skills, list) else str(skills or '')
    job_obj = {**job, "skills": skills_str}

    if client:
        # 1. experience_score (0-3)
        exp_req = extract_years(job.get('experience'))
        client_exp = client.get('client_expereince_rounded') or 0
        experience_score = 0
        if client_exp >= exp_req: experience_score = 3
        elif client_exp >= exp_req - 1: experience_score = 2
        elif client_exp >= exp_req - 2: experience_score = 1

        # 2. skills_score (0-3)
        def split_skills(s):
            return [sk.strip().lower() for sk in re.split(r'[,|]', str(s or '')) if sk.strip()]
        
        job_skills_arr = split_skills(skills_str)
        client_skills_arr = split_skills(client.get('client_skills'))
        
        intersect = [s for s in job_skills_arr if any(u == s or u in s or s in u for u in client_skills_arr)]
        skill_overlap = (len(intersect) / len(job_skills_arr)) if job_skills_arr else 0
        
        skills_score = 0
        if skill_overlap > 0.6: skills_score = 3
        elif skill_overlap > 0.3: skills_score = 2
        elif skill_overlap > 0: skills_score = 1

        # 3. domain_score (0-1)
        client_domains = [s.strip().lower() for s in (client.get('client_job_domain') or '').split(',') if s.strip()]
        client_roles = [r.lower() for r in (client.get('client_chosen_alternative_jobroles') or [])]
        combined_domains = list(set(client_domains + client_roles))
        
        is_domain_match = any(
            d in (job.get('title') or '').lower() or
            d in (job.get('description') or '').lower() or
            d in (job.get('tech_stack') or '').lower()
            for d in combined_domains
        )
        domain_score = 1 if is_domain_match else 0

        # 4. location_score (0-1)
        job_country = (job.get('location_country') or job.get('location_display') or '').lower()
        client_country = (client.get('client_country') or '').lower()
        
        is_location_match = False
        if client_country:
            us_aliases = ['us', 'usa', 'united states', 'united states of america', 'america']
            if client_country in us_aliases:
                is_location_match = any(alias in job_country or job_country == alias for alias in us_aliases)
            else:
                is_location_match = client_country in job_country or job_country in client_country
        location_score = 1 if is_location_match else 0

        # Calculate Final Percentage
        total_score = experience_score + skills_score + domain_score + location_score
        base_match_percent = 30 + (total_score * 8)
        
        is_remote = (
            job.get('is_remote') is True or
            str(job.get('is_remote')).lower() == 'true' or
            'remote' in str(job.get('work_location') or '').lower()
        )
        remote_bonus = 3 if is_remote else 0
        
        target_job_id = job.get('job_id') or job.get('jobId') or job.get('id')
        variance = get_variance(str(target_job_id), client_id)
        
        final_match_percent = min(100, max(0, base_match_percent + remote_bonus + variance))
        
        match_level = "Low Match"
        if final_match_percent >= 70: match_level = "High Match"
        elif final_match_percent >= 50: match_level = "Mid Match"

        # Mask Links
        secure_token = generate_secure_token(str(target_job_id), client_id)
        from ..core.config import settings
        base_url = settings.BASE_URL
        masked_url = f"{base_url}/api/v1/jobs/redirect/{obfuscate_id(str(target_job_id))}?token={secure_token}&client_id={client_id}"

        scored_job = {
            **job_obj,
            "experience_score": experience_score,
            "skills_score": skills_score,
            "domain_score": domain_score,
            "location_score": location_score,
            "total_score": total_score,
            "base_match_percent": base_match_percent,
            "remote_bonus": remote_bonus,
            "final_match_percent": final_match_percent,
            "match_level": match_level,
            "job_url": masked_url,
            "job_url_external": masked_url
        }

        if not include_details:
            scored_job.pop('description', None)
            scored_job.pop('tech_stack', None)

        return scored_job

    return job_obj
import os
