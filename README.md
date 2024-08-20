# Task Manager

- This project was completed in just 4 hours from start to finish, so please take that into consideration

### Installation

### backend
1. create a virtualenvironment, preferably with python 3.11
`virtualenv venv`
`source venv/bin/activate`
2. install requirements
`pip install -r -requirements.txt`
3. create a postgres db
```
CREATE DATABASE mynewdatabase;
CREATE USER mynewuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE mynewdatabase TO mynewuser;
```
4. add db params to a .env file for with these params
```
DB_ENGINE=django.db.backends.postgresql
DB_NAME=DB_NAME
DB_USER=DB_USER
DB_PASSWORD=DB_USER
DB_HOST=DB_HOST
DB_PORT=DB_PORT
```
5. run migrations and start the server!
`python manage.py migrate`
`python manage.py runserver`

### frontend
1. go into frontend and run `yarn` to install all needed packages
2. start the server!
`yarn dev`

# NOTES
- due to time constraints I unfortunately wasn't able to dockerize this app (which would be ideal due to the fact that we are running 3 different huge technologies)
- the frontend isn't finished, there are NOTEs throughout the code which describe what isn't implemented
