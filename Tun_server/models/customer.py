from Tun_server.config.mysqlconnection import connectToMySQL

DB='tun'

class Customer:
    def __init__(self,data):
        self.id = data['id']
        self.name = data['name']
        self.location = data['location']
        self.phoneno = data['phoneno']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def save(cls,data):
        query = """
                Insert into customers (name,location,phoneno, created_at,updated_at) 
                values(%(name)s,%(location)s,%(phoneno)s, NOW(), NOW());
                """
        return connectToMySQL(DB).query_db(query,data)
    
    @classmethod
    def get_all(cls):
        query= "Select * from customers"
        return connectToMySQL(DB).query_db(query)
    
    @classmethod
    def get_by_id(cls,id):
        query = "Select * from customers where id = %(id)s"
        results = connectToMySQL(DB).query_db(query,{'id':id})
        if results:
            return cls(results[0])
        else:
            return None
    @classmethod
    def update(cls, customer_id, data):
        query = """
            UPDATE customers
            SET name=%(name)s, location=%(location)s, phoneno=%(phoneno)s, updated_at=NOW()
            WHERE id=%(id)s;
        """
        data['id'] = customer_id
        return  connectToMySQL(DB).query_db(query, data)
         
    

