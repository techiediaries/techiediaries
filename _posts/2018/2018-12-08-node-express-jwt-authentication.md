---
layout: post
title: "Node Express JWT Authentication — jsonwebtoken and bcryptjs"
image: "images/content/express.png"
excerpt: "Throughout this tutorial, we'll be learning how you can create a JWT authentication server with Node.js and Express.js using some popular libraries like jsonwebtoken, bcryptjs and SQLite" 
tags : [nodejs, node, express, expressjs]
---

Throughout this tutorial, we'll be learning how you can create a JWT authentication server with Node.js and Express.js using some popular libraries like:

- [`express`](https://www.npmjs.com/package/express)
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken),
- [`bcryptjs`](https://www.npmjs.com/package/bcryptjs)

For making things simple, we'll be using a SQLite database but this can be easily changed to use fully-fledged database management systems like MySQL. 

## Prerequisites

In this tutorial, you need to have:

- A development machine with a recent version of Node.js and NPM installed,
- And a basic knowledge of JavaScript.

## Creating the Express.js Server

Let's start by creating our Node project. In your terminal run the following commands to generate a `package.json` file inside the project's folder:

```bash
$ mkdir express-auth-project
$ npm init -y
``` 

This command will generate an `express-auth-project/package.json` file with default content:

```json
{
  "name": "express-auth-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

From the main property, you can see that we need to create an index.js file that will be the entry point of our application i.e the first file that will be executed by Node. So simply create the file in your project's folder:

```bash
$ touch index.js
```

> **Note**: Please note that you can use any name for your entry point file such as `server.js` instead of `index.js` but you should set that accordingly in the `main` property in your `package.json` file.

Before adding any code inside the `index.js` file, we first need to install a bunch of packages from npm such as `express`, `sqlite3`, `jsonwebtoken`, `bcryptjs` and `bodyparser`. 

Go to your terminal and run the following command to install the required libraries from `npm`:

```bash
$ npm install --save express body-parser sqlite3 bcryptjs jsonwebtoken 
```

At the time of this writing the following versions will be installed:

```bash
bcryptjs@2.4.3
sqlite3@4.0.4
body-parser@1.1
jsonwebtoken@8.4.0
express@4.16.4
```

The command will create a `node_modules` folder inside your project's folder where the packages and their dependencies are all installed. Since we've added the `--save` option, the command will also update the the `package.json` file with these dependencies which will enable anyone who cloned the project to install the same packages you've installed with the previous command by simply running the `npm install` command from the root of the project's folder where `package.json` exists.

This is the content of `package.json` at this point:  

```json
{
"name": "express-auth-project",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [],
"author": "",
"license": "ISC",
"dependencies": {
	"bcryptjs": "^2.4.3",
	"body-parser": "^1.18.3",
	"express": "^4.16.4",
	"jsonwebtoken": "^8.4.0",
	"sqlite3": "^4.0.4"
}
}
```

After installing the required packages, you can now proceed by creating your Express server. Open the `index.js` file and add the following code:

```js
"use strict";
const  express  =  require('express');
const  bodyParser  =  require('body-parser');

const  app  =  express();
const  router  =  express.Router();

router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());
```

We first require the `express` and `body-parser` modules, new we create an Express application and en Express router. Finally we added body parser middlewares that will allow us to get parse JSON data from the request body.


Next let's define two `/login` and `/register` routes which both should accept a POST request from clients:

```js
router.post('/register', (req, res) => {
	res.status(200).send({ access_token:  '' });
});

router.post('/login', (req, res) => {
	res.status(200).send({ access_token:  '' });
});
```

We use the `post()` method of the router object to create a route that accepts a POST request. The method takes the path as the first parameter and a function to process the request as the second parameter. This function is passed two objects:

- `req` that represents the request sent from the client,
- `res` that represents the response that will be sent to the client.

Both these two objects contains values and methods to work with requests and responses.

In the body of functions, we simply set the **200 OK** status on the response and send it the client with an `{ access_token:  '' }` body.

This will return the following HTTP response to the client:

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "access_token": ""
}
``` 

For now the access token is empty so we'll next change that to actually register, login and return an actual access token that will be used to authenticate the clients.
 
Next, add the following code to set up the router and run Express server:

```js
app.use(router);
const  port  =  process.env.PORT  ||  3000;
const  server  =  app.listen(port, () => {
	console.log('Server listening at http://localhost:'  +  port);
}); 
```

At this point, you can run your server using the following command from the root of your project:

```bash
$ node index.js
```

In your terminal the `Server listening at http://localhost:3000` will be displayed which means your server is up and running and available from the `http://localhost:3000` address.

You'll be able to send POST requests to the `http://localhost:3000/register` and `http://localhost:3000/login` endpoints to respectively register and login users.

Let's also look at how we can create a route that accepts a GET request and returns a response to the client. In the `index.js` file, add the following route:

```js
router.get('/', (req, res) => {
	res.status(200).send('This is an authentication server');
});
```

This will allow you to visit the `http://localhost:3000/` from your web browser. In your browser, you'll see the **This is an authentication server** message.
 
