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
    output = []
    async with engine.connect() as conn:
        for table in tables:
            try:
                res = await conn.execute(text(f"SELECT count(*) FROM {table}"))
                count = res.scalar()
                output.append(f"{table}: {count} jobs")
            except Exception as e:
                output.append(f"{table}: failed ({e})")
    
    with open("job_counts_result.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(output))

if __name__ == "__main__":
    asyncio.run(check_counts())
