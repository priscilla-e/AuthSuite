import datetime
from flask import request, current_app, make_response
from app.auth import auth_bp
from app.extensions import db
from app.models.user import User
import jwt


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return {'error': 'Invalid credentials'}, 401

    token = jwt.encode(
        payload={
            'user': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=1)},
        key=current_app.config['SECRET_KEY'],
        algorithm='HS256')

    response = make_response({'message': "Login successful"})

    # Set the token as a cookie in the response - httponly=True makes sure that the cookie is not accessible via JavaScript
    # This is a security measure to prevent XSS attacks
    response.set_cookie('auth-token', token, httponly=True)

    return response


@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = make_response({'message': "Logout successful"})
    response.set_cookie('auth-token', '', expires=0)
    return response


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
