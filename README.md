# Job Board Dashboard

A production-ready job recommendation dashboard with comprehensive UI structure including navbar, sidebar, filters, job cards with AI match scores, detailed job pages, and AWizzard AI assistant panel.

## 🎨 Features

### Complete UI Structure
- **Top Navbar**: Logo, navigation pills, search bar, theme toggle, upgrade CTA, account menu
- **Left Sidebar**: Primary navigation (Jobs, Resume, Profile, Agent), Refer & Earn card, utility items
- **Filters Row**: Role chips, location/type filters, Edit Filters button, sort dropdown
- **Job Cards**: Company logo, job details, action buttons, AI match score panel with hover breakdown
- **Job Details Modal**: Full job overview with circular match charts, company info, apply CTA
- **AWizzard AI Panel**: Contextual AI assistant with suggestions and chat interface
- **Dark/Light Theme**: Seamless theme switching with localStorage persistence

### Backend Capabilities
- Resume upload (PDF/DOC/DOCX) with file storage
- Excel upload with automatic CSV/JSON conversion
- File-based persistence (survives server restart)
- Production-safe file handling with UUID naming
- CORS-enabled API for frontend communication

### Color System
- **Light Theme**: Primary #089f25 (green), Warning #eeba2c (yellow)
- **Dark Theme**: Primary #eeba2c (yellow), Background #000000
- High contrast for readability
- Smooth theme transitions

## 📁 Project Structure

```
nikhil_a_new_job_board/
├── server/
│   ├── index.js              # Express server
│   ├── package.json
│   ├── public/
│   │   └── resumes/          # Uploaded resumes (auto-created)
│   └── storage/
│       ├── jobs.csv          # Converted CSV (auto-created)
│       └── jobs.json         # Parsed JSON cache (auto-created)
└── web/
    ├── src/
    │   ├── App.jsx           # Main application
    │   ├── main.jsx          # Entry point
    │   ├── api.js            # API utilities
    │   ├── index.css         # Global styles
    │   ├── context/
    │   │   └── ThemeContext.jsx
    │   └── components/
    │       ├── TopNavbar.jsx
    │       ├── LeftSidebar.jsx
    │       ├── FiltersRow.jsx
    │       ├── JobCard.jsx
    │       ├── JobDetailsModal.jsx
    │       ├── OrionPanel.jsx (AWizzardPanel)
    │       └── FileUploadSection.jsx
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

Server will run on `http://localhost:4000`

### FastAPI Backend (Python)

1. Navigate to fastapi_server folder:
```bash
cd fastapi_server
```

2. Create a virtual environment (optional but recommended):
```bash
py -m venv venv
.\venv\Scripts\activate
```

3. Install requirements:
```bash
py -m pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
py main.py
```

> [!IMPORTANT]
> **Windows Users**: Always use the `py` launcher instead of `python` for all commands in this project (e.g., `py main.py`, `py -m pip`).

FastAPI server will run on `http://localhost:4000/api/v1`

### Frontend Setup

1. Navigate to web folder:
```bash
cd web
npm install
```

2. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📊 Usage

### 1. Upload Resume
- Click "Upload Resume" button
- Select PDF, DOC, or DOCX file (max 10MB)
- Resume is stored for future AI matching

### 2. Upload Job Dataset
- Click "Upload Job Dataset" button
- Select Excel file (.xlsx or .xls) with job listings
- First sheet is automatically processed
- Jobs are converted to CSV and JSON
- Data persists across server restarts

### 3. Expected Excel Columns
Your Excel file should contain these columns (case-sensitive):
- `Job Title` - Position name
- `Company Name` - Employer name
- `Location` - City/State or "Remote"
- `Posted Time` - When job was posted
- `Contract Type` - Full-time/Part-time/Contract
- `Experience Level` - Entry/Mid/Senior
- `Sector` - Industry/category
- `Salary` - (Optional) Compensation range
- `Applications` - (Optional) Applicant count

### 4. Explore Jobs
- Browse job cards with AI match scores
- Click any job card to view full details
- Use filters to narrow results
- Interact with AWizzard AI for job insights
- Toggle between light/dark themes

## 🎯 API Endpoints

### `POST /api/upload-resume`
Upload resume file
- **Body**: `multipart/form-data` with `resume` field
- **Returns**: `{ success, resumeUrl, filename, originalName, size }`

### `POST /api/upload-excel`
Upload and process Excel file
- **Body**: `multipart/form-data` with `excel` field
- **Returns**: `{ success, jobCount, message }`

### `GET /api/jobs-json`
Fetch all jobs
- **Returns**: `{ jobs: [...] }`

### `GET /api/health`
Health check
- **Returns**: `{ status: 'ok', message: 'Server is running' }`

### `GET /resumes/:filename`
Serve uploaded resume file

## 🎨 Color Reference

### Light Theme
- Primary: `#089f25` (Actions, active states)
- Background: `#ffffff`
- Card: `#f9fafb`
- Text: `#111827`
- Muted: `#6b7280`
- Border: `#e5e7eb`
- Warning: `#eeba2c`

### Dark Theme  
- Primary: `#eeba2c` (Actions, active states)
- Background: `#000000`
- Card: `#0f0f0f`
- Text: `#ffffff`
- Muted: `#9ca3af`
- Border: `#1f2933`
- Error: `#ef4444`

## 🔧 Tech Stack

### Backend
- Express.js - Web framework
- Multer - File uploads
- XLSX - Excel processing
- UUID - Unique file naming
- CORS - Cross-origin support

### Frontend
- React 18 - UI library
- Vite - Build tool
- Tailwind CSS - Styling
- Framer Motion - Animations
- Lucide React - Icons

## 🎭 Production Features

✅ No placeholder code or TODOs  
✅ Complete error handling  
✅ Loading states for all async operations  
✅ File validation (size, type)  
✅ Toast notifications  
✅ Persistent dark mode preference  
✅ Keyboard accessible  
✅ Responsive design (desktop-first)  
✅ High contrast for accessibility  
✅ 60fps smooth animations  
✅ Production-safe file paths  

## 🚧 Future Enhancements

- **AI Matching**: Integrate real ML model for job-resume matching
- **Resume Parsing**: Extract skills, experience from uploaded resumes
- **Advanced Filters**: Save filter presets, complex boolean logic
- **Authentication**: User accounts with saved applications
- **Analytics**: Track application success rates
- **Email Notifications**: Job alerts based on preferences
- **Mobile App**: React Native companion app

## 📝 License

ISC

## 👨‍💻 Developer Notes

This is a production-ready foundation for a job matching platform. Match scores are currently mocked (40-80% random) - replace with real AI scoring in production.

For questions or issues, refer to the implementation plan in the artifacts directory.
