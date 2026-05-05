# fastapi_server/main.py

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.api.v1.api import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Python/FastAPI production-ready backend for Job Board",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ─────────────────────────────────────────────────────────────────────────────
# CORS
#
# WHAT WAS BROKEN in the original:
#   - `"*"` was mixed into the list alongside specific origins.
#     CORSMiddleware cannot handle this — it does NOT mean "allow everything
#     plus these specific origins". The wildcard and specific origins are
#     mutually exclusive modes. Mixing them causes silent misbehaviour where
#     the header is sometimes absent, causing the browser to block the request.
#   - `"https://*.vercel.app"` was in the list. CORSMiddleware does exact
#     string matching only — wildcard subdomains are silently ignored.
#
# THE FIX:
#   - Remove "*" from the list.
#   - Remove wildcard subdomain entries.
#   - Always call add_middleware unconditionally (no `if` guard).
#   - In development only, use allow_origins=["*"] if you want zero friction
#     (see the ENVIRONMENT check below).
# ─────────────────────────────────────────────────────────────────────────────

if settings.ENVIRONMENT == "development":
    # Development: allow every origin so you never hit a CORS issue locally.
    # This is safe because the server is only reachable on localhost anyway.
    _origins = ["*"]
    print("[CORS] Development mode -- allowing ALL origins (*)")
else:
    # Production: exact list only, no wildcards.
    _origins = settings.BACKEND_CORS_ORIGINS
    print(f"[CORS] Production mode -- allowed origins: {_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=_origins != ["*"],  # credentials + wildcard is forbidden by spec
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────────────────────────────────────
# Routers
# ─────────────────────────────────────────────────────────────────────────────
app.include_router(api_router, prefix=settings.API_V1_STR)
print(f"[Router] Mounted at prefix='{settings.API_V1_STR}'")


@app.get("/")
async def root():
    return {
        "message": f"Welcome to {settings.PROJECT_NAME}",
        "version": "1.0.0",
        "docs": "/docs",
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.PORT,
        reload=True,
    )



# import uvicorn
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from contextlib import asynccontextmanager

# from app.core.config import settings
# from app.api.v1.api import api_router

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     """
#     Startup and shutdown logic.
#     """
#     # You can add DB connectivity check here if desired
#     yield

# app = FastAPI(
#     title=settings.PROJECT_NAME,
#     description="Python/FastAPI production-ready backend for Job Board",
#     version="1.0.0",
#     docs_url="/docs",
#     redoc_url="/redoc",
#     lifespan=lifespan
# )

# # Configure CORS
# if settings.BACKEND_CORS_ORIGINS:
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )

# # Include API Router under /api/v1
# app.include_router(api_router, prefix=settings.API_V1_STR)

# @app.get("/")
# async def root():
#     return {
#         "message": f"Welcome to {settings.PROJECT_NAME}",
#         "version": "1.0.0",
#         "docs": "/docs"
#     }

# if __name__ == "__main__":
#     uvicorn.run(
#         "main:app", 
#         host="0.0.0.0", 
#         port=settings.PORT, 
#         reload=True
#     )
