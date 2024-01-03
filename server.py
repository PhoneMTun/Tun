from Tun_server import app
from flask_cors import CORS
from Tun_server.controllers import users
from Tun_server.controllers import inventory
from Tun_server.controllers import warehouse
import jwt

CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
