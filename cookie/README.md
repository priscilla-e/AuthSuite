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


## Potential Problems with Traditional Cookie-Based Authentication

### Security Concerns

1. **Cross-Site Scripting (XSS)**: If an attacker can inject malicious scripts into your application, they can potentially steal cookies, including session cookies, leading to session hijacking.

2. **Cross-Site Request Forgery (CSRF)**: Attackers can exploit authenticated sessions to perform unauthorized actions on behalf of the user. Mitigating CSRF requires additional measures such as CSRF tokens.

3. **Session Fixation**: Attackers can set a known session ID in the user's browser, forcing them to use a session controlled by the attacker.

4. **Cookie Theft**: If an attacker can steal the session cookie, they can impersonate the user without needing to know the password.

### Scalability and Performance

1. **Server-Side Session Storage**: Traditional cookie-based sessions store session data on the server, which can become a scalability bottleneck. As the number of users grows, the session store (e.g., in-memory store, database) must handle more data, potentially leading to performance issues.

2. **Sticky Sessions**: In a distributed system, you may need to implement sticky sessions (ensuring the user is always routed to the same server) to maintain session state, which complicates load balancing and scaling.

### Complexity in Stateless Environments

1. **Microservices Architecture**: Managing session state in a stateless, microservices environment can be challenging. Each service would need access to the session store, introducing complexity and potential points of failure.

### User Experience

1. **Session Expiry and User Frustration**: If sessions expire too quickly due to inactivity, users may need to log in frequently, leading to a poor user experience. Conversely, long session durations can increase the risk of unauthorized access if the user forgets to log out

2. **Session Management**: Users who access your application from multiple devices or browsers might face issues with session management, as each device/browser would maintain its own session.


## Alternatives to Traditional Cookie-Based Authentication

### JSON Web Tokens (JWT)
To address some of these issues, many modern applications use token-based authentication mechanisms, such as JSON Web Tokens (JWT). 

- JWTs are self-contained and do not require server-side session storage, making them ideal for stateless applications and microservices.
- Since JWTs do not require server-side storage, they scale well in distributed environments without the need for sticky sessions.
- JWTs can be easily passed in HTTP headers, making them suitable for both browser-based and API-based applications.
- JWTs can contain user information (claims), reducing the need to query the database for each request.
- JWTs can be signed and encrypted to prevent tampering and ensure data integrity.