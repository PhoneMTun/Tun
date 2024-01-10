from flask import request, jsonify
from Tun_server.models.pointofsale import PointofSale
from Tun_server.models.inventory import Inventory
from Tun_server import app
import json


@app.route('/create/point-of-sale', methods=['POST'])
def create_point_of_sale():
    data = request.json
    try:
        for item in data['items']:
            decrement_result =Inventory.decrement_stock(item['id'], item['quantity'])
            if "error" in decrement_result:
                return jsonify({"error": decrement_result["error"]}), 400
        # Serialize 'items' list to a JSON string before saving
        data['items'] = json.dumps(data['items'])

        # Save the Point of Sale record
        pos_id = PointofSale.save(data)
        return jsonify({'message': 'Point of Sale created successfully', 'pos_id': pos_id}), 201

    except Exception as e:
        app.logger.error(f"Database error: {e}")
        return jsonify({'error': 'Database operation failed'}), 500


@app.route('/update/point-of-sale/<int:pos_id>', methods=['PATCH'])
def update_point_of_sale(pos_id):
    data = {
        'id': pos_id,
        'total': request.json.get('total'),
        'customer_id': request.json.get('customer_id'),
        'income_statement_id': request.json.get('income_statement_id'),
        'user_id': request.json.get('user_id')
    }
    try:
        success = PointofSale.update(data)
        if success:
            return jsonify({'message': 'Point of Sale updated successfully'}), 200
        else:
            return jsonify({'error': 'Failed to update Point of Sale'}), 500
    except Exception as e:
        app.logger.error(f"Database error: {e}")
        return jsonify({'error': 'Database operation failed'}), 500
