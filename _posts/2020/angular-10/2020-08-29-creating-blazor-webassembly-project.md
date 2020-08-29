---
layout: bpost
title: "Creating a Blazor WebAssembly Project"
image: "images/content/blazor.png"
excerpt: "In this article, we'll learn about Blazor WebAssembly and we'll see how to create a project using Visual Studio and dotnet CLI"
date: 2020-08-29
tags : [blazor]
---

In this article, we'll learn about Blazor WebAssembly and we'll see how to create a project using Visual Studio and dotnet CLI.

Starting with Visual Studio 16.6.3 and .NET core 3.1.301 you can create Blazor applications for both server and client/WebAssembly.

## What's Blazor WebAssembly?


WebAssembly or WASM is a binary instruction set supported by modern browsers. It can be used to run code generated from high level programming languages such as C# which means it provides the possibility for developers to create client-side web applications with these programming languages without resorting to JavaScript JavaScript or using plugins, Java applets.


With Blazor WebAssembly, you can run the code the web browser as a SPA (Single Page Application). 

## Creating a New Blazor WebAssembly Project

You can use Visual Studio to create a new Blazor project by following these steps:

- First, create a new project and look for the Blazor App template
- You’ll be able to choose between creating a Blazor Server App or Blazor WebAssembly App

If you prefer the command-line interface, you can use the dotnet CLI to create your project.


Head over to a new command-line interface and run the following command:

```bash
$ dotnet new blazorwasm -o your-project-name
```

Next, navigate to your project's folder and run a local development server using the following commands:


```bash
$ cd your-project-name
$ dotnet run
```

You can then open your web browser and visit your the application from the `https://localhost:5001/` address.




