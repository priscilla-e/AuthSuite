from flask import request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies, jwt_required
from flask_jwt_extended import current_user
from app.auth import auth_bp
from app.models.user import User
from app.extensions import db, jwt


# Register a callback function that takes whatever object is passed in as the
# identity when creating JWTs and converts it to a JSON serializable format.
@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


# Register a callback function that loads a user from your database whenever
# a protected route is accessed. This should return any python object on a
# successful lookup, or None if the lookup failed for any reason (for example
# if the user has been deleted from the database).
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return {'error': 'Invalid credentials'}, 401

    access_token = create_access_token(identity=user)
    response = jsonify({'msg': 'Login successful', 'access_token': access_token, 'user': user.to_dict()})
    set_access_cookies(response, access_token)

    return response, 200


@auth_bp.route('/logout', methods=['POST', 'DELETE'])
@jwt_required()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
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

    return {'msg': 'User created successfully'}, 201


@auth_bp.route('/user', methods=['GET'])
@jwt_required()
def get_current_user():
    return jsonify(current_user.to_dict())