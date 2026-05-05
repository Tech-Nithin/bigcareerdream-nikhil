import asyncio
import os
import json
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Clean Neon URL for asyncpg
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Strip query params and handle SSL
connect_args = {}
if "sslmode=require" in DATABASE_URL or "sslmode=verify-full" in DATABASE_URL:
    connect_args["ssl"] = True

if "?" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.split("?")[0]

async def list_all_tables():
    engine = create_async_engine(DATABASE_URL, connect_args=connect_args)
    schema_info = {}
    
    async with engine.connect() as conn:
        # 1. List all tables across ALL schemas (excluding system ones)
        result = await conn.execute(text("""
            SELECT table_schema, table_name 
            FROM information_schema.tables 
            WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
        """))
        all_tables = result.fetchall()
        print(f"Total tables found: {len(all_tables)}")
        
        for schema, table in all_tables:
            print(f"Table: {schema}.{table}")
            result = await conn.execute(text(f"""
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns
                WHERE table_schema = '{schema}' AND table_name = '{table}'
                ORDER BY ordinal_position
            """))
            columns = []
            for col in result.fetchall():
                columns.append({
                    "name": col[0],
                    "type": col[1],
                    "nullable": col[2],
                    "default": col[3]
                })
            schema_info[f"{schema}.{table}"] = columns

    await engine.dispose()
    
    with open("full_db_schema.json", "w") as f:
        json.dump(schema_info, f, indent=4)
    print("Full schema info saved to full_db_schema.json")

if __name__ == "__main__":
    asyncio.run(list_all_tables())
