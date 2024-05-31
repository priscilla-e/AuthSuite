from app.dashboard import dashboard_bp
from flask import session
from app.models.user import User


@dashboard_bp.route('/dashboard')
def dashboard():
    if 'user_id' in session:  # Check if user_id is in the session
        user = User.query.get(session['user_id'])  # Retrieve user from the database
        return {'message': f'Welcome {user.email}'}
    return {'message': 'Unauthorized'}, 401
