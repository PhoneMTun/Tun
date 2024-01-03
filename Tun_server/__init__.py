from flask import Flask


app = Flask(__name__)

app.config['SECRET_KEY'] = 'SHHHHH'
UPLOAD_FOLDER = 'Tun_client\\public\\product_pictures'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

