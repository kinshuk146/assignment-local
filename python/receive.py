import pika, sys, os
from pymongo import MongoClient
import json


client = MongoClient("mongodb://localhost:27017/") 
db = client.test_database

def main():
    print('Hello')
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        channel = connection.channel()
        channel.queue_declare(queue='tasks')
        
        def callback(ch, method, properties, body):
            print(json.loads(body))
            fields=db.fields
            fields.insert_one(json.loads(body))
        
    
        channel.basic_consume(queue='tasks', on_message_callback=callback, auto_ack=True)
        print(' [*] Waiting for messages. To exit press CTRL+C')
        channel.start_consuming()
    
    except Exception as e:
        print(e)

main()