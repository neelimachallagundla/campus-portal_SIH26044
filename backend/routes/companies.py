from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Company
from schemas import CompanyCreate


router = APIRouter(
    prefix="/companies",
    tags=["Companies"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET all companies
@router.get("/")
def get_companies(db: Session = Depends(get_db)):
    companies = db.query(Company).all()
    return companies


# GET one company
@router.get("/{company_id}")
def get_company(
    company_id: int,
    db: Session = Depends(get_db)
):
    company = db.query(Company).filter(
        Company.company_id == company_id
    ).first()

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    return company


# CREATE company
@router.post("/")
def create_company(
    company_data: CompanyCreate,
    db: Session = Depends(get_db)
):
    new_company = Company(
        company_name=company_data.company_name,
        industry=company_data.industry,
        location=company_data.location,
        city=company_data.city,
        state=company_data.state,
        website=company_data.website,
        contact_email=company_data.contact_email
    )

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return new_company


# UPDATE company
@router.put("/{company_id}")
def update_company(
    company_id: int,
    company_data: CompanyCreate,
    db: Session = Depends(get_db)
):
    company = db.query(Company).filter(
        Company.company_id == company_id
    ).first()

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    company.company_name = company_data.company_name
    company.industry = company_data.industry
    company.location = company_data.location
    company.city = company_data.city
    company.state = company_data.state
    company.website = company_data.website
    company.contact_email = company_data.contact_email

    db.commit()
    db.refresh(company)

    return company


# DELETE company
@router.delete("/{company_id}")
def delete_company(
    company_id: int,
    db: Session = Depends(get_db)
):
    company = db.query(Company).filter(
        Company.company_id == company_id
    ).first()

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    db.delete(company)
    db.commit()

    return {
        "message": "Company deleted successfully"
    }