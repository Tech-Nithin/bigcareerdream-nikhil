import asyncio
from sqlalchemy import text
from app.db.session import get_db, engine

async def check_db():
    async with engine.connect() as conn:
        # Check clients table
        try:
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'clients'"))
            cols = [r[0] for r in res.fetchall()]
            print(f"Clients columns: {cols}")
        except Exception as e:
            print(f"Clients check failed: {e}")

        # Check saved_jobs table
        try:
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'saved_jobs'"))
            cols = [r[0] for r in res.fetchall()]
            print(f"Saved_jobs columns: {cols}")
        except Exception as e:
            print(f"Saved_jobs check failed: {e}")

        # Check greenhouse_lever_jobs table
        try:
            res = await conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'greenhouse_lever_jobs'"))
            cols = [r[0] for r in res.fetchall()]
            print(f"Greenhouse_lever_jobs columns: {cols}")
        except Exception as e:
            print(f"Greenhouse check failed: {e}")

if __name__ == "__main__":
    asyncio.run(check_db())
