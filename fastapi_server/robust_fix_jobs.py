import os

target_file = r'e:\nikhil_new_job_board\nikhil_a_new_job_board\nikhil_a_new_job_board\fastapi_server\app\api\v1\endpoints\jobs.py'

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Helper function to generate the robust parameter mapping
def get_params_block():
    return """        def to_str(val):
            if val is None: return ""
            if isinstance(val, list): return ", ".join(map(str, val))
            return str(val)

        params = {
            "client_id": client_id, 
            "job_id": job_id, 
            "job_url": to_str(job.get("job_url") or job.get("jobUrl")),
            "title": to_str(job.get("title")), 
            "company": to_str(job.get("company") or job.get("companyName")),
            "company_image_url": to_str(job.get("company_image_url") or job.get("companyImageUrl")),
            "location_city": to_str(job.get("location_city") or job.get("locationCity")), 
            "location_state": to_str(job.get("location_state") or job.get("locationState")), 
            "location_country": to_str(job.get("location_country") or job.get("locationCountry")),
            "location_display": to_str(job.get("location_display") or job.get("location")),
            "is_remote": str(job.get("is_remote") or job.get("isRemote") or False).lower(),
            "work_location": to_str(job.get("work_location") or job.get("workLocation")),
            "job_type_label": to_str(job.get("job_type_label") or job.get("contractType")),
            "w2_c2c_type": to_str(job.get("w2_c2c_type") or job.get("w2C2cType")),
            "employment_type": to_str(job.get("employment_type")), 
            "badge_job_type": to_str(job.get("badge_job_type") or job.get("badgeJobType")),
            "date_posted": to_str(job.get("date_posted") or job.get("postedTime")),
            "salary": to_str(job.get("salary")), 
            "salary_min": to_str(job.get("salary_min") or job.get("salaryMin")),
            "salary_max": to_str(job.get("salary_max") or job.get("salaryMax")),
            "salary_interval": to_str(job.get("salary_interval") or job.get("salaryInterval")), 
            "experience": to_str(job.get("experience") or job.get("experienceLevel")),
            "skills": to_str(job.get("skills")), 
            "job_url_external": to_str(job.get("job_url_external") or job.get("jobUrlExternal")),
            "description": to_str(job.get("description")), 
            "tech_stack": to_str(job.get("tech_stack") or job.get("techStack")),
            "scraped_at": to_str(job.get("scraped_at") or job.get("scrapedAt"))
        }"""

# 1. Replace params in save_job
import re
# Match the old params block which may vary in whitespace
pattern = r'params = \{.*?\}'
# We'll use a more conservative match based on start of the block
start_marker = 'params = {'
# Since we know line numbers 387-405 in current file (approximately)
# We'll replace the block in save_job and apply_job

# Let's just find the blocks and replace them.
# We'll do it differently to avoid regex issues with large blocks.

lines = content.split('\n')
new_lines = []
skip = False
for i, line in enumerate(lines):
    if 'params = {' in line and (i > 380 and i < 410 or i > 470 and i < 500):
        new_lines.append(get_params_block())
        skip = True
    elif skip and '}' in line:
        skip = False
        continue
    elif not skip:
        new_lines.append(line)

content = '\n'.join(new_lines)

# Also update the print error handling to include traceback
content = content.replace("print(f\"❌ Save job error: {e}\")", "import traceback; traceback.print_exc(); print(f\"❌ Save job error: {e}\")")
content = content.replace("print(f\"❌ Apply job error: {e}\")", "import traceback; traceback.print_exc(); print(f\"❌ Apply job error: {e}\")")

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Updated jobs.py with robust param mapping and error logging.")
