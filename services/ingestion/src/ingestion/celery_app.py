from celery import Celery
import os

MESSAGE_BROKER_URL = os.getenv(
    "RABBITMQ_SERVER_URL", 'amqp://localhost:5672')
REDIS_URL = os.getenv("REDIS_SERVER_URL", 'redis://localhost:6379')

celery = Celery(
    'ingestion',
    broker=MESSAGE_BROKER_URL,
    backend=REDIS_URL)

celery.autodiscover_tasks(['ingestion.tasks'])


def app():
    argv = ['worker', '--loglevel=info']
    celery.worker_main(argv=argv)


if __name__ == "__main__":
    app()
