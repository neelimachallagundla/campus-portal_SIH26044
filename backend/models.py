from sqlalchemy import Column, Integer, BigInteger, String, Text, Date, DateTime, Boolean, ForeignKey, Float
from database import Base
from datetime import datetime


class Application(Base):
    __tablename__ = "applications"

    application_id = Column(BigInteger, primary_key=True)
    student_id = Column(BigInteger)
    internship_id = Column(BigInteger)
    job_id = Column(BigInteger, ForeignKey("jobs.job_id"), nullable=True)
    application_date = Column(Text)
    status = Column(Text)
    interview_status = Column(Text)
    remarks = Column(Text)


class College(Base):
    __tablename__ = "colleges"

    college_id = Column(BigInteger, primary_key=True)
    college_name = Column(Text)
    university_name = Column(Text)
    location = Column(Text)
    city = Column(Text)
    state = Column(Text)
    email = Column(Text)
    contact_no = Column(BigInteger)


class Company(Base):
    __tablename__ = "companies"

    company_id = Column(BigInteger, primary_key=True)
    company_name = Column(Text)
    industry = Column(Text)
    location = Column(Text)
    city = Column(Text)
    state = Column(Text)
    website = Column(Text)
    contact_email = Column(Text)


class IndustrySkill(Base):
    __tablename__ = "industry_skills"

    industry_skill_id = Column(BigInteger, primary_key=True)
    company_id = Column(BigInteger)
    skill_id = Column(BigInteger)
    required_level = Column(Text)
    is_mandatory = Column(Boolean)


class Internship(Base):
    __tablename__ = "internships"

    internship_id = Column(BigInteger, primary_key=True)
    company_id = Column(BigInteger)
    title = Column(Text)
    description = Column(Text)
    location = Column(Text)
    stipend = Column(BigInteger)
    start_date = Column(Text)
    end_date = Column(Text)


class Placement(Base):
    __tablename__ = "placements"

    placement_id = Column(BigInteger, primary_key=True)
    student_id = Column(BigInteger)
    company_id = Column(BigInteger)
    job_role = Column(Text)
    package_lpa = Column(Float)
    placement_date = Column(Text)
    status = Column(Text)


class RoleRequiredSkill(Base):
    __tablename__ = "role_required_skills"

    role_required_skill_id = Column(BigInteger, primary_key=True)
    role_id = Column(BigInteger)
    skill_id = Column(BigInteger)
    is_mandatory = Column(Boolean)


class Role(Base):
    __tablename__ = "roles"

    role_id = Column(BigInteger, primary_key=True)
    role_name = Column(Text)
    description = Column(Text)


class Skill(Base):
    __tablename__ = "skills"

    skill_id = Column(BigInteger, primary_key=True)
    skill_name = Column(Text)
    skill_category = Column(Text)
    description = Column(Text)
    status = Column(Text)


class StudentSkill(Base):
    __tablename__ = "student_skills"

    student_skill_id = Column(BigInteger, primary_key=True)
    student_id = Column(BigInteger)
    skill_id = Column(BigInteger)
    proficiency_level = Column(Text)
    experience_years = Column(Float)


class StudentTraining(Base):
    __tablename__ = "student_training"

    student_training_id = Column(BigInteger, primary_key=True)
    student_id = Column(BigInteger)
    training_id = Column(BigInteger)
    start_date = Column(Text)
    completion_status = Column(Text)


class Student(Base):
    __tablename__ = "students"

    student_id = Column(BigInteger, primary_key=True)
    college_id = Column(BigInteger)
    name = Column(Text)
    email = Column(Text)
    phone = Column(BigInteger)
    gender = Column(Text)
    dob = Column(Text)
    course = Column(Text)
    branch = Column(Text)
    cgpa = Column(Float)


class TrainingProgram(Base):
    __tablename__ = "training_programs"

    training_id = Column(BigInteger, primary_key=True)
    skill_id = Column(BigInteger)
    training_name = Column(Text)
    provider = Column(Text)
    duration = Column(Text)
    level = Column(Text)
    training_link = Column(Text)


class User(Base):
    __tablename__ = "users"

    user_id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(Text, nullable=False)
    email = Column(Text, unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    role = Column(Text, nullable=False)


# ============================================================
# LEARNING PATH / COURSE / LESSON MODELS
# ============================================================

class LearningPath(Base):
    __tablename__ = "learning_paths"

    path_id = Column(BigInteger, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)

class Course(Base):
    __tablename__ = "courses"

    course_id = Column(BigInteger, primary_key=True, autoincrement=True)
    path_id = Column(
        BigInteger,
        ForeignKey("learning_paths.path_id")
    )
    title = Column(String(255), nullable=False)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


class Module(Base):
    __tablename__ = "modules"

    module_id = Column(BigInteger, primary_key=True, autoincrement=True)
    course_id = Column(
        BigInteger,
        ForeignKey("courses.course_id"),
        nullable=False
    )
    title = Column(String(255), nullable=False)
    description = Column(Text)
    module_order = Column(BigInteger, default=1)


class Lesson(Base):
    __tablename__ = "lessons"

    lesson_id = Column(BigInteger, primary_key=True, autoincrement=True)
    module_id = Column(
        BigInteger,
        ForeignKey("modules.module_id"),
        nullable=False
    )
    title = Column(String(255), nullable=False)
    content = Column(Text)
    lesson_order = Column(BigInteger, default=1)


class Enrollment(Base):
    __tablename__ = "enrollments"

    enrollment_id = Column(BigInteger, primary_key=True, autoincrement=True)
    student_id = Column(
        BigInteger,
        ForeignKey("students.student_id"),
        nullable=False
    )
    course_id = Column(
        BigInteger,
        ForeignKey("courses.course_id"),
        nullable=False
    )
    enrolled_at = Column(DateTime, default=datetime.utcnow)


class LessonProgress(Base):
    __tablename__ = "lesson_progress"

    progress_id = Column(BigInteger, primary_key=True, autoincrement=True)
    student_id = Column(
        BigInteger,
        ForeignKey("students.student_id"),
        nullable=False
    )
    lesson_id = Column(
        BigInteger,
        ForeignKey("lessons.lesson_id"),
        nullable=False
    )
    completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, nullable=True)


class Job(Base):
    __tablename__ = "jobs"

    job_id = Column(BigInteger, primary_key=True, autoincrement=True)
    company_id = Column(BigInteger, ForeignKey("companies.company_id"), nullable=False)
    job_title = Column(String(255), nullable=False)
    description = Column(Text)
    location = Column(String(255))
    job_type = Column(String(100))
    salary = Column(String(100))
    required_skills = Column(Text)
    application_deadline = Column(Date)


