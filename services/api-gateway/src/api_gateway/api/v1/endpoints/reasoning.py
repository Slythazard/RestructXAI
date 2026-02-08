from flask import Blueprint

reason = Blueprint('reason',__name__)

@reason.route('/')
def main_handler():
    return "This is reasoning url"
