from Tun_server.config.mysqlconnection import connectToMySQL

DB='tun'

class Chat:
    def __init__(self,data):
        self.id = data['id']
        self.message = data['message']
        self.warehouses_id = data['warehouses_id']
        self.users_id = data['users_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

        
    @classmethod
    def save(cls, data):
        query = "INSERT INTO chats (message, users_id, warehouses_id, created_at, updated_at) VALUES (%(message)s, %(users_id)s, %(warehouses_id)s, NOW(), NOW());"
        return connectToMySQL(DB).query_db(query, data)


    @classmethod
    def get_chat_history(cls, warehouse_id):
        query = """
            SELECT
                *
            FROM
                chats
            JOIN
                users ON chats.users_id = users.id
            JOIN
                warehouses ON chats.warehouses_id = warehouses.id
            WHERE
                chats.warehouses_id = %(warehouse_id)s;
        """
        results = connectToMySQL(DB).query_db(query, {'warehouse_id': warehouse_id})
        print(results)
        chat_history = []
        for result in results:
            user_data = {
                'id': result['users.id'],
                'first_name': result['first_name'],
            }
            warehouse_data = {
                'id': result['warehouses.id'],
                'location': result['location']
            }
            chat_data = {
                'id': result['id'],
                'message': result['message'],
                'created_at': result['created_at'],
                'updated_at': result['updated_at'],
                'user': user_data,
                'warehouse': warehouse_data
            }
            chat_history.append(chat_data)
        return chat_history

        