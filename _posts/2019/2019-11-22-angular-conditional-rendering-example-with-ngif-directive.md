---
layout: post
title: "Angular 9 Examples: Conditional Rendering  With *ngIf & Else"
image: "images/content/angular.jpg"
excerpt: "In this example, we'll see how to conditionally render a component or HTML element in Angular 9 using the *ngIf directive" 
tags : [angular, angular9] 
---


![Angular 9 Examples: ngIf & Else](https://www.techiediaries.com/letslearnangular.png)

In this example, we'll see how to conditionally render a component or HTML element in Angular 9 using the `*ngIf` directive.

## What's conditional rendering?

Conditional rendering means elements are inserted into the DOM only when a condition is meet.

Angular provides the `*ngIf`  directive which allows you to render elements conditionally in your Angular templates.

Let's see this with a simple example.

Open the `src/app/app.component.ts` file in your project define a new class variable called `displayElement` and gives it an initial value of false: 
 
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  displayElement = false;
}
```

Next, open the `src/app/app.component.html` file and update it as follows:

```html
<div>
    <p *ngIf="displayElement">Magic element!</p>
</div>
```

In this case, the `<p>`  element and its contents will not be rendered in the DOM because we applied the `*ngIf` directive with a false value

If you go back to your component's class and assign a true value to the `displayElement` variable the element will be rendered.

## The Else block

Just like typical programming languages the `*ngIf` directive can have an `else` block which is shown if the statement defined in the main block is false.

Go back to the `src/app/app.component.html` file and update it as follows:


```html
<div>
    <!-- notActive is a reference to else -->
    <p *ngIf="displayElement; else showThis">Magic element!</p>
    <ng-template #showThis>      
	    Another magic element!
    </ng-template>
</div>
```

Here, we used the  `else showThis`  with  the `*ngIf`  directive to provide  a partial template that will be rendered instead if the `<p>` element.

The else block has to be an `ng-template`. 

The Angular template is referenced using a template reference that we've called `showThis`.

## Another example

Open the `src/app/app.component.html` file and replace the contents with the following code:

```html
<input [(ngModel)]="showContent" type="checkbox"/> Show My Secret Message

<hr />

<div *ngIf="showContent; else message">
  Hello Angular 9!
</div>

<ng-template #message>
  Click the checkbox above to read the secret message!
</ng-template>
```

This will render a checkbox and a **Click the checkbox above to read the secret message!** text. When you click the checkbox, **Hello Angular 9!** will be rendered instead!

This is the example in [Stackblitz](https://stackblitz.com/edit/angular-ngif-else-example?ctl=1&embed=1&file=src/app/app.component.html)


