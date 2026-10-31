from typing import Dict, Any, Tuple

class WeatherRiskModel:
    """
    Evaluates micro-climatic environmental stress risk based on thermal gradients,
    evapotranspiration, soil saturation, and precipitation deficits.
    """
    def evaluate_risk(self, weather_data: Dict[str, float], crop_type: str = "Almonds") -> Dict[str, Any]:
        temp = weather_data.get("temperature_c", 25.0)
        humidity = weather_data.get("humidity_pct", 50.0)
        rainfall = weather_data.get("rainfall_mm", 0.0)
        soil_moisture = weather_data.get("soil_moisture_pct", 35.0)
        et = weather_data.get("et_mm_day", 4.0)

        risk_score = 0.0
        dominant_hazards = []

        # Heat stress factor
        if temp > 35.0:
            risk_score += 40.0
            dominant_hazards.append("Extreme Canopy Heat Stress")
        elif temp > 30.0:
            risk_score += 20.0
            dominant_hazards.append("Moderate Thermal Load")

        # Hydric drought / soil moisture deficit
        if soil_moisture < 22.0:
            risk_score += 45.0
            dominant_hazards.append("Root Zone Hydric Deficit")
        elif soil_moisture < 28.0:
            risk_score += 25.0
            dominant_hazards.append("Declining Subsurface Moisture")

        # High evapotranspiration demand with low rainfall
        if et > 5.0 and rainfall < 1.0:
            risk_score += 20.0
            dominant_hazards.append("Elevated Atmospheric Vapor Pressure Deficit (VPD)")

        # Waterlogging / saturation
        if soil_moisture > 48.0 and rainfall > 25.0:
            risk_score += 35.0
            dominant_hazards.append("Soil Saturation & Root Anoxia Risk")

        risk_score = min(100.0, risk_score)

        if risk_score >= 60.0:
            risk_level = "High"
            advisory = "Urgent: Execute immediate irrigation mitigation or drainage check to prevent yield decline."
        elif risk_score >= 30.0:
            risk_level = "Moderate"
            advisory = "Caution: Environmental variables approaching stress thresholds. Monitor weekly soil probe readings."
        else:
            risk_level = "Low"
            advisory = "Favorable: Micro-climatic conditions are well within optimal growth ranges."

        return {
            "risk_level": risk_level,
            "risk_score": round(risk_score, 1),
            "dominant_hazard": ", ".join(dominant_hazards) if dominant_hazards else "None (Optimal Growth)",
            "advisory": advisory
        }

