import datetime
from sqlalchemy.orm import Session
from app.models.models import CropHealthPrediction, Field, VegetationIndex, WeatherObservation
from app.ml.crop_health_model import CropHealthClassifier
from typing import Dict, Any, Optional

classifier = CropHealthClassifier()

def predict_and_store_crop_health(
    db: Session,
    field_id: str,
    override_features: Optional[Dict[str, float]] = None
) -> CropHealthPrediction:
    field = db.query(Field).filter(Field.id == field_id).first()
    if not field:
        raise ValueError(f"Field {field_id} not found")

    # Fetch latest vegetation index
    veg = (
        db.query(VegetationIndex)
        .filter(VegetationIndex.field_id == field_id)
        .order_by(VegetationIndex.observation_date.desc())
        .first()
    )

    # Fetch latest weather
    weather = (
        db.query(WeatherObservation)
        .filter(WeatherObservation.field_id == field_id)
        .order_by(WeatherObservation.observation_date.desc())
        .first()
    )

    feature_dict = {
        "ndvi": veg.ndvi_mean if veg else 0.78,
        "ndwi": veg.ndwi_mean if veg else 0.40,
        "evi": veg.evi_mean if veg else 0.72,
        "temperature_c": weather.temperature_c if weather else 24.5,
        "humidity_pct": weather.humidity_pct if weather else 50.0,
        "rainfall_mm": weather.rainfall_mm if weather else 0.0,
        "soil_moisture_pct": weather.soil_moisture_pct if weather else 35.0,
    }

    if override_features:
        feature_dict.update(override_features)

    status, conf, contributions = classifier.predict(feature_dict)

    # Update field's current status and risk level
    field.current_status = f"{status} Condition"
    if status == "Stressed":
        field.risk_level = "Critical"
    elif status == "Moderate":
        field.risk_level = "Moderate"
    else:
        field.risk_level = "Low"

    pred = CropHealthPrediction(
        field_id=field_id,
        prediction_date=datetime.datetime.utcnow(),
        health_status=status,
        confidence_score=conf,
        model_version="v1.0-RF",
        feature_contributions=contributions
    )
    db.add(pred)
    db.commit()
    db.refresh(pred)
    return pred

def get_latest_field_health(db: Session, field_id: str) -> Optional[CropHealthPrediction]:
    return (
        db.query(CropHealthPrediction)
        .filter(CropHealthPrediction.field_id == field_id)
        .order_by(CropHealthPrediction.prediction_date.desc())
        .first()
    )

