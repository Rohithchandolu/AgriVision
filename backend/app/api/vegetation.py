"""Vegetation Indices API endpoints."""
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.api.deps import get_current_user
from app.models.models import User, VegetationIndex
from app.services.vegetation_service import (
    record_vegetation_index, get_latest_vegetation_index,
    get_vegetation_history, compare_historical_vegetation
)

router = APIRouter(tags=["Vegetation"])


@router.post("/vegetation/calculate", response_model=dict)
def calculate_vegetation(data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Record and calculate vegetation indices for a field."""
    try:
        vi = record_vegetation_index(db, data)
        return {
            "field_id": vi.field_id,
            "ndvi": vi.ndvi,
            "ndwi": vi.ndwi,
            "evi": vi.evi,
            "savi": vi.savi,
            "observation_date": vi.observation_date.isoformat() if vi.observation_date else None,
            "message": "Vegetation indices recorded successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/vegetation/{field_id}", response_model=dict)
def get_latest_vi(field_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    vi = get_latest_vegetation_index(db, field_id)
    if not vi:
        return {"field_id": field_id, "data": None, "message": "No vegetation data available"}
    return {
        "field_id": field_id,
        "ndvi": vi.ndvi,
        "ndwi": vi.ndwi,
        "evi": vi.evi,
        "savi": vi.savi,
        "observation_date": vi.observation_date.isoformat() if vi.observation_date else None,
    }


@router.get("/vegetation/{field_id}/history", response_model=List[dict])
def get_vi_history(field_id: int, limit: int = 30, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    history = get_vegetation_history(db, field_id, limit)
    return [
        {
            "date": vi.observation_date.isoformat() if vi.observation_date else None,
            "ndvi": vi.ndvi,
            "ndwi": vi.ndwi,
            "evi": vi.evi,
            "savi": vi.savi,
        }
        for vi in history
    ]
