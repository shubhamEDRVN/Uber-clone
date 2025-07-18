# API Endpoints

## /users/register

### Description
This endpoint registers a new user by validating input data, hashing the password, and storing the user in the database. Upon successful registration, a JWT token is generated for authentication.

### HTTP Method
POST

### URL
/users/register

### Request Body
- **fullname** (object)
  - **firstname** (string, required)
  - **lastname** (string, required)
- **email** (string, required; must be a valid email)
- **password** (string, required; minimum 3 characters)

### Success Response
- **Status Code:** 201 Created
- **Response Body:**
  - **token:** JWT token for the authenticated user.
  - **user:** The user object containing registered user details.

### Error Responses
- **Status Code:** 400 Bad Request
  - **Response Body:** JSON object with an `errors` array detailing validation issues.
- Other status codes (e.g., 500) may be returned for server errors.

### Additional Information
- Passwords are hashed using bcrypt before being stored.
- JWT tokens are generated using a secret key defined in the environment variables.

---

## /users/login

### Description
This endpoint logs in an existing user by validating the credentials. It verifies the provided password against the stored hashed password and, upon successful authentication, returns a JWT token along with the user details.

### HTTP Method
POST

### URL
/users/login

### Request Body
- **email** (string, required; must be a valid email)
- **password** (string, required)

### Success Response
- **Status Code:** 200 OK
- **Response Body:**
  - **token:** JWT token for the authenticated user.
  - **user:** The user object with user details.

### Error Responses
- **Status Code:** 400 Bad Request
  - **Response Body:** JSON object with an `errors` array detailing validation issues.
- **Status Code:** 401 Unauthorized
  - **Response Body:** JSON object with a message indicating invalid credentials.
- Other status codes (e.g., 500) may be returned for server errors.

---

## /users/profile

### Description
This endpoint retrieves the authenticated user's profile information. It requires a valid JWT token for authentication.

### HTTP Method
GET

### URL
/users/profile

### Headers Required
- **Authorization**: Bearer <token>
  - The JWT token received from login/register must be included in the Authorization header

### Success Response
- **Status Code:** 200 OK
- **Response Body:** User object containing:
  - **fullname**: Object containing firstname and lastname
  - **email**: User's email address
  - **_id**: User's unique identifier

### Error Responses
- **Status Code:** 401 Unauthorized
  - When token is missing: `{ "message": "Unauthorized" }`
  - When token is invalid: `{ "message": "Unauthorized" }`
  - When user not found: `{ "message": "Unauthorized user" }`

### Additional Information
- This endpoint requires authentication using the auth middleware
- The token must not be blacklisted
- Token expiration is set to 24 hours

---

## /users/logout

### Description
This endpoint logs out the user by blacklisting their current JWT token and clearing the token cookie.

### HTTP Method
GET

### URL
/users/logout

### Headers Required
- **Authorization**: Bearer <token>
  - The JWT token received from login/register must be included in the Authorization header

### Success Response
- **Status Code:** 200 OK
- **Response Body:**
  ```json
  { "message": "Logged out successfully" }
  ```

### Error Responses
- **Status Code:** 401 Unauthorized
  - When token is missing: `{ "message": "Unauthorized" }`
  - When token is invalid: `{ "message": "Unauthorized" }`

### Additional Information
- The token will be added to the blacklist collection
- Blacklisted tokens expire after 24 hours
- Subsequent requests with the same token will be rejected