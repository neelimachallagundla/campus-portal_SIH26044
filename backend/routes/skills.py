from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Skill
from schemas import SkillCreate


router = APIRouter(
    prefix="/skills",
    tags=["Skills"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_skills(db: Session = Depends(get_db)):
    return db.query(Skill).all()


@router.get("/{skill_id}")
def get_skill(skill_id: int, db: Session = Depends(get_db)):
    skill = db.query(Skill).filter(Skill.skill_id == skill_id).first()

    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    return skill


@router.post("/")
def create_skill(data: SkillCreate, db: Session = Depends(get_db)):
    skill = Skill(
        skill_name=data.skill_name,
        skill_category=data.skill_category,
        description=data.description,
        status=data.status
    )

    db.add(skill)
    db.commit()
    db.refresh(skill)

    return skill


@router.put("/{skill_id}")
def update_skill(
    skill_id: int,
    data: SkillCreate,
    db: Session = Depends(get_db)
):
    skill = db.query(Skill).filter(Skill.skill_id == skill_id).first()

    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    skill.skill_name = data.skill_name
    skill.skill_category = data.skill_category
    skill.description = data.description
    skill.status = data.status

    db.commit()
    db.refresh(skill)

    return skill


@router.delete("/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    skill = db.query(Skill).filter(Skill.skill_id == skill_id).first()

    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    db.delete(skill)
    db.commit()

    return {"message": "Skill deleted successfully"}