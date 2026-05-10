import os


class Settings:

    RABBITMQ_SERVER_URL = os.getenv("RABBITMQ_SERVER_URL")
    REDIS_SERVER_URL = os.getenv("REDIS_SERVER_URL")

    RUNPOD_API_ENDPOINT = os.getenv("RUNPOD_API_ENDPOINT")
    RUNPOD_API_KEY = os.getenv("RUNPOD_API_KEY")

    MINIO_SERVER_URL = os.getenv("MINIO_SERVER_URL")
    MINIO_SECRET_KEY = os.getenv("MINIO_ROOT_PASSWORD")
    MINIO_ACCESS_KEY = os.getenv("MINIO_ROOT_USER")

    BUCKET = os.getenv("BUCKET")


settings = Settings()
