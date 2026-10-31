import os
import zipfile
import hashlib
from typing import List, Dict, Any

def safe_extract_zip(zip_path: str, extract_to: str) -> List[str]:
    """
    Safely extract a ZIP archive while preventing Zip Slip / path traversal attacks.
    """
    extracted_files = []
    real_extract_to = os.path.realpath(extract_to)
    os.makedirs(real_extract_to, exist_ok=True)

    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        for member in zip_ref.infolist():
            # Resolve target path and verify it stays inside destination
            target_path = os.path.realpath(os.path.join(real_extract_to, member.filename))
            if not target_path.startswith(real_extract_to):
                raise ValueError(f"Path traversal detected in archive: {member.filename}")
            
            zip_ref.extract(member, real_extract_to)
            if not member.is_dir():
                extracted_files.append(target_path)

    return extracted_files

def calculate_file_hash(file_path: str) -> str:
    """Calculate SHA256 hash of a file."""
    sha256 = hashlib.sha256()
    with open(file_path, "rb") as f:
        while chunk := f.read(8192):
            sha256.update(chunk)
    return sha256.hexdigest()

def get_file_metadata(file_path: str) -> Dict[str, Any]:
    """Inspect file size, extension, and modification time."""
    stat = os.stat(file_path)
    _, ext = os.path.splitext(file_path)
    return {
        "file_name": os.path.basename(file_path),
        "file_path": file_path,
        "extension": ext.lower(),
        "size_bytes": stat.st_size,
        "size_mb": round(stat.st_size / (1024 * 1024), 2),
        "modified_at": stat.st_mtime
    }

