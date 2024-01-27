from flask import jsonify, request
from Tun_server.models.income_statement import Income_Statement
from Tun_server import app
from Tun_server.models.chat import Chat

@app.route('/chat/send', methods=['POST'])
def send_message():
    data = request.get_json()
    Chat.save({
        'message': data['message'],
        'users_id': data['users_id'],
        'warehouses_id': data['warehouses_id']
    })
    return jsonify({'status': 'success', 'message': 'Message sent'})

@app.route('/chat/history/<int:warehouse_id>', methods=['GET'])
def get_history(warehouse_id):
    chat_history = Chat.get_chat_history(warehouse_id)
    return jsonify(chat_history)

