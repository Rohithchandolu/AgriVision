import os
from typing import List
from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgriSat Precision Health Monitor"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    ENVIRONMENT: str = Field(default="development", env="ENVIRONMENT")
    DEBUG: bool = Field(default=True, env="DEBUG")
    HOST: str = Field(default="0.0.0.0", env="HOST")
    PORT: int = Field(default=8000, env="PORT")
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]
    
    # Database
    DATABASE_URL: str = Field(
        default="sqlite:///./agrisat.db",
        env="DATABASE_URL"
    )
    
    # JWT & Auth
    SECRET_KEY: str = Field(
        default="agrisat_super_secure_jwt_secret_key_production_grade_2026",
        env="SECRET_KEY"
    )
    ALGORITHM: str = Field(default="HS256", env="ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=1440, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    
    # Gemini
    GEMINI_API_KEY: str = Field(default="", env="GEMINI_API_KEY")
    GEMINI_MODEL: str = Field(default="gemini-2.5-flash", env="GEMINI_MODEL")
    
    # Kaggle
    KAGGLE_USERNAME: str = Field(default="", env="KAGGLE_USERNAME")
    KAGGLE_KEY: str = Field(default="", env="KAGGLE_KEY")
    
    # Directories
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    DATASETS_DIR: str = os.path.join(BASE_DIR, "datasets")
    MODELS_DIR: str = os.path.join(BASE_DIR, "trained_models")
    REPORTS_DIR: str = os.path.join(BASE_DIR, "generated_reports")
    
    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()

# Ensure directories exist
os.makedirs(os.path.join(settings.DATASETS_DIR, "raw"), exist_ok=True)
os.makedirs(os.path.join(settings.DATASETS_DIR, "processed"), exist_ok=True)
os.makedirs(os.path.join(settings.DATASETS_DIR, "satellite"), exist_ok=True)
os.makedirs(os.path.join(settings.DATASETS_DIR, "boundaries"), exist_ok=True)
os.makedirs(os.path.join(settings.DATASETS_DIR, "metadata"), exist_ok=True)
os.makedirs(settings.MODELS_DIR, exist_ok=True)
os.makedirs(settings.REPORTS_DIR, exist_ok=True)

