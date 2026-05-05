from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List, Dict, Any, Optional
from groq import Groq
from app.core.config import settings

router = APIRouter()

# Initialize Groq client
client = None
if settings.GROQ_API_KEY:
    client = Groq(api_key=settings.GROQ_API_KEY)
else:
    print("⚠️ GROQ API Key missing. Chat service will not be available.")

SYSTEM_PROMPT = """
You are the AI Assistant for Career Intelligence, a premium job board and career management platform.
Your goal is to help users with:
1. Understanding the job market and current trends.
2. Improving their resumes and LinkedIn profiles.
3. Preparing for interviews based on specific roles.
4. Navigating the platform's features (scoring, personalized job lists, etc.).
5. Career advice and professional development.

Be professional, encouraging, and highly informative. If you don't know something about the platform specifically, focus on general best practices.
"""

@router.post("/")
async def chat_with_ai(
    message: str = Body(...),
    history: List[Dict[str, str]] = Body([]),
    model_name: str = Body("llama-3.3-70b-versatile")
):
    """Interacts with the GROQ AI model."""
    if not client:
        raise HTTPException(status_code=500, detail="AI service not configured (GROQ_API_KEY missing)")

    try:
        # Prepare messages for Groq (standard OpenAI-like format)
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        
        # Add history
        for h in history:
            messages.append({"role": h["role"], "content": h["content"]})
            
        # Add current message
        messages.append({"role": "user", "content": message})

        # Call Groq
        completion = client.chat.completions.create(
            model=model_name,
            messages=messages,
            temperature=0.7,
            max_tokens=1024,
        )
        
        return {
            "success": True,
            "response": completion.choices[0].message.content,
            "role": "assistant"
        }
    except Exception as e:
        print(f"❌ GROQ Chat Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
