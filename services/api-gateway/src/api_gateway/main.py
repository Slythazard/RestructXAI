import eventlet  # noqa: F401
eventlet.monkey_patch()  # noqa: F401
from flask import Flask  # type: ignore
from .api import api  # type: ignore
import logging  # type: ignore
from .sockets import sio  # type: ignore
import os  # type:ignore
from flask_cors import CORS  # type: ignore
from .sockets.subscribers import start_subscriber


REDIS_SERVER_URL = os.getenv("REDIS_SERVER_URL", "redis://localhost:6379")

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

CORS(app)

app.register_blueprint(api)

sio.init_app(
    app,
    cors_allowed_origins="*",
    message_queue=REDIS_SERVER_URL
)

start_subscriber()


@app.route('/')
def handler():
    return "This is the API-Gateway"


def main():
    sio.run(app, host='0.0.0.0', port=5000,
            allow_unsafe_werkzeug=True)
