---
layout: post
title: "Async Programming in Flutter Using API Calls"
image: "images/content/angular.png"
excerpt: "In this tutorial, you'll learn how to get started with async programming in Dart and Flutter with an API call example." 
tags : [ flutter ] 
author: apoorvo
---


In this tutorial, you'll learn how to get started with async programming in Dart and Flutter with an API call example. 

We'll be using an [Open API](http://api.open-notify.org/) which returns the number of people currently in space, their names and respective craft.

## What is Async Programming?

[Asynchronous programming](https://stackify.com/when-to-use-asynchronous-programming/) is a form of parallel programming that allows a unit of work to run on a different thread than the main application. The thread runs independently from the main app thread and notifies it when it reaches completion or ends in a failure.

This approach allows us to do time heavy jobs that if executed on the main thread would bog down the application performance. 

We are using API calls in this tutorial as an example for async programming for two reasons:

- API calls are a very common use case and have a variety of applications.
- API calls can take up time for various reasons like network issues on the client or server ends which makes it ideal to deal with asynchronous programming and highlight its benefits.

## Dart’s Support for Async Programming

Dart code runs in a single thread of execution. Hence tasks that take time to complete (typically more than 10ms) are generally running on a different thread.

Dart deals with it by objects of the `Future<T>` class where `T` is the type of the final result of the asynchronous operation. 

You can think of Futures as return type of async functions. Whenever the code reaches an async operation it suspends its execution and carries on with the rest of the sync code while the async operation runs on a different thread. 

Upon completion a Future is returned with the value of the completed operation. 

> **Note**: if the value of the returned value is unusable, use `Future<void>` as the return type.

## Implementing `Future<T>` in Dart

Dart provides two ways to implement Futures in your code:

- Using the `async` and `await` keywords,
- Using the Future API.

For this tutorial, we will be using the async and await approach. 

### Async

The `async` keyword is used before the body of a function to define it as an asynchronous operation with a return type of `Future<T>`. 

### Await

The `await` keyword can only be used inside of an async function. Inside an async function, the code runs synchronously until it encounters an await upon which it suspends execution until the statement’s completion.

We will understand this better through our API call example.

## The API Call Example

API calls are generally made by making GET and POST requests to a server that typically responds with a JSON file.

To keep this article focused on Flutter, we will take a simple open API to which we will make a GET request.

This is an open API which returns the number of people currently in space, their names and respective craft.

So, without further ado, let’s begin.

### Importing the Dependencies

You need to import the following dependencies.

```dart
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
```

### Modelling the JSON Response to a Dart Object

Here, we make an object to deal with the JSON response. For now, we will just display the number of people in the spaceship. You can see the bonus section to see how we implement `ListView.builder` to show each person’s name and craft.

```dart
class Post {
  final int number;

  Post({this.number,this.people});

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      number: json['number'],
    );
  }
}
```

Most of the code is fairly simple. We just declared the variables we want to use and add a constructor. The interesting part is the used `fromJson()` factory method. 

This factory method is used to initialize the class with the parameter values of a JSON file. 

```dart
  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      number: json['number'],
    );
```

The constructor takes a `Map` object as input from the JSON file and assigns the class variables their respective values. 

### Making the GET Request

The GET request is a time intense procedure, so we will make it inside an async function:

```dart
Future<Post> fetchPost() async {
  final response =  await http.get('http://api.open-notify.org/astros');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON.
    return Post.fromJson(json.decode(response.body));
  } else {
     // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}
```

Here as we see, `fetchPost()` is first declared `async` with a `Future<Post>` return value.
 
For now, it will be run synchronously until the code reaches an `await` statement:

```dart
final response =  await http.get('http://api.open-notify.org/astros');
```

Here is where the magic happens. The `http.get()` method makes a GET call to the server and the execution of the function is suspended till the call is completed. 

Whenever you make a request, the response contains a status code with each code representing a different meaning. 200 is code for successful request.

We check for success and throw an exception if not successful. 

On success, we initialize a `Post` variable from the JSON response in `response.body` and then we return this variable.

### Calling the Function

```dart
void main() => runApp(MyApp(post: fetchPost()));
```

The `MyApp` widget has a variable of class `Future<Post>` which is initialized when it is called by `main()`.

In its `build()` function, we return a `MaterialApp` with a home `Scaffold` that has a `FutureBuilder` as its body.

`FutureBuilder` is a special builder provided by Flutter to deal with futures and their response cycle.

`FutureBuilder` has two essential properties, a future that takes a Future object and a builder that takes a function with context and snapshot. It also returns a widget.

- context: contains the current context and snapshot contains the response from the Future.
- snapshot: contains the response from the futures response cycle.

```dart
        body: Center(
          child: FutureBuilder<Post>(
            future: post,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Text("Number of people in space: ${snapshot.data.number}");
                });
              } else if (snapshot.hasError) {
                return Text("${snapshot.error}");
              }

              // By default, show a loading spinner.
              return CircularProgressIndicator();
            },
          ),
        ),
      ),
```

Inside the builder, we check if the snapshot has any data. If it does then we return a center aligned text widget with the number of people it has.
 
Otherwise we return a `CircularProgressIndicator` which is a library widget provided by flutter that shows a Circular loading bar to the user.

  



That’s all folks! This is a small implementation of the async features in Flutter. In the bonus section you can find a more formatted implementation using `ListView.builder`.


## Example with ListView.builder

The `ListView.builder` widget is used to display dynamic data in a list-form. This is an equivalent of `ListView` in android. 

To implement this, we just need to remodel our `Post` class and change the widget returned by `FutureBuilder`.

### Remodeling the Post Class

For this we will add a `List` called people that will store Maps with the person’s name and craft:

```dart
 class Post {
  final int number;
  final List<dynamic> people;

  Post({this.number,this.people});

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      number: json['number'],
      people: json['people'],
    );
  }
}
```

Next, we will edit the factory constructor as follows:

```dart
  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      number: json['number'],
      people: json['people'],
    );
  }
}
``` 

### Implementing ListView.builder

Here, we will replace the `Text` widget with the `ListView.builder` widget:

```dart
      return ListView.builder(
                    itemCount: snapshot.data.number,
                    itemBuilder: (context,index){
                    return ListTile(
                      title: Text(snapshot.data.people[index]['name']),
                      subtitle: Text(snapshot.data.people[index]['craft'],
                    );
                });
```

`ListView.builder` is a fairly simple widget to understand. It takes an `ItemCount` that we provide through `snapshot.data.number` (The number of people in space). 

This `ItemCount` is the number of Items that will be in the List.

The next part is `ItemBuilder`. This tells Flutter how each item in the list will be built. It takes two arguments:

- context: the current context.
- index: the current index of the item being built.

In the `ItemBuilder`, we return a `ListTile` with the title having the name and the subtitle having the craft of every person currently in space:

```dart
        body: Center(
          child: FutureBuilder<Post>(
            future: post,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
             return ListView.builder(
                    itemCount: snapshot.data.number,
                    itemBuilder: (context,index){
                    return ListTile(
                      title: Text(snapshot.data.people[index]['name']),
                      subtitle: Text(snapshot.data.people[index]['craft'],
                    );
                });
                });
              } else if (snapshot.hasError) {
                return Text("${snapshot.error}");
              }

              // By default, show a loading spinner.
              return CircularProgressIndicator();
            },
          ),
        ),
      ),
```

This is a screenshot of the example:

![Flutter Async Example](https://www.diigo.com/file/image/badcbccczobpqdaospzdrssdopb/flutter-example.jpg?k=a553b5ef42f9aea1afb035d0250229ee)

Hope that helped and you enjoyed this tutorial. Flutter is an amazing upcoming framework that I truly love and I hope you have fun developing in it, like I did.

## Conclusion

In this tutorial, we've learned about asynchronous programming and how Dart deals with async operations either using the async/await keywords or the Future API. Finally, we implemented a simple example of an API call to an Open API with Flutter and `ListView.builder`.

