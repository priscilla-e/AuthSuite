from app.dashboard import dashboard_bp


# TODO: Add authentication check
@dashboard_bp.route('/dashboard')
def dashboard():
    return 'Dashboard'