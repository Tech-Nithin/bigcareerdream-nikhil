# from fastapi import APIRouter, Depends, HTTPException, Body
# import json
# import uuid
# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
# from sqlalchemy import text
# from app.db.session import get_db, database_url, connect_args
# from app.utils.security import hash_password
# from app.core.config import settings
# import random
# import time
# import hashlib
# import aiosmtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from typing import Dict, Any
# import os
# import datetime

# router = APIRouter()

# # -------------------------------
# # Memory Store for OTPs
# # -------------------------------
# otp_store: Dict[str, Dict[str, Any]] = {}

# # -------------------------------
# # Legacy Parity Helpers
# # -------------------------------

# def hash_password_scrypt(password: str) -> str:
#     salt = os.urandom(16)
#     derived = hashlib.scrypt(password.encode(), salt=salt, n=16384, r=8, p=1, dklen=64)
#     return f"{salt.hex()}:{derived.hex()}"

# def verify_password_scrypt(password: str, stored_hash: str) -> bool:
#     try:
#         parts = stored_hash.split(":")
#         if len(parts) != 2:
#             return False
#         salt = bytes.fromhex(parts[0])
#         expected = bytes.fromhex(parts[1])
#         derived = hashlib.scrypt(password.encode(), salt=salt, n=16384, r=8, p=1, dklen=64)
#         return derived == expected
#     except Exception:
#         return False

# async def create_neon_auth_user(db_ignored: Any, email: str, password: str, name: str = "User"):
#     """
#     Creates user in neon_auth using an independent session to avoid transaction conflicts.
#     Ensures both a user record and a credential account record exist.
#     """
#     if not database_url:
#         print(f"❌ [neon_auth] Cannot create user: DATABASE_URL is missing")
#         return False

#     # Create local engine and session locally (Lazy Init)
#     _local_engine = create_async_engine(
#         database_url,
#         connect_args=connect_args,
#         pool_size=1,
#         max_overflow=0
#     )
#     _LocalSession = async_sessionmaker(_local_engine, expire_on_commit=False, class_=AsyncSession)

#     async with _LocalSession() as session:
#         try:
#             # 1. Ensure User exists and get ID
#             check_q = text('SELECT id FROM neon_auth."user" WHERE email = :email')
#             res = await session.execute(check_q, {"email": email})
#             row = res.first()
            
#             now = datetime.datetime.now(datetime.timezone.utc)
            
#             if row:
#                 user_id = row[0]
#                 print(f"ℹ️ [neon_auth] User exists: {email} (ID: {user_id})")
#             else:
#                 user_id = str(uuid.uuid4())
#                 user_q = text("""
#                     INSERT INTO neon_auth."user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
#                     VALUES (:uid, :name, :email, true, :now, :now)
#                     ON CONFLICT (email) DO NOTHING
#                 """)
#                 await session.execute(user_q, {
#                     "uid": user_id,
#                     "name": name,
#                     "email": email,
#                     "now": now
#                 })
#                 print(f"✅ [neon_auth] Created user: {email}")

#             # 2. Ensure Account exists for this user
#             hashed_password = hash_password_scrypt(password)
#             acc_id = str(uuid.uuid4())

#             acc_q = text("""
#                 INSERT INTO neon_auth.account (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
#                 VALUES (:aid, :uid, 'credential', :uid, :pass, :now, :now)
#                 ON CONFLICT ("providerId", "userId") DO NOTHING
#             """)
#             await session.execute(acc_q, {
#                 "aid": acc_id,
#                 "uid": user_id,
#                 "pass": hashed_password,
#                 "now": now
#             })

#             await session.commit()
#             print(f"✅ [neon_auth] SAVED — user storage verified for: {email}")
#             return True

#         except Exception as e:
#             await session.rollback()
#             print(f"❌ [neon_auth] NOT SAVED — storage failed for {email}: {e}")
#             return False
#         finally:
#             await session.close()
#             await _local_engine.dispose()


# async def send_email_async(to_email: str, subject: str, body_html: str):
#     if not settings.GMAIL_USER or not settings.GMAIL_APP_PASSWORD:
#         return False
#     try:
#         message = MIMEMultipart()
#         message["From"] = f"Big Career Dream <{settings.GMAIL_USER}>"
#         message["To"] = to_email
#         message["Subject"] = subject
#         message.attach(MIMEText(body_html, "html"))
#         await aiosmtplib.send(
#             message,
#             hostname="smtp.gmail.com",
#             port=587,
#             username=settings.GMAIL_USER,
#             password=settings.GMAIL_APP_PASSWORD,
#             use_tls=False,
#             start_tls=True,
#         )
#         return True
#     except Exception:
#         return False

# # -------------------------------
# # Endpoints
# # -------------------------------

# @router.post("/generate-otp")
# async def generate_otp(payload: dict = Body(...)):
#     email = payload.get("email", "").strip()
#     if not email:
#         raise HTTPException(status_code=400, detail="Email required")
    
#     otp = str(random.randint(100000, 999999))
#     otp_store[email] = {"otp": otp, "expiry": time.time() + 300}
    
#     body = f"""
#     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
#         <h2 style="color: #f97316; text-align: center;">Verification Code</h2>
#         <p style="font-size: 16px; color: #333;">Your verification code for Big Career Dream is:</p>
#         <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; color: #f97316; letter-spacing: 5px; border-radius: 5px;">
#             {otp}
#         </div>
#         <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px;">This code expires in 5 minutes.</p>
#     </div>
#     """
    
#     success = await send_email_async(email, "Your Verification Code - Big Career Dream", body)
#     if success:
#         return {"success": True, "message": "OTP sent successfully"}
#     else:
#         raise HTTPException(status_code=500, detail="Failed to send email")

# @router.post("/verify-otp")
# async def verify_otp(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     email = payload.get("email")
#     otp_received = payload.get("otp")
    
#     first_name = payload.get("firstName", "")
#     last_name = payload.get("lastName", "")
#     full_name = f"{first_name} {last_name}".strip() or "User"
    
#     static_pass = "bigcareerdream@1092"

#     stored = otp_store.get(email)
#     if not stored:
#         raise HTTPException(status_code=404, detail="No OTP found")
#     if time.time() > stored["expiry"]:
#         otp_store.pop(email)
#         raise HTTPException(status_code=400, detail="OTP expired")
#     if stored["otp"] != otp_received:
#         raise HTTPException(status_code=400, detail="Invalid OTP")

#     otp_store.pop(email)

#     try:
#         user_created = await create_neon_auth_user(db, email, static_pass, name=full_name)
#     except Exception as auth_err:
#         print(f"⚠️ [verify-otp] Auth user creation failed (non-fatal): {auth_err}")

#     return {"success": True, "message": "OTP verified"}

# @router.post("/save-verified-user")
# async def save_verified_user(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     try:
#         email = payload.get("email")
#         first_name = payload.get("firstName", "User")
#         middle_name = payload.get("middleName", "")
#         last_name = payload.get("lastName", "")
#         order_id = payload.get("orderId")
#         static_pass = "bigcareerdream@1092"

#         if not order_id:
#             try:
#                 insert_q = text("""
#                     INSERT INTO leads (first_name, middle_name, last_name, email, phone, plan_name, price)
#                     VALUES (:fn, :mn, :ln, :email, :phone, :plan, :price)
#                     ON CONFLICT (email) DO NOTHING
#                 """)
#                 await db.execute(insert_q, {
#                     "fn": first_name, "mn": middle_name, "ln": last_name, 
#                     "email": email, "phone": payload.get("phone"), 
#                     "plan": payload.get("planName"), "price": str(payload.get("price", ""))
#                 })
#                 await db.commit()
#             except Exception as lead_err:
#                 print(f"[save-verified-user] leads insert warning (non-fatal): {lead_err}")
#                 return {"success": True, "message": "Lead capture skipped."}
#         else:
#             plan_name = payload.get("planName", "").lower()
#             cycle = 30
#             if "growth" in plan_name: cycle = 60
#             elif "pro" in plan_name: cycle = 90
            
#             start = datetime.datetime.now(datetime.timezone.utc)
#             end = start + datetime.timedelta(days=cycle)
            
#             try:
#                 insert_tx = text("""
#                     INSERT INTO transactions (order_id, email, status, plan_name, amount, access_status, start_date, end_date, subscription_cycle)
#                     VALUES (:oid, :email, 'COMPLETED', :plan, :amt, 'active', :start, :end, :cycle)
#                     ON CONFLICT (order_id) DO UPDATE SET 
#                         status = EXCLUDED.status,
#                         start_date = EXCLUDED.start_date,
#                         end_date = EXCLUDED.end_date,
#                         subscription_cycle = EXCLUDED.subscription_cycle
#                 """)
#                 await db.execute(insert_tx, {
#                     "oid": order_id, "email": email, "plan": payload.get("planName"),
#                     "amt": payload.get("price"), "start": start, "end": end, "cycle": cycle
#                 })
#                 await db.commit()
#             except Exception as tx_err:
#                 await db.rollback()
#                 raise HTTPException(status_code=500, detail=f"Transaction save failed: {str(tx_err)}")

#             full_name = f"{first_name} {last_name}".strip()
#             await create_neon_auth_user(db, email, static_pass, name=full_name)

#             try:
#                 body = f"<html><body><h2>Account Credentials</h2><p>Email: {email}</p><p>Password: {static_pass}</p></body></html>"
#                 await send_email_async(email, "Your Account Credentials", body)
#             except Exception: pass

#         await db.commit()
#         return {"success": True}
#     except Exception as e:
#         await db.rollback()
#         raise HTTPException(status_code=500, detail=str(e))

