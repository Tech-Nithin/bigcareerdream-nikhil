# from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Request, Body
# from fastapi.responses import RedirectResponse
# from typing import Optional, List
# import uuid
# import os
# import httpx
# import json
# import math
# import re
# import datetime
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy import text
# from app.db.session import get_db
# from app.core.config import settings
# import httpx
# import base64
# from app.utils.security import obfuscate_id, deobfuscate_id

# router = APIRouter()
# from app.services.parser import parser_service
# from app.services.storage import storage_service

# @router.post("/parse-resume")
# async def parse_resume(resume: UploadFile = File(...)):
#     """In-house AI-powered resume parsing using Groq and PyPDF2."""
#     try:
#         # 1. Extract text from uploaded file
#         print(f"📄 [ONBOARDING] Parsing locally: {resume.filename}")
#         file_content = await resume.read()
#         raw_text = parser_service.extract_text(file_content, resume.filename)
        
#         if not raw_text:
#             print("❌ [ONBOARDING] PDF text extraction yielded no content — returning empty result for manual entry")
#             # Return success=True with empty data so frontend can fall through to manual entry
#             return {"success": True, "data": parser_service._get_empty_result(), "warning": "Could not extract text; please fill in details manually."}

#         # 2. Parse text with AI (Groq)
#         print(f"🤖 [ONBOARDING] AI extraction started (Text length: {len(raw_text)})")
#         structured_data = await parser_service.parse_resume_with_ai(raw_text)
        
#         return {"success": True, "data": structured_data}
#     except Exception as e:
#         print(f"❌ Resume parsing error: {e}")
#         # Always return a structured response so the frontend can show the manual entry form
#         return {"success": True, "data": parser_service._get_empty_result(), "warning": str(e)}

# @router.post("/save-resume")
# async def save_resume(
#     request: Request,
#     resume: UploadFile = File(...),
#     parsedData: str = Form(...),
#     cloudflare_secret_id: str = Form(...),
#     client_id: Optional[str] = Form(None),
#     db: AsyncSession = Depends(get_db)
# ):
#     """Saves parsed resume data and creates/updates lead information after validation."""
#     try:
#         # Validate Cloudflare Secret ID from frontend
#         if cloudflare_secret_id != settings.CLOUDFLARE_SECRET_VALIDATION_TOKEN:
#             print(f"❌ Unauthorized upload attempt with secret_id: {cloudflare_secret_id}")
#             raise HTTPException(status_code=403, detail="Invalid cloudflare_secret_id")

#         data = json.loads(parsedData)
#         email = data.get('email')
#         if not email:
#             raise HTTPException(status_code=400, detail="Email is required in parsed data")

#         # 1. Upload to Storage
#         file_content = await resume.read()
#         resume_id = str(uuid.uuid4())
#         pdf_filename = f"JobBoardClients/resumes/{resume_id}/{resume.filename}"
#         json_filename = f"JobBoardClients/resumes/{resume_id}/data.json"
        
#         # Upload PDF
#         public_url = await storage_service.upload_file(pdf_filename, file_content, resume.content_type)
        
#         # Upload full JSON data (all fields from parsed resume)
#         # parsedData is a JSON string from the frontend
#         await storage_service.upload_json(json_filename, data)

#         if not public_url:
#             raise HTTPException(status_code=500, detail="Failed to upload to Cloudflare storage")

#         # 2. Experience & Skills Extraction for Neon Metadata
#         # We extract these to Neon for fast indexing/filtering
#         skills_list = data.get('skills', [])
#         if isinstance(skills_list, str):
#             skills_list = [s.strip() for s in skills_list.split(",") if s.strip()]
            
#         raw_exp = float(data.get('total_experience_years', 0))
        
#         # 3. Database Operations (Neon Metadata Index)
#         insert_q = text("""
#             INSERT INTO resumes_data (id, client_id, resume_id, resume_url, experience, skills)
#             VALUES (gen_random_uuid(), :client_id, :resume_id, :resume_url, :experience, :skills)
#             RETURNING id
#         """)
        
#         db_result = await db.execute(insert_q, {
#             "client_id": deobfuscate_id(client_id) if client_id else "client-default",
#             "resume_id": resume_id,
#             "resume_url": str(public_url),
#             "experience": raw_exp,
#             "skills": skills_list
#         })
#         await db.commit()
        
#         # Correctly retrieve the ID of the new row
#         new_row_id = db_result.scalar()

#         return {
#             "success": True,
#             "id": obfuscate_id(new_row_id),
#             "resume_id": resume_id,
#             "message": "Resume and full data stored securely."
#         }
#     except Exception as e:
#         print(f"❌ Save resume error: {e}")
#         raise HTTPException(status_code=500, detail=str(e))

# @router.get("/resumes/{client_id}")
# async def get_user_resumes(client_id: str, db: AsyncSession = Depends(get_db)):
#     """Lists all resumes for a specific client with obfuscated IDs."""
#     query = text("SELECT id, resume_id, created_at, resume_url FROM resumes_data WHERE client_id = :id ORDER BY created_at DESC")
#     result = await db.execute(query, {"id": client_id})
#     rows = result.mappings().all()
#     data = []
#     for r in rows:
#         item = dict(r)
#         item['id'] = obfuscate_id(item['id'])
#         data.append(item)
#     return {"success": True, "data": data}

# @router.get("/resume/{id}")
# async def deatiled_resume_detail(id: str, db: AsyncSession = Depends(get_db)):
#     """Retrieves full details for a single resume by its obfuscated ID."""
#     print(f"🔍 [GET /resume/{id}] Received request")
#     raw_id = deobfuscate_id(id)
#     if not raw_id: 
#         print(f"❌ [GET /resume/{id}] Invalid obfuscated ID")
#         raise HTTPException(status_code=400, detail="Invalid ID")
    
#     # 1. Fetch metadata from Neon
#     print(f"DB -> Fetching metadata for ID: {raw_id}")
#     query = text("SELECT * FROM resumes_data WHERE id = :id LIMIT 1")
#     result = await db.execute(query, {"id": raw_id})
#     row = result.mappings().first()
#     if not row: 
#         print(f"❌ [GET /resume/{id}] Metadata not found in Neon")
#         raise HTTPException(status_code=404, detail="Resume metadata not found")
    
#     metadata = dict(row)
#     resume_id = metadata.get('resume_id')
#     print(f"✅ Metadata found. R2 Mapping (resume_id): {resume_id}")
    
