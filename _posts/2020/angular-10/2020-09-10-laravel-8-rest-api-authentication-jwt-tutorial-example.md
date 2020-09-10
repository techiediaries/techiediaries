---
layout: bpost
title: "Laravel 8 REST API Authentication with JWT Tutorial by Example"
image: "images/content/bootstrap.png"
excerpt: "Throughout this tutorial, we’ll be learning how to authenticate REST APIs using JWT in the latest Laravel 8 version. You will learn how to create rest API using Laravel 8 with JWT authentication"
date: 2020-09-10
tags : [php, laravel]
author: kaima
---

Throughout this tutorial, we’ll be learning how to authenticate REST APIs using JWT in the latest Laravel 8 version. You will learn how to create rest API using Laravel 8 with JWT authentication.

We’ll see how to set up JWT authentication in Laravel 8 and implement a secured REST API using the  **tymon/jwt-auth**  package.

## Laravel 8 JWT Authentication Tutorial by Example

In this tutorial, we’ll see step by step to implement a REST API with PHP and Laravel 8 with authentication via JWT tokens.

## Step 1 — Creating a Laravel 8 Application

Let’s start our tutorial by creating a Laravel 8 application using Composer — the dependency management tool for PHP developers.

Head over to a new command-line interface and run the following command:

```bash
$ composer create-project --prefer-dist laravel/laravel laravel8jwtapp
```

## Step 2 — Configuring a MySQL Database

After creating your Laravel 8 application using Composer, let’s configure a MySQL database in our second step.

Open the **.env** file located in the root of your Laravel 8′ application. Next, add the following database configuration information:

```text
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE= <database-name>
DB_USERNAME= <database-username>
DB_PASSWORD= <database-password>
```

## Step 3 — Installing jwt-laravel

Now that we have a Laravel 8 application with a MySQL database configured, let’s start implementing JWT authentication by installing the  **jwt-auth**  package.

Head back to your terminal and run the following command from the root of your project’s folder:

```bash
$ composer require tymon/jwt-auth
```

## Step 4 — Setting up JWT Authentication in Laravel 8

At this step, we have a Laravel 8 application with MySQL configured. We also installed the  **jwt-auth**  library in the previous step. Now, let’s set up JWT authentication in our application.

Head to the **config/app.php** file and add JWT providers and aliases as follows:

```php
'providers' => [
….
'TymonJWTAuthProvidersJWTAuthServiceProvider',
],
'aliases' => [
….
'JWTAuth' => 'TymonJWTAuthFacadesJWTAuth',
'JWTFactory' => 'TymonJWTAuthFacadesJWTFactory',
],
```

Next, head back to your terminal and run the following command:

```bash
$ php artisan vendor:publish --provider="TymonJWTAuthProvidersJWTAuthServiceProvider"
```

## Step 5 — Generating a JWT Secret Key

After configuring JWT authentication in our Laravel 8 app. We’ll need to generate a JWT secret key in this step.

Head over to your terminal and run the following command to generate the JWT secret key:

```bash
$ php artisan jwt:generate
```

Next, open the **vendor/tymon/src/Commands/JWTGenerateCommand.php** and update it as follows:

```php
public function handle() {$this->fire();}
```

## Step 6 — Implementing JWT Authentication in Laravel 8 User Model

After configuring JWT in Laravel 8. In this step, we’ll implement it in the User model.

Open the  **App/User.php** file, and update it as follows:

```php
<?php 
 
namespace App;
 
use IlluminateNotificationsNotifiable;
use IlluminateFoundationAuthUser as Authenticatable;
 
class User extends Authenticatable
{
    use Notifiable;
 
    protected $fillable = [
        'name', 'email', 'password',
    ];
 
    protected $hidden = [
        'password', 'remember_token',
    ];
 
}
```

## Step 7 — Implementing the REST API Controller for JWT Authentication

Let’s now implement a Laravel 8 controller for handling JWT authentication in our REST API application.

Head back to your terminal and run the following command to generate a controller:

```bash
$ php artisan make:controller JwtAuthController
```

Next, open the **app/http/controllers/JwtAuthController.php** file, and add the following methods:

```php
<?php
 
namespace AppHttpControllers;
 
use JWTAuth;
use Validator;
use AppUser;
use IlluminateHttpRequest;
use AppHttpRequestsRegisterAuthRequest;
use TymonJWTAuthExceptionsJWTException;
use SymfonyComponentHttpFoundationResponse;
 
class JwtAuthController extends Controller
{
    public $token = true;
  
    public function register(Request $request)
    {
 
         $validator = Validator::make($request->all(), 
                      [ 
                      'name' => 'required',
                      'email' => 'required|email',
                      'password' => 'required',  
                      'c_password' => 'required|same:password', 
                     ]);  
 
         if ($validator->fails()) {  
 
               return response()->json(['error'=>$validator->errors()], 401); 
 
            }   
 
 
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
  
        if ($this->token) {
            return $this->login($request);
        }
  
        return response()->json([
            'success' => true,
            'data' => $user
        ], Response::HTTP_OK);
    }
  
    public function login(Request $request)
    {
        $input = $request->only('email', 'password');
        $jwt_token = null;
  
        if (!$jwt_token = JWTAuth::attempt($input)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Email or Password',
            ], Response::HTTP_UNAUTHORIZED);
        }
  
        return response()->json([
            'success' => true,
            'token' => $jwt_token,
        ]);
    }
  
    public function logout(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);
  
        try {
            JWTAuth::invalidate($request->token);
  
            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
  
    public function getUser(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);
  
        $user = JWTAuth::authenticate($request->token);
  
        return response()->json(['user' => $user]);
    }
}
```

## Step 7 — Add Laravel 8 REST API Routes

Now that we have implemented JWT authentication in our Laravel 8 User model. In this step, we’ll proceed to create our REST API routes.

Open the  **routes/api.php**  file, and update it as follows:

```php
Route::post('login', 'JwtAuthController@login');
Route::post('register', 'JwtAuthController@register');
  
Route::group(['middleware' => 'auth.jwt'], function () {
 
    Route::get('logout', 'JwtAuthController@logout');
    Route::get('user-info', 'JwtAuthController@getUser');
});
```

## Step 9 — Serving your Laravel 8 REST API Authentication App

After implementing JWT authentication in our Laravel 8 REST API application, let’s run our local development server using the following command:

```bash
$ php artisan serve
```

## Conclusion

Throughout this tutorial, we’ve seen step by step how to implement JWT authentication to secure and protect your REST API endpoints created with PHP and Laravel 8.

This post was originally posted on [https://shabang.dev/laravel-8-rest-api-authentication-with-jwt-tutorial-by-example/](https://shabang.dev/laravel-8-rest-api-authentication-with-jwt-tutorial-by-example/)
