from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import RoleRequiredSkill
from schemas import RoleRequiredSkillCreate


router = APIRouter(
    prefix="/role-required-skills",
    tags=["Role Required Skills"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET all role required skills
@router.get("/")
def get_role_required_skills(db: Session = Depends(get_db)):
    return db.query(RoleRequiredSkill).all()


# GET one role required skill
@router.get("/{role_required_skill_id}")
def get_role_required_skill(
    role_required_skill_id: int,
    db: Session = Depends(get_db)
):
    skill = db.query(RoleRequiredSkill).filter(
        RoleRequiredSkill.role_required_skill_id == role_required_skill_id
    ).first()

    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Role required skill not found"
        )

    return skill


# CREATE role required skill
@router.post("/")
def create_role_required_skill(
    skill_data: RoleRequiredSkillCreate,
    db: Session = Depends(get_db)
):
    new_skill = RoleRequiredSkill(
        role_id=skill_data.role_id,
        skill_id=skill_data.skill_id,
        is_mandatory=skill_data.is_mandatory
    )

    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)

    return new_skill


# UPDATE role required skill
@router.put("/{role_required_skill_id}")
def update_role_required_skill(
    role_required_skill_id: int,
    skill_data: RoleRequiredSkillCreate,
    db: Session = Depends(get_db)
):
    skill = db.query(RoleRequiredSkill).filter(
        RoleRequiredSkill.role_required_skill_id == role_required_skill_id
    ).first()

    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Role required skill not found"
        )

    skill.role_id = skill_data.role_id
    skill.skill_id = skill_data.skill_id
    skill.is_mandatory = skill_data.is_mandatory

    db.commit()
    db.refresh(skill)

    return skill


# DELETE role required skill
@router.delete("/{role_required_skill_id}")
def delete_role_required_skill(
    role_required_skill_id: int,
    db: Session = Depends(get_db)
):
    skill = db.query(RoleRequiredSkill).filter(
        RoleRequiredSkill.role_required_skill_id == role_required_skill_id
    ).first()

    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Role required skill not found"
        )

    db.delete(skill)
    db.commit()

    return {
        "message": "Role required skill deleted successfully"
    }