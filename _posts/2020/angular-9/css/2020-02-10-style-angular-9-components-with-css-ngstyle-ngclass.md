---
layout: post
title: "Style Angular 9 Components with CSS and ngStyle/ngClass Directives"
image: "images/content/html.png"
excerpt: "In this tutorial, we'll learn about CSS and how to use it in Angular 9. We'll see by example how an Angular 9 application generated by Angular CLI is styled"
categories: angular
tags: [ angular, angular-9 ] 
---

In this tutorial, we'll learn about CSS and how to use it in Angular 9. We'll see by example how an Angular 9 application generated by Angular CLI can be styled with plain CSS.

We'll learn how CSS is used in Angular and create an Angular 9 app with the CLI to demonstrate various concepts such as global styles, component styles and the `:root` pseudo-class.

We'll learn about global styles in Angular and how the framework add additional features for CSS isolation and scoping such as View encapsulation using Emulated or ShadowDom modes.

We then see how to use the `ngClass` and `ngStyle` directives for dynamic styling in Angular components. 

## Styling Angular 9 Components with CSS

Angular 9/8 applications can be styled with the standard CSS that you already know. 

You can use: 

- external CSS stylesheets via the `<link>` tag, 
- internal CSS via the `<style>` tag.
- and inline styles via the `style` attribute. 

And you can apply standard selectors, rules, and media queries to your Angular 9 components.

## Initializing an Angular 9 Project

Let's get started by initializing a brand new Angular 9 project using the Angular CLI. Open a command-line interface and run the following command:

