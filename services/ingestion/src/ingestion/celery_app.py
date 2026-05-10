from celery import Celery
from core.config.settings import settings

celery = Celery(
    "ingestion", broker=settings.RABBITMQ_SERVER_URL, backend=settings.REDIS_SERVER_URL
)

celery.conf.task_default_queue = "ingestion"
celery.autodiscover_tasks(["ingestion.tasks"])


def app():
    argv = ["worker", "--loglevel=info"]
    celery.worker_main(argv=argv)


if __name__ == "__main__":
    app()
