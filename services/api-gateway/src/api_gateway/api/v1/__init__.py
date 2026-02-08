from flask import Blueprint
from .endpoints import endpoints

v1 = Blueprint('v1',__name__, url_prefix='/v1')

v1.register_blueprint(endpoints)
