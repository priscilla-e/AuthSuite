# Cookie - a server-side session authentication approach

In a traditional cookie-based session authentication strategy, the server maintains the session state and issues a session ID to the client, which is stored in a cookie. The client sends this cookie with each request to authenticate themselves. The server verifies the session ID and identifies the user.

This Flask application demonstrates how to handle user authentication using sessions, Flask-Login, and SQLite. The server side is responsible for user registration, login, session management, and authentication. This guide focuses on the server-side implementation and how it deals with authentication.

     +-------------+                                +-------------+
     |             | 1. POST /login                 |             |
     |    Client   |------------------------------->|   Server    |
     |  (Browser)  |                                |  (Flask App)|
     |             | 2. Authenticate                |             |
     |             |<-------------------------------|             |
     |             | 3. Create Session              |             |
     |             |<-------------------------------|             |
     |             | 4. Set Cookie (session_id)     |             |
     |             |<-------------------------------|             |
     |             |                                |             |
     |             | 5. Subsequent Requests         |             |
     |             | (Include Cookie)               |             |
     |             |------------------------------->|             |
     |             |                                |             |
     |             | 6. Validate Session            |             |
     |             |<-------------------------------|             |
     |             | 7. Authorized Response         |             |
     |             |<-------------------------------|             |
     +-------------+                                +-------------+


## Setup
### Requirements

- Python 3.x
- Flask
- Flask-SQLAlchemy
- Flask-Login
- Flask-CORS

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-repo/flask-auth-api.git
    cd flask-auth-api
    ```

2. **Create and activate a virtual environment**:
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install the dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

4. **Run the application**:
    ```sh
    python run.py
    ```

## Useful links

https://flask-login.readthedocs.io/en/latest/