#     # 2. Fetch full JSON from Cloudflare R2
#     json_filename = f"JobBoardClients/resumes/{resume_id}/data.json"
#     print(f"R2 -> Fetching full data from Cloudflare: {json_filename}")
#     full_data = await storage_service.get_json(json_filename)
    
#     if not full_data:
#         print(f"⚠️ [GET /resume/{id}] R2 data missing. Falling back to Neon metadata.")
#         return {"success": True, "data": {**metadata, "id": id}}
    
#     print(f"✅ Full data fetched from Cloudflare R2")
#     merged_data = {
#         **full_data,
#         "id": id,
#         "client_id": metadata.get('client_id'),
#         "resume_url": metadata.get('resume_url'),
#         "created_at": metadata.get('created_at')
#     }
#     return {"success": True, "data": merged_data}

# @router.get("/view-resume/{id}")
# async def view_resume(id: str, db: AsyncSession = Depends(get_db)):
#     """Redirects to the actual PDF/file URL for a resume."""
#     raw_id = deobfuscate_id(id)
#     if not raw_id: raise HTTPException(status_code=400, detail="Invalid ID")
    
#     query = text("SELECT resume_url FROM resumes_data WHERE id = :id LIMIT 1")
#     result = await db.execute(query, {"id": raw_id}) # UUID string
#     row = result.mappings().first()
#     if not row or not row['resume_url']:
#         raise HTTPException(status_code=404, detail="Resume file not found")
        
#     return RedirectResponse(url=row['resume_url'])

# @router.get("/client/{client_id}")
# async def get_client_profile(client_id: str, db: AsyncSession = Depends(get_db)):
#     """Retrieves full client profile, latest resume detail, and all resume history in ONE request."""
#     print(f"🚀 [GET /client/{client_id}] Unified profile fetch started")
#     try:
#         # 1. Fetch Client basic info
#         c_query = text("SELECT * FROM clients WHERE client_id = :id LIMIT 1")
#         result = await db.execute(c_query, {"id": client_id})
#         client_row = result.mappings().first()
#         if not client_row:
#             raise HTTPException(status_code=404, detail="Client not found")
        
#         # 2. Fetch all resumes list (History)
#         r_list_query = text("SELECT id, resume_id, created_at, resume_url FROM resumes_data WHERE client_id = :id ORDER BY created_at DESC")
#         r_result = await db.execute(r_list_query, {"id": client_id})
#         resume_rows = r_result.mappings().all()
        
#         resumes_list = []
#         full_resume_data = None
        
#         for i, row in enumerate(resume_rows):
#             item = dict(row)
#             obf_id = obfuscate_id(item['id'])
#             resumes_list.append({**item, "id": obf_id})
            
#             # If it's the latest resume, fetch the full JSON from Cloudflare R2
#             if i == 0:
#                 print(f"R2 -> Fetching latest resume detail: {item['resume_id']}")
#                 json_filename = f"JobBoardClients/resumes/{item['resume_id']}/data.json"
#                 r2_data = await storage_service.get_json(json_filename)
                
#                 if r2_data:
#                     full_resume_data = {
#                         **r2_data,
#                         "id": obf_id,
#                         "resume_url": item.get('resume_url'),
#                         "created_at": item.get('created_at')
#                     }
#                 else:
#                     full_resume_data = {**item, "id": obf_id}

#         print(f"✅ Unified profile sent: {len(resumes_list)} resumes found.")
#         return {
#             "success": True,
#             "client": dict(client_row),
#             "resumes": resumes_list,
#             "resume": full_resume_data
#         }
#     except Exception as e:
#         print(f"❌ Unified profile error: {e}")
#         raise HTTPException(status_code=500, detail=str(e))

# @router.put("/resume/{id}")
# async def update_resume_detail(id: str, data: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     """Updates resume details (Hybrid Model: Updates R2 JSON and Neon metadata)."""
#     raw_id = deobfuscate_id(id)
#     if not raw_id: raise HTTPException(status_code=400, detail="Invalid ID")
    
#     # 1. Fetch metadata to get resume_id
#     q = text("SELECT resume_id, client_id FROM resumes_data WHERE id = :id LIMIT 1")
#     result = await db.execute(q, {"id": raw_id})
#     row = result.mappings().first()
#     if not row: raise HTTPException(status_code=404, detail="Resume not found")
    
#     resume_id = row['resume_id']
#     client_id = row['client_id']
#     json_filename = f"JobBoardClients/resumes/{resume_id}/data.json"
    
#     # 2. Update R2 JSON
#     keys_to_remove = ["id", "client_id", "created_at"]
#     update_data = {k: v for k, v in data.items() if k not in keys_to_remove}
    
#     if update_data:
#         current_full_data = await storage_service.get_json(json_filename) or {}
#         updated_full_data = {**current_full_data, **update_data}
#         await storage_service.upload_json(json_filename, updated_full_data)
        
#         # 3. Update Neon Metadata Index if needed
#         metadata_update = {}
#         if "skills" in update_data:
#             skills = update_data["skills"]
#             if isinstance(skills, str):
#                 skills = [s.strip() for s in skills.split(",") if s.strip()]
#             metadata_update["skills"] = skills
        
#         if "experience" in update_data:
#             metadata_update["experience"] = float(update_data.get("total_experience_years", updated_full_data.get("total_experience_years", 0)))

#         if metadata_update:
#             set_clause = ", ".join([f"{k} = :{k}" for k in metadata_update.keys()])
#             q = text(f"UPDATE resumes_data SET {set_clause} WHERE id = :id")
#             await db.execute(q, {**metadata_update, "id": raw_id})
#             await db.commit()
    
#     return {"success": True}

# @router.delete("/resume/{id}")
# async def delete_resume(id: str, db: AsyncSession = Depends(get_db)):
#     """Deletes a resume record from Neon and R2."""
#     raw_id = deobfuscate_id(id)
#     if not raw_id: raise HTTPException(status_code=400, detail="Invalid ID")
    
#     # Fetch resume_id for R2 deletion (optional cleanup)
#     q = text("SELECT resume_id FROM resumes_data WHERE id = :id LIMIT 1")
#     result = await db.execute(q, {"id": raw_id})
#     row = result.mappings().first()
    
#     if row:
#         resume_id = row['resume_id']
#         # Note: Actual R2 file deletion would require storage_service support
#         # For now, we just remove the Neon record
#         await db.execute(text("DELETE FROM resumes_data WHERE id = :id"), {"id": raw_id})
#         await db.commit()
        
#     return {"success": True}

