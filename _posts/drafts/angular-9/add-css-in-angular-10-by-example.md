---
layout: bpost
title: "Add CSS in Angular 10 by Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll take a look at how to add CSS styles to your Angular 10 app"
date:  2020-03-12
categories: angular
tags : [  angular ]
---

In this tutorial, we'll take a look at how to add CSS styles to your Angular 10 app.

We'll see how we can dynamically assign CSS styles to elements in Angular. The various methods to dynamically assign a CSS style to an element using the `style` property. Set styles depending on some state in your application with `ngStyle`, `ngClass` and style expressions.

First of all, let's revise how styles are assigned using native JavaScript before tackling the Angular methods.

## Adding CSS Styles Using JavaScript

In JavaScript you could assing CSS styles using the following steps.


First, you need to get or query the DOM element that needs to b styled. For example:

```js
const element = document.querySelector('#elemenID')
```

Next, you can use the `style` property on the element as follows:

```js
element.style.color = 'red'
```

Now, let's see how to do the same in Angular. 

This tutorial works for Angular 10 and previous versions of the platform.

Before that, let's see various ways you can use to include CSS styles in your apps.

Since Angular is component-based, this makes writing and organizing styles easier.

We have many ways to include styles in your app such as:

- Inline styles of components, styles are added via the `styles` array property in `@Component` decorator.
- External stylesheets of components, We import CSS styles using the `styleUrls` property in `@Component` decorator.
- Template inline styles: The styles can be wrapped in a `style` tag and placed before the HTML markup in the template or can be written as normal inline styles in the template HTML tags using the `style` property. 


This is an example of how to use the `styles` property of the component decorator to include inline CSS styles:

```ts
@Component({
  templateUrl: 'app.component.html',
  styles: [`
    .cls {
      height: 300px;
      color: red;
    }
  `],
})
```

This is an example of how to use the `styleUrls` property of the component decorator to include external CSS styles:


```ts
@Component({
  styleUrls: ['assets/style.css'],
  templateUrl: 'app.component.html',
})
```

This is an example of how to use the `template` property of the component decorator to include inline CSS styles using the HTML `<style>` tag:



```ts
@Component({
  template: `
    <style>
    div {
      background: black;
    }
    </style>
    <h1>Styling Angular 10 Component</h1>
    `
})
```

>We can assign a style to an element like so:

```html
<div [style.color]="'blue'">Some example text</div>
```

> hypens are allowed to specify the style to adjust:

```html
<div [style.background-color]="'blue'">Some example text</div>
```

>We can also use the style property to assign multiple values like this:

```html
<div [style.background-color]="'blue'" [style.color]="'white'">
  Some example text
</div>
```

## Binding to properties

>Of course, we can also bind the style to variable properties defined in the component.

>If we had a property called color

```ts
import { Component } from '@angular/core'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  color = 'red'
}
```
>we could bind to it by using its name:

```html
<div [style.color]="color">Some example text</div>
```

>Notice that the property is without additional single quotes, while static values require them.

> We could base the style on the condition of that flag:

```html
<div [style.color]="flag ? colorA : colorB">Some example text</div>
```

## How to add multiple CSS styles in Angular using ngStyle directive

When assigning many different styles to an element, the syntax becomes quite confusing and cluttered. This is why there is a different way of assigning styles in Angular using the ngStyle directive.

Other than the style property, ngStyle takes an object containing the style-names and their values.
Assigning static values

To achieve the same thing as before, the syntax now looks like this:

<div [ngStyle]="{'color': 'blue'}">Some example text</div>

Assigning multiple values is a lot cleaner:

<div [ngStyle]="{'color': 'blue', margin: '8px', padding: '8px'}">
  Some example text
</div>

Lukas Marx
May 23, 2019
Angular
NgStyle: How to assign CSS styles in Angular


angular-style-property
Adding CSS styles using the style property

The most straight forward way of assigning a style Angular is using the style property.
Assigning static values

We can assign a style to an element like so:

<div [style.color]="'blue'">Some example text</div>

Other than in other frameworks like react, hypens are allowed to specify the style to adjust:

<div [style.background-color]="'blue'">Some example text</div>

We can also use the style property to assign multiple values like this:

<div [style.background-color]="'blue'" [style.color]="'white'">
  Some example text
</div>

Binding to properties

Of course, we can also bind the style to variable properties defined in the component.

If we had a property called color

import { Component } from '@angular/core'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  color = 'red'
}

we could bind to it by using its name:

<div [style.color]="color">Some example text</div>

Notice that the property is without additional single quotes, while static values require them.
Evaluating expressions

Of course, it is also possible to evaluate expressions to determine a style.

If we had a flag in our component like so,

import { Component } from '@angular/core'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  flag = true
  colorA = 'red'
  colorB = 'blue'
}

we could base the style on the condition of that flag:

<div [style.color]="flag ? colorA : colorB">Some example text</div>

angular-ngStyle
How to add multiple CSS styles in Angular using ngStyle directive

When assigning many different styles to an element, the syntax becomes quite confusing and cluttered. This is why there is a different way of assigning styles in Angular using the ngStyle directive.

Other than the style property, ngStyle takes an object containing the style-names and their values.
Assigning static values

To achieve the same thing as before, the syntax now looks like this:

<div [ngStyle]="{'color': 'blue'}">Some example text</div>

Assigning multiple values is a lot cleaner:

<div [ngStyle]="{'color': 'blue', margin: '8px', padding: '8px'}">
  Some example text
</div>

Binding to properties, we don't need signle quotes for the value:

<div [ngStyle]="{'color': color}">Some example text</div>

Evaluating expressions with ngStyle works in a similar way:

<div [ngStyle]="{'color': flag ? colorA : colorB}">Some example text</div>


## Global Styles

> There are several ways to add Global (Application wide styles) styles to the Angular application. The styles can be added inline, imported in index.html or added via angular-cli.json. The angular allow us to add the component specific styles in individual components, which will override the global styles. In this article we will learn how to add global CSS styles to angular apps. We will also learn how to add custom CSS files & external style sheet to angular application..

> you can add the custom CSS files in angular.json under the styles array ` -> architect -> build -> options -> styles`
 
```json
            ],
            "styles": [
              "src/styles.css"
            ],
```

> The reference to the CSS file is relative to where angular.json file is stored. which is project root folder

> go old school and link it directly in the index.html file as shown below

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
```

## Conclusion

- How we can use the ngStyle directive to assign styles dynamically using Angular.
