import os
import psycopg2
from dotenv import load_dotenv

load_dotenv('fastapi_server/.env')
DATABASE_URL = os.getenv("DATABASE_URL")

def check_columns(table_name):
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}'")
    columns = cur.fetchall()
    print(f"Columns in {table_name}:")
    for c in columns:
        print(f"- {c[0]}")
    cur.close()
    conn.close()

if __name__ == "__main__":
    check_columns("linkedin_jobs")
    print("\n" + "="*20 + "\n")
    check_columns("dice_jobs")
