# fastapi_server/app/core/config.py
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional, Union

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=[".env", "../.env", "../../.env", "../../../.env", "../../../../.env", "../../../../../.env"],
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

    # Base
    PROJECT_NAME: str = "Job Board API"
    API_V1_STR: str = "/api/v1"
    PORT: int = 4000
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # ── CORS ──────────────────────────────────────────────────────────────────
    # CRITICAL FIXES vs original:
    #   1. Removed "*" from the list — mixing "*" with specific origins breaks
    #      CORSMiddleware silently. Use allow_origins=["*"] ONLY if you want
    #      to allow every origin (fine for dev, bad for production).
    #   2. Removed "https://*.vercel.app" — CORSMiddleware does exact string
    #      matching; wildcard subdomains are silently ignored.
    #   3. Added localhost:5174 (Vite's fallback port).
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://localhost:4000",
        "https://bigcareerdream-merged.vercel.app",
    ]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            v = v.strip()
            if v.startswith("["):
                import json
                try:
                    return [i.strip() for i in json.loads(v) if i.strip()]
                except json.JSONDecodeError:
                    pass
            return [i.strip() for i in v.split(",") if i.strip()]
        if isinstance(v, list):
            return [str(i).strip() for i in v if str(i).strip()]
        raise ValueError(f"Cannot parse BACKEND_CORS_ORIGINS: {v}")

    # Security
    URL_SECRET: str = "career-intelligence-salt-2024"
    GROQ_API_KEY: Optional[str] = None

    # Database
    DATABASE_URL: str = ""

    # Cloudflare R2
    R2_BUCKET_NAME: Optional[str] = "client-resumes"
    R2_ACCOUNT_ID: Optional[str] = "ea32e451b7cbc21b96a99283089bd292"
    R2_ACCESS_KEY_ID: Optional[str] = None
    R2_SECRET_ACCESS_KEY: Optional[str] = None
    R2_PUBLIC_URL: Optional[str] = None

    # Cloudflare D1
    CF_ACCOUNT_ID: Optional[str] = None
    CF_DATABASE_ID: Optional[str] = None
    CF_API_TOKEN: Optional[str] = None

    # Gmail SMTP
    GMAIL_USER: Optional[str] = None
    GMAIL_APP_PASSWORD: Optional[str] = None

    # PayPal
    PAYPAL_CLIENT_ID: Optional[str] = None
    PAYPAL_CLIENT_SECRET: Optional[str] = None
    PAYPAL_MODE: str = "sandbox"

    # Misc
    CLOUDFLARE_SECRET_VALIDATION_TOKEN: Optional[str] = "career-board-cloudflare-token-2024"
    PARSER_URL: str = "https://resume-parser-22feb.vercel.app/parse-resume"
    BASE_URL: str = "http://localhost:4000"
    VERCEL: bool = False


settings = Settings()

# -- Startup diagnostics -------------------------------------------------------
print(f"[config] ENVIRONMENT           = {settings.ENVIRONMENT}")
print(f"[config] PORT                  = {settings.PORT}")
print(f"[config] API_V1_STR            = {settings.API_V1_STR}")
print(f"[config] DATABASE_URL          = {'SET' if settings.DATABASE_URL else 'NOT SET'}")
print(f"[config] GMAIL_USER            = {'SET' if settings.GMAIL_USER else 'NOT SET'}")
print(f"[config] GMAIL_PASS            = {'SET' if settings.GMAIL_APP_PASSWORD else 'NOT SET'}")
print(f"[config] BACKEND_CORS_ORIGINS  = {settings.BACKEND_CORS_ORIGINS}")
print(f"[config] CF_DATABASE_ID        = {'SET' if settings.CF_DATABASE_ID else 'NOT SET'}")
print(f"[config] CF_API_TOKEN          = {'SET' if settings.CF_API_TOKEN else 'NOT SET'}")





# # fastapi_server/app/core/config.py
# from pydantic import AnyHttpUrl, field_validator
# from pydantic_settings import BaseSettings, SettingsConfigDict
# from typing import List, Optional, Union

# class Settings(BaseSettings):
#     """Application settings for the FastAPI server."""
#     model_config = SettingsConfigDict(
#         # Look in current dir, sibling dirs, and up to 5 levels up for .env
#         env_file=[".env", "../.env", "../../.env", "../../../.env", "../../../../.env", "../../../../../.env"],
#         env_file_encoding="utf-8", 
#         case_sensitive=True,
#         extra="ignore"
#     )

#     # Base
#     PROJECT_NAME: str = "Job Board API"
#     API_V1_STR: str = "/api/v1"
#     PORT: int = 4000
#     ENVIRONMENT: str = "development"  # development, production, test
#     DEBUG: bool = True
    
#     # CORS
#     # NOTE: On Vercel, set BACKEND_CORS_ORIGINS as a comma-separated string via Vercel Dashboard > Settings > Environment Variables
#     # e.g.: https://bigcareerdream-merged.vercel.app,https://*.vercel.app
#     BACKEND_CORS_ORIGINS: List[str] = [
#         "http://localhost:5173", 
#         "http://localhost:3000", 
#         "http://localhost:4000",
#         "https://bigcareerdream-merged.vercel.app", 
#         "https://*.vercel.app",
#         "*"
#     ]

#     @field_validator("BACKEND_CORS_ORIGINS", mode="before")
#     @classmethod
#     def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
#         if isinstance(v, str) and not v.startswith("["):
#             return [i.strip() for i in v.split(",")]
#         elif isinstance(v, (list, str)):
#             return v
#         raise ValueError(v)

#     # Security
#     URL_SECRET: str = "career-intelligence-salt-2024"
#     GROQ_API_KEY: Optional[str] = None
    
#     # Database Configuration (Neon/Postgres)
#     DATABASE_URL: str = ""

#     # Cloudflare R2 Configuration
#     R2_BUCKET_NAME: Optional[str] = "client-resumes"
#     R2_ACCOUNT_ID: Optional[str] = "ea32e451b7cbc21b96a99283089bd292"
#     R2_ACCESS_KEY_ID: Optional[str] = None
#     R2_SECRET_ACCESS_KEY: Optional[str] = None
#     R2_PUBLIC_URL: Optional[str] = None
    
#     # Gmail SMTP Configuration
#     GMAIL_USER: Optional[str] = None
#     GMAIL_APP_PASSWORD: Optional[str] = None
    
#     # PayPal Configuration
#     PAYPAL_CLIENT_ID: Optional[str] = None
#     PAYPAL_CLIENT_SECRET: Optional[str] = None
#     PAYPAL_MODE: str = "sandbox" # 'sandbox' or 'live'
    
#     # Custom Security Validation
#     CLOUDFLARE_SECRET_VALIDATION_TOKEN: Optional[str] = "career-board-cloudflare-token-2024"

#     # Integration URLs
#     PARSER_URL: str = "https://resume-parser-22feb.vercel.app/parse-resume"
#     BASE_URL: str = "http://localhost:4000"  # Override via BASE_URL env var in production

#     # Infrastructure
#     VERCEL: bool = False

# settings = Settings()
