import urllib.request
import json
import os

def test_redirect():
    base_api = "http://localhost:4000/api/v1"
    client_id = "C-106"

    def fetch(url):
        try:
            with urllib.request.urlopen(url) as response:
                return json.loads(response.read().decode())
        except Exception as e:
            return {"success": False, "error": str(e)}

    print("--- Fetching a job to get its masked URL ---")
    res_json = fetch(f"{base_api}/jobs/linkedin-jobs?client_id={client_id}&limit=1")
    if res_json.get('success') and res_json.get('data'):
        job = res_json['data'][0]
        masked_url = job.get('job_url')
        print(f"  Masked URL: {masked_url}")

        if masked_url and masked_url != '#':
            print("\n--- Testing Redirect ---")
            try:
                # Need to handle redirect manually to check Location header
                class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
                    def http_error_302(self, req, fp, code, msg, headers):
                        return fp
                    http_error_301 = http_error_303 = http_error_307 = http_error_302
                
                opener = urllib.request.build_opener(NoRedirectHandler)
                response = opener.open(masked_url)
                print(f"  Status: {response.status}")
                print(f"  Redirect Location: {response.getheader('Location')}")
            except Exception as e:
                print(f"  Redirect Test Error: {e}")
    else:
        print(f"  Failed to fetch job for redirect test")

if __name__ == "__main__":
    test_redirect()
