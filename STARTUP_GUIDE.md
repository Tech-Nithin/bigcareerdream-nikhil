# Startup Guide

Follow these steps to run the application locally.

## 1. Backend (FastAPI)
The backend handles the database, AI scoring, and chat features.

1. Open a new terminal.
2. Navigate to the backend directory:
   ```powershell
   cd fastapi_server
   ```
3. Activate the virtual environment:
   ```powershell
   .\venv\Scripts\activate
   ```
4. Start the server:
   ```powershell
   python main.py
   ```
   *The server will run at http://localhost:4000*

---

## 2. Frontend (React + Vite)
The frontend provides the user interface.

1. Open a **second** terminal.
2. Navigate to the web directory:
   ```powershell
   cd web
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
   *The app will be available at http://localhost:5173*

---

## 🔍 Post-Startup Verification
Once both are running, follow the **DB → Backend → Frontend** check:

1. **Check Jobs**: Go to `http://localhost:5173/jobs?tab=quick-apply`. You should see job cards.
2. **Check Chat**: Click the AWizzard icon and type "Hello". It should respond.
3. **Check Save**: Click the bookmark icon on a job. It should toggle to "Remove from Saved" without errors.
4. **Check Reflection**: After clicking "Save" on a job, you can check your database `saved_jobs` table to confirm it was stored.

> [!IMPORTANT]
> If you see a **500 Error** or **CORS Error**, ensure that your `fastapi_server/.env` has the correct `BACKEND_CORS_ORIGINS` setting and that you have restarted the backend.

> [!TIP]
> Always check the **[Verification Report](file:///C:/Users/nikhi/.gemini/antigravity/brain/4db21dc8-5c9a-4642-a805-c443e0aa417b/verification_report.md)** for the latest status of features.
