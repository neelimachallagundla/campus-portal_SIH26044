from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import datetime

from database import SessionLocal
from models import (
    User,
    Student,
    Course,
    Module,
    Enrollment,
    Lesson,
    LessonProgress
)
from security import verify_access_token

router = APIRouter(
    prefix="/api",
    tags=["Enrollment & Progress"]
)

security = HTTPBearer()

class ProgressCreate(BaseModel):
    lesson_id: int
    completed: bool = False


class ProgressUpdate(BaseModel):
    completed: bool


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_student(
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
            detail="Only students can access this feature"
        )

    student = db.query(Student).filter(
        Student.email == user.email
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found"
        )

    return student


# ---------------------------------------------------------
# GET student's overall progress
# GET /api/progress/me
# ---------------------------------------------------------

@router.get("/progress/me")
def get_progress_me(
    student: Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    progress_records = db.query(LessonProgress).filter(
        LessonProgress.student_id == student.student_id
    ).all()

    total = len(progress_records)

    completed = sum(
        1 for record in progress_records
        if record.completed
    )

    return {
        "student_id": student.student_id,
        "total_lessons_tracked": total,
        "completed_lessons": completed
    }


# ---------------------------------------------------------
# GET student's progress for a course
# GET /api/progress/me/{course_id}
# ---------------------------------------------------------

@router.get("/progress/me/{course_id}")
def get_progress_me_course(
    course_id: int,
    student: Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(
        Course.course_id == course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    enrollment = db.query(Enrollment).filter(
        Enrollment.student_id == student.student_id,
        Enrollment.course_id == course_id
    ).first()

    if not enrollment:
        raise HTTPException(
            status_code=400,
            detail="Student is not enrolled in this course"
        )

    lessons = (
        db.query(Lesson)
        .join(
            Module,
            Lesson.module_id == Module.module_id
        )
        .filter(
            Module.course_id == course_id
        )
        .all()
    )

    total_lessons = len(lessons)

    lesson_ids = [
        lesson.lesson_id
        for lesson in lessons
    ]

    completed_lessons = 0

    if lesson_ids:
        completed_lessons = db.query(LessonProgress).filter(
            LessonProgress.student_id == student.student_id,
            LessonProgress.lesson_id.in_(lesson_ids),
            LessonProgress.completed.is_(True)
        ).count()

    progress_percentage = 0

    if total_lessons > 0:
        progress_percentage = round(
            (completed_lessons / total_lessons) * 100,
            2
        )

    return {
        "student_id": student.student_id,
        "course_id": course_id,
        "course_title": course.title,
        "total_lessons": total_lessons,
        "completed_lessons": completed_lessons,
        "progress_percentage": progress_percentage
    }


# ---------------------------------------------------------
# CREATE progress
# POST /api/progress
# ---------------------------------------------------------

@router.post("/progress")
def create_progress(
    data: ProgressCreate,
    student: Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    lesson = db.query(Lesson).filter(
        Lesson.lesson_id == data.lesson_id
    ).first()

    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Lesson not found"
        )

    existing = db.query(LessonProgress).filter(
        LessonProgress.student_id == student.student_id,
        LessonProgress.lesson_id == data.lesson_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Progress record already exists for this lesson"
        )

    progress = LessonProgress(
        student_id=student.student_id,
        lesson_id=data.lesson_id,
        completed=data.completed,
        completed_at=datetime.utcnow() if data.completed else None
    )

    db.add(progress)
    db.commit()
    db.refresh(progress)

    return {
        "progress_id": progress.progress_id,
        "student_id": progress.student_id,
        "lesson_id": progress.lesson_id,
        "completed": progress.completed,
        "completed_at": progress.completed_at
    }


# ---------------------------------------------------------
# UPDATE progress
# PUT /api/progress/{progress_id}
# ---------------------------------------------------------

@router.put("/progress/{progress_id}")
def update_progress(
    progress_id: int,
    data: ProgressUpdate,
    student: Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    progress = db.query(LessonProgress).filter(
        LessonProgress.progress_id == progress_id,
        LessonProgress.student_id == student.student_id
    ).first()

    if not progress:
        raise HTTPException(
            status_code=404,
            detail="Progress record not found"
        )

    progress.completed = data.completed

    if data.completed:
        progress.completed_at = datetime.utcnow()
    else:
        progress.completed_at = None

    db.commit()
    db.refresh(progress)

    return {
        "progress_id": progress.progress_id,
        "student_id": progress.student_id,
        "lesson_id": progress.lesson_id,
        "completed": progress.completed,
        "completed_at": progress.completed_at
    }


# ---------------------------------------------------------
# COMPLETE LESSON
# POST /api/progress/lesson/{lesson_id}/complete
# ---------------------------------------------------------

@router.post("/progress/lesson/{lesson_id}/complete")
def complete_progress_lesson(
    lesson_id: int,
    student: Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    lesson = db.query(Lesson).filter(
        Lesson.lesson_id == lesson_id
    ).first()

    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Lesson not found"
        )

    progress = db.query(LessonProgress).filter(
        LessonProgress.student_id == student.student_id,
        LessonProgress.lesson_id == lesson_id
    ).first()

    if progress:
        progress.completed = True
        progress.completed_at = datetime.utcnow()
    else:
        progress = LessonProgress(
            student_id=student.student_id,
            lesson_id=lesson_id,
            completed=True,
            completed_at=datetime.utcnow()
        )
        db.add(progress)

    db.commit()
    db.refresh(progress)

    return {
        "message": "Lesson marked as completed",
        "progress_id": progress.progress_id,
        "student_id": student.student_id,
        "lesson_id": lesson_id,
        "completed": True,
        "completed_at": progress.completed_at
    }


# ---------------------------------------------------------
# 1. Enroll in a course
# POST /api/courses/{course_id}/enroll
# ---------------------------------------------------------

@router.post("/courses/{course_id}/enroll")
def enroll_in_course(
    course_id: int,
    student: Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(
        Course.course_id == course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    existing = db.query(Enrollment).filter(
        Enrollment.student_id == student.student_id,
        Enrollment.course_id == course_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Already enrolled in this course"
        )

    enrollment = Enrollment(
        student_id=student.student_id,
        course_id=course_id,
        enrolled_at=datetime.utcnow()
    )

    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)

    return {
        "message": "Successfully enrolled in course",
        "enrollment_id": enrollment.enrollment_id,
        "student_id": student.student_id,
        "course_id": course_id
    }


# ---------------------------------------------------------
# 2. Get student's enrolled courses
# GET /api/students/me/courses
# ---------------------------------------------------------

@router.get("/students/me/courses")
def get_my_courses(
    student: Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    enrollments = db.query(Enrollment).filter(
        Enrollment.student_id == student.student_id
    ).all()

    result = []

    for enrollment in enrollments:
        course = db.query(Course).filter(
            Course.course_id == enrollment.course_id
        ).first()

        if course:
            result.append({
                "enrollment_id": enrollment.enrollment_id,
                "course_id": course.course_id,
                "title": course.title,
                "description": course.description,
                "enrolled_at": enrollment.enrolled_at
            })

    return result


# ---------------------------------------------------------
# 3. Mark lesson as completed
# POST /api/lessons/{lesson_id}/complete
# ---------------------------------------------------------

@router.post("/lessons/{lesson_id}/complete")
def complete_lesson(
    lesson_id: int,
    student: Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    lesson = db.query(Lesson).filter(
        Lesson.lesson_id == lesson_id
    ).first()

    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Lesson not found"
        )

    progress = db.query(LessonProgress).filter(
        LessonProgress.student_id == student.student_id,
        LessonProgress.lesson_id == lesson_id
    ).first()

    if progress:
        progress.completed = True
        progress.completed_at = datetime.utcnow()
    else:
        progress = LessonProgress(
            student_id=student.student_id,
            lesson_id=lesson_id,
            completed=True,
            completed_at=datetime.utcnow()
        )
        db.add(progress)

    db.commit()
    db.refresh(progress)

    return {
        "message": "Lesson marked as completed",
        "lesson_id": lesson_id,
        "completed": True,
        "completed_at": progress.completed_at
    }


# ---------------------------------------------------------
# 4. Get student's overall progress
# GET /api/students/me/progress
# ---------------------------------------------------------

@router.get("/students/me/progress")
def get_my_progress(
    student: Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    progress_records = db.query(LessonProgress).filter(
        LessonProgress.student_id == student.student_id
    ).all()

    total = len(progress_records)
    completed = sum(
        1 for record in progress_records
        if record.completed
    )

    return {
        "student_id": student.student_id,
        "total_lessons_tracked": total,
        "completed_lessons": completed
    }


# ---------------------------------------------------------
# 5. Get progress for a specific course
# GET /api/students/me/courses/{course_id}/progress
# ---------------------------------------------------------

@router.get("/students/me/courses/{course_id}/progress")
def get_course_progress(
    course_id: int,
    student: Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(
        Course.course_id == course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    enrollment = db.query(Enrollment).filter(
        Enrollment.student_id == student.student_id,
        Enrollment.course_id == course_id
    ).first()

    if not enrollment:
        raise HTTPException(
            status_code=400,
            detail="Student is not enrolled in this course"
        )

    lessons = (
    db.query(Lesson)
    .join(
        Module,
        Lesson.module_id == Module.module_id
    )
    .filter(
        Module.course_id == course_id
    )
    .all()
)

    total_lessons = len(lessons)

    lesson_ids = [lesson.lesson_id for lesson in lessons]

    completed_lessons = 0

    if lesson_ids:
        completed_lessons = db.query(LessonProgress).filter(
            LessonProgress.student_id == student.student_id,
            LessonProgress.lesson_id.in_(lesson_ids),
            LessonProgress.completed == True
        ).count()

    percentage = 0

    if total_lessons > 0:
        percentage = round(
            (completed_lessons / total_lessons) * 100,
            2
        )

    return {
        "student_id": student.student_id,
        "course_id": course_id,
        "course_title": course.title,
        "total_lessons": total_lessons,
        "completed_lessons": completed_lessons,
        "progress_percentage": percentage
    }