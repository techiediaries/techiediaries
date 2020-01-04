---
layout: post
title: "Node.js Oracle CRUD Example: Database Connection  & SQL Queries"
image: "images/content/node.png"
excerpt: "In this quick tutorial, you'll learn how to make connection to an Oracle database in your Node.js application using node-oracledb" 
tags : [node , nodejs]
---

In this quick tutorial, you'll learn how to make a connection to an Oracle database in your Node.js application using [node-oracledb](https://github.com/oracle/node-oracledb).

You will also learn how to create SQL tables in your database and perform CRUD (Create, Read, Update and Delete) operations against your database.

## How to Use Oracle in Node

If you are here looking for an example for how to use an Oracle database for your Node.js application then you are in the right place.

These are the steps, you need to follow:

1. First, if you did not create a project, start by create a new project's folder:  `mkdir node-oracle-demo && cd node-oracle-demo`,
2. Next, add a  `package.json`  file in your folder: This can be manually or use  `npm init –y` which will create a basic `package.json` with default values which you can update later, 
3. Next, install the official `node-oracledb` module:  `npm install oracledb –save` (this will install the module and add it as a dependency in the `package.json` file)
4.  Next, create a  `server.js`  file and copy in the code below.
5.  Finally, run your server with:  `node server.js`. You should get a  “Successfully connected to Oracle!” message in your terminal or Command Prompt.


 
```js
let connection;
var oracledb = require('oracledb');

(async function() {
try{
   connection = await oracledb.getConnection({
		user : 'YOUR_DATABASE_USER',
		password : 'YOUR_DATABASE_PASSWORD',
		connectString : 'localhost/yourorclpdb'
   });
   console.log("Successfully connected to Oracle!")
} catch(err) {
    console.log("Error: ", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch(err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
  }
})()
```

You obviously need to replace `YOUR_DATABASE_USER`, `YOUR_DATABASE_PASSWORD` and `localhost/yourorclpdb` with your own values.

## Creating Database Tables Using the `CREATE` SQL Statement 

You can create tables in your database using the `CREATE` SQL statement. 

For example let's create an `employees` table:

```js
await connection.execute(`CREATE TABLE employees(id NUMBER, name VARCHAR2(50), email VARCHAR2(100) )`);
```

Now, let's see how we can perform CRUD operations against the `employees` table of your Oracle database.

## Performing CRUD Operations: How to Execute SQL Queries

After successfully connecting to your Oracle database, you are ready to execute SQL queries against your database using the `execute()` method of the `connection` object.

In the previous connection string we specified `yourorclpdb` as our database. We also create a table called `employees` in your database.

Let's now see how you can perform CRUD operations against the database.

### Creating/Inserting Data in the Oracle Database

You can execute a SQL insert query against your database using the following code:

```js
const sqlQuery = `INSERT INTO employees VALUES (:1, :2)`;

binds = [ ["test001", "test001@email.com" ], 
		  ["test002", "test002@email.com" ], 
		  ["test003", "test003@email.com" ]];

result = await connection.executeMany(sqlQuery, binds, {});

console.log("Number of inserted rows:", result.rowsAffected);
```

### Reading Data using the SELECT Query

Let's see how to read data from the database using the `execute()` method and the `SELECT` SQL query:

```js
connection.execute(
      `SELECT *
       FROM employees`,
      [],  
     function(err, result) {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(result.rows);
     });
 });
``` 

If you run your application using the `node server.js` command you should get your data displayed on the terminal. 

Data returned from the Oracle database can be accessed by going through the  `result.rows`  array. For example, you need to run the following code in order to display each row's data:

```javascript
rows.forEach( (row) => {
  console.log(`${row.name} is in ${row.email}`);
});
```

### Updating Data Using  the `UPDATE` SQL Statement

You can update data using the `execute()` method and the UPDATE statement. For example:

```javascript
await connection.execute('UPDATE employees SET email = :1 where ID = :2', ['new@email.com', 1]);
```

This will update the email of the employee with the ID 1.

### Deleting Data Using the `DELETE` SQL Statement

You can delete data using the `execute()` method and the `DELETE` statement. For example:

```javascript
await connection.execute(
  'DELETE FROM employees where id = :1', [1]
);
```

This will delete the employee with the ID 1.

## Conclusion

In this tutorial, we’ve only seen simple a subset of methods that the Oracle client provides. For more information, you can see the  [official repository](https://github.com/oracle/node-oracledb). 

You have created a simple CRUD application with Node.js and Oracle database for performing create, read, update and delete operations using the official `node-oracledb` client for Node.js.
