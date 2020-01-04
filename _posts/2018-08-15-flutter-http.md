---
layout: post
title: "Flutter HTTP Tutorial (POST/GET Example with Django RESTful API)"
image: "images/content/angular.png"
excerpt: "Flutter HTTP Tutorial (POST/GET Example with Django RESTful API)" 
tags : [flutter] 
---

Making Http Requests is an important task in Flutter as with any other SDK — so in this tutorial we'll learn by example to send get, post, put and delete requests from a Flutter mobile application.

![](https://media.giphy.com/media/HVr4gFHYIqeti/giphy.mp4)

Throughout this tutorial, we'll see the HTTP API from Flutter SDK for calling REST APIs 

![Flutter http tutorial](https://cdn-images-1.medium.com/max/716/1*4SAfN6XnN3qfj5CFyCnNlA.jpeg)

In order to make an Http call in Flutter you need to create an Http Client and send requests by providing the URL to your RESTful API server.

You can also use asynchronous calls with Dart using async/await keywords just like in JavaScript.

## Creating An Http Client

After setting up a Flutter application, the next thing is to create an Http Client using the **HttpClass** available from `dart:io`:

So first import `dart:io` using:

```dart
import  'dart:io';
```
Next add a method for connecting to the RESTful API available from `http://localhost:8000/api`

```dart
getContacts()  async  {
var  httpClient  =  new  HttpClient();
var  uri  =  new  Uri.https('api.github.com',  '/users/1');
var  request  =  await httpClient.getUrl(uri);
var  response  =  await request.close();
var  responseBody  =  await response.transform(UTF8.decoder).join();
return  responseBody;
}
```

