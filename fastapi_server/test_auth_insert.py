import asyncio
import sys
import os

# Add the server root to the PYTHONPATH so 'app' can be imported
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.api.v1.endpoints.auth import create_neon_auth_user
from app.db.session import database_url, connect_args
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

async def test_insert():
    print(f"Connecting to: {database_url.split('@')[-1]}")
    engine = create_async_engine(database_url, connect_args=connect_args, echo=True)
    SessionLocal = async_sessionmaker(bind=engine, class_=AsyncSession)
    
    email = "test.antigravity.paypal@example.com"
    password = "bigcareerdream@1092"
    name = "Test Agent User"
    
    async with SessionLocal() as db:
        print(f"\n--- Testing create_neon_auth_user for {email} ---")
        try:
            success = await create_neon_auth_user(db, email, password, name=name)
            if success:
                print("\n✅ User successfully inserted into 'neon_auth.user' and 'neon_auth.account'!")
                # Let's delete the user to clean up
                from sqlalchemy import text
                await db.execute(text('DELETE FROM "neon_auth"."account" WHERE "userId" IN (SELECT id FROM "neon_auth"."user" WHERE email = :email)'), {"email": email})
                await db.execute(text('DELETE FROM "neon_auth"."user" WHERE email = :email'), {"email": email})
                await db.commit()
                print("🧹 Test user cleaned up.")
            else:
                print("\n❌ Failed to insert user.")
        except Exception as e:
            print(f"\n❌ Exception occurred: {e}")

if __name__ == "__main__":
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(test_insert())
