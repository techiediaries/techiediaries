---
layout: post
title: "How to Install Vue.JS in Laravel 6/7 By Example"
date: 2020-02-1 05:44
categories: laravel
author: ahmed
tags: [ laravel ]
excerpt: "Learn how to Install Vue.JS in Laravel 6/7 By Example"
---

In this quick tutorial, we'll learn how to install and use the Vue.js library in your Laravel 6 or Laravel 7 project using the `laravel/ui` package. 

The `laravel/ui` is a separate package that provides the UI scaffoldings for bootstrap, vue and react. Alongside with the auth scaffold for login and registration. 


Provided that you already have a Laravel project setup. Head over to your command-line interface and run the following command:

```bash
$ composer require laravel/ui
```

After successfully installing the `laravel/ui` package, we can now add vue to our application.



Head back to your terminal and run the following artisan command:

```bash
$ php artisan ui vue
```

If you also need to add the auth scaffolding, add the `--auth` switch to the command:

```bash
$ php artisan ui vue --auth
```

Now, you also need to install the Vue.js dependencies from npm using the following command:


```bash
$ npm install
```

You should have node and npm installed in your system for the previous command to work.