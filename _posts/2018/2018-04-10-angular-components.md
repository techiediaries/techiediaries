---
layout: post
title: "Angular 7|8 Components"
image: "images/content/angular.jpg"
excerpt: "This tutorial explains Angular components, what are they? And how to create them?" 
tags : [angular] 
---

Now, let’s get to other piece of the puzzle - **components**.  Simply put, a component controls a part of the UI of your application. For example, the header, footer, or whole page can all be components. Depending on how much reusability, you want in your code. 

Technically, an Angular component is a **TypeScript class decorated with the** `@Component` decorator which is part of the Angular core.

A component has an associated view which is simply an HTML file (but can also contain some special Angular template syntax which helps display data and bind events from the controller component)

A component has also one or more associated stylesheet files for adding styles to the component view. These files can be in many formats like CSS, Stylus, Sass or Less.

Head back to your project in Stackblitz, open the `src/app/app.component.ts` file, you should find the following code:


    import { Component } from '@angular/core';
    
    @Component({
      selector: 'my-app',
      templateUrl: './app.component.html',
      styleUrls: [ './app.component.css' ]
    })
    export class AppComponent  {
      name = 'Angular';
    }

In this file, we export the `AppComponent` class, and we decorate it with the `@Component` decorator, imported from the `@angular/core` package, which takes a few metadata, such as:


- `selector`: this allows you to invoke the component from an HTML template or file just like standard HTML tags i.e: `<my-app></my-app>`,
- `templateUrl`: This is used to tell the component where to find the HTML view,
- `styleUrls`: This is an array of relative paths to where the component can find the styles used to style the HTML view. 

`AppComponent` is the **root** component of our application. It’s the base of the tree of components of our application and it’s the first component that gets inserted in the browser DOM. Read [The](https://angular.io/guide/bootstrapping#the-bootstrap-array) `[bootstrap](https://angular.io/guide/bootstrapping#the-bootstrap-array)` [array](https://angular.io/guide/bootstrapping#the-bootstrap-array).

An Angular application is composed of a tree of components, in which each Angular component has a specific purpose and responsibility.


A component is comprised of three things:

- **A component class,** which handles data and functionality. In the previous section, the product data and the `share()` method were defined for you in the component class.
- **An HTML template,** which determines what is presented to the user. In the previous section, you modified the product list's HTML template to display the name, description, and a "Share" button for each product.
- **Component-specific styles** that define the look and feel. The product list does not define any styles.


Currently, our app has three components:


- `app-root` (orange box) is the application shell. This is the first component to load, and the parent of all other components. You can think of it as the base page.
- `app-top-bar` (blue background) is the store name and checkout button.

## Working with Angular 8 Components

Most work you do with Angular relates to components. Basically an Angular application is a tree of components with a root component. A component controls a part of the web application screen. It consists of JavaScript (or precisely TypeScript) code, HTML code and CSS. If you are familiar with the MVC  (Model-View-Controller) architecture or design pattern, each component actually uses the same architecture: the component's code represents the controller and the HTML code (with CSS) represents the view.

### How to Create an Angular 8 Component?

You can create a component in Angular 6using the `@Component()` decorator which can be imported from  `@angular/core`. You simply decorate a TypeScript class with the `@Component()` decorator that takes information about the HTML view to use for the component and the CSS styles. For the code which controls the component, it's encapsulated inside the class. 

Here is an example of a simple Angular component

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

You  can also find the **app.module.ts** file, which's used to define an Angular module.

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

First we import the *Component* class from `@angular/core`. Then we use it to decorate the *AppComponent* class which transforms it to a component. The component decorator takes these information: 

- The *selector* contains the name of the tag that can be used to create this component. 
- The *templateUrl* contains the relative URL/path to the HTML template to be used as the view
- the *styleUrls* contains the array of CSS styles to be used for styling the component

The AppComponent has a variable *title* which has a string value. If you look in the component HTML template `src/app/app.component.html`:

```html
<div style="text-align:center">
	<h1>
		Welcome to {{ title }}!
	</h1>
	<img width="300" alt="Angular Logo" src="data:image/svg+xml;....">
</div>
```   

You can notice that we are using the curly braces `{{` and `}}` to display the value of *title*. This is what's called **data binding** (we'll look at the concept in depth in next tutorials).


## Creating Angular Components Using Angular CLI

You can create a component by manually creating the necessary files or you can also use the Angular CLI to automatically generate the bare minimum code for a a basic component. The Angular CLI takes care, also, of adding the component to the module definition.

To generate a component with the Angular CLI just run the following command:

```bash
ng g component MyComponent
```

You can find the available options from the [docs](https://github.com/angular/angular-cli/wiki/generate-component).

