import psycopg2
import os
from dotenv import load_dotenv

# Use absolute path to .env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

DATABASE_URL = os.getenv("DATABASE_URL")

# Clean up DATABASE_URL if it has problematic params for some drivers
# (though psycopg2 usually handles them fine in the DSN)

sql = """
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='clients' AND column_name='has_seen_tour') THEN
        ALTER TABLE public.clients ADD COLUMN has_seen_tour BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

UPDATE public.clients SET has_seen_tour = FALSE WHERE has_seen_tour IS NULL;
"""

try:
    print(f"Connecting to database...")
    # Passing URL directly to connect()
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    cur = conn.cursor()
    
    print("Executing SQL to manage 'has_seen_tour' column...")
    cur.execute(sql)
    print("Migration completed successfully!")
    
    cur.close()
    conn.close()
except Exception as e:
    print(f"Error during migration: {str(e)}")
    import traceback
    traceback.print_exc()
