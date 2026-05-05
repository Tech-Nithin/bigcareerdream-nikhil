import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv
from sqlalchemy import text

async def test_connection():
    # Load .env
    load_dotenv()
    
    url = os.getenv("DATABASE_URL")
    if not url:
        print("❌ DATABASE_URL not found in .env")
        return

    # Neon fix for SQLAlchemy + asyncpg
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    # asyncpg is picky about query parameters. 
    # We strip all query params and handle SSL via connect_args.
    connect_args = {}
    if "sslmode=require" in url or "sslmode=verify-full" in url:
        connect_args["ssl"] = True
    
    # Strip everything after '?'
    if "?" in url:
        url = url.split("?")[0]
    
    print(f"Connecting to Neon...")
    
    try:
        engine = create_async_engine(url, connect_args=connect_args)
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            print("Connection Successful!")
            print(f"Result of 'SELECT 1': {result.scalar()}")
        await engine.dispose()
    except Exception as e:
        print(f"Connection Failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_connection())
