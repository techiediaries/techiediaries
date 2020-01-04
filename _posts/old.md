<li><a href="https://www.techiediaries.com/updating-angular-cli-projects/">Updating Angular CLI and Upgrading Existing Projects</a>: In this short guide we'll see how to update Angular CLI to the latest version and upgrading existing projects.
</li>
<li><a href="https://www.techiediaries.com/angular-components">Angular Components Explained</a>: In this tutorial we will learn the basics of components in Angular and the new additions in Angular 7.
</li>
<li><a href="https://www.techiediaries.com/angular-router/">The Angular 7 Router: Component Routing</a>: The router module is one of the most important blocks of the Angular framework because it allows you to build apps with multiple pages and add routing between them. So in this part we will cover the router in depth and by examples. (**Updated with the new features of v7**)</li>
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

## Generating an Angular 4 Project Using the Angular CLI

  
  

Using the Angular CLI, you can generate an Angular 7 project with a few commands, the CLI will take care of generating the project files and install all the required dependencies.

  

Open your terminal or your command prompt then run:

  

```bash

ng new angular-v7-project

```

  

After finishing the installation enter:

  

```bash

cd angular-v7-project

ng serve

```

  

Your project will be served locally from http://localhost:4200.

  

## <a id="installing-angular5"> Getting Started with Angular 5 from Scratch</a>

<span style='text-decoration:line-through'>
[Angular 5 has been released (on October 2017)](https://blog.angular.io/version-5-0-0-of-angular-now-available-37e414935ced) so this tutorial series is updated to reflect any updates. This tutorial will provide you with all of the fundamentals to help you get started quickly developing Angular 5 applications without prior knowledge of Angular.
</span>

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
