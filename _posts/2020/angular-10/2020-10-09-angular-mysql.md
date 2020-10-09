---
layout: bpost
title: "Angular 10 with MySQL and Node.JS Back-End"
image: "images/content/angular.png"
excerpt: "In this guide, we'll learn to use Node.js and MySQL for building a back-end for your front-end Angular 10 application"
date: 2020-10-09
tags : [angular]
---

In this guide, we'll learn to use Node.js and MySQL for building a back-end for your front-end Angular 10 application.

We'll also introduce the MySQL database for Angular developers and we'll see how to connect your app to a MySQL database via a Node.js backend.

## Introducing MySQL for Angular Developers 

The [MySQL](https://www.mysql.com/) database is one of the most popular databases in the world. It has been a very reliable solution for web applications for many years. 

If you are familiar with the LAMP stack, M refers to the MySQL database. It was and still used mostly in combination with PHP and the Apache server for building server-side apps.  LAMP is a web application software stack which stands for Linux, Apache, MySQL, PHP. PHP can also be replaced by Perl or Python in this stack.

According to [Wikipedia](https://en.wikipedia.org/wiki/MySQL):

> MySQL is an open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius's daughter, and "SQL", the abbreviation for Structured Query Language. MySQL is free and open-source software under the terms of the GNU General Public License, and is also available under a variety of proprietary licenses. MySQL was owned and sponsored by the Swedish company MySQL AB, which was bought by Sun Microsystems (now Oracle Corporation). In 2010, when Oracle acquired Sun, Widenius forked the open-source MySQL project to create MariaDB.

MariaDB is now the open-source alternative to MySQL, which is owned by Oracle, which aims to keep all the features free for the community. If you have recently installed MySQL on on your machine, it's likely MariaDB.

MySQL is the database technology for many popular database-driven web applications, such as WordPress, Drupal, and Joomla. MySQL is also used by many popular platforms, such as Facebook, Twitter, and YouTube. 

MySQL is also a relational database, as a developer this means you need tp work with SQL tables which have rigid data structures that can not change whenever you want but only by following some migration procedures. Database tables are composed of rows and columns which correspond to the actual data and their types. Also, relationships betwwn various tables can be established through foreign keys. 

> A relational database is a digital database based on the relational model of data, as proposed by E. F. Codd in 1970. A software system used to maintain relational databases is a relational database management system (RDBMS). Many relational database systems have an option of using the SQL (Structured Query Language) for querying and maintaining the database. [https://en.wikipedia.org/wiki/Relational_database](https://en.wikipedia.org/wiki/Relational_database)


Throughout this tutorial, We'll take you step by step to develop an Angular 10 app using a MySQL database and Node which is required to interface and communicate between your front-end Angular app and your database since this latter exist in a server while your front-end app runs on the client machine. Node will provide a REST API that your Angular can connect to using its `HttpClient` API. Node will take care of running the SQL queries against the MySQL database and pass the response back to the front-end as an HTTP response.

Since JavaScript/Angular is not a component of the LAMP stack, we'll be using the MEAN stack, where the **M** in MEAN can refer to MongoDB or MySQL database in our case. **E** refers to Express, a Node.js framework that makes it easy to build REST APIs back-ends, whereas **AN** refers to Angular. 

We assume you have Node.js and npm installed on your development machine and that you are familiar with Node,js for building server-side apps.

## Installing MySQL

Let's get started by installing and setting up MySQL in our machine.

Simply, go to the [official website](https://dev.mysql.com/downloads/) to follow the instructions to install MySQL in your system. 

You can also refer to your system distribution for using the official package manager to install the MySQL server and client.

## Creating a MySQL Database

If you have installed MySQL, you next need to create a database. 

Head over to your terminal and run the following command to connect to your MySQL server:

```bash
$ mysql -u root -p
```

You'll be prompted for a password to connect to the MySQL server. This password was created when you installed and configure MySQL in the previous step.


Next, you can create a new database using the following command.

```sql
mysql> create database mydb;
mysql> use mydb;
```


Finally, you need to create the `customers` database table using the following SQL instructions:

```sql
create table customers (
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  description TEXT,
  dateAdded DATE,
  PRIMARY KEY (id)
);
```

We have created a database table for storing customers' data with columns such as `id`, `name`, `email`, `phone`, `description`, and `dateAdded`. The `id` column is the primary key of our SQL table. 

At this point, we have, we have created our MySQL database and SQL table. We'll see, in the next article, how to create a Node.js app that connects to this database, and exposes endpoints for reading, saving, updating and deleting data from our database and return the response back to our Angular 10 front-end application. 