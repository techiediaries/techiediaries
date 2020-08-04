---
layout: post
title: "Angular 10/9 Elements Tutorial by Example: Building Web Components"
image: "images/content/angular.png"
excerpt: "In this Angular 10 Elements tutorial by example we'll learn how to use Angular  to build web components or custom elements." 
tags : [ javascript, angular, angular-10 ]
date: 2020-08-04 
categories: angular
author: ahmed
---

In this tutorial Angular 10 by example, we'll learn how to build web components and custom elements with Angular 10/9 and use them everywhere using the latest version of Angular and Angular CLI 10.

## What is Angular Elements?

The Angular Elements package (`@angular/elements`) allows you to create native custom elements and author web components with Angular. 
 
The `@angular/elements` package provides a `createCustomElement()` API that can be used to transform Angular Components to native Custom Elements.

> **Note**: This tutorial is also valid for Angular 8 and Angular 9 versions.


You can find a long and detailed tutorial for web components with Angular from the [Custom Elements & Shadow DOM with Angular article](https://www.techiediaries.com/custom-elements-shadow-dom/).

## What is a Web Component or Custom Element?

A Custom Element provides a way to create web components i.e new DOM elements that behave like standard HTML elements

According to 
[Custom Elements v1: Reusable Web Components](https://developers.google.com/web/fundamentals/web-components/customelements)
>With [Custom Elements](https://html.spec.whatwg.org/multipage/scripting.html#custom-elements), web developers can **create new HTML tags**, beef-up existing HTML tags, or extend the components other developers have authored. The API is the foundation of [web components](http://webcomponents.org/). It brings a web standards-based way to create reusable components using nothing more than vanilla JS/HTML/CSS. The result is less code, modular code, and more reuse in our apps. 


## Installing Angular 10 CLI

Head to your terminal and run the following command to install the Angular CLI 10 globally:

```bash
npm i -g @angular/cli
```

This will install the latest version and you may need to add **sudo** depending on your npm configuration.


## Creating a New Angular 10 Example Project

Head back to your terminal and run the following command to create a new **Angular 10** project using the **Angular CLI**:

```bash
$ ng new angular-10-webcomponents-demo --prefix custom
```

We simply use the usual `ng new` command and you can use all the other parameters to add routing or Sass etc. But also note the **custom** prefix -- This is required for custom elements. 

You'll be prompted if you would like to set up routing in your project and which stylesheet format you would like to use. Choose the appropriate answers for your project.

## Adding the Angular Elements 10 Package

To be able to create web components we need to install the Angular Elements v10 package. You can simply use the `ng add` command to install the package:

```bash
$ angular-10-webcomponents-demo
$ ng add @angular/elements
```

This command adds the `document-register-element.js` polyfill required for web browsers that don't support custom elements yet and the `@angular/elements` package.

## Creating an Example Angular 10 Component 

An Angular component is an angular concept that's different from a web component so let's see how we can create a component and transform it to web component using the `createCustomElement()` function of `@angular/elements`.

First, let's generate a new Angular component using the Angular CLI:

```bash
$ ng g component analytics-counter --inline-style --inline-template -v Native
``` 

This command creates a new `analytics-counter` folder and generates the following files and then updates the `src/app/app.module.ts` file:

- `analytics-counter.component.html`
- `analytics-counter.component.css`
- `analytics-counter.component.ts`
- `analytics-counter.component.spec.ts`


Using `ViewEncapsulation.Native` encapsulates the CSS styles, template and the code into the same file.

## Adding the Component to Main NgModule

We need to follow some steps in order to transform the Angular component to a web component. Open `app.module.ts` then add the following changes:

First import `Injector` from the `@angular/core` package and `createCustomElement` from the `@angular/elements` package:

```ts
import  { Injector} from '@angular/core';
import  { createCustomElement } from '@angular/elements';
```
Next, we need to instruct Angular to compile it the component by adding it to the `entryComponents` array of the main module:

```ts
...
entryComponents :  [
   AnalyticsCounterComponent
]
```

Now you are ready to transform the component into a web component by calling the `createCustomElement()` method from the `ngDoBootstrap()` method:

```ts
export class AppModule {
  constructor(private injector : Injector){}
  ngDoBootstrap(){
	  const el = createCustomElement(AnalyticsCounterComponent, {injector : this.injector});
  customElements.define('analytics-counter',el);
  }
  }
```

We are bootstrapping our Angular Component as a custom element in the `ngDoBootstrap()` method.

The `createCustomElement` method takes two parameters:

- The first parameter is the Angular component that will be used to create the custom element.
- The second parameter is  a configuration object that has an injector property set to the current `Injector` instance.
- Using the `createCustomElement` API we can transform and Angular 6 component to a Custom Element.

We defined a custom element using the standard browser API `customElements.define()`
> `_createCustomElement_` Builds a class that encapsulates the functionality of the provided component and uses the configuration information to provide more context to the class. **Takes the component factory’s inputs and outputs to convert them to the proper custom element API and add hooks to input changes.**

This is the content of the `src/app/app.module.ts` file:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AnalyticsCounterComponent } from './analyticscounter/analyticscounter.component';

@NgModule({
declarations: [AnalyticsCounterComponent],
imports: [BrowserModule],
entryComponents: [AnalyticsCounterComponent]
})
export class AppModule {

constructor(private injector: Injector) {
	const analyticsCounter = createCustomElement(AnalyticsCounterComponent, { injector });
	customElements.define('analytics-counter', analyticsCounter);
}
ngDoBootstrap() {}
} 
```


  
## Building the Angular 10 Project for Production

Just like any normal Angular project. You can use the following command to generate a production build:

```bash
$ ng build --prod --output-hashing none
```

In the `dist` folder, you'll find multiple generated files. Ideally, we must have only one file for using the web component but unfortunately the Angular CLI doesn't provide a way to produce on file for now.

We can simply create a build script to produce only one JS file from the multiple files generated by the Angular CLI.   

Create a `concatenate.js` file in the root folder of your project then add the following content:

```js
const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
const files = [
'./dist/<PROJECT_NAME>/runtime.js',
'./dist/<PROJECT_NAME>/polyfills.js',
'./dist/<PROJECT_NAME>/scripts.js',
'./dist/<PROJECT_NAME>/main.js',
]
await fs.ensureDir('elements')
await concat(files, 'elements/analytics-counter.js');
await fs.copyFile('./dist/angular-elements/styles.css', 'elements/styles.css')
await fs.copy('./dist/angular-elements/assets/', 'elements/assets/' )
})()
``` 

- Creates a new sub-folder elements inside the project folder
- The JS files `runtime.js`, `polyfills.js`, `scripts.js` and `main.js` are concatenated into a new file `analytics-counter.js` inside the elements folder
- `styles.css` from the production build is copied to the elements folder
- Files from the assets folder are copied to the elements folder

You need to install `fs-extra` and `concat` from npm using:

```bash
npm install fs-extra concat --save-dev
```
Now let's add a script to `package.json`:

```json
{
"scripts": {
...
"build:elements": "ng build --prod --output-hashing none && node concatenate.js"
},
}
}
``` 

You can run the script using:

```bash
npm run build:elements
```

## Example Using our Custom Element

Now that we have one file that holds our custom element. Let's see how we can use our web component in other file.

Create an `index.html` file then add the following content:

```html
<!doctype html>
<html lang="en">
<head>
<title>Angular 10 Elements Demo</title>
</head>
<body>
<analytics-counter></analytics-counter>
<script src="analytics-counter.js"></script>
</body>
</html>
``` 

We need a way to serve this file so we'll use a simple HTTP server --  [http-server](https://www.npmjs.com/package/http-server) :

```bash
npm install http-server -g
```


## Conclusion

Throughout this tutorial by example, we've seen how to use Angular 10 Elements to build standard web components from Angular 10 components.

