import numpy as np
from typing import Dict, Any, Union

def calculate_ndvi_array(nir: np.ndarray, red: np.ndarray, nodata: float = -9999.0) -> np.ndarray:
    """
    Compute Normalized Difference Vegetation Index (NDVI).
    Sentinel-2: NIR = Band 8 (842nm), RED = Band 4 (665nm).
    Formula: (NIR - RED) / (NIR + RED)
    """
    valid_mask = (nir != nodata) & (red != nodata) & ~np.isnan(nir) & ~np.isnan(red)
    denom = nir + red
    valid_mask = valid_mask & (denom != 0.0)

    ndvi = np.full_like(nir, np.nan, dtype=np.float32)
    ndvi[valid_mask] = (nir[valid_mask] - red[valid_mask]) / denom[valid_mask]
    # Clip to physical valid range
    np.clip(ndvi, -1.0, 1.0, out=ndvi)
    return ndvi

def calculate_ndwi_array(nir: np.ndarray, swir: np.ndarray, nodata: float = -9999.0) -> np.ndarray:
    """
    Compute Normalized Difference Water Index (NDWI) for leaf vegetation water content.
    Sentinel-2: NIR = Band 8 (842nm), SWIR = Band 11 (1610nm).
    Formula: (NIR - SWIR) / (NIR + SWIR)
    """
    valid_mask = (nir != nodata) & (swir != nodata) & ~np.isnan(nir) & ~np.isnan(swir)
    denom = nir + swir
    valid_mask = valid_mask & (denom != 0.0)

    ndwi = np.full_like(nir, np.nan, dtype=np.float32)
    ndwi[valid_mask] = (nir[valid_mask] - swir[valid_mask]) / denom[valid_mask]
    np.clip(ndwi, -1.0, 1.0, out=ndwi)
    return ndwi

def calculate_evi_array(nir: np.ndarray, red: np.ndarray, blue: np.ndarray, nodata: float = -9999.0) -> np.ndarray:
    """
    Compute Enhanced Vegetation Index (EVI).
    Sentinel-2: NIR = Band 8, RED = Band 4, BLUE = Band 2.
    Formula: 2.5 * (NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1.0)
    """
    valid_mask = (nir != nodata) & (red != nodata) & (blue != nodata)
    denom = nir + 6.0 * red - 7.5 * blue + 1.0
    valid_mask = valid_mask & (denom != 0.0)

    evi = np.full_like(nir, np.nan, dtype=np.float32)
    evi[valid_mask] = 2.5 * (nir[valid_mask] - red[valid_mask]) / denom[valid_mask]
    np.clip(evi, -1.0, 1.5, out=evi)
    return evi

def calculate_savi_array(nir: np.ndarray, red: np.ndarray, L: float = 0.5, nodata: float = -9999.0) -> np.ndarray:
    """
    Compute Soil-Adjusted Vegetation Index (SAVI).
    Formula: ((NIR - RED) / (NIR + RED + L)) * (1.0 + L)
    """
    valid_mask = (nir != nodata) & (red != nodata)
    denom = nir + red + L
    valid_mask = valid_mask & (denom != 0.0)

    savi = np.full_like(nir, np.nan, dtype=np.float32)
    savi[valid_mask] = ((nir[valid_mask] - red[valid_mask]) / denom[valid_mask]) * (1.0 + L)
    np.clip(savi, -1.0, 1.0, out=savi)
    return savi

def compute_raster_statistics(raster_array: np.ndarray) -> Dict[str, float]:
    """Calculate mean, min, max, standard deviation of a valid 2D/1D raster array."""
    valid = raster_array[~np.isnan(raster_array)]
    if len(valid) == 0:
        return {"mean": 0.0, "min": 0.0, "max": 0.0, "std": 0.0}
    return {
        "mean": round(float(np.mean(valid)), 4),
        "min": round(float(np.min(valid)), 4),
        "max": round(float(np.max(valid)), 4),
        "std": round(float(np.std(valid)), 4),
    }

def calculate_single_pixel_indices(nir: float, red: float, swir: float = 0.20, blue: float = 0.05) -> Dict[str, float]:
    """Calculate indices for single scalar reflectance values."""
    denom_ndvi = nir + red
    ndvi = (nir - red) / denom_ndvi if denom_ndvi != 0 else 0.0

    denom_ndwi = nir + swir
    ndwi = (nir - swir) / denom_ndwi if denom_ndwi != 0 else 0.0

    denom_evi = nir + 6.0 * red - 7.5 * blue + 1.0
    evi = 2.5 * (nir - red) / denom_evi if denom_evi != 0 else 0.0

    denom_savi = nir + red + 0.5
    savi = ((nir - red) / denom_savi) * 1.5 if denom_savi != 0 else 0.0

    return {
        "ndvi": round(max(-1.0, min(1.0, ndvi)), 4),
        "ndwi": round(max(-1.0, min(1.0, ndwi)), 4),
        "evi": round(max(-1.0, min(1.5, evi)), 4),
        "savi": round(max(-1.0, min(1.0, savi)), 4),
    }

