---
layout: post
title: "Node.js SQLite Tutorial — Connection & CRUD"
image: "images/content/node.png"
excerpt: "In this tutorial, you'll learn to use SQLite in Node.js. We'll be using the node-sqlite3 driver for Node.js" 
tags : [node , nodejs]
---

In this tutorial, you'll learn to use SQLite in Node.js. We'll be using the [node-sqlite3](https://github.com/mapbox/node-sqlite3) driver for Node.js, hich provides an asynchronous, non-blocking SQLite3 bindings for Node.js, to connect to a sqlite database and perform CRUD operations.

## Creating a Node.js Project

Let's start by creating a new Node.js project. First, create a folder for your project:

```bash
$ mkdir node-sqlite-crud
```

Next, navigate inside your project's folder and generate a `package.json` file with default values:

```bash
$ cd node-sqlite-crud
$ npm init -y
```

Next, you need to create an `app.js` file inside your project's folder. For now, leave it empty.


## Installing the SQLite3 Driver for Node.js

Now that you have created your project, let's install the `node-sqlite3` package from `npm` using the following command:

```bash
$ npm install sqlite3 --save
```

## Creating a SQLite Database

After installing the sqlite3 bindings, you are now ready to use the module in Node.js. Open the `app.js` file and import `sqlite3`:

```js
const sqlite3 = require('sqlite3')
```

Next, create a `mydb.sqlite3` database using:

```js
let db = new sqlite3.Database("./mydb.sqlite3", (err) => { 
	if (err) { 
		console.log('Error when creating the database', err) 
	} else { 
		console.log('Database created!') 
		/* Put code to create table(s) here */
		createTable()
	} 
})
```

We create a `mydb.sqlite` database file inside the current project's folder using the `sqlite3.Database()` method. We pass in a filename and a function that will be called once the database is created or an error is occurred.

If no error occurs (i.e `err == null`), we need to add any code for creating database tables and interacts with the database.

Now let's define the `createTable()` method which will be called once the database file is created without any errors:

```js
const createTable = () => {
	console.log("create database table contacts");
	db.run("CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)", 	insertData);
}
```

We use the `db.run()` method to execute SQL queries against the SQLite3 database. When the operation is done a the `insertData()` callback passed as a second parameter will be called.

Next we need to define the `insertData()` method and add any table inserts in it.

## Inserting Data in SQLite 3

For inserting data into SQLite3, we can use the `run()` method with a SQL `INSERT` statement. Let's take an example:

```js
const insertData = () =>{
	console.log("Insert data")
	db.run('INSERT INTO contacts (name) VALUES (?)', ["contact 001"]);
}
```
 Similarly, you can delete and update data using the SQL `DELETE` and `UPDATE` statements.

## Reading Data in SQLite 3

You can read data from your database table using the SQL `SELECT`:

```js
read = () => {
	console.log("Read data from contacts");
	db.all("SELECT rowid AS id, name FROM contacts", function(err, rows) {
		rows.forEach(function (row) {
			console.log(row.id + ": " + row.name);
		});
	});
}
```

You can finally close the database using the following method:

```js

db.close();

```

## Conclusion

In this tutorial, we've seen how to use SQLite 3 in Node.js to perform simple CRUD operations. See the official repository of [node-sqlite3](https://github.com/mapbox/node-sqlite3) for more details. 