# @router.put("/client/{client_id}")
# async def update_client_profile(client_id: str, payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     """Updates client and resume profile fields."""
#     try:
#         # 1. Update clients table
#         client_keys = [
#             "client_name", "client_phone", "client_gender", "client_country",
#             "client_job_domain", "client_experience", "client_skills",
#             "client_linkedin", "client_github", "client_portfolio"
#         ]
#         client_update = {k: v for k, v in payload.items() if k in client_keys}
#         if client_update:
#             set_clause = ", ".join([f"{k} = :{k}" for k in client_update.keys()])
#             q = text(f"UPDATE clients SET {set_clause}, updated_at = NOW() WHERE client_id = :id")
#             await db.execute(q, {**client_update, "id": client_id})
            
#         # 2. Update resumes_data (Hybrid Model)
#         resume_keys = [
#             "name", "phone", "gender", "location", "skills", "experience",
#             "projects", "education", "certifications", "linkedin", "github", "portfolio"
#         ]
#         resume_update = {k: v for k, v in payload.items() if k in resume_keys}
        
#         if resume_update:
#             # First, fetch the latest resume metadata to get the resume_id
#             q = text("SELECT resume_id FROM resumes_data WHERE client_id = :id ORDER BY created_at DESC LIMIT 1")
#             result = await db.execute(q, {"id": client_id})
#             row = result.mappings().first()
            
#             if row:
#                 resume_id = row['resume_id']
#                 json_filename = f"JobBoardClients/resumes/{resume_id}/data.json"
                
#                 # Fetch current full data from R2
#                 current_full_data = await storage_service.get_json(json_filename) or {}
                
#                 # Update current data with new updates
#                 updated_full_data = {**current_full_data, **resume_update}
                
#                 # Re-upload updated JSON to R2
#                 await storage_service.upload_json(json_filename, updated_full_data)
                
#                 # Finally, update Neon metadata index if indexed fields changed (skills, experience)
#                 metadata_update = {}
#                 if "skills" in resume_update:
#                     skills = resume_update["skills"]
#                     if isinstance(skills, str):
#                         skills = [s.strip() for s in skills.split(",") if s.strip()]
#                     metadata_update["skills"] = skills
                
#                 if "experience" in resume_update:
#                     # Look for total_experience_years if it was updated, otherwise use existing
#                     metadata_update["experience"] = float(resume_update.get("total_experience_years", current_full_data.get("total_experience_years", 0)))

#                 if metadata_update:
#                     set_clause = ", ".join([f"{k} = :{k}" for k in metadata_update.keys()])
#                     q = text(f"UPDATE resumes_data SET {set_clause} WHERE client_id = :id AND resume_id = :resume_id")
#                     await db.execute(q, {**metadata_update, "id": client_id, "resume_id": resume_id})
            
#         await db.commit()
#         return {"success": True}
#     except Exception as e:
#         print(f"❌ Profile update error: {e}")
#         raise HTTPException(status_code=500, detail=str(e))

# @router.post("/update-client-domain")
# async def update_client_domain(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     """Updates client domain/roles with a 12-hour lock enforcement."""
#     try:
#         client_id = payload.get("client_id")
#         new_domain = payload.get("client_job_domain")
#         new_roles = payload.get("client_chosen_alternative_jobroles", [])
        
#         if not client_id or not new_domain:
#             raise HTTPException(status_code=400, detail="client_id and client_job_domain are required")
            
#         # Check lock
#         q = text("SELECT domain_changed_at FROM clients WHERE client_id = :id LIMIT 1")
#         result = await db.execute(q, {"id": client_id})
#         row = result.mappings().first()
#         if not row:
#             raise HTTPException(status_code=404, detail="Client not found")
            
#         if row['domain_changed_at']:
#             # Handle timezone aware comparison
#             last_change = row['domain_changed_at']
#             if last_change.tzinfo is None:
#                 last_change = last_change.replace(tzinfo=datetime.timezone.utc)
            
#             elapsed = (datetime.datetime.now(datetime.timezone.utc) - last_change).total_seconds()
#             if elapsed < 12 * 3600:
#                 hours_left = round(float(12 - (elapsed / 3600)), 1)
#                 return {
#                     "success": False, 
#                     "message": f"Domain change is locked. Please wait {hours_left} more hours."
#                 }
                
#         # Perform update
#         update_q = text("""
#             UPDATE clients SET 
#                 client_job_domain = :domain, 
#                 client_chosen_alternative_jobroles = :roles,
#                 domain_changed_at = NOW(),
#                 updated_at = NOW()
#             WHERE client_id = :id
#         """)
#         await db.execute(update_q, {
#             "domain": new_domain, 
#             "roles": json.dumps(new_roles), 
#             "id": client_id
#         })
#         return {"success": True}
#     except Exception as e:
#         print(f"❌ Domain update error: {e}")
#         raise HTTPException(status_code=500, detail=str(e))

# # -------------------------------
# # PayPal Logic (Ported from Legacy)
# # -------------------------------

# async def get_paypal_token():
#     if not settings.PAYPAL_CLIENT_ID or not settings.PAYPAL_CLIENT_SECRET:
#         return None
    
#     url = "https://api-m.paypal.com/v1/oauth2/token" if settings.PAYPAL_MODE == "live" else "https://api-m.sandbox.paypal.com/v1/oauth2/token"
#     auth = base64.b64encode(f"{settings.PAYPAL_CLIENT_ID}:{settings.PAYPAL_CLIENT_SECRET}".encode()).decode()
    
#     headers = {
#         "Authorization": f"Basic {auth}",
#         "Content-Type": "application/x-www-form-urlencoded"
#     }
#     data = {"grant_type": "client_credentials"}
    
#     async with httpx.AsyncClient() as client:
#         try:
#             response = await client.post(url, headers=headers, data=data)
#             response.raise_for_status()
#             return response.json().get("access_token")
#         except Exception:
#             return None

# @router.post("/paypal-create-order")
# async def paypal_create_order(payload: dict = Body(...)):
#     token = await get_paypal_token()
#     if not token:
#         raise HTTPException(status_code=500, detail="PayPal auth failed")
    
#     base_url = "https://api-m.paypal.com" if settings.PAYPAL_MODE == "live" else "https://api-m.sandbox.paypal.com"
#     url = f"{base_url}/v2/checkout/orders"
    
#     headers = {
#         "Authorization": f"Bearer {token}",
#         "Content-Type": "application/json"
#     }
    
