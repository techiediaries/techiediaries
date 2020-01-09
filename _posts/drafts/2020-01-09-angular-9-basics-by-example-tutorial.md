---
layout: post
title: "Angular 9 Basics Tutorial by Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, you will learn to build your first Angular 8 application from scratch." 
tags : [  drafts]
---

In this tutorial, we'll build a web application with Angular 9. Meanwhile, we'll learn about the fundamental concepts which you will need to know to do front-end web development with Angular, such as:

  

-   **components**, **pipes**, **directives**, **services**, and **modules**,
-   component communication via **@Input** and **@Output** decorators,
-   displaying data via **interpolation** and the **ngFor/ngIf directives,**
-   property and event bindings,
-   accessing the DOM,
-   getting and submitting user input with **Angular forms**,
-   sending HTTP requests with **Angular HttpClient and RxJS Observables and operators,**
-   styling with CSS and ngClass and ngStyle directives,
-   building production bundles and deploying to Firebase.

  

We'll use the online [StackBlitz](https://stackblitz.com/) IDE, so head over there, register a new account using GitHub and **START A NEW APP** then choose the **Angular** workspace**.**

  

![Angular 9](https://paper-attachments.dropbox.com/s_1CD79E9FC94E7E377A7BFC7E24054592C06613BE95B9EC02F24C63D9DEA5BF8C_1564244129737_file.png)

-   **_Note_**_: It's officially recommended to use_ [_Angular CLI_](https://angular.io/cli) _to create and build Angular projects. You'll need to have a recent version of Node and NPM installed on your machine before you can install the CLI from npm using the_ _npm install -g @angular/cli_  _command. But since this is our first app with Angular, let's keep it simple and use the online IDE._ You can then export an app from StackBlitz to your local environment, simply refer to the Deployment section below.

  

## Who’s this Tutorial for?

  

## Angular Versions

  

In Software Development, apps are versioned by following [**Semantic Versioning**](https://semver.org/)**,** which is simply a convention that everyone starts to follow.

  

Angular also follows semantic versioning which has a **Major.Minor.Patch** format. We increment a specific section when there is a major, minor or patch release:

  

**Major Release —** The Major part is incremented by one if the new features break backwards compatibility,

**Minor Release —** The Minor part is incremented by one if the new features don’t break any existing features,

**Patch Release**  **—**The Minor part is incremented by one 1 for releasing patch fixes.

  

The Angular team releases a new major version each six months and the last version, as of this time, is **Angular 8:**

  

![](https://paper-attachments.dropbox.com/s_1CD79E9FC94E7E377A7BFC7E24054592C06613BE95B9EC02F24C63D9DEA5BF8C_1566593811162_8927657_520413474_39235517.png)

You can follow with the latest versions from the [CHANGELOG](https://github.com/angular/angular/blob/master/CHANGELOG.md).

  

## Prerequisites

  

You’ll need to have some prerequisites to follow this tutorial:

  

-   Working knowledge of the tree pillars of the web i.e **Javascript, HTML & CSS,**
-   Working knowledge of TypeScript and OOP programming  (Classes and Decorators),
-   Recent versions of Node and NPM  (v 10+) for local development.

  
## Angular Modules

  

Angular projects adhere to a **modular** and **component-based** architecture.

  

According to [Wikipedia](https://en.wikipedia.org/wiki/Modular_programming):

  

-   **_Modular programming_** _is a software design technique that emphasizes separating the functionality of a program into independent, interchangeable_ **_modules_**_, such that each contains everything necessary to execute only one aspect of the desired functionality._

  

Angular makes it easy to create **modules** by providing  [**NgModules**](https://angular.io/guide/ngmodules)**:**

  

A **NgModule** is a TypeScript class decorated with the **@NgModule** decorator which takes a few metadata that does the following:

  

-   Declares which components, directives, and pipes belong to the module.
-   Makes some of those components, directives, and pipes public so that other module's component templates can use them.
-   Imports other modules with the components, directives, and pipes that components in the current module need.
-   Provides services that the other application components can use.

  

Every Angular app has at least one module, conventionally called the **root** module. This is the module that gets [bootstrapped](https://angular.io/guide/bootstrapping) for running the application.

  

Head over to your Angular project in the Stackblitz IDE. Open the src/app/app.module.ts file, you should see the following code:

  

`import { NgModule } from '@angular/core';`

`import { BrowserModule } from '@angular/platform-browser';`

`import { FormsModule } from '@angular/forms';`

`import { AppComponent } from './app.component';`

`import { HelloComponent } from './hello.component';`

`@NgModule({`

`imports: [ BrowserModule, FormsModule ],`

`declarations: [ AppComponent, HelloComponent ],`

`bootstrap: [ AppComponent ]`

`})`

`export class AppModule { }`

  

At the top, we have some import statements. NgModule belongs to the @angular/core package.

  

After the imports, we configure the module by decorating the AppModule class with @[NgModule](https://angular.io/api/core/NgModule) and stating what components and directives belong to it  (In the declarations array) as well as which other modules it uses  (In the imports array). For more information on the structure of an @[NgModule](https://angular.io/api/core/NgModule), you can read [Bootstrapping](https://angular.io/guide/bootstrapping) from the official Angular guide.

  

  

There is more that you should know about modules but let's leave that to after you build your first app.

  

## Angular Components

  

Now, let’s get to other piece of the puzzle or **components.** Simply put**, a component** controls a part of the UI of your application. For example, the header, footer, or whole page can all be components. Depending on how much reusability, you want in your code.

  

Technically, an Angular component is a **TypeScript class decorated with the** **@Component** decorator which is part of the Angular core.

  

A component has an associated view which is simply an HTML file  (but can also contain some special Angular template syntax which helps display data and bind events from the controller component)

  

A component has also one or more associated stylesheet files for adding styles to the component view. These files can be in many formats like CSS, Stylus, Sass or Less.

  

Head back to your project in Stackblitz, open the src/app/app.component.ts file, you should find the following code:

  

`import { Component } from '@angular/core';`

`@Component({`

`selector: 'my-app',`

`templateUrl: './app.component.html',`

`styleUrls: [ './app.component.css' ]`

`})`

`export class AppComponent {`

`name = 'Angular';`

`}`

  

In this file, we export the AppComponent class, and we decorate it with the @Component decorator, imported from the @angular/core package, which takes a few metadata, such as:

  

-   selector: this allows you to invoke the component from an HTML template or file just like standard HTML tags i.e: <my-app></my-app>,
-   templateUrl: This is used to tell the component where to find the HTML view,
-   styleUrls: This is an array of relative paths to where the component can find the styles used to style the HTML view.

  

AppComponent is the **root** component of our application. It’s the base of the tree of components of our application and it’s the first component that gets inserted in the browser DOM. Read [The](https://angular.io/guide/bootstrapping#the-bootstrap-array) [bootstrap](https://angular.io/guide/bootstrapping#the-bootstrap-array) [array](https://angular.io/guide/bootstrapping#the-bootstrap-array).

  

An Angular application is composed of a tree of components, in which each Angular component has a specific purpose and responsibility.

  

  

A component is comprised of three things:

-   **A component class,** which handles data and functionality. In the previous section, the product data and the share() method were defined for you in the component class.
-   **An HTML template,** which determines what is presented to the user. In the previous section, you modified the product list's HTML template to display the name, description, and a  "Share" button for each product.
-   **Component-specific styles** that define the look and feel. The product list does not define any styles.

  

  

Currently, our app has three components:

  

-   app-root  (orange box) is the application shell. This is the first component to load, and the parent of all other components. You can think of it as the base page.
-   app-top-bar  (blue background) is the store name and checkout button.

  

**The Component’s Input and Output**

  

## Angular Services

  

After understanding modules and components, let’s see what services are.

  

In Angular, a service is a singleton that can be wired with components or other services via **Dependency Injection.**

According to [Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection):

  

-   In software engineering, **dependency injection** is a technique whereby one object supplies the dependencies of another object.

  

Don’t be intimidated by this term, it simply means that Angular  (or a part of Angular, the injector) takes care of instantiating the services and provides the instance to the requesting component.

  

  

According to the [Angular docs:](https://angular.io/guide/architecture-services)

  

-   DI is wired into the Angular framework and used everywhere to provide new components with the services or other things they need. Components consume services; that is, you can _inject_ a service into a component, giving the component access to that service class.

  

  

You can use **services** to organize and share code across your app

  

Typically, a component's job is to enable the user experience and nothing more. A component should present properties and methods for data binding, in order to mediate between the view  (rendered by the template) and the application logic.

  

A component can delegate certain tasks to services, such as fetching data from the server, validating user input, or logging directly to the console.

  

By defining such processing tasks in an _injectable service class_, you make those tasks available to any component.

  

To define a class as a service in Angular, use the @[Injectable](https://angular.io/api/core/Injectable)() decorator to provide the metadata that allows Angular to inject it into a component as a _dependency_.

  

You need to provide a service before it can be available. This can be done in three ways:

-   Via the service’s metadata passed to the @Injectable() decorator  (The service will be available everywhere),
-   Via the providers array, in a specific module  (The service is available only to the components and services of the module),
-   Via the providers array in a specific component  (The service is available only to the component).

  

## Angular Template Syntax

  

Angular has its own template syntax which extends HTML with a set of useful directives that make it easy for developers to render data from the component in the view.

  

These are the common features of Angular's template syntax:

  

-   Interpolation using {{ }}. For example {{ foo }},
-   Property binding [ ],
-   Event binding ( ),
-   *[ngFor](https://angular.io/api/common/NgForOf) for iterating over arrays of data,
-   *[ngIf](https://angular.io/api/common/NgIf) for conditionally rendering a part of the view.

  

## Angular Directives

  

The Angular directive helps us to manipulate the DOM. You can change the appearance, behavior or a layout of a DOM element using the Directives. They help you to extend HTML. The Angular directives are classified into three categories based on how they behave. They are Component, Structural and Attribute Directives

The ngFor is an Angular structural directive, which repeats a portion of HTML template once per each item from an iterable list  (Collection). The ngSwitch allows us to Add/Remove DOM Element. It is similar to switch statement of C#. The ngIf allows us to Add/Remove DOM Element.

The ngClass Directive is an Angular Attribute Directive, which allows us to add or remove CSS classes to an HTML element. The ngStyle directive allows you to modify the style of an HTML element using the expression. Using the ngStyle you can dynamically change the style of your HTML element.

  

1.  [**Angular Directives**](https://www.tektutorialshub.com/angular/angular-directives/)
2.  [**ngFor**](https://www.tektutorialshub.com/angular/angular-ngfor-directive/)
3.  [**ngSwitch**](https://www.tektutorialshub.com/angular/angular-ngswitch-directive/)
4.  [**ngIf**](https://www.tektutorialshub.com/angular/angular-ngif-directive/)
5.  [**ngClass**](https://www.tektutorialshub.com/angular/angular-ngclass-directive/)
6.  [**ngStyle**](https://www.tektutorialshub.com/angular/angular-ngstyle-directive/)

  

  

## Angular Pipes

  

The Angular pipes are used to Transform the Data. For Example, the Date pipe formats the date according to locale rules. We can pass arguments to pipe and chain pipes. The Angular also allows us to create the Custom Pipe

1.  [**Angular Pipes**](https://www.tektutorialshub.com/angular/angular-pipes/)
2.  [**Angular Custom Pipes**](https://www.tektutorialshub.com/angular/angular-custom-pipes/)