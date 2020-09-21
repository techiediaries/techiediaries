---
layout: post
title: "Install Laravel 8 with PHP 7.3 & Composer"
image: "images/content/php.png"
excerpt: "In this post, we'll see how to install Laravel 8 and create a new project but also how to install PHP 7.3 the minimal required version for installing Laravel 8 in our development machine" 
tags : [php , laravel, laravel-6-tutorials-and-examples, mysql]
date: 2020-09-21
---

In this post, we'll see how to install Laravel 8 and create a new project but also how to install PHP 7.3 the minimal required version for installing Laravel 8 in our development machine.

## Installing PHP 7.3+

Laravel 8 requires PHP 7.3+ or above so you need this version or the latest version of PHP installed on your system. The process is straightforward on most systems.

On Ubuntu, you can follow these instructions.

First add the `ondrej/php` PPA which contains the latest version of PHP: 

```bash
$ sudo add-apt-repository ppa:ondrej/php
$ sudo apt-get update
```

Next, install PHP 7.3 using the following command:

```bash
$ sudo apt-get install php7.3
```

 
### Installing the Required PHP 7.3 Modules

Laravel requires a bunch of modules. You can install them using the following command:

```bash
$ sudo apt-get install php7.3 php7.3-cli php7.3-common php7.3-json php7.3-opcache php7.3-mysql php7.3-mbstring php7.3-mcrypt php7.3-zip php7.3-fpm php7.3-xml
```
 
## Installing PHP Composer

Let's start our journey by installing Composer, The PHP package manager.

Navigate in your home directory, then download the installer from the official website using  `curl`:

```bash
$ cd ~
$ curl -sS https://getcomposer.org/installer -o composer-setup.php
```

You can then install  `composer`  globally on your system by using the following command:

```bash
$ sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

You can make sure your installation works as expected by running `composer` in your terminal:
 
```bash
$ composer
```

If you've successfully installed Composer in your system, you are ready to create a Laravel 8 project.

## Installing and Creating a Laravel 8 Project

In this section we'll introduce Laravel and then proceed it to install and create a Laravel 8 project. 

### About Laravel

[Laravel docs](https://packagist.org/packages/laravel/framework) describe it as:

>Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as:

>-   [Simple, fast routing engine](https://laravel.com/docs/routing).
>-   [Powerful dependency injection container](https://laravel.com/docs/container).
>-   Multiple back-ends for  [session](https://laravel.com/docs/session)  and  [cache](https://laravel.com/docs/cache)  storage.
>-   Expressive, intuitive  [database ORM](https://laravel.com/docs/eloquent).
>-   Database agnostic  [schema migrations](https://laravel.com/docs/migrations).
>-   [Robust background job processing](https://laravel.com/docs/queues).
>-   [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

>Laravel is accessible, yet powerful, providing tools needed for large, robust applications.

Generating a Laravel 8 project is easy and straightforward. In your terminal, run the following command:

```bash
$ composer create-project  --prefer-dist  laravel/laravel laravel-8-crud-app 8
```

This will install `laravel/laravel` **v8**.

> **Note**: Make sure you have PHP 7.3+ installed on your system. Otherwise, composer will use a previous version of Laravel for your project.

You can verify the installed version in your project using:

```bash
$ cd laravel-8-crud-app
$ php artisan -V
Laravel Framework 8
```

## Installing the Front-End Dependencies

In your generated project, you can see that a `package.json` file is generated which includes many front-end libraries that can be used by your project:

- axios,
- bootstrap,
- cross-env,
- jquery,
- laravel-mix,
- lodash,
- popper.js,
- resolve-url-loader,
- sass,
- sass-loader,
- vue.
 

> **Note**: You can use your preferred libraries with Laravel not specifically the ones added to `package.json`. 
> 
>The `package.json` file in your Laravel project includes a few packages such as `vue` and `axios` to help you get started building your JavaScript application. 
>
>It also includes `bootstrap` to help you get started with Bootstrap for styling your UI.
>
> It include [Laravel Mix](https://laravel.com/docs/6/mix#working-with-stylesheets) to help you compile your SASS files to plain CSS.
 
You need to use `npm` to install the front-end dependencies:

```bash
$ npm install
```

After running this command a `node_modules` folder will be created and the dependencies will be installed into it.

> **Note**: You need to have Node.js and npm installed on your system before you can install the front-end dependencies.



## Conclusion

Read the next [tutorial](https://www.techiediaries.com/laravel-8-rest-api-crud-mysql/) to create a REST API CRUD application with Laravel 8, PHP 7 and MySQL.
