from flask import Blueprint

vision = Blueprint('vision',__name__)

@vision.route('/')
def main_handler():
    return "This is vision url"
