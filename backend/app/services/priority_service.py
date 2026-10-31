from sqlalchemy.orm import Session
from app.models.models import Field, VegetationIndex, AnomalyDetection, WeatherObservation, FieldPriorityScore, User
from app.services.field_service import get_fields_for_user
from typing import List, Dict, Any

def compute_smart_field_priority_rankings(db: Session, user: User) -> List[Dict[str, Any]]:
    fields = get_fields_for_user(db, user)
    rankings = []

    for f in fields:
        composite_score = 0.0
        reasons = []

        # 1. Vegetation Index Factor
        veg = (
            db.query(VegetationIndex)
            .filter(VegetationIndex.field_id == f.id)
            .order_by(VegetationIndex.observation_date.desc())
            .first()
        )
        ndvi = veg.ndvi_mean if veg else 0.75
        if ndvi < 0.60:
            composite_score += 40.0
            reasons.append(f"Acute NDVI drop to {ndvi} (Critical Canopy Loss)")
        elif ndvi < 0.72:
            composite_score += 20.0
            reasons.append(f"Sub-optimal NDVI at {ndvi}")

        # 2. Active Anomalies Factor
        active_anom = (
            db.query(AnomalyDetection)
            .filter(AnomalyDetection.field_id == f.id, AnomalyDetection.status == "ACTIVE")
            .first()
        )
        if active_anom:
            if active_anom.severity == "CRITICAL":
                composite_score += 40.0
                reasons.append(f"Active Critical Anomaly: {active_anom.anomaly_type}")
            else:
                composite_score += 20.0
                reasons.append(f"Moderate Anomaly: {active_anom.anomaly_type}")

        # 3. Weather / Moisture Factor
        weather = (
            db.query(WeatherObservation)
            .filter(WeatherObservation.field_id == f.id)
            .order_by(WeatherObservation.observation_date.desc())
            .first()
        )
        moisture = weather.soil_moisture_pct if weather else 35.0
        if moisture < 24.0:
            composite_score += 20.0
            reasons.append(f"Soil root-zone moisture below wilting point ({moisture}%)")

        composite_score = min(100.0, composite_score)

        if composite_score >= 60.0:
            risk_cat = "High"
            action = f"Immediate field dispatch: execute urgent irrigation and inspect sub-laterals on {f.name}."
        elif composite_score >= 30.0:
            risk_cat = "Medium"
            action = f"Schedule soil core sampling and inspect foliar red-edge reflectance."
        else:
            risk_cat = "Low"
            action = "Maintain regular vegetative monitoring cadence."

        rankings.append({
            "field_id": f.id,
            "field_name": f.name,
            "crop": f.crop_type,
            "composite_score": round(composite_score, 1),
            "risk_category": risk_cat,
            "ranking_reasons": reasons if reasons else ["Optimal Photosynthetic Vigor"],
            "suggested_action": action
        })

    # Sort descending by composite score (highest risk = priority rank 1)
    rankings.sort(key=lambda x: x["composite_score"], reverse=True)
    for idx, r in enumerate(rankings):
        r["priority_rank"] = idx + 1

        # Update or create FieldPriorityScore in DB
        db_score = db.query(FieldPriorityScore).filter(FieldPriorityScore.field_id == r["field_id"]).first()
        if not db_score:
            db_score = FieldPriorityScore(field_id=r["field_id"], priority_rank=r["priority_rank"], risk_category=r["risk_category"], composite_score=r["composite_score"], ranking_reasons=r["ranking_reasons"], suggested_action=r["suggested_action"])
            db.add(db_score)
        else:
            db_score.priority_rank = r["priority_rank"]
            db_score.risk_category = r["risk_category"]
            db_score.composite_score = r["composite_score"]
            db_score.ranking_reasons = r["ranking_reasons"]
            db_score.suggested_action = r["suggested_action"]

    db.commit()
    return rankings

