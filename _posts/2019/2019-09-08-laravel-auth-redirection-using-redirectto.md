---
layout: post
title: "Laravel 6 Auth Redirection Using redirectTo"
image: "images/content/laravel.png"
excerpt: "In this tutorial, we'll learn how to customize the auth system in our Laravel 6 CRM app to redirect users after they register or login to a different route depending on their role" 
tags : [laravel, laravel6] 
---


In this tutorial, we'll learn how to customize the auth system in our Laravel 6 CRM app to redirect users after they register or login to a different route depending on their role.
 
Most of the times, the authentication system provided by Laravel 6 is enough for adding login and registration to your web application. 

The auth scaffolding which is now moved to a separate `laravel/ui` package provides out of the box routes and views for the `LoginController`, `RegisterController`, and `ResetPasswordController` which are included in your project and are responsible for providing the functionality of the auth system.

If you take a look at the `app/Http/Controllers/Auth/LoginController.php` file, for example, you would find the following code:

```php
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{

    use AuthenticatesUsers;

    protected $redirectTo = '/home';

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
```
 
You can see that a `$redirectTo` variable exists and has the value of `/home` where users are redirected after they are logged in.

In the Laravel built-in authentication system, you can customize many sides such as the redirection route using the `$redirectTo` variable which exists in both the login and registration controllers.

If you want to redirect your users to different routes other than the default ones after they register or login, you simply need to change the value of `$redirectTo`. 

Now, what if you want to redirect users to a route depending on some user criteria such as their role?

The Laravel auth system also covers that by providing a `redirectTo()` method that you can use instead of a `$redirectTo` variable.

Let's take this example of the `LoginController` of our CRM application by adding the `redirectTo()` method to redirect the admin users to a different route other than the `/home` route:

```js
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    use AuthenticatesUsers;


    protected $redirectTo = '/home';
    protected function redirectTo()
    {
        if (auth()->user()->role == 'admin') {
            return '/admin';
        }
        return '/home';
    }

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
```

We also need to do that in the registration controller. Open the `app/Http/Controllers/Auth/RegisterController.php` file and update it as follows:

```php
<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    use RegistersUsers;


    protected $redirectTo = '/home';
    protected function redirectTo()
    {
        if (auth()->user()->role == 'admin') {
            return '/admin';
        }
        return '/home';
    }


    public function __construct()
    {
        $this->middleware('guest');
    }


    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }


    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
```

You can either remove the `$redirectTo` variable or leave it as it will be simply overridden by the `redirectTo()` method.

Now, all you need is to create an `/admin` route along with an `AdminController`.  Head back to your terminal and run the following artisan command:

```bash
$ php artisan make:controller AdminController
```

Next, open the `app/Http/Controllers/AdminController.php` file and update it as follows:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return "Hello, admin!";
    }
}
```

Next, open the `routes/web.php` file and add a route to the admin controller as follows:

```php
Route::get('/admin', 'AdminController@index')->name('admin');
```

## Conclusion

In this tutorial, we've implemented redirection in our Laravel 6 CRM app so admin users are redirected to a different route while the normal users are redirected to the home route. Redirection doesn't enforce any security rules because the normal users will still be able to visit the `/admin` route. We need to prevent that using a middleware which is the subject of the next tutorial.