# @router.post("/payment-success")
# async def payment_success(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     try:
#         lead_id = payload.get("lead_id")
#         if not lead_id:
#             raise HTTPException(status_code=400, detail="lead_id is required")

#         lead_query = text("SELECT * FROM leads_information WHERE lead_id = :lead_id LIMIT 1")
#         result = await db.execute(lead_query, {"lead_id": lead_id})
#         lead = result.mappings().first()
#         if not lead:
#             raise HTTPException(status_code=404, detail="Lead not found")

#         parsed_data = {}
#         if lead['parsed_onboarding_data']:
#             if isinstance(lead['parsed_onboarding_data'], str):
#                 parsed_data = json.loads(lead['parsed_onboarding_data'])
#             else:
#                 parsed_data = lead['parsed_onboarding_data']

#         client_check_query = text("SELECT * FROM clients WHERE client_email = :email LIMIT 1")
#         result = await db.execute(client_check_query, {"email": lead['lead_email']})
#         existing_client = result.mappings().first()
        
#         client_id = lead_id 
        
#         if existing_client:
#             update_q = text("""
#                 UPDATE clients SET is_paid = TRUE, client_resume = :resume, client_job_domain = :domain, updated_at = NOW()
#                 WHERE client_id = :client_id RETURNING *
#             """)
#             result = await db.execute(update_q, {
#                 "resume": parsed_data.get('resume_url'),
#                 "domain": parsed_data.get('job_domain'),
#                 "client_id": existing_client['client_id']
#             })
#             client_row = result.mappings().first()
#         else:
#             insert_q = text("""
#                 INSERT INTO clients (client_id, client_name, client_email, client_phone, client_country, client_job_domain, client_experience, client_skills, client_resume, is_paid, is_active, created_at)
#                 VALUES (:id, :name, :email, :phone, :country, :domain, :exp, :skills, :resume, TRUE, FALSE, NOW()) RETURNING *
#             """)
#             result = await db.execute(insert_q, {
#                 "id": client_id, "name": lead['lead_name'], "email": lead['lead_email'],
#                 "phone": lead['lead_phone'], "country": lead['lead_country'],
#                 "domain": parsed_data.get('job_domain'), 
#                 "exp": str(parsed_data.get('total_experience_years', '0')),
#                 "skills": str(parsed_data.get('skills', [])),
#                 "resume": parsed_data.get('resume_url')
#             })
#             client_row = result.mappings().first()

#         return {"success": True, "data": dict(client_row) if client_row else {}}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @router.post("/login")
# async def login(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     try:
#         email = payload.get("email")
#         password = payload.get("password")
#         if not email or not password:
#             raise HTTPException(status_code=400, detail="Required email and password")

#         hp = hash_password(password)
#         # 1. Check standard clients table
#         query = text("SELECT * FROM clients WHERE client_email = :email AND password_hash = :hp LIMIT 1")
#         result = await db.execute(query, {"email": email, "hp": hp})
#         row = result.mappings().first()
        
#         if row:
#             print(f"✅ [login] Found in clients table: {email}")
#             client = dict(row)
#             client.pop('password_hash', None)
#             return {"success": True, "data": client}

#         print(f"ℹ️ [login] Not found in clients table (or password mismatch), checking neon_auth fallback for: {email}")

#         # 2. Fallback: Check neon_auth."user" / neon_auth.account (actual Neon DB schema)
#         legacy_q = text("""
#             SELECT a.password, u.name, u.id
#             FROM neon_auth."user" u
#             JOIN neon_auth.account a ON a."userId" = u.id AND a."providerId" = 'credential'
#             WHERE u.email = :email
#         """)
#         l_result = await db.execute(legacy_q, {"email": email})
#         l_row = l_result.mappings().first()
        
#         if l_row:
#             print(f"✅ [login] Found in neon_auth tables: {email} (ID: {l_row['id']})")
#             if verify_password_scrypt(password, l_row['password']):
#                 print(f"✅ [login] Password verified for neon_auth user: {email}")
#                 # Check active subscription
#                 tx_q = text("""
#                     SELECT plan_name, access_status, end_date
#                     FROM transactions
#                     WHERE email = :email
#                       AND access_status = 'active'
#                       AND end_date > NOW()
#                     ORDER BY created_at DESC
#                     LIMIT 1
#                 """)
#                 tx_result = await db.execute(tx_q, {"email": email})
#                 tx_row = tx_result.mappings().first()

#                 if not tx_row:
#                     print(f"⚠️ [login] No active subscription for: {email}")
#                     return {
#                         "success": False,
#                         "message": "No active subscription found. Please purchase a plan to access your account."
#                     }

#                 print(f"✅ [login] Active subscription found: {tx_row['plan_name']}")
#                 client_q = text("SELECT * FROM clients WHERE client_email = :email LIMIT 1")
#                 res = await db.execute(client_q, {"email": email})
#                 client = res.mappings().first()
#                 if client:
#                     c_dict = dict(client)
#                     c_dict.pop('password_hash', None)
#                     c_dict['plan_name'] = tx_row['plan_name']
#                     c_dict['access_status'] = tx_row['access_status']
#                     c_dict['subscription_end'] = str(tx_row['end_date'])
#                     return {"success": True, "data": c_dict}
#                 return {"success": True, "data": {"client_email": email, "client_name": l_row['name'] or email}}
#             else:
#                 print(f"❌ [login] Password verification FAILED for neon_auth user: {email}")
#         else:
#             print(f"❌ [login] User NOT FOUND in neon_auth tables: {email}")
            
#         return {"success": False, "message": "Invalid credentials"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @router.post("/login-legacy")
# async def login_legacy(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     try:
#         email, password = payload.get("email", "").strip(), payload.get("password")
#         query = text("""
#             SELECT a.password FROM neon_auth."user" u
#             JOIN neon_auth.account a ON a."userId" = u.id AND a."providerId" = 'credential'
#             WHERE u.email = :email
#         """)
#         result = await db.execute(query, {"email": email})
#         row = result.mappings().first()
#         if row and row['password'] and verify_password_scrypt(password, row['password']):
#             return {"success": True, "message": "Valid credentials"}
#         return {"success": False, "message": "Invalid credentials"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))































# from fastapi import APIRouter, Depends, HTTPException, Body
# import json
# import uuid
# import httpx
# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
# from sqlalchemy import text
# from app.db.session import get_db, database_url, connect_args
# from app.utils.security import hash_password
# from app.core.config import settings
# import random
# import time
# import hashlib
# import aiosmtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from typing import Dict, Any
# import os
# import datetime

# router = APIRouter()

# # -------------------------------
# # Memory Store for OTPs
# # -------------------------------
# otp_store: Dict[str, Dict[str, Any]] = {}

# # -------------------------------
# # Helpers
# # -------------------------------

# def hash_password_scrypt(password: str) -> str:
#     salt = os.urandom(16)
#     derived = hashlib.scrypt(password.encode(), salt=salt, n=16384, r=8, p=1, dklen=64)
#     return f"{salt.hex()}:{derived.hex()}"

# def verify_password_scrypt(password: str, stored_hash: str) -> bool:
#     try:
#         parts = stored_hash.split(":")
#         if len(parts) != 2:
#             return False
#         salt = bytes.fromhex(parts[0])
#         expected = bytes.fromhex(parts[1])
#         derived = hashlib.scrypt(password.encode(), salt=salt, n=16384, r=8, p=1, dklen=64)
#         return derived == expected
#     except Exception:
#         return False


# # ─────────────────────────────────────────────────────────────────────────────
# # THE ROOT CAUSE FIX:
# #
# # Neon Auth (Better Auth) is a MANAGED SERVICE.
# # It uses its own REST API to create/verify users.
# # You must NEVER insert directly into neon_auth.* tables with raw SQL.
# #
# # The tables neon_auth."user" and neon_auth.account with camelCase quoted
# # columns DO NOT EXIST in Better Auth. Better Auth uses:
# #   - neon_auth.users      (snake_case, no quotes)
# #   - neon_auth.accounts   (snake_case, no quotes)
# #
# # But even with correct table names, direct SQL inserts bypass Better Auth's
# # internal password hashing, constraints, and session machinery — so login
# # always fails with "Invalid credentials".
# #
# # SOLUTION: Call the Neon Auth REST API directly using httpx.
# # NEON_AUTH_URL is already in your .env and Vercel env vars.
# # ─────────────────────────────────────────────────────────────────────────────

# NEON_AUTH_URL = os.getenv("NEON_AUTH_URL", "")

# # async def create_neon_auth_user(db_ignored: Any, email: str, password: str, name: str = "User"):
# #     """
# #     Creates a user in Neon Auth by calling the Neon Auth REST API.
# #     This is the ONLY correct approach — raw SQL inserts into neon_auth
# #     tables bypass Better Auth's internal hashing and always break login.
# #     NEON_AUTH_URL = https://ep-sweet-union-anz0uxkb.neonauth.c-6.us-east-1.aws.neon.tech/neondb/auth
# #     """
# #     if not NEON_AUTH_URL:
# #         print(f"❌ [neon_auth] NEON_AUTH_URL not set — cannot create user {email}")
# #         return False

# #     try:
# #         async with httpx.AsyncClient(timeout=15.0) as client:
# #             response = await client.post(
# #                 f"{NEON_AUTH_URL}/sign-up/email",
# #                 json={"email": email, "password": password, "name": name},
# #                 headers={"Content-Type": "application/json"}
# #             )

# #         if response.status_code in (200, 201):
# #             print(f"✅ [neon_auth] User created via REST API for: {email}")
# #             return True
# #         elif response.status_code == 422:
# #             # User already exists — treat as success
# #             print(f"ℹ️ [neon_auth] User already exists (422) for: {email}")
# #             return True
# #         else:
# #             print(f"❌ [neon_auth] REST API failed for {email}: HTTP {response.status_code} — {response.text}")
# #             return False

