from Tun_server.config.mysqlconnection import connectToMySQL
import datetime


DB = 'tun'

class Income_Statement:
    def __init__(self, data):
        self.id = data['id']
        self.total = data['total']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def save(cls, data):
        query = """
                INSERT INTO income_statement (total, created_at, updated_at) 
                VALUES (%(total)s, NOW(), NOW());
                """
        return connectToMySQL(DB).query_db(query, data)

    @classmethod
    def get_all(cls):
        query = "SELECT * FROM income_statements"
        results = connectToMySQL(DB).query_db(query)
        return [cls(result) for result in results]

    @classmethod
    def get_by_id(cls, id):
        query = "SELECT * FROM income_statements WHERE id = %(id)s"
        results = connectToMySQL(DB).query_db(query, {'id': id})
        if results:
            return cls(results[0])
        else:
            return None
        
    @classmethod
    def get_monthly_total(cls, year, month):
        query = """
            SELECT SUM(total) AS monthly_total FROM income_statements
            WHERE YEAR(created_at) = %(year)s AND MONTH(created_at) = %(month)s;
        """
        results = connectToMySQL(DB).query_db(query, {'year': year, 'month': month})
        return results[0]['monthly_total'] if results else 0
    
    @classmethod
    def get_annual_total(cls, year):
        query = """
            SELECT SUM(total) AS annual_total FROM income_statements
            WHERE YEAR(created_at) = %(year)s;
        """
        results = connectToMySQL(DB).query_db(query, {'year': year})
        return results[0]['annual_total'] if results else 0
    
    @classmethod
    def update(cls, data):
        query = """
            UPDATE income_statements
            SET total = %(total)s, updated_at = NOW()
            WHERE id = %(id)s;
        """
        return connectToMySQL(DB).query_db(query, data)
