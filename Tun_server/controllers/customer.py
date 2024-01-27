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
    
@app.route('/customer/<int:customer_id>', methods=['GET'])
def get_customer_by_id(customer_id):
    try:
        # Fetch the customer using the provided ID
        customer = Customer.get_by_id(customer_id)
        if customer:
            # Convert the Customer object to a dictionary
            customer_dict = {
                "id": customer.id,
                "name": customer.name,
                # Include other customer fields as needed
                "created_at": customer.created_at,
                "updated_at": customer.updated_at
            }
            return jsonify(customer_dict), 200
        else:
            return jsonify({"message": "Customer not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/update/customer/<int:customer_id>', methods=['PATCH'])
def update_customer(customer_id):
    data = request.json
    Customer.update(customer_id, data)
    return jsonify({'message': 'Customer updated successfully'}), 200

        
