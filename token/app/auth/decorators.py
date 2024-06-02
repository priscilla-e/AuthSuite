from functools import wraps
from flask import request, current_app, g
import jwt
from app.models.user import User


def token_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.cookies.get('auth-token')
        if not token:
            return {'error': 'Token is missing!'}, 401
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            g.current_user = User.query.get(int(data['user']))
        except jwt.ExpiredSignatureError:
            return {'error': 'Token has expired!'}, 403
        except jwt.InvalidTokenError:
            return {'error': 'Invalid token!'}, 403
        return func(*args, **kwargs)
    return wrapper
