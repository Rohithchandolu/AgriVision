"""Historical data API endpoints."""
from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.api.deps import get_current_user
from app.models.models import User, VegetationIndex, WeatherObservation
from app.services.vegetation_service import get_vegetation_history, compare_historical_vegetation

router = APIRouter(tags=["Historical"])


@router.get("/historical/{field_id}", response_model=dict)
def get_field_history(
    field_id: int,
    limit: int = 90,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get combined vegetation and weather history for a field."""
    vi_history = get_vegetation_history(db, field_id, limit)
    weather = db.query(WeatherObservation).filter(
        WeatherObservation.field_id == field_id
    ).order_by(WeatherObservation.observation_date.desc()).limit(limit).all()

    return {
        "field_id": field_id,
        "vegetation": [
            {
                "date": vi.observation_date.isoformat() if vi.observation_date else None,
                "ndvi": vi.ndvi,
                "ndwi": vi.ndwi,
                "evi": vi.evi,
                "savi": vi.savi,
            }
            for vi in vi_history
        ],
        "weather": [
            {
                "date": obs.observation_date.isoformat() if obs.observation_date else None,
                "temperature_c": obs.temperature_c,
                "rainfall_mm": obs.rainfall_mm,
                "humidity_pct": obs.humidity_pct,
            }
            for obs in weather
        ]
    }


@router.get("/historical/compare", response_model=dict)
def compare_fields_history(
    field_ids: str = Query(..., description="Comma-separated field IDs"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Compare historical vegetation data across multiple fields."""
    ids = [int(x.strip()) for x in field_ids.split(",") if x.strip().isdigit()]
    result = compare_historical_vegetation(db, ids)
    return result
