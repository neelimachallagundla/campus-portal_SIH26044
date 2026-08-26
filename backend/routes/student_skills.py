from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import StudentSkill
from schemas import StudentSkillCreate


router = APIRouter(
    prefix="/student-skills",
    tags=["Student Skills"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_student_skills(db: Session = Depends(get_db)):
    return db.query(StudentSkill).all()


@router.get("/{student_skill_id}")
def get_student_skill(
    student_skill_id: int,
    db: Session = Depends(get_db)
):
    item = db.query(StudentSkill).filter(
        StudentSkill.student_skill_id == student_skill_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Student skill not found"
        )

    return item


@router.post("/")
def create_student_skill(
    data: StudentSkillCreate,
    db: Session = Depends(get_db)
):
    item = StudentSkill(
        student_id=data.student_id,
        skill_id=data.skill_id,
        proficiency_level=data.proficiency_level,
        experience_years=data.experience_years
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


@router.put("/{student_skill_id}")
def update_student_skill(
    student_skill_id: int,
    data: StudentSkillCreate,
    db: Session = Depends(get_db)
):
    item = db.query(StudentSkill).filter(
        StudentSkill.student_skill_id == student_skill_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Student skill not found"
        )

    item.student_id = data.student_id
    item.skill_id = data.skill_id
    item.proficiency_level = data.proficiency_level
    item.experience_years = data.experience_years

    db.commit()
    db.refresh(item)

    return item


@router.delete("/{student_skill_id}")
def delete_student_skill(
    student_skill_id: int,
    db: Session = Depends(get_db)
):
    item = db.query(StudentSkill).filter(
        StudentSkill.student_skill_id == student_skill_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Student skill not found"
        )

    db.delete(item)
    db.commit()

    return {"message": "Student skill deleted successfully"}