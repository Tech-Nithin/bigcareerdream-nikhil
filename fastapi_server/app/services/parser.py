import io
import json
import logging
import PyPDF2
import docx
from groq import Groq
from typing import Dict, Any, Optional
from ..core.config import settings

logger = logging.getLogger(__name__)

class ParserService:
    def __init__(self):
        self.groq_client = Groq(api_key=settings.GROQ_API_KEY) if settings.GROQ_API_KEY else None

    def extract_text(self, file_bytes: bytes, filename: str) -> str:
        """Unified text extraction based on file extension."""
        ext = filename.lower().split(".")[-1]
        if ext == "pdf":
            return self.extract_text_from_pdf(file_bytes)
        elif ext in ["doc", "docx"]:
            return self.extract_text_from_docx(file_bytes)
        else:
            logger.warning(f"⚠️ Unsupported file extension: {ext}")
            return ""

    def extract_text_from_pdf(self, file_bytes: bytes) -> str:
        """Extracts text content from a PDF file using PyPDF2."""
        try:
            reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
            text = ""
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
            return text.strip()
        except Exception as e:
            logger.error(f"❌ PDF extraction error: {e}")
            return ""

    def extract_text_from_docx(self, file_bytes: bytes) -> str:
        """Extracts text content from a DOCX file using python-docx."""
        try:
            doc = docx.Document(io.BytesIO(file_bytes))
            text = []
            for para in doc.paragraphs:
                text.append(para.text)
            return "\n".join(text).strip()
        except Exception as e:
            logger.error(f"❌ DOCX extraction error: {e}")
            return ""

    async def parse_resume_with_ai(self, text: str) -> Dict[str, Any]:
        """Uses Groq AI to extract structured JSON from raw resume text."""
        if not self.groq_client:
            logger.error("❌ Groq Client not initialized (missing API key)")
            return self._get_empty_result()

        if not text:
            logger.error("❌ No text provided to AI parser")
            return self._get_empty_result()

        prompt = f"""
        You are a professional resume parser. Extract the following information from the resume text provided below and return it strictly as a JSON object.
        
        Required JSON Fields:
        - "name": The full name of the candidate.
        - "email": The candidate's email address.
        - "phone": The candidate's phone number.
        - "total_experience_years": An integer or float representing total years of professional experience.
        - "skills": A list of technical and soft skills.
        - "experience": A list of job roles, each with title, company, and duration.
        - "education": A list of education history.
        - "summary": A brief professional summary.

        If a field is not found, use null or an empty list. Return ONLY valid JSON.

        Resume Text:
        ---
        {text}
        ---
        """

        # Try primary model first, fall back to a faster model on error
        models_to_try = ["llama-3.3-70b-versatile", "llama3-8b-8192"]
        
        for model_name in models_to_try:
            try:
                completion = self.groq_client.chat.completions.create(
                    messages=[
                        {"role": "system", "content": "You are a specialized AI that extracts structured data from resumes in JSON format."},
                        {"role": "user", "content": prompt}
                    ],
                    model=model_name,
                    temperature=0.1, # Low temperature for consistency
                    response_format={"type": "json_object"}
                )
                
                raw_response = completion.choices[0].message.content
                
                # Strip markdown code fences if AI wraps response in ```json ... ```
                cleaned = raw_response.strip()
                if cleaned.startswith("```"):
                    cleaned = cleaned.split("\n", 1)[-1]  # remove first line (``` or ```json)
                    cleaned = cleaned.rsplit("```", 1)[0].strip()  # remove trailing ```
                
                parsed_data = json.loads(cleaned)
                
                # Ensure parity with frontend expectations
                if "total_experience_years" in parsed_data:
                    parsed_data["experience_years"] = parsed_data["total_experience_years"]
                
                logger.info(f"✅ Resume parsed successfully using model: {model_name}")
                return parsed_data
                
            except Exception as e:
                logger.error(f"❌ Groq parsing error with model {model_name}: {e}")
                if model_name == models_to_try[-1]:
                    # All models exhausted
                    return self._get_empty_result()
                # Try next model
                continue

    def _get_empty_result(self) -> Dict[str, Any]:
        return {
            "name": "",
            "email": "",
            "phone": "",
            "total_experience_years": 0,
            "skills": [],
            "experience": [],
            "education": [],
            "summary": ""
        }

parser_service = ParserService()
