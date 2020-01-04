---
layout: post
title: "SQLite : Create Tables and SQL Relationships with Foreign Keys"
image: "images/content/sqlite-create-table-foreign-key-relationships.png"
excerpt: "SQLite : Create Tables and SQL Relationships with Foreign Keys" 
tags : [sqlite]
---

In this quick tutorial ,we are going to see an example of how to use foreign keys in SQLite tables .First of all ,for those who don't know ,SQLite 
supports foreign keys just like other SQL based database systems and you can define them in the same manner .

You can use foreign keys in SQLite to create many types of relationships between tables such as :

<ul>
<li>One To Many relationship</li>
<li>One To One relationship</li>
<li>Many To Many relationship</li>
</ul> 

An example of SQLite table with Foreign key 
---------------------------------------------
---------------------------------------------

To show you how you can use foreign keys with SQLite ,lets see a simple example from a project I'm currently building 

We have a table of articles and families ,an article can belong to only one family .

To express this relationship we need to add a Foreign key to families inside the articles table . 

So we first create the SQLite table for families 

                    CREATE TABLE IF NOT EXISTS families (
                         id INTEGER PRIMARY KEY,
                         reference VARCHAR(32) NOT NULL,
                         name TEXT NOT NULL,
                         unite VARCHAR);


We then create a table of articles 

                        CREATE TABLE IF NOT EXISTS  articles (
                            id INTEGER PRIMARY KEY,
                            reference VARCHAR(32) NOT NULL,
                            name TEXT NOT NULL,
                            quantity REAL,
                            unite VARCHAR,
                            purchased INTEGER,
                            reserved INTEGER,
                            sold INTEGER,
                            available INTEGER,
                            minimum INTEGER,
                            family_id INTEGER,
                            FOREIGN KEY(family_id) REFERENCES families(id)
                         );

As you can see we create a family_id of type Integer ,which should be the same type of primary ley of table families .Then on the bottom of the table 
we use the two SQL reserved keywords <em>FOREIGN KEY</em> and <em>REFERENCES</em> .

                            family_id INTEGER,
                            FOREIGN KEY(family_id) REFERENCES families(id)

Foreign Key () tells SQlite that family_id is a foreign key .

REFERENCES tells SQlite the table and column we are relating to so we actually relate to a specific column in a table not the table itself.

An example of SQlite tables with Many to One and One To Many relationships 
--------------------------------------------
--------------------------------------------

On the previous example we have expressed a  Many to One relationship from articles table to families table                              

One family has one or many articles .

One article has only one family .     

So we have placed the foreign key in articles table .

For bother one to many or many to one relationships ,we just need to place a foreign key on one side of relationship .

An example of SQlite tables with One to One relationship
-----------------------------
-----------------------------

What if we want to have a one to one relationship with the two tables i.em

Each article can belong to one family .

Each family has only one article .

We can do that by using two foreign keys on both sides of the relationship    

                    CREATE TABLE IF NOT EXISTS families (
                         id INTEGER PRIMARY KEY,
                         reference VARCHAR(32) NOT NULL,
                         name TEXT NOT NULL,
                         unite VARCHAR,
                         article_id INTEGER,
                         FOREIGN KEY(article_id) REFERENCES articles(id)
                         );

                    CREATE TABLE IF NOT EXISTS  articles (
                            id INTEGER PRIMARY KEY,
                            reference VARCHAR(32) NOT NULL,
                            name TEXT NOT NULL,
                            quantity REAL,
                            unite VARCHAR,
                            purchased INTEGER,
                            reserved INTEGER,
                            sold INTEGER,
                            available INTEGER,
                            minimum INTEGER,
                            family_id INTEGER,
                            FOREIGN KEY(family_id) REFERENCES families(id)
                         );

<div class="note">
Remember ,if you want to express a requirement which says that Item X belongs to Item Y .we just put a foreign key in Item X which references Item Y . 
<br>
This will create a Many To One relationship from X to Y .<br>

If also Item Y belongs to Item X ,we place another foreign key in Y which references Item X which creates a One To One relationship .

</div>                         

An example of SQlite tables with Many to Many relationships
-----------------------------------
-----------------------------------

So by placing a foreign key in one table we create a one to many relationship ,if we place another foreign key one the other table ,we create a 
one to one relationship ,now how we can create a Many to Many relationship ?

We simply we create and introduce another third table on the relationship which has two foreign keys that references both tables .

Now lets change our business requirements to state that :

An Article belongs to one or many families .

A Family has one or many articles .


The tables we need to create are

                    CREATE TABLE IF NOT EXISTS families (
                         id INTEGER PRIMARY KEY,
                         reference VARCHAR(32) NOT NULL,
                         name TEXT NOT NULL,
                         unite VARCHAR,
                    );

                    CREATE TABLE IF NOT EXISTS  articles (
                            id INTEGER PRIMARY KEY,
                            reference VARCHAR(32) NOT NULL,
                            name TEXT NOT NULL,
                            quantity REAL,
                            unite VARCHAR,
                            purchased INTEGER,
                            reserved INTEGER,
                            sold INTEGER,
                            available INTEGER,
                            minimum INTEGER,
                    );    

                    CREATE TABLE IF NOT EXISTS articles_families (
                            article_id INTEGER,
                            family_id INTEGER,
                            FOREIGN KEY(article_id) REFERENCES articles(id),
                            FOREIGN KEY(family_id) REFERENCES families(id)

                    );


Each row on articles_families express a ralationship between one instance/row of table articles and one row of table families .

Conclusion 
---------------
---------------

We have seen how to express many types of relationships ,one to many ,one to one and many to many, between two SQLite tables using the foreign key and references keywords .
