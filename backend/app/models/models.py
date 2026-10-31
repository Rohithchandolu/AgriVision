import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON, Index
)
from sqlalchemy.orm import relationship
from app.database.session import Base

# 1. users
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default="farmer") # farmer, agronomist, admin
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    profile = relationship("FarmerProfile", back_populates="user", uselist=False)
    farms = relationship("Farm", back_populates="owner")
    chat_history = relationship("AIChatHistory", back_populates="user")
    reports = relationship("GeneratedReport", back_populates="user")
    preferences = relationship("DashboardPreference", back_populates="user", uselist=False)

# 2. farmer_profiles
class FarmerProfile(Base):
    __tablename__ = "farmer_profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    phone = Column(String(50))
    location = Column(String(255))
    state = Column(String(100))
    district = Column(String(100))
    preferred_language = Column(String(50), default="en")
    crop_preferences = Column(JSON) # e.g. ["Almonds", "Wheat", "Corn"]
    enterprise_name = Column(String(255))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship("User", back_populates="profile")

# 3. farms
class Farm(Base):
    __tablename__ = "farms"
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    location_desc = Column(String(255))
    total_area_ha = Column(Float, default=0.0)
    center_lat = Column(Float)
    center_lon = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("User", back_populates="farms")
    fields = relationship("Field", back_populates="farm", cascade="all, delete-orphan")

