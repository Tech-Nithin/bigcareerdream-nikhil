import asyncio
from sqlalchemy import text
from app.db.session import engine

async def check_db():
    output = []
    async with engine.connect() as conn:
        # Check clients table
        try:
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'clients'"))
            cols = [r[0] for r in res.fetchall()]
            output.append(f"Clients columns: {cols}")
        except Exception as e:
            output.append(f"Clients check failed: {e}")

        # Check saved_jobs table
        try:
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'saved_jobs'"))
            cols = [r[0] for r in res.fetchall()]
            output.append(f"Saved_jobs columns: {cols}")
        except Exception as e:
            output.append(f"Saved_jobs check failed: {e}")

        # Check greenhouse_lever_jobs table
        try:
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'greenhouse_lever_jobs'"))
            cols = [r[0] for r in res.fetchall()]
            output.append(f"Greenhouse_lever_jobs columns: {cols}")
        except Exception as e:
            output.append(f"Greenhouse check failed: {e}")

    with open("db_schema_actual.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(output))

if __name__ == "__main__":
    asyncio.run(check_db())
