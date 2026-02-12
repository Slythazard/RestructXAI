from celery import Celery

celery_app = Celery(
    "restructxai",
    broker="amqp://guest:guest@localhost:5672//",
    backend="redis://localhost:6379/0",
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

celery_app.autodiscover_tasks(["api_gateway.tasks"])
