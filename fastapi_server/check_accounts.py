import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

url = 'postgresql+asyncpg://neondb_owner:npg_vcA2InE8xNrj@ep-sweet-union-anz0uxkb-pooler.c-6.us-east-1.aws.neon.tech/neondb?ssl=require'

async def main():
    try:
        engine = create_async_engine(url)
        # Using raw connection to avoid some SA overhead for this check
        async with engine.connect() as conn:
            print("--- NEON_AUTH.ACCOUNTS ---")
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_schema = 'neon_auth' AND table_name = 'accounts'"))
            for r in res: print(r[0])
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
