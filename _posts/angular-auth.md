## <a name="What_is_aJWT">What is JWT?</a>

JWT stands for JSON Web Tokens and it's a way for exchanging data between computer systems. It's also used to exchange authentication information between clients and servers.

JWT is a JSON payload containing the user information (like database id, email and password etc.) which is created and encrypted in the server and sent back to the client where it gets stored in the local storage of the user's browser and attached as an **authorization header** with every request that gets sent to the server in order to access protected resources.

JWT authentication is said to be statless because the server doesn't store any state regarding the current logged-in user. 