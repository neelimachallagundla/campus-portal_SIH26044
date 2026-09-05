from importlib import import_module


FastAPI = import_module("fastapi").FastAPI
CORSMiddleware = import_module("fastapi.middleware.cors").CORSMiddleware
from database import engine

from routes.colleges import router as colleges_router
from routes.companies import router as companies_router
from routes.internships import router as internships_router
from routes.applications import router as applications_router
from routes.placements import router as placements_router
from routes.industry_skills import router as industry_skills_router
from routes.role_required_skills import router as role_required_skills_router
from routes.roles import router as roles_router
from routes.skills import router as skills_router
from routes.students import router as students_router
from routes.student_skills import router as student_skills_router
from routes.student_training import router as student_training_router
from routes.training_programs import router as training_programs_router


app = FastAPI(
    title="Academia-Industry Collaboration Portal API",
    description="Backend API for SIH project",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(colleges_router)
app.include_router(companies_router)
app.include_router(internships_router)
app.include_router(applications_router)
app.include_router(placements_router)
app.include_router(industry_skills_router)
app.include_router(role_required_skills_router)
app.include_router(roles_router)
app.include_router(skills_router)
app.include_router(students_router)
app.include_router(student_skills_router)
app.include_router(student_training_router)
app.include_router(training_programs_router)


@app.get("/")
def home():
    return {
        "message": "SIH Backend is working!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "OK",
        "message": "Backend is running"
    }