# 4. fields
class Field(Base):
    __tablename__ = "fields"
    id = Column(String(50), primary_key=True, index=True) # e.g. "A-01", "B-07"
    farm_id = Column(Integer, ForeignKey("farms.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    crop_type = Column(String(100))
    area_ha = Column(Float, default=0.0)
    soil_type = Column(String(100))
    irrigation_system = Column(String(100))
    current_status = Column(String(50), default="Optimal Growth") # Optimal, Stressed, Critical
    risk_level = Column(String(50), default="Low") # Low, Moderate, Critical
    center_lat = Column(Float)
    center_lon = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    farm = relationship("Farm", back_populates="fields")
    boundary = relationship("FieldBoundary", back_populates="field", uselist=False, cascade="all, delete-orphan")
    crops = relationship("CropInformation", back_populates="field", cascade="all, delete-orphan")
    vegetation_indices = relationship("VegetationIndex", back_populates="field", cascade="all, delete-orphan")
    weather_observations = relationship("WeatherObservation", back_populates="field", cascade="all, delete-orphan")
    predictions = relationship("CropHealthPrediction", back_populates="field", cascade="all, delete-orphan")
    anomalies = relationship("AnomalyDetection", back_populates="field", cascade="all, delete-orphan")
    priority_score = relationship("FieldPriorityScore", back_populates="field", uselist=False, cascade="all, delete-orphan")
    recommendations = relationship("AIRecommendation", back_populates="field", cascade="all, delete-orphan")

# 5. field_boundaries
class FieldBoundary(Base):
    __tablename__ = "field_boundaries"
    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(String(50), ForeignKey("fields.id", ondelete="CASCADE"), unique=True, nullable=False)
    geojson_geometry = Column(JSON, nullable=False) # Stores Polygon / MultiPolygon
    crs = Column(String(50), default="EPSG:4326")
    calculated_area_ha = Column(Float)
    perimeter_m = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    field = relationship("Field", back_populates="boundary")

# 6. crop_information
class CropInformation(Base):
    __tablename__ = "crop_information"
    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(String(50), ForeignKey("fields.id", ondelete="CASCADE"), nullable=False)
    crop_name = Column(String(100), nullable=False)
    variety = Column(String(100))
    sowing_date = Column(DateTime)
    expected_harvest_date = Column(DateTime)
    growth_stage = Column(String(50)) # Vegetative, Flowering, Ripening, Harvest
    target_yield_t_ha = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    field = relationship("Field", back_populates="crops")

# 7. satellite_observations
class SatelliteObservation(Base):
    __tablename__ = "satellite_observations"
    id = Column(Integer, primary_key=True, index=True)
    constellation = Column(String(100), default="Sentinel-2B") # Sentinel-2A/B, Landsat-9
    tile_id = Column(String(100))
    observation_date = Column(DateTime, nullable=False, index=True)
    cloud_coverage_pct = Column(Float, default=0.0)
    processing_level = Column(String(50), default="Level-2A (BOA)")
    raw_band_paths = Column(JSON) # e.g. {"B02": "...", "B04": "...", "B08": "...", "B11": "..."}
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# 8. vegetation_indices
class VegetationIndex(Base):
    __tablename__ = "vegetation_indices"
    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(String(50), ForeignKey("fields.id", ondelete="CASCADE"), nullable=False, index=True)
    observation_date = Column(DateTime, nullable=False, index=True)
    ndvi_mean = Column(Float, nullable=False)
    ndvi_min = Column(Float)
    ndvi_max = Column(Float)
    ndvi_std = Column(Float)
    ndwi_mean = Column(Float) # Leaf water index
    evi_mean = Column(Float) # Enhanced veg index
    savi_mean = Column(Float) # Soil-adjusted
    chlorophyll_index = Column(Float)
    source_constellation = Column(String(50), default="Sentinel-2B")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    field = relationship("Field", back_populates="vegetation_indices")

# 9. weather_observations
class WeatherObservation(Base):
    __tablename__ = "weather_observations"
    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(String(50), ForeignKey("fields.id", ondelete="CASCADE"), nullable=False, index=True)
    observation_date = Column(DateTime, nullable=False, index=True)
    temperature_c = Column(Float)
    humidity_pct = Column(Float)
    rainfall_mm = Column(Float)
    soil_moisture_pct = Column(Float)
    soil_temp_c = Column(Float)
    solar_irradiance_w_m2 = Column(Float)
    et_mm_day = Column(Float)
    wind_speed_kmh = Column(Float)
    source = Column(String(50), default="IoT_Probe_Array")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    field = relationship("Field", back_populates="weather_observations")

# 10. crop_health_predictions
class CropHealthPrediction(Base):
    __tablename__ = "crop_health_predictions"
    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(String(50), ForeignKey("fields.id", ondelete="CASCADE"), nullable=False, index=True)
    prediction_date = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    health_status = Column(String(50), nullable=False) # Healthy, Moderate, Stressed
    confidence_score = Column(Float)
    model_version = Column(String(50))
    feature_contributions = Column(JSON) # e.g. {"ndvi": 0.45, "soil_moisture": 0.35}
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    field = relationship("Field", back_populates="predictions")

# 11. anomaly_detections
class AnomalyDetection(Base):
    __tablename__ = "anomaly_detections"
    id = Column(String(50), primary_key=True, index=True) # e.g. "ANOM-2026-081"
    field_id = Column(String(50), ForeignKey("fields.id", ondelete="CASCADE"), nullable=False, index=True)
    anomaly_type = Column(String(100), nullable=False) # Severe Moisture Deficit, Red-Edge Drop, etc.
    severity = Column(String(50), nullable=False) # CRITICAL, MODERATE, RESOLVED
    isolation_score = Column(Float) # Outlier score from Isolation Forest
    confidence_pct = Column(Float)
    affected_area_ha = Column(Float)
    affected_area_pct = Column(Float)
    metric_impact = Column(String(255))
    suggested_action = Column(Text)
    status = Column(String(50), default="ACTIVE")
    detected_at = Column(DateTime, default=datetime.datetime.utcnow)

    field = relationship("Field", back_populates="anomalies")

# 12. field_priority_scores
class FieldPriorityScore(Base):
    __tablename__ = "field_priority_scores"
    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(String(50), ForeignKey("fields.id", ondelete="CASCADE"), unique=True, nullable=False)
    priority_rank = Column(Integer, nullable=False) # 1 = highest priority
    risk_category = Column(String(50), nullable=False) # High, Medium, Low
    composite_score = Column(Float, nullable=False) # 0.0 to 100.0
    ndvi_decline_factor = Column(Float)
    anomaly_severity_factor = Column(Float)
    weather_risk_factor = Column(Float)
    ranking_reasons = Column(JSON) # list of reason strings
    suggested_action = Column(String(255))
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    field = relationship("Field", back_populates="priority_score")

# 13. ai_recommendations
class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"
    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(String(50), ForeignKey("fields.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    explanation = Column(Text, nullable=False)
    contributing_factors = Column(JSON)
    recommended_actions = Column(JSON)
    priority_level = Column(String(50), default="High")
    is_grounded_in_gemini = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    field = relationship("Field", back_populates="recommendations")

# 14. dashboard_preferences
class DashboardPreference(Base):
    __tablename__ = "dashboard_preferences"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    dashboard_title = Column(String(255), default="Personalized Farm Dashboard")
    active_field_filter = Column(String(50), default="all")
    date_range_filter = Column(String(50), default="30d")
    theme_mode = Column(String(20), default="light")
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship("User", back_populates="preferences")
    widgets = relationship("DashboardWidget", back_populates="preference", cascade="all, delete-orphan")

# 15. dashboard_widgets
class DashboardWidget(Base):
    __tablename__ = "dashboard_widgets"
    id = Column(Integer, primary_key=True, index=True)
    preference_id = Column(Integer, ForeignKey("dashboard_preferences.id", ondelete="CASCADE"), nullable=False)
    widget_type = Column(String(100), nullable=False) # crop_health, ndvi_trend, weather_analysis, field_alerts, kpi_summary
    title = Column(String(255), nullable=False)
    data_source = Column(String(100), nullable=False)
    display_order = Column(Integer, default=0)
    width = Column(String(50), default="half") # full, half, third

    preference = relationship("DashboardPreference", back_populates="widgets")

# 16. ai_chat_history
class AIChatHistory(Base):
    __tablename__ = "ai_chat_history"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    field_id = Column(String(50), nullable=True)
    sender = Column(String(20), nullable=False) # user or assistant
    message = Column(Text, nullable=False)
    badges = Column(JSON) # e.g. ["Sentinel-2B Grounded", "Anomaly Flagged"]
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="chat_history")

# 17. generated_reports
class GeneratedReport(Base):
    __tablename__ = "generated_reports"
    id = Column(String(50), primary_key=True, index=True) # e.g. "REP-2026-001"
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    report_type = Column(String(100), default="Farm_Health_Audit")
    file_path = Column(String(500), nullable=False)
    file_size_bytes = Column(Integer)
    summary_text = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="reports")

# 18. dataset_registry
class DatasetRegistry(Base):
    __tablename__ = "dataset_registry"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False) # AgriYield, Crop Vision Fusion, Smart Farming
    source_url = Column(String(500))
    status = Column(String(50), default="DOWNLOADED") # PENDING, DOWNLOADED, PROCESSED, ERROR
    file_count = Column(Integer, default=0)
    total_size_bytes = Column(Integer, default=0)
    has_satellite_bands = Column(Boolean, default=False)
    has_weather_data = Column(Boolean, default=False)
    has_field_boundaries = Column(Boolean, default=False)
    has_health_labels = Column(Boolean, default=False)
    metadata_json = Column(JSON)
    last_inspected = Column(DateTime, default=datetime.datetime.utcnow)

# 19. model_versions
class ModelVersion(Base):
    __tablename__ = "model_versions"
    id = Column(Integer, primary_key=True, index=True)
    model_name = Column(String(100), nullable=False, index=True) # CropHealthClassifier, AnomalyDetector, WeatherRiskModel
    version = Column(String(50), nullable=False) # v1.0.0
    algorithm = Column(String(100), nullable=False) # RandomForest, IsolationForest, XGBoost
    file_path = Column(String(500), nullable=False)
    metrics = Column(JSON) # accuracy, f1_score, precision, recall
    feature_names = Column(JSON)
    is_active = Column(Boolean, default=True)
    trained_at = Column(DateTime, default=datetime.datetime.utcnow)

