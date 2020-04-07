---
layout: bpost
title: "Create New Angular 9 Workspace and Application: Using Build and Serve"
image: "images/content/angular.png"
excerpt: "In this article, we'll quickly see how to use the Angular CLI to initialize a new workspace and create an application" 
categories: angular
tags : [ angular] 
--- 

In this article, we'll quickly see how to use the Angular CLI to initialize a new workspace and create an application then we'll see how to use the `serve` and `build` commands to serve your app locally using a live-reload development server and build the final production bundles which have seen a big decrease in size starting with Angular 9.

Before creating a new Angular 9 workspace and application, we first need to install the latest version of Angular CLI v9 using the following command:

```bash
npm install -g @angular/cli
```

If ypu already have the CLI installed, run the following command to ensure you have the latest version installed: 
 
```bash
 ng version
```

## Creating a New Angular 9 Workspace

We are now ready to create a new workspace using the following command:

```bash
ng new ng9-workspace --create-application=false 
```

We simply call the `ng new`  command with one option:

-   `--create-application=false`  which instructs the CLI to initialize an empty workspace with only configuration files and no application. You can add more than one application and many libraries.


## Creating a New Angular 9 App

After initializing a new workspace, you can add a new application using the following command:

```bash
ng generate application my-app-name
```

You’ll be presented with a few questions:

```bash
? Would you like to add Angular routing? No
? Which stylesheet format would you like to use? CSS
```

## Serving your Angular App

After creating the application, you can run the follow application to serve it locally using a live-reload development server:

```bash
ng serve
``` 

You can then simply open your web browser and navigate to `http://localhost:4200/` to see the app running.

## Building your Angular App


After you have finished developing your app, you can build the production version using the following command:

```bash
ng build --prod
``` 

We'll get a list of generated files.

As you can see, for each file, we have two versions. One version for legacy browsers, and the other for browsers that support ES2015.

Of of the features of Angular 9 is the smaller bundle size. According to the Angular team, large apps can have a decrease of up to 40% in size.

For small apps you may not notice a big decrease in bundle size.