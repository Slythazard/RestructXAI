from celery import Celery
from core.config.settings import settings

celery = Celery('vision', broker=settings.RABBITMQ_SERVER_URL,
                backend=settings.REDIS_SERVER_URL)
celery.conf.task_default_queue = 'vision'

celery.autodiscover_tasks(['vision_engine.tasks'])


def app():
    argv = ['worker', '--loglevel=info', '--pool=solo', '-E']
    celery.worker_main(argv=argv)


if __name__ == "__main__":
    app()
