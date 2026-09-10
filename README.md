# LearnBridge – Academia–Industry Collaboration & Skill Development Platform

LearnBridge is a full-stack web platform designed to bridge the gap between **students, educational institutions, academicians, and industry organizations**.

The platform helps students discover structured learning paths, develop industry-relevant skills, track their progress, explore career opportunities, and connect their academic journey with placement opportunities.

---

## 🚀 Project Overview

Students often face a gap between academic learning and the skills expected by the industry.

**LearnBridge** addresses this problem by providing a centralized platform where:

* Students can build and manage their profiles.
* Students can follow structured learning paths.
* Skills and learning progress can be tracked.
* Students can discover internships and job opportunities.
* Applications and placement outcomes can be managed.
* Academicians can support and monitor student development.
* Organizations can interact with the academic ecosystem.
* Administrators can manage students, companies, internships, training programs, skills, placements, and analytics.

The project is being developed as part of **Smart India Hackathon (SIH) – Problem Statement SIH26044**.

---

## ✨ Key Features

### 👨‍🎓 Student Module

* Student registration and login
* JWT-based authentication
* Protected student routes
* Student profile management
* Career goal selection
* Technical skills tracking
* Structured learning paths
* Course and module navigation
* Learning progress tracking
* Skill assessment
* Achievements
* Internship and job opportunities
* Application tracking
* Placement outcome tracking

### 👨‍🏫 Academician Module

* Academician dashboard
* Student-related monitoring
* Academic and training-related information
* Student development support

### 🏢 Organization Module

* Organization dashboard
* Industry information
* Internship and opportunity management
* Interaction with the academic ecosystem

### 🛠️ Admin Module

* Admin dashboard
* Student management
* Company management
* Internship management
* Placement management
* Training program management
* Skills management
* Analytics and reporting
* Power BI analytics integration

---

## 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │      LearnBridge     │
                         │      Frontend        │
                         │ React + Vite +       │
                         │ Tailwind CSS         │
                         └──────────┬───────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │      FastAPI         │
                         │       Backend        │
                         │ Python + SQLAlchemy  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       TiDB           │
                         │      Database        │
                         └──────────────────────┘
```

---

## 🧰 Tech Stack

### Frontend

| Technology   | Purpose                   |
| ------------ | ------------------------- |
| React        | User interface            |
| Vite         | Frontend build tool       |
| Tailwind CSS | Styling and responsive UI |
| React Router | Client-side routing       |
| Lucide React | Icons                     |
| JavaScript   | Frontend development      |

### Backend

| Technology | Purpose                          |
| ---------- | -------------------------------- |
| Python     | Backend programming              |
| FastAPI    | REST API framework               |
| SQLAlchemy | ORM and database interaction     |
| PyMySQL    | MySQL/TiDB database connectivity |
| JWT        | Authentication                   |
| bcrypt     | Password hashing                 |

### Database & Analytics

| Technology | Purpose                 |
| ---------- | ----------------------- |
| TiDB Cloud | Relational database     |
| SQLAlchemy | Database ORM            |
| Power BI   | Analytics and reporting |

### Development Tools

* Visual Studio Code
* Git
* GitHub
* FastAPI Swagger/OpenAPI
* Python Virtual Environment
* Node.js
* npm

---

## 📁 Project Structure

```text
campus-portal_SIH26044/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │
│   │   ├── pages/
│   │   │   ├── student/
│   │   │   ├── admin/
│   │   │   ├── academician/
│   │   │   └── organization/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   │   ├── auth.py
│   │   ├── students.py
│   │   ├── colleges.py
│   │   ├── companies.py
│   │   ├── internships.py
│   │   ├── applications.py
│   │   ├── placements.py
│   │   ├── skills.py
│   │   ├── learning_paths.py
│   │   ├── courses.py
│   │   ├── modules.py
│   │   ├── progress.py
│   │   ├── jobs.py
│   │   ├── training_programs.py
│   │   ├── admin.py
│   │   └── analytics.py
│   │
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── security.py
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

---

## 🔐 Authentication

LearnBridge uses **JWT-based authentication**.

### Authentication Flow

```text
User
 │
 ▼
Login / Register
 │
 ▼
FastAPI Authentication API
 │
 ▼
JWT Access Token
 │
 ▼
Stored in Browser
 │
 ▼
Protected API Requests
 │
 ▼
Role-Based Dashboard
```

Supported application roles include:

```text
student
academician
organization
admin
```

Protected routes verify the user's authentication state and role before allowing access.

---

## 🔌 API Structure

The backend follows a REST API architecture.

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Students

