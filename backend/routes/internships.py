from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Internship
from schemas import InternshipCreate


router = APIRouter(
    prefix="/internships",
    tags=["Internships"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET all internships
@router.get("/")
def get_internships(db: Session = Depends(get_db)):
    internships = db.query(Internship).all()
    return internships


# GET one internship
@router.get("/{internship_id}")
def get_internship(
    internship_id: int,
    db: Session = Depends(get_db)
):
    internship = db.query(Internship).filter(
        Internship.internship_id == internship_id
    ).first()

    if not internship:
        raise HTTPException(
            status_code=404,
            detail="Internship not found"
        )

    return internship


# CREATE internship
@router.post("/")
def create_internship(
    internship_data: InternshipCreate,
    db: Session = Depends(get_db)
):
    new_internship = Internship(
        company_id=internship_data.company_id,
        title=internship_data.title,
        description=internship_data.description,
        location=internship_data.location,
        stipend=internship_data.stipend,
        start_date=internship_data.start_date,
        end_date=internship_data.end_date
    )

    db.add(new_internship)
    db.commit()
    db.refresh(new_internship)

    return new_internship


# UPDATE internship
@router.put("/{internship_id}")
def update_internship(
    internship_id: int,
    internship_data: InternshipCreate,
    db: Session = Depends(get_db)
):
    internship = db.query(Internship).filter(
        Internship.internship_id == internship_id
    ).first()

    if not internship:
        raise HTTPException(
            status_code=404,
            detail="Internship not found"
        )

    internship.company_id = internship_data.company_id
    internship.title = internship_data.title
    internship.description = internship_data.description
    internship.location = internship_data.location
    internship.stipend = internship_data.stipend
    internship.start_date = internship_data.start_date
    internship.end_date = internship_data.end_date

    db.commit()
    db.refresh(internship)

    return internship


# DELETE internship
@router.delete("/{internship_id}")
def delete_internship(
    internship_id: int,
    db: Session = Depends(get_db)
):
    internship = db.query(Internship).filter(
        Internship.internship_id == internship_id
    ).first()

    if not internship:
        raise HTTPException(
            status_code=404,
            detail="Internship not found"
        )

    db.delete(internship)
    db.commit()

    return {
        "message": "Internship deleted successfully"
    }