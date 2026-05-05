import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
import os

# Hardcoded for diagnostic only
url = 'postgresql+asyncpg://neondb_owner:npg_o1IksJOnuK3w@ep-sweet-union-anz0uxkb-pooler.us-east-1.aws.neon.tech/neondb?ssl=require'

async def main():
    try:
        engine = create_async_engine(url)
        async with engine.connect() as conn:
            # 1. Transactions columns
            print("\n--- TRANSACTIONS COLUMNS ---")
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'transactions'"))
            for r in res: print(r[0])

            # 2. Neon Auth Accounts columns
            print("\n--- NEON_AUTH.ACCOUNTS ---")
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_schema = 'neon_auth' AND table_name = 'accounts'"))
            for r in res: print(r[0])

            # 3. Neon Auth Users columns
            print("\n--- NEON_AUTH.USERS ---")
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_schema = 'neon_auth' AND table_name = 'users'"))
            for r in res: print(r[0])

        await engine.dispose()
    except Exception as e:
        print(f"\nERROR: {e}")

if __name__ == "__main__":
    asyncio.run(main())
