from . import sio
from ..main import app


@sio.on("connect")
def ws_connect_handler():
    app.logger.info("Hello Client")
