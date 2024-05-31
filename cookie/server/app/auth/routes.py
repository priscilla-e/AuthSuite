from app.auth import auth_bp


@auth_bp.route('/register', methods=['POST'])
def register():
    return 'Register'


@auth_bp.route('/login', methods=['POST'])
def login():
    return 'Login'


@auth_bp.route('/logout', methods=['POST'])
def logout():
    return 'Logout'