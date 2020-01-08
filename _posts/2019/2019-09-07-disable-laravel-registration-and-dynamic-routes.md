---
layout: post
title: "Disable Laravel 6 Registration & Dynamic Routes"
image: "images/content/laravel.png"
excerpt: "In this tutorial, we'll see how we can disable and remove the register route and view from the authentication system of our application if there is at least one admin user in our database. We'll achieve that by dynamically adding the register route to the routes/web.php file after querying the database to check for the absence of users with the admin role" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

In this tutorial, we'll see how we can disable and remove the register route and view from the authentication system of our application if there is at least one admin user in our database. We'll achieve that by dynamically adding the register route to the `routes/web.php` file after querying the database to check for the absence of users with the admin role. 

If you didn't follow from the previous tutorial(s), where we started building a CRM application from scratch using Laravel 6 framework, let's give you some background why we need to disable the registration functionality in our application.  

We are building a self-hosted CRM application that can be hosted on the web by teams and organizations for managing their customer relationships. So, not anyone should be able to register except for the first user that should be the admin. 

Other users will be created via the users' dashboard by the admin(s). 

We have already added user authentication using the auth scaffolding in Laravel 6 via the separated `laravel/ui` package. So, all we need to do is customizing the system to disable registration after the creation of a first admin user. 

We've also added a role field the users' table so we can assign admin roles to specific users in our application.

 
We'll learn: 

- How to disable registering new users and remove the auth routes and views using the `Auth::routes()` method,
- How to conditionally/dynamically add Laravel routes.

Now, open the `routes/web.php` file and change as follows:

```php
<?php
use App\User;

Route::get('/', function () {
    return view('welcome');
});

if (User::where("role","=", "admin")->exists())
{
    Auth::routes([
        'register' => false
    ]);
    
}
else
{
    Auth::routes();
}

Route::get('/home', 'HomeController@index')->name('home')->middleware('auth');
```

Now, the register view and route will not be added to our Laravel application if there is at least one user with an admin role in the database. This first admin user should be added to our application the first time we host the app as part of the initial setup process. After that, registering new users will be disabled and only performed by the admin from a users dashboard.

At this point, if you run the app, you will still see the register route and view even after you register for a first account, simply because even if we have the logic that dynamically disables registration using a condition in the `routes/web.php` file, the registered user has a `user` role since it's the default value of the role field. 

We need a way to change the role to `admin` just before the user is saved in the database. 

Laravel provides **model events and observers** which we shall see in the next tutorial and use them to implement our desired functionality. 

## Conclusion

In this tutorial, we've seen how to disable registration in our Laravel 6 application by conditionally calling the `Auth::routes()` method for dynamically inserting the appropriate routes depending on the existence or absence of admin users in the database. 

