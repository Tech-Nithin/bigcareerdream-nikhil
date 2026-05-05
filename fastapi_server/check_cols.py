import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

url = 'postgresql+asyncpg://neondb_owner:npg_vcA2InE8xNrj@ep-sweet-union-anz0uxkb-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require'

async def main():
    try:
        engine = create_async_engine(url)
        async with engine.connect() as conn:
            # Check for accounts table columns in neon_auth
            # We try 'accounts' and 'account'
            for tbl in ['accounts', 'account']:
                res = await conn.execute(text(f"SELECT column_name FROM information_schema.columns WHERE table_schema = 'neon_auth' AND table_name = '{tbl}'"))
                cols = [r[0] for r in res.fetchall()]
                if cols:
                    print(f"COLUMNS FOR neon_auth.{tbl}:")
                    print(cols)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
