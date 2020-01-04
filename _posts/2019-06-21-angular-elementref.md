---
layout: post
title: "Understanding Angular 8 ElementRef by Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll be seeing an example of ElementRef with Angular 8. We'll use the online Stackblitz development IDE, so you don't need to set up your development environment  or create an Angular project for this quick example." 
tags : [angular , angular8] 
---

In this tutorial, we'll be seeing an example of `ElementRef` with Angular 8. We'll use the online Stackblitz development IDE, so you don't need to set up your development environment  or create an Angular project for this quick example.

Visit the [https://stackblitz.io/](https://stackblitz.io/) website. If you don't have an account, you can simply use GitHub to quickly sign up then create a new Angular app.

## What's `ElementRef`?

Before writing any code, let's see what's `ElementRef` is and what it's used for. 

According to the [official docs](https://angular.io/api/core/ElementRef)

> `ElementRef` is a wrapper around a native element inside of a View. 

It's simply a class that wraps native DOM elements in the browser and allows you to work with the DOM by providing the `nativeElement` object which exposes all the methods and properties of the native elements.

## A Simple Example!

Let's now see a simple example for how to access the DOM using the `ViewChild` decorator combined with the `ElementRef` interface. Go back to your Angular application created in Stackblitz and open the the `src/app/app.component.ts` file. Next, add the following changes:

```ts
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit {
  name = 'Angular 8 by Example: ElementRef';

  @ViewChild("myDiv") divView: ElementRef;

  ngAfterViewInit(){

    console.log(this.divView);
    this.divView.nativeElement.innerHTML = "Hello Angular 8!";

  }

}
```

We simply import the `AfterViewInit`, `ElementRef`, `ViewChild` symbols.  Next, we implement the AfterViewInit interface which provides our component with the `ngAfterViewInit()` life-cycle method that gets called after the view is intialized (This is important since we can query or modify the view only after it's intialized). 

Next, we declare the `divView` component property and decorate it with `@ViewChild()` decorator which is used to create a DOM query configuration. Here, we create a query that looks for the element with the `myDiv` template reference.

The type of the `divView` variable is our `ElementRef` interface which means we can access the `nativeElement` object that reprents the DOM element in the browser.

After that, we add the  `ngAfterViewInit()` life-cycle event and set the `innerHTML` of our `<div>` to **Hello Angular 8!**
 
This is equivalent to `document.getElementById("myDiv").innerHTML = "Hello Angular 8!";` in plain JavaScript. Except that we use template reference variables instead of IDs in Angular.

We also printed the `divView` in the console. If you open the Stackblitz console, you'll see the properties of `ElementRef`:

![Angular 8 ElementRef Example](https://www.diigo.com/file/image/badcbccczobceeabebzdrprcbpo/angular-8-elementref+-+StackBlitz.jpg)

To make our code works as in the screenshot, one thing left is adding a `<div>` with the `myDiv` reference in our component template. Open the `src/app/app.component.html` file and change as follows:

```html
<hello  name="{{ name }}"></hello>

<div #myDiv>
</div>
```

> **Note**: `ElementRef` allows direct access to the DOM which could risk your app to XSS attacks. There are other alternatives (templating, data binding and also the `Renderer2` API) to directly access the DOM which will cover in other tutorials.


## Conclusion

In this quick post, we've seen what `ElementRef` is and how It can be used with other APIs to access the native DOM elements with a simple Angular 8 example. You can see the live example from this [link](https://stackblitz.com/edit/angular-8-elementref). 

