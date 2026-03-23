from minio import Minio
from flask_socketio import SocketIO
from vision_engine.tasks.functions import process_pdf
from vision_engine.pp_structure.main import get_layout
from vision_engine.config import REDIS_SERVER_URL, BUCKET, MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_SERVER_URL
import runpod

client = Minio(
    MINIO_SERVER_URL,
    secret_key=MINIO_SECRET_KEY,
    access_key=MINIO_ACCESS_KEY,
    secure=False
)

sio = SocketIO(message_queue=REDIS_SERVER_URL, cors_allowed_origins="*")

layout = get_layout()


def layout_parse(job):

    data = job.get("input", {})
    task_id = data.get("task_id")
    object_key = data.get("object_key")

    sio.emit('task_update', {'status': 'vision.started',
             'message': 'Analysing document....'}, to=task_id)
    minio_object = client.get_object(BUCKET, object_name=object_key)
    minio_file = minio_object.read()
    minio_object.close()
    minio_object.release_conn()

    try:
        sio.emit('task_update', {'status': 'vision.processing',
                 'message': 'Extracting Layout and Structure'}, to=task_id)
        file = process_pdf(minio_file)
        result = layout.predict(file)
        sio.emit('task_update', {'status': 'vision.success',
                                 'message': str(result)}, to=task_id)
    except Exception as e:
        sio.emit('task_update', {
                 'status': 'vision.failure', 'message': "failed to parse layout"}, to=task_id)


if __name__ == "__main__":
    runpod.serverless.start({'handler': layout_parse})
