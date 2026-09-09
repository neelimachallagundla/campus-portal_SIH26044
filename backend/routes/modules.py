from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Module, Course, Lesson

router = APIRouter(
    prefix="/api",
    tags=["Modules & Lessons"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Get lessons of a module
@router.get("/modules/{module_id}/lessons")
def get_module_lessons(
    module_id: int,
    db: Session = Depends(get_db)
):
    module = db.query(Module).filter(
        Module.module_id == module_id
    ).first()

    if not module:
        raise HTTPException(
            status_code=404,
            detail="Module not found"
        )

    return db.query(Lesson).filter(
        Lesson.module_id == module_id
    ).order_by(Lesson.lesson_order).all()


# Get one lesson
@router.get("/lessons/{lesson_id}")
def get_lesson(
    lesson_id: int,
    db: Session = Depends(get_db)
):
    lesson = db.query(Lesson).filter(
        Lesson.lesson_id == lesson_id
    ).first()

    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Lesson not found"
        )

    return lesson