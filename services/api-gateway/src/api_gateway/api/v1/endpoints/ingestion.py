from celery import Celery
from flask import Blueprint, jsonify
from api_gateway.sockets import sio
from flask_socketio import join_room
import os

ingestion = Blueprint('ingestion', __name__)

REDIS_SERVER_URL = os.getenv('REDIS_SERVER_URL', 'redis://localhost:6379')
RABBIT_SERVER_URL = os.getenv('RABBITMQ_SERVER_URL', 'amqp://localhost:5672')

celery = Celery(
    'gateway',
    broker=RABBIT_SERVER_URL,
    backend=REDIS_SERVER_URL
)


@sio.on('join_room')
def room_handler(data):
    print(data)
    print(f"room joined : {data['task_id']}")
    join_room(data["task_id"])


@ingestion.route('/')
def handler_ingestion():

    file_url = 'some_url'

    task = celery.send_task(
        'ingestion.process',
        args=[file_url]
    )

    return jsonify({
        'status': 'queued',
        'task': task.id
    })
