---
layout: bpost
title: "Laravel 8 Auto-Prefixed Controller Routing: Target class does not exist"
image: "images/content/laravel.png"
excerpt: "How to fix Laravel 8 not able to find your controller with a Target class does not exist error" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

Laravel 8 officially released on 8th September 2020. The laravel team releases new Laravel version in every 6-month interval with major changes. As Laravel 8 Non-LTS (general version), the Laravel 8 will provide 6 months bug fixes until March 8, 2021, and 1-year security fixes until 8 September 2021.

Among the new changes was the removal of the default route namespacing.

If you create a new Laravel 8 project,there is no namespace prefix being applied to your route groups that your routes are loaded into. This causes en error that says **Target class does not exist**.

According to [Laravel 8.x Docs](https://laravel.com/docs/8.x/releases#laravel-8)

>"In previous releases of Laravel, the RouteServiceProvider contained a $namespace property. This property's value would automatically be prefixed onto controller route definitions and calls to the action helper / URL::action method. In Laravel 8.x, this property is null by default. This means that no automatic namespace prefixing will be done by Laravel."  

This simply changes how you reference controllers in your routing configuration file(s).

You'll need to use the fully qualified class name for your controllers when referring to them in your routes. For example:

```php
use App\Http\Controllers\HomeController;

Route::get('/home', 'App\Http\Controllers\HomeController@index');
```

You can also use the following action syntax:

```php
use App\Http\Controllers\HomeController;
Route::get('/home', [HomeController::class, 'index']);
```

Check out  [Upgrade Guide - Routing](https://laravel.com/docs/8.x/upgrade) for more information.

If you prefer to add the namespace prefix like previous Laravel versions, simply update the following variable to the `app > Providers > RouteServiceProvider.php` file:

```php
protected $namespace = null;  
```

With:

```php
protected $namespace = 'App\Http\Controllers';
```

Next,update the `boot()` method by adding `->namespace($this->namespace)` as follows:

```php
public function boot()
{
       $this->configureRateLimiting();

       $this->routes(function () {
            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));

            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/api.php'));
        });
}
```

As a summary, you have three ways to fix Laravel 8 not able to find your controller with a **Target class does not exist error**:

- Add the namespace to the `app > Providers > RouteServiceProvider.php` file just like previous Laravel versions,
- Use the fully qualified class name of your controller in your route files when using the string-syntax,
- Use the action syntax.