import asyncio
from sqlalchemy import text
from app.db.session import engine

async def check_counts():
    tables = [
        'greenhouse_lever_jobs',
        'dice_jobs',
        'linkedin_jobs',
        'jobs'
    ]
    async with engine.connect() as conn:
        for table in tables:
            try:
                res = await conn.execute(text(f"SELECT count(*) FROM {table}"))
                count = res.scalar()
                print(f"{table}: {count} jobs")
            except Exception as e:
                print(f"{table}: failed ({e})")

if __name__ == "__main__":
    asyncio.run(check_counts())
