import asyncio
from sqlalchemy import text
from app.db.session import engine

async def check():
    async with engine.connect() as conn:
        r = await conn.execute(text('SELECT count(*) FROM saved_jobs'))
        s_count = r.scalar()
        
        r = await conn.execute(text('SELECT count(*) FROM applied_jobs'))
        a_count = r.scalar()
        
        with open("baseline_results.txt", "w") as f:
            f.write(f"Saved jobs baseline: {s_count}\n")
            f.write(f"Applied jobs baseline: {a_count}\n")

if __name__ == "__main__":
    asyncio.run(check())
