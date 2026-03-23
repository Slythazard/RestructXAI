from celery import Celery
import os

RABBIT_SERVER_URL = os.getenv("RABBITMQ_SERVER_URL")
REDIS_SERVER_URL = os.getenv("REDIS_SERVER_URL")

celery = Celery('vision', broker=RABBIT_SERVER_URL, backend=REDIS_SERVER_URL)
celery.conf.task_default_queue = 'vision'

celery.autodiscover_tasks(['vision_engine.tasks'])


def app():
    argv = ['worker', '--loglevel=info', '--pool=solo']
    celery.worker_main(argv=argv)


if __name__ == "__main__":
    app()
