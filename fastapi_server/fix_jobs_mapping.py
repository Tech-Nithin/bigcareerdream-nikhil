import os

target_file = r'e:\nikhil_new_job_board\nikhil_a_new_job_board\nikhil_a_new_job_board\fastapi_server\app\api\v1\endpoints\jobs.py'

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace location mapping in save_job and apply_job
content = content.replace(
    '"location_city": job.get("location_city"), "location_state": job.get("location_state"), "location_country": job.get("location_country"),',
    '"location_city": job.get("location_city") or job.get("locationCity"), "location_state": job.get("location_state") or job.get("locationState"), "location_country": job.get("location_country") or job.get("locationCountry"),'
)

# Replace is_remote mapping
content = content.replace(
    '"is_remote": str(job.get("is_remote") or False).lower(),',
    '"is_remote": str(job.get("is_remote") or job.get("isRemote") or False).lower(),'
)

# Replace scraped_at mapping
content = content.replace(
    '"scraped_at": job.get("scraped_at")',
    '"scraped_at": job.get("scraped_at") or job.get("scrapedAt")'
)

# Replace others like company and image
content = content.replace(
    '"company": job.get("company") or job.get("companyName"),',
    '"company": job.get("company") or job.get("companyName"),'
)

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Successfully updated jobs.py mappings.")
