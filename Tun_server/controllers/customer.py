from flask import request, jsonify
from Tun_server import app
from Tun_server.models.customer import Customer

@app.route('/customers', methods=['GET'])
def get_all():
    return jsonify(Customer.get_all())

@app.route('/create/customer', methods=['POST'])
def create_warehosue():
    data = request.json
    if 'name' not in data:
        return jsonify({'error': 'Name is required'}),400
    successful = Customer.save(data)
    if successful:
        return jsonify({'success':'Cutomers created successfully' }), 200
    else:
        return jsonify({'error': 'Custoemrs creation failed'})
    
    
