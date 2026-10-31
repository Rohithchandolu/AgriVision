import pandas as pd
import numpy as np
from typing import Dict, Any

def compute_vegetation_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Derive high-level agricultural vegetation health features:
    - Delta NDVI (NDVI change rate)
    - Canopy Water Stress Ratio (NDWI / NDVI)
    - Vegetation Vigor Index
    """
    res = df.copy()

    if "ndvi" in res.columns and "ndwi" in res.columns:
        # Water stress ratio (safeguarded against zero division)
        res["water_stress_ratio"] = res["ndwi"] / (res["ndvi"] + 0.001)

    if "ndvi" in res.columns and "evi" in res.columns:
        res["canopy_density_factor"] = (res["ndvi"] + res["evi"]) / 2.0

    return res

