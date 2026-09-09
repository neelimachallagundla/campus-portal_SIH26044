
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import date

from database import SessionLocal
from models import Job, Application, Student, User
from security import verify_access_token


router = APIRouter(
    prefix="/api/jobs",
    tags=["Jobs"]
)

security = HTTPBearer()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_jobs(db: Session = Depends(get_db)):
    return db.query(Job).all()


@router.get("/{job_id}")
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(
        Job.job_id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    return job


@router.post("/{job_id}/apply")
def apply_for_job(
    job_id: int,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    # Verify token
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

    # Check user
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
            detail="Only students can apply for jobs"
        )

    # Find student profile
    student = db.query(Student).filter(
        Student.email == user.email
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    # Check job
    job = db.query(Job).filter(
        Job.job_id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    # Check duplicate application
    existing_application = db.query(Application).filter(
        Application.student_id == student.student_id,
        Application.job_id == job_id
    ).first()

    if existing_application:
        raise HTTPException(
            status_code=400,
            detail="You have already applied for this job"
        )

    # Generate next application ID
    last_application = db.query(Application).order_by(
        Application.application_id.desc()
    ).first()

    next_application_id = (
        last_application.application_id + 1
        if last_application
        else 1
    )

    # Create application
    application = Application(
        application_id=next_application_id,
        student_id=student.student_id,
        job_id=job_id,
        internship_id=None,
        application_date=str(date.today()),
        status="Applied",
        interview_status="Pending",
        remarks=None
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return {
        "message": "Job application submitted successfully",
        "application_id": application.application_id,
        "job_id": job_id,
        "student_id": student.student_id,
        "status": application.status
    }

