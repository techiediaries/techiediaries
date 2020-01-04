---
layout: post
title: "PHP PDO Tutorial: CRUD Example with MySQL"
image: "images/content/php.png"
excerpt: "PHP PDO Tutorial" 
tags : [ php , mysql ]
---

PDO stands for PHP Data Object and it's an extension that provides an interface for communicating with many supported popular database systems such as MySQL and Oracle, PostgreSQL and SQLite, etc.

It's provided starting with PHP 5.1.

Since PDO abstracts away all the differences between various database management systems, you only need to change the information about your database in your code in order to change the database system used in your PHP application.


## Setting up PDO

PDO is added by default starting with PHP 5.1 but you need to set the necessary database driver in the php.ini file:


```
extension=pdo.so
extension=pdo_mysql.so
```

## Creating a MySQL Database

Let's start by creating a MySQL using the `mysql` client. In your terminal, run the following command:

```bash
$ mysql -u root -p
```

Enter your MySQL database password when prompted.

Next, run the following SQL instruction to create a database:

```sql
mysql> create database mydb;
```

That's it! We now have a database to work with.

## Creating a Database Table

Next, let's create a database table. First select your `mydb` database using:

```sql
mysql> use mydb;
```

Next, run the following SQL instruction to create a `contacts` table:


```sql
mysql > CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL
)
```

## Connection to Database Using PDO

Let's start by creating a folder for our project:

```bash
$ mkdir php-pdo-example
```

Next, navigate to your project's folder and create the `index.php` and `db.php` files:

```bash
$ cd php-pdo-example
$ touch index.php
$ touch db.php
```

Open the db.php file and add the following class that allows you to connect to your MySQL database:

```php
class DB
{
 
    protected $conn = null;
 
 
    public function Connect()
    {
        try {

            $dsn = "mysql:dbname=mydb; host=localhost";
            $user = <YOUR_DATABASE_USER>;
            $password = <YOUR_DATABASE_PASSWORD>;
 
            $options  = array(PDO::ATTR_ERRMODE =>      PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            );
 
 
            $this->conn = new PDO($dsn, $user, $password, $options);
            return $this->conn;

        } catch (PDOException $e) {
            echo 'Connection error: ' . $e->getMessage();
        }
    }
 
    public function Close()
    {
        $this->conn = null;
    }
}
```

In our `DB` class we first a protcted `$conn` variable that will hold the PDO instance. Next, we define two `Open()` and `Close()` methods which will be used to open and close the connection to database.

Next, open the `index.php` file and include the `db.php` file:

```php
include 'db.php';
 
try{
 
    $db = new DB();
    $conn = $db->Open();
    if($conn){
        echo 'connected';
    }
    else{
        echo $conn;
    }
}
catch(PDOException $ex){
    echo $ex->getMessage();
}
```

We include the `db.php` file and we create an instance of the `DB` class. Finally we call the `Open()` method of the the `DB` instance.

## Running Database SQL Queries

After connecting to the databse, we can now run SQL queries.

### Creating a Contact: SQL Insert 

Let's start by adding the code to create a contact in the database by running a SQL insert query. Open the `index.php` file and update it accordingly:

```php
include 'db.php';
 
try{
 
    $db = new DB();
    $conn = $db->Open();
    if($conn){
        $query = "INSERT INTO `contacts`(`name`, `email`) VALUES ('Contact 001','contact001@email.com')";
        $conn->query($query);
    }
    else{
        echo $conn;
    }
}
catch(PDOException $ex){
    echo $ex->getMessage();
}

```

### Reading Data: SQL Select

Next, let's add the code for reading data from the database table. 

Create a `read.php` file and add the following code:

```php
include 'db.php';
 
try{
 
    $db = new DB();
    $conn = $db->Open();
    if($conn){
        $query = "SELECT * FROM contacts";
        $result  = $conn->query($query);
        foreach ($result as $row) {
            echo $row['name'] . "<br>";
            echo $row['email'] . "<br>";
        }
    }
    else{
        echo $conn;
    }
}
catch(PDOException $ex){
    echo $ex->getMessage();
}

```

You can also create update and delete opertions using the following SQL queries:

```php
 $query = "UPDATE `contacts` SET `email`= 'contact002@email.com' WHERE `id` = 1";

 $query = "DELETE from `contacts` WHERE `id` = 1";
```

## Conclusion

In this quick tutorial we have seen how to create CRUD operations against a MySQL database using PDO and PHP.