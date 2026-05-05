from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from typing import AsyncGenerator
from ..core.config import settings

# 1. Neon DB often uses postgres://... 
# SQLAlchemy requires postgresql+asyncpg://...
sync_url = settings.DATABASE_URL
if sync_url.startswith("postgres://"):
    database_url = sync_url.replace("postgres://", "postgresql+asyncpg://", 1)
elif sync_url.startswith("postgresql://"):
    database_url = sync_url.replace("postgresql://", "postgresql+asyncpg://", 1)
else:
    database_url = sync_url

# asyncpg is picky about query parameters. 
# We strip all query params and handle SSL via connect_args.
connect_args = {}
if "sslmode=require" in database_url or "sslmode=verify-full" in database_url:
    connect_args["ssl"] = True

# Strip everything after '?'
if "?" in database_url:
    database_url = database_url.split("?")[0]

# 2. Setup Async Engine (Lazy Initialization)
_engine = None
_AsyncSessionLocal = None

def get_engine():
    global _engine
    if _engine is None:
        if not database_url:
            raise ValueError("DATABASE_URL is not set in environment or settings.")
        
        _engine = create_async_engine(
            database_url,
            connect_args=connect_args,
            echo=settings.DEBUG,
            future=True,
            pool_size=20,          # Up from 5 — handles 1000 concurrent users
            max_overflow=30,       # Up from 10 — total max = 50 connections
            pool_pre_ping=True,    # Auto-detect dead connections
            pool_recycle=180,      # Down from 300 — Neon DB closes idle conns aggressively
            pool_timeout=30,       # Wait max 30s for a free connection before erroring
        )
    return _engine

def get_sessionmaker():
    global _AsyncSessionLocal
    if _AsyncSessionLocal is None:
        engine = get_engine()
        _AsyncSessionLocal = async_sessionmaker(
            bind=engine,
            class_=AsyncSession,
            expire_on_commit=False,
            autocommit=False,
            autoflush=False,
        )
    return _AsyncSessionLocal

# 4. Base class for ORM models
class Base(DeclarativeBase):
    pass

# 5. Dependency for endpoints
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency that provides a database session to each request.
    Ensures the session is closed after the request is finished.
    """
    SessionLocal = get_sessionmaker()
    async with SessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