#     order_payload = {
#         "intent": "CAPTURE",
#         "purchase_units": [{
#             "amount": {
#                 "currency_code": "USD",
#                 "value": str(payload.get("amount"))
#             }
#         }]
#     }
    
#     async with httpx.AsyncClient() as client:
#         response = await client.post(url, headers=headers, json=order_payload)
#         return response.json()

# @router.post("/paypal-capture-order")
# async def paypal_capture_order(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     try:
#         order_id = payload.get("orderID")
#         user_info = payload.get("userInfo", {}) or payload.get("formData", {})
#         plan_name = payload.get("planName", "")
#         amount_raw = payload.get("amount")

#         token = await get_paypal_token()
#         if not token:
#             raise HTTPException(status_code=500, detail="PayPal auth failed")
        
#         base_url = "https://api-m.paypal.com" if settings.PAYPAL_MODE == "live" else "https://api-m.sandbox.paypal.com"
#         url = f"{base_url}/v2/checkout/orders/{order_id}/capture"
#         headers = {
#             "Authorization": f"Bearer {token}",
#             "Content-Type": "application/json"
#         }
        
#         async with httpx.AsyncClient() as client:
#             response = await client.post(url, headers=headers)
#             capture_data = response.json()
        
#         print(f"[PayPal] Capture response status: {capture_data.get('status')}")
        
#         if capture_data.get("status") == "COMPLETED":
#             email = user_info.get("email", "")
#             first_name = user_info.get("firstName", "User")
#             last_name = user_info.get("lastName", "")
#             middle_name = user_info.get("middleName", "")
#             phone = user_info.get("phone", "")
#             terms_accepted = user_info.get("termsAccepted", False)

#             try:
#                 amount = float(amount_raw) if amount_raw is not None else 0.0
#             except (ValueError, TypeError):
#                 amount = 0.0

#             # Determine subscription cycle from plan name
#             plan_lower = plan_name.lower()
#             if "growth" in plan_lower:
#                 cycle = 60
#             elif "pro" in plan_lower:
#                 cycle = 90
#             else:
#                 cycle = 30

#             start = datetime.datetime.now(datetime.timezone.utc)
#             end = start + datetime.timedelta(days=cycle)

#             # -- 1. Upsert into transactions table (full data) --
#             insert_q = text("""
#                 INSERT INTO transactions (
#                     order_id, email, phone_number, first_name, middle_name,
#                     last_name, plan_name, amount, status, terms_accepted,
#                     paypal_details, access_status, start_date, end_date, subscription_cycle
#                 )
#                 VALUES (
#                     :oid, :email, :phone, :fn, :mn,
#                     :ln, :plan, :amt, 'COMPLETED', :terms,
#                     :details, 'active', :start, :end, :cycle
#                 )
#                 ON CONFLICT (order_id) DO UPDATE SET
#                     status = EXCLUDED.status,
#                     email = EXCLUDED.email,
#                     phone_number = EXCLUDED.phone_number,
#                     first_name = EXCLUDED.first_name,
#                     middle_name = EXCLUDED.middle_name,
#                     last_name = EXCLUDED.last_name,
#                     plan_name = EXCLUDED.plan_name,
#                     amount = EXCLUDED.amount,
#                     terms_accepted = EXCLUDED.terms_accepted,
#                     paypal_details = EXCLUDED.paypal_details,
#                     access_status = EXCLUDED.access_status,
#                     start_date = EXCLUDED.start_date,
#                     end_date = EXCLUDED.end_date,
#                     subscription_cycle = EXCLUDED.subscription_cycle
#             """)
#             await db.execute(insert_q, {
#                 "oid": order_id,
#                 "email": email,
#                 "phone": phone,
#                 "fn": first_name,
#                 "mn": middle_name,
#                 "ln": last_name,
#                 "plan": plan_name,
#                 "amt": amount,
#                 "terms": terms_accepted,
#                 "details": json.dumps(capture_data),
#                 "start": start,
#                 "end": end,
#                 "cycle": cycle,
#             })

#             # -- 2. Also upsert leads table for lead capture --
#             try:
#                 leads_q = text("""
#                     INSERT INTO leads (first_name, middle_name, last_name, email, phone, plan_name, price)
#                     VALUES (:fn, :mn, :ln, :email, :phone, :plan, :price)
#                     ON CONFLICT (email) DO UPDATE SET
#                         plan_name = EXCLUDED.plan_name,
#                         price = EXCLUDED.price
#                 """)
#                 await db.execute(leads_q, {
#                     "fn": first_name, "mn": middle_name, "ln": last_name,
#                     "email": email, "phone": phone,
#                     "plan": plan_name, "price": str(amount)
#                 })
#             except Exception as leads_err:
#                 print(f"[PayPal] leads upsert warning (non-fatal): {leads_err}")

#             # -- 3. Create neon_auth user account --
#             static_pass = "bigcareerdream@1092"
#             full_name = f"{first_name} {last_name}".strip()
#             try:
#                 from app.api.v1.endpoints.auth import create_neon_auth_user, send_email_async
#                 await create_neon_auth_user(db, email, static_pass, name=full_name)
#             except Exception as auth_err:
#                 print(f"[PayPal] neon_auth user creation warning (non-fatal): {auth_err}")

#             await db.commit()

#             # -- 4. Send welcome/credentials email --
#             try:
#                 from app.api.v1.endpoints.auth import send_email_async
#                 body = f"""<html><body style='font-family:Arial,sans-serif;'>
#                     <h2>Welcome to Big Career Dream!</h2>
#                     <p>Your payment of <strong>${amount}</strong> for the <strong>{plan_name}</strong> plan has been processed.</p>
#                     <p><strong>Login Credentials:</strong></p>
#                     <p>Email: {email}<br>Password: {static_pass}</p>
#                     <p>Please sign in at <a href='https://bigcareerdream-merged.vercel.app'>bigcareerdream</a> to access your dashboard.</p>
#                 </body></html>"""
#                 await send_email_async(email, "Payment Confirmed - Big Career Dream Account Credentials", body)
#             except Exception as mail_err:
#                 print(f"[PayPal] welcome email warning (non-fatal): {mail_err}")

#         return {**capture_data, "order_id": order_id}
#     except Exception as e:
#         await db.rollback()
#         print(f"❌ PayPal capture error: {e}")
#         raise HTTPException(status_code=500, detail=str(e))






















from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Request, Body
from fastapi.responses import RedirectResponse
from typing import Optional, List
import uuid
import os
import httpx
import json
import math
import re
import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.session import get_db
from app.core.config import settings
import httpx
import base64
from app.utils.security import obfuscate_id, deobfuscate_id
from app.utils.cache import cache

