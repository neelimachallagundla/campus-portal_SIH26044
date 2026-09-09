from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Course, Module

router = APIRouter(
    prefix="/api/courses",
    tags=["Courses"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Get all courses
@router.get("/")
def get_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()


# Get one course
@router.get("/{course_id}")
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(
        Course.course_id == course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    return course


# Get modules of a course
@router.get("/{course_id}/modules")
def get_course_modules(
    course_id: int,
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(
        Course.course_id == course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    return db.query(Module).filter(
        Module.course_id == course_id
    ).order_by(Module.module_order).all()