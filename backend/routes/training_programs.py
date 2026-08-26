from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import TrainingProgram
from schemas import TrainingProgramCreate


router = APIRouter(
    prefix="/training-programs",
    tags=["Training Programs"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_training_programs(db: Session = Depends(get_db)):
    return db.query(TrainingProgram).all()


@router.get("/{training_id}")
def get_training_program(
    training_id: int,
    db: Session = Depends(get_db)
):
    program = db.query(TrainingProgram).filter(
        TrainingProgram.training_id == training_id
    ).first()

    if not program:
        raise HTTPException(
            status_code=404,
            detail="Training program not found"
        )

    return program


@router.post("/")
def create_training_program(
    data: TrainingProgramCreate,
    db: Session = Depends(get_db)
):
    program = TrainingProgram(
        skill_id=data.skill_id,
        training_name=data.training_name,
        provider=data.provider,
        duration=data.duration,
        level=data.level,
        training_link=data.training_link
    )

    db.add(program)
    db.commit()
    db.refresh(program)

    return program


@router.put("/{training_id}")
def update_training_program(
    training_id: int,
    data: TrainingProgramCreate,
    db: Session = Depends(get_db)
):
    program = db.query(TrainingProgram).filter(
        TrainingProgram.training_id == training_id
    ).first()

    if not program:
        raise HTTPException(
            status_code=404,
            detail="Training program not found"
        )

    program.skill_id = data.skill_id
    program.training_name = data.training_name
    program.provider = data.provider
    program.duration = data.duration
    program.level = data.level
    program.training_link = data.training_link

    db.commit()
    db.refresh(program)

    return program


@router.delete("/{training_id}")
def delete_training_program(
    training_id: int,
    db: Session = Depends(get_db)
):
    program = db.query(TrainingProgram).filter(
        TrainingProgram.training_id == training_id
    ).first()

    if not program:
        raise HTTPException(
            status_code=404,
            detail="Training program not found"
        )

    db.delete(program)
    db.commit()

    return {"message": "Training program deleted successfully"}