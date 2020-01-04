---
layout: post
title: "PHP Tutorial with Angular 8"
image: "images/content/php.jpg"
excerpt: "In this tutorial, we'll learn web development with php and we'll compare php with various solutions such as Python & Django and Ruby On Rails" 
tags : [php , mysql, angular, angular8 ] 
---

Throughout this php tutorial for beginners by example, we'll learn to build web applications with PHP 7 for server and MySQL for database access and storage (and also Angular 8 for front-end). In this tutorial, we'll create a **CRUD** (Create, Read, Update and Delete) example application with a MySQL database. We'll also see how we can build modern PHP applications with a frontend UI built with the latest Angular 8 framework. 

- Introducing PHP for Angular 8 developers
- [Angular 7|8 with PHP and MySQL RESTful CRUD Example & Tutorial](https://www.techiediaries.com/php-angular)
- [Angular 7|8 with PHP: Consuming a RESTful CRUD API with HttpClient and Forms](https://www.techiediaries.com/php-angular-crud-api-httpclient-forms)


<div id="toc_container">
<p class="toc_title">PHP Tutorial</p>
<ul class="toc_list">
<li>
<a>How Would you Use Angular 8 with PHP?
</a>
</li>
<li>
<a>How to Connect Angular 8 with PHP</a>
</li>
<li>
<a href="#Introducing_PHP_7">Introducing PHP 7</a>
</li>
<li>
<a href="#PHP_Tutorial_Prerequisites">PHP Tutorial Prerequisites</a>
</li>
<li>
<a href="#PHP_Scripts">PHP Scripts</a>
</li>
<li>
<a href="#Why_Using_PHP">Why Using PHP?</a></li>
<li>
<a href="#PHP_Basics">PHP Basics</a></li>
<li>
<a href="#conclusion">Conclusion</a>
PHP vs. Python & Django
</li>
</ul>
</div>

## How Would you Use Angular 8 with PHP?

PHP is a server language that can be used to build server-side web apps while Angular is a client-side platform for buiding front-end web apps and mobile apps. So, how can both technologies be connected for developing the same app?

Web apps have both a frontend and backend so you can use PHP in the backend for accessing server resources like a MySQL database and use Angular in the frontend to structure and build the user interface which usually consumes and renders data coming from the server.

## How to Connect Angular 8 with PHP

Traditionally, PHP takes care of preprocessing the PHP code and rendering an HTML page then send to the client browser. With Angular, this is not the case anymore since the processing that was done in PHP is now done in the browser thanks to Angular.


There are two approaches for connecting your Angular frontend with your PHP backend:

- Use separate Angular and PHP apps: In this approach, you need to build and expose a REST API from your PHP backend. PHP is now used to interact with the database and send JSON responses to the frontend which you need to build as an Angular frontend app that consumes the REST API by sending HTTP calls to the API endpoints and render the received data. This is the best approach since it allows you to build one backend that can be connected to multiple web and mobile apps.  

- Use one app that contains both PHP and Angular: In this case, your PHP app needs to be able to serve the Angular frontend.



## <a name="Introducing_PHP_7">Introducing PHP 7 for Angular 8 Developers</a>

PHP stands for **Hypertext Preprocessor**. PHP is a the most popular programming language for building web applications. It's an open source scripting language that runs on the server. PHP is free to download and use and easy to learn.

PHP 7 is the latest version of PHP which brings many new features to the language:

- Speed: PHP 7 has increased performance and better memory consuption
- Type declarations
- Return type declarations
- Better error handling
- Throwable interface


## <a name="PHP_Tutorial_Prerequisites">PHP Tutorial Prerequisites</a>

To complete this tutorial and build a web application you need to have some basic understanding of the following technologies:

- HTML
- CSS
- JavaScript


## <a name="PHP_Tutorial_Requirements">PHP Tutorial Requirements</a> 	

Throughout this php tutorial we assume you have a development machine with these requirements installed:

 * A web server: you can install either Apache or nginx (You can also use the built-in PHP 7 server for development).
 * PHP 7
 * MySQL database system

## <a name="PHP_Scripts">PHP Scripts</a>

PHP scripts may contain PHP code with HTML, CSS, JavaScript and text comments.

Scripts are executed on the server side and only the processed HTML and JavaScript code is returned to the browser.

PHP scripts use the `.php` extension.

## <a name="Why_Using_PHP">Why Using PHP?</a>


- PHP is available on popular platforms such as Windows, Linux and Mac etc.
- PHP can be used with most popular servers such as Apache and IIS etc.
- PHP works with most popular database system but commonly used with MySQL.
- PHP is free and open source.

## <a name="PHP_Basics">PHP Basics</a>

Before adding PHP code inside a script file that ends with `.php` you need to start your code with `<?php` tag and ends it with `?>`.

For example, this is a file that displays a **Hello World!** string:

```php
 <!DOCTYPE html>
<html>
<body>

<h1>PHP Example</h1>

<?php
echo "Hello World!";
?>
</body>
</html> 
```

The script contains an HTML document with php code. The server processes this script without touching the HTML code but only the PHP code between `<?php` and  `?>`. In this example, the php code use the `echo` function to output the **Hello World!** string.

`echo "Hello World!";` is a php statement. It ends with a semicolon `;`.

You can also add comments alongside with your php code using `//` or `#` for single-line comments and `/* */` for multi-line comments.

## PHP vs. Python & Django

PHP is a programming languages which has a sole purpose to create back-end web applications while Python is a general purpose programming language that can be used for web development and other fields such as data science and scientific calculations so our comparison will be between PHP and Python equipped with a web framework. The most popular web frameworks for Python are Django and Flask with Django being more popular than Flask.
   
In order to compare PHP with Django we need to consider many factors such as:

- Are your a beginner or experienced developer?
- Are looking for quick insertion in the job market? etc.

More experienced developers have more potential to quickly learn a new programming language than beginners
 
Both PHP and Python are popular languages. They are both extremely popular among web  developers and power most of the websites on the web today.

Let's take a look at these three factors:

- Popularity of PHP and Python with Django for web development
- The learning curve for  Python, Django and PHP
- The available libraries and packages, learning resources and the community

### Popularity 

Both PHP (dominates 80% of the market)and Python are popular languages, but for web development PHP is more popular than the most popular framework for web development in Python which is Django.

Popular websites like Facebook and Wikipedia are built in PHP.

Also many popular website and apps that you use daily are using Python. For example, YouTube, Reddit, Pinterest and Instagram etc.
 
### Learning Curve
 
A learning curve describes how easy or difficult the programming language is? Which simply means how easy to become familiar with the programming syntax and to start implementing requirements using the language.

Python is a lot easier than PHP since it has clear and readable syntax so for a beginner developer it would be easier to learn. Many universities in the world are using Python as the first programming language for their students.

On the other hand, PHP has a less readable and confusing syntax which makes the learning process for  a beginner developer more difficult, but to be fair, once your learn and become familiar with the syntax you can start creating websites with the same ease.

 
### Batteries and libraries

PHP has many libraries, frameworks and CMSs than Python. For example WordPress, the most popular CMS platfrom which everyone is using create a website is built in PHP. Also popular eCommerce solutions like Magento and WooCommerce are developed in PHP. Python with Django also offers many libraries a quite a few CMSs but not as equal to PHP.


Now let's see a list of pros and cons for both Python (and as a result Django) and PHP:

Let's start with Python pros and cons:

- Python is a popular general purpose programing language,
- [Python is considered one of the most liked programming language by developers](https://stackoverflow.blog/2017/10/31/disliked-programming-languages/),
- Easy to learn,
- Has very readable syntax,
-  Web apps created in Python are safer and more scalable

The pros and cons of PHP:

- PHP is the most popular programming language designed only for creating server web applications. [80% of websites in the Internet are powered by PHP](https://w3techs.com/technologies/history_overview/programming_language)
- [PHP is the most hated programming language by developers](https://stackoverflow.blog/2017/10/31/disliked-programming-languages/)
- Easier to learn but has confusing syntax for beginners
- PHP is less secure than other programming languages designed for web development

## <a name="conclusion">Conclusion</a>

In this tutorial, we've introuced PHP for Angular 8 developers. Next, we'll see how to create a modern PHP application with REST APIs and Angular 8 interface.

> Read: [Angular 7|8 with PHP and MySQL RESTful CRUD Example & Tutorial](https://www.techiediaries.com/php-angular)
>
> [Angular 7|8 with PHP: Consuming a RESTful CRUD API with HttpClient and Forms](https://www.techiediaries.com/php-angular-crud-api-httpclient-forms)

The best recommendation, for beginner developers is to try out both languages and then choose the one they are more comfortable with. But you need also to consider the job market and learning resources. PHP offers you a better chance for quickly getting a job and has more learning resources around the world.


