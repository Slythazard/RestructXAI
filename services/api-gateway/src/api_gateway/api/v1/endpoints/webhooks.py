from flask import Blueprint

webhooks = Blueprint('webhook', __name__)


@webhooks.route('/runpod')
def runpod_res():
    return "This is runpod result"
