import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
import os
import sys

# Add the current directory to sys.path so we can import app
sys.path.append(os.getcwd())

from app.core.config import settings

async def main():
    print(f"Connecting to: {settings.DATABASE_URL[:20]}...")
    engine = create_async_engine(settings.DATABASE_URL)
    async with engine.connect() as conn:
        # Check Accounts
        print("\nChecking neon_auth.accounts columns:")
        res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_schema = 'neon_auth' AND table_name = 'accounts'"))
        cols = [r[0] for r in res.fetchall()]
        print(cols)

        # Check Users
        print("\nChecking neon_auth.users columns:")
        res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_schema = 'neon_auth' AND table_name = 'users'"))
        cols = [r[0] for r in res.fetchall()]
        print(cols)

        # Check Transactions
        print("\nChecking transactions columns:")
        res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'transactions'"))
        cols = [r[0] for r in res.fetchall()]
        print(cols)

    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(main())
