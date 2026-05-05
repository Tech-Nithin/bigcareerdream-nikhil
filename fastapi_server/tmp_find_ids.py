import psycopg2
from dotenv import load_dotenv
import os

def find_sample_ids():
    load_dotenv()
    db_url = os.getenv('DATABASE_URL')
    if not db_url:
        print("DATABASE_URL not found in .env")
        return

    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    tables = [
        ('dice_jobs', 'job_id'),
        ('linkedin_jobs', 'job_id'),
        ('greenhouse_lever_jobs', 'platform_job_id'),
        ('jobs', 'id')
    ]
    
    for t_name, id_col in tables:
        try:
            cur.execute(f"SELECT {id_col} FROM {t_name} LIMIT 1")
            res = cur.fetchone()
            if res:
                print(f"Table: {t_name}, Sample ID: {res[0]}")
            else:
                print(f"Table: {t_name}, No data found.")
        except Exception as e:
            print(f"Error checking {t_name}: {e}")
            conn.rollback()

    cur.close()
    conn.close()

if __name__ == "__main__":
    find_sample_ids()
