from core.events.event_bus import event_bus
from . import sio


def task_update(data):
    sio.emit('task_update', data, to=data.get("task_id"))


def start_subscriber():
    sio.start_background_task(
        event_bus.subscribe,
        task_update
    )
