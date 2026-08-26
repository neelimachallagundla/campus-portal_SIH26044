from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import College
from schemas import CollegeCreate

router = APIRouter(
    prefix="/colleges",
    tags=["Colleges"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET all colleges
@router.get("/")
def get_colleges(db: Session = Depends(get_db)):
    colleges = db.query(College).all()
    return colleges


# GET one college
@router.get("/{college_id}")
def get_college(
    college_id: int,
    db: Session = Depends(get_db)
):
    college = db.query(College).filter(
        College.college_id == college_id
    ).first()

    if not college:
        raise HTTPException(
            status_code=404,
            detail="College not found"
        )

    return college


# CREATE college
@router.post("/")
def create_college(
    college_data: CollegeCreate,
    db: Session = Depends(get_db)
):
    new_college = College(
        college_name=college_data.college_name,
        university_name=college_data.university_name,
        location=college_data.location,
        city=college_data.city,
        state=college_data.state,
        email=college_data.email,
        contact_no=college_data.contact_no
    )

    db.add(new_college)
    db.commit()
    

    return new_college


# UPDATE college
@router.put("/{college_id}")
def update_college(
    college_id: int,
    college_data: CollegeCreate,
    db: Session = Depends(get_db)
):
    college = db.query(College).filter(
        College.college_id == college_id
    ).first()

    if not college:
        raise HTTPException(
            status_code=404,
            detail="College not found"
        )

    college.college_name = college_data.college_name
    college.university_name = college_data.university_name
    college.location = college_data.location
    college.city = college_data.city
    college.state = college_data.state
    college.email = college_data.email
    college.contact_no = college_data.contact_no

    db.commit()
    db.refresh(college)

    return college


# DELETE college
@router.delete("/{college_id}")
def delete_college(
    college_id: int,
    db: Session = Depends(get_db)
):
    college = db.query(College).filter(
        College.college_id == college_id
    ).first()

    if not college:
        raise HTTPException(
            status_code=404,
            detail="College not found"
        )

    db.delete(college)
    db.commit()

    return {
        "message": "College deleted successfully"
    }