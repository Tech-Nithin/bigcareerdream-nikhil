import asyncio
from sqlalchemy import text
from app.db.session import engine

async def check():
    async with engine.connect() as conn:
        r = await conn.execute(text('SELECT count(*) FROM saved_jobs'))
        print(f"Saved jobs baseline: {r.scalar()}")
        
        r = await conn.execute(text('SELECT count(*) FROM applied_jobs'))
        print(f"Applied jobs baseline: {r.scalar()}")

if __name__ == "__main__":
    asyncio.run(check())