# #     except Exception as e:
# #         print(f"❌ [neon_auth] create_neon_auth_user exception for {email}: {e}")
# #         return False



# async def create_neon_auth_user(db_ignored: Any, email: str, password: str, name: str = "User"):
#     """
#     Creates user directly in neon_auth."user" and neon_auth.account tables.
#     Using direct SQL because the Neon Auth REST API has a broken project_config table.
#     Tables confirmed to exist: neon_auth."user", neon_auth.account (camelCase columns)
#     """
#     if not database_url:
#         print(f"❌ [neon_auth] DATABASE_URL missing")
#         return False

#     _engine = create_async_engine(
#         database_url,
#         connect_args=connect_args,
#         pool_size=1,
#         max_overflow=0
#     )
#     _Session = async_sessionmaker(_engine, expire_on_commit=False, class_=AsyncSession)

#     async with _Session() as session:
#         try:
#             now = datetime.datetime.now(datetime.timezone.utc)

#             # Check if user already exists
#             check_q = text('SELECT id FROM neon_auth."user" WHERE email = :email')
#             res = await session.execute(check_q, {"email": email})
#             row = res.first()

#             if row:
#                 user_id = row[0]
#                 print(f"ℹ️ [neon_auth] User already exists: {email}")
#             else:
#                 user_id = str(uuid.uuid4())
#                 await session.execute(text("""
#                     INSERT INTO neon_auth."user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
#                     VALUES (:uid, :name, :email, true, :now, :now)
#                     ON CONFLICT (email) DO NOTHING
#                 """), {"uid": user_id, "name": name, "email": email, "now": now})
#                 print(f"✅ [neon_auth] Created user row: {email}")

#             # Check if account already exists
#             acc_check = text("""
#                 SELECT id FROM neon_auth.account 
#                 WHERE "userId" = :uid AND "providerId" = 'credential'
#             """)
#             acc_res = await session.execute(acc_check, {"uid": user_id})
#             acc_row = acc_res.first()

#             if not acc_row:
#                 hashed_password = hash_password_scrypt(password)
#                 acc_id = str(uuid.uuid4())
#                 await session.execute(text("""
#                     INSERT INTO neon_auth.account (
#                         id, "accountId", "providerId", "userId", 
#                         password, "createdAt", "updatedAt"
#                     )
#                     VALUES (:aid, :uid, 'credential', :uid, :pass, :now, :now)
#                     ON CONFLICT DO NOTHING
#                 """), {"aid": acc_id, "uid": user_id, "pass": hashed_password, "now": now})
#                 print(f"✅ [neon_auth] Created account row: {email}")

#             await session.commit()
#             print(f"✅ [neon_auth] User fully saved: {email}")
#             return True

#         except Exception as e:
#             await session.rollback()
#             print(f"❌ [neon_auth] Failed for {email}: {e}")
#             return False
#         finally:
#             await session.close()
#             await _engine.dispose()


# async def send_email_async(to_email: str, subject: str, body_html: str):
#     if not settings.GMAIL_USER or not settings.GMAIL_APP_PASSWORD:
#         return False
#     try:
#         message = MIMEMultipart()
#         message["From"] = f"Big Career Dream <{settings.GMAIL_USER}>"
#         message["To"] = to_email
#         message["Subject"] = subject
#         message.attach(MIMEText(body_html, "html"))
#         await aiosmtplib.send(
#             message,
#             hostname="smtp.gmail.com",
#             port=587,
#             username=settings.GMAIL_USER,
#             password=settings.GMAIL_APP_PASSWORD,
#             use_tls=False,
#             start_tls=True,
#         )
#         return True
#     except Exception:
#         return False


# # -------------------------------
# # Endpoints
# # -------------------------------

# @router.post("/generate-otp")
# async def generate_otp(payload: dict = Body(...)):
#     email = payload.get("email", "").strip()
#     if not email:
#         raise HTTPException(status_code=400, detail="Email required")

#     otp = str(random.randint(100000, 999999))
#     otp_store[email] = {"otp": otp, "expiry": time.time() + 300}

#     body = f"""
#     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
#         <h2 style="color: #f97316; text-align: center;">Verification Code</h2>
#         <p style="font-size: 16px; color: #333;">Your verification code for Big Career Dream is:</p>
#         <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; color: #f97316; letter-spacing: 5px; border-radius: 5px;">
#             {otp}
#         </div>
#         <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px;">This code expires in 5 minutes.</p>
#     </div>
#     """

#     success = await send_email_async(email, "Your Verification Code - Big Career Dream", body)
#     if success:
#         return {"success": True, "message": "OTP sent successfully"}
#     else:
#         raise HTTPException(status_code=500, detail="Failed to send email")


# @router.post("/verify-otp")
# async def verify_otp(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     """
#     Verify OTP and immediately create user in Neon Auth via REST API.
#     User is created here so they exist before payment completes.
#     """
#     email = payload.get("email")
#     otp_received = payload.get("otp")

#     first_name = payload.get("firstName", "")
#     last_name = payload.get("lastName", "")
#     full_name = f"{first_name} {last_name}".strip() or "User"
#     static_pass = "bigcareerdream@1092"

#     stored = otp_store.get(email)
#     if not stored:
#         raise HTTPException(status_code=404, detail="No OTP found")
#     if time.time() > stored["expiry"]:
#         otp_store.pop(email)
#         raise HTTPException(status_code=400, detail="OTP expired")
#     if stored["otp"] != otp_received:
#         raise HTTPException(status_code=400, detail="Invalid OTP")

#     # OTP valid — remove from store
#     otp_store.pop(email)

#     # ── Create user in Neon Auth via REST API immediately on OTP success ──
#     # Non-fatal: if this fails the OTP verify still returns success
#     try:
#         created = await create_neon_auth_user(db, email, static_pass, name=full_name)
#         if created:
#             print(f"✅ [verify-otp] Neon Auth user created/confirmed for: {email}")
#         else:
#             print(f"⚠️ [verify-otp] Neon Auth user creation failed (non-fatal) for: {email}")
#     except Exception as auth_err:
#         print(f"⚠️ [verify-otp] Auth error (non-fatal): {auth_err}")

#     return {"success": True, "message": "OTP verified"}


# @router.post("/save-verified-user")
# async def save_verified_user(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     try:
#         email = payload.get("email")
#         first_name = payload.get("firstName", "User")
#         middle_name = payload.get("middleName", "")
#         last_name = payload.get("lastName", "")
#         order_id = payload.get("orderId")
#         static_pass = "bigcareerdream@1092"

#         if not order_id:
#             # Lead capture only
#             try:
#                 insert_q = text("""
#                     INSERT INTO leads (first_name, middle_name, last_name, email, phone, plan_name, price)
#                     VALUES (:fn, :mn, :ln, :email, :phone, :plan, :price)
#                     ON CONFLICT (email) DO NOTHING
#                 """)
#                 await db.execute(insert_q, {
#                     "fn": first_name, "mn": middle_name, "ln": last_name,
#                     "email": email, "phone": payload.get("phone"),
#                     "plan": payload.get("planName"), "price": str(payload.get("price", ""))
#                 })
#                 await db.commit()
#             except Exception as lead_err:
#                 print(f"[save-verified-user] leads insert warning (non-fatal): {lead_err}")
#                 return {"success": True, "message": "Lead capture skipped."}
#         else:
#             # Post-payment: save transaction
#             plan_name = payload.get("planName", "").lower()
#             cycle = 30
#             if "growth" in plan_name:
#                 cycle = 60
#             elif "pro" in plan_name:
#                 cycle = 90

#             start = datetime.datetime.now(datetime.timezone.utc)
#             end = start + datetime.timedelta(days=cycle)

#             # ── STEP 1: Save transaction ──
#             try:
#                 insert_tx = text("""
#                     INSERT INTO transactions (
#                         order_id, email, status, plan_name, amount,
#                         access_status, start_date, end_date, subscription_cycle
#                     )
#                     VALUES (:oid, :email, 'COMPLETED', :plan, :amt, 'active', :start, :end, :cycle)
#                     ON CONFLICT (order_id) DO UPDATE SET
#                         status = EXCLUDED.status,
#                         start_date = EXCLUDED.start_date,
#                         end_date = EXCLUDED.end_date,
#                         subscription_cycle = EXCLUDED.subscription_cycle
#                 """)
#                 await db.execute(insert_tx, {
#                     "oid": order_id, "email": email, "plan": payload.get("planName"),
#                     "amt": payload.get("price"), "start": start, "end": end, "cycle": cycle
#                 })
#                 await db.commit()
#                 print(f"✅ [save-verified-user] Transaction saved for order: {order_id}")
#             except Exception as tx_err:
#                 await db.rollback()
#                 raise HTTPException(status_code=500, detail=f"Transaction save failed: {str(tx_err)}")

#             # ── STEP 2: Ensure user exists in Neon Auth (idempotent) ──
#             full_name = f"{first_name} {last_name}".strip()
#             await create_neon_auth_user(db, email, static_pass, name=full_name)

#             # ── STEP 3: Send credentials email ──
#             try:
#                 body = f"""<html><body style="font-family:Arial,sans-serif;">
#                     <h2>Your Big Career Dream Account</h2>
#                     <p>Thank you for your purchase!</p>
#                     <p><strong>Email:</strong> {email}</p>
#                     <p><strong>Password:</strong> {static_pass}</p>
#                     <p>Sign in at <a href="https://bigcareerdream-merged.vercel.app">bigcareerdream</a></p>
#                 </body></html>"""
#                 await send_email_async(email, "Your Account Credentials - Big Career Dream", body)
#             except Exception:
#                 pass

