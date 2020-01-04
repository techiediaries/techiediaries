---
layout: post
title: "Angular 7/8 SEO: Rendering Your App on Server-side with Angular Universal"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll see in a 3 easy steps how you can render your Angular 8 application on the server to make it SEO-friendly and boost its performance using the Angular Universal technology" 
tags : [angular , angular8] 
---


In this tutorial, we'll see in a 3 easy steps how you can render your Angular 8 application on the server to make it SEO-friendly and boost its performance using the Angular Universal technology.

Let's get started!

## Step 1 - Setting up Angular CLI and Initializing a Project

In the first step, you need to install Angular CLI and intialize a new project. Feel free to skip this step if you have a project ready! 

Head to a new command-line interface and run the following commands:

```bash
$ npm install -g @angular/cli
```

You would need to have Node.JS and NPM installed on your machine.

Next, run the following command to initialize a project:

```bash
$ ng new angular-universal-app
```

## Step 2 - Setting up Angular Universal 

The next step is to set up Angular Universal in your project.

Thanks to the ng add command available on Angular CLI v7+, you can add server-side rendering in your project with a few commands using the  `@nguniversal/express-engine` schematic.

Go back to your command-line interface, and start by navigating to your project's folder:

```bash
$ cd ~/angular-universal-app
```

Next, run:

```bash 
$ ng add @nguniversal/express-engine --clientProject angular-universal-app
```

The shematic will automatically add the required configurations and packages to your project and will even add an Express server. 

The Express server will render a part of your Angular app and return HTML to the browser. The server runs on the 4000 port by default

## Step 3 - Building and Serving the App with Express Server

That's it, we have confugured our Angular application for server-side rendering and made it SEO friendly without nearly zero efforts. In this step, we'll build and run the Express server. 

Go back to your terminal and run the following commands:

```bash
$ npm run build:ssr 
$ npm run serve:ssr
```

This wiol build your project with SSR support and start the Express server from the `http://localhost:4000` address. 

Open your web browser and go to that address, you should see your Angular app running just like the `ng serve` command.

## Conclusion

In this tutorial, we have created an Angular Universal app by adding Server-side rendering in 3 easy steps. This will make our application SEO friendly i.e can be easily dicoverable by search engines and boost its performance. 