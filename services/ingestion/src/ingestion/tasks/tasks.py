from ingestion.celery_app import celery
import logging
import time
from flask_socketio import SocketIO
import os

REDIS_SERVER_URL = os.getenv("REDIS_SERVER_URL", 'redis://localhost:6379')

sio = SocketIO(
    cors_allowed_origins="*",
    message_queue=REDIS_SERVER_URL
)

logger = logging.getLogger(__name__)


@celery.task(name='ingestion.process', bind=True)
def ingestion_task(self, data):

    logger.info(f"Processing......{data}")

    time.sleep(5)

    logger.info("Done Ingestion")

    result = "image processed"

    sio.emit('task_update', result, to=self.request.id)

    return {'status': 'Done'}
