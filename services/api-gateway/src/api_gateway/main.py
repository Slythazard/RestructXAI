from flask import Flask
from .api import api

app = Flask(__name__)

app.register_blueprint(apii')

@app.route('/')
def handler():
    return "This is the API-Gateway"

if __name__ == "__main__":
    app.run(debug=True)
