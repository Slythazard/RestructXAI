from pydantic import BaseModel
from typing import Optional


class TaskUpdateEvent(BaseModel):
    task_id: str
    status: str
    message: str
    progress: Optional[int] = None
