import requests
from vision_engine.main import celery
import logging
from ..config import RUNPOD_API_ENDPOINT, RUNPOD_API_KEY

logger = logging.getLogger(__name__)


@celery.task(name='vision.process', bind=True)
def vision_task(self, data):
    task_id = data['task_id']
    object_key = data['object_key']

    try:
        response = requests.post(
            url=f"https://api.runpod.ai/v2/{RUNPOD_API_ENDPOINT}/run",
            headers={
                "Authorization": f"Bearer {RUNPOD_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "input": {
                    "task_id": task_id,
                    "object_key": object_key
                }
            }
        )
        response.raise_for_status()
        job_id = response.json().get('id')
        logger.info(f"RunPod job queued: {job_id}")

    except Exception as e:
        logger.info(f"{e}")
        raise
