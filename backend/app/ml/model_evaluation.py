import json
import os
from typing import Dict, Any

def generate_model_evaluation_report(model_name: str, metrics: Dict[str, Any], output_path: str):
    """Save formatted evaluation metrics and summary."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    report_data = {
        "model_name": model_name,
        "evaluation_timestamp": str(os.path.getmtime(output_path) if os.path.exists(output_path) else "current"),
        "metrics": metrics
    }
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(report_data, f, indent=2)
    return report_data

