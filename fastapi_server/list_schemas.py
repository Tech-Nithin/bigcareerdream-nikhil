import asyncio
from sqlalchemy import text
from app.db.session import engine

async def check_db():
    output = []
    async with engine.connect() as conn:
        try:
            res = await conn.execute(text("SELECT schema_name FROM information_schema.schemata"))
            schemas = [r[0] for r in res.fetchall()]
            output.append(f"All schemas: {schemas}")
        except Exception as e:
            output.append(f"Schemas check failed: {e}")

    with open("db_schemas.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(output))

if __name__ == "__main__":
    asyncio.run(check_db())
