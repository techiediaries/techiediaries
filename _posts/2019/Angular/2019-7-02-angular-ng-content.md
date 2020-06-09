---
layout: post
title: "Content Projection in Angular 9/8: Pass Data from a Parent Component to a Child Template with Ng-content"
image: "images/content/angular.png"
excerpt: "Content projection is an Angular concept that helps developers build reusable components. It allows you to pass data from a parent component to a template of a child component." 
tags : [ angular , angular8 ] 
--- 

Content projection is an concept that helps developers build reusable [Angular components](https://www.techiediaries.com/angular-components/). It allows you to pass data from a parent component to a template of a child component. It's similar to transclusion in Angular.js

## Content Projection with Angular 9 Example

Let's now see with a simple [Angular 9 example](https://www.techiediaries.com/angular/angular-9-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/) how we can project content from a parent component to its child.

We'll be using Stackblitz for creating our content project example. 

You can check our example from this [link](https://stackblitz.com/edit/angular-8-ng-content). 

 In Stackblitz, we already have a project generated with a couple of components - `AppComponent` and `HelloComponent`.

The hello component takes an input property called `name` and renders the following content:

```html
<h1>Hello {{name}}!</h1>
``` 

In ths `src/app/app.component.html` we include the hello component using it selector:

```html
<hello  name="{{ name }}"></hello>
```

This is the full code of the hello component:

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
}
```
As, you can see. Using the `@Input` decorator we can pass data to our component from the outside. 

> Read more about [Angular TypeScript decorators](https://www.techiediaries.com/angular/upload-images-typescript-node-ionic-imports-decorators-async-await-formdata/).

Now, what if our data is more complex than just a name? Let's say we need to pass some HTML content to our component. This can be done with `@Input` but it's very effiecent and scalable and can be prone to errors.
 
Here comes content projection with `<ng-content>`.

## Implementing Projected Content

Let's modify our hello component to accept projected content from the outside. 

First, we need to use `<ng-content>` in our Angular component template. This is where the passed data will be projected:

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<ng-content></ng-content>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
}
```

Now, in the `src/app/app.component.html` file, we pass the HTML content to our hello component as follows:

```html
<hello>
    <h1>Hello Angular!</h1>
</hello>
```

We pass in the `<h1>Hello Angular!</h1>` code to the hello component to render it.  

We can control what can be passed to the component using `select` in `ng-content`. 

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<ng-content select="h1"></ng-content>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
}
```  

This means only `<h1>` tags will be passed and rendered. For example if you now pass the following content to the hello component, it will not be passed:

```html
<hello>
    <h2>Hello Angular 9!</h2>
</hello>
```

You can also use the _[attr]_ syntax in the select property to to accept only elements that have a specific attribute:

```html
<ng-content select="[title]"></ng-content>
```

Now, to render the content, you need to make the following change:

```html
<hello>
  <h1 title>Hello Angular 9!</h1>
</hello>
```

## Conclusion

As a wrap-up, we've seen how to project content in Angular 9/8 using `ng-content` which helps you build reusable components. 



 