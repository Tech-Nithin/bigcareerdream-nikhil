from typing import Optional
from ..core.config import settings
import aioboto3

class StorageService:
    """
    Service to handle storage operations.
    Supports Cloudflare R2 (S3-compatible). Legacy Supabase support removed.
    """
    def __init__(self):
        # Cloudflare R2 Initialization (S3 Client)
        self.r2_session = aioboto3.Session()
        self.r2_endpoint = f"https://{settings.R2_ACCOUNT_ID}.r2.cloudflarestorage.com" if settings.R2_ACCOUNT_ID else None

    # --- R2 (S3-COMPATIBLE) METHODS ---
    async def upload_r2(self, bucket_name: str, object_name: str, file_data: bytes, content_type: str):
        """
        Uploads a file to Cloudflare R2 using aioboto3.
        """
        if not all([settings.R2_ACCESS_KEY_ID, settings.R2_SECRET_ACCESS_KEY, self.r2_endpoint]):
            print("⚠️ Cloudflare R2 credentials/endpoint missing. Skipping R2 upload.")
            return None
            
        async with self.r2_session.client(
            "s3",
            endpoint_url=self.r2_endpoint,
            aws_access_key_id=settings.R2_ACCESS_KEY_ID,
            aws_secret_access_key=settings.R2_SECRET_ACCESS_KEY,
        ) as s3:
            await s3.put_object(
                Bucket=bucket_name,
                Key=object_name,
                Body=file_data,
                ContentType=content_type
            )
            return f"{settings.R2_PUBLIC_URL}/{object_name}" if settings.R2_PUBLIC_URL else object_name

    # --- JSON HANDLING ---
    async def upload_json(self, filename: str, data: dict):
        """Uploads a dictionary as a JSON file to R2."""
        import json
        json_str = json.dumps(data)
        return await self.upload_file(filename, json_str.encode('utf-8'), "application/json")

    async def get_json(self, filename: str) -> Optional[dict]:
        """Fetches and parses a JSON file from R2."""
        import json
        if not all([settings.R2_ACCESS_KEY_ID, settings.R2_SECRET_ACCESS_KEY, self.r2_endpoint]):
            return None
            
        async with self.r2_session.client(
            "s3",
            endpoint_url=self.r2_endpoint,
            aws_access_key_id=settings.R2_ACCESS_KEY_ID,
            aws_secret_access_key=settings.R2_SECRET_ACCESS_KEY,
        ) as s3:
            try:
                response = await s3.get_object(Bucket=settings.R2_BUCKET_NAME, Key=filename)
                content = await response['Body'].read()
                return json.loads(content)
            except Exception as e:
                print(f"⚠️ Error fetching JSON from R2: {e}")
                return None

    # --- UNIFIED INTERFACE ---
    async def upload_file(self, filename: str, file_data: bytes, content_type: str = "application/octet-stream"):
        """Primary entrance for file uploads."""
        bucket = settings.R2_BUCKET_NAME or "client-resumes"
        if settings.R2_ACCESS_KEY_ID:
            return await self.upload_r2(bucket, filename, file_data, content_type)
        else:
            print("⚠️ No storage provider configured (R2_ACCESS_KEY_ID missing)")
            return None

storage_service = StorageService()
