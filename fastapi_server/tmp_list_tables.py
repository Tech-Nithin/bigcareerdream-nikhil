import psycopg2
from dotenv import load_dotenv
import os

def list_all_tables():
    load_dotenv()
    db_url = os.getenv('DATABASE_URL')
    if not db_url:
        print("DATABASE_URL not found in .env")
        return

    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    try:
        print("--- All Public Tables ---")
        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
        tables = cur.fetchall()
        for t in tables:
            print(f"  {t[0]}")
        print("\n")
    except Exception as e:
        print(f"Error listing tables: {e}\n")

    cur.close()
    conn.close()

if __name__ == "__main__":
    list_all_tables()
