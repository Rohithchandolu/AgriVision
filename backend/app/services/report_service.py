import os
import datetime
from sqlalchemy.orm import Session
from app.models.models import GeneratedReport, User
from app.reports.pdf_generator import generate_farm_health_pdf
from app.config import settings
from typing import List, Optional, Dict, Any

def create_and_store_report(
    db: Session,
    user: User,
    farm_data: Dict[str, Any],
    report_type: str = "Farm_Health_Audit"
) -> GeneratedReport:
    report_id = f"REP-{datetime.datetime.utcnow().strftime('%Y%m%d')}-{abs(hash(user.email + str(datetime.datetime.utcnow()))) % 1000:03d}"
    file_name = f"{report_id}.pdf"
    file_path = os.path.join(settings.REPORTS_DIR, file_name)

    generate_farm_health_pdf(report_id, farm_data, file_path)

    size = os.path.getsize(file_path) if os.path.exists(file_path) else 0

    record = GeneratedReport(
        id=report_id,
        user_id=user.id,
        title=f"AgriSat Planetary Health Audit - {farm_data.get('farmName', 'Farm')}",
        report_type=report_type,
        file_path=file_path,
        file_size_bytes=size,
        summary_text=f"ISO-14064 Ag-Data Verified report generated for {user.full_name} ({farm_data.get('totalAreaHa', 1420)} Ha)."
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

def get_user_reports(db: Session, user: User) -> List[GeneratedReport]:
    return (
        db.query(GeneratedReport)
        .filter(GeneratedReport.user_id == user.id)
        .order_by(GeneratedReport.created_at.desc())
        .all()
    )

def get_report_by_id(db: Session, user: User, report_id: str) -> Optional[GeneratedReport]:
    return (
        db.query(GeneratedReport)
        .filter(GeneratedReport.id == report_id, GeneratedReport.user_id == user.id)
        .first()
    )

