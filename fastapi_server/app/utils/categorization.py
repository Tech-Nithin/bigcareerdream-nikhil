from typing import Any, Dict

def categorize_job(job: Dict[str, Any]) -> Dict[str, Any]:
    """Categorizes a job based on its application URL and contract type."""
    job_category = None
    apply_url = str(job.get('applyUrl') or '').lower()
    contract_type = str(job.get('contractType') or '')

    # Priority 1: Check for LinkedIn Apply
    if 'linkedin' in apply_url:
        job_category = 'LinkedIn Apply'
    # Priority 2: Check for Indeed Apply
    elif 'indeed' in apply_url:
        job_category = 'Indeed Apply'
    # Priority 3: Check for W2
    elif 'W2' in contract_type:
        job_category = 'W2'
    # Priority 4: Check for C2C or Contract to Hire
    elif 'C2C' in contract_type or 'Contract to Hire' in contract_type:
        job_category = 'C2C'
    # Priority 5: Staffing Agency (if none of the above but has contractType)
    elif contract_type and not any(k in contract_type for k in ['W2', 'C2C', 'Contract to Hire']):
        job_category = 'Staffing Agency'
    # Default
    else:
        job_category = 'Other'

    return {
        **job,
        'jobCategory': job_category
    }
