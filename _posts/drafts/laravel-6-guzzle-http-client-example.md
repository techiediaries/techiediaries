---
layout: Laravel 6 Guzzle Http Client Example
title: 
date: 2020-01-18 15:25
category: 
author: 
tags: []
summary: 
---



  

Do you know how to use laravel 6 guzzle http client request? i will say did you used before guzzle 6 with laravel? If no than i will guide you how to use guzzle http client GET and POST request with php laravel 6.

we will use guzzlehttp/guzzle composer package for guzzle http request in laravel 6 application.

we can make simply http request with json data or multipart form data, also you can set header of request in guzzlehttp laravel 6.

A Guzzle is a PHP HTTP client that makes it easy to send HTTP requests with data, headers and trivial to integrate with web services. Guzzle is a simple interface for building query strings, POST requests, streaming large uploads, streaming large downloads, using HTTP cookies, uploading JSON data, etc.

Let's see bellow step and you can get simple example.

![](https://www.itsolutionstuff.com/upload/laravel-6-guzzle.png)

**Install Package:**

now we will install guzzlehttp/guzzle package and then we can easily use thir method So let's just run bellow command.

composer require guzzlehttp/guzzle

**Example of Requests Using Guzzle:**

Now here i will show you how to run all above listed request you can use following controller method:

GET Request:

public  function getGuzzleRequest()

{

 $client =  new \GuzzleHttp\Client();

 $request = $client->get('http://myexample.com');

 $response = $request->getBody();

 dd($response);

}

POST Request:

public  function postGuzzleRequest()

{

 $client =  new \GuzzleHttp\Client();

 $url =  "http://myexample.com/api/posts";

 $myBody['name']  =  "Demo";

 $request = $client->post($url,  ['body'=>$myBody]);

 $response = $request->send();

 dd($response);

}

PUT Request:

public  function putGuzzleRequest()

{

 $client =  new \GuzzleHttp\Client();

 $url =  "http://myexample.com/api/posts/1";

 $myBody['name']  =  "Demo";

 $request = $client->put($url,  ['body'=>$myBody]);

 $response = $request->send();

 dd($response);

}

DELETE Request:

Read Also:  [Laravel 6 REST API with Passport Tutorial](https://www.itsolutionstuff.com/post/laravel-6-rest-api-with-passport-tutorialexample.html)

public  function deleteGuzzleRequest()

{

 $client =  new \GuzzleHttp\Client();

 $url =  "http://myexample.com/api/posts/1";

 $request = $client->delete($url);

 $response = $request->send();

 dd($response);

}

As above example, you can see how it works.

I hope it can help you...
