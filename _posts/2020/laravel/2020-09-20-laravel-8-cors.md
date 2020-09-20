---
layout: post
title: "Laravel 8 CORS Tutorial and Example"
date: 2020-09-20
author: ahmed
tags: [ laravel ]
canonical: "https://www.techiediaries.com/laravel/laravel-7-6-cors-example-and-tutorial/"
excerpt: "Learn how to enable cors in Laravel 8"
---

In this tutorial, we'll show you how to work with CORS (Cross-Origin Resource Sharing) in Laravel 8.

This tutorial shows you how to implement CORS in both Laravel 6 using a third-party package and Laravel 8 and Laravel 7 which include a first-party package for CORS support. 

## Laravel 8 CORS Support

According to the official [docs](https://laravel.com/docs/8.x/routing#cors)

> Laravel can automatically respond to CORS OPTIONS requests with values that you configure. All CORS settings may be configured in your cors configuration file and OPTIONS requests will automatically be handled by the `HandleCors` middleware that is included by default in your global middleware stack.

This means Laravel 8 has built-in support for CORS using the `HandleCors` middleware that is included by default in your global middleware stack.

CORS support is added via the [fruitcake/laravel-cors](https://github.com/fruitcake/laravel-cors) package which has added [support for Laravel 8](https://github.com/fruitcake/laravel-cors/commit/4b19bfc3bd422948af37a42a62fad7f49025894a).

### How to Configure CORS in Laravel 8

All CORS settings can be configured in your `cors` configuration file. 

Open the `config/cors.php` file and change the required settings as per your requirements:

```php
<?php

return [

    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => false,

    'max_age' => false,

    'supports_credentials' => false,

];

```

If you are using other versions of Laravel, make sure to read below.

## Laravel 7 CORS Support

Laravel 7 has been released on March and provides built-in support for CORS so developers don't need to use third party packages to enable CORS in their laravel apps.

According to the [official docs](https://laravel.com/docs/7.x/releases):

>Laravel 7 includes first-party support for configuring Cross-Origin Resource Sharing (CORS) OPTIONS request responses by integrating the popular Laravel CORS package written by Barry vd. Heuvel. A new cors configuration is included in the default Laravel application skeleton.

For Laravel 6, make sure to continue reading below for a step by step example on how to enable CORS in your REST API backend.
  

## Laravel 7 CORS by Example

Let's now see how CORS is handled in Laravel 7. In fact, you don't need to do much. Open a new command-line interface and start by generating a [new Laravel 7 project](https://www.techiediaries.com/how-to-install-laravel-7/):

```bash
composer create-project --prefer-dist laravel/laravel laravel-7-cors-example
```

You'll notice that a package called `fruitcake/laravel-cors` is installed in your project.

Laravel 7 can automatically respond to CORS HTTP `OPTIONS` requests with values that you can configure. 

All CORS settings can be configured in your `cors` configuration file. 

Open the `config/cors.php` file:

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => false,

    'max_age' => false,

    'supports_credentials' => false,

];

```

As you can see you can configure the various aspects of your app such as:

- The paths that will have CORS configured, 
- The allowed methods.
- The allowed origins,
- the allowed heades.
- The max age,
- The credentials support.

If you are using custom headers, such as `X-Auth-Token`, you need to  add these headers in the `allowed_headers` array. You can also use ['*'] to allow all custom headers.

`allowed_origins`, `allowed_headers` and `allowed_methods` can be set to ['*'] to accept any value.


> Note: Because of http method overriding in Laravel, If you enable POST methods, users can also send PUT and DELETE requests withour any CORS issues.

The HTTP `OPTIONS` requests will automatically be handled. Open the `App/Http/Middleware/Kernel.php` file:

```php
<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    protected $middleware = [
        \App\Http\Middleware\TrustProxies::class,
        \Fruitcake\Cors\HandleCors::class,
        \App\Http\Middleware\CheckForMaintenanceMode::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];
```

The `HandleCors` middleware is added by default in project's gloabl middlewares.


## Laravel 6 API with CORS Example

Let's get started by creating a simple API route in our Laravel project.

Head over to the `routes/api.php` file and add the following route.


```php
Route::get('/my-api-endpoint',  function  (Request $request)  {

  return response()->json(['Hello Laravel 7']);

});
```

Now, if we need to call this API endpoint from another domain, CORS issues will appear.

## Sending an Http/Ajax Request

Create new HTML file named `index.php` inside a separate folder and add the following JavaScript/jQuery code to connect to the Laravel API:

```html
<!DOCTYPE html>
<html>
<head>

  <title>Laravel 6/7 CORS Middleware Tutorial</title>

  <script  src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"  crossorigin="anonymous"></script>

</head>

<body>

<script  type="text/javascript">

  $.ajax({
    type:  "GET",
    dataType:  "json",
    url:  'http://localhost:8000/my-api-endpoint',
    success:  function(data){
        console.log(data);
    }
  });

</script>
</body>
</html>
```

You can simply run this script using the PHP built-in server as follows:

```bash
$ php -S localhost:8080
```



Now we have two apps running from two different ports: `localhost:8080` and `localhost:8000` which are considered two different domains.

## The CORS Error

If the CORS is not configured properly in the target server, which is in our case, Laravel, we'll face CORS issues which disallows the JavaScript/jQuery code from connecting to the API endpoint for security reasons. 

This is the exacte error message that you should see in your browser's console:

```
Access to XMLHttpRequest at 'http://localhost:8000/my-api-endpoint' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

This simply says that a `Access-Control-Allow-Origin` header should be present in the requested resource.


## Solving the CORS Issues in Laravel 6

In Laravel 6. CORS issues can be solved using the `barryvdh/laravel-cors` package which can be installed using Composer.

### Installing and Configuring `barryvdh/laravel-cors`

Head back to your terminal and make sure you are inside your Laravel 6/7 project then install install the `barryvdh/laravel-cors` package using the following command:

```bash
$ composer require barryvdh/laravel-cors
```

Next, go to the `config/app.php` file and update it as follows:


```php
'providers'  =>  [

  [...]

  Barryvdh\Cors\ServiceProvider::class,

],
```

Next, add the `\Barryvdh\Cors\HandleCors` middleware to the `app/Http/Kernel.php` file:

```php
protected $middleware =  [

  [...]

 \Barryvdh\Cors\HandleCors::class,

];
```

## Conclusion

That's it, you now run your Laravel 8 application and test your code again which should work without any CORS issues.

We have also seen how to configure CORS in both Laravel 7 using the built-in support and Laravel 6 using a third-party package.