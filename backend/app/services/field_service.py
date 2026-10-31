from sqlalchemy.orm import Session
from app.models.models import Farm, Field, FieldBoundary, User
from app.schemas.schemas import FarmCreate, FieldCreate, FieldUpdate
from app.geospatial.boundary_processor import calculate_geodesic_area_ha, validate_polygon_geometry
from typing import List, Optional, Dict, Any

def create_farm(db: Session, user: User, farm_in: FarmCreate) -> Farm:
    farm = Farm(
        owner_id=user.id,
        name=farm_in.name,
        location_desc=farm_in.location_desc,
        total_area_ha=farm_in.total_area_ha or 0.0,
        center_lat=farm_in.center_lat,
        center_lon=farm_in.center_lon
    )
    db.add(farm)
    db.commit()
    db.refresh(farm)
    return farm

def get_user_farms(db: Session, user: User) -> List[Farm]:
    return db.query(Farm).filter(Farm.owner_id == user.id).all()

def create_field(db: Session, user: User, field_in: FieldCreate) -> Field:
    # Ensure user owns the farm
    farm = db.query(Farm).filter(Farm.id == field_in.farm_id, Farm.owner_id == user.id).first()
    if not farm:
        # Create a default farm if none exists for this user
        farm = Farm(
            owner_id=user.id,
            name=f"{user.full_name}'s Operation",
            location_desc="Agricultural Basin"
        )
        db.add(farm)
        db.commit()
        db.refresh(farm)

    calculated_area = field_in.area_ha
    sanitized_geom = None

    if field_in.boundary_geojson:
        valid, msg, sanitized_geom = validate_polygon_geometry(field_in.boundary_geojson)
        if valid and sanitized_geom:
            calculated_area = calculate_geodesic_area_ha(sanitized_geom)

    field = Field(
        id=field_in.id,
        farm_id=farm.id,
        name=field_in.name,
        crop_type=field_in.crop_type,
        area_ha=calculated_area,
        soil_type=field_in.soil_type,
        irrigation_system=field_in.irrigation_system,
        center_lat=field_in.center_lat,
        center_lon=field_in.center_lon
    )
    db.add(field)
    db.commit()

    if sanitized_geom:
        boundary = FieldBoundary(
            field_id=field.id,
            geojson_geometry=sanitized_geom,
            crs="EPSG:4326",
            calculated_area_ha=calculated_area
        )
        db.add(boundary)
        db.commit()

    db.refresh(field)
    return field

def get_fields_for_user(db: Session, user: User) -> List[Field]:
    user_farm_ids = [f.id for f in db.query(Farm.id).filter(Farm.owner_id == user.id).all()]
    if not user_farm_ids:
        return []
    return db.query(Field).filter(Field.farm_id.in_(user_farm_ids)).all()

def get_field_by_id(db: Session, user: User, field_id: str) -> Optional[Field]:
    user_farm_ids = [f.id for f in db.query(Farm.id).filter(Farm.owner_id == user.id).all()]
    return db.query(Field).filter(Field.id == field_id, Field.farm_id.in_(user_farm_ids)).first()

def get_all_fields_geojson(db: Session, user: User) -> Dict[str, Any]:
    fields = get_fields_for_user(db, user)
    features = []

    for f in fields:
        geom = f.boundary.geojson_geometry if f.boundary else None
        if not geom and f.center_lat and f.center_lon:
            # Fallback point or small box if no explicit polygon
            geom = {
                "type": "Point",
                "coordinates": [f.center_lon, f.center_lat]
            }

        if geom:
            features.append({
                "type": "Feature",
                "properties": {
                    "id": f.id,
                    "name": f.name,
                    "crop": f.crop_type,
                    "area_ha": f.area_ha,
                    "status": f.current_status,
                    "risk_level": f.risk_level
                },
                "geometry": geom
            })

    return {
        "type": "FeatureCollection",
        "features": features
    }

