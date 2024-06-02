from app.main import main_bp
from app.auth import token_required
from flask import g


@main_bp.route('/')
@token_required
def home():
    current_user = g.current_user

    return {'message': f'Welcome to the home page!',
            'user': {
                'id': current_user.id,
                'email': current_user.email,
            }}