#         return {"success": True}
#     except HTTPException:
#         raise
#     except Exception as e:
#         await db.rollback()
#         raise HTTPException(status_code=500, detail=str(e))


# @router.post("/payment-success")
# async def payment_success(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     try:
#         lead_id = payload.get("lead_id")
#         if not lead_id:
#             raise HTTPException(status_code=400, detail="lead_id is required")

#         lead_query = text("SELECT * FROM leads_information WHERE lead_id = :lead_id LIMIT 1")
#         result = await db.execute(lead_query, {"lead_id": lead_id})
#         lead = result.mappings().first()
#         if not lead:
#             raise HTTPException(status_code=404, detail="Lead not found")

#         parsed_data = {}
#         if lead['parsed_onboarding_data']:
#             if isinstance(lead['parsed_onboarding_data'], str):
#                 parsed_data = json.loads(lead['parsed_onboarding_data'])
#             else:
#                 parsed_data = lead['parsed_onboarding_data']

#         client_check_query = text("SELECT * FROM clients WHERE client_email = :email LIMIT 1")
#         result = await db.execute(client_check_query, {"email": lead['lead_email']})
#         existing_client = result.mappings().first()

#         client_id = lead_id

#         if existing_client:
#             update_q = text("""
#                 UPDATE clients SET is_paid = TRUE, client_resume = :resume,
#                 client_job_domain = :domain, updated_at = NOW()
#                 WHERE client_id = :client_id RETURNING *
#             """)
#             result = await db.execute(update_q, {
#                 "resume": parsed_data.get('resume_url'),
#                 "domain": parsed_data.get('job_domain'),
#                 "client_id": existing_client['client_id']
#             })
#             client_row = result.mappings().first()
#         else:
#             insert_q = text("""
#                 INSERT INTO clients (
#                     client_id, client_name, client_email, client_phone, client_country,
#                     client_job_domain, client_experience, client_skills, client_resume,
#                     is_paid, is_active, created_at
#                 )
#                 VALUES (:id, :name, :email, :phone, :country, :domain, :exp, :skills, :resume, TRUE, FALSE, NOW())
#                 RETURNING *
#             """)
#             result = await db.execute(insert_q, {
#                 "id": client_id, "name": lead['lead_name'], "email": lead['lead_email'],
#                 "phone": lead['lead_phone'], "country": lead['lead_country'],
#                 "domain": parsed_data.get('job_domain'),
#                 "exp": str(parsed_data.get('total_experience_years', '0')),
#                 "skills": str(parsed_data.get('skills', [])),
#                 "resume": parsed_data.get('resume_url')
#             })
#             client_row = result.mappings().first()

#         await db.commit()
#         return {"success": True, "data": dict(client_row) if client_row else {}}
#     except HTTPException:
#         raise
#     except Exception as e:
#         await db.rollback()
#         raise HTTPException(status_code=500, detail=str(e))


# @router.post("/login")
# async def login(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     """
#     Login flow:
#     1. Check standard clients table (admin/legacy users with password_hash)
#     2. Verify via Neon Auth REST API sign-in (PayPal payment users)
#     3. Confirm active transaction exists
#     """
#     try:
#         email = payload.get("email", "").strip()
#         password = payload.get("password", "")
#         if not email or not password:
#             raise HTTPException(status_code=400, detail="Email and password required")

#         # ── PATH 1: Standard clients table ──
#         hp = hash_password(password)
#         query = text("SELECT * FROM clients WHERE client_email = :email AND password_hash = :hp LIMIT 1")
#         result = await db.execute(query, {"email": email, "hp": hp})
#         row = result.mappings().first()

#         if row:
#             print(f"✅ [login] Standard clients table login for: {email}")
#             client = dict(row)
#             client.pop('password_hash', None)
#             return {"success": True, "data": client}

#         print(f"ℹ️ [login] Not in clients table — trying Neon Auth REST API for: {email}")

#         # ── PATH 2: Neon Auth REST API sign-in ──
#         # This is the correct way to verify credentials stored by Neon Auth (Better Auth)
#         if not NEON_AUTH_URL:
#             print(f"❌ [login] NEON_AUTH_URL not configured")
#             return {"success": False, "message": "Invalid credentials"}

#         try:
#             async with httpx.AsyncClient(timeout=15.0) as client_http:
#                 auth_response = await client_http.post(
#                     f"{NEON_AUTH_URL}/sign-in/email",
#                     json={"email": email, "password": password},
#                     headers={"Content-Type": "application/json"}
#                 )

#             print(f"[login] Neon Auth sign-in response for {email}: HTTP {auth_response.status_code}")

#             if auth_response.status_code not in (200, 201):
#                 print(f"❌ [login] Neon Auth rejected credentials for {email}: {auth_response.text}")
#                 return {"success": False, "message": "Invalid credentials"}

#         except Exception as auth_err:
#             print(f"❌ [login] Neon Auth REST call failed for {email}: {auth_err}")
#             return {"success": False, "message": "Auth service error. Please try again."}

#         # ── PATH 2b: Credentials valid — now check active transaction ──
#         # print(f"✅ [login] Neon Auth credentials verified for: {email}")

#         # tx_q = text("""
#         #     SELECT plan_name, access_status, end_date
#         #     FROM transactions
#         #     WHERE email = :email
#         #       AND access_status = 'active'
#         #       AND end_date > NOW()
#         #     ORDER BY created_at DESC
#         #     LIMIT 1
#         # """)
#         # tx_result = await db.execute(tx_q, {"email": email})
#         # tx_row = tx_result.mappings().first()

#         # if not tx_row:
#         #     print(f"⚠️ [login] No active subscription for: {email}")
#         #     return {
#         #         "success": False,
#         #         "message": "No active subscription found. Please purchase a plan to access your account."
#         #     }

#         # print(f"✅ [login] Active subscription found for {email}: {tx_row['plan_name']}")


#         # ── PATH 2: Direct DB check on neon_auth tables ──
#         print(f"ℹ️ [login] Checking neon_auth tables for: {email}")
#         legacy_q = text("""
#             SELECT a.password, u.name, u.id
#             FROM neon_auth."user" u
#             JOIN neon_auth.account a 
#               ON a."userId" = u.id 
#              AND a."providerId" = 'credential'
#             WHERE u.email = :email
#         """)
#         l_result = await db.execute(legacy_q, {"email": email})
#         l_row = l_result.mappings().first()

#         if not l_row:
#             print(f"❌ [login] User not found in neon_auth: {email}")
#             return {"success": False, "message": "Invalid credentials"}

#         if not verify_password_scrypt(password, l_row['password']):
#             print(f"❌ [login] Password mismatch for: {email}")
#             return {"success": False, "message": "Invalid credentials"}

#         print(f"✅ [login] neon_auth credentials verified for: {email}")

#         # ── PATH 2c: Return client profile if exists ──
#         client_q = text("SELECT * FROM clients WHERE client_email = :email LIMIT 1")
#         res = await db.execute(client_q, {"email": email})
#         client_row = res.mappings().first()

#         if client_row:
#             c_dict = dict(client_row)
#             c_dict.pop('password_hash', None)
#             c_dict['plan_name'] = tx_row['plan_name']
#             c_dict['access_status'] = tx_row['access_status']
#             c_dict['subscription_end'] = str(tx_row['end_date'])
#             return {"success": True, "data": c_dict}

#         # No client profile yet — return minimal data
#         return {
#             "success": True,
#             "data": {
#                 "client_email": email,
#                 "plan_name": tx_row['plan_name'],
#                 "access_status": tx_row['access_status'],
#                 "subscription_end": str(tx_row['end_date'])
#             }
#         }

#     except HTTPException:
#         raise
#     except Exception as e:
#         print(f"❌ [login] Unexpected error: {e}")
#         raise HTTPException(status_code=500, detail=str(e))


# @router.post("/login-legacy")
# async def login_legacy(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     """Fallback login via Neon Auth REST API for legacy users."""
#     try:
#         email = payload.get("email", "").strip()
#         password = payload.get("password", "")

#         if not NEON_AUTH_URL:
#             return {"success": False, "message": "Auth service not configured"}

#         async with httpx.AsyncClient(timeout=15.0) as client_http:
#             auth_response = await client_http.post(
#                 f"{NEON_AUTH_URL}/sign-in/email",
#                 json={"email": email, "password": password},
#                 headers={"Content-Type": "application/json"}
#             )

#         if auth_response.status_code in (200, 201):
#             client_q = text("SELECT * FROM clients WHERE client_email = :email LIMIT 1")
#             res = await db.execute(client_q, {"email": email})
#             client = res.mappings().first()
#             if client:
#                 c_dict = dict(client)
#                 c_dict.pop('password_hash', None)
#                 return {"success": True, "data": c_dict}
#             return {"success": True, "message": "Valid credentials, client profile not found"}

#         return {"success": False, "message": "Invalid credentials"}
#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))






























# from fastapi import APIRouter, Depends, HTTPException, Body
# import json
# import uuid
# import httpx
# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
# from sqlalchemy import text
# from app.db.session import get_db, database_url, connect_args
# from app.utils.security import hash_password
# from app.core.config import settings
# import random
# import time
# import hashlib
# import aiosmtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from typing import Dict, Any
# import os
# import datetime
# from passlib.context import CryptContext

# router = APIRouter()

# # -------------------------------
# # Memory Store for OTPs
# # -------------------------------
# otp_store: Dict[str, Dict[str, Any]] = {}

# # Password context for bcrypt
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # -------------------------------
# # Helper Functions
# # -------------------------------

