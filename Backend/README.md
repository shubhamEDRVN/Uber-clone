# API Endpoint: /users/register

## Description
This endpoint registers a new user by validating input data, hashing the password, and storing the user in the database. Upon successful registration, a JWT token is generated for authentication.

## HTTP Method
POST

## URL
/users/register

## Request Body
- **fullname** (object)
  - **firstname** (string, required)
  - **lastname** (string, required)
- **email** (string, required; must be a valid email)
- **password** (string, required; minimum 3 characters)

## Success Response
- **Status Code:** 201 Created
- **Response Body:**
  - **token:** JWT token for the authenticated user.
  - **user:** The user object containing registered user details.

## Error Responses
- **Status Code:** 400 Bad Request
  - **Response Body:** JSON object with an `errors` array detailing validation issues.
- Other status codes (e.g., 500) may be returned for server errors.

## Additional Information
- Passwords are hashed using bcrypt before being stored.
- JWT tokens are generated using a secret key defined in the environment variables.