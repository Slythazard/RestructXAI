from celery import Celery
from flask import Blueprint, jsonify, request, logging
from api_gateway.sockets import sio
from flask_socketio import join_room
import os
from minio import Minio
import uuid
from datetime import timedelta
import logging
from urllib.parse import urlparse, urlunparse

logger = logging.getLogger(__name__)

ingestion = Blueprint('ingestion', __name__)

REDIS_SERVER_URL = os.getenv('REDIS_SERVER_URL', 'redis://localhost:6379')
RABBIT_SERVER_URL = os.getenv('RABBITMQ_SERVER_URL', 'amqp://localhost:5672')
MINIO_ACCESS_KEY = os.getenv('MINIO_ROOT_USER')
MINIO_SECRET_KEY = os.getenv('MINIO_ROOT_PASSWORD')
MINIO_SERVER_URL = os.getenv('MINIO_SERVER_URL', "storage:9000")

celery = Celery(
    'gateway',
    broker=RABBIT_SERVER_URL,
    backend=REDIS_SERVER_URL
)

client_private = Minio(
    "miniogw:9000",
    access_key=MINIO_ACCESS_KEY,
    secret_key=MINIO_SECRET_KEY,
    secure=False
)

# client_public = Minio(
#     "localhost:9000",
#     access_key=MINIO_ACCESS_KEY,
#     secret_key=MINIO_SECRET_KEY, secure=False
#
# )

BUCKET = "uploads"


def init_bucket():
    try:
        if not client_private.bucket_exists(BUCKET):
            client_private.make_bucket(BUCKET)
            logger.info(f"Bucket '{BUCKET}' created")
        else:
            logger.info(f"Bucket '{BUCKET}' already exists")
    except Exception as e:
        logger.error(f"Bucket init failed: {e}")


init_bucket()


@sio.on('join_room')
def room_handler(data):
    print(data)
    print(f"room joined : {data['taskId']}")
    join_room(data["taskId"])


@ingestion.route('/upload', methods=['POST', 'GET', 'PUT'])
def handle_upload_url():
    file_id = str(uuid.uuid4())
    object_name = f"raw/{file_id}"

    url = client_private.presigned_put_object(
        BUCKET,
        object_name=object_name,
        expires=timedelta(minutes=10)
    )

    logger.info(url)

    # parsed = urlparse(url)
    # public_url = urlunparse(parsed._replace(
    #     netloc="localhost:9000"))

    return jsonify({
        'file_id': file_id,
        'object_key': object_name,
        'url': url
    })


@ingestion.route('/process', methods=['POST', 'GET', 'PUT'])
def handler_ingestion():

    response = request.get_json()

    logger.info(response['object_key'])

    task = celery.send_task(
        'ingestion.process', args=[response]
    )

    return jsonify({
        'status': 'queued',
        'task': task.id
    })
