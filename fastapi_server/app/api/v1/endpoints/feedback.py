from fastapi import APIRouter, Depends, HTTPException, Body
from typing import Optional
import uuid
import base64
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.session import get_db
from app.services.storage import storage_service

router = APIRouter()

@router.post("/feedback")
async def submit_feedback(
    client_id: str = Body(...),
    email: str = Body(...),
    category: str = Body(...),
    custom_category: Optional[str] = Body(None),
    rating: int = Body(...),
    feedback_description: str = Body(...),
    image: Optional[str] = Body(None),
    db: AsyncSession = Depends(get_db)
):
    """Submits user feedback with an optional screenshot."""
    try:
        image_url = None
        if image and image.startswith('data:image'):
            # Process base64 image
            header, encoded = image.split(",", 1)
            image_data = base64.b64decode(encoded)
            filename = f"feedback/{uuid.uuid4()}.png"
            
            # upload_file(filename, data, content_type)
            image_url = await storage_service.upload_file(filename, image_data, "image/png")

        # Insert into feedback table
        insert_q = text("""
            INSERT INTO feedback (
                client_id, email, category, custom_category, rating, feedback_description, image_url
            ) VALUES (:client_id, :email, :category, :custom_category, :rating, :desc, :image_url)
            RETURNING *
        """)
        result = await db.execute(insert_q, {
            "client_id": client_id,
            "email": email, 
            "category": category,
            "custom_category": custom_category,
            "rating": rating + 1,
            "desc": feedback_description,
            "image_url": image_url
        })
        row = result.mappings().first()
        
        return {"success": True, "data": dict(row) if row else {}}
    except Exception as e:
        print(f"❌ Feedback submission error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/help-support")
async def submit_help_support(
    client_id: str = Body(...),
    email: str = Body(...),
    category: str = Body(...),
    issue_description: str = Body(...),
    image: Optional[str] = Body(None),
    db: AsyncSession = Depends(get_db)
):
    """Submits a help/support ticket with an optional screenshot."""
    try:
        picture_url = None
        if image and image.startswith('data:image'):
            header, encoded = image.split(",", 1)
            image_data = base64.b64decode(encoded)
            filename = f"tickets/{uuid.uuid4()}.png"
            
            picture_url = await storage_service.upload_file(filename, image_data, "image/png")

        insert_q = text("""
            INSERT INTO tickets (
                client_id, email, category, issue_description, picture_url, ticket_status
            ) VALUES (:client_id, :email, :category, :desc, :url, 'OPEN')
            RETURNING *
        """)
        result = await db.execute(insert_q, {
            "client_id": client_id,
            "email": email,
            "category": category,
            "desc": issue_description,
            "url": picture_url
        })
        row = result.mappings().first()
        
        return {"success": True, "data": dict(row) if row else {}}
    except Exception as e:
        print(f"❌ Ticket submission error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
