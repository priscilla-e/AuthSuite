from flask_login import login_required, current_user
from app.dashboard import dashboard_bp


@dashboard_bp.route('/dashboard')
@login_required
def dashboard():
    return {
        'message': 'Welcome to the dashboard',
        'user': {
            'id': current_user.id,
            'email': current_user.email
        }
    }