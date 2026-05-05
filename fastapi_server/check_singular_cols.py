import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

url = 'postgresql+asyncpg://neondb_owner:npg_vcA2InE8xNrj@ep-sweet-union-anz0uxkb-pooler.c-6.us-east-1.aws.neon.tech/neondb?ssl=require'

async def main():
    try:
        engine = create_async_engine(url)
        print("--- COLUMNS FOR neon_auth.user ---")
        async with engine.connect() as conn:
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_schema = 'neon_auth' AND table_name = 'user'"))
            print([r[0] for r in res.fetchall()])

            print("\n--- COLUMNS FOR neon_auth.account ---")
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_schema = 'neon_auth' AND table_name = 'account'"))
            print([r[0] for r in res.fetchall()])
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
