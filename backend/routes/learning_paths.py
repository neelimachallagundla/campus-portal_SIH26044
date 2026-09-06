from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import LearningPath

router = APIRouter(
    prefix="/api/learning-paths",
    tags=["Learning Paths"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Get all learning paths
@router.get("/")
def get_learning_paths(db: Session = Depends(get_db)):
    return db.query(LearningPath).all()


# Get one learning path
@router.get("/{path_id}")
def get_learning_path(path_id: int, db: Session = Depends(get_db)):
    path = db.query(LearningPath).filter(
        LearningPath.path_id == path_id
    ).first()

    if not path:
        raise HTTPException(
            status_code=404,
            detail="Learning path not found"
        )

    return path