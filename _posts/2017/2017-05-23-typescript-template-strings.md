---
layout: post
title: "TypeScript 101 : Template strings"
image: "images/content/typescript-template-strings.png"
excerpt: "TypeScript Template Strings" 
tags : [typescript]
---

Template strings are a useful feature of modern programming languages ,among them TypeScript .Syntactically 
they are enclosed with two backticks (``),one for denoting the start of the string and the other one for 
denoting the end of the string  . 

In E6 they are now called Template literals and defined as string literals which can have embedded expressions .

Templates strings have many advantages over standard strings such as 

String interpolation and embedded expressions  .

Multi-line strings .

Template literals tags for string taggings and formatting .


String interpolation or templating.
------------------------
------------------------

So say ,for example ,you want to create some string(s) with variable information that can be passed as 
a parameter to a method or whatever .

Lets take this real life practical example where we want to build a general SQL query to retrieve some table(s)
rows .We need the table name to be variable ,not hard coded on the query string so we have two options :

The old way ,by using concatenation where we just append the table name variable 
to the static query string with the concatenation operator or +  

    buildSqlQuery(tableName):string
    {
        let query = "select * from " + tableName ;   
        return query;
    }

Obviously ,this is will just work as you can expect but imagine if you have multiple variables that you need 
to put on the string ,the process will become cumbersome and error prone .

The modern approach is to use template strings that were created mainly for the sake of building strings 
out of static and variable parts .

Now lets modify our previous method to use the elegant template strings instead .

    buildSqlQuery(tableName):string
    {
        let query = `select * from ${tableName}`   
        return query;
    }
  
As you can see we need to use two things ,backticks and ${} interpolation .

Anything inside ${} will be evaluated as a TypeScript expression .

So strings are not static and dump container of characters anymore ,TypeScript can now look ,inside the 
strings ,for any experessions and evaluate them .


Multi-line strings 
------------------------
------------------------

Beside string interpolation you can use template strings for for representing strings with multipe lines 
without using the escape character <em>\</em> and the new line character <em>\n</em>

So say you want to declare a string variable with many lines with line breaks formatting for clarity 

Using the old way ,you can do something like that : 

    let articleTable : string = "CREATE TABLE IF NOT EXISTS  articles (\
                            \n id INTEGER PRIMARY KEY,\
                            \n reference VARCHAR(32) NOT NULL,\
                            \n name TEXT NOT NULL,\
                            \n quantity REAL,\
                            \n unite VARCHAR,\
                            \n purchased INTEGER,\
                            \n reserved INTEGER,\
                            \n sold INTEGER,\
                            \n available INTEGER,\
                            \n minimum INTEGER,\
                            \n familly_id INTEGER,\
                            \n FOREIGN KEY(familly_id) REFERENCES famillies(id)\
                            \n );";  

Using template strings ,you just need to do 

    let articleTable : string = `CREATE TABLE IF NOT EXISTS  articles (
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
                            familly_id INTEGER,
                            FOREIGN KEY(familly_id) REFERENCES famillies(id)
                            );`;


So as you can see the second way is minimalistic and more elegant .


String or template tags 
----------------
----------------

Another common use of template strings are tags .If you are not familiar with templating engines concepts
from template strings are borrowed ,then a tag is simply a function that can pre-process a string to present it 
in another format .For example you can create atgs for common things such as 

Capitalize a string .

Escape some characters such as HTML tags .

Convert it to uppercase .

Convert it to lowercase .

Format dates etc .

There are countless uses of tags .

In TypeScript to create a tag ,we just create a normal function and place it before the string 

The tag function takes two parameters ,an array of static strings and a variadic array of evaluated expressions 


    function uppercase(strings, ...values){
        //you can now convert the sub strings to uppercase ,
        //concatenate them and return an uppercase string 
        //of the original 
        //We are just going to return the set of substrings and evaluated expressions 
        return `[ ${strings} ] :  (${values})`;
    }


Now lets use it 

    var upperCaseString = uppercase `i want this string to be converted to uppercase`;


Conclusion 
---------------
---------------

Template strings in TypeScript are borrowed from templating engines used mainly with server side web 
frameworks to create templates .In this tutorial we have seen common and practical uses for template 
strings and how they can replace old methods for writing powerful utilities with clear and more readable code .
