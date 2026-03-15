import pika

params = pika.ConnectionParameters('localhost')
connection = pika.BlockingConnection(params)
