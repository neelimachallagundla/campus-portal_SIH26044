from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Placement
from schemas import PlacementCreate


router = APIRouter(
    prefix="/placements",
    tags=["Placements"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET all placements
@router.get("/")
def get_placements(db: Session = Depends(get_db)):
    return db.query(Placement).all()


# GET one placement
@router.get("/{placement_id}")
def get_placement(
    placement_id: int,
    db: Session = Depends(get_db)
):
    placement = db.query(Placement).filter(
        Placement.placement_id == placement_id
    ).first()

    if not placement:
        raise HTTPException(
            status_code=404,
            detail="Placement not found"
        )

    return placement


# CREATE placement
@router.post("/")
def create_placement(
    placement_data: PlacementCreate,
    db: Session = Depends(get_db)
):
    new_placement = Placement(
        student_id=placement_data.student_id,
        company_id=placement_data.company_id,
        job_role=placement_data.job_role,
        package_lpa=placement_data.package_lpa,
        placement_date=placement_data.placement_date,
        status=placement_data.status
    )

    db.add(new_placement)
    db.commit()
    db.refresh(new_placement)

    return new_placement


# UPDATE placement
@router.put("/{placement_id}")
def update_placement(
    placement_id: int,
    placement_data: PlacementCreate,
    db: Session = Depends(get_db)
):
    placement = db.query(Placement).filter(
        Placement.placement_id == placement_id
    ).first()

    if not placement:
        raise HTTPException(
            status_code=404,
            detail="Placement not found"
        )

    placement.student_id = placement_data.student_id
    placement.company_id = placement_data.company_id
    placement.job_role = placement_data.job_role
    placement.package_lpa = placement_data.package_lpa
    placement.placement_date = placement_data.placement_date
    placement.status = placement_data.status

    db.commit()
    db.refresh(placement)

    return placement


# DELETE placement
@router.delete("/{placement_id}")
def delete_placement(
    placement_id: int,
    db: Session = Depends(get_db)
):
    placement = db.query(Placement).filter(
        Placement.placement_id == placement_id
    ).first()

    if not placement:
        raise HTTPException(
            status_code=404,
            detail="Placement not found"
        )

    db.delete(placement)
    db.commit()

    return {
        "message": "Placement deleted successfully"
    }