# async def send_email_async(to_email: str, subject: str, body_html: str):
#     if not settings.GMAIL_USER or not settings.GMAIL_APP_PASSWORD:
#         return False
#     try:
#         message = MIMEMultipart()
#         message["From"] = f"Big Career Dream <{settings.GMAIL_USER}>"
#         message["To"] = to_email
#         message["Subject"] = subject
#         message.attach(MIMEText(body_html, "html"))
#         await aiosmtplib.send(
#             message,
#             hostname="smtp.gmail.com",
#             port=587,
#             username=settings.GMAIL_USER,
#             password=settings.GMAIL_APP_PASSWORD,
#             use_tls=False,
#             start_tls=True,
#         )
#         return True
#     except Exception as e:
#         print(f"Email error: {e}")
#         return False

# # -------------------------------
# # FIXED: Create user in correct Better Auth tables
# # -------------------------------
# async def create_neon_auth_user(db: AsyncSession, email: str, password: str, name: str = "User"):
#     """
#     Creates user in Better Auth tables: neon_auth.users and neon_auth.accounts
#     Uses bcrypt hashing - THIS IS THE CORRECT WAY
#     """
#     if not database_url:
#         print(f"❌ [neon_auth] DATABASE_URL missing")
#         return False

#     # Create independent connection
#     _engine = create_async_engine(
#         database_url,
#         connect_args=connect_args,
#         pool_size=1,
#         max_overflow=0
#     )
#     _Session = async_sessionmaker(_engine, expire_on_commit=False, class_=AsyncSession)

#     async with _Session() as session:
#         try:
#             now = datetime.datetime.now(datetime.timezone.utc)
            
#             # FIRST: Check if user exists in neon_auth.users (correct table name)
#             check_q = text('SELECT id FROM neon_auth.users WHERE email = :email')
#             result = await session.execute(check_q, {"email": email})
#             existing_user = result.first()
            
#             user_id = None
            
#             if existing_user:
#                 user_id = existing_user[0]
#                 print(f"ℹ️ [neon_auth] User already exists in users table: {email} (ID: {user_id})")
#             else:
#                 # Create new user in neon_auth.users
#                 user_id = str(uuid.uuid4())
#                 insert_user_q = text("""
#                     INSERT INTO neon_auth.users (id, name, email, email_verified, created_at, updated_at)
#                     VALUES (:id, :name, :email, :verified, :now, :now)
#                 """)
#                 await session.execute(insert_user_q, {
#                     "id": user_id,
#                     "name": name,
#                     "email": email,
#                     "verified": True,
#                     "now": now
#                 })
#                 print(f"✅ [neon_auth] Created user in users table: {email} (ID: {user_id})")
            
#             # SECOND: Check if account exists in neon_auth.accounts
#             check_account_q = text("""
#                 SELECT id FROM neon_auth.accounts 
#                 WHERE user_id = :user_id AND provider = 'credential'
#             """)
#             acc_result = await session.execute(check_account_q, {"user_id": user_id})
#             existing_account = acc_result.first()
            
#             if existing_account:
#                 print(f"ℹ️ [neon_auth] Account already exists for: {email}")
#                 await session.commit()
#                 await session.close()
#                 await _engine.dispose()
#                 return True
            
#             # Create account with bcrypt hashed password
#             hashed_password = pwd_context.hash(password)
#             account_id = str(uuid.uuid4())
            
#             insert_account_q = text("""
#                 INSERT INTO neon_auth.accounts (
#                     id, account_id, provider_id, user_id, password, created_at, updated_at
#                 )
#                 VALUES (:id, :account_id, :provider_id, :user_id, :password, :now, :now)
#             """)
#             await session.execute(insert_account_q, {
#                 "id": account_id,
#                 "account_id": user_id,
#                 "provider_id": 'credential',
#                 "user_id": user_id,
#                 "password": hashed_password,
#                 "now": now
#             })
            
#             await session.commit()
#             print(f"✅ [neon_auth] FULL USER CREATED in Better Auth tables: {email}")
#             print(f"   - users table: ID {user_id}")
#             print(f"   - accounts table: ID {account_id}")
#             return True

#         except Exception as e:
#             await session.rollback()
#             print(f"❌ [neon_auth] Failed for {email}: {e}")
#             import traceback
#             traceback.print_exc()
#             return False
#         finally:
#             await session.close()
#             await _engine.dispose()

# # -------------------------------
# # ENDPOINTS
# # -------------------------------

# @router.post("/generate-otp")
# async def generate_otp(payload: dict = Body(...)):
#     email = payload.get("email", "").strip()
#     if not email:
#         raise HTTPException(status_code=400, detail="Email required")

#     otp = str(random.randint(100000, 999999))
#     otp_store[email] = {"otp": otp, "expiry": time.time() + 300}

#     body = f"""
#     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
#         <h2 style="color: #f97316; text-align: center;">Verification Code</h2>
#         <p style="font-size: 16px; color: #333;">Your verification code for Big Career Dream is:</p>
#         <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; color: #f97316; letter-spacing: 5px; border-radius: 5px;">
#             {otp}
#         </div>
#         <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px;">This code expires in 5 minutes.</p>
#     </div>
#     """

#     success = await send_email_async(email, "Your Verification Code - Big Career Dream", body)
#     if success:
#         return {"success": True, "message": "OTP sent successfully"}
#     else:
#         raise HTTPException(status_code=500, detail="Failed to send email")

# @router.post("/verify-otp")
# async def verify_otp(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     """
#     Verify OTP and IMMEDIATELY create user in neon_auth tables
#     """
#     email = payload.get("email")
#     otp_received = payload.get("otp")
    
#     first_name = payload.get("firstName", "")
#     last_name = payload.get("lastName", "")
#     full_name = f"{first_name} {last_name}".strip() or "User"
#     static_pass = "bigcareerdream@1092"

#     # Verify OTP
#     stored = otp_store.get(email)
#     if not stored:
#         raise HTTPException(status_code=404, detail="No OTP found")
#     if time.time() > stored["expiry"]:
#         otp_store.pop(email)
#         raise HTTPException(status_code=400, detail="OTP expired")
#     if stored["otp"] != otp_received:
#         raise HTTPException(status_code=400, detail="Invalid OTP")

#     # OTP valid - remove from store
#     otp_store.pop(email)

#     # CRITICAL: Create user in neon_auth tables
#     print(f"🔐 [verify-otp] Creating user in neon_auth for: {email}")
#     created = await create_neon_auth_user(db, email, static_pass, name=full_name)
    
#     if created:
#         print(f"✅ [verify-otp] User successfully created in neon_auth: {email}")
#     else:
#         print(f"❌ [verify-otp] FAILED to create user in neon_auth: {email}")

#     return {"success": True, "message": "OTP verified"}

# @router.post("/save-verified-user")
# async def save_verified_user(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     try:
#         email = payload.get("email")
#         first_name = payload.get("firstName", "User")
#         middle_name = payload.get("middleName", "")
#         last_name = payload.get("lastName", "")
#         order_id = payload.get("orderId")
#         static_pass = "bigcareerdream@1092"

#         if not order_id:
#             # Lead capture only
#             try:
#                 insert_q = text("""
#                     INSERT INTO leads (first_name, middle_name, last_name, email, phone, plan_name, price)
#                     VALUES (:fn, :mn, :ln, :email, :phone, :plan, :price)
#                     ON CONFLICT (email) DO NOTHING
#                 """)
#                 await db.execute(insert_q, {
#                     "fn": first_name, "mn": middle_name, "ln": last_name,
#                     "email": email, "phone": payload.get("phone"),
#                     "plan": payload.get("planName"), "price": str(payload.get("price", ""))
#                 })
#                 await db.commit()
#                 print(f"✅ Lead saved for: {email}")
#             except Exception as lead_err:
#                 print(f"Lead save warning: {lead_err}")
#                 return {"success": True, "message": "Lead capture skipped."}
#         else:
#             # Post-payment: save transaction
#             plan_name = payload.get("planName", "").lower()
#             cycle = 30
#             if "growth" in plan_name:
#                 cycle = 60
#             elif "pro" in plan_name:
#                 cycle = 90

#             start = datetime.datetime.now(datetime.timezone.utc)
#             end = start + datetime.timedelta(days=cycle)

#             # Save transaction
#             insert_tx = text("""
#                 INSERT INTO transactions (
#                     order_id, email, status, plan_name, amount,
#                     access_status, start_date, end_date, subscription_cycle
#                 )
#                 VALUES (:oid, :email, 'COMPLETED', :plan, :amt, 'active', :start, :end, :cycle)
#                 ON CONFLICT (order_id) DO UPDATE SET
#                     status = EXCLUDED.status,
#                     start_date = EXCLUDED.start_date,
#                     end_date = EXCLUDED.end_date,
#                     subscription_cycle = EXCLUDED.subscription_cycle
#             """)
#             await db.execute(insert_tx, {
#                 "oid": order_id, "email": email, "plan": payload.get("planName"),
#                 "amt": payload.get("price"), "start": start, "end": end, "cycle": cycle
#             })
#             await db.commit()
#             print(f"✅ Transaction saved for order: {order_id}")

#             # Ensure user exists in Neon Auth
#             full_name = f"{first_name} {last_name}".strip()
#             await create_neon_auth_user(db, email, static_pass, name=full_name)

