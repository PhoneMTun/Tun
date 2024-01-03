from Tun_server.config.mysqlconnection import connectToMySQL

DB='tun'

class Warehouse:
    def __init__(self, data):
        self.id = data['id']
        self.location = data['location']
        self.level = data['level']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def save(cls, data):
        query = """
            INSERT INTO warehouses ( location, level, created_at, updated_at)
            VALUES ( %(location)s, %(level)s, NOW(), NOW())
        """
        return connectToMySQL(DB).query_db(query, data)
    
    @classmethod
    def get_all(cls):
        query = "SELECT * FROM warehouses"
        return connectToMySQL(DB).query_db(query)
    
    @classmethod
    def get_by_id(cls, id):
        query = "SELECT * FROM warehouses WHERE id = %(id)s;"
        results = connectToMySQL(DB).query_db(query, {'id': id})
        if results:
            return cls(results[0])
        else:
            return None