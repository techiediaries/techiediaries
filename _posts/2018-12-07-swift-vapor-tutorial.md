---
layout: post
title: "Swift Vapor Tutorial — Creating a REST API"
image: "images/content/vapor.png"
excerpt: "In this tutorial, you'll learn how to easilt create a REST API back-end with Swift and Vapor" 
tags : [swift , vapor]
---

# Swift Vapor Tutorial—Creating a RESTful API

Swift is a popular programming language among iOS developers. It's known for its common use for developing iOS mobile apps for the Apple store but it can be also used to create server-side web applications which allows developers to use one language to build iOS apps and their REST API back-ends. 

There are many server side frameworks for building web apps with Swift—the most popular framework is Vapor which has a strong community. 

In this tutorial, we'll be using Swift and Vapor for creating a REST API that can be consumed from your client apps.
      
## Prerequisites

To follow this tutorial, you will to have:

- A Ubuntu 16.04 system with Swift installed,
- cURL or Postman installed,
- A working knowledge of Swift.

> On macOS you need Xcode

If you are ready! Let's get started by installing Vapor to create your REST web application.
 
## Installing Swift Vapor

Let's get started with this tutorial by looking at how you can install Vapor in your Ubuntu 16.04 machine.

First, you need to make sure your system have the Vapor packages by adding the APT repository for Vapor using the following command:
.
```bash
$ eval "$(curl -sL https://apt.vapor.sh)"
```

> For macOS you need to run the ` eval "$(curl -sL https://apt.vapor.sh)"` command.

You can then install Vapor in your Ubuntu system using the official package manager via the following command:

```bash
$ sudo apt-get install swift vapor -y
```

> In macOS, you need to use Homebrew instead: `sudo brew install vapor`.


You can check the installed version of Swift using:

```bash
$ swift --version
```

For Vapor, you need to be able to run the following command:

```bash
$ vapor --help
```

The command should display a list of commands that can be used with Vapor.
 
## Creating your First Vapor Project

After installing Vapor on your Ubuntu system, you'll be able to access the `vapor` binary from your terminal. This utilti will allow you to create and work with Vapor projects. 

In your terminal run the following command to create a new project:

```bash
$ vapor new MyProject
```

This command will generate a new Vapor project called `Myproject`  using a Vapor template.

Next, navigate inside your project's folder:

```bash
$ cd MyProject
```

You can now build and run your project using the `vapor build` and `vapor run` commands:

```bash
$ vapor build
$ vapor run
```

Your application will be available from the  [localhost:8080/](http://localhost:8080/) address in your web browser.


## Creating REST API Routes

After creating the project, you can open it in your preferred code IDE (in macOS you can use the `vapor xcode` command from your project's root folder).


Now, you can create a new route in the `Sources/App/routes.swift` file  and add the following code:

```swift
import Vapor

public func routes(_ router: Router) throws {
	router.get("myroute") { req in
        return "A new route!"
    }
}
```

We simply use the router supplied as a parameter to the `routes()` function to register our routes.

In this example we are using the `get()` method of the router instance to add a route that accepts a GET request at the `/myroute` path. The path is passed as a parameter to `get()` method.

In the body of the `get()` method, we add the code for adding any logic that needs to be called when the route is visited and returning the response. In the example we simply return the "A new route!" text.

You can also supply paths as comma separated strings. For example:

```swift
router.get("my", "route") {}
```

This route will be accessed from the `/my/route` path.

In the same way, you can create routes for the other HTTP requests, using the `.put()`, `.post()`, `.patch()` and `.delete()` methods.

You need to build and run the project to use the previous route.

## Getting Parameters from your Route(s)


In many cases, you'll need to pass dynamic data to your route. For example an `ID` for an item to fetch from the database.

Let's create another route that has a dynamic part and responds to GET requests at `/items/:id`: 

```swift
router.get("items", Int.parameter) { req -> String in
    let id = try req.parameters.next(Int.self)
    return "requested id #\(id)"
}
```

In the second parameter of the `get()` method, you simply provide the type of data you expect from the second part of the route.

In the body of the `get()` method you can access the request information using a `req` object of `String` type. Among that information are the passed  parameters which are available from the `req.parameters` object.

You use the `next()` method to extract the Int parameter from the request.


## Parsing and Serializing POST Data

To be able to  parse and serialize data in your route(s), you need to use a `Codable` struct or class. You can pass data  in either JSON, URLEncodedForm or Multipart formats. 

For example, let's suppose our client is sending the following POST request to our `/item/create` route with some JSON data:

```bash
POST /item/create HTTP/1.1
Content-Type: application/json

{
    "name": "this is the name",
    "description": "this is the description"
}
```

First, you need create a route that accepts a POST request at the `/item/create` path:

```swift
router.post(Item.self, at: "item/create") { req, data -> String in
	return "You posted \(data.name) \(data.description)"
}
```

The `/items` route accepts some data of the `Item` type. The `Item` type needs to be defined and corresponds to the data sent by the client:

```swift
struct Item: Content {
	let name: String
	let description: String
}
```

The `Item` type extends [`Content`](https://docs.vapor.codes/3.0/vapor/content/) which tells Vapor how to encode and decode it.

You have seen how you can decode data from the request using `Content`. Now let's suppose we want to decode some data and return the following response to the client:

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "name": "Item 001",
    "description": "Item 001"
}
```
 
Just like the previous example, you need to have to create a struct that subclasses `Content` and defines the fields that corresponds to the fields that need to be returned in the response:

```swift
struct Item: Content {
	let name: String
	let description: String
}
```

Now, you can encode the wanted HTTP response as follows:

```swift
router.get("items") { req -> Item in
    return Item(name: "Item 001", description: "Item 001")
}
```

This route will return a `Response`  with  `200 OK`  status code and the JSON body.

You can then build and run the application using the `vapor build` and `vapor run` commands, and use a client like cURL or Postman to send a POST request with a JSON object that defines an Item.


## Conclusion

Throughout this tutorial, you've seen how you can use Swift and Vapor to create a simple RESTful web application.

We have seen how to easily create GET and POST routes and access parameters from the routes and how encode and decode data using `Content`.
