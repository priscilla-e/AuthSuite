from flask import Flask
from config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    register_extensions(app)
    register_blueprints(app)
    
    return app


def register_extensions(flask_app):
    from app.extensions import db, login_manager, cors
    from app.models.user import User

    login_manager.init_app(flask_app)
    cors.init_app(flask_app)

    with flask_app.app_context():
        db.init_app(flask_app)
        db.create_all()
    
    
def register_blueprints(flask_app):
    from app.auth import auth_bp
    from app.dashboard import dashboard_bp
    
    flask_app.register_blueprint(auth_bp, url_prefix='/auth')
    flask_app.register_blueprint(dashboard_bp)
