---
layout: post
title: "MySQL Tutorial: Create Database, Tables and Data Types"
image: "images/content/mysql.png"
excerpt: "MySQL Tutorial: Create Database, Tables and Data Types" 
tags : [ mysql ]
---

In this tutorial, you will learn about MySQL, how to create SQL databases, tables and various data types.


## Prerequisites

You need to have MySQL server installed on your machine along with the MySQL client.

## Create DATABASE | Create schema in MySQL

You can create a database in MySQL using the SQL instruction **CREATE DATABASE <name>**.

Open a new terminal and invoke the `mysql` client using the following command:

```bash
$ mysql -u root -p
``` 

Enter the password for your MySQL server when prompted. 

You can now execute SQL statments. Let's see an example of creating a database named `mydb`:

```SQL
mysql> create database mydb;
```

> **Note**: You can also use **create schema** for creating a database.

You can also add other parameters. 

## CREATE DATABASE IF NOT EXISTS

You can create multiple databases in your MySQL server. When using the **IF NOT EXISTS** parameter, you tell MySQL to create the database if no database with the same name is alreay created. This is will only prevent MySQL for displaying an error and aborting the opeartion but if a database with the same name exists It will not be overwritten:

```SQL
mysql> create database if not exists mydb;
```

This will create a database named `mydb` and fail silently if a database with the name already exists.

## SHOW DATABASES

You can get the list of created databases in your MySQL server using the `SHOW DATABASES` SQL instruction. In your terminal, simply run:

```sql
mysql> show databases;
```

## Create a MySQL Table and Columns

After creating a database, the next thing that you would need is creating the database tables and their fields.


In your MySQL client, run the following SQL insruction to create a table and columns:

```sql
mysql> CREATE  TABLE IF NOT EXISTS `Contacts` (
  `id` INT  AUTOINCREMENT ,
  `first_name` VARCHAR(150) NOT NULL ,
  `gender` VARCHAR(6) ,
  `date_of_birth` DATE ,
  `address` VARCHAR(255) ,
  `postal_address` VARCHAR(255) ,
  `phone` VARCHAR(75) ,
  `email` VARCHAR(255) ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;
```

Here is the format of the instruction we used:

>CREATE  TABLE [IF NOT EXISTS] `TableName` (`columnName` dataType [optional parameters]) ENGINE = storage Engine; 

The `CREATE TABLE` part instructs MySQL to create a SQL table with the specified name in the database.

The optional `IF NOT EXISTS` part insturcts MySQL to create the table only if no table with the same name exists in the database.

`columnName` refers to the name of the column and `data Type` refers to the type of data that can be stored in the corresponding column.

The `optional parameters` section contains options about a specific column such as `PRIMARY KEY`, `AUTO_INCREMENT`  or `NOT NULL`, etc.



## MySQL DATA TYPES

Let's now see the available types that can be used for table columns in MySQL.

Simply put, a data types defines the nature of the data that can be stored in a particular column of a table.

MySQL data types can be categorized in three categories:

- Numeric: TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT, FLOAT, DOUBLE, DECIMAL,
- Text: CHAR, VARCHAR, TINYTEXT, TEXT, BLOB, MEDIUMTEXT, MEDIUMBLOB, LONGTEXT and LONGBLOB,
- Date and time: DATE, DATETIME, TIMESTAMP and TIME.

Apart from above there are some other data types in MySQL:

- ENUM	To store text value chosen from a list of predefined text values
- SET	This is also used for storing text values chosen from a list of predefined text values. It can have multiple values.
- BOOL	Synonym for TINYINT(1), used to store Boolean values
- BINARY	Similar to CHAR, difference is texts are stored in binary format.
- VARBINARY	Similar to VARCHAR, difference is texts are stor

## Conclusion

In this post, we've seen how to create MySQL database and tables with columns and data types.










