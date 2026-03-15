from flask import jsonify
import pika
import logger
import time

if __name__ == '__main__':

    params = pika.ConnectionParameters('localhost')
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    queue = channel.queue_declare(queue='vision')

    def callback(ch, method, props, body):
        logger.log(body)
        time.sleep(10)
        body = {'message': 'Processing Done.'}
        ch.basic_publish(
            exchange='',
            routing_key=props.reply_to,
            body=jsonify(body)
        )
        return logger.log(body)

    channel.basic_consume(
        queue='vision',
        on_message_callback=callback,
        auto_ack=True
    )

    channel.start_consuming()