#             # Send credentials email
#             try:
#                 body = f"""<html><body style="font-family:Arial,sans-serif;">
#                     <h2>Your Big Career Dream Account</h2>
#                     <p>Thank you for your purchase!</p>
#                     <p><strong>Email:</strong> {email}</p>
#                     <p><strong>Password:</strong> {static_pass}</p>
#                     <p>Sign in at <a href="https://bigcareerdream-merged.vercel.app">bigcareerdream</a></p>
#                 </body></html>"""
#                 await send_email_async(email, "Your Account Credentials - Big Career Dream", body)
#                 print(f"✅ Welcome email sent to: {email}")
#             except Exception as mail_err:
#                 print(f"Email send warning: {mail_err}")

#         return {"success": True}
#     except Exception as e:
#         await db.rollback()
#         print(f"Error in save-verified-user: {e}")
#         raise HTTPException(status_code=500, detail=str(e))

# @router.post("/login")
# async def login(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
#     """
#     Login using bcrypt verification on neon_auth.accounts table
#     """
#     try:
#         email = payload.get("email", "").strip()
#         password = payload.get("password", "")
        
#         if not email or not password:
#             raise HTTPException(status_code=400, detail="Email and password required")

#         # Query the correct Better Auth tables
#         query = text("""
#             SELECT a.password, u.id, u.name, u.email
#             FROM neon_auth.users u
#             JOIN neon_auth.accounts a ON a.user_id = u.id AND a.provider_id = 'credential'
#             WHERE u.email = :email
#         """)
        
#         result = await db.execute(query, {"email": email})
#         user = result.mappings().first()
        
#         if not user:
#             print(f"❌ [login] User not found: {email}")
#             return {"success": False, "message": "Invalid email or password"}
        
#         # Verify password with bcrypt
#         try:
#             if pwd_context.verify(password, user['password']):
#                 print(f"✅ [login] Successful login for: {email}")
                
#                 # Check subscription
#                 sub_query = text("""
#                     SELECT plan_name, access_status, end_date
#                     FROM transactions
#                     WHERE email = :email AND status = 'COMPLETED'
#                     ORDER BY created_at DESC LIMIT 1
#                 """)
#                 sub_result = await db.execute(sub_query, {"email": email})
#                 subscription = sub_result.mappings().first()
                
#                 return {
#                     "success": True,
#                     "data": {
#                         "id": user['id'],
#                         "name": user['name'],
#                         "email": user['email'],
#                         "plan_name": subscription['plan_name'] if subscription else None,
#                         "access_status": subscription['access_status'] if subscription else 'active',
#                         "subscription_end": str(subscription['end_date']) if subscription else None
#                     }
#                 }
#             else:
#                 print(f"❌ [login] Invalid password for: {email}")
#                 return {"success": False, "message": "Invalid email or password"}
#         except Exception as verify_err:
#             print(f"Password verification error: {verify_err}")
#             return {"success": False, "message": "Invalid email or password"}
            
#     except Exception as e:
#         print(f"Login error: {e}")
#         raise HTTPException(status_code=500, detail=str(e))

# @router.post("/debug-check-tables")
# async def debug_check_tables(db: AsyncSession = Depends(get_db)):
#     """Debug endpoint to check table structure"""
#     try:
#         # Check what tables exist
#         query = text("""
#             SELECT table_name 
#             FROM information_schema.tables 
#             WHERE table_schema = 'neon_auth'
#             ORDER BY table_name
#         """)
#         result = await db.execute(query)
#         tables = [row[0] for row in result.fetchall()]
        
#         return {
#             "available_tables": tables,
#             "note": "Better Auth uses 'users' and 'accounts' (lowercase, no quotes)"
#         }
#     except Exception as e:
#         return {"error": str(e)}





#  fastapi_server/app/api/v1/endpoints/auth.py
from fastapi import APIRouter, Depends, HTTPException, Body
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.db.session import get_db
from app.core.config import settings
import random
import time
import secrets
import string
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import datetime
import bcrypt

router = APIRouter()

# ─────────────────────────────────────────────────────────────
# In-memory stores
#   otp_store   → { email: { otp, expiry } }
#   pwd_store   → { email: { password, expiry } }   (temp, pre-payment)
# ─────────────────────────────────────────────────────────────
otp_store: Dict[str, Dict[str, Any]] = {}
pwd_store: Dict[str, Dict[str, Any]] = {}


# ─────────────────────────────────────────────────────────────
# Email helper
# ─────────────────────────────────────────────────────────────
async def send_email_async(to_email: str, subject: str, body_html: str) -> bool:
    print(f"📧 [email] Attempting: '{subject}' → {to_email}")
    if not settings.GMAIL_USER or not settings.GMAIL_APP_PASSWORD:
        print("❌ [email] GMAIL_USER or GMAIL_APP_PASSWORD missing in settings")
        return False
    try:
        message = MIMEMultipart()
        message["From"] = f"Big Career Dream <{settings.GMAIL_USER}>"
        message["To"] = to_email
        message["Subject"] = subject
        message.attach(MIMEText(body_html, "html"))
        await aiosmtplib.send(
            message,
            hostname="smtp.gmail.com",
            port=587,
            username=settings.GMAIL_USER,
            password=settings.GMAIL_APP_PASSWORD,
            use_tls=False,
            start_tls=True,
        )
        print(f"✅ [email] Sent successfully to {to_email}")
        return True
    except Exception as e:
        print(f"❌ [email] Failed to send to {to_email}: {e}")
        return False


def _generate_password(length: int = 16) -> str:
    """Generate a secure random password."""
    alphabet = string.ascii_letters + string.digits + "!@#$%"
    return "".join(secrets.choice(alphabet) for _ in range(length))


# ─────────────────────────────────────────────────────────────
# Core: create user in Better Auth tables
#
# Schema confirmed from Neon dashboard (screenshot):
#   neon_auth.users    → id, name, email, email_verified, created_at, updated_at
#   neon_auth.accounts → id, account_id, provider_id, user_id, password,
#                        created_at, updated_at
#
# Uses the INJECTED db session — no new engine created here.
# ─────────────────────────────────────────────────────────────
async def create_neon_auth_user(
    db: AsyncSession,
    email: str,
    password: str,
    name: str = "User",
) -> bool:
    print(f"\n[create_neon_auth_user] START -- email={email}, name='{name}'")
    try:
        now = datetime.datetime.now(datetime.timezone.utc)

        # 1. Check if user already exists in neon_auth.user
        result = await db.execute(
            text('SELECT id FROM "neon_auth"."user" WHERE email = :email'),
            {"email": email},
        )
        existing_user = result.first()

        if existing_user:
            user_id = existing_user[0]
            print(f"   [STEP 1] User already exists - id={user_id}")
        else:
            user_id = str(uuid.uuid4())
            print(f"   [STEP 1] User not found -> INSERT id={user_id}")
            
            await db.execute(
                text("""
                    INSERT INTO "neon_auth"."user"
                        (id, name, email, "emailVerified", "createdAt", "updatedAt")
                    VALUES
                        (:id, :name, :email, :email_verified, :now, :now)
                """),
                {"id": user_id, "name": name, "email": email,
                 "email_verified": True, "now": now},
            )
            print(f"   [STEP 2] OK: neon_auth.user inserted - id={user_id}")

        # 2. Check if account already exists for this user
        acc_check = await db.execute(
            text('SELECT id FROM "neon_auth"."account" WHERE "userId" = :user_id'),
            {"user_id": user_id}
        )
        if acc_check.first():
            print(f"   [STEP 3] Account already exists for user_id={user_id}")
        else:
            print(f"   [STEP 3] Inserting into neon_auth.account...")
            hashed_bytes = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            hashed = hashed_bytes.decode('utf-8')
            account_id = str(uuid.uuid4())
            await db.execute(
                text("""
                    INSERT INTO "neon_auth"."account"
                        (id, "accountId", "providerId", "userId", password,
                         "createdAt", "updatedAt")
                    VALUES
                        (:id, :account_id, 'credential', :user_id, :password,
                         :now, :now)
                """),
                {
                    "id": account_id,
                    "account_id": user_id,
                    "user_id": user_id,
                    "password": hashed,
                    "now": now,
                },
            )
            print(f"   [STEP 3] OK: neon_auth.account inserted - id={account_id}")

        await db.commit()
        print(f"[create_neon_auth_user] SUCCESS for {email}\n")
        return user_id

    except Exception as e:
        print(f"ERROR: [create_neon_auth_user] CRITICAL for {email}: {e}")
        import traceback; traceback.print_exc()
        await db.rollback()
        return None


# ─────────────────────────────────────────────────────────────
# ENDPOINTS
# ─────────────────────────────────────────────────────────────

def normalize_phone(phone: str) -> str:
    """Removes all characters except digits and the leading '+' symbol."""
    if not phone:
        return ""
    # Keep only digits
    digits = "".join(filter(str.isdigit, phone))
    # Add back the leading '+' if it was present
    trimmed = phone.strip()
    if trimmed.startswith("+"):
        return "+" + digits
    return digits


@router.post("/check-email")
async def check_email(
    payload: dict = Body(...),
    db: AsyncSession = Depends(get_db),
):
    email = payload.get("email", "").strip()
    if not email:
        raise HTTPException(status_code=400, detail="Email required")
    
    import time
    start_time = time.time()
    try:
        result = await db.execute(
            text('SELECT 1 FROM "neon_auth"."user" WHERE email = :email'),
            {"email": email}
        )
        exists = result.scalar() is not None
        duration = (time.time() - start_time) * 1000
        print(f"[check-email] {email} check took {duration:.2f}ms")
        return {"exists": exists}
    except Exception as e:
        print(f"ERROR: [check-email] Error: {e}")
        raise HTTPException(status_code=500, detail="Database error")


