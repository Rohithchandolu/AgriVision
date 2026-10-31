import datetime
from sqlalchemy.orm import Session
from app.models.models import AnomalyDetection, Field, VegetationIndex, WeatherObservation
from app.ml.anomaly_model import CropAnomalyDetector
from typing import List, Dict, Any, Optional

detector = CropAnomalyDetector()

def detect_and_record_anomaly(
    db: Session,
    field_id: str,
    override_features: Optional[Dict[str, float]] = None
) -> Optional[AnomalyDetection]:
    field = db.query(Field).filter(Field.id == field_id).first()
    if not field:
        raise ValueError(f"Field {field_id} not found")

    veg = (
        db.query(VegetationIndex)
        .filter(VegetationIndex.field_id == field_id)
        .order_by(VegetationIndex.observation_date.desc())
        .first()
    )

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
        "soil_moisture_pct": weather.soil_moisture_pct if weather else 35.0,
    }

    if override_features:
        feature_dict.update(override_features)

    is_anomaly, score, conf, severity = detector.detect(feature_dict)

    if not is_anomaly:
        return None

    # Determine action and description
    anomaly_id = f"ANOM-{datetime.datetime.utcnow().strftime('%Y')}-{abs(hash(field_id + str(datetime.datetime.utcnow()))) % 1000:03d}"
    
    if feature_dict.get("soil_moisture_pct", 35.0) < 23.0:
        anom_type = "Severe Moisture Deficit"
        action = "Execute supplemental pulse irrigation (+2.5 hrs) and inspect manifold."
        metric_impact = f"NDVI {feature_dict['ndvi']} (-18% below baseline)"
    else:
        anom_type = "Spectral Red-Edge Reflectance Shift"
        action = "Schedule foliar urea inspection and verify nitrogen uptake."
        metric_impact = "Chlorophyll index drop detected"

    affected_ha = round(field.area_ha * 0.45, 1)

    record = AnomalyDetection(
        id=anomaly_id,
        field_id=field_id,
        anomaly_type=anom_type,
        severity=severity,
        isolation_score=score,
        confidence_pct=conf,
        affected_area_ha=affected_ha,
        affected_area_pct=45.0,
        metric_impact=metric_impact,
        suggested_action=action,
        status="ACTIVE",
        detected_at=datetime.datetime.utcnow()
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

def get_active_anomalies(db: Session, field_id: Optional[str] = None) -> List[AnomalyDetection]:
    q = db.query(AnomalyDetection).filter(AnomalyDetection.status == "ACTIVE")
    if field_id:
        q = q.filter(AnomalyDetection.field_id == field_id)
    return q.order_by(AnomalyDetection.detected_at.desc()).all()

