import requests
from vision_engine.main import celery
import logging
from core.config.settings import settings
from core.events.publisher import publish_task_update

logger = logging.getLogger(__name__)


@celery.task(name="vision.process", bind=True)
def vision_task(self, data):
    task_id = data["task_id"]
    object_key = data["object_key"]

    try:
        response = requests.post(
            url=f"https://api.runpod.ai/v2/{settings.RUNPOD_API_ENDPOINT}/run",
            # url="http://host.dockerfile.internal:8006/runsync",
            headers={
                "Authorization": f"Bearer {settings.RUNPOD_API_KEY}",
                "Content-Type": "application/json",
            },
            json={"input": {"task_id": task_id, "object_key": object_key}},
        )
        response.raise_for_status()
        job_id = response.json().get("id")
        logger.info(f"RunPod job queued: {job_id}")

        publish_task_update(
            task_id=task_id,
            status="vision.queued",
            message="redis is working",
            progress=None,
        )

    except Exception as e:
        logger.info(f"{e}")
        raise
