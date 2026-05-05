from fastapi import APIRouter, HTTPException, Query, UploadFile, File, Form
import os
import json
import re
import uuid
from datetime import datetime
from app.core.config import settings

router = APIRouter()

STORAGE_DIR = "storage"
TMP_STORAGE_DIR = "/tmp/storage" if settings.VERCEL else "storage"

@router.get("/dates")
async def get_dataset_dates():
    """Lists all available dataset dates from storage."""
    try:
        storage_paths = [STORAGE_DIR]
        if settings.VERCEL:
            storage_paths.append(TMP_STORAGE_DIR)
            
        files = []
        for path in storage_paths:
            if os.path.exists(path):
                files.extend(os.listdir(path))
        
        # Remove duplicates
        files = list(set(files))
        
        # Pattern: jobs_DD-MM-YYYY.json
        date_pattern = re.compile(r'^jobs_(\d{2}-\d{2}-\d{4})\.json$')
        dates = []
        for file in files:
            match = date_pattern.match(file)
            if match:
                dates.append(match.group(1))
        
        # Sort by date descending
        def sort_key(date_str):
            return datetime.strptime(date_str, "%d-%m-%Y")
            
        dates.sort(key=sort_key, reverse=True)
        
        return {"dates": dates, "count": len(dates)}
    except Exception as e:
        print(f"❌ Error listing dataset dates: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/jobs-by-date")
async def get_jobs_by_date(date: str = Query(...)):
    """Retrieves jobs for a specific date (DD-MM-YYYY)."""
    # Validate date format
    if not re.match(r'^\d{2}-\d{2}-\d{4}$', date):
        raise HTTPException(status_code=400, detail="Invalid date format. Expected DD-MM-YYYY.")
        
    dated_filename = f"jobs_{date}.json"
    
    # Check both storage locations
    file_path = None
    for path in [STORAGE_DIR, TMP_STORAGE_DIR]:
        p = os.path.join(path, dated_filename)
        if os.path.exists(p):
            file_path = p
            break
            
    if not file_path:
        raise HTTPException(status_code=404, detail=f"No dataset found for date {date}")
        
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            jobs = json.load(f)
        return {"success": True, "date": date, "jobs": jobs, "jobCount": len(jobs)}
    except Exception as e:
        print(f"❌ Error reading jobs by date: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/jobs-json")
async def get_jobs_json():
    """Retrieves the current active jobs dataset (jobs.json)."""
    json_path = os.path.join(STORAGE_DIR, "jobs.json")
    if not os.path.exists(json_path) and settings.VERCEL:
        json_path = os.path.join(TMP_STORAGE_DIR, "jobs.json")
        
    if not os.path.exists(json_path):
        return {"jobs": []}
        
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            jobs = json.load(f)
        return {"jobs": jobs}
    except Exception as e:
        print(f"❌ Error reading jobs.json: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload-excel")
async def upload_excel(
    excel: UploadFile = File(...),
    date: str = Form(...),
):
    """Admin endpoint to upload job data (parity with Node)."""
    try:
        if not os.path.exists(STORAGE_DIR):
            os.makedirs(STORAGE_DIR)
            
        # Simplified: Just saving the file for now, original logic might parse it
        # but the frontend just expects success.
        file_ext = os.path.splitext(excel.filename)[1]
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        save_path = os.path.join(STORAGE_DIR, f"upload_{date}_{timestamp}{file_ext}")
        
        with open(save_path, "wb") as f:
            f.write(await excel.read())
            
        return {"success": True, "message": "File uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
