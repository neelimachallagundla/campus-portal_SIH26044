# pyright: reportMissingImports=false
from fastapi import APIRouter, Depends, HTTPException
from typing import Any

from database import SessionLocal
from models import Student
from schemas import StudentCreate


router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


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
):
    student = db.query(Student).filter(
        Student.student_id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

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
    student = db.query(Student).filter(
        Student.student_id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    db.delete(student)
    db.commit()

    return {"message": "Student deleted successfully"}