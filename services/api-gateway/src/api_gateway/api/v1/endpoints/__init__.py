from flask import Blueprint, jsonify
from .reasoning import reason
from .vision_out import vision
from .ingestion import ingestion

endpoints = Blueprint('endpoints', __name__, url_prefix='/endpoints')

endpoints.register_blueprint(vision, url_prefix='/vision')
endpoints.register_blueprint(reason, url_prefix='/reason')
endpoints.register_blueprint(ingestion, url_prefix='/ingestion')


@endpoints.route('/')
def main_handler():
    return jsonify("This is the endpoints")
