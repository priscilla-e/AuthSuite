from app.extensions import db
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    password_hash: Mapped[str] = mapped_column(nullable=False)
    
    def __repr__(self):
        return f'<User "{self.email}">'
    
    def set_passwrord(self, password: str) -> None:
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)
    
