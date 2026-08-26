from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import StudentTraining
from schemas import StudentTrainingCreate


router = APIRouter(
    prefix="/student-training",
    tags=["Student Training"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_student_training(db: Session = Depends(get_db)):
    return db.query(StudentTraining).all()


@router.get("/{student_training_id}")
def get_student_training_by_id(
    student_training_id: int,
    db: Session = Depends(get_db)
):
    item = db.query(StudentTraining).filter(
        StudentTraining.student_training_id == student_training_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Student training not found"
        )

    return item


@router.post("/")
def create_student_training(
    data: StudentTrainingCreate,
    db: Session = Depends(get_db)
):
    item = StudentTraining(
        student_id=data.student_id,
        training_id=data.training_id,
        start_date=data.start_date,
        completion_status=data.completion_status
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


@router.put("/{student_training_id}")
def update_student_training(
    student_training_id: int,
    data: StudentTrainingCreate,
    db: Session = Depends(get_db)
):
    item = db.query(StudentTraining).filter(
        StudentTraining.student_training_id == student_training_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Student training not found"
        )

    item.student_id = data.student_id
    item.training_id = data.training_id
    item.start_date = data.start_date
    item.completion_status = data.completion_status

    db.commit()
    db.refresh(item)

    return item


@router.delete("/{student_training_id}")
def delete_student_training(
    student_training_id: int,
    db: Session = Depends(get_db)
):
    item = db.query(StudentTraining).filter(
        StudentTraining.student_training_id == student_training_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Student training not found"
        )

    db.delete(item)
    db.commit()

    return {"message": "Student training deleted successfully"}