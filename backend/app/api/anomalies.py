"""Anomalies API endpoints."""
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.api.deps import get_current_user
from app.models.models import User, AnomalyDetection
from app.services.anomaly_service import detect_and_record_anomaly, get_active_anomalies

router = APIRouter(tags=["Anomalies"])


@router.post("/anomalies/detect", response_model=dict)
def detect_anomaly(data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        anomaly = detect_and_record_anomaly(db, data)
        return {
            "id": anomaly.id,
            "field_id": anomaly.field_id,
            "anomaly_type": anomaly.anomaly_type,
            "severity": anomaly.severity,
            "description": anomaly.description,
            "detected_at": anomaly.detected_at.isoformat() if anomaly.detected_at else None,
            "message": "Anomaly detection completed"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/anomalies", response_model=List[dict])
def list_anomalies(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    anomalies = get_active_anomalies(db, current_user.id)
    return [
        {
            "id": a.id,
            "field_id": a.field_id,
            "anomaly_type": a.anomaly_type,
            "severity": a.severity,
            "description": a.description,
            "is_resolved": a.is_resolved,
            "detected_at": a.detected_at.isoformat() if a.detected_at else None,
        }
        for a in anomalies
    ]


@router.get("/anomalies/{anomaly_id}", response_model=dict)
def get_anomaly(anomaly_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    anomaly = db.query(AnomalyDetection).filter(AnomalyDetection.id == anomaly_id).first()
    if not anomaly:
        raise HTTPException(status_code=404, detail="Anomaly not found")
    return {
        "id": anomaly.id,
        "field_id": anomaly.field_id,
        "anomaly_type": anomaly.anomaly_type,
        "severity": anomaly.severity,
        "description": anomaly.description,
        "is_resolved": anomaly.is_resolved,
        "detected_at": anomaly.detected_at.isoformat() if anomaly.detected_at else None,
    }


@router.put("/anomalies/{anomaly_id}/resolve", response_model=dict)
def resolve_anomaly(anomaly_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    anomaly = db.query(AnomalyDetection).filter(AnomalyDetection.id == anomaly_id).first()
    if not anomaly:
        raise HTTPException(status_code=404, detail="Anomaly not found")
    anomaly.is_resolved = True
    db.commit()
    return {"message": "Anomaly marked as resolved"}
