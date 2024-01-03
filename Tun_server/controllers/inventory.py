from flask import request, jsonify
from Tun_server.models.inventory import Inventory
from Tun_server import app
from werkzeug.utils import secure_filename
import os


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/inventory', methods=['GET'])
def get_all_inventory():
    return jsonify(Inventory.get_all())


@app.route('/create/inventory', methods=['POST'])
def create_inventory():
    data = {
        'sku': request.form.get('sku'),
        'name': request.form.get('name'),
        'color': request.form.get('color'),
        'sizes': request.form.get('sizes'),
        'prices': request.form.get('prices'),
        'quantity': request.form.get('quantity'),
        'quantity_per_packet': request.form.get('quantity_per_packet'),
        'type': request.form.get('type'),
        'warehouse_id': request.form.get('warehouse_id'),
        'user_id': request.form.get('user_id')
    }

    sku = data.get('sku')
    sku_folder = os.path.join(app.config['UPLOAD_FOLDER'], sku)
    if not os.path.exists(sku_folder):
        os.makedirs(sku_folder)

    file_names = []
    if 'image_url' in request.files:
        for file in request.files.getlist('image_url'):
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file_path = os.path.join(sku_folder, filename)
                try:
                    file.save(file_path)
                    file_names.append(filename)
                    print(file_names)
                except Exception as e:
                    app.logger.error(f"File save error: {e}")
                    return jsonify({'error': 'Failed to save file'}), 500

    if file_names:
        data['image_url'] = ','.join(file_names)

    try:
        inventory_id = Inventory.save(data)
        if inventory_id:
            return jsonify({'message': 'Inventory created successfully', 'inventory_id': inventory_id}), 201
        else:
            return jsonify({'message': 'Failed to create inventory'}), 500
    except Exception as e:
        app.logger.error(f"Database error: {e}")
        return jsonify({'error': 'Database operation failed'}), 500


@app.route('/update/inventory', methods=['PUT'])
def update_inventory():
    data = request.json
    if 'id' not in data or 'quantity' not in data:
        return jsonify({'error': 'ID and quantity are required fields for updating inventory'}), 400

    success = Inventory.update(data)

    if success:
        return jsonify({'message': 'Inventory updated successfully'})
    else:
        return jsonify({'error': 'Failed to update inventory'}), 500

@app.route('/inventory/sku/<string:sku>', methods=['GET'])
def get_inventory_by_sku(sku):
    inventory = Inventory.get_by_sku(sku)
    if inventory:
        return jsonify(inventory.__dict__)
    else:
        return jsonify({"message": "Inventory not found"}), 404
    
# @app.route('/delete/inventory/<int:inventory_id>', methods=['DELETE'])
# def delete_inventory(inventory_id):
#     print("Deleting:>>>", inventory_id)
#     return Inventory.delete(inventory_id)

@app.route('/delete/inventory/<int:inventory_id>', methods=['DELETE'])
def delete_inventory(inventory_id):
    print("Deleting:>>>", inventory_id)
    success = Inventory.delete(inventory_id)  # Pass inventory_id directly, not as a dictionary
    if success:
        return jsonify({'message': 'Inventory deleted successfully'}), 200
    else:
        return jsonify({'error': 'Failed to delete inventory'}), 500





