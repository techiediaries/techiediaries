---
layout: post
title: "Angular 9 Renderer2 with Directives Tutorial by Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll be learning about Renderer2 in Angular 9/8 and directives which allow you to manipulate DOM. Renderer2 is a service which provides methods like `createElement`, `createText`, `appendChild` and `addClass` that help you query and manipulate the DOM elements in your Angular 9 application" 
categories: angular
tags : [angular, angular-9] 
---

In this tutorial, we'll be learning about Renderer2 in Angular 9/8 and directives which allow you to manipulate DOM. Renderer2 is a service which provides methods like `createElement`, `createText`, `appendChild` and `addClass` that help you query and manipulate the DOM elements in your Angular 9 application. 

We'll learn how to use: 

- Renderer2 with Angular 9 directives by example
- Renderer2 `createElement`, `createText` and `appendChild` for creating and appending DOM elements with directives in Angular 9,
- `setAttribute` and `removeAttribute` for dynamically setting and removing DOM attributes,
- `addClass` and `removeClass` for dynamically adding and removing classes in Angular 9 directive,
- `setStyle` and `removeStyle` for dyncamically setting and removing CSS styles,
- `setProperty` for setting DOM properties like `href` of `<a>` elements 

## The Renderer2 Service in Angular 9

As mentionned before, Renderer2 is an Angular service that can be injected in the other services or components. In Angular 9, Renderer is deprecated and Renderer2 is the service that you need to use for working with the DOM. 

Renderer2 allows you to create Angular 9 apps which can be rendered in  environments that don’t have DOM like servers or web workers.

## How to Use Renderer2 with Angular 9 Directive by Example

In this example, we'll use Renderer2 with a custom directive. 

Custom directives are great example for Renderer2 in Angular 9 becaue they are the recommended artifacts for working with the DOM. 

We'll see how to use the Renderer2' `addClass` method of Renderer2 for adding a custom CSS class to the DOM elements where the directive is applied.

## Create an Angular 9 Directive

Head over to a terminal, navigate to your Angular 9 project's folder and run the following command:

```bash
ng generate directive apply-class
```

Next, open the `src/app/apply-class/apply-class.directive.ts` file and update it as follows: 

```typescript

import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[applyCSSClass]'
})

export class ApplyClassDirective implements OnInit {

  constructor(
    private renderer2: Renderer2, 
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.renderer2.addClass(this.elementRef.nativeElement, 'myClass')
  }
  
}
```

We used Angular's `ElementRef` for getting a reference to the native DOM element.

The directive can be used in your Angular templates by attahing it to elements and will add a CSS class called `myClass`.

```html
<p applyCSSClass>
  Angular 9 Example Directive with Renderer2
</p>
```

We apply the directive to DOM elements in the template using the selector specified in the directive which is `applyCSSClass`.

## Angular 9' Renderer2 `createElement`, `createText` and `appendChild` Methods

The `createElement` method of Renderer2 allows you to create DOM elements in the Angular way without directy working with DOM.

The `createText` method of Renderer2 allows you to create text nodes in the DOM.

## Generate an Angular 9 Directive

Head back to your command-line interface and run the following command to generate a directive:

```bash
ng generate directive new-node
```

Open the directive file and update it as follows:


```typescript
import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
   selector: '[addNewElement]'
})

export class NewNodeDirective implements OnInit {

   constructor(
      private renderer2: Renderer2,
      private elementRef: ElementRef
   ) { }

   ngOnInit() {
      const pNode = this.renderer2.createElement('p');
      const txtNode = this.renderer.createText('A new text node');

      this.renderer2.appendChild(pNode, txtNode);
      this.renderer2.appendChild(this.elementRef.nativeElement, pNode);
   }

}
```

Next, open your Angular template and add the following markup to apply the directive:

```markup
<div addNewElement></div>
```

## Angular 9 Renderer2 `setAttribute` and `removeAttribute` 

Another use case of Renderer2 in Angular 9 is setting and removing attributes.

Renderer2 provides the `setAttribute()` and `removeAttribute()` methods for setting and removing attributes from DOM elements in the Angular way without using native JavaScript methods.

## Generatig an Angular 9 Directive

Go back to your terminal and generate a new directive as follows:

```bash
ng generate directive add-attribute
```

Open the directive file and update it as follows:

```typescript
import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
   selector: '[addAttribute]'
})

export class AddAttributeDirective implements OnInit {

   constructor(
      private renderer2: Renderer2,
      private elementRef: ElementRef
   ) { }

   ngOnInit() {
      this.renderer2.setAttribute(this.elementRef.nativeElement, 'aria-hidden', 'true');
   }

}
```

```markup
<p addAttribute>Renderer2 Directive</p>
```

We used the `setAttribute()` method to set an attribute in the DOM element.

## Angular 9 Renderer2 `removeClass` 


Let's now see how to use the `removeClass()` method of Renderer2 in Angular 9. 

Create a new `remove-class` directive and update it as follows

```typescript
import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
   selector: '[removeCSSClass]'
})

export class RemoveClassDirective implements OnInit {

   constructor(
      private renderer2: Renderer2,
      private elementRef: ElementRef
   ) { }

   ngOnInit() {
      this.renderer2.removeClass(this.elementRef.nativeElement, 'myClass');
   }

}
```

```markup
<p removeCSSClass>Renderer2 removeClass</p>
```

## Angular 9' Renderer2 `setStyle` and `removeStyle`

Just like `addClass` and `removeClass`, Renderer2 provides the `setStyle()` and `removeStyle()` methods for dynamically setting and removing styles without working with the DOM using native methods.


These methods allow you to set and remove inline CSS styles in DOM elements:

```typescript
import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
   selector: '[addCSSStyle]'
})

export class AddCSSStyleDirective implements OnInit {

   constructor(
      private renderer2: Renderer2,
      private elementRef: ElementRef
   ) { }

   ngOnInit() {
      this.renderer2.setStyle(
         this.elementRef.nativeElement,
         'background-color',
         'black'
      );
   }

}
```

This is how the directive can be applied in the HTML templates:

```markup
<p addCSSStyle>
Renderer 2 setStyle Example
</p>
```

We can also remove the inline style using the `removeStyle()` method:

```typescript
constructor(
  private renderer2: Renderer2, 
  private elementRef: ElementRef
) {}
 
ngOnInit() {
  this.renderer2.removeStyle(this.elementRef.nativeElement, 'background-color');
}
```


## Angular 9 Renderer2's `setProperty` 

Renderer2 provides the `setProperty()` methods allows you to set properties in Angular.

Let's see this by example:

```typescript
import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
   selector: '[setHrefProperty]'
})

export class SetHrefDirective implements OnInit {

   constructor(
      private renderer2: Renderer2,
      private elementRef: ElementRef
   ) { }

   ngOnInit() {
      this.renderer2.setProperty(this.elementRef.nativeElement, 'href', 'https://techiediaries.com');
   }

}
```

This is how the directive is applied:

```markup
<a setHrefProperty>Go to Techiediaries</a>
```


## Conclusion

In this tutorial, we've seen how to use Renderer2 in Angular 9 with directives to access and manipulate the DOM without using native JavaScript methods.