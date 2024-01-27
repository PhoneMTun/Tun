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

@app.route('/update/warehouse/<int:warehouse_id>', methods=['PATCH'])
def update_warehouse(warehouse_id):
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided for update'}), 400
    Warehouse.update(warehouse_id, data)
    return jsonify({'message': 'Warehouse updated successfully'})