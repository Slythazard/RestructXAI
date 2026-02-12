from api_gateway.celery_app import celery_app
from api_gateway.storage.local_storage import save_file
import redis

redis_client = redis.Redis(host="localhost", port=6379, db=0)


@celery_app.task(bind=True)
def ingest_files_task(self, job_id: str, files_meta: list):
    """
    files_meta = [
        {"filename": "doc1.pdf", "content": b"..."},
        ...
    ]
    """

    redis_client.set(job_id, "processing")

    saved_files = []

    for meta in files_meta:
        file_path = save_file(meta["filename"], meta["content"])
        saved_files.append(file_path)

    redis_client.set(job_id, "completed")

    return {
        "job_id": job_id,
        "status": "completed",
        "files": saved_files,
    }
