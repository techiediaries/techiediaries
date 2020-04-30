---
layout: post
title: "Install MySQL 8 on Ubuntu 20.04 LTS"
image: "images/content/ubuntu.png"
excerpt: "In this article, we'll learn step by step how to install MySQL 8 on Ubuntu 20.04 LTS" 
categories: ubuntu
tags : [ubuntu , mysql]
---

In this article, we'll learn step by step how to install MySQL 8 on Ubuntu 20.04 LTS.


[MySQL](https://www.mysql.com/)  is one of the most popular database management systems. It is mature, open-source,  and scalable. It's mostly used with the PHP language although it can be used with any server-side programming language. 

This tutorial focuses on  how to install and secure MySQL on your Ubuntu 20.04 server or development machine.

## Prerequisites

Before you can follow these instructions, you need to 
make sure you have `sudo` privileges in your Ubuntu machine.

## How to Install MySQL 8 on Ubuntu 20.04?

Now, let's get started with the instructions that you need to follow to install MySQL 8 on Ubuntu 20.04 LTS.

When writing this tutorial, the latest version of MySQL is MySQL 8.0. Let's install it!


Head over to your terminal and run the following command to update your system repositories:
 
```bash
$ sudo apt update
```

Next, install MySQL 8 using the following command:

```bash
$ sudo apt install mysql-server
```

Once the process is successfully completed, the MySQL service will get started automatically. 

You can check to see if the MySQL server is running by running the following command:

```bash
$ sudo systemctl status mysql
```

You should see the following output in your terminal if MySQL is enabled and running:

```bash
● mysql.service - MySQL Community Server
     Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2020-04-30 14:10:47 UTC; 10min ago
   Main PID: 8617 (mysqld)
     Status: "Server is operational"
     
```

Congratulations, you have installed MySQL 8 on your Ubuntu 20.04 system.

## How to Secure your MySQL Server on Ubuntu 20.04

When your install MySQL, it also provides a `mysql_secure_installation` script that makes it easy to secure access to your MySQL database.

Now, head back to your terminal and run the script using the following command:

```bash
$ sudo mysql_secure_installation
```

You'll get prompted to configure the  [`VALIDATE PASSWORD PLUGIN`](https://dev.mysql.com/doc/refman/5.7/en/validate-password.html)  which is designed to check test the strength of the users passwords in your MySQL server:

```bash
Securing the MySQL server deployment.

Connecting to MySQL using a blank password.

VALIDATE PASSWORD COMPONENT can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD component?

Press y|Y for Yes, any other key for No: Y
```

Go ahead and press  `Y`  if you want to set up the validate password plugin or any other key if you don't want to install it.

Next, you need to set the policy of your password validation:

```bash
There are three levels of password validation policy:

LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 2
```

Next, you'll be prompted to set a password for the MySQL root user:

```bash
Please set the password for root here.


New password: 

Re-enter new password: 
```

If you choose to use the validate password plugin, the plugin will display the strength of your new password. 

Now, type  `Y`  to confirm the password:

```bash
Estimated strength of the password: 60
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : y
```

Next, you’ll be instructed to remove the anonymous user, restrict root user access to the local machine, remove the test database, and reload privilege tables. You should answer  `y`  to all questions.

## How to Login to your MySQL 8 Server 

After you have installed MySQL 8 and secured you server, you can finally use the the MySQL client tool installed with the MySQL server in order to connect to your server from the command-line and send any SQL commands.

On MySQL 8.0, the root user gets authenticated using the  `auth_socket`  plugin by default whereas the  `auth_socket`  plugin is used to authenticate users that connect from `localhost`  via the Unix socket. This implies that you can’t authenticate as root by providing a password.

Now, head back to your terminal and run the following command to log in to the MySQL server as the root user:

```bash
$ sudo mysql
```

You will be presented with the MySQL shell, as follows:

```bash
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 12
Server version: 8.0.19-0ubuntu5 (Ubuntu)

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

You can then type an SQL command to create and interact with databases.

Now, what if you need to log in to your MySQL database server as root using a third-party tool like phpMyAdmin?

This can be in different ways. You can update the authentication policy from  `auth_socket`  to  `mysql_native_password` using the following command:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'very_strong_password';
```

Another way is to create a new user as administrator with access to all databases:

```sql
GRANT ALL PRIVILEGES ON *.* TO 'administrator'@'localhost' IDENTIFIED BY 'very_strong_password';
```

## Conclusion

In this article, you have seen how to install MySQL 8 on Ubuntu 20.04. You have also seen how to secure access to your database server by setting a password and remove any test databases.
