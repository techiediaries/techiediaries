---
layout: post
title: "Laravel 6/7 CORS Tutorial and Example"
date: 2020-02-1 05:44
categories: laravel
author: ahmed
tags: [ laravel ]
excerpt: "Learn how to enable cors in Laravel 6/7"
---

In this tutorial, we'll show you how to work with CORS (Cross-Origin Resource Sharing) in Laravel 6/7.


## Laravel 6/7 API  Example

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


## Solving the CORS Issues in Laravel 6/7

In Laravel. this can be solved using the `barryvdh/laravel-cors` package which can be installed using Composer.

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

That's it, you now run your Laravel 6/7 application and test your code again which should work without any CORS issues.
