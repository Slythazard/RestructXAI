from ingestion.celery_app import celery
import logging
from minio import Minio
import time
from core.events.publisher import publish_task_update
from core.config.settings import settings

client = Minio(
    "storage:9000",
    access_key=settings.MINIO_ACCESS_KEY,
    secret_key=settings.MINIO_SECRET_KEY,
    secure=False,
)

logger = logging.getLogger(__name__)


@celery.task(name="ingestion.process", bind=True)
def ingestion_task(self, data):
    logger.info(f"Task started with data: {data}")
    task_id = data["task_id"]
    object_key = data["object_key"]

    publish_task_update(
        task_id=task_id, status="ingestion.queued", message="starting download"
    )
    try:
        stor_response = client.get_object(
            f"{settings.BUCKET}", object_name=data["object_key"]
        )
        time.sleep(5)
        file = stor_response.read()
        stor_response.close()
        stor_response.release_conn()

        publish_task_update(
            task_id=task_id, status="ingestion.complete", message="download file"
        )

        celery.send_task(
            "vision.process",
            args=[
                {
                    "file": file,
                    "task_id": task_id,
                    "object_key": object_key,
                }
            ],
            queue="vision",
        )

        publish_task_update(
            task_id=task_id, status="vision.queued", message="Queued for analysis"
        )
    except Exception as e:
        logger.info(f"Dowload Failed : {e}")
    return {"status": "Done"}
