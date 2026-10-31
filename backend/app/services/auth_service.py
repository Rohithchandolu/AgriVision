from sqlalchemy.orm import Session
from app.models.models import User, FarmerProfile
from app.schemas.schemas import UserRegister, UserProfileUpdate
from app.utils.security import get_password_hash, verify_password, create_access_token
from typing import Optional

def register_user(db: Session, reg_data: UserRegister) -> User:
    existing = db.query(User).filter(User.email == reg_data.email).first()
    if existing:
        raise ValueError("User with this email already exists")

    hashed_pw = get_password_hash(reg_data.password)
    user = User(
        email=reg_data.email,
        hashed_password=hashed_pw,
        full_name=reg_data.full_name,
        role=reg_data.role or "farmer"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    profile = FarmerProfile(
        user_id=user.id,
        phone=reg_data.phone,
        location=reg_data.location,
        state=reg_data.state,
        district=reg_data.district,
        enterprise_name=reg_data.enterprise_name,
        crop_preferences=reg_data.crop_preferences or ["Almonds", "Wheat", "Corn"]
    )
    db.add(profile)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def update_user_profile(db: Session, user: User, update_data: UserProfileUpdate) -> User:
    if update_data.full_name is not None:
        user.full_name = update_data.full_name

    profile = user.profile
    if not profile:
        profile = FarmerProfile(user_id=user.id)
        db.add(profile)

    if update_data.phone is not None:
        profile.phone = update_data.phone
    if update_data.location is not None:
        profile.location = update_data.location
    if update_data.state is not None:
        profile.state = update_data.state
    if update_data.district is not None:
        profile.district = update_data.district
    if update_data.preferred_language is not None:
        profile.preferred_language = update_data.preferred_language
    if update_data.enterprise_name is not None:
        profile.enterprise_name = update_data.enterprise_name
    if update_data.crop_preferences is not None:
        profile.crop_preferences = update_data.crop_preferences

    db.commit()
    db.refresh(user)
    return user

