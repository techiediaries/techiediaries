---
layout: post
title: "Laravel UI Scaffolding Tutorial: make:auth removed in Laravel 6"
image: "images/content/laravel.png"
excerpt: "In this tutorial, we'll learn about the new laravel/ui package for UI scaffolding" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

If you have already tried Laravel 6 and particularly the auth scaffolding you will find out that the `php artisan make:auth` command doesn't work anymore. This is simply because it's now removed in Laravel 6 and the UI scaffolding is moved to a separate package called `laravel/ui`.

The `laravel/ui` package provides the login and registration scaffolding with React, Vue, jQuery and Bootstrap layouts.

## What is Laravel/UI

[Laravel UI](https://github.com/laravel/ui)  is an official package that contains the extracted UI parts from a Laravel project. 

## How to Install `laravel/ui`

Before you can add the UI scaffoldings in your Laravel 6 via the artisan command, you first need to install the  `laravel/ui`  package via composer:

```bash
$ laravel new laravel-project
$ composer require laravel/ui
```

Now, you'll have many commands at your disposal that you can use to scaffold UI parts such as the authentication views.

The UI package provides the following commands:

```bash
$ php artisan ui --help
Description:
  Swap the front-end scaffolding for the application

Usage:
  ui [options] [--] <type>

Arguments:
  type                   The preset type (bootstrap, vue, react)

Options:
      --auth             Install authentication UI scaffolding
      --option[=OPTION]  Pass an option to the preset command (multiple values allowed)
  -h, --help             Display this help message
  -q, --quiet            Do not output any message
  -V, --version          Display this application version
      --ansi             Force ANSI output
      --no-ansi          Disable ANSI output
  -n, --no-interaction   Do not ask any interactive question
      --env[=ENV]        The environment the command should run under
  -v|vv|vvv, --verbose   Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
```

This is how you generate the auth scaffolding based on Vue.js or React:

```bash
$ php artisan ui vue --auth
$ php artisan ui react --auth
```

## What about the ui:auth command?

The new  `laravel/ui`  package provides another `ui:auth` command that can also be used for scaffolding the auth views. 

In your terminal, simply type:
```bash
$ php artisan ui:auth
```

This command will generate the authentication routes and views along with a home controller and the base layout.

If you want to generate the views alone, type the following command instead:

```bash
$ php artisan ui:auth --views
```


## Conclusion

We have seen how to use the laravel/ui package to scaffold the auth views based on Vue, React or Bootstrap in Laravel 6 instead of the removed `php artisan make:auth` command.


You can find more details about the laravel/ui package from the [official docs](https://laravel.com/docs/6.0/authentication).

 