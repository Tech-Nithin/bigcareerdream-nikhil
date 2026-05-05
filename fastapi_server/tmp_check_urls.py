import psycopg2
from dotenv import load_dotenv
import os

def check_urls():
    load_dotenv()
    db_url = os.getenv('DATABASE_URL')
    if not db_url:
        print("DATABASE_URL not found in .env")
        return

    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    queries = [
        ('dice_jobs', 'job_id', 'dice-cd055350-87b4-4d4e-b38c-6a03a832c10a'), 
        ('linkedin_jobs', 'job_id', '4388539742'), 
        ('greenhouse_lever_jobs', 'platform_job_id', 'platform_1001')
    ]
    
    for t, col, val in queries:
        try:
            print(f"--- Table: {t} ---")
            cur.execute(f"SELECT * FROM {t} WHERE {col} = %s", (val,))
            res = cur.fetchone()
            if res:
                # Get column names
                colnames = [desc[0] for desc in cur.description]
                row_dict = dict(zip(colnames, res))
                for k, v in row_dict.items():
                    if 'url' in k.lower() or 'link' in k.lower() or 'id' in k.lower():
                        print(f"  {k}: {v}")
            else:
                print(f"  No record found for {val}")
            print("\n")
        except Exception as e:
            print(f"Error checking {t}: {e}")
            conn.rollback()

    cur.close()
    conn.close()

if __name__ == "__main__":
    check_urls()
