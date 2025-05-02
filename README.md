# Setting up the backend

Initial setup for the backend

1. Create DB using provided script or manual creation.
2. create .env file for the backend
3. Add db credentials to .env file using the following parameters:

- `DB_NAME` = `Name of database`
- `DB_USER` = `User for database`
- `DB_PASS` = `Database password`
- `DB_HOST` = `Address of database`
- `DB_PORT` = `Database address port`

4. Setup inital ADMIN role and user with the admin role using the script provided or manual creation
5. Add the following .env variables to the .env file

- `PORT` = `Port for of the service`
- `SECRET_TOKEN` = `string for the jwt encoding and decoding`
