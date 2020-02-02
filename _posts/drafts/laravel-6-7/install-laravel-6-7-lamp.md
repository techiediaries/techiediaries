---
layout: post
title: Install and Configure Laravel 6/7 and phpmyadmin on Ubuntu 18.04/19.04 with Apache, MySQL, and PHP 7.2 (LAMP)
date: 2020-02-1 05:44
categories: laravel
author: ahmed
tags: [ laravel ]
excerpt: "How to install Laravel 6/7 on Ubuntu 18.04/19.04 with Apache, MySQL, PHP 7 (LAMP Stack)"
---

https://miro.medium.com/max/3212/1*oeGayEJ1a_QzcD0P_P_jVA.png

[Laravel](https://laravel.com/) is an open-source PHP framework that provides a set of tools and resources to build modern PHP applications. With a [complete ecosystem](https://laravel.com/#ecosystem) leveraging its built-in features, Laravel’s popularity has grown rapidly in the past few years, with many developers adopting it as their framework of choice for a streamlined development process.

In this post, we'll see how to set up Laravel 6/7 and phpmyadmin with the LAMP stack on ubuntu 18.04.

In this guide, you’ll install and configure a new Laravel application on an Ubuntu 18.04 server, using [Composer](https://getcomposer.org/) to download and manage the framework dependencies. When you’re finished, you’ll have a functional Laravel demo application pulling content from a MySQL database.


## Prerequisites


You need to have a Ubuntu 18.04 or Ubuntu 19.04 system with:

- git, 
- curl, 
- zip and unzip,
- wget.

You can install these tools with the following command:

```bash
$ sudo apt install -y git curl wget zip unzip
```


## Installing Apache

Let's get started by installing Apache. Go back to your terminal and run the following command:

```bash
$ sudo apt install apache2
```

You can verify that the apache server is running, run the following command:

```bash
$ sudo systemctl status apache2
```


## Step 2 — Adjust the Firewall to Allow Web Traffic

sudo ufw allow in "Apache Full"

The response will be:

![](https://miro.medium.com/max/60/1*w5zT7Za1GIvi-Os92gDnaQ.png?q=20)

![](https://miro.medium.com/max/522/1*w5zT7Za1GIvi-Os92gDnaQ.png)

Then check this address in the browser :  [http://your_server_ip](http://your_server_ip/)  . In my case:

http://127.0.0.1

You will see this:

![](https://miro.medium.com/max/60/1*pksHQ74J6-sKrXKoRiYHDg.png?q=20)

![](https://miro.medium.com/max/1074/1*pksHQ74J6-sKrXKoRiYHDg.png)

As you see above, the service appears to have started successfully, you can also access to your server through the [http://localhost](http://localhost/)  address and you will see the same Apache2 default home page.

## Attention: Enabling mod_rewrite

We need to activate  `mod_rewrite`. It's available but not enabled with a clean Apache 2 installation.

sudo a2enmod rewritesudo systemctl restart apache2

![](https://miro.medium.com/max/60/1*mEJp3EMh67SjWLr1X6RHqQ.png?q=20)

![](https://miro.medium.com/max/488/1*mEJp3EMh67SjWLr1X6RHqQ.png)

Read  **_Note 0_**  at the end.

## Step 3— Install MySQL:

sudo apt install mysql-server

**Optional:**

Then remove some dangerous defaults after installing mysql:

sudo mysql_secure_installation

Think about a strong password for user root in Mysql ( in level 1=Medium, it must have sing, digit, lowercase and uppercase letters). Don’t forget to save it.

Type your selected root password when it asks. Read more about improving MySQL installation security  [here](https://dev.mysql.com/doc/refman/5.7/en/mysql-secure-installation.html).

![](https://miro.medium.com/max/60/1*vTXPVIcmhEf2ccWCFntpmA.png?q=20)

![](https://miro.medium.com/max/675/1*vTXPVIcmhEf2ccWCFntpmA.png)

And then answer the other questions arise with  **_Yes_**!

-   Remove anonymous users? y
-   Disallow root login remotely? y
-   Remove test database and access to it? y
-   Reload privilege tables now? y

Then you should try to connect mysql with root password

sudo mysql -u root -p

and when you see  **_mysql>_**  you can type  **_exit_** to quit from mysql environment.

## Step 4— Install PHP:

sudo apt install php libapache2-mod-php php-mysql

For Laravel installation and also  _phpmyadmin_  you will need some important php modules, so do this:

sudo apt install php7.2-common php7.2-cli php7.2-gd php7.2-mysql php7.2-curl php7.2-intl php7.2-mbstring php7.2-bcmath php7.2-imap php7.2-xml php7.2-zip

Why these modules? Read more  [here](https://laravel.com/docs/5.8/installation#installing-laravel).

## Step 5— Tell the web server to prefer PHP files over others, so make Apache look for an  `index.php`  file first.

sudo nano /etc/apache2/mods-enabled/dir.conf

Before editing:

![](https://miro.medium.com/max/60/1*W32d4rVzrYxVDpdNilAquQ.png?q=20)

![](https://miro.medium.com/max/765/1*W32d4rVzrYxVDpdNilAquQ.png)

Then edit the  **_dir.conf_**  file in a way that  **_index.php_**  has the priority over the others, as like as:

<IfModule mod_dir.c>  
DirectoryIndex  **index.php**  index.html index.cgi index.pl index.xhtml index.htm  
</IfModule>

Then  **Ctrl+x**  and answer  **_yes_**  to override the file. Then

sudo systemctl restart apache2

## Test:

Check the correctness of installation by:

sudo nano /var/www/html/info.php

And put this:

<?php  
phpinfo();  
?>

Then check in the browser this:  [http://your_server_ip/info.php](http://your_server_ip/info.php)

In my case is :

[http://127.0.0.1/info.php](http://your_server_ip/info.php)

I will see this:

![](https://miro.medium.com/max/60/1*7LmLwxXtRf10RISn4_za9A.png?q=20)

![](https://miro.medium.com/max/1088/1*7LmLwxXtRf10RISn4_za9A.png)

Do not forget to delete info.php file!

## Step 6— Install composer on Ubuntu

**curl -sS https://getcomposer.org/installer | php****sudo mv composer.phar /usr/local/bin/composer**# this make the composer executable -> **sudo chmod +x /usr/local/bin/composer**# check versioncomposer --version

![](https://miro.medium.com/proxy/1*MhuWnwWip1NQ_5UG3ZCmNg.png)

## Step 7 — Install Fresh Laravel Project on Ubuntu

Change your directory to the place you want like:

cd ~composer create-project --prefer-dist laravel/laravel my_linux_app

Then go to the project directory :

cd my_linux_app

and then start the project:

php artisan serve

Read **Note 5** at bellow**.**

## Step 8 — Verify Laravel Installation:

I will see the project in this address:

http://127.0.0.1:8000

![](https://miro.medium.com/max/60/1*XERQ2ahk2t95NMVWPqkHlA.png?q=20)

![](https://miro.medium.com/max/1091/1*XERQ2ahk2t95NMVWPqkHlA.png)

## Attention:

This installation guide is suggested for local environment. For production you should consider more security cases!

## Note 0:

To config Appche2 you need to know these commands:

-   **a2enmod :**  (**a**pache**2**  **en**able  **mod**e) — enable an Apache2 mod.
-   **a2dismod :**  (**a**pache**2**  **dis**able  **mod**e) — disable an Apache2 mod.
-   **a2enconf :**  (**a**pache**2**  **en**able  **Config**) — enable a specific config.
-   **a2disconf :**  (**a**pache**2**  **dis**able  **config**) — disable a specific config.
-   **a2ensite :** (**a**pache**2**  **en**able  **Site**) — enable a specific app.
-   **a2dissite :**  (**a**pache**2**  **dis**able  **Site**) — disable a specific app.

example:

sudo a2enmod rewrite

Read more about Apache config and Linux in this  [article](https://www.linode.com/docs/web-servers/apache/apache-web-server-debian-8).

## **Note 1:**

You can also clone the Laravel from github repository:

git clone https://github.com/laravel/laravel.git

So you should change your directory to the project you clone and then don’t forget to do the following command to install all dependencies required for Laravel framework.

sudo composer install

## **Note 2:**

Your project and also its storage directory should be accessible. So do this:

chmod -R 755 ~/my_linux_app  
chmod -R 777 ~/my_linux_app/storage

## **Note 3:**

For each fresh installation don’t forget to generate base64 random number encryption key.

php artisan key:generate

## Note 4:

To create database for Laravel project first:

sudo mysql -u root -p

It will ask you first the sudo password and then the root mysql password. Then do this:

mysql> CREATE DATABASE  **laravel**;mysql> GRANT ALL ON  **laravel**.* to '**laravel**'@'localhost' IDENTIFIED BY 'secret';mysql> FLUSH PRIVILEGES;mysql> quit

Then in the project directory do this:

mv .env.example .env

and edit the .env file as follow:

DB_CONNECTION=mysql  
DB_HOST=127.0.0.1  
DB_PORT=3306  
DB_DATABASE=laravel  
DB_USERNAME=laravel  
DB_PASSWORD=secret

don’t forget to do:

php artisan config:cache

Then

for  **old versions** of Laravel  do:

php artisan make:auth  
php artisan migrate

For  **Laravel 6**  read:

[](https://medium.com/@panjeh/laravel-auth-routes-email-verification-reset-password-authentication-registration-routes-fb82b3337150)

## 

Laravel Auth::routes() Email verification Reset password Authentication Registration routes

### 

Auth::routes() is a helper class that helps you generate all the routes required for user authentication

#### 

medium.com

**and also:**

[](https://medium.com/@panjeh/update-laravel-installer-8b9c5e1a2366)

## 

Update Laravel installer

### 

Since I installed laravel/installer globally via

#### 

medium.com

**and**

[](https://medium.com/@panjeh/laravel-changes-in-php-artisan-ui-auth-php-artisan-make-auth-82fdb8893726)

## 

Laravel changes in php artisan ui:auth php artisan make:auth

### 

rollback undo effects of php artisan ui:auth php artisan make:auth

#### 

medium.com

## **Note 5:**

In  **_local_**  environment I put the project files in the /home ~ directory. and with the command php artisan serve I launch the website. While in  **_production_**  environment it is important to know that all your web content must be under the /var/www/html directory.

You can create a Laravel application under Apache2 root directory.

cd /var/www/html  
composer create-project --prefer-dist laravel/laravel  my_linux_app

Open the browser and access to laravel app by :

[http://localhost](http://localhost/)/my_linux_app/public

## Note 6:

For installation phpmyadmin you need to do:

sudo apt install phpmyadmin php-gettext

and then restart apache2

sudo systemctl restart apache2

phpmyadmin with php 7 in Ubuntu 18.04 has some issues that I fixed and explained them in  [this article](https://medium.com/@panjeh/install-phpmyadmin-on-ubuntu-18-04-with-php-7-2-and-lamp-stack-3c72e77eef33?postPublishedType=initial).

Also, for windows environment I have found  [Laragon](https://laragon.org/).