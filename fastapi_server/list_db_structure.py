import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

url = 'postgresql+asyncpg://neondb_owner:npg_vcA2InE8xNrj@ep-sweet-union-anz0uxkb-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require'

async def main():
    try:
        engine = create_async_engine(url)
        async with engine.connect() as conn:
            # 1. List all schemas
            print("--- SCHEMAS ---")
            res = await conn.execute(text("SELECT schema_name FROM information_schema.schemata"))
            for r in res: print(r[0])

            # 2. List all tables in all schemas (except system ones)
            print("\n--- TABLES ---")
            res = await conn.execute(text("""
                SELECT table_schema, table_name 
                FROM information_schema.tables 
                WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
                ORDER BY table_schema, table_name
            """))
            for r in res:
                print(f"{r[0]}.{r[1]}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
