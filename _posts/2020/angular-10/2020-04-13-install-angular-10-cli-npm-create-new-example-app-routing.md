---
layout: bpost
title: "Install Angular 10 CLI with NPM and Create a New Example App with Routing"
image: "images/content/angular.png"
excerpt: "Angular 10 beta is released so the final release is due soon. Let's see how to install the latest beta version and create a new project" 
date: 2020-04-13
categories: angular
tags : [angular, angular-10] 
---
 
Angular 10 beta is released so the final release is due soon. Let's see how to install the latest beta version and create a new project. 

Throughout this tutorial, we’ll see how to install Angular CLI 10 and initialize a new Angular 10 project with routing.

## Step 1 — Installing Angular CLI 10

Let's start by installing Angular CLI 10 in our development machine.

> **Note**: At this time, Angular 10 is in beta.

![Angular CLI 10](https://www.techiediaries.com/ezoimgfmt/www.diigo.com/file/image/rscqpoqzoceeaeedqzdspasasb/Angular+CLI+8.jpg?ezimgfmt=rs:461x281/rscb1/ng:webp/ngcb1)

Head over to a new terminal and run the following command:

```bash
$ npm install --global @angular/cli@next
```

This will install **@angular/cli@10.0.0-next.0** at the time of writing this tutorial.

That's it of everything goes as expected you should have Angular 10 CLI installed on your system.

## Step 2 — Initializing a New Angular 10 Project

In our second step, we’ll use Angular CLI to create our example project. Go back to your terminal and run the following commands:

```bash
$ cd ~
$ ng new angular10-example
```

You’ll get asked if **Would you like to add Angular routing?** -> **y** and **Which stylesheet format would you like to use?** -> **CSS**.

This will automatically add routing to our project and set up CSS for styling components.

Next, navigate to your project's directory and run the local development server using the following commands:

```bash
$ cd angular10-example
$ ng serve    
```

You'll be able to visit your Angular app from the`http://localhost:4200/` address in your web browser.