```text
GET    /api/students/me
PUT    /api/students/me
GET    /api/students/me/applications
GET    /api/students/me/placements

GET    /api/students/
GET    /api/students/{student_id}
POST   /api/students/
PUT    /api/students/{student_id}
DELETE /api/students/{student_id}
```

### Learning

```text
GET /api/learning-paths
GET /api/learning-paths/{path_id}

GET /api/courses
GET /api/courses/{course_id}

GET /api/modules/{module_id}
```

### Opportunities

```text
GET /api/jobs
GET /api/jobs/{job_id}
```

Additional APIs are available for companies, internships, applications, placements, skills, training programs, analytics, and administrative operations.

---

## 🗄️ Database

LearnBridge uses **TiDB Cloud** as the relational database.

Major entities include:

```text
Users
Students
Colleges
Companies
Internships
Applications
Placements
Skills
Student Skills
Learning Paths
Courses
Modules
Progress
Jobs
Training Programs
```

The backend uses **SQLAlchemy ORM** to communicate with the database.

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Python 3.11+
* Git

---

# 🖥️ Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

# 🐍 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

### Windows

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Start FastAPI:

```powershell
python -m uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 🔗 Frontend–Backend Connection

The frontend communicates with the backend through REST APIs.

The API base URL is currently:

```text
http://127.0.0.1:8000/api
```

Frontend API utility:

```text
frontend/src/api/api.js
```

Authentication tokens are attached to protected requests using:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

## 📊 Analytics

LearnBridge includes an administrative analytics module.

The backend provides analytics data through APIs, which can be consumed by the admin dashboard for displaying:

* Student statistics
* Placement information
* Internship information
* Training information
* Skill-related statistics
* Organization/company data

Power BI-related analytics are also supported in the admin module.

---

## 🎯 Learning Path System

The student learning system is organized into structured paths.

Example learning paths include:

```text
Java Full Stack
Data Structures & Algorithms
Cloud & DevOps
```

Each learning path can contain:

```text
Learning Path
      │
      ├── Course
      │     ├── Module
      │     │     ├── Lesson
      │     │     └── Assessment
      │     │
      │     └── Progress
      │
      └── Completion
```

The goal is to help students follow a structured skill-development journey aligned with their career goals.

---

## 🛡️ Security

The application includes:

* JWT authentication
* Password hashing using bcrypt
* Protected routes
* Role-based access control
* Backend request validation using Pydantic
* Database validation
* CORS configuration for frontend-backend communication

---

## 🌱 Future Enhancements

Planned improvements include:

* AI-powered learning recommendations
* AI-based skill gap analysis
* Personalized learning paths
* Intelligent job recommendations
* Student–organization compatibility scoring
* Advanced skill assessments
* Automated certificate generation
* Enhanced placement prediction
* Real-time notifications
* Advanced analytics
* Improved organization–student matching

---

## 👥 User Roles

### Student

```text
Learn → Build Skills → Track Progress → Apply → Get Placed
```

### Academician

```text
Monitor → Guide → Train → Support Students
```

### Organization

```text
Discover Talent → Post Opportunities → Engage With Students
```

### Administrator

```text
Manage → Monitor → Analyze → Coordinate
```

---

## 🎓 Project Objective

The primary objective of LearnBridge is to create a unified digital ecosystem that connects:

```text
                    ┌──────────────┐
                    │   Students   │
                    └──────┬───────┘
                           │
                           │
              ┌────────────▼────────────┐
              │       LearnBridge       │
              │                         │
              │ Skills • Learning •     │
              │ Opportunities •         │
              │ Placements • Analytics  │
              └───────┬─────────┬───────┘
                      │         │
             ┌────────▼───┐ ┌───▼──────────┐
             │ Academicians│ │ Organizations│
             └────────────┘ └──────────────┘
```

The platform aims to reduce the gap between **academic education and industry requirements** by bringing learning, skills, opportunities, and placement-related activities into one platform.

---

## 📌 Project Status

**Status:** 🚧 Active Development

The core frontend, backend APIs, authentication, role-based dashboards, student profile management, learning modules, opportunities, applications, placements, administration, and analytics components are being developed and integrated progressively.

---

## 🤝 Contributing

Contributions and suggestions are welcome.

To contribute:

```bash
git clone https://github.com/neelimachallagundla/campus-portal_SIH26044.git
cd campus-portal_SIH26044
```

Create a feature branch:

```bash
git checkout -b feature/your-feature
```

Make your changes, commit them, and push:

```bash
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then create a Pull Request.

---

## 📄 License

This project is developed for educational and hackathon purposes.

---

## ⭐ LearnBridge

**Bridging Education, Skills & Industry.**

> Learn. Build. Connect. Get Hired.

