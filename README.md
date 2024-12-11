## Task Management (backend)

###Features
1. User Authentication:
    - Register and login via jwt
    - password hashed via bcrypt

2. UserProfileManagement:
   - Update user details (name, email)
   - upload profile pictures to Cloudinary

3. Task Management:
   - Create, update and delete tasks
   - Fetch all tasks for a logged-in user.

4. Secure API
   - Protected routes using JWT middleware

### Future scopes
1. Dockerize the backend.
2. Make backend scalable using kubernetes cluster.
3. Use validations using 'joi' package.
4. Use CSRF protection middleare to prevent requests coming from sources other than client.
5. Shift database to postgres and use sequilize as the ORM.
