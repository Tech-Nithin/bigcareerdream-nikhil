import psycopg2
from dotenv import load_dotenv
import os

def get_all_dice_cols():
    load_dotenv()
    db_url = os.getenv('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'dice_jobs'")
    cols = [r[0] for r in cur.fetchall()]
    for c in sorted(cols):
        print(c)
    cur.close()
    conn.close()

if __name__ == "__main__":
    get_all_dice_cols()
