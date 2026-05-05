import json
import urllib.request
import os

def test_api():
    base_api = "http://localhost:4000/api/v1"
    client_id = "C-106"

    def fetch(url):
        try:
            with urllib.request.urlopen(url) as response:
                return json.loads(response.read().decode())
        except Exception as e:
            return {"success": False, "error": str(e)}

    print("--- Testing LinkedIn Apply Jobs ---")
    res_json = fetch(f"{base_api}/jobs/linkedin-jobs?client_id={client_id}&limit=1")
    if res_json.get('success') and res_json.get('data'):
        job = res_json['data'][0]
        print(f"  Title: {job.get('title')}")
        print(f"  Job ID: {job.get('job_id') or job.get('id')}")
        print(f"  Job URL: {job.get('job_url')}")
    else:
        print(f"  Failed: {res_json.get('error', 'No data')}")

    print("\n--- Testing W2 & C2C Jobs ---")
    res_json = fetch(f"{base_api}/jobs/w2-jobs?client_id={client_id}&limit=1")
    if res_json.get('success') and res_json.get('data'):
        job = res_json['data'][0]
        print(f"  Title: {job.get('title')}")
        print(f"  Job ID: {job.get('jobId') or job.get('job_id') or job.get('id')}")
        print(f"  Job URL: {job.get('job_url')}")
    else:
        print(f"  Failed: {res_json.get('error', 'No data')}")

if __name__ == "__main__":
    test_api()
