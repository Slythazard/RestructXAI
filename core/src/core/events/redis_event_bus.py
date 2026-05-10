import json


class RedisEventBus:
    def __init__(self, redis_client, channel: str):
        self.redis_client = redis_client
        self.channel = channel

    def publish(self, data: dict):
        self.redis_client.publish(self.channel, json.dumps(data))

    def subscribe(self, handler):
        pubsub = self.redis_client.pubsub()
        pubsub.subscribe(self.channel)

        for message in pubsub.listen():
            if message["type"] != "message":
                continue
            try:
                data = json.loads(message['data'])
                handler(data)

            except Exception as e:
                print(f"EventBus error : {e}")
