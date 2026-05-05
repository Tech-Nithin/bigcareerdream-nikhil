import asyncio
from sqlalchemy import text
from app.db.session import engine

async def check_db():
    output = []
    async with engine.connect() as conn:
        for table in ['users', 'leads', 'dice_jobs', 'transactions', 'jobs']:
            try:
                res = await conn.execute(text(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table}'"))
                cols = [r[0] for r in res.fetchall()]
                output.append(f"{table} columns: {cols}")
            except Exception as e:
                output.append(f"{table} check failed: {e}")

    with open("db_schema_actual_v2.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(output))

if __name__ == "__main__":
    asyncio.run(check_db())
