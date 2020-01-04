---
layout: post
title: "Node.js & MySQL CRUD — Database Connection & SQL Queries"
image: "images/content/node.png"
excerpt: "In this tutorial, we'll see how you can use MySQL in Node.js by creating a connection and executing SQL queries for performing CRUD operations." 
tags : [node , nodejs, mysql]
---


MySQL is one of the most popular databases in the world and Node.js is a complete platform for building server side applications.

Node.js is commonly used with NoSQL databases but you can also use it with SQL-based databases like MySQL and Oracle. Check out [Node.js Oracle CRUD Example: Database Connection & SQL Queries](https://www.techiediaries.com/node-oracle-database-crud).

In this tutorial, we'll see how you can use MySQL in Node.js by creating a connection and executing SQL queries for performing CRUD operations.

We'll be looking at the [node-mysql](https://github.com/felixge/node-mysql) module for connecting to a MySQL server from your Node.js applications.

## Using MySQL in Node.js

You can use MySQL in Node.js through various modules such as [node-mysql](https://github.com/felixge/node-mysql) or [node-mysql2](https://github.com/sidorares/node-mysql2).

Let's see how we can use the `node-mysql2` (fast node-mysql compatible mysql driver for node.js) for connecting to create a database and perform CRUD operations against it.

In nutshell, these are the required steps to use MySQL in Node:

1.  Create a folder for your project and navigate inside it:  `mkdir node-mysql-example && cd node-mysql-example`,
2.  Add a  `package.json` file using the `npm init –y` command,
3.  Install the `node-mysql2` module from npm using the  `npm install mysql2 –save` command,
4.  Create a  `server.js`  file and add the code below,
5.  Run the application using the  `node server.js`. 

## Creating a Node.js Project

Let's start by creating our Node.js project. First, create a folder for your project using the following command:

```bash
$ mkdir node-mysql-demo
```   

Next, navigate inside your project's folder and create a `package.json` file:

```bash
$ cd node-mysql-demo
$ npm init -y
```

This will create a `package.json` with default values.

## Installing the MySQL Driver for Node.js

After creating a project, you can install the `node-mysql2` module using `npm`:

```bash
$ npm install mysql2 --save
```

This will add `node-mysql2` the `node_modules` folder of your project (which will be created if not exists) and add it to the `dependencies` array of the `package.json` file.

## Connecting to your MySQL Database

In your project's folder, create a `server.js` file. Open it and add the following code to import `mysql2` and use it to create a connection to your MySQL server:

```js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password'
  database: 'test'
});

```

We are connecting the `localhost` server using the `root` user, a `password` and a `test` database. Change the values accordingly in your system.

>For this to work you need to have MySQL installed on your system. If you don't, refer to the [installation page on the official website](https://dev.mysql.com/doc/refman/5.7/en/installing.html).

Before doing anything else we need to create database and a table. You can use the `mysql`command in your terminal to create a database. First run the following command in your terminal:

```bash
$ mysql
```

Next, run this SQL instruction:

```sql
create database test;
```

Next, you need to create a table by adding the following code:

```js
connection.query(`CREATE TABLE IF NOT EXISTS contacts(id NUMBER, name VARCHAR2(50), email VARCHAR2(100) )`
  ,
  function(err) {
  if(err){
      console.log("Error!");
  }
  }
);

```

Now that we have a database and a `contacts` table. Let's see how to perform CRUD operations using SQL queries.

## Performing CRUD Operations

CRUD stands for create, read, update and delete and it refers to common operations that are used in most data-driven applications. 

- You create data in the database tables using the `INSERT` statement.
- You read data from the database tables using the `SELECT` statement.
- You update data in the database tables using the `UPDATE` statement.
- You delete data from the database tables using the `DELETE` statement.

### Creating/Inserting Data

```javascript
connection.query('INSERT INTO contacts SET ?', ["name 001","name001@email.com"], (err, res) => {
  if(err) throw err;
});
```

### Reading/Selecting data

```javascript
connection.query('SELECT * FROM contacts', (err,rows) => {
  if(err) throw err;
  console.log(rows);
});
```

The `rows` variable contains the returned rows from the database table.

### Updating Data

```javascript
connection.query(
  'UPDATE contacts SET email = ? Where ID = ?',
  ['updated@email.com', 1],
  (err, result) => {
    if (err) throw err;
	}
);
```

### Deleting Data

```javascript
connection.query(
  'DELETE FROM contacts where id = ?', [1], (err, result) => {
    if (err) throw err;
   }
);
```

## Conclusion

In this tutorial, you have seen how you can use the `node-mysql2` driver for opening connections to MySQL databases in your Node.js applications and you created a simple CRUD example that demonstrates how to perform basic create, read, update and delete operations via SQL select, insert, update and delete statements. 
