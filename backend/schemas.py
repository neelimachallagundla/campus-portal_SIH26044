from pydantic import BaseModel


class CompanyCreate(BaseModel):
    company_id: int
    company_name: str
    industry: str
    location: str
    city: str
    state: str
    website: str
    contact_email: str


class CollegeCreate(BaseModel):
    college_id: int
    college_name: str
    university_name: str
    location: str
    city: str
    state: str
    email: str
    contact_no: int


class StudentCreate(BaseModel):
    student_id: int
    college_id: int
    name: str
    email: str
    phone: int
    gender: str
    dob: str
    course: str
    branch: str
    cgpa: float


class RoleCreate(BaseModel):
    role_id: int
    role_name: str
    description: str


class SkillCreate(BaseModel):
    skill_id: int
    skill_name: str
    skill_category: str
    description: str
    status: str


class IndustrySkillCreate(BaseModel):
    industry_skill_id: int
    company_id: int
    skill_id: int
    required_level: str
    is_mandatory: bool


class InternshipCreate(BaseModel):
    internship_id: int
    company_id: int
    title: str
    description: str
    location: str
    stipend: int
    start_date: str
    end_date: str


class PlacementCreate(BaseModel):
    placement_id: int
    student_id: int
    company_id: int
    job_role: str
    package_lpa: float
    placement_date: str
    status: str


class RoleRequiredSkillCreate(BaseModel):
    role_required_skill_id: int
    role_id: int
    skill_id: int
    is_mandatory: bool


class StudentSkillCreate(BaseModel):
    student_skill_id: int
    student_id: int
    skill_id: int
    proficiency_level: str
    experience_years: float


class StudentTrainingCreate(BaseModel):
    student_training_id: int
    student_id: int
    training_id: int
    start_date: str
    completion_status: str


class TrainingProgramCreate(BaseModel):
    training_id: int
    skill_id: int
    training_name: str
    provider: str
    duration: str
    level: str
    training_link: str


class ApplicationCreate(BaseModel):
    application_id: int
    student_id: int
    internship_id: int
    application_date: str
    status: str
    interview_status: str
    remarks: str