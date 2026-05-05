import httpx
from typing import List, Dict, Any, Optional
from app.core.config import settings

class D1Service:
    def __init__(self):
        self.account_id = settings.CF_ACCOUNT_ID
        self.database_id = settings.CF_DATABASE_ID
        self.api_token = settings.CF_API_TOKEN
        self.base_url = f"https://api.cloudflare.com/client/v4/accounts/{self.account_id}/d1/database/{self.database_id}/query"
        
        self.headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json"
        }

    async def query(self, sql: str, params: List[Any] = None) -> List[Dict[str, Any]]:
        """Executes a SQL query on Cloudflare D1 and returns the result rows."""
        payload = {
            "sql": sql,
            "params": params or []
        }
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.post(self.base_url, headers=self.headers, json=payload)
                response.raise_for_status()
                data = response.json()
                
                if data.get("success"):
                    # D1 query returns a list of results, we usually want the first one's results
                    results = data.get("result", [])
                    if results and isinstance(results, list):
                        return results[0].get("results", [])
                    return []
                else:
                    error_msg = data.get("errors", [{}])[0].get("message", "Unknown D1 Error")
                    print(f"❌ D1 Query Error: {error_msg}")
                    return []
            except Exception as e:
                print(f"❌ D1 Connection Exception: {e}")
                return []

    async def get_scored_jobs_for_client(self, client_id: str, platform: Optional[str] = None, w2_only: bool = False) -> List[Dict[str, Any]]:
        """
        Fetches jobs for a specific client joined with their pre-computed scores.
        Optional filtering by platform or W2 type.
        """
        where_clauses = ["s.client_id = ?", "s.created_at_utc >= datetime('now', '-24 hours')"]
        params = [client_id]

        if platform:
            where_clauses.append("j.platform = ?")
            params.append(platform)
        
        if w2_only:
            where_clauses.append("(j.w2_c2c_type IS NOT NULL AND j.w2_c2c_type != 'N/A')")

        sql = f"""
            SELECT 
                j.*, 
                s.score, 
                s.match_level, 
                s.domain_match, 
                s.skills_pts, 
                s.exp_pts,
                s.location_match
            FROM client_job_scores s
            JOIN cron_parsed_jobs j ON s.job_id = j.id
            WHERE {" AND ".join(where_clauses)}
            ORDER BY s.score DESC
            LIMIT 200
        """
        return await self.query(sql, params)

d1_service = D1Service()
