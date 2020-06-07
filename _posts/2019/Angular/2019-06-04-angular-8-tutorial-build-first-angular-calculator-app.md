---
layout: post
title: "Angular 8 Tutorial: Build your First Angular App"
image: "images/content/angular.png"
excerpt: "In this tutorial, you will learn to build your first Angular 8 application from scratch." 
canonical: https://www.techiediaries.com/angular-9-tutorial-and-example/
tags : [  angular , angular8, angular-9-tutorials]
---

In this tutorial, you will learn to build your first Angular 8 application from scratch.

You'll get started with the basic concepts like modules, components and directives.

You'll also learn about event and property binding.

We'll be building a simple calculator application to demonstrate all the mentioned concepts.

## Prerequisites

Let's get started with the prerequisites. You will need to have:

- The knowledge of [TypeScript](https://www.techiediaries.com/angular/unsubscribe-rxjs-subjects-ondestroy-oninit-changedetectorref/), HTML and CSS.
- Node and NPM installed on your system.
- Angular CLI 8 installed on your system.

## Generating our Angular 8 Calculator Project

After setting up your environment by installing Node and Angular CLI in your system, let's create a project. So open a terminal and execute the following command:

```bash
$ ng new ngcalculator
```

The CLI will ask you if you would like to add routing to your project - You can say **N**o as we will not need routing in this demo. For the stylesheets format, choose **CSS**.

You can then wait for the CLI to generate your project and install the required dependencies from npm.

After that, you can start a live development server using the `ng serve` command: 

```bash
$ cd ./ngcalculator
$ ng serve
```

Wait for the CLI to compile your project and start the server at `http://localhost:4200`.

## Angular Modules & Components

Angular follows a **modular** and **component-based** architecture. In fact, these are two architectures - The modular architecture in which you build your application as a set of modules. The general rule is that you need to use a module for each feature of your application. The component-based architecture in which, you build your application as a set of components.

> **Note**: In our Angular 8 project generated with the CLI, we already have a root module which is conventionally called `AppModule` and a root component which is conventionally called `AppComponent`.

> The root module and component are the first bootstrapped by the Angular application (In the `main.js` and `app.module.ts` files)


According the [Angular docs](https://angular.io/guide/architecture-modules), this is the definition of a module:

>Angular apps are modular and Angular has its own modularity system called NgModules. NgModules are containers for a cohesive block of code dedicated to an application domain, a workflow, or a closely related set of capabilities. They can contain components, service providers, and other code files whose scope is defined by the containing NgModule. They can import functionality that is exported from other NgModules, and export selected functionality for use by other NgModules.

Since we are building a simple calculator application we don't actually need more than one module so let's keep it simple and use the root module for implemening our feature.

> **Note**: You can generate a new module using the CLI: `ng generate module <name>`.

### What About Components?

A component controls a part of the screen. It's simply a TypeScript class (decorated with `@Component`) with an HTML template that displays the view.  

We also don't need much components in our calculator app, but let's create a component for encapsulating the calculator view and logic. Open a new terminal, navigate to your project's folder and run the following command:

```bash
$ ng generate component calculator --skipTests 
```

We added the `--skipTests` option to tell the CLI to skip generating a file for component tests as we will not add any tests in this tutorial.

The CLI has generated the following files in the `src/app/calculator` folder:

- `src/app/calculator/calculator.component.css` for CSS styles.
- `src/app/calculator/calculator.component.html` for the component's template or the view.
- `src/app/calculator/calculator.component.ts` for the component logic.

Open the `src/app/calculator/calculator.component.ts` file:

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

The `CalculatorComponent` class knows about the template and CSS file thanks to the `@Component()` decorator which takes the following metadata:

- `selector` that allows us to give the component a tag name that can be used to reference the component from other templates just like standard HTML tags.
- `templateUrl` that points to the HTML template that renders the view of the component. You can also use an inline template with the `template` property instead.
- `styleUrls` that allows us to associate one or multiple stylesheets to our component.

Since we didn't include routing in our application, we need a way to access our calculator component from our root component. That's where the selector property of the component comes handy - we can call our calculator component using the `<app-calculator>` tag. Open the `src/app/app.component.html` file, remove the existing content and add:

```html
<app-calculator></app-calculator>
```   

## Creating our Calculator UI

We'll be using the HTML and CSS code from the following JS fiddle to create our calculator UI:

<script async src="//jsfiddle.net/ayoisaiah/c8b9zsaq/10/embed/"></script>

Open the `src/app/calculator/calculator.component.html` file and add the following code:

```html
<div class="calculator">

  <input type="text" class="calculator-screen" value="0" disabled />
  
  <div class="calculator-keys">
    
    <button type="button" class="operator" value="+">+</button>
    <button type="button" class="operator" value="-">-</button>
    <button type="button" class="operator" value="*">&times;</button>
    <button type="button" class="operator" value="/">&divide;</button>

    <button type="button" value="7">7</button>
    <button type="button" value="8">8</button>
    <button type="button" value="9">9</button>


    <button type="button" value="4">4</button>
    <button type="button" value="5">5</button>
    <button type="button" value="6">6</button>


    <button type="button" value="1">1</button>
    <button type="button" value="2">2</button>
    <button type="button" value="3">3</button>


    <button type="button" value="0">0</button>
    <button type="button" class="decimal" value=".">.</button>
    <button type="button" class="all-clear" value="all-clear">AC</button>

    <button type="button" class="equal-sign" value="=">=</button>

  </div>
</div>
```

Next, open the `src/app/calculator/calculator.component.css` file and add the following CSS styles:

<script src="https://gist.github.com/techiediaries/c5f68e66acbca784cb2350863aa4e4f0.js"></script>

We also need to add some global styling so open the `src/styles.css` file and add:

```css
html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}  
```

Now if you go to your web browser and navigate to your app, you should see the following interface:

![Angular 8 Example Calculator](https://www.diigo.com/file/image/bbccosoazobaoooccdzdrocqebd/Ngcalculator.jpg)

Now we need to use Angular magic to turn this template to a working calculator.

## Conclusion

In this first part, we created our Angular 8 calculator application. In the [next tutorial](https://www.techiediaries.com/angular-data-event-property-binding), we'll use Angular data binding to make a working calculator.


















