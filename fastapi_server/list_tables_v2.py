import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

# Remove the query params to avoid asyncpg issues
url = 'postgresql+asyncpg://neondb_owner:npg_vcA2InE8xNrj@ep-sweet-union-anz0uxkb-pooler.c-6.us-east-1.aws.neon.tech/neondb'

async def main():
    try:
        # Use connect_args to pass ssl if needed, but for diag let's try straight connect first
        engine = create_async_engine(url)
        async with engine.connect() as conn:
            print("--- TABLES IN DATABASE ---")
            res = await conn.execute(text("""
                SELECT table_schema, table_name 
                FROM information_schema.tables 
                WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
            """))
            for r in res:
                print(f"{r[0]}.{r[1]}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
