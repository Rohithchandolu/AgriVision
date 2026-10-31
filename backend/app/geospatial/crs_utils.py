from typing import Tuple, List

def validate_coordinates(lat: float, lon: float) -> bool:
    """Check that lat is between -90 and 90, and lon is between -180 and 180."""
    return -90.0 <= lat <= 90.0 and -180.0 <= lon <= 180.0

def standardize_crs(crs_string: str) -> str:
    """Normalize CRS representation to EPSG code string."""
    crs_lower = str(crs_string).lower()
    if "4326" in crs_lower or "wgs84" in crs_lower or "wgs 84" in crs_lower:
        return "EPSG:4326"
    if "3857" in crs_lower or "web mercator" in crs_lower:
        return "EPSG:3857"
    return crs_string or "EPSG:4326"

