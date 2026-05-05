import os
import psycopg2
from dotenv import load_dotenv

# Path to .env
DOTENV_PATH = r'c:\Users\nithi\Downloads\bigcareerdream-main (7)\bigcareerdream-main\nikhil_a_new_job_board\nikhil_a_new_job_board\fastapi_server\.env'
OUTPUT_SQL = r'c:\Users\nithi\Downloads\bigcareerdream-main (7)\bigcareerdream-main\nikhil_a_new_job_board\nikhil_a_new_job_board\full_db_schema.sql'

def fetch_schema():
    load_dotenv(DOTENV_PATH)
    database_url = os.getenv('DATABASE_URL')
    
    if not database_url:
        print("❌ DATABASE_URL not found in .env")
        return

    # Clean the URL for psycopg2 (sometimes Neon URLs have extra params)
    # Simple way: just keep everything until the first '?'
    clean_url = database_url.split('?')[0] + "?sslmode=require"
    
    try:
        conn = psycopg2.connect(clean_url)
        cur = conn.cursor()
        print("Fetching table structures (SYNC)...")
        
        target_schemas = ['public', 'neon_auth']
        sql_output = []

        for schema in target_schemas:
            print(f"Processing schema: {schema}")
            sql_output.append(f"-- ─────────────────────────────────────────────────────────────\n"
                               f"-- SCHEMA: {schema}\n"
                               f"-- ─────────────────────────────────────────────────────────────\n")
            
            cur.execute(f"SELECT table_name FROM information_schema.tables WHERE table_schema = '{schema}' AND table_type = 'BASE TABLE' ORDER BY table_name")
            tables = [r[0] for r in cur.fetchall()]

            for table in tables:
                print(f"  Table: {table}")
                sql_output.append(f"-- Table: {schema}.{table}")
                sql_output.append(f"CREATE TABLE {schema}.\"{table}\" (")
                
                cur.execute(f"""
                    SELECT column_name, data_type, is_nullable, column_default, character_maximum_length, udt_name
                    FROM information_schema.columns 
                    WHERE table_schema = '{schema}' AND table_name = '{table}' 
                    ORDER BY ordinal_position
                """)
                cols_data = cur.fetchall()
                
                col_lines = []
                for col in cols_data:
                    name, dtype, nullable, default, char_len, udt_name = col
                    
                    final_type = dtype.upper()
                    if final_type == 'USER-DEFINED':
                        final_type = udt_name.upper()
                    elif char_len:
                        final_type = f"{final_type}({char_len})"
                    
                    line = f"    \"{name}\" {final_type}"
                    if nullable == 'NO':
                        line += " NOT NULL"
                    if default:
                        line += f" DEFAULT {default}"
                    
                    col_lines.append(line)
                
                sql_output.append(",\n".join(col_lines))
                sql_output.append(");\n")

        with open(OUTPUT_SQL, 'w', encoding='utf-8') as f:
            f.write("\n".join(sql_output))
        
        print(f"✅ Schema dump completed: {OUTPUT_SQL}")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fetch_schema()
