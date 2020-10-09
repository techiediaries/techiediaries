---
layout: post
title: "Angular 10 Components: Input and Output/Pipes and Directives with Examples"
image: "images/content/angular.jpg"
excerpt: "This tutorial explains Angular 9/8 components, what are they? And how to create them?" 
categories: angular
date: 2020-10-09
tags : [angular] 
---
This guide you take throughout learning about Angular 10/9 components by example.

We'll understand what an Angular component is with examples. Angular components are the building blocks of  Angular apps. 

Before tackling the examples, let's see what we will be learning throughout this article.

## What You'll Learn About Angular Components?

-   What an Angular component is?
-   How to Initialize a new Angular 10 project?
-   How to generate a new Angular 10 component?
-   How to bind component properties in the template?
-   How to bind user actions from the template to the component?
-   What are component life-cycle hooks with examples?
-   How to communicate between components using `@Input` and `@Output` decorators?
-   How to dynamically load a component with example?
-   How to style a component?

Before we get started with this guide, we need to have the following prerequisites:

1.  [Node.js](https://nodejs.org) and npm installed on your development machine,
2.  Angular 10/9 CLI. 

## What is an Angular Component?

Simply put, an Angular component controls a part of the UI of your application. For example, the header, footer, or whole page can all be components. Depending on how much re-usability, you want in your code.

> Components are all about code re-usability and organization!

Technically, an Angular component is a **TypeScript** class decorated with the `@Component` decorator which is a part of the Angular core.

### Component View

A component has an associated view which is simply an HTML file (but can also contain some special Angular template syntax which helps display data and bind events from the component class)

### Component Style-sheets

A component has also one or more associated style-sheet files used for adding styles to the component view. These files can be in many formats like CSS, Stylus, Sass or Less.

> The template associated with an Angular component has access to various directives such as `ngModel`, `ngClass`, `ngIf`, `ngFor`, etc. 

The component TypeScript class provides the data and business logic that will be available to the template via data and method bindings that can be applied to the HTML elements in the template.

In nutshell, these are some facts about components:

-  Angular components can be linked to an inline or file-based HTML template, associated style-sheets, and configuration metadata,
-  The Component template can access component data and listen to events via bindings,
-  Templates can make use of builtin directives such as `ngModel`, `ngFor`, `ngIf`, `ngClass`, and `ngStyle`, etc. for various tasks. 

> You can define an Angular component using the `@Component` decorator with a TypeScript class. 

## Initializing a New Angular 10 Project

To learn how to work with components by example, we need to initialize an Angular 10 project. We have previously explained how to  create an Angular 10 project using Angular CLI. 

If you don't have Angular CLI 10 installed, open your command-line interface and run the following command:

```bash
$ sudo npm install -g @angular/cli@next
```

This will install `@angular/cli` version 10 in your terminal. 

Next, let's initialize a new Angular 10 project using the following command:

```bash
$ ng new angular10componentexample
```

## The Anatomy of an Angular Component by Example

Head back to your Angular 10 project, open the `src/app/app.component.ts` file, you should find the following code:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'angular10componentexample';
}
```

In this file, we export the `AppComponent` class, and we decorate it with the `@Component` decorator, imported from the `@angular/core` package, which takes a few metadata, such as:

-   `selector`: this allows you to invoke the component from an HTML template or file just like standard HTML tags i.e: `<my-app></my-app>`,
-   `templateUrl`: This is used to tell the component where to find the HTML view,
-   `styleUrls`: This is an array of relative paths to where the component can find the styles used to style the HTML view.

`AppComponent` is the **root** component of our application. It’s the base of the tree of components of our application and it’s the first component that gets inserted in the browser DOM. Read [The](https://angular.io/guide/bootstrapping#the-bootstrap-array) `[bootstrap](https://angular.io/guide/bootstrapping#the-bootstrap-array)` [array](https://angular.io/guide/bootstrapping#the-bootstrap-array).

An Angular 10 application is composed of a tree of components, in which each Angular component has a specific purpose and responsibility.

A component is comprised of three things:

-   **A component class,** which handles data and functionality. In the previous section, the product data and the `share()` method were defined for you in the component class.
-   **An HTML template,** which determines what is presented to the user. In the previous section, you modified the product list's HTML template to display the name, description, and a "Share" button for each product.
-   **Component-specific styles** that define the look and feel. The product list does not define any styles.

Currently, our app has three components:

-   `app-root` (orange box) is the application shell. This is the first component to load, and the parent of all other components. You can think of it as the base page.
-   `app-top-bar` (blue background) is the store name and checkout button.

## Working with Angular 10 Components

Most work you do with Angular relates to components. Basically an Angular application is a tree of components with a root component.

A component controls a part of the web application screen. It consists of JavaScript (or precisely TypeScript) code, HTML code and CSS. If you are familiar with the MVC (Model-View-Controller) architecture or design pattern, each component actually uses the same architecture: the component's code represents the controller and the HTML code (with CSS) represents the view.

### How to Create an Angular 10 Component?

You can create a component in Angular using the `@Component()` decorator which can be imported from `@angular/core`.

You simply decorate a TypeScript class with the `@Component()` decorator that takes information about the HTML view to use for the component and the CSS styles. For the code which controls the component, it's encapsulated inside the class.

Here is an example of a simple Angular 10 component

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "my-component",
  template: "Hello Angular"
})
class MyComponent {
}
```

This component can be called in your HTML code just like any standard HTML tag, i.e:

```html
<my-component></my-component>

