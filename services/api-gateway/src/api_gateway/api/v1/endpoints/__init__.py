from flask import Blueprint
from .reasoning import reason
from .vision_out import vision

endpoints = Blueprint('endpoints',__name__,url_prefix='/endpoints')

endpoints.register_blueprint(vision,url_prefix='/vision')
endpoints.register_blueprint(reason,url_prefix='/reason')

@endpoints.route('/')
def main_handler():
    return "This is the endpoints"
