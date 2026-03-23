from ingestion.celery_app import celery, vision_celery
import logging
from flask_socketio import SocketIO
import os
from minio import Minio
import time

REDIS_SERVER_URL = os.getenv("REDIS_SERVER_URL", 'redis://localhost:6379')
MINIO_ACCESS_KEY = os.getenv("MINIO_ROOT_USER")
MINIO_SECRET_KEY = os.getenv("MINIO_ROOT_PASSWORD")
BUCKET = os.getenv("BUCKET", "uploads")

sio = SocketIO(
    cors_allowed_origins="*",
    message_queue=REDIS_SERVER_URL
)

client = Minio(
    "storage:9000",
    access_key=MINIO_ACCESS_KEY,
    secret_key=MINIO_SECRET_KEY,
    secure=False
)

logger = logging.getLogger(__name__)


@celery.task(name='ingestion.process', bind=True)
def ingestion_task(self, data):
    logger.info(f"Task started with data: {data}")
    task_id = data["task_id"]
    object_key = data["object_key"]

    sio.emit('task_update', {"status": "ingestion.queued",
             "message": "starting download"}, to=task_id)
    logger.info('first update reached browser')
    try:
        stor_response = client.get_object(
            BUCKET,
            object_name=data["object_key"]
        )
        time.sleep(5)
        file = stor_response.read()
        stor_response.close()
        stor_response.release_conn()

        sio.emit('task_update', {
            "status": "ingestion.complete",
            "message": "download file",
            "content": f"{file}"
        }, to=task_id)
        logger.info("second update reached browser")

        vision_celery.send_task("vision.process", args=[{
            "file": file,
            "task_id": task_id,
            "object_key": object_key,
        }], queue='vision')

        sio.emit(
            'task_update',
            {
                "status": "vision.queued",
                "message": "Queued for analysis"
            },
            to=task_id
        )
    except Exception as e:
        logger.info(f"Dowload Failed : {e}")
    return {'status': 'Done'}
