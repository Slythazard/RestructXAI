from vision_engine.tasks.functions import process_pdf
from vision_engine.pp_structure.main import get_layout
from core.events.event_bus import event_bus
from core.config.settings import settings
import runpod
import logging
from minio import Minio
import numpy as np

logger = logging.getLogger(__name__)

print(f"this is minio url {settings.MINIO_SERVER_URL}")
print(f"this is redis url {settings.REDIS_SERVER_URL}")

client = Minio(
    f"{settings.MINIO_SERVER_URL}",
    secret_key=settings.MINIO_SECRET_KEY,
    access_key=settings.MINIO_ACCESS_KEY,
    secure=True
)

layout = get_layout()


def make_json_serializable(obj):
    if isinstance(obj, np.ndarray):
        return obj.tolist()
    elif isinstance(obj, dict):
        return {k: make_json_serializable(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [make_json_serializable(v) for v in obj]
    else:
        return obj


def publish_update(task_id, status, message, progress=None):
    try:
        event_bus.publish(
            {
                "task_id": task_id,
                "status": status,
                "message": message,
                "progess": progress
            }
        )
    except Exception as e:
        print(f"sio emit failed due to {e}")
        return e


def layout_parse(job):

    data = job.get("input", {})
    task_id = data.get("task_id")
    object_key = data.get("object_key")

    print(f"{data}")

    try:
        publish_update(task_id, "vision.job.started", "Job started", 0)

        # FETCH
        publish_update(task_id, "vision.fetch.started",
                       "Fetching file from storage", 14)
        minio_object = client.get_object(f"{settings.BUCKET}", object_key)

        publish_update(task_id, "vision.fetch.downloading",
                       "Downloading file", 29)
        minio_file = minio_object.read()
        minio_object.close()
        minio_object.release_conn()

        publish_update(task_id, "vision.fetch.completed",
                       "File fetched successfully", 43)

        # PREPROCESS
        publish_update(task_id, "vision.preprocess.started",
                       "Processing PDF", 57)
        file = process_pdf(minio_file)

        # LAYOUT
        publish_update(task_id, "vision.layout.started",
                       "Running layout model", 72)
        raw_result = layout.predict(file)

        publish_update(task_id, "vision.layout.completed",
                       "Layout extracted", 86)

        publish_update(task_id, "vision.preprocess.completed",
                       f"{raw_result}", 100)

        return raw_result
    except Exception as e:
        publish_update(task_id, "vision.job.failed",
                       f"job failed because {str(e)}")
        return {"error": str(e)}


if __name__ == "__main__":
    runpod.serverless.start({'handler': layout_parse})
