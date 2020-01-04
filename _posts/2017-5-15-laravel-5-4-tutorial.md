---
layout: post
title: "Laravel 5.7 Tutorial"
image: "images/content/laravel-5-4-tutorial.jpg"
excerpt: "Laravel 5.7 tutorial for beginners" 
tags : [php,laravel]
---



Laravel is a popular PHP framework, first created in 2011 and always growing in popularity. In 2015 
Laravel was the most starred PHP framework on Github. Since its first days, it has experienced an 
exponential adoption among PHP developers.

Laravel has a lot of modern features just like the well known Python framework Django. It's also 
based on Symfony, one of the greatest PHP framework and is considered by many developers as a lightweight 
version of Symfony.

In this tutorial, we are going to focus on the latest version of Laravel which is 5.7

Throughout this tutorial series, we are going to build a PHP web application to demonstrate 
many features and constructs of Laravel 5.7, from templates and routes to models and database.

For an updated and complete version of this tutorial, check out [Laravel 5.7 Tutorial: Build your First CRUD App with Laravel and MySQL (PHP 7.1)](http://techiediaries.com/php-laravel-crud-mysql-tutorial)


First things first. We are going to start by installing PHP and Laravel 5.7 on our system.

This tutorials has these requirements:

- A PHP environment installation,
- MySQL database system installed.

So you need to have PHP installed on your system. To check if PHP is installed, open your terminal on Linux/MAC or 
command prompt on Windows and type: 

    php -v 

You should get something like this 

    PHP 7.0.6-1+donate.sury.org~wily+1 (cli) ( NTS )
    Copyright (c) 1997-2016 The PHP Group
    Zend Engine v3.0.0, Copyright (c) 1998-2016 Zend Technologies
        with Zend OPcache v7.0.6-dev, Copyright (c) 1999-2016, by Zend Technologies

Which means you have PHP 7 installed.

If the command is not recognizable by your system then go ahead and install PHP before continuing with this tutorial.

Now lets install Composer. In case you are wondering, this is a package/dependency manager for PHP that allows 
you too pull and automatically install PHP packages (frameworks, libraries etc.) from a remote registry 
where other PHP developers publish their packages for everybody to install. For example, Laravel 5.7 
can be installed using Composer.

To install Composer ,visit this <a href="https://getcomposer.org/download/">website</a> then copy 
the installer script and paste it in your terminal. The installer will download the latest composer.phar  
to your current directory.

To run Composer, type: 

    php composer.phar

From the same directory where you have downloaded the installer script.

You can also make Composer available globally by putting it in a folder that's part of the PATH 
system variable 

On Unix based systems such as Linux and MAC you can do something like that: 

    sudo mv composer.phar /usr/local/bin/composer        

Or without sudo on some systems, by the way I'm using an Ubuntu system so the commands I enter 
maybe different on your system.

Now you can run: 

    composer 

To use Composer from your terminal.



## Downloading and installing Laravel 5.7

Using Composer you can install larave 5.7 with just one command: 

    composer global require "laravel/installer" 

Next add <em>$HOME/.config/composer/vendor/bin</em> to your PATH system variable to make laravel 
available from any directory.


>It can be also `$HOME/.composer/vendor/bin` depending on your system.

    export PATH=$PATH:$HOME/.config/composer/vendor/bin    

Now you can type laravel on your terminal to see a list of available commands at your disposal 

## Creating a new Laravel 5.7 project 


To create a new Laravel 5.7 project, just type: 

    laravel new MyApp 

You can also use Composer to create a Laravel project without using the laravel utility: 

    composer create-project --prefer-dist laravel/laravel MyApp


Now you can run your local server with: 

    cd MyApp
    php artisan serve

You should be able to visit your web app at <em>http://localhost:8000</em>    

You can find more instructions about installation on <a href="https://laravel.com/docs/5.7/installation">Laravel 5.7 docs</a>

For the complete tutorial, check out [Laravel 5.7 Tutorial: Build your First CRUD App with Laravel and MySQL (PHP 7.1)](http://techiediaries.com/php-laravel-crud-mysql-tutorial)

## Conclusion

So we have created our fresh Laravel 5.4 project .See you on the next part where we are going to 
dive into creating database Models for our project .  
