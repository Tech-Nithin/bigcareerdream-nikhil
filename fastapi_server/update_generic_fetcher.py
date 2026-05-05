import os

target_file = r'e:\nikhil_new_job_board\nikhil_a_new_job_board\nikhil_a_new_job_board\fastapi_server\app\api\v1\endpoints\jobs.py'

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update get_generic_scored_jobs to include more fields
old_job_dict = """        job = {
            "id": target_id,
            "title": row.get(field_map["title"]),
            "company": row.get(field_map["company"]),
            "location_city": row.get(field_map["location_city"]),
            "location_state": row.get(field_map["location_state"]),
            "location_country": row.get(field_map["location_country"]),
            "location_display": row.get(field_map.get("location_display", "location_display")),
            "job_url": row.get(field_map["url"]),
            "description": row.get(field_map["description"]),
            "scraped_at": str(row.get(field_map["scraped_at"]) or ""),
        }"""

new_job_dict = """        job = {
            "id": target_id,
            "job_id": row.get("platform_job_id") or row.get("job_id") or target_id,
            "title": row.get(field_map["title"]),
            "company": row.get(field_map["company"]),
            "location_city": row.get(field_map["location_city"]),
            "location_state": row.get(field_map["location_state"]),
            "location_country": row.get(field_map["location_country"]),
            "location_display": row.get(field_map.get("location_display", "location_display")) or row.get("location"),
            "job_url": row.get(field_map["url"]),
            "description": row.get(field_map["description"]),
            "scraped_at": str(row.get(field_map["scraped_at"]) or ""),
            "is_remote": row.get("is_remote") or False,
            "salary": row.get("salary_text") or row.get("salary"),
            "skills": row.get("skills"),
            "tech_stack": row.get("tech_stack"),
            "posted_date": str(row.get("posted_at") or row.get("date_posted") or "")
        }"""

if old_job_dict in content:
    content = content.replace(old_job_dict, new_job_dict)
    print("✅ Updated get_generic_scored_jobs dictionary.")
else:
    print("❌ Could not find old_job_dict for replacement.")

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(content)
