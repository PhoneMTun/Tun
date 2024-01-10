from Tun_server.config.mysqlconnection import connectToMySQL
from Tun_server.models.inventory import Inventory

DB='tun'
class PointofSale:
    def __init__(self, data):
        self.id = data['id']
        self.items = data['items']
        self.total = data['total']
        self.customer = None
        self.income_statement = None
        self.user = None
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def save(cls, data):
            query = """
                INSERT INTO pointofsale (items, total, customer_id, income_statement_id,user_id, created_at, updated_at)
                VALUES (%(items)s, %(total)s, %(customer_id)s,  %(income_statement_id)s,%(user_id)s, NOW(), NOW());
            """
            return  connectToMySQL(DB).query_db(query, data)
    
    @classmethod
    def update(cls, data):
        query = """
            UPDATE pointofsale
            SET total=%(total)s, customer_id=%(customer_id)s, income_statement_id=%(income_statement_id)s, 
                user_id=%(user_id)s, updated_at=NOW()
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
            return False
        
    # @classmethod
    # def get_all(cls):
    #     query = """
    #         SELECT 
    #             point_of_sales.id as pos_id, point_of_sales.total, point_of_sales.created_at as pos_created_at, point_of_sales.updated_at as pos_updated_at,
    #             inventories.*, 
    #             customers.name as customer_name, customers.location as customer_location, customers.phoneno as customer_phoneno,
    #             income_statements.total as income_statement_total
    #         FROM point_of_sales
    #         JOIN inventories ON point_of_sales.inventory_id = inventories.id
    #         JOIN customers ON point_of_sales.customer_id = customers.id
    #         LEFT JOIN income_statements ON point_of_sales.income_statement_id = income_statements.id;
    #     """
    #     results = connectToMySQL(DB).query_db(query)
    #     pos_records = []
    #     for result in results:
    #         inventory_data = {
    #             'id': result['inventories.id'],
    #             'sku': result['sku'],
    #             'name': result['name']
    #             # ... other inventory fields
    #         }
    #         customer_data = {
    #             'id': result['customers.id'],
    #             'name': result['customer_name'],
    #             'location': result['customer_location'],
    #             'phoneno': result['customer_phoneno']
    #         }
    #         income_statement_data = {
    #             'total': result['income_statement_total']
    #         }

    #         pos_data = {
    #             'id': result['id'],
    #             'total': result['total'],
    #             'inventory': inventory_data,
    #             'customer': customer_data,
    #             'income_statement': income_statement_data,
    #             'created_at': result['pos_created_at'],
    #             'updated_at': result['pos_updated_at']
    #         }
    #         pos_records.append(pos_data)
    #     return pos_records
