# pyright: reportMissingImports=false
from fastapi import APIRouter, Depends, HTTPException
from typing import Any
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Student, User, Application, Placement
from schemas import StudentCreate
from security import verify_access_token


router = APIRouter(
    prefix="/api/students",
    tags=["Students"]
)

security = HTTPBearer()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_students(db: Any = Depends(get_db)):
    return db.query(Student).all()


@router.get("/{student_id}")
def get_student(student_id: int, db: Any = Depends(get_db)):
    student = db.query(Student).filter(
        Student.student_id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return student


@router.post("/")
def create_student(data: StudentCreate, db: Any = Depends(get_db)):
    student = Student(
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
   

    return student


@router.put("/{student_id}")
def update_student(
    student_id: int,
    data: StudentCreate,
    db: Any = Depends(get_db)
# =========================================================
# GET logged-in student's profile
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

@router.get("/me/applications")
def get_my_applications(
    credentials=Depends(security),
    db=Depends(get_db)
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
# UPDATE logged-in student's profile
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


@router.delete("/{student_id}")
def delete_student(student_id: int, db: Any = Depends(get_db)):
# =========================================================
# GET all students
# =========================================================

@router.get("/")
def get_students(
    db: Session = Depends(get_db)
):
    return db.query(Student).all()


# =========================================================
# GET student by ID
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
# CREATE student
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
# UPDATE student by ID
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
# DELETE student
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


@router.get("/me/placements")
def get_my_placements(
    credentials=Depends(security),
    db=Depends(get_db)
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