---
layout: post
title: "Web Components: Custom Elements & Shadow DOM with Angular 7/8"
author: team
excerpt: "Throughout this tutorial, we’ll teach you to create a native web component using the latest Angular 8 version. Part of standard web components are custom elements and shadow DOM which provide a way to extend HTML by creating your custom HTML tags and encapsulating the DOM tree and CSS styles behind other elements. " 
tags : [angular, angular8, javascript]
---

Throughout this tutorial, we’ll teach you to create a native web component using the latest Angular 8 version. Part of standard web components are custom elements and shadow DOM which provide a way to extend HTML by creating your custom HTML tags and encapsulating the DOM tree and CSS styles used inside your components behind your custom elements. 


> **Note**: This tutorial is intended for Angular developers. If you want to build a web component using plain JavaScript, you need to use the native APIs for custom elements and Shadow DOM. Instead of the native JavaScript APIs, we’ll be using Angular Elements and the ViewEncapsulation API which provide an easy way to build web components.  


We’ll be building a simple contact form as a reusable custom element that you can include in any JavaScript app to provide a way for users to contact you. We’ll use [FormSpree](https://formspree.io/), a form backend that will allow you to connect your form to their endpoint and email you the submissions. No P*HP, Javascript or sign up required.*


Thanks to the [Custom Elements](https://html.spec.whatwg.org/multipage/scripting.html#custom-elements) spec which is implemented in modern browsers, web developers can **create their own HTML tags**, improve and customize the existing HTML tags, or build reusable components that can be used in vanilla JavaScript or in other libraries or frameworks like Angular, React or Vue etc. 

Custom Elements is a part of [web components](http://webcomponents.org/) and it simply provides a native and standards-based way to build reusable components using vanilla JavaScript, HTML and CSS.

In this tutorial, we’ll follow another approach, we’ll be creating a web component but with Angular instead of vanilla JavaScript. This will allow you to use your Angular components as standard web components and as a result they can be reused not just inside an Angular project but in any JavaScript app.


> **Note**: Building your web app using web components and custom elements will make it future-proof since it will use standardized native browser APIs that are guaranteed to exist for decades and not depend on one framework or library.
> Popular high profile websites like YouTube are built completely with web components. 

 
Using Angular to build your web components or custom HTML tags has some benefits over using vanilla JavaScript since you’ll have many advanced features like data binding and dependency injection to build your component and finally export it as a reusable web component. 

So, you’ll have the advantages of both worlds, the advanced patterns and features of Angular and the native usability of the web components across web browsers without a framework runtime.   


> **Note**: If you are coming from a class-based OOP language like Java and want to build web components, you might find it easier to use Angular with TypeScript than using JavaScript and native browser APIs.  



## Angular Components

At the heart of Angular is the concept of a component. 

An Angular component can be defined as a piece of code that controls a part of the UI. It can have inputs, outputs, and life cycle events but can be only interpreted by the Angular runtime. 

Luckily for us, Angular also provides a core package called `elements` that can be used to easily export the Angular component to a native web component or custom element.



# Defining Web Components 

Web components are a set of native browser standards that include:


- **Custom Elements** for creating custom HTML tags, 
- **Shadow DOM** for adding an isolated DOM tree to an element, 
****- **HTML Imports** for including HTML documents, CSS or JavaScript files in other HTML documents.,
- **HTML Templates** for creating dynamic and reusable HTML partials or fragments that can be used by JavaScript in runtime at any point during the execution of the app. 

As said before, web components and custom elements can be created by calling native browser APIs but for creating complex apps this can be intimidating since these APIs are low level. As software developers love to create abstractions, there are many existing tools that make it easy to create web components such as [Stencil](https://stenciljs.com/) which was used to create the Ionic UI components (web components), [Polymer](https://www.polymer-project.org/) and also [Angular Elements](https://angular.io/guide/elements):


> Angular elements are Angular components packaged as custom elements (also called Web Components), a web standard for defining new HTML elements in a framework-agnostic way

The `@angular/elements` package provides a `[createCustomElement](https://angular.io/api/elements/createCustomElement)``()` method that transforms the Angular's component interface and change detection functionality into the built-in DOM API.


## Prerequisites

Let’s get started with the prerequisites of this tutorial:


- Working knowledge of TypeScript and Angular is necessary since we are using Angular to create our web component,
- You also need to have Node.js and NPM installed on your system along with Angular CLI. You can simply run `npm install -g @angular/cli` to install the CLI.


## Generating a project with Angular CLI

Open a new terminal and run the following command:


    $ ng new angular-custom-element

This will prompt you if you **Would you like to add Angular routing?** Answer with **No** and **Which stylesheet format would you like to use?** Let’s keep it simple and pick **CSS**.

The CLI will generate the basic files and install the dependencies and you’ll have an Angular project ready to be served using the following commands:


    $ cd angular-custom-element
    $ ng serve

Your web application will be available from the http://localhost:4200 address.



## Adding Angular Elements


Angular Elements takes care of transforming your Angular component(s) to custom elements that can be used to extend HTML with new tags without knowing anything about the low level API.


> **Note**: You don’t have to know anything about the Custom Elements API to build custom elements and your component users don’t have to know anything about Angular to use your custom element or web component.

 

Now let’s add Angular Elements to our our project. Open a new terminal and run the following command:


    $ cd angular-custom-element
    $ ng add @angular/elements



## How to create an Angular component?

In Angular, you can create a component by defining a TypeScript class and decorate it with the `@Component` decorator, where you can provide the necessary metadata for your component such as the the HTML template that will be rendered as the view (and which you’ll need to create) and the stylesheets that contain the styles.

You can also use the CLI to generate a bar-bone component. Go back to your terminal and run the following command


    $ ng generate component contactForm

 
Open the `src/app/contact-form/contact-form.component.ts` file, you should find the following code for a basic component:
 

    import { Component, OnInit } from '@angular/core';
    
    @Component({
      selector: 'app-contact-form',
      templateUrl: './contact-form.component.html',
      styleUrls: ['./contact-form.component.css']
    })
    export class ContactFormComponent implements OnInit {
    
      constructor() { }
    
      ngOnInit() {
      }
    
    }

Open the `src/app/contact-form.component.html` file and add the following HTML code:


    <form action="https://formspree.io/techiediaries9@gmail.com" method="POST">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" class="full-width" /><br />
        <label for="email">Email Address</label>
        <input type="email" id="email" name="_replyto" class="full-width" /><br />
        <label for="message">Message</label>
        <textarea name="message" id="message" cols="30" rows="10" class="full-width"></textarea><br />
        <input type="submit" value="Send" class="button" />
    </form> 

Next, open the `src/app/contact-form.component.css` file and the following styles:


    form {
      margin:10% auto 0 auto;
      padding:30px;
      width:400px;
      height:auto;
      overflow:hidden;
      background:rgb(49, 16, 16);
      border-radius:10px;
      color: white;
    }
    form label {
      font-size:14px;
      cursor:pointer;
    }
    form label,
    form input {
      float:left;
      clear:both;
    }
    form input {
      margin:15px 0;
      padding:15px 10px;
      width:100%;
      outline:none;
      border:1px solid #bbb;
      border-radius:20px;
      display:inline-block;
    }
    form textarea{
      float:left;
      clear:both;
      width:100%;
      outline:none;
      border:1px solid #bbb;
      border-radius:20px;
      display:inline-block;
    }
    input[type=submit] {
      padding:15px 50px;
      width:auto;
      background:rgb(49, 16, 16);;
      border:none;
      color:white;
      cursor:pointer;
      display:inline-block;
      float:right;
      clear:right;
    }
    

Since we didn’t have routing setup in our app, we can invoke our component using its selector.


Open the `src/app/app.component.html` file and add:


    <app-contact-form></app-contact-form>

This will allow us to test our component inside the Angular app.

This is a screenshot of our form:

![Angular Component with an HTML Form](https://paper-attachments.dropbox.com/s_F00718925BD389D5A22B92D9912E582D86640EB707395988235301ECB4AE0590_1564423759998_form.PNG)



## Angular View Encapsulation and Shadow DOM

Shadow DOM is a part of web components and allows us to encapsulate and a DOM tree and CSS styles behind other elements. As a result, it allows us to apply **scoped styles** to elements without them bleeding out and affecting the styles of the containing page. You might guess why this is useful in our case. Since our component can be reusable and included in the context of any other page we don’t want the CSS styles of the form component itself to interfere with the styles of the hosting app.

[Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) is a part of web components and allows us to encapsulate and a DOM tree and CSS styles behind other elements. As a result, it allows us to apply scoped styles to elements without them bleeding out and affecting the styles of the containing page. You might guess why this is useful in our case. Since our component can be reusable and included in the context of any other page we don’t want the CSS styles of the form component itself to interfere with the styles of the hosting app.

Shadow DOM is useful for building component-based apps. As such, it provides solutions for common problems in web development:


- Isolated DOM which makes the component DOM self-contained, 
- Scoped CSS: The CSS styles of the shadow DOM are scoped i.e the styles don’t interfere with the host web page.


Scoped CSS means:


- The CSS styles defined in the host page don't apply affect the look of HTML elements in the web component,
- Also the CSS styles defined inside the component are scoped to the component and don’t affect HTML elements outside the component.

Angular makes it easy to create a shadow DOM and scoped styles via the [ViewEncapsulation](https://angular.io/api/core/ViewEncapsulation) API    
Simply, open the `src/app/form-contact.component.ts` file and apply the `ShadowDom` encapsulation to the component as follows:


    import { Component, OnInit, ViewEncapsulation } from '@angular/core';
    
    @Component({
      selector: 'app-contact-form',
      templateUrl: './contact-form.component.html',
      styleUrls: ['./contact-form.component.css'],
      encapsulation: ViewEncapsulation.ShadowDom
    })
    export class ContactFormComponent implements OnInit {
      constructor() { }
      ngOnInit() {
      }
    }

The other encapsulation types are None, Emulated and Native.


## Make it a Custom Element

At this point, our Angular component can only be used inside an Angular project, let’s transform it to a custom element so we can use it with vanilla JavaScript.
  
Open the `src/app.module.ts` file and import the `Injector` and `createCustomElement` APIs:


    import  { Injector} from '@angular/core';
    import  { createCustomElement } from '@angular/elements';

Next, add `ContactFormComponent` to the `bootstrap` array of the module:


    @NgModule({ 
      declarations: [
        AppComponent,
        ContactFormComponent
      ],
      imports: [
        BrowserModule
      ],
      providers: [],
      bootstrap: [AppComponent , ContactFormComponent]
    })
    export class AppModule {

Next, inject `Injector` as a dependency:


    export class AppModule {
      constructor(private injector: Injector) {}
    }

Next, invoke the `createCustomElement()` method to transform the Angular component to a custom element:


    export class AppModule {
      constructor(private injector: Injector) {
        const el = createCustomElement(ContactFormComponent, { injector });
        customElements.define('contact-form', el);
      }



## Building the Custom Element

Go back to your terminal and run the following command to build the project for production:


    $ ng build --prod --output-hashing none

This will output a `dist/angular-custom-element` folder with a set of JavaScript files:


- `runtime.js`,
- `es2015-polyfills.js`,
- `polyfills.js`,
- `scripts.js`,
- `main.js`

Now, every time we need to use our custom element, we’ll need to include all the previous JavaScript files. A better solution is to concatenate all these files into one JavaScript file using a Node.js script.

In your Angular project, let’s install the `concat`  and `fs-extra` modules:


    $ npm install --save-dev concat fs-extra

Next, create a `concatenate.js` file and add the following code:


    const fs = require('fs-extra');
    const concat = require('concat');
    
    concatenate = async () =>{
        const files = [
            './dist/angular-custom-element/runtime.js',
            './dist/angular-custom-element/polyfills.js',
            './dist/angular-custom-element/es2015-polyfills.js',
            './dist/angular-custom-element/scripts.js',
            './dist/angular-custom-element/main.js'
          ];
        
          await fs.ensureDir('output');
          await concat(files, 'output/contact-form.js');
    }
    concatenate();

We are adding the relative paths of our JavaScript files in the `files` array so make sure to put the right paths in your case.

Now, let’s add a script to the `package.json` file to run this file after we build the project:


      "scripts": {
        "build:component": "ng build --prod --output-hashing none && node concatenate.js",  
      },

 In your terminal run the following command to build the Angular project and concatenate the files into one `output/contact-form.js` file:
 

    $ npm run build:component

 

## Testing our custom element with JavaScript

Now, let’s test our custom element using vanilla JavaScript. 
 
Let’s create a new `index.html` file inside the output folder where our custom element is built and add the following code:


    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Testing our custom element</title>
      <base href="/">
    </head>
    <body>
      <contact-form></contact-form>
      
      <script type="text/javascript" src="contact-form.js"></script>
    </body>
    </html>
    

We include the custom element using a  `<script>` tag and we invoke the component using the `<contact-form>` tag.

Now, let’s use something like `http-server` to serve this file locally:


    $ npm install http-server -g 

Next, make sure you are inside the folder where you have created the `index.html` file and run the following command:


    $ cd output
    $ http-server 

 

## Conclusion

Web components with their custom elements, shadow dom, html imports and html templates are the future of the web platform and how we’ll build apps in the future. By combining these APIs with powerful frameworks like Angular, we can build apps that reusable components that are future-proof without fear of the used technologies becoming legacy.

Angular makes it easy to work with custom elements and shadow DOM by providing an easy to use API on top of the low level APIs like the Angular elements package and the `ViewEncapsulation` API.

In this tutorial, we’ve seen an Angular 8 example where we’ve built a reusable contact form as an Angular component and export it as a custom element that can be used with vanilla JavaScript.