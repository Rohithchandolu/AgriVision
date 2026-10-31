import os
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any, Tuple, Optional
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score, f1_score, confusion_matrix
from app.ml.preprocessing import DataPreprocessor

class CropHealthClassifier:
    """
    Random Forest / XGBoost model predicting crop condition:
    Healthy, Moderate, or Stressed.
    """
    CLASSES = ["Healthy", "Moderate", "Stressed"]

    def __init__(self, model_path: Optional[str] = None):
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            class_weight="balanced"
        )
        self.preprocessor = DataPreprocessor()
        self.is_trained = False
        self.model_path = model_path
        self.feature_names = [
            "ndvi", "ndwi", "evi", "temperature_c", "humidity_pct", "rainfall_mm", "soil_moisture_pct"
        ]

        if model_path and os.path.exists(model_path):
            self.load(model_path)

    def train(self, df: pd.DataFrame, target_col: str = "health_status") -> Dict[str, Any]:
        """Train model with stratified train/test split and evaluate."""
        cleaned = self.preprocessor.clean_dataset(df)
        available_features = [f for f in self.feature_names if f in cleaned.columns]
        self.feature_names = available_features

        X_scaled, y = self.preprocessor.fit_transform(cleaned, available_features, target_col)

        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y, test_size=0.2, random_state=42, stratify=y if len(np.unique(y)) > 1 else None
        )

        self.model.fit(X_train, y_train)
        self.is_trained = True

        y_pred = self.model.predict(X_test)
        report = classification_report(y_test, y_pred, output_dict=True, zero_division=0)
        acc = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred, average="weighted", zero_division=0)

        # Feature importances
        importances = dict(zip(self.feature_names, [round(float(v), 4) for v in self.model.feature_importances_]))

        metrics = {
            "accuracy": round(float(acc), 4),
            "f1_score": round(float(f1), 4),
            "classification_report": report,
            "feature_importances": importances,
            "confusion_matrix": confusion_matrix(y_test, y_pred).tolist(),
            "n_samples": len(df)
        }
        return metrics

    def predict(self, feature_dict: Dict[str, float]) -> Tuple[str, float, Dict[str, float]]:
        """
        Predict crop health condition.
        Returns (status, confidence, feature_contributions).
        If model is not yet trained, uses a transparent deterministic agronomic rule baseline.
        """
        if self.is_trained:
            input_df = pd.DataFrame([feature_dict])
            # Fill any missing expected features with reasonable defaults
            for feat in self.feature_names:
                if feat not in input_df.columns:
                    input_df[feat] = 0.5
            X_scaled = self.preprocessor.transform(input_df)
            probs = self.model.predict_proba(X_scaled)[0]
            pred_idx = np.argmax(probs)
            confidence = round(float(probs[pred_idx]), 4)
            status = self.preprocessor.crop_encoder.inverse_transform([pred_idx])[0]

            contributions = dict(zip(self.feature_names, [round(float(v), 3) for v in self.model.feature_importances_]))
            return str(status), confidence, contributions

        # Transparent provisional baseline when ML weights are not loaded
        ndvi = feature_dict.get("ndvi", 0.75)
        soil_moisture = feature_dict.get("soil_moisture_pct", 35.0)

        if ndvi < 0.60 or soil_moisture < 25.0:
            return "Stressed", 0.88, {"ndvi_deficit": 0.6, "soil_moisture_deficit": 0.4}
        elif ndvi < 0.75 or soil_moisture < 30.0:
            return "Moderate", 0.78, {"ndvi_deficit": 0.4, "soil_moisture_deficit": 0.3}
        else:
            return "Healthy", 0.94, {"canopy_vigor": 0.7, "adequate_moisture": 0.3}

    def save(self, filepath: str):
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        joblib.dump({
            "model": self.model,
            "preprocessor": self.preprocessor,
            "is_trained": self.is_trained,
            "feature_names": self.feature_names
        }, filepath)

    def load(self, filepath: str):
        data = joblib.load(filepath)
        self.model = data["model"]
        self.preprocessor = data["preprocessor"]
        self.is_trained = data["is_trained"]
        self.feature_names = data["feature_names"]

