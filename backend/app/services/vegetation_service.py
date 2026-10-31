import datetime
from sqlalchemy.orm import Session
from app.models.models import VegetationIndex, Field
from app.geospatial.raster_math import calculate_single_pixel_indices
from typing import List, Dict, Any, Optional

def record_vegetation_index(
    db: Session,
    field_id: str,
    nir: float,
    red: float,
    swir: float = 0.20,
    blue: float = 0.05,
    observation_date: Optional[datetime.datetime] = None
) -> VegetationIndex:
    indices = calculate_single_pixel_indices(nir=nir, red=red, swir=swir, blue=blue)
    obs_date = observation_date or datetime.datetime.utcnow()

    veg_idx = VegetationIndex(
        field_id=field_id,
        observation_date=obs_date,
        ndvi_mean=indices["ndvi"],
        ndvi_min=round(indices["ndvi"] * 0.95, 3),
        ndvi_max=round(indices["ndvi"] * 1.05, 3),
        ndvi_std=0.04,
        ndwi_mean=indices["ndwi"],
        evi_mean=indices["evi"],
        savi_mean=indices["savi"],
        chlorophyll_index=round(indices["ndvi"] * 1.15, 3),
        source_constellation="Sentinel-2B"
    )
    db.add(veg_idx)
    db.commit()
    db.refresh(veg_idx)
    return veg_idx

def get_field_vegetation_history(db: Session, field_id: str, limit: int = 30) -> List[VegetationIndex]:
    return (
        db.query(VegetationIndex)
        .filter(VegetationIndex.field_id == field_id)
        .order_by(VegetationIndex.observation_date.asc())
        .limit(limit)
        .all()
    )

def compare_historical_vegetation(db: Session, field_id: str) -> Dict[str, Any]:
    history = get_field_vegetation_history(db, field_id, limit=2)
    if len(history) < 2:
        current = history[0] if history else None
        return {
            "field_id": field_id,
            "has_comparison": False,
            "current_ndvi": current.ndvi_mean if current else 0.0,
            "previous_ndvi": None,
            "delta_ndvi": 0.0,
            "trend": "Stable (Single observation)"
        }

    prev, curr = history[-2], history[-1]
    delta = round(curr.ndvi_mean - prev.ndvi_mean, 4)
    pct_change = round((delta / (prev.ndvi_mean + 1e-5)) * 100, 2)

    if delta < -0.10:
        trend = f"Significant Decline ({pct_change}%) - Stress Alert"
    elif delta < -0.03:
        trend = f"Moderate Decline ({pct_change}%)"
    elif delta > 0.05:
        trend = f"Vigorous Improvement (+{pct_change}%)"
    else:
        trend = f"Stable Baseline ({pct_change}%)"

    return {
        "field_id": field_id,
        "has_comparison": True,
        "current_ndvi": curr.ndvi_mean,
        "previous_ndvi": prev.ndvi_mean,
        "current_ndwi": curr.ndwi_mean,
        "previous_ndwi": prev.ndwi_mean,
        "delta_ndvi": delta,
        "pct_change": pct_change,
        "trend": trend,
        "current_date": curr.observation_date.isoformat(),
        "previous_date": prev.observation_date.isoformat()
    }

