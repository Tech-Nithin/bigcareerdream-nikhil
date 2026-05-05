from fastapi import APIRouter
from .endpoints import health, jobs, datasets, onboarding, feedback, chat, stats, auth

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(jobs.router, prefix="/jobs", tags=["jobs"])
api_router.include_router(datasets.router, prefix="/datasets", tags=["datasets"])
api_router.include_router(onboarding.router, prefix="/onboarding", tags=["onboarding"])
api_router.include_router(feedback.router, prefix="/feedback", tags=["feedback"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(stats.router, prefix="/stats", tags=["stats"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
