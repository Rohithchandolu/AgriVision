"""Fields and Farms API endpoints."""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.api.deps import get_current_user
from app.models.models import User, Farm, Field
from app.services.field_service import (
    create_farm, get_user_farms, create_field,
    get_fields_for_user, get_field_by_id, get_fields_geojson
)

router = APIRouter(tags=["Fields"])


@router.post("/farms", response_model=dict)
def create_new_farm(farm_data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    farm = create_farm(db, current_user.id, farm_data)
    return {"id": farm.id, "name": farm.name, "location": farm.location, "message": "Farm created successfully"}


@router.get("/farms", response_model=List[dict])
def list_farms(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    farms = get_user_farms(db, current_user.id)
    return [{"id": f.id, "name": f.name, "location": f.location, "total_area_ha": f.total_area_ha, "created_at": f.created_at.isoformat() if f.created_at else None} for f in farms]


@router.post("/fields", response_model=dict)
def create_new_field(field_data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    field = create_field(db, current_user.id, field_data)
    return {"id": field.id, "name": field.name, "area_ha": field.area_ha, "crop_type": field.crop_type, "message": "Field created successfully"}


@router.get("/fields", response_model=List[dict])
def list_fields(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    fields = get_fields_for_user(db, current_user.id)
    return fields


@router.get("/fields/geojson")
def fields_geojson(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_fields_geojson(db, current_user.id)


@router.get("/fields/{field_id}", response_model=dict)
def get_field(field_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    field = get_field_by_id(db, field_id, current_user.id)
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")
    return field


@router.put("/fields/{field_id}", response_model=dict)
def update_field(field_id: int, field_data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    field = db.query(Field).filter(Field.id == field_id, Field.user_id == current_user.id).first()
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")
    for key, value in field_data.items():
        if hasattr(field, key):
            setattr(field, key, value)
    db.commit()
    db.refresh(field)
    return {"id": field.id, "name": field.name, "message": "Field updated successfully"}


@router.delete("/fields/{field_id}", response_model=dict)
def delete_field(field_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    field = db.query(Field).filter(Field.id == field_id, Field.user_id == current_user.id).first()
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")
    db.delete(field)
    db.commit()
    return {"message": "Field deleted successfully"}
