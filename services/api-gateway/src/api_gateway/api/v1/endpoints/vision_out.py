from flask import Blueprint, jsonify
from api_gateway.sockets import sio

vision = Blueprint('vision', __name__)


@vision.route('/')
def main_handler():
    sio.emit('vision', data={'message': 'vision is working'})
    return jsonify({'message': 'this is vision endpoint'})
