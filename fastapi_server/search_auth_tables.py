import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

url = 'postgresql+asyncpg://neondb_owner:npg_vcA2InE8xNrj@ep-sweet-union-anz0uxkb-pooler.c-6.us-east-1.aws.neon.tech/neondb?ssl=require'

async def main():
    try:
        engine = create_async_engine(url)
        # We try 'auth' schema and 'public' schema
        async with engine.connect() as conn:
            print("--- SEARCHING FOR USER/ACCOUNT TABLES ---")
            res = await conn.execute(text("""
                SELECT table_schema, table_name 
                FROM information_schema.tables 
                WHERE (table_name ILIKE '%user%' OR table_name ILIKE '%account%' OR table_name ILIKE '%session%')
                AND table_schema NOT IN ('information_schema', 'pg_catalog')
            """))
            for r in res:
                print(f"FOUND: {r[0]}.{r[1]}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
