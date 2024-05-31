from app.main import main_bp
from flask_login import current_user


@main_bp.route('/')
def home():
    return {'message': 'Welcome to the home page'}