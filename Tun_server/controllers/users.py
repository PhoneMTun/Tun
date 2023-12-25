from Tun_server.models.user import User
from Tun_server import app
from flask import  jsonify, request, session
from flask_bcrypt import Bcrypt 


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
    user = User.get_by_email(request.form['email'])   
    if not user:
        flash("Invalid Email", "login")
        return redirect('/login')  # Redirect to login page on error
    
    if not bcrypt.check_password_hash(user.password, request.form['password']):
        flash("Invalid Password", "login")
        return redirect('/login')  # Redirect to login page on error
    
    session['user_id'] = user.id
    session['first_name'] = user.first_name
    
    return redirect('/welcome')
                       

