import os
import psycopg2
from dotenv import load_dotenv

load_dotenv('fastapi_server/.env')
DATABASE_URL = os.getenv("DATABASE_URL")

def check_tables():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'")
    tables = cur.fetchall()
    print("Tables found in public schema:")
    for t in tables:
        print(f"- {t[0]}")
    cur.close()
    conn.close()

if __name__ == "__main__":
    check_tables()