```

The result will be: `Hello Angular`.

In a previous [tutorial](https://www.techiediaries.com/angular-tutorial/) we have used the Angular CLI to generate a basic Angular application with the following folder structure

![](https://screenshotscdn.firefoxusercontent.com/images/2d1dae50-b017-4183-b057-fddd019ad0fb.png)

In `src/app` you can find various files for the root component of the application.

-   **app.component.css**: contains all the CSS styles for the component
-   **app.component.html**: contains all the HTML code used by the component to display itself
-   **app.component.ts**: contains all the code used by the component to control its behavior

You can also find the **app.module.ts** file, which is used to define an Angular module.

A root component is the first Angular component that gets bootstrapped when the application runs. Two things are special about this component:

First, if you open the application module file `src/app/app.module.ts`:

```ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

You'll notice that, it's added to the **bootstrap** array of the module definition.

Second, if you open the `src/index.html` file (the first file that gets rendered when you visit the application URL) of the application

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Angular</title>
    <base href="/">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>

<body>
    <app-root></app-root>
</body>
</html>

```

You'll notice that, it's called inside the document `<body>` tag.

Starting with the application root component, all the other child components (the tree) will be loaded.

Now, let's open the component file `src/app/app.component.ts`:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Angular";
}

```

First we import the _Component_ class from `@angular/core`. Then we use it to decorate the _AppComponent_ class which transforms it to a component. The component decorator takes these information:

-   The _selector_ contains the name of the tag that can be used to create this component.
-   The _templateUrl_ contains the relative URL/path to the HTML template to be used as the view
-   the _styleUrls_ contains the array of CSS styles to be used for styling the component

The AppComponent has a variable _title_ which has a string value. If you look in the component HTML template `src/app/app.component.html`:

```html
<div style="text-align:center">
    <h1>
        Welcome to {{title}}!
    </h1>
    <img width="300" alt="Angular Logo" src="data:image/svg+xml;....">
</div>

```

You can notice that we are using the curly braces `{{ }}` to display the value of _title_. This is what's called **data binding** (we'll look at the concept in depth in next tutorials).

## Creating Angular Components Using Angular CLI 10

You can create a component by manually creating the necessary files or you can also use the Angular CLI to automatically generate the bare minimum code for a a basic component. The Angular CLI takes care, also, of adding the component to the module definition.

To generate a component with the Angular CLI just run the following command:

```bash
$ ng g component purchases
```

You can find the available options from the [docs](https://github.com/angular/angular-cli/wiki/generate-component).
 
Next, let's define some TypeScript variables and methods in our Angular component. Open the `src/app/purchases/purchases.component.ts` file and add the following variables:

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-purchases",
  templateUrl: "./purchases.component.html",
  styleUrls: ["./purchases.component.css"]
})
export class PurchasesComponent {
  title = 'My Purchases Report';
  reportDate: Date = new Date();
  headline = '';
}
```

Next, define the following method:

```ts
  createHeadline() {
    this.headline = `${this.title} of ${this.datePipe.transform(this.reportDate, 'short')}`;
  }
```

This method makes use of the date pipe so you need to import and inject it via the component constructor:

```ts
import { Component } from "@angular/core";
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-purchases",
  templateUrl: "./purchases.component.html",
  styleUrls: ["./purchases.component.css"]
})
export class PurchasesComponent {
  title = 'My Purchases Report';
  reportDate: Date = new Date();
  headline = '';
  constructor(private datePipe: DatePipe) { }
}
```

You also need to import and add `DatePipe` to the providers array of the app module to which our purchases component belong.

Open the `src/app/app.module.ts` file and update it as follows

```ts
@NgModule({
  // [...]
  providers: [DatePipe],
  // [...]
})
```

Next, go back to the `src/app/purchases/purchases.component.ts` file, you need to invoke the `createHeadline` method in the `ngOnInit` life-cycle event of the component to ensure it will be called when the it's initialized:

```ts
  ngOnInit(): void {
    this.createHeadline();
  }
