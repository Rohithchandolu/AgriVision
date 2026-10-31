from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any
import datetime

# --- Auth & User ---
class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    full_name: str
    phone: Optional[str] = None
    role: Optional[str] = "farmer"
    location: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    enterprise_name: Optional[str] = None
    crop_preferences: Optional[List[str]] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    email: str
    full_name: str
    role: str

class TokenData(BaseModel):
    user_id: Optional[int] = None
    email: Optional[str] = None

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    preferred_language: Optional[str] = None
    enterprise_name: Optional[str] = None
    crop_preferences: Optional[List[str]] = None

class UserProfileOut(BaseModel):
    id: int
    user_id: int
    phone: Optional[str]
    location: Optional[str]
    state: Optional[str]
    district: Optional[str]
    preferred_language: Optional[str]
    enterprise_name: Optional[str]
    crop_preferences: Optional[List[str]]

class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    is_active: bool
    created_at: datetime.datetime
    profile: Optional[UserProfileOut] = None

    class Config:
        from_attributes = True

# --- Farm & Field ---
class FarmCreate(BaseModel):
    name: str
    location_desc: Optional[str] = None
    total_area_ha: Optional[float] = 0.0
    center_lat: Optional[float] = None
    center_lon: Optional[float] = None

class FarmOut(BaseModel):
    id: int
    name: str
    location_desc: Optional[str]
    total_area_ha: float
    center_lat: Optional[float]
    center_lon: Optional[float]
    fields_count: Optional[int] = 0

    class Config:
        from_attributes = True

class FieldBoundaryCreate(BaseModel):
    geojson_geometry: Dict[str, Any]
    crs: Optional[str] = "EPSG:4326"

class FieldBoundaryOut(BaseModel):
    id: int
    field_id: str
    geojson_geometry: Dict[str, Any]
    crs: str
    calculated_area_ha: Optional[float]
    perimeter_m: Optional[float]

    class Config:
        from_attributes = True

class FieldCreate(BaseModel):
    id: str
    farm_id: int
    name: str
    crop_type: str
    area_ha: float
    soil_type: Optional[str] = None
    irrigation_system: Optional[str] = None
    boundary_geojson: Optional[Dict[str, Any]] = None
    center_lat: Optional[float] = None
    center_lon: Optional[float] = None

class FieldUpdate(BaseModel):
    name: Optional[str] = None
    crop_type: Optional[str] = None
    area_ha: Optional[float] = None
    soil_type: Optional[str] = None
    irrigation_system: Optional[str] = None
    current_status: Optional[str] = None
    risk_level: Optional[str] = None

class FieldOut(BaseModel):
    id: str
    farm_id: int
    name: str
    crop_type: Optional[str]
    area_ha: float
    soil_type: Optional[str]
    irrigation_system: Optional[str]
    current_status: str
    risk_level: str
    center_lat: Optional[float]
    center_lon: Optional[float]
    latest_ndvi: Optional[float] = None
    latest_moisture: Optional[str] = None
    active_anomaly: Optional[str] = None
    boundary: Optional[FieldBoundaryOut] = None

    class Config:
        from_attributes = True

# --- Vegetation & Satellite ---
class VegetationIndexOut(BaseModel):
    id: int
    field_id: str
    observation_date: datetime.datetime
    ndvi_mean: float
    ndvi_min: Optional[float]
    ndvi_max: Optional[float]
    ndvi_std: Optional[float]
    ndwi_mean: Optional[float]
    evi_mean: Optional[float]
    savi_mean: Optional[float]
    source_constellation: str

    class Config:
        from_attributes = True

class VegetationCalculateRequest(BaseModel):
    field_id: str
    nir: float
    red: float
    blue: Optional[float] = 0.05
    swir: Optional[float] = 0.20

class VegetationCalculateResponse(BaseModel):
    field_id: str
    ndvi: float
    ndwi: float
    evi: float
    savi: float
    interpretation: str