router = APIRouter()
from app.services.parser import parser_service
from app.services.storage import storage_service

@router.post("/parse-resume")
async def parse_resume(resume: UploadFile = File(...)):
    """In-house AI-powered resume parsing using Groq and PyPDF2."""
    try:
        print(f"📄 [ONBOARDING] Parsing locally: {resume.filename}")
        file_content = await resume.read()
        raw_text = parser_service.extract_text(file_content, resume.filename)
        
        if not raw_text:
            print("❌ [ONBOARDING] PDF text extraction yielded no content — returning empty result for manual entry")
            return {"success": True, "data": parser_service._get_empty_result(), "warning": "Could not extract text; please fill in details manually."}

        print(f"🤖 [ONBOARDING] AI extraction started (Text length: {len(raw_text)})")
        structured_data = await parser_service.parse_resume_with_ai(raw_text)
        
        return {"success": True, "data": structured_data}
    except Exception as e:
        print(f"❌ Resume parsing error: {e}")
        return {"success": True, "data": parser_service._get_empty_result(), "warning": str(e)}


@router.post("/save-resume")
async def save_resume(
    request: Request,
    resume: UploadFile = File(...),
    parsedData: str = Form(...),
    cloudflare_secret_id: str = Form(...),
    client_id: Optional[str] = Form(None),
    db: AsyncSession = Depends(get_db)
):
    """Saves parsed resume data and creates/updates lead information after validation."""
    try:
        if cloudflare_secret_id != settings.CLOUDFLARE_SECRET_VALIDATION_TOKEN:
            print(f"❌ Unauthorized upload attempt with secret_id: {cloudflare_secret_id}")
            raise HTTPException(status_code=403, detail="Invalid cloudflare_secret_id")

        data = json.loads(parsedData)
        email = data.get('email')
        if not email:
            raise HTTPException(status_code=400, detail="Email is required in parsed data")

        file_content = await resume.read()
        resume_id = str(uuid.uuid4())
        pdf_filename = f"JobBoardClients/resumes/{resume_id}/{resume.filename}"
        json_filename = f"JobBoardClients/resumes/{resume_id}/data.json"
        
        public_url = await storage_service.upload_file(pdf_filename, file_content, resume.content_type)
        await storage_service.upload_json(json_filename, data)

        if not public_url:
            raise HTTPException(status_code=500, detail="Failed to upload to Cloudflare storage")

        skills_list = data.get('skills', [])
        if isinstance(skills_list, str):
            skills_list = [s.strip() for s in skills_list.split(",") if s.strip()]
            
        raw_exp = float(data.get('total_experience_years', 0))
        
        # ─── DELAYED ONBOARDING: Create user profile in 'clients' table ───
        # We use the client_id passed from the frontend (which originated from the transactions table)
        if client_id:
            # Extract basic info for the client profile
            client_name = data.get('name', 'User')
            client_email = data.get('email', email) # already validated above
            client_phone = data.get('phone', '')
            client_gender = data.get('gender', '')
            client_country = data.get('location', '')
            client_domain = data.get('job_domain', '')
            client_skills = ", ".join(skills_list) if skills_list else ""
            
            print(f"📦 [ONBOARDING] Creating/Updating profile for client_id={client_id}, email={client_email}")
            
            # Use client_email for the conflict check since it's UNIQUE in the schema
            upsert_client_q = text("""
                INSERT INTO public.clients (
                    client_id, client_name, client_email, client_phone, 
                    client_gender, client_country, client_job_domain, 
                    client_experience, client_skills, client_resume,
                    is_active, is_paid, created_at, updated_at
                )
                VALUES (
                    :cid, :name, :email, :phone, 
                    :gender, :country, :domain, 
                    :exp, :skills, :resume_url,
                    true, true, NOW(), NOW()
                )
                ON CONFLICT (client_email) DO UPDATE SET
                    client_id         = EXCLUDED.client_id,
                    client_name       = EXCLUDED.client_name,
                    client_phone      = EXCLUDED.client_phone,
                    client_gender     = EXCLUDED.client_gender,
                    client_country    = EXCLUDED.client_country,
                    client_job_domain = EXCLUDED.client_job_domain,
                    client_experience = EXCLUDED.client_experience,
                    client_skills     = EXCLUDED.client_skills,
                    client_resume     = EXCLUDED.client_resume,
                    updated_at        = NOW()
            """)
            
            await db.execute(upsert_client_q, {
                "cid": client_id,
                "name": client_name,
                "email": client_email,
                "phone": client_phone,
                "gender": client_gender,
                "country": client_country,
                "domain": client_domain,
                "exp": str(raw_exp),
                "skills": client_skills,
                "resume_url": str(public_url)
            })

        # ─── 3. Save resume metadata ───
        insert_q = text("""
            INSERT INTO resumes_data (id, client_id, resume_id, resume_url, experience, skills)
            VALUES (gen_random_uuid(), :client_id, :resume_id, :resume_url, :experience, :skills)
            RETURNING id
        """)
        
        db_result = await db.execute(insert_q, {
            "client_id": client_id if client_id else "client-default",
            "resume_id": resume_id,
            "resume_url": str(public_url),
            "experience": raw_exp,
            "skills": skills_list
        })
        await db.commit()
        
        new_row_id = db_result.scalar()

        return {
            "success": True,
            "id": obfuscate_id(new_row_id),
            "resume_id": resume_id,
            "message": "Resume and full data stored securely."
        }
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        print(f"❌ Save resume error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/resumes/{client_id}")
async def get_user_resumes(client_id: str, db: AsyncSession = Depends(get_db)):
    """Lists all resumes for a specific client with obfuscated IDs."""
    query = text("SELECT id, resume_id, created_at, resume_url FROM resumes_data WHERE client_id = :id ORDER BY created_at DESC")
    result = await db.execute(query, {"id": client_id})
    rows = result.mappings().all()
    data = []
    for r in rows:
        item = dict(r)
        item['id'] = obfuscate_id(item['id'])
        data.append(item)
    return {"success": True, "data": data}


