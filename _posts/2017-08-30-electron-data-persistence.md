---
layout: post
title: "Electron Tutorial: Data Persistence"
image: "images/content/electron.jpg"
excerpt: "we are going to explore different approaches for persisting and retrieving data in cross-platform desktop applications, built using the Electron platform and web technologies, we'll also cover how to install the required tools, write some sample code, and then see some pros and cons of each approach." 
tags : [electron] 
---

{% include image.html 
    img="images/content/electron.jpg" 
    title="different ways for persisting and retrieving data in Electron" 
%}

## Introduction 

Throughout this tutorial, we are going to explore different approaches for persisting and retrieving data in cross-platform desktop applications, built using the Electron platform and web technologies.

We'll see how to use popular SQL and NoSQL databases like MySQL, SQLite, SQLite3, MongoDB and NeDB. And ORMs like Sequelize to perform CRUD operations in Electron apps.  

We'll also cover how to install the required tools, write some sample code, and then see some pros and cons of each approach.
But first, lets start with an introduction to Electron, for those who are not yet familiar with it.  

## An Introduction to Electron

Electron was released by Github, back in 2013, allowing web developers to use their existing front-end skills with JavaScript, CSS and HTML to build native-like cross-platform desktop apps for Windows, MAC and Linux with a single code base.  

Electron is based on Google Chromium project and Node.js platform, which means you have an embedded browser with latest web standards (thanks to Chromium) and the whole Node.js modules, available from NPM, at your disposal.

Since Electron is basically a web browser, you can take advantage of the most modern client side frameworks and libraries, such as Angular and React, to build apps not just for the web but for the desktop too.

