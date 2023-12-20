from Tun_server import app
from flask_cors import CORS
from Tun_server.controllers import users

CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
