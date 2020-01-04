## An Introduction to Electron

Electron was released by Github, back in [2013](), allowing web developers to use their existing front-end skills with JavaScript, CSS and HTML to build native-like cross platform desktop apps for Windows, iOS and Linux with a single code base.  

Electron is based on Google Chromium project and Node.js platform, which means you have an embedded and headless browser with latest web standards (thanks to Chromium) and the whole Node.js modules, available from NPM, at your disposal.


Since Electron is basically a web browser you can take advantage of the most modern client side frameworks and libraries, such as Angular and React, that have emerged in the last years and dramatically changed the JavaScript ecosystem, to build apps not just for the web but for the Desktop too.

Originally it was built for the Atom code editor, but nowadays both individual developers and big name companies alike, are using web technologies to build apps on top of Electron for different things such as code editing: big names in this category are Visual Studio Code by Microsoft and Atom by Github, Communication and team chat: in this category there are WhatsApp and Slack, just to name a few of them.

Besides bundling Chromium with the Node.js platform, what Electron does really offer is a rich and platform agnostic API for accessing and integrating well with the underlying operating system. 

If you have any doubts about Electron and if it's really changing the way we are developing Desktop applications ,ignoring the fact that big companies and even Microsoft are using it (You shouldn't),you can simply check the NPM statistics related to the use of Electron from this [link](https://npm-stat.com/charts.html?package=electron). And also the ongoing list of apps created using Electron from this [link]()

## Persisting data with Electron 

Thinking about how to persist data is a key step when developing applications, Desktop apps are no exception. The way you use to handle data in your application affects your app performance and as a result the final user experience.

There are many available options, for persisting data, ranging from flat files, key value stores to SQLite and fully fledged database systems such as MySQL, Oracle database and Microsoft SQL Server etc.

How to choose the best way of persisting your data in Electron apps ?

Nearly all kind of apps need some sort of data storage and retrieval but not every way is suitable for all use cases, e.g if you just need to store some configuration data or user defined settings then a flat file or a key value store can be what you are looking for.

If you need to persist domain specific data, with a simple structure or few relationships between different data entities, then SQLite or a similar embedded database solution may be quite good.

In the case that you are building a complex database application, with perhaps hundreds of tables and relationships,  Using raw SQL can be intimidating and error prone .As so an ORM, which abstracts away the complexities of SQL, will be a great help for you, by allowing you to easily express your database requirements and letting you focus on the business domain side of your application.

So choosing the right way of persisting data depends on your app requirements. In this article we are going to see some possible, either simple and advanced, ways for persisting data in your Electron apps.

If you would like to test the code as you continue reading the tutorial you need to create a new Electron project, you can simply do that using the GitHub Quick Start Project so using your terminal or command prompt, start by cloning their repository :

    git clone https://github.com/electron/electron-quick-start
    cd electron-quick-start
    npm install
    npm start

   
## Persisting data with Raw SQL and MySQL database 

### What is MySQL ?

Installing mysql for Node.js 

First we need to install the mysql module for Node.js from npm so go ahead and run: 

npm install mysql –save

Bootstrapping the module 

Here are the steps we need to follow to execute SQL against our MySQL database using node-mysql module :

Import or require mysql module 
Create a connection object 
Connecting to database
Querying the database 
Closing the connection
 
We first start by requiring the mysql module:
  
var mysql      = require('mysql');

Then create a connection to database, you need to enter mysql database system credentials and your database name.

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'jb395566',
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

If you end working with a connection, you need to close it, using the end() method 

  connection.end();  

As you can see, the API is clear and self explanatory and it's quite easy to connect to a MySQL database then execute SQL queries. For a simple and complete demo using Electron with MySQL, make sure you check this repository.

The Pros and cons 

  
## Persisting data with Sequelize ORM and MySQL

### What is an ORM ? 
ORMs are smart software solutions or abstractions for working with SQL databases even if you don't know anything about SQL (the native programming language of SQL based databases) they are especially useful for creating and working with databases with complex structures and relationships so as much as you can admire them you don't really need to use them in every use case ,writing raw SQL can be better,especially for performance, than using an ORM and not knowing SQL can't be an excuse for missing even some bits of performance.

### What is Sequlize ?

Sequelize is an Object-Relational Mapper that enables JavaScript (Node.js) developers to work with SQL databases without actually writing SQL but instead using JavaScript objects. An ORM eliminates the need to write raw SQL in order to perform CRUD (Create-Read-Update-Delete) operations and lets you use one programming language to write application code but also access and work with databases.

### Installing Sequelize 

Persisting data with SQLite 

SQLite is an embedded (serverless), single file SQL database engine. Since the SQLite code is in public domain you can use it for free either in free and commercial projects without any restrictions. SQLite database tables, indices, triggers, and views, is contained in a single disk file.

SQLite is the most used database engine in the world for many good reasons, so lets see how we can use it with Electron.


