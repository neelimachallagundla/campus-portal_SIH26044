# pyright: reportMissingImports=false

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from database import SessionLocal
from models import (
    User,
    Student,
    Application,
    Placement,
    StudentSkill,
    Skill
)
from schemas import StudentCreate
from security import verify_access_token


router = APIRouter(
    prefix="/api/students",
    tags=["Students"]
)

security = HTTPBearer()


# =========================================================
# DATABASE DEPENDENCY
# =========================================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================================================
# GET ALL STUDENTS
# =========================================================

@router.get("/")
def get_students(
    db: Session = Depends(get_db)
):
    return db.query(Student).all()


# =========================================================
# GET LOGGED-IN STUDENT PROFILE
# IMPORTANT: /me MUST COME BEFORE /{student_id}
# =========================================================

@router.get("/me")
def get_my_profile(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    payload = verify_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(User).filter(
        User.user_id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.role != "student":
        raise HTTPException(
            status_code=403,
            detail="Only students can access this profile"
        )

    student = db.query(Student).filter(
        Student.email == user.email
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    return student


# =========================================================
# GET LOGGED-IN STUDENT APPLICATIONS
# =========================================================

@router.get("/me/applications")
def get_my_applications(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    payload = verify_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(User).filter(
        User.user_id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.role != "student":
        raise HTTPException(
            status_code=403,
            detail="Only students can access their applications"
        )

    student = db.query(Student).filter(
        Student.email == user.email
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    applications = db.query(Application).filter(
        Application.student_id == student.student_id
    ).all()

    return applications


# =========================================================
# GET LOGGED-IN STUDENT PLACEMENTS
# =========================================================

@router.get("/me/placements")
def get_my_placements(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    payload = verify_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(User).filter(
        User.user_id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.role != "student":
        raise HTTPException(
            status_code=403,
            detail="Only students can access their placements"
        )

    student = db.query(Student).filter(
        Student.email == user.email
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    placements = db.query(Placement).filter(
        Placement.student_id == student.student_id
    ).all()

    return placements


# =========================================================
# GET LOGGED-IN STUDENT SKILLS
# =========================================================

@router.get("/me/skills")
def get_my_skills(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    payload = verify_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    if payload.get("role") != "student":
        raise HTTPException(
            status_code=403,
            detail="Student access required"
        )

    student = db.query(Student).filter(
        Student.email == payload.get("email")
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    results = (
        db.query(StudentSkill, Skill)
        .join(
            Skill,
            StudentSkill.skill_id == Skill.skill_id
        )
        .filter(
            StudentSkill.student_id == student.student_id
        )
        .all()
    )

    return [
        {
            "student_skill_id": student_skill.student_skill_id,
            "skill_id": skill.skill_id,
            "skill_name": skill.skill_name,
            "skill_category": skill.skill_category,
            "proficiency_level": student_skill.proficiency_level,
            "experience_years": student_skill.experience_years
        }
        for student_skill, skill in results
    ]


# =========================================================
# GET STUDENT BY ID
# IMPORTANT: Keep this AFTER all /me routes
# =========================================================

@router.get("/{student_id}")
def get_student(
    student_id: int,
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(
        Student.student_id == student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student


# =========================================================
# CREATE STUDENT
# =========================================================

@router.post("/")
def create_student(
    data: StudentCreate,
    db: Session = Depends(get_db)
):
    student = Student(
        student_id=data.student_id,
        college_id=data.college_id,
        name=data.name,
        email=data.email,
        phone=data.phone,
        gender=data.gender,
        dob=data.dob,
        course=data.course,
        branch=data.branch,
        cgpa=data.cgpa
    )

    db.add(student)
    db.commit()
    db.refresh(student)

    return student


# =========================================================
# UPDATE LOGGED-IN STUDENT PROFILE
# IMPORTANT: /me MUST COME BEFORE /{student_id}
# =========================================================

@router.put("/me")
def update_my_profile(
    data: StudentCreate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    payload = verify_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(User).filter(
        User.user_id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.role != "student":
        raise HTTPException(
            status_code=403,
            detail="Only students can update this profile"
        )

    student = db.query(Student).filter(
        Student.email == user.email
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    student.college_id = data.college_id
    student.name = data.name
    student.email = data.email
    student.phone = data.phone
    student.gender = data.gender
    student.dob = data.dob
    student.course = data.course
    student.branch = data.branch
    student.cgpa = data.cgpa

    db.commit()
    db.refresh(student)

    return student


# =========================================================
# UPDATE STUDENT BY ID
# =========================================================

@router.put("/{student_id}")
def update_student(
    student_id: int,
    data: StudentCreate,
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(
        Student.student_id == student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    student.college_id = data.college_id
    student.name = data.name
    student.email = data.email
    student.phone = data.phone
    student.gender = data.gender
    student.dob = data.dob
    student.course = data.course
    student.branch = data.branch
    student.cgpa = data.cgpa

    db.commit()
    db.refresh(student)

    return student


# =========================================================
# DELETE STUDENT
# =========================================================

@router.delete("/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(
        Student.student_id == student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    db.delete(student)
    db.commit()

    return {
        "message": "Student deleted successfully"
    }