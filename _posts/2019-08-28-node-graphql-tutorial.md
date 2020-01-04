---
layout: post
title: "Node.js & Schema-First GraphQL Tutorial: Build your first CRUD API"
image: "images/content/node.png"
excerpt: "Throughout this tutorial, we'll teach you how to create your first CRUD web API with GraphQL and Node.js" 
tags : [node, nodejs, graphql]
---

GraphQL is a modern approach of building web APIs which brings many advantages over the REST approach that we have seen in the previous [article](https://www.techiediaries.com/graphql-tutorial). 


Throughout this tutorial, we'll teach you how to create your first CRUD web API with GraphQL and Node.js.

There are various libraries and packages for implementing GraphQL API servers such as:

- [express-graphql](https://github.com/graphql/express-graphql), 
- [apollo-server](https://github.com/apollographql/apollo-server),
- and [graphql-yoga](https://github.com/graphcool/graphql-yoga/).

In this tutorial, we'll be using `express-graphql`.


## Prerequisites

You will need to have the following prerequisites for successfully completing this tutorial:

- You can use a terminal in macOS and Linux or command prompt in Windows,
- You know the basic concepts of GraphQL,
- Working knoweldge of both JavaScript and Node.js,
- A development environment with Node.js and NPM installed.


For learning purposes, you can also use [REPL](https://repl.it/) -  An online compiler and IDE for Node.js and other platforms. You may sign up for an account easily with your GitHub account.

> **Note**: There are many ways, you can install Node and NPM in your machine. You can download the binaries or installers from the [official website](https://nodejs.org/en/download/) or better yet, use [NVM](https://github.com/nvm-sh/nvm).

## Creating a Node.js project

Provided that Node.js and NPM are installed on your local machine. Navigate inside your working folder and run the following commands to create a project:


```bash
$ mkdir graphql-api-server
$ cd graphql-api-server
$ npm init -y 
```

This will create a `package.json` file with default values, which you can optionally update with your own information.

Now, we can install packages in our project using npm. We need `Express.js`, `SQLite3`, `GraphQL.js`, `graph-tools` and `express-graphql`:

```bash
$ npm install express graphql graphql-tools express-graphql sqlite3 --save
```
The `graphql` package provides the implementation of the GraphQL implementation in JavaScript.

We also installed the `express-graphql` package which provides a middleware for Express.js.

We'll use `graphql-tools` for mapping the resolver functions to the schema using the `makeExecutableSchema()` method.

[Express](https://expressjs.com/) which is currently in version 4, provides a fast, unopinionated, and minimalist web framework for Node.js. It will basically allow us to create an HTTP server and expose an endpoint for our GraphQL API using the `express-graphql` middleware.

Now, inside your project's folder, create an `index.js` file and set it as main entry of your project by changing the `package.json` file as follows:

```json
{
  "main": "index.js",
  "dependencies": {    
    "sqlite3": "^4.0.9",
    "express-graphql": "^0.9.0",
    "graphql": "^14.4.2",
    "express": "4.17.1",
    "graphql-tools": "^4.0.5"
  }
}
```

Next, let's start by importing the necessary packages, creating an Express app and a SQLite3 database:

```js
const express = require('express');
const graphql = require("graphql");
const  GraphQLHttp = require("express-graphql");
const sqlite3 = require('sqlite3').verbose();
const { makeExecutableSchema } = require('graphql-tools')

const  app  =  express();
const db = new sqlite3.Database("./db.sqlite3");

db.run(`
	CREATE TABLE IF NOT EXISTS employees(
		id integer PRIMARY KEY,
		name text,
		phone text,
		address text,
		email text UNIQUE);`);
```

In our database, we'll be able to store employees with the `id`, `name`, `phone`, `address` and `email` information. Pay attention to this SQL schema as it gives us a hint of the shape of our data which we'll need to define our GraphQL schema.

Next, define a variable where we'll be adding our GraphQL types:

```js
const typeDefs = ` `;
```

This is simply an ES6 tempate string where we can add our full GraphQL schema using the SDL language.

## Creating the GraphQL Schema

In this tutorial, we'll use a schema-first approach to create our GraphQL API which means we need to create a schema using the GraphQL SDL language.

In a schema, we need to define our data type(s), their relationships (if any), and the queries and mutations that we can use to create and fetch data.

Let's define what the structure of an  `Employee`  by creating an  **object type** :

```js
const typeDefs = `

type Employee {
  id: ID!
  name: String
  phone: String
  address: String
  email: String
}
`
```
We'll be working with employees and each employee has the previously mentionned attributes. Based on that, let's define a GraphQL type for an employee:

Next, let's create a [Query type](https://graphql.github.io/graphql-spec/draft/#sec-Query), which defines the entry point that describes what we can fetch.

```js
const typeDefs = `

type Employee {
  id: ID!
  name: String
  phone: String
  address: String
  email: String
}

type Query {
  employee(id: ID!): Employee
  employees: [Employee]
}
`
```

Next, let's define a mutation type:

```graphql
type Mutation {
  createEmployee(name: String!, phone: String, address: String, email: String): Employee
  updateEmployee(id: ID!, name: String!, phone: String, address: String, email: String): Employee
  deleteEmployee(id: ID!): String
}
```

Finally, let's define the schema as follows:

```graphql
schema {
  query: Query
  mutation: Mutation
}
```

We have finished with our GraphQL code. Next, let's implmenent the previous operations using resolvers:

```js
const resolvers = {
  Query: {
    employees: (root, args, context) => {
        return new Promise((resolve, reject) => {
                        
                        db.all("SELECT * FROM employees;", function(err, rows) {  
                            if(err){
                                reject([]);
                            }
                            resolve(rows);
                        });
        });
                    
      },
    employee: (root, { id }, context) =>
      {
         return new Promise((resolve, reject) => {
                    
                        db.all("SELECT * FROM employees WHERE id = (?);",[id], function(err, rows) {                           
                            if(err){
                                reject(null);
                            }
                            resolve(rows[0]);
                        });
                    });
      },
  },
  Mutation: {
    createEmployee: (_, { name, phone, address, email }, context) => {
      return new Promise((resolve, reject) =>{
        
      db.run('INSERT INTO employees (name, phone, address, email) VALUES (?,?,?, ?);', [name , phone, address, email], (err) => {
                        if(err) {
                          console.log("error")
                            reject(null);
                        }
                            console.log("resolved")

                        db.get("SELECT last_insert_rowid() as id", (err, row) => {
                            resolve({
                                id: row["id"],
                                name: name,
                                phone: phone,
                                address: address,
                                email: email
                            });
                        });
                    });
      })
    },
  }
}
```

We have implemented the `createEmployee` mutation only. In the same way, you can add the `updateEmployee` and `deleteEmployee` mutations.
 
Next let's use the `makeExecutableSchema()` method from  `graphql-tools`  to connect the declarative schema with the resolvers:

```js
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
```



Finally mount the `/graphql` endpoint and run the Express server on the `4001` port:


```js
app.use("/graphql", GraphQLHttp({ schema: schema, graphiql: true}));

app.listen(4001, () => {
        console.log("GraphQL server running at http://localhost:4001.");
});
```

Save your `index.js` file and then run the following command to start the server:

```bash
$ node index.js
```

## Consuming the GraphQL API

Before building a frontend app for your GraphQL API, you can use the GraphiQL interface to test your API. 

Go to the `http://localhost:4001/graphql` address in your web brower and run the following mutation query: 

```graphql
   mutation {
      createEmployee(name: "Kaya Ab") {
        id
      }
   }
```

This will allow you to create an employee in the database. We only specified the name which is required according to our GraphQL schema but you can also provide email, address and phone.

You can get all employees in the database using the following query:

```graphql
    query {
      employees {
        id
        name
      }
    }
```

And you can retrieve a single employee using this query:

```graphql
    query {
      employee(id : 1) {
        id
        name
      }
    }
```

You can find the example from this [link](https://repl.it/@techiediaries/Node-GraphQL-Example).

<iframe height="400px" width="100%" src="https://repl.it/@techiediaries/Node-GraphQL-Example?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Conclusion

Throughout this tutorial, we’ve learned how to use Node and Express.js to create a simple GraphQL API for reading and adding employees in a SQLite database.

