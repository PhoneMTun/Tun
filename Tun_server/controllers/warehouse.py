from flask import  request, jsonify
from Tun_server.models.warehouses import Warehouse
from Tun_server import app 


@app.route('/warehouses', methods=['GET'])
def get_all_warehouses():
    return jsonify(Warehouse.get_all())

@app.route('/create/warehouse', methods=['POST'])
def create_warehouse():
    data = request.json  
    if 'location' not in data:
        return jsonify({'error': 'Location is a required field for creating a warehouse'}), 400
    warehouse_id = Warehouse.save(data)
    if warehouse_id:
        return jsonify({'message': 'Warehouse created successfully', 'warehouse_id': warehouse_id})
    else:
        return jsonify({'error': 'Warehouse creation failed!'})