---
layout: bpost
title: "Angular 9/8 Http Get and Post Requests Example"
image: "images/content/angular.jpg"
excerpt: "In this post, we'll create a simple example with Angular 9/8 and HttpClient that sends Get and Post requests to fetch and post data from/to a backend server" 
skipRss: true
tags : [drafts] 
---

In this post, we'll create a simple example with Angular 9/8 and `HttpClient` that sends Get and Post requests to fetch and post data from/to a backend server.

The server can be either your own server or a third-party server.

In our case, we'll be using a third-party server.

We assume you already have a project ready and Angular CLI installed.

You can also simply use the online Stackblitz IDE if you just want to experiment with the code and don't want to set up a development environment for Angular, yet!

## Http GET and POST Requests?

## Angular HttpClient?

## Generate an Angular Service

In your terminal, simply execute the following command from inside your project's folder:

```bash
$ ng generate service http
```

You'll get the files for your service with some basic code.

Go to the `src/app/http.service.ts` file and import `HttpClient`:

Next, inject `HttpClient` using the constructor of your http service:




