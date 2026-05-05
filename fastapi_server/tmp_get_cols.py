import psycopg2
from dotenv import load_dotenv
import os

def get_cols(table_name):
    load_dotenv()
    db_url = os.getenv('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    cur.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}'")
    cols = [r[0] for r in cur.fetchall()]
    print(f"Table: {table_name}, Columns: {cols}")
    cur.close()
    conn.close()

if __name__ == "__main__":
    get_cols('dice_jobs')
    get_cols('linkedin_jobs')
    get_cols('greenhouse_lever_jobs')
    get_cols('jobs')
