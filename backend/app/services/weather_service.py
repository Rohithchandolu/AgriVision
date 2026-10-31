import datetime
from sqlalchemy.orm import Session
from app.models.models import WeatherObservation, Field
from app.ml.weather_risk_model import WeatherRiskModel
from typing import List, Dict, Any, Optional

risk_model = WeatherRiskModel()

def record_weather_observation(
    db: Session,
    field_id: str,
    temp_c: float,
    humidity: float,
    rainfall: float,
    soil_moisture: float,
    et: float = 4.2,
    source: str = "IoT_Sensor_Mesh"
) -> WeatherObservation:
    obs = WeatherObservation(
        field_id=field_id,
        observation_date=datetime.datetime.utcnow(),
        temperature_c=temp_c,
        humidity_pct=humidity,
        rainfall_mm=rainfall,
        soil_moisture_pct=soil_moisture,
        et_mm_day=et,
        source=source
    )
    db.add(obs)
    db.commit()
    db.refresh(obs)
    return obs

def get_field_weather_history(db: Session, field_id: str, limit: int = 30) -> List[WeatherObservation]:
    return (
        db.query(WeatherObservation)
        .filter(WeatherObservation.field_id == field_id)
        .order_by(WeatherObservation.observation_date.asc())
        .limit(limit)
        .all()
    )

def evaluate_field_weather_risk(db: Session, field_id: str) -> Dict[str, Any]:
    field = db.query(Field).filter(Field.id == field_id).first()
    crop_type = field.crop_type if field else "Almonds"

    latest = (
        db.query(WeatherObservation)
        .filter(WeatherObservation.field_id == field_id)
        .order_by(WeatherObservation.observation_date.desc())
        .first()
    )

    weather_data = {
        "temperature_c": latest.temperature_c if latest else 24.5,
        "humidity_pct": latest.humidity_pct if latest else 48.0,
        "rainfall_mm": latest.rainfall_mm if latest else 0.0,
        "soil_moisture_pct": latest.soil_moisture_pct if latest else 34.8,
        "et_mm_day": latest.et_mm_day if latest else 4.2
    }

    risk_eval = risk_model.evaluate_risk(weather_data, crop_type=crop_type)
    risk_eval["field_id"] = field_id
    return risk_eval

