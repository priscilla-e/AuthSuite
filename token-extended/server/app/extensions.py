from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
cors = CORS(supports_credentials=True)
jwt = JWTManager()
