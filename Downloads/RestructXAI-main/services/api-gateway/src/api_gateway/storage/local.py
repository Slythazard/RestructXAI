import os
from uuid import uuid4

BASE_STORAGE_PATH = "data/uploads"


def save_file(filename: str, content: bytes) -> str:
    os.makedirs(BASE_STORAGE_PATH, exist_ok=True)

    unique_name = f"{uuid4()}_{filename}"
    file_path = os.path.join(BASE_STORAGE_PATH, unique_name)

    with open(file_path, "wb") as f:
        f.write(content)

    return file_path