# --- Crop Health ---
class CropHealthPredictRequest(BaseModel):
    field_id: str
    ndvi: Optional[float] = None
    ndwi: Optional[float] = None
    evi: Optional[float] = None
    temperature_c: Optional[float] = None
    humidity_pct: Optional[float] = None
    rainfall_mm: Optional[float] = None
    soil_moisture_pct: Optional[float] = None
    crop_type: Optional[str] = None

class CropHealthPredictionOut(BaseModel):
    id: int
    field_id: str
    prediction_date: datetime.datetime
    health_status: str # Healthy, Moderate, Stressed
    confidence_score: float
    model_version: str
    feature_contributions: Optional[Dict[str, float]] = None

    class Config:
        from_attributes = True

# --- Anomaly Detection ---
class AnomalyDetectRequest(BaseModel):
    field_id: str
    ndvi: float
    ndwi: float
    evi: float
    historical_mean_ndvi: Optional[float] = None

class AnomalyOut(BaseModel):
    id: str
    field_id: str
    anomaly_type: str
    severity: str
    isolation_score: Optional[float]
    confidence_pct: Optional[float]
    affected_area_ha: Optional[float]
    affected_area_pct: Optional[float]
    metric_impact: Optional[str]
    suggested_action: Optional[str]
    status: str
    detected_at: datetime.datetime

    class Config:
        from_attributes = True

# --- Weather ---
class WeatherObservationOut(BaseModel):
    id: int
    field_id: str
    observation_date: datetime.datetime
    temperature_c: Optional[float]
    humidity_pct: Optional[float]
    rainfall_mm: Optional[float]
    soil_moisture_pct: Optional[float]
    et_mm_day: Optional[float]
    wind_speed_kmh: Optional[float]
    source: str

    class Config:
        from_attributes = True

class WeatherRiskOut(BaseModel):
    field_id: str
    risk_level: str # Low, Moderate, High
    risk_score: float # 0 to 100
    dominant_hazard: str # Drought, Excessive Heat, Waterlogging, Frost
    advisory: str

# --- Priority Ranking ---
class PriorityRankingOut(BaseModel):
    field_id: str
    field_name: str
    crop: str
    priority_rank: int
    risk_category: str
    composite_score: float
    ranking_reasons: List[str]
    suggested_action: str

# --- Gemini AI ---
class AIAssistantRequest(BaseModel):
    message: str
    field_id: Optional[str] = None

class AIAssistantResponse(BaseModel):
    id: str
    sender: str = "assistant"
    timestamp: str
    message: str
    badges: List[str] = []

class AIRecommendationRequest(BaseModel):
    field_id: str

class AIRecommendationResponse(BaseModel):
    field_id: str
    title: str
    explanation: str
    contributing_factors: List[str]
    recommended_actions: List[str]
    priority_level: str

# --- Dashboard Personalization ---
class DashboardWidgetConfig(BaseModel):
    type: str # crop_health, ndvi_trend, weather_analysis, field_alerts, kpi_summary
    title: str
    data_source: str
    width: Optional[str] = "half"

class DashboardPersonalizationRequest(BaseModel):
    preferred_crops: Optional[List[str]] = None
    focus_area: Optional[str] = "crop_stress" # crop_stress, yield_optimization, weather_risk

class DashboardPersonalizationResponse(BaseModel):
    dashboard_title: str
    widgets: List[DashboardWidgetConfig]
    layout_rationale: str

# --- Reports ---
class ReportGenerateRequest(BaseModel):
    field_id: Optional[str] = None
    report_type: Optional[str] = "Farm_Health_Audit"
    include_ai_recommendations: bool = True

class ReportOut(BaseModel):
    id: str
    title: str
    report_type: str
    file_path: str
    file_size_bytes: Optional[int]
    download_url: str
    summary_text: Optional[str]
    created_at: datetime.datetime

    class Config:
        from_attributes = True

# --- Dataset Registry ---
class DatasetRegistryOut(BaseModel):
    name: str
    source_url: Optional[str]
    status: str
    file_count: int
    total_size_bytes: int
    has_satellite_bands: bool
    has_weather_data: bool
    has_field_boundaries: bool
    has_health_labels: bool
    metadata_json: Optional[Dict[str, Any]]
    last_inspected: datetime.datetime

    class Config:
        from_attributes = True

