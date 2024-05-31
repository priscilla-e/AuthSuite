from flask import request, session
from flask_login import login_required, login_user, logout_user
from app.auth import auth_bp
from app.models.user import User
from app.extensions import db, login_manager


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@login_manager.unauthorized_handler
def unauthorized():
    return {"error": 'Unauthorized'}, 401


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        login_user(user)  # Log the user in
        session.permanent = True
        return {'message': 'Login successful'}, 200

    return {'error': 'Invalid credentials'}, 401


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


@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return {'message': 'Logged out successfully'}, 200
