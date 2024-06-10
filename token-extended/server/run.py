import os
from datetime import datetime, timedelta, timezone
from app import create_app
from flask_jwt_extended import get_jwt, create_access_token, set_access_cookies, current_user

app = create_app()


# JWT IMPLICIT REFRESH: Using an `after_request` callback, we refresh any token
# that is within X minutes of expiring.
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=15))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=current_user)
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response


if __name__ == '__main__':
    host = os.environ.get('HOST') or '0.0.0.0'
    port = os.environ.get('PORT') or 5000
    app.run(host=host, port=port, debug=True)
