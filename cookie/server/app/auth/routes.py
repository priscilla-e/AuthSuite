from flask import request, session
from werkzeug.security import check_password_hash
from app.auth import auth_bp
from app.models.user import User
from app.extensions import db


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return {'error': 'User already exists'}, 400

    new_user = User(email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return {'message': 'User created successfully'}, 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        session['user_id'] = user.id  # Store user_id in the session
        return {'message': 'Login successful'}, 200

    return {'error': 'Invalid credentials'}, 401


@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return {'message': 'Logged out successfully'}, 200