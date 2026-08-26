from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Role
from schemas import RoleCreate

router = APIRouter(
    prefix="/roles",
    tags=["Roles"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_roles(db: Session = Depends(get_db)):
    return db.query(Role).all()


@router.get("/{role_id}")
def get_role(role_id: int, db: Session = Depends(get_db)):
    role = db.query(Role).filter(
        Role.role_id == role_id
    ).first()

    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    return role


@router.post("/")
def create_role(data: RoleCreate, db: Session = Depends(get_db)):
    role = Role(
        role_id=data.role_id,
        role_name=data.role_name,
        description=data.description
    )

    db.add(role)
    db.commit()

    return role


@router.put("/{role_id}")
def update_role(
    role_id: int,
    data: RoleCreate,
    db: Session = Depends(get_db)
):
    role = db.query(Role).filter(
        Role.role_id == role_id
    ).first()

    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    role.role_name = data.role_name
    role.description = data.description

    db.commit()

    return role


@router.delete("/{role_id}")
def delete_role(role_id: int, db: Session = Depends(get_db)):
    role = db.query(Role).filter(
        Role.role_id == role_id
    ).first()

    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    db.delete(role)
    db.commit()

    return {"message": "Role deleted successfully"}