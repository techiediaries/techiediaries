# How to Add CSS in Angular 10 by Example

In this tutorial, we'll take a look at how to add CSS styles to your Angular app.

> dynamically assign CSS styles to elements
> different methods to dynamically assign a CSS style to an element using the style property.
> You will also learn, how we can toggle that styles on or off, depending on the state of the application with ngStyle and style expressions.

This tutorial works for Angular 10 and previous versions of the platform.

Since Angular is component-based, this makes writing and organizing styles easier.

We have various ways to include styles in your app

- Inline styles of components, styles are added via the `styles` array property in `@Component` decorator.
- External stylesheets of components, We import CSS styles using the `styleUrls` property in `@Component` decorator.
- Template inline styles: The styles can be wrapped in a `style` tag and placed before the HTML markup in the template or can be written as normal inline styles in the template HTML tags using the `style` property. 


```ts
@Component({
  templateUrl: 'card.html',
  styles: [`
    .card {
      height: 70px;
      width: 100px;
    }
  `],
})
```

```ts
@Component({
  styleUrls: ['css/style.css'],
  templateUrl: 'card.html',
})
```

```ts
@Component({
  template: `
    <style>
    h1 {
      color: purple;
    }
    </style>
    <h1>Styling Angular Components</h1>
    `
})
```

```ts
@Component({
  template: '<h1 style="color:pink">Styling Angular Components</h1>'
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

In this tutorial, we are going to take a look at how we can dynamically assign CSS styles to elements using angular.

We will take a look at different methods to dynamically assign a CSS style to an element using the style property.
This is an affiliate link. We may receive a commission for purchases made through this link.

You will also learn, how we can toggle that styles on or off, depending on the state of the application with ngStyle and style expressions.

Before we do that, we take a look at how CSS styles are assigned using regular JavaScript and then compare that to the Angular way.

Ready?

Let’s get started!

old-way
How to add CSS styles without Angular

First, let's take a look at how we used to assign CSS styles using just Javascript.

First of all, we had to find the DOM element to assign the style to. In the best case, we would find that element by id like this:

const element = document.getElementById('divToStyle')

Afterward, we could use the JavaScript DOM-API to assign a style.

element.style.color = 'blue'

Of course, there is no possibility of data binding. Every time we wanted the style to change we would have to call that API again.

Fortunately, we can use Angular to do that heavy lifting for us...

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
