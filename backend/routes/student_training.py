from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from database import SessionLocal
from models import StudentTraining, Student, User, TrainingProgram
from schemas import StudentTrainingCreate
from security import verify_access_token


router = APIRouter(
    prefix="/api/student-training",
    tags=["Student Training"]
)

security = HTTPBearer()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================================================
# GET ALL STUDENT TRAINING
# =========================================================

@router.get("/")
def get_student_training(
    db: Session = Depends(get_db)
):
    return db.query(StudentTraining).all()


# =========================================================
# GET STUDENT TRAINING BY ID
# =========================================================

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


# =========================================================
# CREATE STUDENT TRAINING
# =========================================================

@router.post("/")
def create_student_training(
    data: StudentTrainingCreate,
    db: Session = Depends(get_db)
):
    item = StudentTraining(
        student_training_id=data.student_training_id,
        student_id=data.student_id,
        training_id=data.training_id,
        start_date=data.start_date,
        completion_status=data.completion_status
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


# =========================================================
# UPDATE STUDENT TRAINING
# =========================================================

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

@router.get("/me/training")
def get_my_training(
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

    user_id = payload.get("user_id")

    user = db.query(User).filter(
        User.user_id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    student = db.query(Student).filter(
        Student.email == user.email
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    training = (
        db.query(StudentTraining, TrainingProgram)
        .join(
            TrainingProgram,
            StudentTraining.training_id == TrainingProgram.training_id
        )
        .filter(
            StudentTraining.student_id == student.student_id
        )
        .all()
    )

# =========================================================
# DELETE STUDENT TRAINING
# =========================================================

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

    return {
        "message": "Student training deleted successfully"
    }


# =========================================================
# GET LOGGED-IN STUDENT'S TRAINING
# =========================================================


    return [
        {
            "student_training_id": student_training.student_training_id,
            "training_id": training_program.training_id,
            "training_name": training_program.training_name,
            "provider": training_program.provider,
            "duration": training_program.duration,
            "level": training_program.level,
            "training_link": training_program.training_link,
            "start_date": student_training.start_date,
            "completion_status": student_training.completion_status
        }
        for student_training, training_program in training
    ]