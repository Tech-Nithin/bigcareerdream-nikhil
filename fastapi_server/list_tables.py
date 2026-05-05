import asyncio
from sqlalchemy import text
from app.db.session import engine

async def check_db():
    output = []
    async with engine.connect() as conn:
        try:
            res = await conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"))
            tables = [r[0] for r in res.fetchall()]
            output.append(f"Public tables: {tables}")
        except Exception as e:
            output.append(f"Tables check failed: {e}")

    with open("db_tables.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(output))

if __name__ == "__main__":
    asyncio.run(check_db())