@router.get("/resume/{id}")
async def deatiled_resume_detail(id: str, db: AsyncSession = Depends(get_db)):
    """Retrieves full details for a single resume by its obfuscated ID."""
    print(f"🔍 [GET /resume/{id}] Received request")
    raw_id = deobfuscate_id(id)
    if not raw_id: 
        print(f"❌ [GET /resume/{id}] Invalid obfuscated ID")
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    print(f"DB -> Fetching metadata for ID: {raw_id}")
    query = text("SELECT * FROM resumes_data WHERE id = :id LIMIT 1")
    result = await db.execute(query, {"id": raw_id})
    row = result.mappings().first()
    if not row: 
        print(f"❌ [GET /resume/{id}] Metadata not found in Neon")
        raise HTTPException(status_code=404, detail="Resume metadata not found")
    
    metadata = dict(row)
    resume_id = metadata.get('resume_id')
    print(f"✅ Metadata found. R2 Mapping (resume_id): {resume_id}")
    
    json_filename = f"JobBoardClients/resumes/{resume_id}/data.json"
    print(f"R2 -> Fetching full data from Cloudflare: {json_filename}")
    full_data = await storage_service.get_json(json_filename)
    
    if not full_data:
        print(f"⚠️ [GET /resume/{id}] R2 data missing. Falling back to Neon metadata.")
        return {"success": True, "data": {**metadata, "id": id}}
    
    print(f"✅ Full data fetched from Cloudflare R2")
    merged_data = {
        **full_data,
        "id": id,
        "client_id": metadata.get('client_id'),
        "resume_url": metadata.get('resume_url'),
        "created_at": metadata.get('created_at')
    }
    return {"success": True, "data": merged_data}


@router.get("/view-resume/{id}")
async def view_resume(id: str, db: AsyncSession = Depends(get_db)):
    """Redirects to the actual PDF/file URL for a resume."""
    raw_id = deobfuscate_id(id)
    if not raw_id:
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    query = text("SELECT resume_url FROM resumes_data WHERE id = :id LIMIT 1")
    result = await db.execute(query, {"id": raw_id})
    row = result.mappings().first()
    if not row or not row['resume_url']:
        raise HTTPException(status_code=404, detail="Resume file not found")
        
    return RedirectResponse(url=row['resume_url'])


