from Tun_server.config.mysqlconnection import connectToMySQL
from Tun_server.models.user import User
from Tun_server.models.warehouses import Warehouse

DB='tun'

class Inventory:
    def __init__(self, data):
        self.id = data['id']
        self.sku = data['sku']
        self.name = data['name']
        self.color = data['color']
        self.sizes = data['sizes']
        self.prices = data['prices']
        self.quantity = data['quantity']
        self.quantity_per_packet = data['quantity_per_packet']
        self.image_url = data['image_url']
        self.type = data['type']
        self.warehouse = None
        self.user = None
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']


    @classmethod
    def save(cls, data):
        query = """
            INSERT INTO inventories (sku, name, color, sizes, prices,
                quantity, quantity_per_packet, image_url, type, warehouse_id, user_id,
                created_at, updated_at)
            VALUES (%(sku)s, %(name)s, %(color)s, %(sizes)s, %(prices)s,
                %(quantity)s, %(quantity_per_packet)s, %(image_url)s, %(type)s, %(warehouse_id)s,
                %(user_id)s, NOW(), NOW())
        """
        return connectToMySQL(DB).query_db(query, data)
    
    @classmethod
    def update(cls, data):
        query = """
            UPDATE inventories
            SET sku=%(sku)s, name=%(name)s, color=%(color)s, sizes=%(sizes)s,
                prices=%(prices)s, quantity=%(quantity)s, %(quantity_per_packet)s, image_url=%(image_url)s,
                type=%(type)s, warehouse_id=%(warehouse_id)s, user_id=%(user_id)s,
                admin_id=%(admin_id)s, updated_at=NOW()
            WHERE id=%(id)s
        """
        return connectToMySQL(DB).query_db(query, data)
        
    @classmethod
    def get_all(cls):
        query = """
            SELECT 
            *
            FROM 
                inventories
            JOIN 
                warehouses ON inventories.warehouse_id = warehouses.id
            JOIN 
                users ON inventories.user_id = users.id;
        """
        results = connectToMySQL(DB).query_db(query)
        # print(results)
        inventories = []
        for result in results:
            warehouse_data = {
                'id': result['warehouses.id'],
                'location': result['location'],
                'level': result['level'],
                'created_at': result['warehouses.created_at'],
                'updated_at': result['warehouses.updated_at']
            }
            user_data = {
                'id': result['users.id'],
                'first_name': result['first_name'],
                'last_name': result['last_name'],
                'role': result['role'],
                'email': result['email'],
                'password': result['password'],
                'created_at': result['users.created_at'],
                'updated_at': result['users.updated_at']
            }
            inventory_data = {
                'id': result['id'],
                'sku': result['sku'],
                'name': result['name'],
                'color': result['color'],
                'sizes': result['sizes'],
                'prices': result['prices'],
                'quantity':result['quantity'],
                'quantity_per_packet':result['quantity_per_packet'],
                'image_url':result['image_url'],
                'warehouse' : warehouse_data,
                'userdata': user_data,
                'type':result['type'],
                'created_at': result['created_at'],
                'updated_at': result['updated_at']
            }
            inventories.append(inventory_data)

        return inventories
    

    @classmethod
    def delete(cls, inventory_id):
        try:
            query = "DELETE FROM inventories WHERE id = %(id)s;"
            result = connectToMySQL(DB).query_db(query, {'id': inventory_id})
            return True 
        except Exception as e:
            print(f"Error deleting inventory: {e}")
            return False  


    
    @classmethod
    def get_by_id(cls, id):
        query = "SELECT * FROM inventories WHERE id = %(id)s;"
        results = connectToMySQL(DB).query_db(query, {'id': id})
        if results:
            return cls(results[0])
        else:
            return None
        
