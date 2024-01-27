# Tun_server/__init__.py
from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'SHHHHH'
UPLOAD_FOLDER = 'Tun_client\\public\\product_pictures'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

socketio = SocketIO(app, cors_allowed_origins="*")  # Allow all origins