```bash
$ npx -p @angular/cli ng new angular-9-css-demo
```
The [npx](https://www.npmjs.com/package/npx)  is installed when you installed npm.

We have used Angular CLI 9 locally without installing it globally on our system thanks to npx.

## Setting the Stylesheet Format to CSS

You'll be prompted if you **Would you like to add Angular routing?** Type y for Yes and **Which stylesheet format would you like to use?** Choose **CSS**.

> **Note**: If you already have Angular CLI installed on your system, you don't need to use the npx command.

Angular CLI allows you to use various stylesheet formats such as CSS, [SCSS](https://sass-lang.com/documentation/syntax#scss ), [Sass](https://sass-lang.com/documentation/syntax#the-indented-syntax) , [Less](http://lesscss.org), and [Stylus](http://stylus-lang.com).

Sass, SCSS, Less, and Stylus are called CSS preprocessors. A [CSS preprocessor](https://developer.mozilla.org/en-US/docs/Glossary/CSS_preprocessor) is a program that lets you generate CSS from the preprocessor's unique syntax. There are many CSS preprocessors to choose from, however, most CSS preprocessors will add some features that don't exist in pure CSS, such as mixin, nesting selector, inheritance selector, and so on.

Browsers can only understand CSS so these other formats are precompiled by the CLI using an appropriate preprocessor at the build time.

## Running your Angular 9 App

Next, navigate to your project's folder and start the local development server using the following commands:

```bash
$ cd angular-9-css-demo
$ npx ng serve
```

You can go to the `http://localhost:4200/` address to see your app up and running:

![](https://paper-attachments.dropbox.com/s_F52E295BB9C92BEFE7506DFCE2086C2583C762072AFE2CA1A9CE9AD4DA9FF751_1567465432228_Angulardemo.png)

As you see, we already have a beautifully-CSS-styled interface with some placeholder content. Of course in a real-world situation, you would remove this content and add your own but in our tutorial, let's take this as our example and learn how CSS is attached and applied to the various Angular components.

Let's get started by investigating the `index.html` file, the entry point of our Angular 9 application. Open the `src/index.html` file, you'll find the following content:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular 9 CSS Example</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

This is a typical HTML file with standard HTML element tags except for `<app-root>` which refers to the `App` component of our Angular 9 application.

In the `<head>` section, we can use `<link>` tags to attach global CSS files to our app. We'll see an example in the next section.

Now, inside the `src/` folder of your project, you'll find a `styles.css` file. If you open it, you'll find out that it's empty with only the following CSS comment:

```css
/* You can add global styles to this file, and also import other style files */
```

This file can be used for adding global styles and import other style files. Add the following CSS code: 

```css
body{
    background-color: #b1cbe4;
}
```

Go back to your app in the web browser, you should see that our CSS background color is applied to the `<body>` element:

![](https://www.diigo.com/file/image/rscqpoqzoccrcrsrszdsesaoqc/Angular+8+CSS+Demo.jpg)

But since the global `src/styles.css` file is not linked from the `src/index.html` file via a `<link>` element tag, how the style is applied?

## Attaching CSS Files with Angular 9 CLI

Angular CLI makes use of an `angular.json` configuration file which contains a `styles` array that can be used for adding any global stylesheets. By default, the `styles.css` file is present in this array.

```css
  "projects": {
    "angulardemo": {
      /* [...] */    
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            /* [...] */
            "styles": [             
              "src/styles.css"
            ],
            "scripts": []
          },
```

Angular CLI injects any global styles via a `<style>` tag in the `<head>` section of the `index.html` file. You can confirm that by inspecting your web page in the web browser (`Ctrl + Shift + I` in Chrome). This is a screenshot of the Elements panel in our case:

![](https://www.diigo.com/file/image/rscqpoqzoccrcsarqzdsesaora/Angular+8+Global+CSS+File.jpg?k=485b25aa0970d3e491937f5a937a8650)

The CSS comment that starts with `sourceMappingURL` allows the browser to know where the source map is.

Source maps are used for debugging purposes as they provide mapping information between symbols in the original source files and the final built bundles. For example, thanks to source maps, the browser has the required information to let us know that our previous CSS rule applied to the `<body>` element from the global  `src/styles.css` file at line 3 even if the Angular CLI inlined the content of the file:

![](https://www.diigo.com/file/image/rscqpoqzoccrdcodbzdsesaqse/Angular+8+CSS+Demo.jpg?k=e435ccd55deeb12c4220d02959c0bee5)

You can instantly agree with how useful source files are in development.

Check out [Use a source map](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map).

We can also ourselves use the `<style>` element to include global styles in the `<head>` section of the `index.html` file.

These are the points that you need to remember about global styles:

- You can add global styles using the default `styles.css` file or your own stylesheets in the `styles` array in the `angular.json` file,
- You can cause  the `@import`  statement in the `styles.css` file to include global stylesheets to your Angular project,
- Global styles are not scoped by any custom HTML attributes,
- Component styles override global styles.
- 
 
## Applying CSS Styles to Angular 9 Components

We have seen that we can use global CSS files to apply styles to our application just like a typical HTML document but Angular provides more options for including styles with more features like CSS isolation.

Open the `src/app/app.component.html` file which contains the HTML template for the root and the only component in our application at this stage. This is a portion of the file content truncated:

```html
<style>
  :host {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 14px;
    color: #333;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .toolbar {
    height: 60px;
    margin: -8px;
    display: flex;
    align-items: center;
    background-color: #1976d2;
    color: white;
    font-weight: 600;
  }
  /* [...] */
</style>

<!-- Toolbar -->
<div class="toolbar" role="banner"></div>
 
  <!-- Resources -->

  <!-- Next Steps -->
  <!-- Terminal -->

  <!-- Links -->

  </div>

  <!-- Footer -->
  <footer>
  </footer>


</div>

<router-outlet></router-outlet>
```

Angular allows us to include inline CSS styles in components using the standard `<style>` tag just like typical HTML documents.

These styles are only applied to the template where they are included i.e in our case to the template of the `App` component. 

Another better way is to use an external CSS file or multiple files for styling the component. We can already find an empty `src/app/app.component.css` file in our project which has the same name as the template of the `App` component. This should give us a hint that any styles that are added in this file are applied to the `src/app/app.component.html` template and that's correct by they are not linked by convention because they have the same name but through an explicit meta property called `styleUrls` in the component. Open the `src/app/app.component.ts` file:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-css-demo';
}
```

The `styleUrls` property, that can be added via the component decorator, takes an array of files paths relative to the component file and allows you to attach one or multiple CSS files to a component. 

Let's take the inline styles of the app template and add them in the `src/app/app.component.css` file without the `<style>` tag.

If you save the changes and go back to your web app, you should see that our interface looks in the same way as before.

## The `:root` pseudo-class 

In our app component styles, we have a special CSS selector called `:root`:

```css
:host {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 14px;
    color: #333;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

If you need to style the component custom HTML element itself, and not an element inside its template, you can use the `:root` pseudo-class selector.

In this case, we need to style the  `app-root`  component itself and can't do that using the styles inside the related  `src/app.component.css` file because the CSS styles inside that file will be scoped to the HTML element tags of the `src/app.component.html` template.

The `:root` selector enables you to apply CSS styles to the `app-root` element only.

Now, let's see how Angular implements this. Go back to your web app and open the **Elements** panel in **DevTools** by inspecting the page or pressing **Ctrl+Shift+I** in Chrome, 

If you look in one of the `<style>` elements in the `<head>` section, you'll find our app component CSS styles inlined by Angular CLI:

![](https://www.diigo.com/file/image/rscqpoqzoccresrcozdsesccee/Angular+8+CSS.jpg?k=9ffde5fa4a10bd6a783a5adb7f1d5215)

They are the same styles in the `src/app/app.component.css` file except that they have now some weird names as part of their selectors. These names are unique and custom attributes added to the HTML elements of our component by Angular at runtime. If you look below inside the `<body>` element, you'll see:

![](https://www.diigo.com/file/image/rscqpoqzoccresrpbzdsesccoa/Angular+8+CSS.jpg?k=de5e6c87fdb3a898b36472faee6d1fee)

Angular 9 added a custom `_nghost-dsy-c0` attribute to the `<app-root>` element  and a `_ngcontent-dsy-c0` atribute to each HTML child of `<app-root>`.

The custom attributes are used to create CSS selectors with much higher specificity (and much harder to override) so the component styles will be isolated and only applied to the elements of the component.

> **Note**: If you reload your application, new unique custom attributes will be used in the HTML elements and CSS styles.

This is not a perfect CSS isolation technique. If someone wants to override those styles, they will be able to do it, since it's not enforced by the web browser but only emulated by Angular using CSS rules and custom HTML attributes to scope the styles to individual components.

> **Note**: You can structure your CSS code using methodologies such as  [SMACSS](https://smacss.com/).
> 
> You can also use a CSS pre-processor for adding programming-like features to your styles like CSS variables and inheritance, etc. 

Angular supports other mechanisms for CSS isolation which are supported by modern browsers such as Shadow DOM

> **Note**: Native Shadow DOM is currently implemented by Chrome and Opera so we can't rely on it at the moment.
>
>  Angular can bundle component styles with components, enabling you to write a more modular code than regular stylesheets.
    
## How Angular View Encapsulation Works?

By default, Angular uses an emulated View Encapsulation to encapsulate CSS styles within their components so they can be isolated and only applied to the HTML elements within these components. 

There are three modes of [Angular View encapsulation](https://angular.io/api/core/ViewEncapsulation):

- `ViewEncapsulation.Emulated`: Emulates  CSS scoping and isolation by adding an attribute containing surrogate id to the Host Element and pre-processing the style rules provided via the [styles](https://angular.io/api/core/Component#styles)  property of the component decorator or  [styleUrls](https://angular.io/api/core/Component#styleUrls), and adding the new Host Element attribute to all selectors. This is the default option.
- `ViewEncapsulation.Native`
- `None`: Don't provide any template or style encapsulation.
- `ViewEncapsulation.ShadowDom`: Use Shadow DOM to encapsulate styles. For the DOM this means using modern  [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/)  and creating a ShadowRoot for Component's Host Element.

You can change the default view encapsulation of a component via a decorator property called  `encapsulation`.

Open the `src/app/app.component.ts` file and change the View Encapsulation mode to `None`:

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'angular-css-demo';
}
```

We first import `ViewEncapsulation` from the `@angular/core` package. Next, we add the `encapsulation` property to the component decorator and set its value to `ViewEncapsulation.None`. This will change the encapsulation mode of the `App` component. 

If you head back to your running web application, you'll see that nothing has changed in the appearance of the UI but if you inspect the page, you'll see that no CSS scoping is applied with custom HTML attributes and CSS attribute selectors.      

This is a screenshot of the **Elements** panel:

![](https://www.diigo.com/file/image/rscqpoqzoccroscqpzdsesddas/Angular+8+CSS+Demo.jpg?k=4696d61eb03df6245110d0ebaea1d0c4)

This is a screenshot of the CSS styles:

![](https://www.diigo.com/file/image/rscqpoqzoccroscqqzdsesddba/Angular+8+CSS+Demo.jpg?k=9d040e9f5bcfddd319707cc9db47d4c4)

The styles are inlined but no isolation or scoping techniques are applied.

Next, let's change the view encapsulation to `ShadowDom`:

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  title = 'angular-css-demo';
}
```

If you inspect the DOM of your app, you should see that both the HTML template and CSS styles of the `App` component are encapsulated using ShadowDom:

![](https://www.diigo.com/file/image/rscqpoqzoccrpbabpzdsesdeas/Angular+8+CSS+ShadowDom.jpg?k=4cab3dffab2fee4956e38bc08a7377e4)

## Why Would You Need to Isolate CSS Per Angular Components

Angular provides emulated techniques for isolating and encapsulating CSS styles and also adopts the native modern techniques like Shadow DOM but why CSS isolation is such an important feature?

There are many reasons for that. For example, one important reason is maintainability which is a crucial phase in ay serious software or web development project.
    
Component-based architectures, adopted by Angular and most modern frameworks nowadays including React and Vue, are about creating apps with isolated and decoupled components. In web apps, CSS and styling are an essential part which means isolation and decoupling should also include CSS to prevent the styles from one feature, implemented as a module or component, to interfere with the styles of another feature.

Also, how about components from third-party libraries? If CSS styles are bleeding in or out this will lead to a broken component simply because of styles.

If you are a library developer, CSS styles isolation would allow you to ship highly decoupled and reusable components that have higher chances to be used inside other projects without any issues.

## Using the `ngClass` and `ngStyle` directives in Angular 9

Angular provides builtin directives for dynamically applying CSS styles to components such as the `ngClass`  and  `ngStyle`  directives. For example

```html
<p ngClass="selected"></p>  
<p [ngClass]="'selected'"></p>     
<p [ngClass]="['selected']"></p>   
<p [ngClass]="{'selected': true}"></p>

```

>**Note**: The  `ngClass` directive  can be used with the other class attributes.


The  `ngStyle` directive takes pairs of CSS properties and values. For example:

```css
<p [ngStyle]="{'color': 'white'}" style="margin: 5px;"><song-track [ngStyle]="{'font-size.px': '12'}">  
<p [ngStyle]="{'font-size': '12px'}"></p>
<p [ngStyle]="{'color': 'white', 'font-size': '12px'}">
```

## Conclusion

We have seen how CSS is used in Angular and created a simple Angular 9 app with the CLI to demonstrate various concepts such as global styles, component styles and the `:root` pseudo-class.

We have learned about global styles in Angular and how the framework add additional features for CSS isolation and scoping such as View encapsulation using Emulated or ShadowDom modes.

We finally seen how to use the `ngClass` and `ngStyle` directives for dynamic styling in Angular components. 
