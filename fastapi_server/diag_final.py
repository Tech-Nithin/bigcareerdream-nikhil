import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

url = 'postgresql+asyncpg://neondb_owner:npg_vcA2InE8xNrj@ep-sweet-union-anz0uxkb-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require'

async def main():
    try:
        engine = create_async_engine(url)
        async with engine.connect() as conn:
            # Accounts
            print("--- ACCOUNTS ---")
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_schema = 'neon_auth' AND table_name = 'accounts'"))
            print([r[0] for r in res.fetchall()])

            # Users
            print("--- USERS ---")
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_schema = 'neon_auth' AND table_name = 'users'"))
            print([r[0] for r in res.fetchall()])
            
            # Transactions
            print("--- TRANSACTIONS ---")
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'transactions'"))
            print([r[0] for r in res.fetchall()])

        await engine.dispose()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
