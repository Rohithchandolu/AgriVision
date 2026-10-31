"""Users API endpoints."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.api.deps import get_current_user
from app.models.models import User, FarmerProfile
from app.services.auth_service import update_user_profile
from app.schemas.schemas import UserResponse, FarmerProfileCreate

router = APIRouter(tags=["Users"])


@router.get("/users/profile", response_model=dict)
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get the current user's profile."""
    profile = db.query(FarmerProfile).filter(FarmerProfile.user_id == current_user.id).first()
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "is_active": current_user.is_active,
        "created_at": current_user.created_at.isoformat() if current_user.created_at else None,
        "profile": {
            "farm_name": profile.farm_name if profile else None,
            "location": profile.location if profile else None,
            "total_area_hectares": profile.total_area_hectares if profile else None,
            "primary_crops": profile.primary_crops if profile else [],
            "subscription_tier": profile.subscription_tier if profile else "free",
        } if profile else None
    }


@router.put("/users/profile", response_model=dict)
def update_profile(
    profile_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update the current user's profile."""
    try:
        updated = update_user_profile(db, current_user.id, profile_data)
        return {"success": True, "message": "Profile updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
