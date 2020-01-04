---
layout: post
title: "Building a Fake and JWT Protected REST API with json-server"
image: "images/content/nodejs.jpg"
excerpt: "In this tutorial we'll see how to create a fake REST API with json-server, how to generate fake data with faker.js and how to add JWT authentication with jsonwebtoken" 
tags : [javascript, nodejs] 
---

More often than not when you are building a front-end application with libraries like React, Vue or Angular etc. you'll need to work with a back-end API which may not be ready at that time so you'll have to build a mock API to develop against which can be time consuming. Here comes `json-server`--a simple Node.js server that allows you to create fully working REST APIs in a matter of minutes without the hassle of installing and configuring a database system and you can even add JWT authentication to your endpoints using `jsonwebtoken` by adding a few lines of code.

In this tutorial we'll learn by example how to quickly create a REST API and add JWT authentication. We'll also see how to use `faker.js` to quickly generate fake data for our API.

## Requirements 

Before you can use `json-server` you'll need to have a development machine with Node.js and NPM installed. You optionally need to have cURL or Postman installed so you can test your API

You can install Node.js and NPM from the [official website](https://nodejs.org/en/download/).

![](https://screenshotscdn.firefoxusercontent.com/images/9e478166-4fec-41ae-9d9b-5178f8ce5091.png)

## Installing json-server

Head over to your terminal then run the following command:

```bash
npm install -g json-server
```

Depending on your npm configuration you may need to add `sudo` before your `install` command to be able to install packages globally.

You can also install `json-server` locally by generating a new Node.js module using:

```bash
mkdir myproject
cd myproject
npm init
```  

Enter the required details and hit OK to generate a new `package.json` file in your current folder.  

You can then install json-server locally:

```bash
npm install json-sever --save
```

## Creating API Endpoints 

To create your API endpoint(s) you only need to create a JSON file with your data. For example let's create an API with `/products` endpoint

Create a file called `db.json` and add the following content:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Product001",
      "cost": 10.0,
      "quantity": 1000
    },
    {
      "id": 2,
      "name": "Product002",
      "cost": 20.0,
      "quantity": 2000
    {
      "id": 3,
      "name": "Product003",
      "cost": 30.0,
      "quantity": 3000
    },
    {
      "id": 4,
      "name": "Product004",
      "cost": 40.0,
      "quantity": 4000
  ]
}
``` 
This file acts as the database for your API.

Now run `json-server` with:

```bash
json-server --watch db.json
```

That’s all you need to create your API based on the data you have added in `db.json`. You can now create, read, update and delete products from this server with advanced features, such as pagination, sorting and filtering out of the box, that you can expect from a real API server.

### Data pagination

You can query paginated data from your API endpoint by adding a *page* parameter to your endpoint. For example:

```bash
curl -X GET "http://localhost:3000/products?_page=1"
```

This will send a GET request to read the first page.

### Filtering data

You can also add filters to get filtered data by simply appending the filters to your endpoint. For example:

```bash
curl -X GET "http://localhost:3000/products?name=Product004&cost=30"
```

`&` can be used to compbine multiple filters.

### Sorting data

You can return sorted data from your endpoint by using `_sort` and `_order` parameters. For example:

```bash
curl -X GET "http://localhost:3000/products?_sort=name&order=DESC"
```

You can find more features by visiting the [documentation](https://github.com/typicode/json-server).

## Generate Mock Data 

You can either add data to your JSON file manually which can be a tedious task or even better use a tool for automatically generate fake data for `json-server` which is a more practical approach.

The tool we are going to use is [faker.js](https://github.com/marak/Faker.js/)

Head ove to your terminal and start by installing the package from npm using:

```bash
npm install faker
```

Then create a JavaScript file, you can name it however you want. Let's call `generateData.js`

```javascript
var faker = require('faker');

var database = { products: [] };

for (var i=1; i<=1000; i++) {
  database.products.push({
    id: i,
    name: faker.random.words(),
    cost: Math.random()*100,
    quantity: Math.random()*1000
  });
}

console.log(JSON.stringify(database));

```
We’re  are using a for-loop to create 1000 fake products with fake names, costs and quantities.

Now all you need to do is to run this script and output data to your `db.json` file using:

```bash
node generateData.js > db.json
```

## Adding JWT Authentication

`Json-server` provides many real world API features such as pagination and sorting etc. But in real world scenarios, in most cases you'll also have JWT authentication which is not provided out of the box by `json-server` but you can easily learn to add it with a few lines of code. So let's see how we can protect our fake API endpoint(s) using the `jsonwebtoken` package.    


First start by installing `jsonwebtoken`

```bash
npm install jsonwebtoken --save 
```

Next you need to create a `server.js` file inside your folder then follow the steps:

First you start by requiring the modules you'll need to use including `jsonwebtoken` and `json-server`


```
const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
```

Next use the `create()` method to return an Express server

```javascript
const server = jsonServer.create()
```

Call the `router()` method to return an Express router

```javascript
const router = jsonServer.router('./db.json')
```

Now you need to read and JSON parse the `users.json` file which you first need to create. This file acts like a table for registered users.  

```javascript
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
```

Make sure to create `users.json` and add some users then save it:

```json
{
    "users": [
      {
        "id": 1,
        "name": "bruno",
        "email": "bruno@email.com",
        "password": "bruno"
      },
      {
        "id": 2,
        "name": "nilson",
        "email": "nilson@email.com",
        "password": "nilson"
      }
    ]
  }
```

Next, set default middlewares (logger, static, cors and no-cache)

```javascript
server.use(jsonServer.defaults());
```

Or you can also add your own settings

```javascript
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
```

Next define some constants: SECRET_KEY is used to sign the payloads and expiresIn for setting the time of expiration for JWT access tokens.

```javascript
const SECRET_KEY = '123456789'
const expiresIn = '1h'

```
Add the following functions:

```javascript
// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}
```

Now you need to create a POST `/auth/login` endpoint which verifies if the user exists in the database and then create and send a JWT token to the user:  

```javascript
server.post('/auth/login', (req, res) => {
  const {email, password} = req.body
  if (isAuthenticated({email, password}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password})
  res.status(200).json({access_token})
})
```

Next add an Express middleware that checks that the authorization header has the Bearer scheme then verifies if the token if valid for all routes except the previous route since this is the one we use to login the users.

```javascript
server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({status, message})
    return
  }
  try {
     verifyToken(req.headers.authorization.split(' ')[1])
     next()
  } catch (err) {
    const status = 401
    const message = 'Error: access_token is not valid'
    res.status(status).json({status, message})
  }
})
```
Finally mount `json-server` then run server on port *3000* using:

```javascript
server.use(router)

server.listen(3000, () => {
  console.log('Run Auth API Server')
})
```

You can also mount `json-server` on a specific endpoint (`/api`) using:

```javascript
server.use('/api', router;
```


That's it you now have a protected API. Let's add two npm scripts to run the server

Open your `package.json` file then add this two scripts

```json
  "scripts": {
    "start": "json-server --watch ./db.json",
    "start-auth": "node server.js"
  },
``` 

The start script runs json-server normally without any authentication 

The start-auth runs our `server.js` script

Now head back to your terminal and run:

```bash
npm run start-auth
``` 

You can find the source code for this example in this [Github repository](https://github.com/techiediaries/fake-api-jwt-json-server)

## Conclusion

You are now ready to prototype your front-end web application without worrying about APIs or data. You can also add JWT authentication to your mock API endpoints to simulate more real world scenarios. Have fun!