If you have any doubts about Electron, and if it's really changing the way we are developing desktop applications, ignoring the fact that big companies and even Microsoft are using it (You shouldn't), you can simply check the NPM statistics related to the use of Electron from this [link](https://npm-stat.com/charts.html?package=electron). And also the ongoing list of apps created using Electron from this [link](https://electron.atom.io/apps/)

## Persisting Data in Electron Apps 

First of all, why would you want to do that i.e. persist data?  
In most cases an application needs to persist data, for many reasons such as:

* Saving user defined settings: 
There exist many application wide settings or parameters which are different from a user to another and therefor, they need to be set by end users and persisted by some mechanism to avoid losing them between application restarts.

* Saving domain specific data: 
In data extensive applications such as enterprise apps, data is the centric element so persistence and retrieval is a crucial feature. This kind of apps needs data storage for keeping track of information or for further processing and analysis.     

* Adding off-line support: 
If your application depends on on-line data, and you maybe want to add off-line support then you also need to integrate some mechanism to persist data locally.

* Implementing caching: 
There may be some situations when you need to add some sort of disk caching for network data to your application .e.g. In order to optimize app loading time, using an embedded database such as SQLite. 

Thinking about how to persist data is a key step when developing applications, desktop apps make no exception. The way you use to handle data in your application affects your app performance and as a result the final user experience.

There is a plethora of available mechanisms, for persisting data, ranging from flat files, key-value stores to SQLite and fully fledged database systems such as MySQL, PostgreSQL and Microsoft SQL Server etc.

You can use simple classic storage mediums such as flat files, embedded databases, relational database systems or NoSQL databases. It's completely your call but you need to take into consideration your app requirements, and the pros and cons of each approach to make the right decision.

## How to Choose the Best Way of Persisting Data in Your Electron Apps?

Nearly all kind of apps need some sort of data storage and retrieval but not every approach is suitable for all use cases, e.g. If you just need to store some configuration data or user defined settings then a flat file or a key-value store such as the HTML5 localStorage, or the HTML5 NoSQL IndexedDB can be very useful and simple mechanisms for this kind of tasks.

localStorage API is quite easy to use. For IndexedDB, the API is a little bit complex but you can use it with wrapper libraries such as Dexie.js which has a simple and clear API.

If you need to persist domain specific data, with a simple structure i.e. with few relationships between different data entities and few attributes, then SQLite or a similar embedded database solution is the right choice for these use cases.

In the case that you are building a complex database application or a data heavy application, with multiple tables and relationships, Using raw SQL can be intimidating and error prone. As so an ORM will be of a great help for you, by allowing you to easily express your database requirements and letting you focus on the business domain side of your application. There exist many JavaScript/TypeScript ORMs that integrate well with Electron ecosystem such as Sequelize, Bookshelf.js and the relatively new TypeORM (based on TypeScript).

There are two major types of databases: relational databases and NoSQL databases. The right database type to use depends heavily on these two points: The nature and structure of your database, and the synchronization requirements. But which are the criteria to use one database type over the other?  


To answer this question lets imagine this scenario:
You are building an application for an enterprise which needs to keep track of data such as manufacturers, customers, products, orders and invoices. These data are related to each other with different relationships. For example an order belongs to a customer and has many associated products, an invoice is related to some order etc. Besides storing data, you need also to be able to perform simple queries involving either one entity or complex queries joining multiple entities.  

According to these requirements we can draw some points which will help us to decide what database system we'll need to use, for example:

* Data entities can be stored in tabular structures with columns and rows.
* Data entities columns (schema) can be predicted, earlier, when developing the application.
* Data integrity is required.

For this use case a relational database is an ideal choice.

If otherwise the schema is not predictable, constantly evolving and needs to be changed overtime, data is unrelated and performance is a primary concern then a NoSQL database is what to be used.    

You can also read [this article for further details about SQL vs NoSQL comparison](https://www.sitepoint.com/sql-vs-nosql-differences/).

Besides that, there are many factors that you also need to consider, such as: 

* Performance,

* Data portability, 

* In memory vs disk IO based database,

* Synchronization,

* Off-line first or not,

* Serverless or not,

* Embedded or not,

* Usage license,    

So choosing the right approach, for persisting data, depends on your app requirements. In this article we are going to see some possible, either simple and advanced, mechanisms for persisting data in your Electron apps.

If you would like to test the code, as you continue reading the tutorial, you need to create a new Electron project, you can simply do that with GitHub quick start project, so using your terminal or command prompt start by cloning their repository:

    git clone https://github.com/electron/electron-quick-start
    cd electron-quick-start

Then install the requirements and start the app:

    npm install
    npm start

You can also follow this [tutorial](https://www.sitepoint.com/desktop-node-apps-with-electron/) which walks you through installing Electron, building and packaging a simple desktop application. 
## Persisting Data with Plain SQL and MySQL Databases 

MySQL is an open source, relational database system created by Michael Widenius. To be able to use MySQL in your system you need to first have it installed, which is dependent on your target operating system but it's generally an easy to follow 
process. So before working with MySQL in this tutorial or test MySQL demos make sure to install the version of MySQL for your system.  

MySQL is available for most major operating systems including Linux, Mac and Windows.

### Installing MySQL Client for Node.js 

First we need to install the mysql module for Node.js from NPM so go ahead and run: 

    npm install mysql –save

### Bootstrapping the Module 

Here are the steps we need to follow to execute SQL queries against our MySQL database using node-mysql module:

* Import or require mysql module 

* Create a connection object 

* Connect to database

* Query the database 

* Close the connection

We first start by requiring the mysql module:
  
    var mysql      = require('mysql');

Then create a connection to database, you need to enter MySQL database system credentials and your database name.

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'YOUR_PASSWORD',
        database : 'demodb'
    });

After creating the connection object we use the connect() method to actually connect to the database
 
    connection.connect();

At this point, we are ready to execute SQL queries against the database. 
Lets take a simple example  
 
    connection.query('SELECT 1 + 1 AS result', function (error, results, fields) {
        if (error) throw error;
        console.log('1 + 1 = ', results[0].result); 
    });

If you finish working with a connection, you need to close it, using the end() method 

    connection.end();  

As you can see, the API is clear and self explanatory and It’s quite easy to connect to a MySQL database then execute SQL queries. For a simple and complete demo using Electron with MySQL, make sure you check this Github [repository]().

### The Pros and Cons of Using MySQL + Plain SQL 

Using plain SQL with MySQL in Electron apps has some pros and cons so lets start with the pros: 
* MySQL Doesn't limit Electron cross platform feature since it's available for all operating systems supported by Electron (Windows, Linux and MAC).
* MySQL can be installed and integrated easily with Electron (see code above).
* MySQL Node.js client is a native module so it can be used, for all architectures targeted by Electron, without rebuilding.

Now lets look at the cons:

* MySQL is not bundled with Electron apps so end users need to install MySQL separately from your application (But there are some methods you can use to silently auto-install MySQL with your application).
* MySQL DBMS is overkill for small Electron projects.

  
## Persisting Data with Sequelize ORM (+MySQL)

ORMs are smart software solutions or abstractions for working with SQL databases even if you don't know anything about SQL (the native programming language of relational databases) they are especially useful for creating and working with databases that have complex structures and relationships, so as much as you can admire them you don't really need to use them in every use case. Writing raw SQL can be better, especially for performance, than using an ORM, and not knowing SQL can't be an excuse for missing even some bits of performance.

### What is Sequelize?

Sequelize is an Object-Relational Mapper that enables JavaScript (Node.js) developers to work with SQL databases without actually writing SQL, but instead using JavaScript objects. An ORM eliminates the need to write raw SQL in order to perform CRUD (Create, Read, Update and Delete) operations, and lets you use one programming language to write application code but also access and work with databases.

You can use Sequelize with many database management systems and engines such as: PostgreSQL, MySQL, SQLite and MSSQL.  

### Installing Sequelize 

Installing Sequelize ORM is also a matter of using the npm install command so open your terminal or command prompt then run: 

    npm install --save sequelize

For our use case we are going to use Sequelize with a MySQL DBMS so you also need to install the MySQL client for Node.js using:

    npm install --save mysql2

### Using Sequelize 

After installing Sequelize, you can start using it by first creating a connection to your chosen database, for example:

    const Sequelize = require("sequelize");
    const sequelize = new Sequelize('mysql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE_NAME'); 

You can pass many options to Sequelize constructor, check them via this [link](http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html).

Now you are ready to make the connection to database, you can simply use the  authenticate() method:

    sequelize
    .authenticate()
    .then(() => {
        console.log('Connection successfully made.');
    })
    .catch(err => {
        console.error('Error connecting to database', err);
    });

Next we need to create a model using sequelize.define('name', {attributes}, {options}):

    const Product = sequelize.define('product', {
        name: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.FLOAT
        },
        cost: {
            type: Sequelize.FLOAT
        },
        price: {
            type: Sequelize.FLOAT
        },
        unit: {
            type: Sequelize.STRING
        }
    });

