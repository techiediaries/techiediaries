Do you have issue like laravel 6 cors header ‘access-control-allow-origin’ missing or how to use cors middleware in laravel 6 than i will show you how to work with cors(Cross-Origin Resource Sharing) in laravel 6 application.

One my viewer sent me a message with screen shot "Access to XMLHttpRequest at 'http://localhost:8000/api/users' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource." and he was told me when i was access my api from other project then it is show me error like this way.

![](https://www.itsolutionstuff.com/upload/laravel-6-cors-tuto.png)

However, i know the solution of he sent me message because i fetch many time this error and solved it using barryvdh/laravel-cors composer package with laravel 6. i sent him github like with barryvdh/laravel-cors package.

Than i thought i should share one tutorial with how to use cors middleware in laravel 6. so you can follow bellow tutorial and solved your error:

**Create API Route**

In this is step we need to create routes for testing. so open your "routes/api.php" file and add following route.

routes/api.php

Route::get('/test',  function  (Request $request)  {

  return response()->json(['Laravel 6 CORS Example from ItSolutionStuff.com']);

});

**User API to Another Project File**

Now i am going to create new html file and try to access my api using jquery ajax. so you can see bellow file code that i written.

index.php

<!DOCTYPE html>

<html>

<head>

  <title>Laravel 6 CORS Middleware Tutorial - ItSolutionStuff.com</title>

  <script  src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"  crossorigin="anonymous"></script>

</head>

<body>

<script  type="text/javascript">

 $.ajax({

 type:  "GET",

 dataType:  "json",

 url:  'http://localhost:8000/api/test',

 success:  function(data){

 console.log(data);

  }

  });

</script>

</body>

</html>

Ok, now if i run this file, it's give this error:

"Access to XMLHttpRequest at 'http://localhost:8000/api/test' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."

You can also see bellow screen shot.

![](https://www.itsolutionstuff.com/upload/laravel-6-cors-screen.png)

Now we will resolve how to solve this error using barryvdh/laravel-cors composer package.

**Install barryvdh/laravel-cors**

first of all we will install barryvdh/laravel-cors composer package by following composer command in your laravel 6 application.

composer require barryvdh/laravel-cors

After successfully install package, open config/app.php file and add service provider and alias.

config/app.php

'providers'  =>  [

  ....

  Barryvdh\Cors\ServiceProvider::class,

],

Now we need to use in middleware kernel file.

So let's change it:

app/Http/Kernel.php

Read Also:  [How to Create Zip File and Download in Laravel 6?](https://www.itsolutionstuff.com/post/how-to-create-zip-file-and-download-in-laravel-6example.html)

.....

protected $middleware =  [

  ...

 \Barryvdh\Cors\HandleCors::class,

];

.....

After that you can run your another project html file and check it.

It will works :)