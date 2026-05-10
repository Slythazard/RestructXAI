from typing import Optional
from core.schemas.events import TaskUpdateEvent
from .event_bus import event_bus
import logging

logger = logging.getLogger(__name__)


def publish_task_update(
    task_id: str, status: str, message: str, progress: Optional[int] = None
):
    try:
        event = TaskUpdateEvent(
            task_id=task_id, status=status, message=message, progress=progress
        )
        event_bus.publish(event.model_dump())
    except Exception as e:
        logger.warning(f"Event failed to publish : {e}")
