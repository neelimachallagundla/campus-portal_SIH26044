from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from sqlalchemy import func
from security import verify_access_token
from database import SessionLocal
from models import (
    Student,
    College,
    Company,
    Internship,
    Application,
    Placement,
    Skill,
    IndustrySkill
)


router = APIRouter(
    prefix="/api/admin/analytics",
    tags=["Power BI Analytics"]
)

security = HTTPBearer()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/powerbi")
def get_powerbi_analytics(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    payload = verify_access_token(credentials.credentials)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    # Total counts
    total_students = db.query(Student).count()
    total_companies = db.query(Company).count()
    total_internships = db.query(Internship).count()
    total_applications = db.query(Application).count()
    total_placements = db.query(Placement).count()
    total_skills = db.query(Skill).count()

    # Students by branch
    students_by_branch = (
        db.query(
            Student.branch,
            func.count(Student.student_id)
        )
        .group_by(Student.branch)
        .all()
    )

    # Applications by status
    applications_by_status = (
        db.query(
            Application.status,
            func.count(Application.application_id)
        )
        .group_by(Application.status)
        .all()
    )

    # Top 10 companies by placements
    placements_by_company = (
        db.query(
            Company.company_name,
            func.count(Placement.placement_id).label("count")
        )
        .join(
            Company,
            Company.company_id == Placement.company_id
        )
        .group_by(Company.company_name)
        .order_by(func.count(Placement.placement_id).desc())
        .limit(10)
        .all()
    )

    # Top 10 companies by internships
    internships_by_company = (
        db.query(
            Company.company_name,
            func.count(Internship.internship_id).label("count")
        )
        .join(
            Company,
            Company.company_id == Internship.company_id
        )
        .group_by(Company.company_name)
        .order_by(func.count(Internship.internship_id).desc())
        .limit(10)
        .all()
    )

    # Students by college
    students_by_college = (
        db.query(
            College.college_name,
            func.count(Student.student_id)
        )
        .join(
            College,
            College.college_id == Student.college_id
        )
        .group_by(College.college_name)
        .all()
    )

    # Placement package statistics
    average_package = db.query(
        func.avg(Placement.package_lpa)
    ).scalar()

    highest_package = db.query(
        func.max(Placement.package_lpa)
    ).scalar()

    lowest_package = db.query(
        func.min(Placement.package_lpa)
    ).scalar()

    # Top 10 job roles by placements
    placements_by_role = (
        db.query(
            Placement.job_role,
            func.count(Placement.placement_id).label("count")
        )
        .group_by(Placement.job_role)
        .order_by(func.count(Placement.placement_id).desc())
        .limit(10)
        .all()
    )

    # Internships by location
    internships_by_location = (
        db.query(
            Internship.location,
            func.count(Internship.internship_id).label("count")
        )
        .group_by(Internship.location)
        .order_by(func.count(Internship.internship_id).desc())
        .all()
    )

    # Top 10 industry-demanded skills
    industry_skill_demand = (
        db.query(
            Skill.skill_name,
            func.count(IndustrySkill.industry_skill_id).label("count")
        )
        .join(
            IndustrySkill,
            IndustrySkill.skill_id == Skill.skill_id
        )
        .group_by(Skill.skill_name)
        .order_by(func.count(IndustrySkill.industry_skill_id).desc())
        .limit(10)
        .all()
    )

    return {
        "summary": {
            "total_students": total_students,
            "total_companies": total_companies,
            "total_internships": total_internships,
            "total_applications": total_applications,
            "total_placements": total_placements,
            "total_skills": total_skills
        },

        "students_by_branch": [
            {
                "branch": branch,
                "count": count
            }
            for branch, count in students_by_branch
        ],

        "applications_by_status": [
            {
                "status": status,
                "count": count
            }
            for status, count in applications_by_status
        ],

        "placements_by_company": [
            {
                "company": company,
                "count": count
            }
            for company, count in placements_by_company
        ],

        "internships_by_company": [
            {
                "company": company,
                "count": count
            }
            for company, count in internships_by_company
        ],

        "students_by_college": [
            {
                "college": college,
                "count": count
            }
            for college, count in students_by_college
        ],

        "placement_package": {
            "average_lpa": average_package,
            "highest_lpa": highest_package,
            "lowest_lpa": lowest_package
        },

        "placements_by_role": [
            {
                "job_role": job_role,
                "count": count
            }
            for job_role, count in placements_by_role
        ],

        "internships_by_location": [
            {
                "location": location,
                "count": count
            }
            for location, count in internships_by_location
        ],

        "industry_skill_demand": [
            {
                "skill": skill,
                "count": count
            }
            for skill, count in industry_skill_demand
        ]
    }
embed_router = APIRouter(
    prefix="/api/admin/powerbi",
    tags=["Power BI"]
)

# =========================================================
# ADMIN ANALYTICS SUMMARY
# =========================================================

@router.get("/summary")
def get_admin_analytics_summary(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    payload = verify_access_token(credentials.credentials)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    if payload.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return {
        "total_students": db.query(Student).count(),
        "total_companies": db.query(Company).count(),
        "total_internships": db.query(Internship).count(),
        "total_applications": db.query(Application).count(),
        "total_placements": db.query(Placement).count(),
        "total_skills": db.query(Skill).count()
    }

@embed_router.get("/embed-config")
def get_powerbi_embed_config():
    return {
        "reportId": "your-report-id",
        "embedUrl": "your-embed-url",
        "accessToken": "generated-embed-token"
    }