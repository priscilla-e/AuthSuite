# Token
_A token-based user authentication system using PyJWT._

Token-based authentication is a method of authenticating users in applications where users are issued a token upon successful login. This token is then used to access protected resources. JSON Web Tokens (JWT) are commonly used for this purpose due to their simplicity and security features. Here’s a detailed explanation of token-based authentication, specifically focusing on JWT.

```
+-----------+         +-------------------+         +-----------+
|  Client   |         |   Flask Backend   |         | Database  |
|           |         | (JWT Generation)  |         |           |
+-----------+         +-------------------+         |           |
     |                     |                        |           |
     |   Login Request     |                        |           |
     |-------------------->|                        |           |
     |                     |    Verify Credentials  |           |
     |                     |----------------------->|           |
     |                     |                        | User Data |
     |    JWT (Token)      |<-----------------------|           |
     |<--------------------|<-----------------------|           |
     |                     |                        |           |
     |    Store Token      |                        |           |
     |      (Securely)     |                        |           |
     |                     |                        |           |
     |   API Requests      |                        |           |
     |  (with Token)       |                        |           |
     |-------------------->|                        |           |
     |                     |    Validate JWT        |           |
     |                     |----------------------->|           |
     |                     |                        |           |
     |    API Response     |<-----------------------|           |
     |<--------------------|<-----------------------|           |
     |                     |                        |           |
+-----------+         +-------------------+         +-----------+

```

## Setup

### Requirements
- Python 3.x
- Flask
- Flask-SQLAlchemy
- PyJWT
- Flask-CORS

### Installation
1. **Clone the repository**:
    ```sh
    cd token
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

4. **Set the environment variables**:
 Rename the `.env.example` file to `.env` and set the following environment variables

4. **Run the application**:
    ```sh
    python run.py
    ```
