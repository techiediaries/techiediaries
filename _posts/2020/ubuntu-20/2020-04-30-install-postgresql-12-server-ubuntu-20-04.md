---
layout: post
title: "Installing PostgreSQL 12 Server on Ubuntu 20.04"
image: "images/content/ubuntu.png"
excerpt: "In this post, you'll see how you can install PostgreSQL 12 on Ubuntu 20.04" 
tags : [ubuntu , postgresql]
---

PostgreSQL is a popular database used with many development stacks and languages. You can install PostgreSQL 12 server on your Ubuntu 20.04 system using the following steps.

## How to Install PostgreSQL 12 Server on Ubuntu 20.04?

PostgreSQL is included in the official repositories of Ubuntu 20.04 so you can simpy use the official `apt` package manager by running the following commands in your terminal:

```bash
$ sudo apt update
$ sudo apt install postgresql postgresql-contrib
```

You first update the cache in your system using the `apt update` command, next you install the `postgresql` and `postgresql-contrib` packages using the `apt install` command.

![Install PostgreSQL 12 in Ubuntu 20.04](https://www.diigo.com/file/image/badcbccczobbosoreszdrpbrpbo/Screenshot+from+2019-06-14+20-01-05.jpg?k=f44553264235d5591536a09571675751)

## How to Use PostgreSQL 12 in Ubuntu 20.04?

By default a user account called **postgres** is created for you when setup is finished. You need to log into this default account to be able to run PostgreSQL commands using the following command:

```bash
$ sudo -i -u postgres
``` 
After running the command, you'll be able to interact with PostgreSQL via `psql`. First, run the following command in your terminal:

```bash
$ psql
```

You can connect to a specified database using:

```bash
$ psql -d postgres
```

`postgres` is a database created by default in your system after installing PostgreSQL.

## Creating a New PostgreSQL Role

At this point, you only have one **postgres** role in your system. But, you can also create new roles from your terminal with using the `createrole` command. Make sure you are logged in as the **postgres** user and the run the following command:

```bash
$ createuser --interactive
```

The `--interactive` option will allow the command to interactively ask you for the name of the role and  if it needs have superuser access.

You can also use **sudo** with the **postgres** user to run the previous command:

```bash
$ sudo -u postgres createuser --interactive
```

## Creating a PostgreSQL Database

You can easily create a PostgreSQL database from your terminal using the `createdb` command. Just make sure you are logged in as a PostgreSQL user (bu default **postgres** if you didn't create your own user) or also run **sudo** with your PostgreSQL user before your command:

```bash
$ sudo -u postgres createdb mydb
```

You can now create database tables and data using SQL. For example to create a table run the following SQL command in the `psql` prompt:

```sql
CREATE TABLE test (
    test_id serial PRIMARY KEY,
    name varchar (100) NOT NULL,
    email varchar (100)
);
```

## Conclusion

In this tutorial, you have installed and configured the PostgreSQL 12 server database on your Ubuntu 20.04 system.