```

Next, open the `src/app/purchases/purchases.component.html` file and update it as follows:

```html
<h1 class="header">{{ title }}</h1>
<h2 class="sub-header">{{ headline }}</h2>
```

Next, open the `src/app/purchases/purchases.component.css` and  add these CSS styles:

```css
.header {
  font-size: 2.3em;
}

.sub-header {
  font-size: 1.3em;
}
```

## Unit Testing our Angular 10 Component

After implementing our component, we can proceed to write the unit tests.
 
Open the `src/app/purchases/purchases.component.spec.ts` file and add the following code for unit testing the Purchases Component:

```js
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchasesComponent } from './purchases.component';

describe('PurchasesComponent', () => {
  let component: PurchasesComponent;
  let fixture: ComponentFixture<PurchasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```


Finally, you can start your Angular 10 app using the following command: 

```bash
$ ng serve --open
```


## Binding TypeScript Component Variables in Templates

You can use Angular bindings to bind TypeScript variables and methods declared in the component's class to the component's template. You can also use built-in or custom directives to in your templates.

Let's see how to create these bindings and directives by example, First, we need to define the various TypeScript variables of string, number, date, and array and then we'll use some Angular syntax to bind them with elements in our template. 

Go to the `src/app/purchases/purchases.component.ts` file and add the following code:

```js
  title = 'Purchases';
  date: Date = new Date();
  dateAsString: string;
  discount = 20;
  
  products: any[] = [
    { id: 1, name: 'iPhone X', desc: 'Refurbished iPhone X 2019', price: 399 },
    { id: 2, name: 'iPhone 11 Pro', desc: 'The latest iPhone series', price: 1099 },
    { id: 3, name: 'Samsung S20', desc: 'The latest Samsung Galaxy S series in 2020', price: 1199 },
    { id: 4, name: 'Asus ROG Phone 2', desc: 'The gaming phone from Asus', price: 599 },
    { id: 5, name: 'Nokia 9', desc: 'The latest Nokia phone in 2020', price: 799 },
  ];
```

We'll also see how to use the built-in date pipe i.e `DatePipe` to format dates. So you need to import it using TypeScript' `import` statement as follows:

```ts
import { DatePipe } from '@angular/common';
```

Next, you need to inject via the class's constructor as follows:

```ts
constructor(private datePipe: DatePipe) { }
```

Now, let's bind our TypeScript variables in the template. Head to the `src/app/purchases/purchases.component.html` file and update it as follows:

```ts
<div class="container">
  <h1>{{title}}: {{dateAsString}} </h1>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let product of products">
          <td>{{product.id}}</td>
          <td>{{product.name}}</td>
          <td>{{product.desc}}</td>
          <td>{{product.price | currency: 'USD'}}</td>
          <td>{{discount}}%</td>
          <td>{{product.price - ((product.price * discount) / 100) | currency: 'USD'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

We use data bindings to display the values of our TypeScript variables in our template. We also use the builtin Angular currency pipe i.e `CurrencyPipe` to display the currency next to price and total price of products. 

## Handling Actions in Components' Class

Angular provides one way bindings i.e to exchange data from the templates to components you need to bind TypeScript methods defined in the components' class to DOM events in templates.
  
There are may types of events that can be triggered by users in the templates such as click, change, and select events. Let's start by listening for a `click` event from a button. 

On the `src/app/products/products.component.html` file add the following code:

```html
<button (click)="setDate()">Set New Date</button>
```

Next, in the `src/app/purchases/purchases.component.ts` file and add the following method:

```ts
  setDate() {
    this.date = new Date();
    this.DateAsString = this.datePipe.transform(this.date, 'short');
  }
```

If you click the button, the actual date on your machine will be displayed on your Angular template.

 Let's see another example of the click event binding. In the template change as follows:

```html
        <tr *ngFor="let product of products" (click)="getRow(product)">
          [...]
        </tr>
```

Next, In the component's class, add the following method that will be bound to the click event of each table row:

```ts
  getRow(product: any) {
    console,log(`Product ID: ${product.id}, Name: ${product.name}`);
  }
```

Next, let's bind  an action to the `mouseover` event of each row table.  Simply add the following code:

```ts
        <tr *ngFor="let product of products" (click)="getRow(product)" (mouseover)="showSelected($event)">
          [...]
        </tr>
	[...]
<p>{{selected}}</p>
```

Next, in the component's class, define the `selected` string variable and `showSelected()` method that will be invoked when the `mouseover` event on the row table is fired. We'll simply show the corresponding row in the template via the `selected` variable:

```ts
  selected: string;
  [...]
  showSelected(event: any) {
    this.selected = event.target.innerText;
  }
```


