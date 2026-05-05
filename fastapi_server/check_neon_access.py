import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from dotenv import load_dotenv

async def check_access():
    load_dotenv()
    url = os.getenv("DATABASE_URL")
    
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    connect_args = {}
    if "sslmode=require" in url or "sslmode=verify-full" in url:
        connect_args["ssl"] = True
    
    if "?" in url:
        url = url.split("?")[0]
        
    engine = create_async_engine(url, connect_args=connect_args)
    
    try:
        async with engine.connect() as conn:
            # 1. Get current user
            res = await conn.execute(text("SELECT current_user"))
            user = res.scalar()
            print(f"--- Current User: {user} ---\n")

            # 2. List tables and row counts
            print("--- Tables and Row Counts ---")
            result = await conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
                ORDER BY table_name
            """))
            tables = [row[0] for row in result.fetchall()]
            
            for table in tables:
                try:
                    count_res = await conn.execute(text(f'SELECT COUNT(*) FROM "{table}"'))
                    count = count_res.scalar()
                    print(f"Table: {table:<30} | Rows: {count}")
                except Exception as e:
                    print(f"Table: {table:<30} | Error: {e}")

            # 3. Check Privileges for common operations
            print("\n--- Privileges for Current User ---")
            priv_result = await conn.execute(text("""
                SELECT table_name, privilege_type
                FROM information_schema.table_privileges
                WHERE grantee = current_user AND table_schema = 'public'
                ORDER BY table_name, privilege_type
            """))
            
            current_table = None
            privs = []
            for row in priv_result.fetchall():
                if row[0] != current_table:
                    if current_table:
                        print(f"Table: {current_table:<30} | Privs: {', '.join(privs)}")
                    current_table = row[0]
                    privs = [row[1]]
                else:
                    privs.append(row[1])
            if current_table:
                print(f"Table: {current_table:<30} | Privs: {', '.join(privs)}")

            # 4. Check if we can create a temporary table (schema-level access)
            print("\n--- Testing Write Access (Temp Table) ---")
            try:
                await conn.execute(text("CREATE TEMP TABLE access_test (id int)"))
                await conn.execute(text("INSERT INTO access_test VALUES (1)"))
                await conn.execute(text("DROP TABLE access_test"))
                print("Temp table creation and insertion: SUCCESS")
            except Exception as e:
                print(f"Temp table creation and insertion: FAILED ({e})")

    except Exception as e:
        print(f"Error connecting to database: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(check_access())
