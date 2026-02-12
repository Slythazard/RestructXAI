from fastapi import APIRouter, UploadFile, File
from typing import List   # ⬅️ MISSING
from uuid import uuid4
import redis

from api_gateway.tasks.ingestion_tasks import ingest_files_task

router = APIRouter()
redis_client = redis.Redis(host="localhost", port=6379, db=0)


@router.post("/ingestion")
async def ingest_files(files: List[UploadFile] = File(...)):
    job_id = str(uuid4())
    files_meta = []

    for file in files:
        content = await file.read()
        files_meta.append(
            {
                "filename": file.filename,
                "content": content,
            }
        )

    redis_client.set(job_id, "queued")
    ingest_files_task.delay(job_id, files_meta)

    return {
        "job_id": job_id,
        "status": "queued",
    }


@router.get("/ingestion/{job_id}")
def get_ingestion_status(job_id: str):
    status = redis_client.get(job_id)
    if not status:
        return {"job_id": job_id, "status": "not_found"}

    return {"job_id": job_id, "status": status.decode()}
