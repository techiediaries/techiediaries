---
layout: post
title: "Angular Tutorial (Updated to Angular 7)"
image: "images/content/angular-4-tutorial.png"
excerpt: "In this tutorial series we'll cover, the new Angular 6 features, the basics and the in-depth concepts of Angular 4/5/6 framework, starting with how to install the Angular CLI 6 and how to upgrade an existing Angular 5 project to Angular 6." 
tags : [ javascript , angular, python, django]
---

As Angular 7 has just been released a few days ago. This tutorial is updated to show you how to create an Angular 7 project and the new features of v7.

In the previous [tutorial](https://www.techiediaries.com/django-angular-cli/), we've learned how to integrate Angular 4 with Python & Django. This tutorial (now, updated to **Angular 6**) will be dedicated to teach you how to get started with Angular 4|5. Throughout this beginner's series, you'll learn how you can use Angular 4|5|6 to build client side web applications for mobile and desktop with a Django backend.

**Angular 7, was just released and has a lot of changes and new features under the hood particularly regarding Angular CLI 7 such as CLI Prompts and a minimal flag. In this tutorial we’ll also see what’s new with the new Angular 7 version and also learn how to upgrade our an existing Angular 6 to Angular 7.**

This Angular 7 tutorial is a part of a tutorial series that contains the following tutorials:

<div id="toc_container">
<p class="toc_title">Angular Tutorial (Updated to Angular 7)</p>
<ul class="toc_list">
<li><a href="#Getting_Started_with_The_Angular_CLI">Getting Started with The Angular CLI (this one)</a>
<li><a href="https://www.techiediaries.com/updating-angular-cli-projects/">Updating Angular CLI and Upgrading Existing Projects</a>: In this short guide we'll see how to update Angular CLI to the latest version and upgrading existing projects.
</li>
<li><a href="https://www.techiediaries.com/angular-components">Angular Components Explained</a>: In this tutorial we will learn the basics of components in Angular and the new additions in Angular 7.
</li>
<li><a href="https://www.techiediaries.com/angular-router/">The Angular 7 Router: Component Routing</a>: The router module is one of the most important blocks of the Angular framework because it allows you to build apps with multiple pages and add routing between them. So in this part we will cover the Angular router in depth and by examples.</li>
<li> 
<a href="https://www.techiediaries.com/angular-http-client/">Getting Started with The Angular HTTP Client</a>: In this tutorial we'll learn how to use the new **HttpClient** API, available only for Angular 4+ to make HTTP requests in Angular 4+ web applications instead of the old, now removed on Angular 7, **HTTP** API.</li>
<li> <a href="https://www.techiediaries.com/angular-by-example-httpclient-get/">Angular 2+ by Example: Making HTTP GET Requests Using HttpClient</a>: In this tutorial we'll learn how to use **HttpClient** to make HTTP GET requests in Angular 2+.
</li>  
<li><a href="https://www.techiediaries.com/django-angular-cli/">Building Modern Web Apps with Python, Django Rest Framework and Angular 2+</a>
</li>
<li>
<a href="https://www.techiediaries.com/django-rest-framework-angular-2/">Django REST framework (DRF) with Angular 2+ tutorial</a>
</li>
<li><a href="https://www.techiediaries.com/angular-material-design/">Getting started with Material Design 2 in Angular 2+</a>: In this tutorial we will see how to get started with **Material Design 2** in Angular 2+.
</li> 
<li><a href="https://www.techiediaries.com/deploy-angular-github-pages/">How to Deploy Angular 2+ Web Apps to Github</a>: In this guide we'll see how to deploy Angular 2+ apps to Github pages.
</li> 
</ul>
</div>

<span style='text-decoration:line-through'>
[Angular 5 has been released (on October 2017)](https://blog.angular.io/version-5-0-0-of-angular-now-available-37e414935ced) so this tutorial series is updated to reflect any updates. This tutorial will provide you with all of the fundamentals to help you get started quickly developing Angular 5 applications without prior knowledge of Angular.
</span>

Angular  is a powerful front-end Javascript/TypeScript framework developed by Google. It allows you to build structured client side applications and PWAs (Progressive Web Apps).
 

## <a name="Getting_Started_with_The_Angular_CLI">Getting Started with Angular 7</a> 

If you want to get started developing Angular 7 web applications, you have multiple options:  

* Install Angular by hand, 
* Install and use Angular CLI v7, 
* Upgrade from an existing Angular 2+ project.

Before you can install Angular you need to have **Node.js** and **NPM** installed on your development machine.

So go ahead and open your terminal and type the following 

```bash
node -v
```

If you get the version of an installed **Node.js** then you already have the platform installed. If the command 
is unknown by your terminal then you need to install **Node.js**.

Installing **Node.js** is easy and straightforward, you just need to visit their [official website](https://nodejs.org/en/download/) then 
grab the installer for your operating system and follow the instructions.

Now if you open your terminal under Linux/MAC or command prompt under Windows and execute 

```bash
node -v 
```

You should get an output displaying your **Node.js** installed version     


## Updating to Angular 7 from Angular 2


If you have already an Angular 2 project and want to update it to Angular 7, you can do that by simply installing a few npm packages.

### Windows 

Just copy and paste the following command in your prompt

```bash

npm install @angular/common@latest @angular/compiler@latest @angular/compiler-cli@latest @angular/core@latest @angular/forms@latest @angular/http@latest @angular/platform-browser@latest @angular/platform-browser-dynamic@latest @angular/platform-server@latest @angular/router@latest @angular/animations@latest typescript@latest --save
```

### Linux and MAC 

Copy and execute this on your terminal 

```bash
npm install @angular/{common,compiler,compiler-cli,core,forms,http,platform-browser,platform-browser-dynamic,platform-server,router,animations}@latest typescript@latest --save 

```

## Installing the Angular CLI 7

The Angular CLI is a handy command line utility built by the Angular team to easily and quickly generate new Angular 
applications and serve them locally. It can also be used to generate different Angular constructs such as components,
services and pipes etc.

Before you can use the Angular CLI, you need to install it via npm, so go ahead and open your terminal or your command prompt then simply enter:

```bash
npm install -g @angular/cli
```

To check the version of your installed Angular CLI, type: 

```bash
ng -v
```
<div class="note">
You can also run ng -v from inside an Angular project to get the version of Angular 
</div>

## Generating an Angular 7 Project Using the Angular CLI v7


Using the Angular CLI, you can generate an Angular 4+ project with a few commands, the CLI will take care of generating the project files and install all the required dependencies.

Open your terminal or your command prompt then run: 

```bash
ng new angular7-project 
```

After finishing the installation enter:

```bash
cd angular7-project 
ng serve 
```

Your project will be served locally from http://localhost:4200.

## Generating an Angular 7 from GitHub Repository 


You can also clone a quick-start Angular project from GitHub to generate a new Angular 7 project. 

So make sure you have Git installed then run the following:

```bash
git clone https://github.com/angular/quickstart  my-proj
cd my-proj
npm install
npm start
```

You can find more information [here](https://github.com/angular/quickstart).


## <a id="installing-angular5"> Getting Started with Angular 5 from Scratch</a>

Fortunately for you, if you already have a previous working experience with Angular 2 or Angular 4, starting a new Angular 5 project is very much the same process.

In case you don't have any previous experience with Angular framework just follow the instructions below to install Angular 5 from scratch.

### Prerequisites

Before you can install Angular 5, you need to have some prerequisites. 

* You need to have **Node.js** installed.
* You need to have **NPM** (Node Package Manager) installed.

Don't worry both requirements can be installed by going to the [official website](https://nodejs.org/en/download/) and download the installer for your operating system.    

Next install the latest CLI from npm by running the following command from your terminal:

```bash
npm install @angular/cli -g

```

Once the Angular CLI **v1.5.0** is installed on your system. You can create Angular 5 applications using the **ng** command.

You can check for the installed version of the Angular CLI using:

```bash
$ ng -v

```
You should get an output like:

```bash    
Angular CLI: 1.5.0
Node: 6.11.4
OS: linux ia32
Angular: 
...

``` 
You can create your first Angular 5 project using one command:

```bash
$ ng new a-new-project --style=scss --routing

```

You can notice the two flags at the end, **--style=scss** which instructs the Angular CLI to use SCSS for styling and **--routing** for adding basic routing support to the new Angular project.

Once the project is scaffolded, you can navigate inside your project then serve it.

```bash
$ cd a-new-project
$ ng serve
```

That's it, you now have a new Angular 5 project ready for you to build your next awesome Angular application.

Just like Angular 4, you can also use the [quick start](https://github.com/angular/quickstart) project from Github to generate Angular 5 projects.

```bash
git clone https://github.com/angular/quickstart angular5project
cd angular5project 
npm install
npm start
```    
 
## Conclusion

Thanks to **Angular CLI 7**, you can get started with Angular 7 by generating a new project quickly with a variety of flags to customize and control the generation process.

As a recap, we have seen different ways to create a new Angular 7 project.

Now that we have created a new project. 

In the next tutorial, we're going to start learning about the fundamentals of Angular 7 starting with components.













