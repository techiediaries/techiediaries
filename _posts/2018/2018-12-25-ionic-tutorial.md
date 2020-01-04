---
layout: post
title: "Ionic 4 Tutorial: Your First Application with Ionic CLI 5"
image: "images/content/ionic.png"
excerpt: "In this course, you'll learn to develop your first Ionic 4 application and build the PWA and native versions. The PWA version can be deployed to the web either using your prefered host or also GitHub pages, GitLab or Netlify." 
tags : [ionic]
---

Ionic allows you to create cross-platform mobile applications for Android & iOS and Progressive Web Apps with one codebase. You can target the most popular native platforms using the front-end web tools and languages i.e HTML, CSS, TypeScript and JavaScript.

In this tutorial, you'll learn to develop your first Ionic 4 application and build the PWA and native versions. You'll be using the latest Ionic CLI 5 versions for generating and working with your project

The PWA version can be deployed to the web either using your prefered host or also GitHub pages, GitLab or Netlify.

> Check out other tutorials:
>
> [Ionic 4 JWT Authentication Tutorial: Using Angular HttpClient with Node & Express.js Server](https://www.techiediaries.com/ionic-jwt-authentication-httpclient)
> 
> [Ionic 4 Tutorial: Building and Theming a Login & Register UI with Angular Forms](https://www.techiediaries.com/ionic-ui-forms-theming)
>
> [Ionic 4 React Tutorial: Build a Mobile App with Ionic 4, Axios and React](https://www.techiediaries.com/react-ionic-axios-tutorial)
 

## Prerequisites

To follow with this course, you need to have a few prerequisites:

- You need a development machine with Node.js and npm installed. You can download the latest  versions from the [official website](https://nodejs.org/en/),
- You need to have [Git](https://git-scm.com/downloads) installed on your system because It will be used to deploy your source code to GitHub,
- A code editor or IDE for writing your code. We are using [Visual Studio Code](https://code.visualstudio.com/),

You also need to be familiar with:

- TypeScript (strongly recommended!),
- JavaScript,
- CSS and Sass,
- HTML. 

> **Note**: Please note that Node.js is only required to run the Ionic CLI but you don't need to be a Node.js developer to build Ionic 4 apps.
> For TypeScript, if you are already familiar with classical OOP languages such as Java or C++, you'll be able to quickly grasp the basics because many constructs are similar. 
> Sass is a superset of CSS that provides programming language constructs like variables. You don't need to be a Sass guru to build Ionic 4 apps but some familiarity with Sass variables and how to use and set them is useful for theming your app.  

That's all you need—let's get started!

## Installing Ionic CLI 5 and Cordova

You'll begin your journey with Ionic 4 by installing the Ionic CLI from npm using the following command:

```bash
 $ npm install -g ionic cordova
``` 

>**Note**: You might need to use `sudo` before your command in Linux (Debian-based systems) and macOS or a CMD with administrator access in Windows to be able to install npm packages globally. Alternatively, you can simply fix your npm permissions to allow to install packages globally without super user access.
>
>As of this writing, **ionic cli v5.1.0** will be installed on your system.

## Creating your Ionic 4 Project

After installing Ionic CLI 5, you can create a project using one simple command. In your terminal, run:

```bash
 $ ionic start ionic-first-app blank --type=angular
``` 

We are creating a project based on Angular (`--type=angular`), named `myapp` using the `blank` template.

Starting with Ionic 4, you can generate projects based on Angular, [React](https://www.techiediaries.com/react-ionic-axios-tutorial) or Vue so you need to specify the type of your project.

> **Note**: Angular is the default, so even if you don't add `--type=angular`, an Angular-based project will be generated. 

You can generate a project, based on various templates such as:

- blank,
- tabs,
- sidemenu, etc.


You can also just type:

```bash
$ ionic start
``` 

And interactively specify all those options when demanded by the CLI.  

After generating the project's files and install the required dependencies, the Ionic CLI will prompt you if you want to “Install the free Ionic Appflow SDK and connect your app?”

Type `y` and press `Enter`.

So what's the Ionic Appflow SDK?

[Ionic Appflow](https://ionicframework.com/Appflow) is a set of services built on top of Ionic which you can use to update your app instantly without going through the app store review process, package your apps in the cloud and monitor error etc.

We'll see later how we can use it to package your application in the cloud without actually needing to install Java, Android SDK for targeting Android apps or macOS and Xcode for iOS apps.

>**Note**: Ionic allows you to do most development on the browser and even let mock Cordova plugins that need actual device features (like the Camera) but once you develop your application you will need to create native packages for your target platform. In the case of Android, you need to install Java and Android SDK. For iOS, you need a macOS with Xcode installed but thanks to Ionic Appflow services, you can skip these requirements by packaging your application in the cloud.

## Serving your Ionic 4 Application

Thanks to Ionic and Ionic CLI, you can develop your application just like your develop front-end web apps (Like Angular apps for example) using a local development server and the browser. In your terminal run the following commands to serve your Ionic 4 application:

```bash
$ ionic start ionic-first-app blank
$ ionic serve
```

This will start a dev server that will be running at the `localhost:8000` address and will automatically open your default browser and navigate to that address.

>**Note**: Most development will be done on the browser and thanks to hot code reloading you can change your source code and all the changes will be pushed to the browser without the need to reload your app or re-start your server each time you change your code.
  
## The Application we'll Be Building

In this course, we'll be building a simple task management application that you can use to manage your tasks. You'll learn to implement CRUD operations in your Ionic 4 application using the local storage and the browser's [IndexedDB](https://developers.google.com/web/ilt/pwa/working-with-indexeddb) database.

In the next section we'll see detailed steps on how to create the task management application with Ionic/Angular v4.
 
