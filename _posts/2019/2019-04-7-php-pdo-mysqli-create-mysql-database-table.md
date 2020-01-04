---
layout: post
title: "Create PHP 7 MySQL Database Tables Using MySQLi & PDO"
image: "images/content/django.png"
excerpt: "PHP PDO Tutorial" 
tags : [ php , mysql ]
---

In this tutorial we'll learn how to use MySQLi and PDO to create MySQL database tables in PHP 7.

You can use the `CREATE DATABASE` SQL instruction to create a database in your MySQL client so let's start by creating a database. Open a new terminal and run the following command:

```bash
$ mysql -u root -p
```

Enter your MySQL instance password when prompted.

> **Note**: The official tool for working with MySQL is the mysql client which get installed when you install MySQL in your machine. The MySQL client can be used through your terminal as a CLI tool.

Next, you can run the following command to create a MySQL database:

```bash
mysql> create database mydb;
```

That's it! We now have a database.

Let's now see how you can create a MySQL table using PHP, MySQLi and PDO.

The [mysqli extension](https://www.php.net/manual/en/book.mysqli.php) is a relational database driver that allows you to access the functionality provided by MySQL 4.1 and above in PHP. It stands for **MySQL Improved**.

## Creating a MySQL Table in PHP Using MySQLi

Let's start with the MySQLi extension.

Create a `server.php` file and add the following variables:

```php
<?php

$server = "localhost";
$dbuser = "root";
$dbpassword = "YOUR_DATABASE_PASSWORD";
$dbname = "mydb";
```

> Note: Make sure to change your database user and password accrodingly.

Next, create a connection to your MySQL database using the following code:

```php
$connection = new mysqli($server, $dbuser, $dbpassword, $dbname);

if ($connection->connect_error) {
    die("Connection error: " . $connection->connect_error);
}
```

Next, create a SQL query to create the database table called contacts:

```php
$sqlQuery = "CREATE TABLE contacts (
id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
firstName VARCHAR(35) NOT NULL,
lastName VARCHAR(35) NOT NULL,
email VARCHAR(55)
)";
```

Next, run the SQL query using the following code:

```php
if ($connection->query($sqlQuery) === TRUE) {
    echo "Table created successfully!";
} else {
    echo "Error creating SQL table: " . $connection->error;
}
```

Finally, close your database connection using the following code:

```php
$connection->close();
?>
```

## Using PDO to Create MySQL Database Table in PHP

PDO stands for **PHP Data Object**. It's a set of PHP extensions that provide a core PDO class and database drivers for major database systems. 

You can also use PDO for connectiong and creating a MySQL database table:


```php
<?php

$server = "localhost";
$dbuser = "root";
$dbpassword = "YOUR_DATABASE_PASSWORD";
$dbname = "mydb";

try {
    $connection = new PDO("mysql:host=$server;dbname=$dbname", $dbuser, $dbpassword);


    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sqlQuery = "CREATE TABLE contacts (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
        firstName VARCHAR(35) NOT NULL,
        lastName VARCHAR(35) NOT NULL,
        email VARCHAR(55)
    )";

    $connection->exec($sqlQuery);
    
    echo "Table created successfully!";
    }
catch(PDOException $e){
    echo $sqlQuery . "<br>" . $e->getMessage();
}

$connection = null;
?>
```


## Conclusion

In this quick post, you have seen how you can create a MySQL database table in PHP using the MySQLi extension and PDO.
