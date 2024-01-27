from flask import request, jsonify
from Tun_server.models.pointofsale import PointofSale
from Tun_server.models.inventory import Inventory
from Tun_server import app
import json


# If id is auto-incrementing in your database
# If you are using UUIDs
# If id is auto-incrementing in your database
@app.route('/create/point-of-sale', methods=['POST'])
def create_point_of_sale():
    data = request.json
    try:
        for item in data['items']:
            successful = Inventory.decrement_stock(item['id'], item['quantity'])
        data['items'] = json.dumps(data['items'])
        saveddata = PointofSale.save(data)
        print(saveddata)

        return jsonify({'message': saveddata}), 201
    
    except Exception as e:
        app.logger.error(f"Database error: {e}")
        return jsonify({'error': 'Database operation failed'}), 500




    
@app.route('/point-of-sale', methods=['GET'])
def get_all_point_of_sales():
    try:
        pos_records = PointofSale.get_all()
        return jsonify(pos_records), 200
    except Exception as e:
        app.logger.error(f"Database error: {e}")
        return jsonify({'error': 'Failed to fetch Point of Sale records'}), 500



@app.route('/point-of-sale/latest', methods=['GET'])
def get_latest_point_of_sale():
    latest_pos = PointofSale.get_latest()
    if latest_pos:
        return jsonify(latest_pos), 200
    else:
        return jsonify({'message': 'No Point of Sale records found'}), 404

@app.route('/point-of-sale/<int:pos_id>', methods=['GET'])
def get_point_of_sale(pos_id):
    pos_record = PointofSale.get_by_id(pos_id)
    print(pos_record)
    if pos_record:
        return jsonify({
            'id': pos_record.id,
            'items': json.loads(pos_record.items),
            'discount': pos_record.discount,
            'total': pos_record.total,
            'customer_id': pos_record.customer_id,
            'income_statement_id': pos_record.income_statement_id,
            'user_id': pos_record.user_id,
            'created_at': pos_record.created_at,
            'updated_at': pos_record.updated_at
        })
    else:
        return jsonify({'error': 'Point of Sale record not found'}), 404