## Adding a SQLite  Database

To be able to register and login users in our application we need a way to persist users in our database. For this matter, we'll use SQLite, a file based database that can be quickly created without installing a database management system like MySQL.

Open the index.js file and require the sqlite3 package you've previously installed using the following code:

```js
const  sqlite3  =  require('sqlite3').verbose();
```
Next create a database object using:

```js
const database = new sqlite3.Database("./my.db");
```

Put this code at the beginning of your `index.js` file after the require method and before registering the routes.

Next, add three methods to create the `users` table where users are persisted, create a user in the database and find a user by its email in the database:

```js
const  createUsersTable  = () => {
	const  sqlQuery  =  `
		CREATE TABLE IF NOT EXISTS users (
		id integer PRIMARY KEY,
		name text,
		email text UNIQUE,
		password text)`;

	return  database.run(sqlQuery);
}

const  findUserByEmail  = (email, cb) => {
	return  database.get(`SELECT * FROM users WHERE email = ?`,[email], (err, row) => {
			cb(err, row)
	});
}

const  createUser  = (user, cb) => {
	return  database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)',user, (err) => {
		cb(err)
	});
}
```

After defining these methods to create and work with the database, let's create the users table by calling the `createUsersTable()` right after the definition of the methods:

```js
createUsersTable();
```

Stop and run your server—you should see a `my.db` database file created in the root of your project.

## Configuring the `jsonwebtoken` & `bcryptjs` Modules

Before implementing our authentication flow, we need to setup the `jsonwebtoken` and `bcryptjs` modules that are respectively used to create JSON tokens and encrypt passwords before storing them in the database.

First in the `index.js` file and require `jsonwebtoken` and `bcryptjs`:

```js
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 
```

Also add a secret key that will be used to sign the payloads to create JSON tokens:

```js
const SECRET_KEY = "secretkey23456";
```


## Implementing the Register Route

Now, let's implement the register route. In the `index.js` file, add the following code to your `register` route:

```js
router.post('/register', (req, res) => {

	const  name  =  req.body.name;
	const  email  =  req.body.email;
	const  password  =  bcrypt.hashSync(req.body.password);

	createUser([name, email, password], (err)=>{
		if(err) return  res.status(500).send("Server error!");
		findUserByEmail(email, (err, user)=>{
			if (err) return  res.status(500).send('Server error!');  
			const  expiresIn  =  24  *  60  *  60;
			const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
				expiresIn:  expiresIn
			});
			res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn 		  
			});
		});
	});
});
```

We first extract the name, email and password from the request body. Next, we call the `createUser()` method by passing the extracted credentials for the new user to be created. 

In the callback function of the method:

- We check if we have an error, in that case we return a **500** HTTP response with the `Server error!` message,
- Otherwise, we generate an access token based on the user ID (generated automatically in the database), a secret key and an expires in value (in seconds) using the `sign()` method of `jsonwebtoken`,  
- We finally return  a **200** response with a body containing the user, access token and the expires in value.
     
Stop and run your server again—If you now send a POST request with the following body:

```json
{
  "email": "test@mail.com",
  "name": "test",
  "password": "test001"
}
```
 
 You should get a **200** response similar to the following:

![Node Express JWT Authentication](https://i.imgur.com/J7Mtt4L.png)

The response contains the created user information (the password is encrypted using bcrypt), an `access_token` and `expires_in` value (one day).
 
## Implementing the Login Route

After implementing the logic for registering users let's now implement the `login` route. In the `index.js` file, add the following code:

```js
router.post('/login', (req, res) => {
	const  email  =  req.body.email;
	const  password  =  req.body.password;
	findUserByEmail(email, (err, user)=>{
		if (err) return  res.status(500).send('Server error!');
		if (!user) return  res.status(404).send('User not found!');
		const  result  =  bcrypt.compareSync(password, user.password);
		if(!result) return  res.status(401).send('Password not valid!');

		const  expiresIn  =  24  *  60  *  60;
		const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
			expiresIn:  expiresIn
		});
		res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
	});
});
```

We first extract the login credentials i.e the email and password from the body of the request. 

Next, we call the `findUserByEmail()` method to search for the user with the passed credentials in the SQLite database. 

In the callback of the method:

- We check of there is an error, in that case we return a **500** response,
- Next, we check if the user exists in the database and returns a **404** response if it doesn't, 
- Next, we check if the passed password matches the database user's password using the `bcrypt.compareSync()` method and returns a **401** response if not. 
- Finally we generate a token using the `sign()` method of `jsonwebtoken` and return a **200** response with the user, access token and an expiration value.

Again stop and run your server—you should be able to login using the previously created user by sending the following data with a POST request to the `/login` endpoint:

```json
{
  "email": "test@mail.com",
  "password": "test001"
}
``` 

This should return a **200** HTTP response with a `user` object, `access_token` and `expires_in` properties.

## Conclusion

In this tutorial, we've used Node, Express, `body-parser`, `jsonwebtoken`, `sqlite3` and `bcrypt` libraries and packages to create a simple REST server for JWT authentication.
