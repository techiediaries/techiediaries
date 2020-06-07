---
layout: post
title: "Angular 9 CRUD Tutorial: Consume a Python/Django CRUD REST API"
image: "images/content/learn-django.png"
excerpt: "Throughout this tutorial for beginners, we'll learn to build a full-stack example web application with Angular 9, the latest version of the most popular framework/platform for building mobile and desktop client side applications created and used internally by Google." 
tags : [ python , django , mysql, angular, angular9, angular-9-ngfor-examples, angular-9-httpclient-examples, angular-9-tutorials]
---
  


**Angular 9** is in pre-release! Read about its [new features in this article](https://www.techiediaries.com/angular-features) and how to [update to the latest Angular version in this article](https://www.techiediaries.com/updating-angular-cli-projects).

> You can also get our [Angular 8 book](https://www.techiediaries.com/angular-book-build-your-first-web-apps) for free or pay what you can.

This tutorial is designed for developers that want to use [Angular 9 to build front-end apps](https://www.techiediaries.com/angular/ionic-chat-ui-jwt-auth/) for their [back-end REST APIs](https://www.techiediaries.com/angular/jwt-rest-api-auth-node-typescript-typeorm-database/). You can either use Python & Django as the backend or use JSON-Server to mock the API if you don't want to deal with Python. We'll be showing both ways in this tutorial.

Check out the other parts of this tutorial:

- [Adding Routing](https://www.techiediaries.com/angular-routing-tutorial/)
- [ Building Navigation UI Using Angular Material 8](https://www.techiediaries.com/angular-material-navigation-toolbar-sidenav/)

This tutorial deals with REST APIs and routing but you can also start with basic concepts by following this tutorial ([part 1](ttps://www.techiediaries.com/angular-8-tutorial-build-first-angular-calculator-app/) and [part 2](ttps://www.techiediaries.com/angular-data-event-property-binding/)) instead which you'll build a simple calculator.


If you would like to consume a third-party REST API instead of building your own API, make to check out this [tutorial](https://www.techiediaries.com/angular-tutorial-example-rest-api-httpclient-get-ngfor/).

You will see by example how to build a CRUD REST API with Python.

The new features of Angular 9 include better performance and smaller bundles thanks to Ivy. 

Throughout this tutorial, designed for beginners, you'll learn Angular by example by building a full-stack CRUD — Create, Read, Update and Delete — web application using the latest version of the most popular framework and platform for building mobile and desktop client side applications (also called SPAs or Single Page Applications), created and used internally by Google.

In the back-end we'll use Python with Django, the most popular pythonic web framework designed for perfectionists with deadlines.

In nutshell, you'll learn to generate apps, components and services and add routing. 

You'll also learn to use various features such as **HttpClient** for sending AJAX requests and HTTP calls and subscribing to RxJS 6 Observables etc. 

By the end of this tutorial, you'll learn by building a real world example application:

- How to install the latest version of the CLI,
- How to use the CLI to generate a new Angular 9 project,
- How to build a simple CRM application,
- What's a component and component-based architecture
- How to use RxJS 6 Observables and operators (`map()` and `filter()` etc.)
- How to create components,
- How to add component routing and navigation,
- How to use **HttpClient** to consume a REST API etc.    

## Prerequisites

You will need to have the following prerequisites in order to follow this tutorial:

- A Python development environment. We use a Ubuntu system with Python 3.7 and `pip` installed but you can follow these instructions in a different system as long as you have Python 3 and `pip` installed. Also the commands shown here are bash commands which are available in Linux-based systems and macOS but if you use Windows CMD or Powershell , make sure to use the equivalent commands or install [bash](http://win-bash.sourceforge.net/) for Windows.
- Node.js and `npm` installed on your system. They are required by Angular CLI.
- Familiarity with TypeScript.

If you have these requirements, you are good to go!
 
## Getting & Running the Python REST API Server

We'll be using a Python REST API that we have created in this [tutorial](https://www.techiediaries.com/django-tutorial). Go ahead and clone the project's code from GitHub using the following command:

```bash
$ git clone https://github.com/techiediaries/python-django-crm-rest-api.git 
```

Next, create and activate a virtual environment:

```bash
$ python3 -m venv .env
$ source .env/bin/activate
```

Next, navigate to your CRM project and install the requirements using `pip`:

```bash
$ cd python-django-crm-rest-api
$ pip install -r requirements.txt
``` 

Finally, you can run the development server using the following command:

```bash
$ python manage.py runserver
```

Your REST API will be available from the `http://localhost:8000/` address with CORS enabled.

## Mocking the Same REST API with `json-server`

If you don't want to use a real Python & Django REST API server, you can also use `json-server` to quickly mock the REST API.

First, let's install `json-server` in our system using the following command:

```bash
$ npm install -g json-server
```

Next, create a folder for your server and create a JSON file (`data.json`) with the following content:

```json
{
    "users":[
        {
            "id": 1,
            "first_name": "Robert",
            "last_name": "Schwartz",
            "email": "admin@email.com"
        }
        
    ],
    "accounts": [
        {
            "id": 1,
            "name": "",
            "email":"",
            "phone": "",
            "industry": "",
            "website": "",
            "description": "",
            "createdBy": 1,
            "createdAt": "",
            "isActive": true
        }
    ],
    "contacts": [
        {
            "id": 1,
            "first_name": "",
            "last_name": "",
            "account": 1,
            "status":1,
            "source": 1,
            "email": "",
            "phone": "",
            "address": "",
            "description": "",
            "createdBy": 1,
            "createdAt": "",
            "isActive": true
        }
    ],
    "activities": [
        {
            "id": 1,
            "description": "",
            "createdAt" : "",
            "contact": 1,
            "status": 1
        }
    ],
    "contactsources": [
        {
            "id":1,
            "source": ""
        }
    ],
    "contactstatuses": [
        {
            "id":1,
            "status": ""
        }
    ],
    "activitystatuses":[
        {
            "id":1,
            "status": ""
        }
    ]
}
```

We added empty entries for JSON data. Feel free to add your own data or use a tool like [Faker.js](https://github.com/marak/Faker.js/) to automatically generate fake data.

Next, you need to start the JSON server using:

```bash
$ json-server --watch data.json  
```

Your REST API server will be running at `http://localhost:3000`.

We'll have the following resources exposed:

- http://localhost:3000/users
- http://localhost:3000/accounts
- http://localhost:3000/contacts
- http://localhost:3000/activities
- http://localhost:3000/contactsources
- http://localhost:3000/contactstatuses
- http://localhost:3000/activitystatuses

This is nearly the same REST API exposed by our real Python REST API server.

The example Angular application we'll be building is the front-end for the CRM RESTful API that will allow you to create accounts, contacts and activities. It's a perfect example for a CRUD (Create, Read, Update and Delete) application built as an SPA (Single Page Application). The example application is work on progress so we'll be building it through a series of tutorials and will be updated to contain advanced features such as RxJS and JWT authentication. 

## <a name="Installing_the_Angular_CLI_9">Installing the Angular CLI 9</a>


Make sure you have Node.js installed, next run the following command in your terminal to install Angular CLI 9:

```bash
$ npm install @angular/cli@next --global
```

At the time of this writing `@angular/cli` **v9.0.0-rc** will be installed.

Before the final release of Angular 9, you will need to use the `@next` tag to install the pre-release version.

You can check the installed version by running the following command:

```bash
$ ng version
```

Now, you're ready to create a project using Angular CLI 9. Simply run the following command in your terminal:

```bash
ng new ngsimplecrm
``` 

The CLI will automatically generate a bunch of files common to most Angular projects and install the required dependencies for your project.

The CLI will prompt you if  **Would you like to add Angular routing? (y/N)**, type **y**. And **Which stylesheet format would you like to use?** Choose CSS and type **Enter**.

Next, you can serve your application locally using the following commands:

```bash
$ cd ./ngsimplecrm
$ ng serve
```

The command will compile our project and finally will display the `** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
ℹ ｢wdm｣: Compiled successfully.` message. 


This means, your application is running at `http://localhost:4200`.
 
## <a name= "What_is_Angular_Component"> What's a Component?</a>

A component is a TypeScript class with an HTML template and an optional set of CSS styles that control a part of the screen.

Components are the most important concept in Angular. An Angular application is basically a tree of components with a root component (the famous *AppComponent*). The root component is the one contained in the bootstrap array in the main `NgModule` module defined in the `app.module.ts` file.

One important aspect of components is re-usability. A component can be re-used throughout the application and even in other applications. Common and repeatable code that performs a certain task can be encapsulated into a re-usable component that can be called whenever we need the functionality it provides.  

>Each bootstrapped component is the base of its own tree of components. Inserting a bootstrapped component usually triggers a cascade of component creations that fill out that tree. [source](https://angular.io/guide/bootstrapping#the-bootstrap-array)

### <a name="Component_Based_Architecture"> What's a Component-Based Architecture?</a>

An Angular application is made of several components forming a tree structure with parent and child components.   

A component is an independent block of a big system (web application) that communicates with the other building blocks (components) of the system using inputs and outputs. A component has an associated view, data and behavior and may have parent and child components.

Components allow maximum re-usability, easy testing, maintenance and separation of concerns.  
 
 Let's now see this practically. Head over to your Angular project folder and open the `src/app` folder.  You will find the following files:

-   `app.component.css`: the CSS file for the component
-   `app.component.html`: the HTML view for the component
-   `app.component.spec.ts`: the unit tests or spec file for the component 
-   `app.component.ts`: the component code (data and behavior)
-   `app.module.ts`: the application main module

Except for the last file which contains the declaration of the application main (root) **Module**,  all these files are used to create a component. It's the **AppComponent**: The root component of our application. All other components we are going to create next will be direct or un-direct children of the root component. 

### <a name="The_Root_Component_of_Angular_Applications">Demystifying the App Component</a>


Go ahead and open the `src/app/app.component.ts` file and let's understand the code behind the root component of the application.

First, this is the code:

```typescript
import { Component } from  '@angular/core';
@Component({
	selector:  'app-root',
	templateUrl:  './app.component.html',
	styleUrls: ['./app.component.css']
})
export  class  AppComponent {
	title  =  'app';
}
```

We first import the Component decorator from `@angular/core` then we use it to decorate the TypeScript class *AppComponent*. The Component decorator takes an object with many parameters such as:

- *selector*: specifies the tag that can be used to call this component in HTML templates just like the standard HTML tags
- *templateUrl*: indicates the path of the HTML template that will be used to display this component (you can also use the *template* parameter to include the template inline as a string)
- *styleUrls*: specifies an array of URLs for CSS style-sheets for the component

The *export* keyword is used to export the component so that it can be imported from other components and modules in the application.

The *title* variable is a member variable that holds the string 'app'. There is nothing special about this variable and it's not a part of the canonical definition of an Angular component.

Now let's see the corresponding template for this component. If you open  `src/app/app.component.html` this is what you'll find:

```html
<div  style="text-align:center">
<h1>
Welcome to {{ title }}!
</h1>
	<img  width="300"  alt="Angular Logo"  src="data:image/svg+xml;....">
</div>

	<h2>Here are some links to help you start: </h2>
<ul>
	<li>
	<h2><a  target="_blank"  rel="noopener"  href="https://angular.io/tutorial">Tour of Heroes</a></h2>
	</li>
	<li>
	<h2><a  target="_blank"  rel="noopener"  href="https://github.com/angular/angular-cli/wiki">CLI Documentation</a></h2>
	</li>
	<li>
	<h2><a  target="_blank"  rel="noopener"  href="https://blog.angular.io/">Angular blog</a></h2>
	</li>
</ul>
```   

The template is a normal HTML file (almost all HTML tags are valid to be used inside Angular templates except for some tags such as `<script>`, `<html>` and `<body>`) with the exception that it can contain template variables (in this case the *title* variable) or expressions (`{{...}}`) that can be used to insert values in the DOM dynamically. This is called **interpolation** or **data binding**. You can find more information about templates from the [docs](https://angular.io/guide/template-syntax).

You can also use other components directly inside Angular templates (via the selector property) just like normal HTML.

> **Note**: If you are familiar with the MVC (Model View Controller) pattern, the component class plays the role of the Controller and the HTML template plays the role of the View. 
  
## <a name="Angular_8_Components_by_Example">Components by Example</a>

After getting the theory behind Angular components, let's now create the components for our simple CRM application.


Our REST API, built either with Django or JSON-Server, exposes these endpoints: 

* `/accounts`: create or read a paginated list of accounts
* `/accounts/<id>`:  read, update or delete an account

* `/contacts`: create or read a paginated list of contacts
* `/contacts/<id>`: read, update or delete a contact

* `/activities`: create or read a paginated list of activities
* `/activities/<id>`: read, update or delete an activity

* `/contactstatuses`: create or read a paginated list of contact statuses
* `/activitystatuses`: create or read a paginated list of activity statuses
* `/contactsources`: create or read a paginated list of contact sources

Before adding routing to our application, we first need to create the application components - so based on the exposed REST API architecture we can initially divide our application into these  components:

- `AccountListComponent`: this component displays and controls a tabular list of accounts 
- `AccountCreateComponent`: this component displays and controls a form for creating or updating accounts

- `ContactListComponent`: displays a table of contacts
- `ContactCreateComponent`: displays a form to create or update a contact

- `ActivityListComponent`: displays a table of activities
- `ActivityCreateComponent`: displays a form to create or update an activity

Let's use the Angular CLI to create the components. Open a new terminal and run the following commands:

```bash
$ ng generate component AccountList
$ ng generate component AccountCreate

$ ng generate component ContactList
$ ng generate component ContactCreate

$ ng generate component ActivityList
$ ng generate component ActivityCreate
```

This is the output of the first command:

```bash
CREATE src/app/account-list/account-list.component.css (0 bytes)
CREATE src/app/account-list/account-list.component.html (31 bytes)
CREATE src/app/account-list/account-list.component.spec.ts (664 bytes)
CREATE src/app/account-list/account-list.component.ts (292 bytes)
UPDATE src/app/app.module.ts (418 bytes)
```

You can see that the command generates all the files to define a component and also updates `src/app/app.module.ts` to include the component.

If you open  `src/app/app.module.ts` after running all commands, you can see that all components are automatically added to the `AppModule` declarations array:

```ts
import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';

  

import { AppComponent } from  './app.component';
import { AccountListComponent } from  './account-list/account-list.component';
import { AccountCreateComponent } from  './account-create/account-create.component';
import { ContactListComponent } from  './contact-list/contact-list.component';
import { ContactCreateComponent } from  './contact-create/contact-create.component';


@NgModule({

declarations: [
	AppComponent,
	AccountListComponent,
	AccountCreateComponent,
	ContactListComponent,
	ContactCreateComponent,
	ActivityListComponent,
	ActivityCreateComponent	
],
imports: [
	BrowserModule
],
providers: [],
bootstrap: [AppComponent]
})
export  class  AppModule { }
```

> **Note**: If you are creating components manually, you need to make sure to include them manually so they can be recognized as part of the module.


## <a name="Setting_up_HttpClient_Angular">Setting up HttpClient</a>

Now that we've created the various components, let's set up *HttpClient* in our Angular 9 project to consume the RESTful API back-end.

You simply need to add `HttpClientModule` to the `imports` array of the main application module:

```ts
// [...]
import { HttpClientModule } from  '@angular/common/http';

@NgModule({

declarations: [
// [...]
],

imports: [

// [...]

HttpClientModule
],
providers: [],
bootstrap: [AppComponent]

})

export  class  AppModule { }
```

We can now use `HttpClient` in our application.

### <a name="Angular_Service_Provider">Create Services</a>

A service is a global class that can be injected in any component. It's used to encapsulate code that can be common between multiple components in one place instead of repeating it throughout various components.
  
Now, let's create the services that encapsulates all the code needed for interacting with the REST API. Using Angular CLI 8 run the following commands:

```bash
$ ng generate service services/contact
$ ng generate service services/activity
$ ng generate service services/account
```

> **Note**: Since we have multiple services, we can put them in a `services` folder or whatever you want to call it.


## Injecting `HttpClient` in the Services

Open the `src/app/services/contact.service.ts` file then import and inject `HttpClient`:

```ts
import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
providedIn:  'root'
})

export  class  ContactService {

	constructor(private  httpClient:  HttpClient) {}

}
```

> **Note**: You will need to do the same for the other services.

> Angular provides a way to register services/providers directly in  the `@Injectable()` decorator by using the new `providedIn` attribute. This attribute accepts any module of your application or `'root'` for the main app module. Now you don't have to include your service in the *providers* array of your module.

## <a name="Conclusion">Conclusion</a>

Throughout this tutorial for beginners, we've seen, by building a simple real world CRUD example, how to use different Angular 9 concepts to create simple full-stack CRUD application. 

In the next [tutorial](https://www.techiediaries.com/angular-routing-tutorial) we'll be learning how to add routing to our example application.
