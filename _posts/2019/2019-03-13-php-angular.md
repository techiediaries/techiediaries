---
layout: post
title: "Angular 7|6 with PHP and MySQL RESTful CRUD Example & Tutorial"
image: "images/content/angular.png"
excerpt: "In this tutorial, you'll learn to create an example Angular 7 application with a PHP REST API on top of a MySQL database." 
tags : [php , angular, mysql, angular-fullstack-examples, angular-9-tutorials]
---
 
In this tutorial, you'll create an example REST API CRUD Angular 7 application with PHP and MySQL back-end.

You will be creating a simple RESTful API that supports GET, POST, PUT and DELETE requests and allow you to perform CRUD operations against a MySQL database to create, read, update and delete records from a database.

For the application design, It's a simple interface for working with vehicle insurance policies. For the sake of simplicity, you are only going to add the following attributes to the `policies` database table:

- `number` which stores to the insurance policy number,
- `amount` which stores the insurance amount.
    

This is of course far from being a complete database design for a fully working insurance system. Because at least you need to add other tables like employees, clients, coverage, vehicles and drivers etc. And also the relationships between all these entities. 

## Prerequisites 

In this tutorial we assume you have the following prerequisites:

- The MySQL database management system installed on your development machine,
- PHP installed on your system (both these first requirements are required by the back-end project),
- Node.js 8.9+ and NPM installed in your system. This is only required by your Angular project.

You also need to have a working experience with PHP and the different functions that will be used to create the SQL connection, getting the GET and POST data and returning JSON data in your code.

You need to be familiar with TypeScript, a superset of JavaScript that's used with Angular.
 
A basic knowledge of Angular is preferable but not required since you'll go from the first step until your create a project that communicates with a PHP server. 

> Also read [PHP Image/File Upload Tutorial and Example [FormData and Angular 7 Front-End]](https://www.techiediaries.com/php-file-upload-tutorial) 

## Creating the PHP Application

Let's start by creating a simple PHP script that connects to a MySQL database and listens to API requests then responds accordingly by either fetching and returning data from the SQL table or insert, update and delete data from the database. 

Create a folder for your project:
 
```bash
$ mkdir angular-php-app
$ cd angular-php-app
$ mkdir backend
```

You create the `angular-php-app` that will contain the full front-end and back-end projects. Next, you navigate inside it and create the `backend` folder that will contain a simple PHP script that implements a simple CRUD REST API against a MySQL database.

Next, navigate into your `backend` project and create an `api` folder. 

```bash
$ cd backend
$ mkdir api
```

Inside the `api` folder, create the following files:

```bash
$ cd api
$ touch database.php
$ touch read.php
$ touch create.php
$ touch update.php
$ touch delete.php
```

Open the `backend/api/database.php` file and add the following PHP code step by step:

```php
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

```

These lines are used to add response headers such as CORS and the allowed methods (PUT, GET, DELETE and POST). 

Setting CORS to `*` will allow your PHP server to accept requests from another domain where the Angular 7 server is running from without getting blocked by the browser by reason of the **Same Origin Policy**. In development, you'll be running the PHP server from `localhost:8080` port and Angular from `localhost:4200` which are considered as two distinct domains.

Next, add:
 
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'YOUR_PASSWORD');
define('DB_NAME', 'mydb');
```

These variables hold the credentials that will be used to connect to the MySQL database and the name of the database.

>**Note**: Make sure you change them to your actual MySQL credentials.
> Also make sure you have created a database with a policies table that has two `number` and `amount` columns.
 
Next, add:

```php 
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();
```

This will allow you to create a connection to the MySQL database using the `mysqli` extension.

That's all for the `database.php` file

## Implementing the Read Operation

Now, let's implement the read operation. Open the `backend/api/read.php` file and add the following code:
 
```php
<?php
/**
 * Returns the list of policies.
 */
require 'database.php';
    
$policies = [];
$sql = "SELECT id, number, amount FROM policies";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $policies[$i]['id']    = $row['id'];
    $policies[$i]['number'] = $row['number'];
    $policies[$i]['amount'] = $row['amount'];
    $i++;
  }
    
  echo json_encode($policies);
}
else
{
  http_response_code(404);
}
```

This will fetch the list of policies from the database and return them as a JSON response. If there is an error it will return a 404 error.

## Implementing the Create Operation

Let's now implement the create operation. Open the `backend/api/create.php` file and add the following code:

```php
<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	

  // Validate.
  if(trim($request->number) === '' || (float)$request->amount < 0)
  {
    return http_response_code(400);
  }
	
  // Sanitize.
  $number = mysqli_real_escape_string($con, trim($request->number));
  $amount = mysqli_real_escape_string($con, (int)$request->amount);
    

  // Create.
  $sql = "INSERT INTO `policies`(`id`,`number`,`amount`) VALUES (null,'{$number}','{$amount}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $policy = [
      'number' => $number,
      'amount' => $amount,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode($policy);
  }
  else
  {
    http_response_code(422);
  }
}
```

## Implementing the Update Operation

Open the `backend/api/update.php` file and add the following code:

```php
<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	
  // Validate.
  if ((int)$request->id < 1 || trim($request->number) == '' || (float)$request->amount < 0) {
    return http_response_code(400);
  }
    
  // Sanitize.
  $id    = mysqli_real_escape_string($con, (int)$request->id);
  $number = mysqli_real_escape_string($con, trim($request->number));
  $amount = mysqli_real_escape_string($con, (float)$request->amount);

  // Update.
  $sql = "UPDATE `policies` SET `number`='$number',`amount`='$amount' WHERE `id` = '{$id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}
```

## Implementing the Delete Operation

Open the `backend/api/delete.php` file and add the following code:

```php
<?php

require 'database.php';

// Extract, validate and sanitize the id.
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

if(!$id)
{
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `policies` WHERE `id` ='{$id}' LIMIT 1";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
```

In all operations, we first require the `database.php` file for connecting to the MySQL database and then we implement the appropriate logic for the CRUD operation.

## Serving the PHP REST API Project

You can next serve your PHP application using the built-in development server using the following command:

```bash
$ php -S 127.0.0.1:8080 -t ./angular7-php-app/backend
```

This will run a development server from the `127.0.0.1:8080` address.

## Creating the MySQL Database

In your terminal, run the following command to start the mysql client:

```bash
$ mysql -u root -p
```

The client will prompt for the password that you configured when installing MySQL in your system.

Next, run this SQL query to create a `mydb` database:

```sql
mysql> create database mydb;
```

### Creating the `policies` SQL Table

Next create the `policies` SQL table with two `number` and `amount` columns:

```sql
mysql> create table policies( id int not null auto_increment, number varchar(20), amount float, primary key(id)); 
```

Now, you are ready to send GET, POST, PUT and DELETE requests to your PHP server running from the `127.0.0.1:8080` address. 

For sending test requests, you can use REST clients such as Postman or cURL before creating the Angular UI.

Leave your server running and open a new terminal.

## Creating the Angular 7 Project

Now that you've created the RESTful API with a PHP script, you can proceed to create your Angular 7 project.

Read the second part: [Angular 7|6 with PHP: Consuming a RESTful CRUD API with HttpClient and Forms](https://www.techiediaries.com/php-angular-crud-api-httpclient-forms)

## Conclusion

In this tutorial, you have created a PHP RESTful API that can be used to execute CRUD operations against a MySQL database to create, read, update and delete insurance policies. 

You have enabled CORS so you can use two domains `localhost:8000` and `localhost:4200` for respectively serving PHP and Angular 7 and being able to send requests from Angular to PHP without getting blocked by the Same Origin Policy rule in web browsers. 