For more information about creating models in Sequelize ORM [check this](http://docs.sequelizejs.com/manual/tutorial/models-definition.html).

<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-format="fluid"
     data-ad-layout="in-article"
     data-ad-client="ca-pub-9293763250492023"
     data-ad-slot="2159586419"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Next we can create the SQL table and persist some data:

    Product.sync().then(() => {
        return Product.create({
            name: 'Product 001',
            quantity: 10,
            cost: 100,
            price: 120,
            unit: 'kg' 
        });
    }); 

Now lets make a query for retrieving all products in our database:

    Product.findAll().then(products => {
        console.log(products)
    }) 

You can find more information about querying databases with Sequelize via this [link](http://docs.sequelizejs.com/manual/tutorial/querying.html).

You can find a working demo for this approach on GitHub from this [link]().

### Pros and Cons of MySQL and Sequelize ORM approach

Just like the previous approach, the MySQL with Sequelize ORM has some pros and cons. For the pros:

* Sequelize supported DBMS and engines are available for all Electron platforms (Windows, Linux and MAC).
* Electron apps can be easily implemented to support mutlipe DBMS (via application settings).
* Better suited for big Electron projects.
* Sequelize is easily integrable with Electron.
* Sequelize Node.js module is not native so it doesn't require any rebuilding to target Electron ABI (Application Binary Interface).
* Users can use your Electron apps with SQLite without having to install any DBMS.

For the cons:

* Users need to install the underlying DBMS (except for SQLite).
* ORMs add another layer between your app and database so resulting Electron apps may have performance downgrades.

We have used MySQL for our example but you can also use any Sequelize supported DBMS/engine such as PosgreSQL, MSSQL, Oracle or even SQLite by just installing the corresponding Node.js client and specify the DBMS when instanciating Sequelize (see code above).   

Better yet you can easily offer your application users the choice of setting the DBMS/engine via a configuration option in your app.

## Other similar ORMs 

You can also use other popular ORMs with Electron. For the sake of brevity we are going to mention them without further details:

* [node-orm2](https://github.com/dresende/node-orm2): A Node.js ORM similar to Sequelize ORM that can be used with MySQL/MariaDB, PostgreSQL, MSSQL, Oracle, SQLite, MongoDB and Amazon Redshift.


* [Bookshelf.js](http://bookshelfjs.org/): Another Node.js ORM based on [Knex query builder](http://knexjs.org/) and can be used with PostgreSQL, MySQL, MariaDB and SQLite3.

* [TypeORM](https://github.com/typeorm/typeorm): A TypeScript ORM similar to Java Hibernate or PHP Doctrine .It can also be integrated with Electron. 



## Persisting Data with SQLite 

SQLite is an embedded (serverless), single file SQL database engine. Since the SQLite code is in public domain you can use it for free, either in free or commercial projects without any restrictions. SQLite database tables, indices, triggers, and views, is contained in a single disk file.

SQLite is the most used database engine in the world for many good reasons, so lets see how we can use it with Electron.

P.S. You can also use SQLite with a SQL ORM such as Sequelize or TypeORM. It's a matter of changing one parameter by specifying the database engine as sqlite. 

### Installing and Rebuilding SQLite3 

SQLite3 is a native Node.js module so it can't be used directly with Electron without rebuilding it to target Electron.

There are many ways to do that. You can find them from [Electron documentation](https://electron.atom.io/docs/tutorial/using-native-node-modules/).

First install electron-rebuild: 

    npm install --save-dev electron-rebuild
    
Then install sqlite3 module:
    
    npm install sqlite3 --save

Next rebuild sqlite3 for Electron with:
    
    ./node_modules/.bin/electron-rebuild  -f -w sqlite3

If the process goes without problems you should be good to go. 

### Using SQLite3 

Now lets see a small example of how to use SQLite3, first we need to import sqlite3 module:

    const sqlite3 = require('sqlite3');

Then create a Database object to connect to an in-memory database:

    var db = new sqlite3.Database(':memory:');
    
You can also use a file based database by specifying the path to a file instead:

    var db = new sqlite3.Database('/path/to/database/file.db');

Next lets create a table and insert some values ,query them then print the result on the console:

    db.serialize(function () {
      db.run("CREATE TABLE Products (name, barcode, quantity)");
    
      db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product001', 'xxxxx', 20]);
      db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product002', 'xxxxx', 40]);
      db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product003', 'xxxxx', 60]);
    
      db.each("SELECT * FROM Products", function (err, row) {
        console.log(row);
      });
    });

Finally, after finsihing with our database we can close it with: 

    db.close();


    
### Pros and Cons of Using SQLite with Electron 

Just like the previous approaches, Using SQLite with Electron has some pros anc cons. Lets start with the pros:

* SQLite can be bundled with your Electron app so the end user doesn't need to install anything beside your application.
* SQLite Doesn't get in the way for Electron cross platform feature since it's available for all platforms that Electron target (Windows, Linux and MAC). 
* Suitable for small as medium projects.
* Except for rebuilding gotchas, SQLite can be easily integrated and used with Electron. 

Now lets look at the cons:

* SQLite is a native module so it needs to be recompiled before it can be used with Electron.
* To target different architectures you need to rebuild SQLite for each possible architecture.


## Persisting Data with MongoDB 

MongoDB is a free and open source NoSQL database system available for Windows, Linux, OS X, Solaris and FreeBSD.

### Installing MongoDB

MongoDB is separate from Electron but to use it we need to integrate a MongoDB client that can be used to connect to a MongoDB database and communicate with it. Mongoose is a Node.js client for MongoDB so you need first to install it before you can use to communicate with your database.

Using your terminal or command prompt run the following command:

    npm install mongoose --save 
    
Next you need to make sure to re-build mongoose for your target Electron ABI.

    npm install electron-rebuild --save 
    ./node_modules/.bin/electron-rebuild  -f -w mongoose

### Using MongoDB

After installing Mongoose client, you first need to require it:

    var mongoose = require('mongoose')
       ,Schema = mongoose.Schema
       ,ObjectId = Schema.ObjectId;

   
Next connect to your database with:

    mongoose.connect('mongodb://localhost/my_database',{useMongoClient:true});    

Where my_database is the name of your database.

Then create your Mongoose schema(s):

    var productSchema = new Schema({
        location: ObjectId,
        date: {type: Date, default: Date.now},
        family: {name: String},
        name: String,
        quantity: Number
    });
    
    var locationSchema = new Schema({
        name:  String
    });
Next create the actual models from the schemas:

    var Product  = mongoose.model('Product', productSchema);
    var Location = mongoose.model('Location', locationSchema);

Now you can use different APIs to do CRUD operations against your database.
You can add database rows by creating instances of these objects and call their save() method:

Lets create some locations:

    var loc001 = new Location({name:'Location001'}).save();
    var loc002 = new Location({name:'Location002'}).save();
    var loc003 = new Location({name:'Location003'}).save();

Lets create some products:

    var product001 = new Product({location:loc001._id, family:{name:"family001"},name:"Product001",quantity:10}).save();
    var product002 = new Product({location:loc001._id, family:{name:"family002"},name:"Product002",quantity:20}).save();
    var product003 = new Product({location:loc002._id, family:{name:"family001"},name:"Product002",quantity:30}).save();

We can also query for locations and products using the find() method:

      Location.find(function(err, locations) {
        console.log(locations);
      }); 
      Product.find({location: loc001._id}, function(error, products) {
          console.log(products);
      });

You can find more documentation about available mongoose APIs from this [link](http://mongoosejs.com/index.html).  

### Pros and Cons of Using MongoDB

For the pros of using MongoDB with Electron apps:

* Available for all Electron suppored platforms such as Windows, Linux and MAC. So it doesn't limit the cross platform feature of Electron.
* Can be installed and integrated easily with Electron.

There are also some cons:

* Can't be bundled with Electron so the end users need to install it separately from your application.
* Overkill for small apps.
 

## Persisting Data with NeDB
 
NeDB stands for Node.js Embedded Database, it's a pure JavaScript module with no binary dependency and its API is a subset of MongoDB.
NeDB can be used as in-memory or as a persistent database.

### Installing NeDB

You can install NeDB via NPM with:

    npm install nedb --save

You can also install the version designed for browsers using bower package manager 

    bower install nedb 

    
    
### Using NeDB 

Before using the NeDB API you need to require the NeDB module using:
    
    var Datastore = require('nedb');
    
Next you can either create an in-memory database with: 
    
    var db = new Datastore();
    
Or a persistent datastore by specifying the path to a data file (to be created):

    var db = new Datastore({ filename: 'path/to/datafile' });

Before applying any operations on our created datastore you need to load it into memory using:

    db.loadDatabase(function (err) {    
      // You can now execute your commands
    });

You can also set the autoload parameter to true when creating the datastore to automatically load it in memory without explicetly calling loadDatabase() method.

    db = new Datastore({ filename: 'path/to/datafile', autoload: true });


You can insert a new document using insert method:

        var doc = { name: 'product001',
                    quantity : 100
                };
        
    db.insert(doc, function (err, newDoc) {  
      // newDoc is the newly inserted document
    });

To get the inserted documents use the find() method:

    db.find({ name: 'product001' }, function (err, docs) {
          // results
    });


### Pros and Cons of Using NeDB with Electron

Just like the other ways, using NeDB with Electron has some pros and cons so lets start with the pros:

* NeDB can be bundled with Electron. 
* Since it's pure JavaScript ,you can use it with Electron without re-building it.
* NeDB can be easily integrated and used with Electron.
* NeDB suitable for small and medium projects.

<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-format="fluid"
     data-ad-layout="in-article"
     data-ad-client="ca-pub-9293763250492023"
     data-ad-slot="2159586419"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

For the cons, there aren't much regarding using NeDB with Electron except that:

* NeDB is not suitable for large scale Electron projects (in this case it can be swapped with MongoDB since they have the same API).
### Other Alernatives 


* [LokiJS](https://github.com/techfort/LokiJS) 
* [RxDB](https://github.com/pubkey/rxdb)
* [ForerunnerDB](https://github.com/Irrelon/ForerunnerDB)
* [LinvoDB](https://github.com/Ivshti/linvodb3) 
* [PouchDB](https://pouchdb.com/)
* [lowdb](https://github.com/typicode/lowdb) 
* [Realm](https://realm.io/docs/javascript/latest/)
* [Lovefield by Google](https://google.github.io/lovefield/)

## Conclusion 

There are a plethora of ways for data persistence that can be used in Electron and choosing the right approach depends essentially on 
your use case(s). If it's only about saving application settings then you can use simple mechanisms such as flat files or HTML5 Storage APIs, for advanced data requirements you should opt for large scale database solutions such as MySQL or MongoDB (with or without ORMs)     





