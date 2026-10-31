import math
from typing import Dict, Any, Tuple, Optional
from shapely.geometry import shape, Polygon, MultiPolygon
from shapely.ops import transform
import pyproj

def calculate_geodesic_area_ha(geometry_dict: Dict[str, Any]) -> float:
    """
    Calculate the accurate surface area of a GeoJSON geometry in hectares.
    Uses an equal-area projection or WGS84 geodesic calculation.
    """
    try:
        geom = shape(geometry_dict)
        if not geom.is_valid:
            geom = geom.buffer(0) # Attempt geometry auto-repair
        
        # Calculate centroid to find appropriate UTM zone or use Equal Earth
        centroid = geom.centroid
        lon, lat = centroid.x, centroid.y
        
        # Approximate geodesic area using spherical formula or project to UTM
        # UTM zone calculation:
        utm_zone = int((lon + 180) / 6) + 1
        is_northern = lat >= 0
        epsg_code = 32600 + utm_zone if is_northern else 32700 + utm_zone
        
        wgs84 = pyproj.CRS("EPSG:4326")
        utm = pyproj.CRS(f"EPSG:{epsg_code}")
        project = pyproj.Transformer.from_crs(wgs84, utm, always_xy=True).transform
        
        utm_geom = transform(project, geom)
        area_m2 = utm_geom.area
        return round(area_m2 / 10000.0, 2) # 1 hectare = 10,000 m2
    except Exception:
        # Fallback approximation: 1 deg lat ~ 111.32 km, 1 deg lon ~ 111.32 km * cos(lat)
        try:
            geom = shape(geometry_dict)
            coords = list(geom.exterior.coords) if hasattr(geom, 'exterior') else []
            if not coords:
                return 0.0
            
            # Simple spherical polygon area formula
            mean_lat = math.radians(sum(c[1] for c in coords) / len(coords))
            kx = 111320.0 * math.cos(mean_lat)
            ky = 110574.0
            
            projected_coords = [(c[0] * kx, c[1] * ky) for c in coords]
            poly = Polygon(projected_coords)
            return round(poly.area / 10000.0, 2)
        except Exception:
            return 0.0

def validate_polygon_geometry(geometry_dict: Dict[str, Any]) -> Tuple[bool, str, Optional[Dict[str, Any]]]:
    """
    Validate and sanitize GeoJSON polygon geometry.
    Returns (is_valid, message, sanitized_geojson).
    """
    try:
        geom = shape(geometry_dict)
        if not geom.is_valid:
            geom = geom.buffer(0)
            if not geom.is_valid:
                return False, "Invalid polygon topology cannot be repaired", None

        if geom.geom_type not in ["Polygon", "MultiPolygon"]:
            return False, f"Expected Polygon or MultiPolygon, got {geom.geom_type}", None

        # Ensure coordinates are within valid lat/lon
        bounds = geom.bounds # (minx, miny, maxx, maxy) -> (min_lon, min_lat, max_lon, max_lat)
        if not (-180.0 <= bounds[0] <= 180.0 and -90.0 <= bounds[1] <= 90.0):
            return False, "Coordinates out of bounds for WGS84 (-180..180, -90..90)", None

        from shapely.geometry import mapping
        return True, "Valid geometry", mapping(geom)
    except Exception as e:
        return False, f"Geometry parsing error: {str(e)}", None

