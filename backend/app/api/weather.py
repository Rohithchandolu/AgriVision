"""Weather API endpoints."""
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.api.deps import get_current_user
from app.models.models import User
from app.services.weather_service import (
    record_weather_observation, get_field_weather_history, evaluate_field_weather_risk
)

router = APIRouter(tags=["Weather"])


@router.post("/weather/upload", response_model=dict)
def upload_weather(data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        obs = record_weather_observation(db, data)
        return {
            "id": obs.id,
            "field_id": obs.field_id,
            "temperature_c": obs.temperature_c,
            "rainfall_mm": obs.rainfall_mm,
            "humidity_pct": obs.humidity_pct,
            "observation_date": obs.observation_date.isoformat() if obs.observation_date else None,
            "message": "Weather observation recorded"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/weather/{field_id}", response_model=List[dict])
def get_weather_history(field_id: int, limit: int = 30, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    history = get_field_weather_history(db, field_id, limit)
    return [
        {
            "date": obs.observation_date.isoformat() if obs.observation_date else None,
            "temperature_c": obs.temperature_c,
            "rainfall_mm": obs.rainfall_mm,
            "humidity_pct": obs.humidity_pct,
            "wind_speed_kmh": obs.wind_speed_kmh,
            "solar_radiation": obs.solar_radiation,
        }
        for obs in history
    ]


@router.get("/weather/risk/{field_id}", response_model=dict)
def get_weather_risk(field_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    risk = evaluate_field_weather_risk(db, field_id)
    return risk