@router.post("/generate-otp")
async def generate_otp(
    payload: dict = Body(...),
    db: AsyncSession = Depends(get_db),
):
    email = payload.get("email", "").strip()
    # NEW: Capture lead info early
    first_name = payload.get("firstName", "").strip()
    last_name = payload.get("lastName", "").strip()
    middle_name = payload.get("middleName", "").strip()
    phone = payload.get("phone", "").strip()
    plan_name = payload.get("planName", "").strip()
    price = payload.get("price", "")
    country = payload.get("country", "").strip()
    country_code = payload.get("countryCode", "").strip()

    print(f"\n📨 [generate-otp] ── email={email}")

    if not email:
        raise HTTPException(status_code=400, detail="Email required")

    # ── CHECK FOR EXISTING USER ───────────────────────────────────────────
    # If the user already exists in neon_auth, they shouldn't be signing up again.
    try:
        user_check = await db.execute(
            text('SELECT 1 FROM "neon_auth"."user" WHERE email = :email'),
            {"email": email}
        )
        if user_check.scalar():
            print(f"   [generate-otp] ⚠️ Blocked: User {email} already exists.")
            raise HTTPException(
                status_code=400, 
                detail="An account with this email already exists. Please sign in instead."
            )
    except HTTPException:
        raise
    except Exception as e:
        print(f"   [generate-otp] ⚠️ User check error (non-fatal): {e}")

    otp = str(random.randint(100000, 999999))
    otp_store[email] = {"otp": otp, "expiry": time.time() + 300}
    print(f"   [generate-otp] OTP stored for {email} (5-min expiry)")

    # Normalize phone
    clean_phone = normalize_phone(phone)

    # ── JOURNEY TRACKING: Create New Lead ──────────────────────────────────
    lead_id = None
    try:
        res = await db.execute(
            text("""
                INSERT INTO leads
                    (first_name, middle_name, last_name, email, phone, 
                     plan_name, price, country, country_code, 
                     form_submitted_at, otp_sent)
                VALUES
                    (:fn, :mn, :ln, :email, :phone, 
                     :plan, :price, :country, :cc, 
                     NOW(), true)
                RETURNING id
            """),
            {
                "fn": first_name, "mn": middle_name, "ln": last_name,
                "email": email, "phone": clean_phone,
                "plan": plan_name, "price": float(price) if price else None,
                "country": country, "cc": country_code
            },
        )
        lead_id = res.scalar()
        await db.commit()
        print(f"   [generate-otp] OK: New Lead created for {email} (ID: {lead_id})")
    except Exception as e:
        print(f"   [generate-otp] WARNING: Lead creation failed (non-critical): {e}")
        await db.rollback()

    body = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;
                padding:20px;border:1px solid #e1e1e1;border-radius:10px;">
        <h2 style="color:#f97316;text-align:center;">Verification Code</h2>
        <p style="font-size:16px;color:#333;">
            Your verification code for Big Career Dream is:
        </p>
        <div style="background:#f8f9fa;padding:15px;text-align:center;
                    font-size:32px;font-weight:bold;color:#f97316;
                    letter-spacing:5px;border-radius:5px;">
            {otp}
        </div>
        <p style="font-size:14px;color:#666;text-align:center;margin-top:20px;">
            This code expires in 5 minutes.
        </p>
    </div>
    """
    success = await send_email_async(
        email, "Your Verification Code - Big Career Dream", body
    )
    if success:
        return {
            "success": True, 
            "message": "OTP sent successfully",
            "leadId": lead_id
        }
    raise HTTPException(status_code=500, detail="Failed to send OTP email")


@router.post("/verify-otp")
async def verify_otp(
    payload: dict = Body(...),
    db: AsyncSession = Depends(get_db),
):
    email      = payload.get("email", "").strip()
    otp_input  = payload.get("otp", "").strip()
    lead_id    = payload.get("leadId")  # NEW: used for journey tracking

    print(f"\n[verify-otp] email={email}, lead_id={lead_id}")

    # ── Validate OTP ──────────────────────────────────────────────────────
    stored = otp_store.get(email)
    if not stored:
        print(f"   [verify-otp] ERROR: No OTP in store for {email}")
        raise HTTPException(status_code=404, detail="No OTP found for this email")
    if time.time() > stored["expiry"]:
        otp_store.pop(email, None)
        print(f"   [verify-otp] ERROR: OTP expired for {email}")
        raise HTTPException(status_code=400, detail="OTP expired. Please request a new one.")
    if stored["otp"] != otp_input:
        print(f"   [verify-otp] ERROR: Wrong OTP for {email}")
        raise HTTPException(status_code=400, detail="Invalid OTP")

    otp_store.pop(email, None)
    print(f"   [verify-otp] OK: OTP valid for {email}")

    # ── Update Lead (Journey Tracking) ────────────────────────────────────
    if lead_id:
        try:
            await db.execute(
                text("""
                    UPDATE leads 
                    SET otp_verified = true, verified_at = NOW()
                    WHERE id = :id AND email = :email
                """),
                {"id": lead_id, "email": email}
            )
            await db.commit()
            print(f"   [verify-otp] OK: Lead updated: otp_verified for ID {lead_id}")
        except Exception as e:
            print(f"   [verify-otp] WARNING: Lead update failed (non-critical): {e}")
            await db.rollback()

    # ── Generate password & stash for later ──
    # Note: create_neon_auth_user is DEFERRED until payment now.
    password = _generate_password()
    pwd_store[email] = {"password": password, "expiry": time.time() + 3600}
    print(f"   [verify-otp] Password generated and stashed for {email}")

    return {"success": True, "message": "OTP verified"}


@router.post("/update-lead-status")
async def update_lead_status(
    payload: dict = Body(...),
    db: AsyncSession = Depends(get_db),
):
    """
    Endpoint for tracking milestones in the user's journey.
    Currently used for: paypal_clicked
    """
    lead_id = payload.get("leadId")
    email   = payload.get("email", "").strip()
    field   = payload.get("field")  # e.g., 'paypal_clicked'
    value   = payload.get("value", True)

    if not lead_id or not field:
        raise HTTPException(status_code=400, detail="leadId and field required")

    allowed_fields = ["paypal_clicked", "payment_done"]
    if field not in allowed_fields:
        raise HTTPException(status_code=400, detail="Invalid field")

    print(f"📈 [update-lead-status] lead_id={lead_id}, field={field}, value={value}")

    try:
        await db.execute(
            text(f"UPDATE leads SET {field} = :val WHERE id = :id AND email = :email"),
            {"val": value, "id": lead_id, "email": email}
        )
        await db.commit()
        return {"success": True}
    except Exception as e:
        print(f"   [update-lead-status] ❌ Failed: {e}")
        await db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/save-verified-user")
async def save_verified_user(
    payload: dict = Body(...),
    db: AsyncSession = Depends(get_db),
):
    """
    Called in two situations:
      A) No orderId  → lead capture only (no payment yet)
      B) With orderId → post-payment: save transaction + ensure auth user + send email

    FIXED column names to match actual transactions schema:
      phone_number  (NOT phone)
      first_name, middle_name, last_name  (separate columns)
      currency      (defaults to 'USD' in DB but explicit here for clarity)
    """
    email       = payload.get("email", "").strip()
    first_name  = payload.get("firstName", "").strip() or "User"
    middle_name = payload.get("middleName", "").strip()
    last_name   = payload.get("lastName", "").strip()
    full_name   = f"{first_name} {last_name}".strip() or "User"
    order_id    = payload.get("orderId")
    phone       = payload.get("phone", "")           # already has dial code prepended by frontend
    plan_name   = payload.get("planName", "")
    price       = payload.get("price")

    print(f"\n[save-verified-user] email={email}, order_id={order_id}, plan='{plan_name}'")

    # Retrieve the stashed password (created during verify-otp)
    pwd_entry = pwd_store.get(email)
    if pwd_entry and time.time() < pwd_entry["expiry"]:
        user_password = pwd_entry["password"]
        print(f"   [save-verified-user] OK: Retrieved stashed password for {email}")
    else:
        user_password = _generate_password()
        print(f"   [save-verified-user] WARNING: No stashed password for {email} - generated new one")

    try:
        # ── A: Lead capture (no payment) ──────────────────────────────────
        if not order_id:
            print(f"   [save-verified-user] Mode: LEAD CAPTURE")
            try:
                await db.execute(
                    text("""
                        INSERT INTO leads
                            (first_name, middle_name, last_name,
                             email, phone, plan_name, price)
                        VALUES
                            (:fn, :mn, :ln, :email, :phone, :plan, :price)
                        ON CONFLICT (email) DO NOTHING
                    """),
                    {
                        "fn": first_name, "mn": middle_name, "ln": last_name,
                        "email": email,   "phone": phone,
                        "plan": plan_name, "price": str(price or ""),
                    },
                )
                await db.commit()
                print(f"   [save-verified-user] OK: Lead saved for {email}")
            except Exception as e:
                print(f"   [save-verified-user] WARNING: Lead save failed (non-critical): {e}")
                await db.rollback()
            return {"success": True}

        # ── B: Post-payment ───────────────────────────────────────────────
        print(f"   [save-verified-user] Mode: POST-PAYMENT")

        # Determine subscription cycle from plan name
        plan_lower = plan_name.lower()
        if "pro" in plan_lower:
            cycle = 90
        elif "growth" in plan_lower:
            cycle = 60
        else:
            cycle = 30
        print(f"   [save-verified-user] plan='{plan_name}' → cycle={cycle} days")

        start = datetime.datetime.now(datetime.timezone.utc)
        end   = start + datetime.timedelta(days=cycle)

        # ── B1: Insert / upsert transaction ───────────────────────────────
        # FIXED: uses correct column names from actual schema:
        #   phone_number, first_name, middle_name, last_name, currency
        print(f"   [save-verified-user] Inserting transaction — order_id={order_id}")
        await db.execute(
            text("""
                INSERT INTO transactions (
                    order_id,
                    email,
                    first_name,
                    middle_name,
                    last_name,
                    phone_number,
                    plan_name,
                    amount,
                    currency,
                    status,
                    access_status,
                    start_date,
                    end_date,
                    subscription_cycle
                ) VALUES (
                    :order_id,
                    :email,
                    :first_name,
                    :middle_name,
                    :last_name,
                    :phone_number,
                    :plan_name,
                    :amount,
                    'USD',
                    'COMPLETED',
                    'active',
                    :start_date,
                    :end_date,
                    :subscription_cycle
                )
                ON CONFLICT (order_id) DO UPDATE SET
                    status             = 'COMPLETED',
                    access_status      = 'active',
                    start_date         = EXCLUDED.start_date,
                    end_date           = EXCLUDED.end_date,
                    subscription_cycle = EXCLUDED.subscription_cycle,
                    first_name         = EXCLUDED.first_name,
                    middle_name        = EXCLUDED.middle_name,
                    last_name          = EXCLUDED.last_name,
                    phone_number       = EXCLUDED.phone_number,
                    plan_name          = EXCLUDED.plan_name,
                    amount             = EXCLUDED.amount
            """),
            {
                "order_id":          order_id,
                "email":             email,
                "first_name":        first_name,
                "middle_name":       middle_name,
                "last_name":         last_name,
                "phone_number":      phone,
                "plan_name":         plan_name,
                "amount":            price,
                "start_date":        start,
                "end_date":          end,
                "subscription_cycle": cycle,
            },
        )
        await db.commit()
        print(f"   [save-verified-user] OK: Transaction committed - order_id={order_id}")

        # ── B2: Ensure neon_auth user exists (idempotent) ─────────────────
        print(f"   [save-verified-user] Ensuring neon_auth user for {email} ...")
        auth_ok = await create_neon_auth_user(db, email, user_password, name=full_name)
        if auth_ok:
            print(f"   [save-verified-user] OK: neon_auth confirmed for {email}")
        else:
            print(f"   [save-verified-user] ERROR: neon_auth FAILED for {email}")

        # ── B3: Send credentials email ────────────────────────────────────
        print(f"   [save-verified-user] Sending welcome email to {email} ...")
        body = f"""
        <html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <h2 style="color:#f97316;">Welcome to Big Career Dream, {first_name}!</h2>
            <p>Thank you for subscribing to the <strong>{plan_name}</strong> plan.</p>
            <hr style="border:none;border-top:1px solid #eee;margin:20px 0;"/>
            <p style="font-size:15px;"><strong>Your login credentials:</strong></p>
            <p>📧 <strong>Email:</strong> {email}</p>
            <p>🔑 <strong>Password:</strong> <code style="background:#f5f5f5;padding:4px 8px;
               border-radius:4px;font-size:15px;">{user_password}</code></p>
            <hr style="border:none;border-top:1px solid #eee;margin:20px 0;"/>
            <p>
                <a href="https://bigcareerdream-merged.vercel.app"
                   style="background:#f97316;color:#fff;padding:12px 24px;
                          border-radius:8px;text-decoration:none;font-weight:bold;">
                    Sign In Now →
                </a>
            </p>
            <p style="font-size:12px;color:#999;margin-top:20px;">
                Your subscription is active until {end.strftime('%B %d, %Y')}.<br/>
                We recommend changing your password after your first login.
            </p>
        </body></html>
        """
        mail_ok = await send_email_async(
            email, "Your Big Career Dream Account & Credentials", body
        )
        if mail_ok:
            print(f"   [save-verified-user] ✅ Welcome email sent to {email}")
        else:
            print(f"   [save-verified-user] ⚠️  Welcome email FAILED for {email} (non-critical)")

        # Clean up stashed password
        pwd_store.pop(email, None)
        print(f"   [save-verified-user] 🧹 Cleaned up pwd_store for {email}")

        return {"success": True}

    except Exception as e:
        print(f"❌ [save-verified-user] UNHANDLED EXCEPTION for {email}: {e}")
        import traceback; traceback.print_exc()
        try:
            await db.rollback()
            print(f"↩️  [save-verified-user] Rolled back")
        except Exception:
            pass
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/login")
async def login(
    payload: dict = Body(...),
    db: AsyncSession = Depends(get_db),
):
    email    = payload.get("email", "").strip()
    password = payload.get("password", "")
    print(f"\n🔑 [login] ── Attempt for email={email}")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")

    try:
        # Join neon_auth.users + neon_auth.accounts
        print(f"   [login] Querying neon_auth for {email} …")
        result = await db.execute(
            text("""
                SELECT a.password, u.id, u.name, u.email
                FROM "neon_auth"."user" u
                JOIN "neon_auth"."account" a
                  ON a."userId" = u.id AND a."providerId" = 'credential'
                WHERE u.email = :email
            """),
            {"email": email},
        )
        user = result.mappings().first()

        if not user:
            print(f"   [login] ERROR: No credential account found for {email}")
            return {"success": False, "message": "User not found"}

        print(f"   [login] Account found for {email} - verifying password ...")

        try:
            password_ok = bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8'))
        except Exception as ve:
            print(f"   [login] ERROR: bcrypt verify error for {email}: {ve}")
            return {"success": False, "message": "Invalid email or password"}

        if not password_ok:
            print(f"   [login] ERROR: Wrong password for {email}")
            return {"success": False, "message": "Incorrect password"}

        print(f"   [login] OK: Password correct for {email}")

        # Directly fetch client_id from public.clients table based on client_email
        client_result = await db.execute(
            text("SELECT client_id FROM public.clients WHERE client_email = :email LIMIT 1"),
            {"email": email}
        )
        client_data = client_result.mappings().first()

        is_onboarded = False
        client_id = None

        if client_data:
            client_id = client_data["client_id"]
            is_onboarded = True
            print(f"   [login] Found client_id in clients table: {client_id}")
        else:
            print(f"   [login] WARNING: No client profile found for {email}. Needs onboarding.")

        return {
            "success": True,
            "data": {
                "id":               user["id"],
                "name":             user["name"],
                "email":            user["email"],
                "client_id":        client_id,
                "isOnboarded":      is_onboarded,
                "plan_name":        "Growth",
                "access_status":    "active",
                "subscription_end": None,
            },
        }

    except Exception as e:
        print(f"ERROR: [login] EXCEPTION for {email}: {e}")
        import traceback; traceback.print_exc()
        # Return a clean JSON error instead of a raw 500 to the frontend
        return {"success": False, "message": f"Account verification failed (Internal Error)"}


# ─────────────────────────────────────────────────────────────
# Debug helpers
# ─────────────────────────────────────────────────────────────

@router.post("/debug-check-tables")
async def debug_check_tables(db: AsyncSession = Depends(get_db)):
    """
    Returns:
      - neon_auth table list + row counts
      - neon_auth.accounts column names  (lets you verify provider vs provider_id)
      - transactions column names
      - last 5 rows from both neon_auth.users and transactions
    """
    print("\n🔧 [debug-check-tables] Called")
    try:
        # Tables in neon_auth
        tables_result = await db.execute(text("""
            SELECT table_name FROM information_schema.tables
            WHERE table_schema = 'neon_auth' ORDER BY table_name
        """))
        tables = [r[0] for r in tables_result.fetchall()]
        print(f"   neon_auth tables: {tables}")

        # Row counts
        counts = {}
        for tbl in tables:
            try:
                c = await db.execute(text(f"SELECT COUNT(*) FROM neon_auth.{tbl}"))
                counts[tbl] = c.scalar()
            except Exception as ce:
                counts[tbl] = f"error: {ce}"
        print(f"   Row counts: {counts}")

        # neon_auth.accounts columns
        acc_cols_result = await db.execute(text("""
            SELECT column_name FROM information_schema.columns
            WHERE table_schema='neon_auth' AND table_name='accounts'
            ORDER BY ordinal_position
        """))
        acc_cols = [r[0] for r in acc_cols_result.fetchall()]
        print(f"   neon_auth.accounts columns: {acc_cols}")

        # transactions columns
        tx_cols_result = await db.execute(text("""
            SELECT column_name FROM information_schema.columns
            WHERE table_schema='public' AND table_name='transactions'
            ORDER BY ordinal_position
        """))
        tx_cols = [r[0] for r in tx_cols_result.fetchall()]
        print(f"   transactions columns: {tx_cols}")

        # Last 5 neon_auth.users
        recent_users_result = await db.execute(text("""
            SELECT id, email, name, email_verified, created_at
            FROM neon_auth.users ORDER BY created_at DESC LIMIT 5
        """))
        recent_users = [dict(r._mapping) for r in recent_users_result.fetchall()]

        # Last 5 transactions
        recent_tx_result = await db.execute(text("""
            SELECT order_id, email, plan_name, status, access_status, created_at
            FROM transactions ORDER BY created_at DESC LIMIT 5
        """))
        recent_tx = [dict(r._mapping) for r in recent_tx_result.fetchall()]

        return {
            "neon_auth_tables":    tables,
            "row_counts":          counts,
            "accounts_columns":    acc_cols,
            "transactions_columns": tx_cols,
            "recent_auth_users":   recent_users,
            "recent_transactions": recent_tx,
            "action_required": (
                "If 'accounts_columns' shows 'provider' instead of 'provider_id', "
                "change both JOIN conditions in create_neon_auth_user() and login()."
            ),
        }
    except Exception as e:
        print(f"ERROR: [debug-check-tables] Error: {e}")
        import traceback; traceback.print_exc()
        return {"error": str(e)}