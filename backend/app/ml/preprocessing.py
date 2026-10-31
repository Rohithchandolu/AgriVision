import pandas as pd
import numpy as np
from typing import Tuple, List, Dict, Any, Optional
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib
import os

class DataPreprocessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.crop_encoder = LabelEncoder()
        self.fitted = False
        self.feature_names: List[str] = []

    def clean_dataset(self, df: pd.DataFrame) -> pd.DataFrame:
        """Clean raw agricultural dataset: handle missing values, duplicates, and outliers."""
        cleaned = df.copy()
        cleaned = cleaned.drop_duplicates()

        # Numeric columns median imputation
        num_cols = cleaned.select_dtypes(include=[np.number]).columns
        for col in num_cols:
            if cleaned[col].isnull().sum() > 0:
                cleaned[col] = cleaned[col].fillna(cleaned[col].median())

        # Categorical columns mode imputation
        cat_cols = cleaned.select_dtypes(include=['object', 'category']).columns
        for col in cat_cols:
            if cleaned[col].isnull().sum() > 0:
                mode_val = cleaned[col].mode()
                cleaned[col] = cleaned[col].fillna(mode_val[0] if len(mode_val) > 0 else "Unknown")

        return cleaned

    def fit_transform(self, df: pd.DataFrame, feature_cols: List[str], target_col: Optional[str] = None) -> Tuple[np.ndarray, Optional[np.ndarray]]:
        """Fit preprocessor on feature columns and return scaled array."""
        self.feature_names = feature_cols
        X = df[feature_cols].copy()

        # Handle any categorical columns in features
        for col in X.select_dtypes(include=['object', 'category']).columns:
            X[col] = pd.factorize(X[col])[0]

        X_scaled = self.scaler.fit_transform(X)
        self.fitted = True

        y = None
        if target_col and target_col in df.columns:
            y_raw = df[target_col]
            if y_raw.dtype == 'object':
                y = self.crop_encoder.fit_transform(y_raw)
            else:
                y = y_raw.values

        return X_scaled, y

    def transform(self, df: pd.DataFrame) -> np.ndarray:
        """Transform new inference dataframe using fitted scaler."""
        if not self.fitted:
            raise ValueError("Preprocessor has not been fitted.")

        X = df[self.feature_names].copy()
        for col in X.select_dtypes(include=['object', 'category']).columns:
            X[col] = pd.factorize(X[col])[0]

        return self.scaler.transform(X)

    def save(self, filepath: str):
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        joblib.dump(self, filepath)

    @classmethod
    def load(cls, filepath: str) -> "DataPreprocessor":
        return joblib.load(filepath)
