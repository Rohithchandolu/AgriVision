"""Crop Health API endpoints."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.api.deps import get_current_user
from app.models.models import User
from app.services.crop_health_service import predict_and_store_crop_health, get_latest_field_health

router = APIRouter(tags=["Crop Health"])


@router.post("/crop-health/predict", response_model=dict)
def predict_crop_health(data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Run crop health prediction for a field."""
    try:
        prediction = predict_and_store_crop_health(db, data)
        return {
            "field_id": prediction.field_id,
            "health_status": prediction.health_status,
            "health_score": prediction.health_score,
            "confidence": prediction.confidence,
            "risk_factors": prediction.risk_factors,
            "prediction_date": prediction.prediction_date.isoformat() if prediction.prediction_date else None,
            "message": "Crop health prediction completed"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/crop-health/{field_id}", response_model=dict)
def get_field_health(field_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get the latest crop health prediction for a field."""
    prediction = get_latest_field_health(db, field_id)
    if not prediction:
        return {"field_id": field_id, "data": None, "message": "No health prediction available"}
    return {
        "field_id": field_id,
        "health_status": prediction.health_status,
        "health_score": prediction.health_score,
        "confidence": prediction.confidence,
        "risk_factors": prediction.risk_factors,
        "prediction_date": prediction.prediction_date.isoformat() if prediction.prediction_date else None,
    }
