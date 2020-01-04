---
layout: post
title: "Fix for error:You need to install postgresql-server-dev-X.Y for building a server-side extension or libpq-dev for building a client-side application"
image: "images/content/fix-dev-errors/titleimage.png"
excerpt: "This post outlines the process of solving the development error : You need to install postgresql-server-dev-X.Y for building a server-side extension or libpq-dev for building a client-side application"
tags : postgresql
---
{% include image.html
       img="images/content/fix-dev-errors/bigimage.png"
       title="Fix for error:You need to install postgresql-server-dev-X.Y for building a server-side extension or libpq-dev for building a client-side application "
%}

In this post we are going to see how we can fix the development error 

 	<b>You need to install postgresql-server-dev-X.Y for building a server-side extension or libpq-dev for building a client-side application	</b>

You generally stumble upon this error when you are installing psycopg2 using the pip command install

	pip install psycopg2

In fact the error message is self explanatory and tells you exactly what you need to do to be able to successfully install psycopg2 you just need to complete one of these two options or both  because psycopg2 rely on them for buidling: 

Install the postgresql server developent files that's in case you are buidling a server side extension (psycopg2)

Install libpq-dev if you are building a client side application.

Don't get confused just open your terminal and make the following installations : 

	sudo apt-get install postgresql
	sudo apt-get install python-psycopg2
	sudo apt-get install libpq-dev

After successfully completing the installation of the three packages you normally should get rid of the error.

I'm using using a Ubuntu distribution so if you are using a different Linux distribution or maybe a MAC or even Windows just make sure you use the equivalent of the apt-get package manager 
in your operating system.

What's psycopg2 ?
----------------------

Psycopg2 is PostgresSQL database adapter for Python language which simply means that's the driver responsible for interfacing with PostgreSQL database system from Python code .PostgreSQL is an open source database system that's widely used among the community so if you are a Python developer who needs access to some sql database via PostgreSQL you need to install psycopg2 which's just a few terminal command away

So just make sure you've installed  postgresql.On Ubuntu

	sudo apt-get install postgresql

Then install python-psycopg2

	sudo apt-get install python-psycopg2

Psycopg2 has many features : 

It's a PostgreSQL database driver which's compliant with DB API 2.0.

It's actively developed and maintained. 

It's thread safe designed for multi threaded applications.

It seamlessly integrates with Python.For example it does automatic conversion of PostgreSQL array type to a Python list.

It has its own connection pool.

How to use  psycopg2 from Python
-----------------------------------

It's very easy to use psycopg2 but before make sure you've installed it by executing the commands above

Next open your terminal and enter

	python 

Now on Python interactive CLI enter

	import psycopg2

If no error is shown that means psycopg2 is successfully installed in your system

	connection = psycopg2.connect("dbname='mydb' user='myuser' host='localhost' password='mypass'")

Just make sure you enter your correct database info - the name ,the username and password.

If you get no exception then congratulations there are no issues and your connected to you are database now

Next you need to retrieve the cursor to work with .That's simply done with

	cursor = connection.cursor()  		 	

Now you'll be able to send your SQL queries to your database 

	cursor.execute("""SELECT * from my_db_table""")

To fetch your result rows

	rows = cursor.fetchall() 	
	for row in rows:
    	print "   ", row[0]


That's it for a simple example of how to use psycopg2 to excecute sql queries against your PostgreSQL database in Python applications.


References
------------

<a href="https://wiki.postgresql.org/wiki/Psycopg2_Tutorial" rel="nofollow">Psycopg2 Tutorial</a>

<a href="http://initd.org/psycopg/" rel="nofollow">Official Python website</a>

<a href="http://legacy.python.org/peps/pep-0249.html" rel="nofollow">Python DB API 2</a>

