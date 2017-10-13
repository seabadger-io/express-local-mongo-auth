# express-local-mongo-auth
Repository of Node/Express authentication sample project

This is a full-fledged sample project which implements:
* local password authentication (users stored in MongoDB)
* a RESTful server over HTTP and HTTTPS
* a simple gulp configuration to watch changes, lint javascript and restart server

The sample project uses:
* Express
* MongoDB
* Mongoose
* Passport, passport-local-mongoose

## Configuration
To run the server download the source code and
1. install dependencies by running `npm install`
2. copy the secrets sample configuration from config/secrets-sample.cfg to config/secrets.js
3. create a config/cert folder and add your server.crt and server.key files there (details below)
4. if don't want to configure the server over SSL, set https enabled to false in config/appcfg.js
5. configure a MongoDB instance and set the DB access URL in config/appcfg.js

### Configuring HTTPS
To run this sample project over HTTPS, either copy your valid certificate and private key files
to the config/cert folder with the name server.crt and server.key (this can be changed in 
config/appcfg.js) or generate self signed certificates for testing (your browser will show a warning)
using the openssl binary, for example from a linux shell:
```
mkdir config/cert && cd !$
openssl req -x509 -newkey rsa:2048 -keyout server.key -out server.crt -days 365
```
Unless you remove the passphrase from your private key, you will have to enter the passphrase
in the config/secrets.js to https.passphrase. If you remove the passphrase, set the value of
this configuration option to an empty string ('')

## Run the server
You can run the server by `npm start`, by default it will listen on ports 8080 and 8443

## Access the server
You can access the server using a browser, for example on http://localhost/8080 or https://localhost/8443

The RESTful API in this example provides access to list all users, get a specific user or get the currently
logged in user. To access the API, first register a user / log in via the web interface, then you can access:
* List users: http://localhost:8080/users
* Get current user: http://localhost:8080/users/self
* Get user by id: http://localhost:8080/users/[USERID]

