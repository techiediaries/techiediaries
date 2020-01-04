---
layout: post
title: "PostgreSQL & PostGIS Tutorial — Creating a Spatial Database"
image: "images/content/ubuntu.png"
excerpt: "In this tutorial, you'll see how you can create a spatial database with PostgreSQL and PostGIS for your GIS based apps" 
tags : [postgresql]
---
 

PostgreSQL is an popular and open source database management system with a plethora of features but unfortunately lacks support for spatial data. As such, PostgreSQL by default is not a spatial database. 

A spatial database is a special type of database that allows users to store and query spatial data i.e data that references and describes locations, geospatial and geographic features on earth. 

You can turn your PostgreSQL database into a fully-featured spatial database using the PostGIS spatial extender.

## Installing PostgreSQL on Ubuntu, macOS or Windows

Before creating a spatial database with PostGIS, you need to install PostgreSQL in your system and create a database. You can install PostgreSQL in various ways depending on your operating system but generally the process is simple and straightforward.

On Ubuntu 18.04, you can install PostgreSQL using the official package manager by running the following command in your terminal:

```bash
$ apt-get install postgresql
```

On macOS, you need to use Homebrew:

```bash
$ brew install postgresql
```

On Windows, you can simply grab the installer from the [official website](https://www.postgresql.org/download/windows/) and run the setup wizard which will guide you throughout the entire process.

## Installing PostGIS

You can install PostGIS in your Ubuntu 18.04 system using the official package manager:

```bash
$ sudo apt-get install postgis
```

Next, you need to configure it per database.

## Creating a PostgreSQL Database 
 
PostGIS can be only installed per a database so you first need to create a database using the following command in your terminal:

```bash
$ sudo -u postgres createdb myspatialdb
``` 

>Please note that `postgres` is the default PostgreSQL user, you can also use your user if you've created one.
>This command will create a database called `myspatialdb`.

Next, you need to connect to your database using `psql`:

```bash
$ sudo -u postgres psql -d myspatialdb
```

Now, you need to enable the `postgis` extension in your database using the following command:

```bash
$ CREATE EXTENSION postgis;
```

## Checking the PostGIS Version

You can check for the installed PostGIS version in your database by running the following SQL command in `psql`;

```sql
SELECT PostGIS_version();
```

## Conclusion

In this tutorial, you have seen how to quickly install PostgreSQL in your Ubuntu 18.04, macOS and Windows systems, then you have created a database and connected to it using `psql` then installed the PostGIS extension into your database which turns it to a fully-fledged spatial database that you can use to store geospatial and geographic data and work with GIS  systems. 

