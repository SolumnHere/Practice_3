from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

user_data = Flask(__name__)
user_data.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user_log.db'
db = SQLAlchemy(user_data)

class userData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

@user_data.route('/register', methods=['POST', 'GET'])
def register_page():
    if request.method == "POST":
        username_input = request.form.get('Username')
        password_input = request.form.get('Password')
        email_input = request.form.get('Email')

        new_user = userData(user_name=username_input, 
                            password=password_input, 
                            email=email_input)
        try:
            db.session.add(new_user)
            db.session.commit()
            return redirect('/')
        except:
            return 'Please try enter a valid username'
            
    else:
        return render_template('CougarWeb.html')

@user_data.route('/', methods=['GET'])
def index():
    tasks = userData.query.order_by(userData.date_created).all()
    return render_template('index.html', users=tasks)

if __name__ == "__main__":
    user_data.run(debug=True)   

