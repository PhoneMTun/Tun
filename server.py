from Tun_server import app, socketio
from flask_cors import CORS
from Tun_server.controllers import users
from Tun_server.controllers import inventory
from Tun_server.controllers import warehouse
from Tun_server.controllers import customer
from Tun_server.controllers import pointofsale
from Tun_server.controllers import income_statement
from Tun_server.controllers import chat
from Tun_server.models.chat import Chat 
import jwt

CORS(app)

@socketio.on('send message')
def handle_send_message(json, callback=None):
    print('received json:', json)
    message_data = {
        'message': json.get('message'),
        'users_id': json.get('users_id'),
        'warehouses_id': json.get('warehouses_id')
    }
    saved_message = Chat.save(message_data)
    # Broadcast the saved message to other clients
    socketio.emit('new message', saved_message, broadcast=True, include_self=False)
    # Send a response back to the client who sent the message
    callback({'status': 'success', 'message': 'Message sent'})



if __name__ == "__main__":
    socketio.run(app, debug=True)
