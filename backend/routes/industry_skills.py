from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import IndustrySkill
from schemas import IndustrySkillCreate


router = APIRouter(
    prefix="/industry-skills",
    tags=["Industry Skills"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET all industry skills
@router.get("/")
def get_industry_skills(db: Session = Depends(get_db)):
    return db.query(IndustrySkill).all()


# GET one industry skill
@router.get("/{industry_skill_id}")
def get_industry_skill(
    industry_skill_id: int,
    db: Session = Depends(get_db)
):
    industry_skill = db.query(IndustrySkill).filter(
        IndustrySkill.industry_skill_id == industry_skill_id
    ).first()

    if not industry_skill:
        raise HTTPException(
            status_code=404,
            detail="Industry skill not found"
        )

    return industry_skill


# CREATE industry skill
@router.post("/")
def create_industry_skill(
    skill_data: IndustrySkillCreate,
    db: Session = Depends(get_db)
):
    new_skill = IndustrySkill(
        company_id=skill_data.company_id,
        skill_id=skill_data.skill_id,
        required_level=skill_data.required_level,
        is_mandatory=skill_data.is_mandatory
    )

    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)

    return new_skill


# UPDATE industry skill
@router.put("/{industry_skill_id}")
def update_industry_skill(
    industry_skill_id: int,
    skill_data: IndustrySkillCreate,
    db: Session = Depends(get_db)
):
    industry_skill = db.query(IndustrySkill).filter(
        IndustrySkill.industry_skill_id == industry_skill_id
    ).first()

    if not industry_skill:
        raise HTTPException(
            status_code=404,
            detail="Industry skill not found"
        )

    industry_skill.company_id = skill_data.company_id
    industry_skill.skill_id = skill_data.skill_id
    industry_skill.required_level = skill_data.required_level
    industry_skill.is_mandatory = skill_data.is_mandatory

    db.commit()
    db.refresh(industry_skill)

    return industry_skill


# DELETE industry skill
@router.delete("/{industry_skill_id}")
def delete_industry_skill(
    industry_skill_id: int,
    db: Session = Depends(get_db)
):
    industry_skill = db.query(IndustrySkill).filter(
        IndustrySkill.industry_skill_id == industry_skill_id
    ).first()

    if not industry_skill:
        raise HTTPException(
            status_code=404,
            detail="Industry skill not found"
        )

    db.delete(industry_skill)
    db.commit()

    return {
        "message": "Industry skill deleted successfully"
    }