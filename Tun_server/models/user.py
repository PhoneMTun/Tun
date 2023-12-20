from Tun_server.config.mysqlconnection import connectToMySQL
import re

DB='tun'

class User:
    def __init__(self, data):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def save(cls,data):
        query = "insert into users (first_name, last_name, email, password) values(%(first_name)s, %(last_name)s,%(email)s, %(password)s);"
        results= connectToMySQL(DB).query_db(query,data)
        return results
    
    @classmethod
    def update(cls, data):
        try:
            query = """
                UPDATE users 
                SET 
                    first_name = %(first_name)s, 
                    last_name = %(last_name)s, 
                    email = %(email)s, 
                    password = %(password)s
                WHERE id = %(id)s;
            """
            result = connectToMySQL(DB).query_db(query, data)
            return True
        except Exception as e:
            print(f"Update failed: {e}")
            return False

    
    @classmethod
    def get_all(cls):
        query = "SELECT * FROM users;"
        results = connectToMySQL(DB).query_db(query)
        users = []
        for user_data in results:
            users.append( user_data )
        return users
    
    
    @classmethod
    def email_exists(cls, email):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        data = {'email': email}
        results = connectToMySQL(DB).query_db(query, data)
        return results
    
    @classmethod
    def get_by_email(cls,data):
        query="""Select * from users where email = %(email)s;"""
        results= connectToMySQL(DB).query_db(query,data)
        print(results)
        if len(results) <1:
            return False
        return cls(results[0])
    
    @classmethod
    def get_by_id(cls, id):
        query = "SELECT * FROM users WHERE id = %(id)s;"
        results = connectToMySQL(DB).query_db(query, {'id': id})
        if len(results) > 0:
            return cls(results[0])  # Convert the result to User instance
        else:
            return None
    

    @staticmethod
    def validate_user(user, update= False):
        errors = {}
        is_valid = True

        if len(user['first_name']) < 2:
            errors['first_name'] = "First Name should be at least 2 characters."
            is_valid = False

        if len(user['last_name']) < 2:
            errors['last_name'] = "Last Name should be at least 2 characters."
            is_valid = False

        if not update or ('new_password' in user and 'confirm_password' in user):
            if user.get('new_password') != user.get('confirm_password'):
                errors['password'] = "Passwords do not match!"
                is_valid = False

        if not update:
            if User.email_exists(user['email']):
                errors['email'] = "Email already exists."
                is_valid = False

            elif not re.match(r"[^@]+@[^@]+\.[^@]+", user['email']):
                errors['email'] = "Invalid email format."
                is_valid = False


        if is_valid:
            return True, None
        else:
            return False, errors

