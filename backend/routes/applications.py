from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Application, Student, User
from schemas import ApplicationCreate
from security import verify_access_token


router = APIRouter(
    prefix="/api/applications",
    tags=["Applications"]
)

security = HTTPBearer()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET all applications
@router.get("/")
def get_applications(db: Session = Depends(get_db)):
    return db.query(Application).all()


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


# GET logged-in student's applications
@router.get("/student/me")
def get_my_applications(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials
    payload = verify_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(User).filter(
        User.user_id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.role != "student":
        raise HTTPException(
            status_code=403,
            detail="Only students can access their applications"
        )

    student = db.query(Student).filter(
        Student.email == user.email
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    applications = db.query(Application).filter(
        Application.student_id == student.student_id
    ).all()

    return applications


# CREATE application
@router.post("/")
def create_application(
    application_data: ApplicationCreate,
    db: Session = Depends(get_db)
):
    new_application = Application(
        application_id=application_data.application_id,
        student_id=application_data.student_id,
        internship_id=application_data.internship_id,
        job_id=application_data.job_id,
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
    application.job_id = application_data.job_id
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