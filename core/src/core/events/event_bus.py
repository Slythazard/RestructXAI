from .redis_event_bus import RedisEventBus
import redis
import os

redis_url = os.getenv("REDIS_SERVER_URL")

redis_client = redis.from_url(redis_url, decode_responses=True)

event_bus = RedisEventBus(redis_client, 'events.task_update')
