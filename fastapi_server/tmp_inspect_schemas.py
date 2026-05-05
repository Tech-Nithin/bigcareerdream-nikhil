import psycopg2
from dotenv import load_dotenv
import os

def inspect_schemas():
    load_dotenv()
    db_url = os.getenv('DATABASE_URL')
    if not db_url:
        print("DATABASE_URL not found in .env")
        return

    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    tables = [
        'linkedin_jobs', 
        'saved_jobs', 
        'applied_jobs', 
        'dice_jobs', 
        'greenhouse_lever_jobs', 
        'workday_icims'
    ]
    
    for t in tables:
        try:
            print(f"--- Table: {t} ---")
            cur.execute(f"SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '{t}'")
            cols = cur.fetchall()
            relevant_cols = []
            for col, dtype in cols:
                col_lower = col.lower()
                if 'id' in col_lower or 'url' in col_lower or 'link' in col_lower:
                    relevant_cols.append(f"  {col} ({dtype})")
            
            if relevant_cols:
                for rc in relevant_cols:
                    print(rc)
            else:
                print("  No ID or URL columns found.")
            print("\n")
        except Exception as e:
            print(f"Error inspecting {t}: {e}\n")
            conn.rollback()

    cur.close()
    conn.close()

if __name__ == "__main__":
    inspect_schemas()
