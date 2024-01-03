from Tun_server.models.user import User
from Tun_server import app
from flask import  jsonify, request
from flask_bcrypt import Bcrypt 
import jwt
from datetime import datetime, timedelta
secret_key = 'SHHHHH'


bcrypt = Bcrypt(app)

@app.route('/users', methods= ['GET'])
def users():
    return jsonify(User.get_all())

@app.route('/create/user', methods=['POST'])
def create_user():
    data = request.json

    # # Validate user data for creation
    # is_valid, errors = User.validate_user(data)
    # if not is_valid:
    #     return jsonify({"message": "Validation failed", "errors": errors}), 400

    # # Hash the password
    # hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    # data['password'] = hashed_password

    new_password = data.get('confirm_password')
    if new_password:
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        data['password'] = hashed_password
    # Validate user data for update
    is_valid, errors = User.validate_user(data, update=False)
    if not is_valid:
        return jsonify({"message": "Validation failed", "errors": errors}), 400

    # Create a new user
    user_id = User.save(data)
    if user_id:
        return jsonify({"message": "User created successfully", "id": user_id}), 201
    else:
        return jsonify({"message": "User creation failed"}), 500


@app.route('/update/user', methods=['PATCH'])
def update_user():
    data = request.json

    # Hash the new password if provided
    new_password = data.get('confirm_password')
    if new_password:
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        data['password'] = hashed_password
    # Validate user data for update
    is_valid, errors = User.validate_user(data, update=True)
    if not is_valid:
        return jsonify({"message": "Validation failed", "errors": errors}), 400

    
    # Update the user
    success = User.update(data)
    if success:
        return jsonify({"message": "User updated successfully"}), 200
    else:
        return jsonify({"message": "User update failed"}), 500

@app.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    # Fetch the user using the provided ID
    user = User.get_by_id(user_id)
    if user:
        # Convert the User object to a dictionary
        user_dict = {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "password": user.password,
            "created_at": user.created_at,
            "updated_at": user.updated_at
        }
        return jsonify(user_dict), 200
    else:
        return jsonify({"message": "User not found"}), 404
    

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    print(data)
    user = User.get_by_email(data['email'])   
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    if not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"message": "Password incorrect"}), 401  
    
    token_payload = {
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=1)  # Token expiration time
    }
    secret_key = 'SHHHHH'  
    token = jwt.encode(token_payload, secret_key, algorithm='HS256')

    return jsonify({"message": "Log in successful", "token": token}), 200

from flask import request

@app.route('/protected', methods=['GET'])
def protected_route():
    # Get the token from the request headers
    token = request.headers.get('Authorization')

    try:
        # Decode and verify the token
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        user_id = decoded_token['user_id']

        # Your protected route logic here

        return jsonify({"message": "Protected route accessed", "user_id": user_id})
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"})
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"})


# @app.route('/login', methods=['POST'])
# def login():
#     # Get user input from request JSON
#     data = request.json

#     # Check if 'email' and 'password' are present in the request data
#     # if 'email' not in data or 'password' not in data:
#     #     return jsonify({"message": "Invalid request data"}), 400

#     # Retrieve the user based on the provided email
#     user = User.get_by_email(data['email'])
#     print(user)

#     # Check if the user exists
#     if user is None:
#         return jsonify({"message": "User not found"}), 404

#     # Check if the provided password is correct
#     if not bcrypt.check_password_hash(user.password, data['password']):
#         return jsonify({"message": "Password incorrect"}), 401

#     # Generate JWT token
#     token_payload = {
#         'user_id': user.id,
#         'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # Token expiration time
#     }
#     jwt_token = jwt.encode(token_payload, app.config['SECRET_KEY'], algorithm='HS256')

#     # Return JWT token in the response
#     return jsonify({"message": "Log in successful", "token": jwt_token.decode('utf-8')}), 200

