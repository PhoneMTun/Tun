from Tun_server.config.mysqlconnection import connectToMySQL
from Tun_server.models.income_statement import Income_Statement

DB = 'tun'

class PointofSale:
    def __init__(self, data):
        self.id = data['id']
        self.items = data['items']
        self.discount = data['discount']  
        self.total = data['total']
        self.customer_id = None
        self.income_statement_id = data.get('income_statement_id')
        self.user_id = data.get('user_id')
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def save(cls, data):
        if data.get('customer_id') == '':
            data['customer_id'] = None
        query = """
            INSERT INTO pointofsale (items, discount, total, customer_id, income_statement_id, user_id, created_at, updated_at)
            VALUES (%(items)s, %(discount)s, %(total)s, %(customer_id)s, %(income_statement_id)s, %(user_id)s, NOW(), NOW());
        """
        return connectToMySQL(DB).query_db(query, data)

    @classmethod
    def get_all(cls):
        query = """
            SELECT 
                pointofsale.*,
                customers.id AS customer_id,
                customers.name AS customer_name
            FROM 
                pointofsale
            LEFT JOIN 
                customers ON pointofsale.customer_id = customers.id
            ORDER BY 
                pointofsale.created_at DESC;
        """
        results = connectToMySQL(DB).query_db(query)
        point_of_sales = []
        for result in results:
            customer_data = {
                'id': result['customer_id'],
                'name': result['customer_name']
            }
            point_of_sale_data = {
                'id': result['id'],
                'items': result['items'],
                'discount': result['discount'],
                'total': result['total'],
                'customer': customer_data,
                'income_statement_id': result.get('income_statement_id'),
                'user_id': result.get('user_id'),
                'created_at': result['created_at'],
                'updated_at': result['updated_at']
            }
            point_of_sales.append(point_of_sale_data)

        return point_of_sales
    
    @classmethod
    def get_latest(cls):
        query = """
            SELECT 
                pointofsale.*, 
                income_statement.total AS income_statement_total,
                income_statement.created_at AS income_statement_created_at,
                income_statement.updated_at AS income_statement_updated_at
            FROM 
                pointofsale
            LEFT JOIN 
                income_statement ON pointofsale.income_statement_id = income_statement.id
            ORDER BY 
                pointofsale.created_at DESC
            LIMIT 1;
        """
        results = connectToMySQL(DB).query_db(query)
        if results:
            result = results[0]
            income_statement_data = {
                'id': result['income_statement_id'],
                'total': result['income_statement_total'],
                'created_at': result['income_statement_created_at'],
                'updated_at': result['income_statement_updated_at']
            }
            point_of_sale_data = {
                'id': result['id'],
                'items': result['items'],
                'discount': result['discount'],
                'total': result['total'],
                'customer_id': result['customer_id'],
                'user_id': result['user_id'],
                'income_statement': income_statement_data,
                'created_at': result['created_at'],
                'updated_at': result['updated_at']
            }
            return point_of_sale_data
        else:
            return None


    @classmethod
    def update(cls, data):
        query = """
            UPDATE pointofsale
            SET items=%(items)s, discount=%(discount)s, total=%(total)s, customer_id=%(customer_id)s,
                income_statement_id=%(income_statement_id)s, user_id=%(user_id)s, updated_at=NOW()
            WHERE id=%(id)s;
        """
        return connectToMySQL(DB).query_db(query, data)

    @classmethod
    def delete(cls, pos_id):
        try:
            query = "DELETE FROM pointofsale WHERE id = %(id)s;"
            return connectToMySQL(DB).query_db(query, {'id': pos_id})
        except Exception as e:
            print(f"Error deleting Point of Sale record: {e}")
    
    @classmethod
    def get_by_id(cls, pos_id):
        query = "SELECT * FROM pointofsale WHERE id = %(id)s;"
        result = connectToMySQL(DB).query_db(query, {'id': pos_id})
        if result:
            return cls(result[0])
        else:
            return None

