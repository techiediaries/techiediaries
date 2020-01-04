---
layout: post
title: "Handling/Disabling CSRF in Laravel 5.8 when Using JavaScript/Ajax"
image: "images/content/django.jpg"
excerpt: "In this article we'll see how you can handle CSRF token in Laravel applications using a JavaScript/Ajax front-end  and then how to disable CSRF checking for specific routes." 
tags : [php , laravel] 
---

When building JavaScript applications either with advanced frameworks such as React, Angular or Vue (using fetch or Axios for HTTP) or with plain JavaScript/jQuery/Ajax you'll need to take care of attaching a CSRF token to your sent requests (particularly POST requests) so you can take advantage of the CSRF protection offered by Laravel.

Actually Laravel 5.8 will not allow any POST request without a valid CSRF token attached. CSRF prevents malicious users from exploiting established connections to your website to send data to your server on behalf of the original user.   

>Laravel automatically generates a CSRF "token" for each active user session managed by the application. This token is used to verify that the authenticated user is the one actually making the requests to the application.

See more information about CSRF tokens in [Laravel docs](https://laravel.com/docs/5.8/csrf)


In this article we'll see how you can handle CSRF token in Laravel applications using a JavaScript/Ajax front-end  and then how to disable CSRF checking for specific routes.


## Handling Laravel 5.8 CSRF when Using Axios

If you are using the Axios client for sending HTTP requests then you don't have to worry about adding any CSRF token to your requests since by default Laravel automatically attach it to each request send using Axios. This is achieved in the `resources/assets/js/bootstrap.js` file. 

If you prefer to use any other client other than Axios you need to attach the CSRF token manually. This can be done in two ways depending on how you use JavaScript in your Laravel project.

## JavaScript Included in Laravel 5.8 Templates

For simple apps where you have JavaScript code rendered in your Blade templates then you can use Blade tags to attach the token. For example let's suppose that we are sending an Ajax request using the jQuery `$.ajax()` method which is a wrapper around the JavaScript XHR interface 

```javascript
$.ajax({
      type: "POST",
      url: "/endpoint",
      data: {'_token': "{{ csrf_token() }}"},
      dataType: 'JSON',
      success: function (data) {
        console.log(data);
      }      
    })
```

This code uses the Blade tag `csrf_token()` to generate a CSRF token when rendering the template.

## Stand-alone JavaScript/Single Page Applications 

If you are building a single page application or you are using JavaScript in separate files which are not pre-processed by Laravel templates engine Blade you'll need to follow these two steps:

First you need to add your CSRF token as a meta tag

```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```

Next you'll need to get the meta tag value using JavaScript/jQuery DOM query methods

For jQuery you can do this:

```js
$('meta[name="csrf-token"]').attr('content');
```

You can also use plain JavaScript:

```js
document.querySelector('meta[name="csrf-token"]').content
```

## Disabling CSRF In Laravel 5.8

CSRF is enabled by default in Laravel 5. You can disanle it for specific routes
by tweaking the `app/Http/Middleware/VerifyCsrfToken.php` middleware  

```php

private $routes = ['/route1'];

public function handle($request, Closure $next)
{
     
    foreach($this->routes as $route) {

      if ($request->is($route)) {
        return $next($request);
      }
    }
    
    return parent::handle($request, $next);
}
```

## Conclusion

In this quick tutorial we have seen how to attach a CSRF token to your HTTP requests in Laravel 5.8 when using JavaScript with Laravel and how to disable CSRF protection for specific routes. 








   