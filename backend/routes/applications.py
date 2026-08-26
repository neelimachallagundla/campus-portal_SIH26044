from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Application
from schemas import ApplicationCreate


router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET all applications
@router.get("/")
def get_applications(db: Session = Depends(get_db)):
    applications = db.query(Application).all()
    return applications


# GET one application
@router.get("/{application_id}")
def get_application(
    application_id: int,
    db: Session = Depends(get_db)
):
    application = db.query(Application).filter(
        Application.application_id == application_id
    ).first()

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    return application


# CREATE application
@router.post("/")
def create_application(
    application_data: ApplicationCreate,
    db: Session = Depends(get_db)
):
    new_application = Application(
        student_id=application_data.student_id,
        internship_id=application_data.internship_id,
        application_date=application_data.application_date,
        status=application_data.status,
        interview_status=application_data.interview_status,
        remarks=application_data.remarks
    )

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return new_application


# UPDATE application
@router.put("/{application_id}")
def update_application(
    application_id: int,
    application_data: ApplicationCreate,
    db: Session = Depends(get_db)
):
    application = db.query(Application).filter(
        Application.application_id == application_id
    ).first()

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    application.student_id = application_data.student_id
    application.internship_id = application_data.internship_id
    application.application_date = application_data.application_date
    application.status = application_data.status
    application.interview_status = application_data.interview_status
    application.remarks = application_data.remarks

    db.commit()
    db.refresh(application)

    return application


# DELETE application
@router.delete("/{application_id}")
def delete_application(
    application_id: int,
    db: Session = Depends(get_db)
):
    application = db.query(Application).filter(
        Application.application_id == application_id
    ).first()

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    db.delete(application)
    db.commit()

    return {
        "message": "Application deleted successfully"
    }