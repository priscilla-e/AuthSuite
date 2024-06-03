from app.main import main_bp
from flask_jwt_extended import jwt_required, current_user


@main_bp.route('/', methods=['GET'])
@jwt_required()
def home():
    return {
        'message': f'Welcome to the home page!',
        'user': {
            'id': current_user.id,
            'email': current_user.email,
        }
    }