@router.get("/client/{client_id}")
async def get_client_profile(client_id: str, db: AsyncSession = Depends(get_db)):
    """Retrieves full client profile, latest resume detail, and all resume history in ONE request."""
    print(f"🚀 [GET /client/{client_id}] Unified profile fetch started")
    try:
        c_query = text("SELECT * FROM clients WHERE client_id = :id LIMIT 1")
        result = await db.execute(c_query, {"id": client_id})
        client_row = result.mappings().first()
        if not client_row:
            raise HTTPException(status_code=404, detail="Client not found")
        
        r_list_query = text("SELECT id, resume_id, created_at, resume_url FROM resumes_data WHERE client_id = :id ORDER BY created_at DESC")
        r_result = await db.execute(r_list_query, {"id": client_id})
        resume_rows = r_result.mappings().all()
        
        resumes_list = []
        full_resume_data = None
        
        for i, row in enumerate(resume_rows):
            item = dict(row)
            obf_id = obfuscate_id(item['id'])
            resumes_list.append({**item, "id": obf_id})
            
            if i == 0:
                print(f"R2 -> Fetching latest resume detail: {item['resume_id']}")
                json_filename = f"JobBoardClients/resumes/{item['resume_id']}/data.json"
                r2_data = await storage_service.get_json(json_filename)
                
                if r2_data:
                    full_resume_data = {
                        **r2_data,
                        "id": obf_id,
                        "resume_url": item.get('resume_url'),
                        "created_at": item.get('created_at')
                    }
                else:
                    full_resume_data = {**item, "id": obf_id}

        print(f"✅ Unified profile sent: {len(resumes_list)} resumes found.")
        return {
            "success": True,
            "client": dict(client_row),
            "resumes": resumes_list,
            "resume": full_resume_data
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Unified profile error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/resume/{id}")
async def update_resume_detail(id: str, data: dict = Body(...), db: AsyncSession = Depends(get_db)):
    """Updates resume details (Hybrid Model: Updates R2 JSON and Neon metadata)."""
    raw_id = deobfuscate_id(id)
    if not raw_id:
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    try:
        q = text("SELECT resume_id, client_id FROM resumes_data WHERE id = :id LIMIT 1")
        result = await db.execute(q, {"id": raw_id})
        row = result.mappings().first()
        if not row:
            raise HTTPException(status_code=404, detail="Resume not found")
        
        resume_id = row['resume_id']
        json_filename = f"JobBoardClients/resumes/{resume_id}/data.json"
        
        keys_to_remove = ["id", "client_id", "created_at"]
        update_data = {k: v for k, v in data.items() if k not in keys_to_remove}
        
        if update_data:
            current_full_data = await storage_service.get_json(json_filename) or {}
            updated_full_data = {**current_full_data, **update_data}
            await storage_service.upload_json(json_filename, updated_full_data)
            
            metadata_update = {}
            if "skills" in update_data:
                skills = update_data["skills"]
                if isinstance(skills, str):
                    skills = [s.strip() for s in skills.split(",") if s.strip()]
                metadata_update["skills"] = skills
            
            if "total_experience_years" in update_data:
                metadata_update["experience"] = float(update_data.get("total_experience_years", updated_full_data.get("total_experience_years", 0)))

            if metadata_update:
                set_clause = ", ".join([f"{k} = :{k}" for k in metadata_update.keys()])
                q = text(f"UPDATE resumes_data SET {set_clause} WHERE id = :id")
                await db.execute(q, {**metadata_update, "id": raw_id})
                await db.commit()
        
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        print(f"❌ Update resume error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/resume/{id}")
async def delete_resume(id: str, db: AsyncSession = Depends(get_db)):
    """Deletes a resume record from Neon and R2."""
    raw_id = deobfuscate_id(id)
    if not raw_id:
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    try:
        q = text("SELECT resume_id FROM resumes_data WHERE id = :id LIMIT 1")
        result = await db.execute(q, {"id": raw_id})
        row = result.mappings().first()
        
        if row:
            await db.execute(text("DELETE FROM resumes_data WHERE id = :id"), {"id": raw_id})
            await db.commit()
            print(f"✅ Resume deleted: {raw_id}")
            
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        print(f"❌ Delete resume error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/client/{client_id}")
async def update_client_profile(client_id: str, payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
    """Updates client and resume profile fields."""
    try:
        client_keys = [
            "client_name", "client_phone", "client_gender", "client_country",
            "client_job_domain", "client_experience", "client_skills",
            "client_linkedin", "client_github", "client_portfolio"
        ]
        client_update = {k: v for k, v in payload.items() if k in client_keys}
        if client_update:
            set_clause = ", ".join([f"{k} = :{k}" for k in client_update.keys()])
            q = text(f"UPDATE clients SET {set_clause}, updated_at = NOW() WHERE client_id = :id")
            await db.execute(q, {**client_update, "id": client_id})
            
        resume_keys = [
            "name", "phone", "gender", "location", "skills", "experience",
            "projects", "education", "certifications", "linkedin", "github", "portfolio"
        ]
        resume_update = {k: v for k, v in payload.items() if k in resume_keys}
        
        if resume_update:
            q = text("SELECT resume_id FROM resumes_data WHERE client_id = :id ORDER BY created_at DESC LIMIT 1")
            result = await db.execute(q, {"id": client_id})
            row = result.mappings().first()
            
            if row:
                resume_id = row['resume_id']
                json_filename = f"JobBoardClients/resumes/{resume_id}/data.json"
                
                current_full_data = await storage_service.get_json(json_filename) or {}
                updated_full_data = {**current_full_data, **resume_update}
                await storage_service.upload_json(json_filename, updated_full_data)
                
                metadata_update = {}
                if "skills" in resume_update:
                    skills = resume_update["skills"]
                    if isinstance(skills, str):
                        skills = [s.strip() for s in skills.split(",") if s.strip()]
                    metadata_update["skills"] = skills
                
                if "total_experience_years" in resume_update:
                    metadata_update["experience"] = float(resume_update.get("total_experience_years", current_full_data.get("total_experience_years", 0)))

                if metadata_update:
                    set_clause = ", ".join([f"{k} = :{k}" for k in metadata_update.keys()])
                    q = text(f"UPDATE resumes_data SET {set_clause} WHERE client_id = :id AND resume_id = :resume_id")
                    await db.execute(q, {**metadata_update, "id": client_id, "resume_id": resume_id})
            
        await db.commit()
        
        # Clear client cache so changes reflect immediately
        cache.delete(f"client:{client_id}")
        
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        print(f"❌ Profile update error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/update-client-domain")
async def update_client_domain(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
    """Updates client domain/roles with a 12-hour lock enforcement."""
    try:
        client_id = payload.get("client_id")
        new_domain = payload.get("client_job_domain")
        new_roles = payload.get("client_chosen_alternative_jobroles", [])
        
        if not client_id or not new_domain:
            raise HTTPException(status_code=400, detail="client_id and client_job_domain are required")
            
        q = text("SELECT domain_changed_at FROM clients WHERE client_id = :id LIMIT 1")
        result = await db.execute(q, {"id": client_id})
        row = result.mappings().first()
        if not row:
            raise HTTPException(status_code=404, detail="Client not found")
            
        if row['domain_changed_at']:
            last_change = row['domain_changed_at']
            if last_change.tzinfo is None:
                last_change = last_change.replace(tzinfo=datetime.timezone.utc)
            
            elapsed = (datetime.datetime.now(datetime.timezone.utc) - last_change).total_seconds()
            if elapsed < 12 * 3600:
                hours_left = round(float(12 - (elapsed / 3600)), 1)
                return {
                    "success": False, 
                    "message": f"Domain change is locked. Please wait {hours_left} more hours."
                }
                
        update_q = text("""
            UPDATE clients SET 
                client_job_domain = :domain, 
                client_chosen_alternative_jobroles = :roles,
                domain_changed_at = NOW(),
                updated_at = NOW()
            WHERE client_id = :id
        """)
        await db.execute(update_q, {
            "domain": new_domain, 
            "roles": json.dumps(new_roles), 
            "id": client_id
        })
        await db.commit()
        
        # Clear client cache
        cache.delete(f"client:{client_id}")
        
        print(f"✅ Domain updated for client: {client_id}")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        print(f"❌ Domain update error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------------
# PayPal Logic
# -------------------------------

async def get_paypal_token():
    if not settings.PAYPAL_CLIENT_ID or not settings.PAYPAL_CLIENT_SECRET:
        return None
    
    url = "https://api-m.paypal.com/v1/oauth2/token" if settings.PAYPAL_MODE == "live" else "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    auth = base64.b64encode(f"{settings.PAYPAL_CLIENT_ID}:{settings.PAYPAL_CLIENT_SECRET}".encode()).decode()
    
    headers = {
        "Authorization": f"Basic {auth}",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, headers=headers, data=data)
            response.raise_for_status()
            return response.json().get("access_token")
        except Exception as e:
            print(f"❌ [PayPal] Token fetch failed: {e}")
            return None


@router.post("/paypal-create-order")
async def paypal_create_order(payload: dict = Body(...)):
    token = await get_paypal_token()
    if not token:
        raise HTTPException(status_code=500, detail="PayPal auth failed")
    
    base_url = "https://api-m.paypal.com" if settings.PAYPAL_MODE == "live" else "https://api-m.sandbox.paypal.com"
    url = f"{base_url}/v2/checkout/orders"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    order_payload = {
        "intent": "CAPTURE",
        "purchase_units": [{
            "amount": {
                "currency_code": "USD",
                "value": str(payload.get("amount"))
            }
        }]
    }
    
    print(f"\n💳 [paypal-create-order] ── plan='{payload.get('planName')}', amount='{payload.get('amount')}'")
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=order_payload)
        res_data = response.json()
        print(f"   [paypal-create-order] ✅ Order Created: {res_data.get('id')}")
        return res_data


@router.post("/paypal-capture-order")
async def paypal_capture_order(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
    try:
        order_id = payload.get("orderID")
        user_info = payload.get("userInfo", {}) or payload.get("formData", {})
        plan_name = payload.get("planName", "")
        amount_raw = payload.get("amount")
        lead_id = payload.get("leadId")  # NEW: used for journey tracking

        token = await get_paypal_token()
        if not token:
            raise HTTPException(status_code=500, detail="PayPal auth failed")
        
        base_url = "https://api-m.paypal.com" if settings.PAYPAL_MODE == "live" else "https://api-m.sandbox.paypal.com"
        url = f"{base_url}/v2/checkout/orders/{order_id}/capture"
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers)
            capture_data = response.json()
        
        print(f"[PayPal] Capture response status: {capture_data.get('status')}")
        
        if capture_data.get("status") == "COMPLETED":
            email = user_info.get("email", "")
            first_name = user_info.get("firstName", "User")
            last_name = user_info.get("lastName", "")
            middle_name = user_info.get("middleName", "")
            phone = user_info.get("phone", "")
            terms_accepted = bool(user_info.get("termsAccepted", True))

            # Phone Normalization (numbers and leading + only)
            clean_phone = "".join(filter(str.isdigit, phone))
            if phone.strip().startswith("+"):
                clean_phone = "+" + clean_phone

            try:
                amount = float(amount_raw) if amount_raw is not None else 0.0
            except (ValueError, TypeError):
                amount = 0.0

            plan_lower = plan_name.lower()
            if "growth" in plan_lower:
                cycle = 60
            elif "pro" in plan_lower:
                cycle = 90
            else:
                cycle = 30

            start = datetime.datetime.now(datetime.timezone.utc)
            end = start + datetime.timedelta(days=cycle)

            # ── STEP 1: Insert into transactions ──
            try:
                insert_q = text("""
                    INSERT INTO transactions (
                        order_id, email, phone_number, first_name, middle_name,
                        last_name, plan_name, amount, currency, status, terms_accepted,
                        paypal_details, access_status, start_date, end_date, subscription_cycle
                    )
                    VALUES (
                        :oid, :email, :phone, :fn, :mn,
                        :ln, :plan, :amt, 'USD', 'COMPLETED', :terms,
                        :details, 'active', :start, :end, :cycle
                    )
                    ON CONFLICT (order_id) DO UPDATE SET
                        status = EXCLUDED.status,
                        email = EXCLUDED.email,
                        phone_number = EXCLUDED.phone_number,
                        first_name = EXCLUDED.first_name,
                        middle_name = EXCLUDED.middle_name,
                        last_name = EXCLUDED.last_name,
                        plan_name = EXCLUDED.plan_name,
                        amount = EXCLUDED.amount,
                        currency = EXCLUDED.currency,
                        terms_accepted = EXCLUDED.terms_accepted,
                        paypal_details = EXCLUDED.paypal_details,
                        access_status = EXCLUDED.access_status,
                        start_date = EXCLUDED.start_date,
                        end_date = EXCLUDED.end_date,
                        subscription_cycle = EXCLUDED.subscription_cycle
                """)
                await db.execute(insert_q, {
                    "oid": order_id,
                    "email": email,
                    "phone": clean_phone,
                    "fn": first_name,
                    "mn": middle_name,
                    "ln": last_name,
                    "plan": plan_name,
                    "amt": amount,
                    "terms": terms_accepted,
                    "details": json.dumps(capture_data),
                    "start": start,
                    "end": end,
                    "cycle": cycle,
                })
                await db.commit()
                print(f"OK: [PayPal] Transaction saved to DB for order: {order_id}")
            except Exception as db_err:
                await db.rollback()
                print(f"ERROR: [PayPal] CRITICAL - transactions INSERT failed: {db_err}")
                raise HTTPException(status_code=500, detail=f"DB insert failed: {str(db_err)}")

            # ── STEP 2: Update Journey Status in leads ──
            try:
                if lead_id:
                    # Specific update for this journey
                    leads_q = text("""
                        UPDATE leads 
                        SET payment_done = true, payment_done_at = NOW()
                        WHERE id = :id AND email = :email
                    """)
                    await db.execute(leads_q, {"id": lead_id, "email": email})
                else:
                    # Fallback to email-based (backward compatibility)
                    leads_q = text("""
                        UPDATE leads 
                        SET payment_done = true, payment_done_at = NOW()
                        WHERE email = :email AND payment_done = false
                    """)
                    await db.execute(leads_q, {"email": email})
                await db.commit()
                print(f"OK: [PayPal] Lead journey updated for: {email}")
            except Exception as leads_err:
                await db.rollback()
                print(f"WARNING: [PayPal] leads update warning (non-fatal): {leads_err}")

            # ── STEP 3: Create neon_auth user account (FINAL STEP) ──
            static_pass = "bigcareerdream@1092"
            try:
                from app.api.v1.endpoints.auth import pwd_store
                pwd_entry = pwd_store.get(email)
                if pwd_entry and time.time() < pwd_entry["expiry"]:
                    static_pass = pwd_entry["password"]
            except Exception:
                pass

            full_name = f"{first_name} {last_name}".strip()
            from app.api.v1.endpoints.auth import create_neon_auth_user
            user_id = await create_neon_auth_user(db, email, static_pass, name=full_name)
            
            if not user_id:
                print(f"ERROR: [PayPal] neon_auth user creation FAILED for {email}")
                raise HTTPException(status_code=500, detail="Failed to create user account")
            
            print(f"OK: [PayPal] Auth user created for: {email} (ID: {user_id})")

            # ── STEP 3.5: Sync to clients table (CRITICAL) ──
            try:
                # Sync to public.clients using the ID we just got
                await db.execute(
                    text("""
                        INSERT INTO clients (client_id, client_name, client_email, is_paid, is_active)
                        VALUES (:id, :name, :email, TRUE, FALSE)
                        ON CONFLICT (client_email) DO UPDATE 
                        SET client_id = EXCLUDED.client_id, is_paid = TRUE
                    """),
                    {"id": user_id, "name": full_name, "email": email}
                )
                await db.commit()
                print(f"OK: [PayPal] clients table synced for: {email} with client_id: {user_id}")
            except Exception as client_err:
                print(f"WARNING: [PayPal] clients sync issue (non-fatal): {client_err}")
                await db.rollback()
            except Exception as client_err:
                print(f"WARNING: [PayPal] clients sync issue (non-fatal): {client_err}")
                await db.rollback()

            # ── STEP 4: Send welcome email ──
            try:
                from app.api.v1.endpoints.auth import send_email_async
                body = f"""<html><body style='font-family:Arial,sans-serif;'>
                    <h2>Welcome to Big Career Dream, {first_name}!</h2>
                    <p>Your payment of <strong>${amount}</strong> for the <strong>{plan_name}</strong> plan has been processed.</p>
                    <p><strong>Login Credentials:</strong></p>
                    <p>📧 <strong>Email:</strong> {email}<br>🔑 <strong>Password:</strong> {static_pass}</p>
                    <p>Please sign in at <a href='https://bigcareerdream-merged.vercel.app'>bigcareerdream</a> to access your dashboard.</p>
                </body></html>"""
                await send_email_async(email, "Payment Confirmed - Big Career Dream Account Credentials", body)
                print(f"✅ [PayPal] Welcome email sent to: {email}")
            except Exception as mail_err:
                print(f"⚠️ [PayPal] welcome email warning (non-fatal): {mail_err}")

        return {**capture_data, "order_id": order_id}

    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        print(f"❌ PayPal capture error: {e}")
        raise HTTPException(status_code=500, detail=str(e))