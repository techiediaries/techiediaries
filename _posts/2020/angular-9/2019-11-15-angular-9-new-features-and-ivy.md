---
layout: post
title: "Angular 9.1 New Features and Ivy: Angular 10 is Coming"
image: "images/content/angular.png"
excerpt: "Angular 9 new features: better performance and smaller bundle size thanks to Ivy!" 
date: 2020-03-26
categories: angular
tags : [angular , angular-8, angular-9] 
---

In this post, we'll see the new features of Angular 9.1 with the support of TypeScript 3.8, so what's new with the Angular 9.1 version? 

> Note:  The next major beta of Angular is released, check out ][Angular 10 new features](https://www.techiediaries.com/angular-10-new-features/)

## What's New with Angular 9.1?

Angular 9.1 is released! This is a minor version of both the framework and the CLI which brings many new features such as:


- Support for TypeScript 3.8: This new version of TS brings many new language features that you can use in your Angular project,
- Build Speed Improvements,
- New CLI Component Generator Option `displayBlock` which enables you to generate components using the CLI with the `display: block` style for displaying components instead of the default inline style used by default,
- End-to-End tests now support `grep` and `invertGrep` which enable you to more easily pich the test you want to run,
- Improved HTML & Expression Syntax Highlighting: Using  VSCode with the Language Service Extension, it will enable the IDE to syntax highlight expressions in the templates,
- Directionality Query API which allows you to query for the current local direction at runtime,
- TSLint 6.1 by default.

You can update to this latest version of Angular using the following command:

```bash
ng update @angular/cli @angular/core
```

This will make sure you can have all these new features and bug fixes in your project.

This is the last planned minor release for 9.x. The team will now start working on Angular 10.0, by making prereleases once per week, even though they will contain only minimal changes at first.

## What're the Angular 9 New Features?

Angular is one of the three most popular JavaScript frameworks for building client-side web and mobile applications. It's built and backed by Google and has been developed over the years into a fully-fledged platform with integrated libraries required for front-end web development.   
 
Since developers and companies all over the world are depending on Angular for building their frontend apps, the team behind the framework follows a strict plan for updates with a new major version released every six months. The current major version is **Angular 9**.

This means we can already use the new version! But before, let's see some of the new features of Angular 9.  

Compared to React or Vue, performance and file size are big downsides of Angular.

One major problem of the previous versions of Angular is the large size of the final bundle which impacts the download time and as a result the overall performance of the application.
 
Angular 9 brings a few new features most importantly, the Ivy compiler which provides a huge boost in performance.

In nutshell these are the new features of Angular 9:

- Smaller bundles and better performance,
- The Ivy compiler: The default use of the Ivy compiler is the most important feature of Angular 9, Ivy is what actually designed to solve the major problems of Angular i.e the performance and large file size. 
- Selector-less bindings support for Angular Ivy,
- Internationalization support for Anguar Ivy.
- Support for TypeScript Diagnostics Format
- Support for more scopes in `providedIn` 
- A New Type-Safe `TestBed.inject()` Method Instead of `TestBed.get()`


### Smaller Bundles and Better Performance Thanks to Ivy

Previous versions of Angular have relatively large file size of the final bundles compared to React or Vue.

The performance of the Angular runtime is quite good but the loading time is longer because of the large file size which affects the overall performance of the application.

So what the Angular team is doing to solve the large size of the final bundles?

Enter Ivy.

- Before Angular 8, the framework used ViewEngine as the renderer, 
- With Angular 8, Ivy is in experimental mode behind an optional flag,
- With Angular 9+, Ivy is the default compiler.

What is Ivy?

Ivy is a complete rewrite of the Angular renderer which is simply the part of Angular that transforms your Angular templates into JavaScript code. 

Angular components are a mix of TypeScript code, HTML and CSS. TypeScript is a superset of JavaScript, that needs to be compiled into JavaScript before it can be consumed by a web browser.

Angular previuosly made use of ViewEngine to transform TypeScript code to JavaScript.

The Angular ViewEngine transforms the templates and components to HTML and JavaScript so that the browser can render them.

These are some informations about Ivy:

- The Ivy compiler is abtsracted from developers, and will replace ViewEngine so what you know about Angular is still valid.
- Angular 8 allows developers to play with Ivy but with Angular 9, Ivy is the default renderer. 
- The Ivy compiler outputs much smaller JavaScript bundles, so Ivy solves Angular’s bundle problems.
- The Ivy compiler will not change how you work with Angular so what you previosly learned about Angular will still work in Angular 9+.

> **Note**: Ivy will be a major corner stone because it takes Angular applications to the next level in terms of performance and final bundle size.


### How to work with Ivy?

In Angular 9+, Ivy will be the default renderer, so Angular applications will be faster and smaller.

In Angular 8, you need to enable Ivy by adding the following lines to the `tsconfig.json` file:

```json
"angularCompilerOptions": {  
  "enableIvy": true  
}
```

You can then invoke the compiler by running the `ngc` command inside the `node_modules` folder:

```bash
$ node_modules/.bin/ngc
```

Starting with Angular 9, you don't need to do the previous steps because Ivy is the default compiler.


### Selector-less Directives in Ivy

Using selector-less directives as base classes is already supported in the old ViewEngine but missing in the Ivy preview in Angular 8.  This is now added in Angular 9.

Consider the following pattern showing a decorated child class that inherits a constructor from an undecorated base class:

Let's take, for example, this class:
 
```ts
export class BaseDirective {  
  constructor(@Inject(ViewContainerRef) protected viewContainerRef: ViewContainerRef) {}  
}
```

In ViewEngine the following code will work but not in Ivy before Angular 9:

```ts
@Directive({  
  selector: '[child]',  
})  
export class ChildDirective extends BaseDirective {  
  // constructor will be inherited from BaseDirective  
}

```

In Angular 8 Ivy, you need to decorate the base directive with the  `@directive` decorator to achieve the desired behavior.

Angular 9 will now support this feature for the sake of consistence across all of the Angular codebase.

### Support for TypeScript Diagnostics Format

Angular 9 will add support for using the same TypeScript Diagnostics format for the TypeScript Compiler diagnostics.

Also, more descriptive error messages will be generated thanks to better template diagnostics.

In previous versions of Angular, the compiler outputs both native TypeScript diagnostics and its API diagnostics. 

Angular 9 will also add support for the schema registry to prevent potential binding issues while checking DOM bindings. 

### Support for Internationalization in Angular Ivy

Angular Ivy has added improvements for internationalization in Ivy which were missing in the Angular 8 preview.

In Angular 9, the i18n code has been updated to provide a better platform for supporting compile-time inlining.

### Support for more scopes in `providedIn` 

[providedIn](https://angular.io/api/core/Injectable#injectable) is a decorator that marks a class as available to be provided and injected as a dependency.

It determines which injectors will provide the injectable, by either associating it with an `@NgModule` or other [InjectorType](https://angular.io/api/core/InjectorType), or by specifying that this injectable should be provided in the `root` injector, which will be the application-level injector in most apps.

Angular 9 adds support for the `platform` and `any` scopes.


### A New Type-Safe `TestBed.inject()` Method Instead of `TestBed.get()`

Angular 9 provides a new `TestBed.inject()` instead of the deprecated `TestBed.get()` method:

```ts  
TestBed.inject(ChangeDetectorRef) // returns ChangeDetectorRef
```

The `TestBed.get()` method is not type-safe so was replaced with the new `TestBed.inject()`

## What is New with Angular 8.3?


**Angular 8.3** has been released a few weeks ago! Also the Angular team has made more steps closer to the final release of Angular 9 with many bug fixes, a few breaking changes, and performance upgrades and improvements to Ivy, the new powerful renderer of Angular that will be the default renderer starting with Angular 9.

Let's see what's new and the Angular 8.3 features in more detail.


Angular is the most popular platform for developing client-side (front-end) mobile and desktop web apps or SPAs. With the new release of Angular 8.3, we have some really cool new features. 

In this post, we are going to summarize some of the most important new features officially announced by the Angular team.  

 
[Angular 8.3 is released](https://github.com/angular/angular-cli/releases/tag/v8.3.10) with a bunch of new features:

### A new deploy command added to Angular CLI

Angular CLI has many commands that make development quick such as ng new, serve, test, build and add. Now a new ng deploy has been introduced which allows developers to deploy their final app to the cloud with a few clicks from their command-line interface.

Before using the command, you need to add a builder that provides your project with the capability to deploy to a specific hosting provider. For example, for Firebase, you first need to run the `ng add @angular/fire` command which takes care of all the configurations you need for Firebase. After that, you can run the `ng deploy` command which creates an optimized production build and upload it to the web. 

We already covered that, in much details, in our step by step [tutorial](https://www.techiediaries.com/angular-by-example-httpclient-get)


### Increased speed in production builds

Angular 8.0 introuced differential loading which is a cool feature that allows Angular CLI to produce two production bundles, one for modern browsers targetting ES6+ and one for legacy browsers targetting ES5. As a result the ng build --prod takes twice the time needed for building a project. In Angular 8.3 optimized the command as follows:

- The ES6+ version is built first,
- Next, ES6+ bundles are transformed to ES5, instead of rebuilding the project from scratch.

At this time, if you get any issues, you can use the previous behavior with the `NG_BUILD_DIFFERENTIAL_FULL=true ng build --prod`.

### A new design of the home page of the Angular project
 
If you have created and served a project with the latest Angular 8.3 version, you'll notice a nice looking interface with helpful links and common commands to start your development journey:

![Angular 8 Project](https://paper-attachments.dropbox.com/s_F52E295BB9C92BEFE7506DFCE2086C2583C762072AFE2CA1A9CE9AD4DA9FF751_1567465432228_Angulardemo.png)

That's it, now the Angular team has started working on Angular 9.


### Updates for Angular 9, October 15, 2019

Day by day, we are getting closer to the final release of Angular 9!

The Angular team has released version [**9.0.0-next.11**](https://github.com/angular/angular/commit/4198ea7ca6a037eacb5d5d923c4815057fe5806e) which added a list of bug fixes, a few new features and breaking changes, and removed the deprecated renderers. Also some performance upgrades and improvements are made to Ivy.


## What's New with Angular 8 

Angular 8 brings many new features, particularly for the tool-chain. 


This version is a major release that involves the complete platform, including the Angular core framework, Angular Material, and the Command Line Interface or CLI.

We have a new set of powerful features that developers will appreciate which are added at many levels; the core framework, Angular Material library and the CLI. It has also enabled many major partner launches such as NativeScript (a framework for building native mobile apps with Angular), Angular Console (console for running Angular projects on your system),`@angular/fire` (for integrating Firebase with Angular) and StackBlitz (an online IDE for Angular).

As planned, Angular 8 was released and these are the new and most important features:

### Preview of Ivy

With the release of Angular 8, a preview version of Ivy is now available for testing. Ivy is a new rendering engine that will produce smaller bundle sizes. But it's not recommended to start using it in production not just yet.

If you would like to start playing with Ivy, you can instruct the Angular CLI to enable Ivy in your project using the `--enable-ivy` switch:

```bash
$ ng new angular-project --enable-ivy
```

### Web Workers

Thanks to Angular CLI 8, web workers are taken into consideration when building the production bundles which helps increase the performance. Angular CLI 8 provides now one bundle for every web worker.

### Lazy Loading

The Angular Router has always supported lazy loading but now wiht Angular 8 the support for dynamic EcmaScript imports is added. For example:

```ts
{
    path: 'lazy',
    loadChildren: () => import('./mylazy/mylazy.module').then(mod => mod.Module)
}
```  

### Improvement of ngUpgrade

Angular 8 has also added new features to ngUpgrade which makes easier for developers to upgrade their Angular.js apps to Angular 8. 

## Angular 7 Features

v7 introduces many new changes in the Component Dev Kit or CDK and the Material Design library such as the Drag and Drop support and Virtual Scrolling.

In this release, the team has also focused on the Ivy renderer and how to make it smaller and faster by adding support for animation and improving the `@NgModule` integration etc. But Ivy is not yet ready for prime time.  

![Angular 7 features](https://i.imgur.com/nfmFuc6.png)

These are the new features introduced by Angular 7 for developers.

### Support for Node 10

Node v10 is the latest version of the Node.js platform which is used by the Angular CLI and most front-end development tools nowadays. v7 has now support for v10 of Node but v8 is also still supported.

### Support for TypeScript 3.1

TypeScript 3.1 is the latest version of TypeScript, the official langauge for Angular. Angular 7 requires the latest version of TypeScript.

### The CLI Prompts 

Angular 7 introduces a new nice feature that allows the CLI to prompt users when executing commands like `ng new` or `ng add`. This enables users to make decisions for chosing the right built-in features to include or ignore at many points of the life-cycle of the project's creation and configuration.

As the Angular team is always focusing on making the CLI a powerful tool at the disposal of developers, the new CLI prompts feature is another step toward achieving that goal. More than often, when you use common commands like `ng new` or `ng add`, you don't have much control except what you pass as arguments in the first place. But what if you intend to add support for routing in your project but did not specify the `--routing` switch? You need to stop the command and start over. What, about when you want to avoid installing some unecessary dependencies? Aside from stopping the running command, you have no other options 

But thanks to Angular CLI 7, this has changed. Now the CLI supports user prompts. For example, if you run the `ng new angular-7-project`, you'll presented with a nice prompt asking if you xant to include routing in your project. If you also like to use a specific stylesheet format? The CLI will present you with a list of choices between CSS, SCSS and SASS. 

Not just that, you have complete control over the CLI prompts. You can simply add a `schematic.json` file to instruct the Angular 7 CLI to show or hide specific prompts.

CLI Prompts are also added to Angular Shematics which means developers of CLI tools can take advantage of it to prompt users for more information about customizations and act accordingly. This can be done using an `x-prompt` key to a Schematics collection. 

### Angular Performance: CLI Budgets by Default

The obvious fact is that Angular 7 is the best Angular yet! It's more performant and faster than any previou version including v6. 

Upgrade from v6 to v7 consumes less time (no more than ten minutes according to the official docs). Also the upgrade process is more easier thanks to the work done in v6. Also the core framework has better performace with the new features such as the virtual scrolling detailed on below section.

But that's not the end of the story. Angular 7 gives importance to the final app bundle not just the framework by correcting a common production bug where the `reflect-metadata` polyfill gets added in the production build as well but it's only required in development so v7 will remove automatically from your final app's bundle.

For generating smaller bundles, new Angular 7 projects are using the Bundle Budgets in the CLI by default which were optional in v6.

Developers will get warnings when the initial bundle sizes more than 2MB and an error when it has a size of 5MB. But you can easliy change the default budgets from the `angular.json` file.

```ts
"budgets": [{
  "type": "initial",
  "maximumWarning": "2mb",
  "maximumError": "5mb"
}]
```

### Virtual Scrolling: ScrollingModule 

Virual scrolling is a technique used by popular UI libraries like Ionic for enabling developers to build efficient UIs. Loading hundreds of items could be very slow in most browsers, virtual scrolling takes performance in consideration and it's particularly useful for mobile apps when you need to scroll large lists without affecting the app's performance and by result the user's experience. 

Now the Angular 7 CDK includes support for virtual scrolling via the ScrollingModule module. You can use the  `<cdk-virtual-scroll-viewport>` to display large lists of data by only rendering the elements that actually fit on the visible part of the screen.

You can read more information from [Angular Material docs](https://material.angular.io/cdk/scrolling/overview).

### Support for Drag and Drop: DragDropModule

With Angular 7, drag and drop support is added on the CDK. Items are rendered as long as the user is moving elements. Developers can use methods like `moveItemInArray` for reordering lists or `transferArrayItem` for moving items between lists.

You can read more about [drag and drop](https://material.angular.io/cdk/drag-drop/overview).

### Support for `<Slot>` HTML Element with Angular Elements  

`<slot>` is a new standard HTML tag that was introduced by the [Web Component specification](https://developer.mozilla.org/en-US/docs/Web/Web_Components). 

You can now write compnenets like the following example:

```ts
@Component({
  selector: 'a-component',
  template: `
    <header>
      <slot name="header"></slot>
    </header>
    <slot></slot>`,
  encapsulation: ViewEncapsulation.ShadowDom,
  styles: []
})
export class MyComponent {
}
```

You can then use this Angular component as a web component:

```html
<a-component>
  <span slot="header">This is a header</span>
  <p>Hello Angular!</p>
</a-componeny>
```

## New Features of Angular 6.1

**Angular 6.1** is released in *2018-07-25* with multiple bug fixes and new features.

Angular CLI is also updated to Angular **v6.1.1**. 

Angular *6.1* is the last planned minor version of Angular 6. That means, the Angular team will start working toward releasing **Angular 7**, the next major version.  

Angular 6 major release has a strong focus on the developer toolchain i.e Angular CLI which introduces powerful features such as project workspaces and Schematics etc. Now Angular 7 is on the road after this latest minor version which will be focused on new features such as the Ivy Renderer.

![Angular 6.1 new features](https://cdn-images-1.medium.com/max/1000/1*c_andEAJ9MZKS9RWcTTl5g.png)

Let's see the new features and how can make Angular developer lives easier.

This new minor release has over 70 bugfixes and 20 new features!

## What's New with Angular 6.1?

Angular 6.1 brings many new features to Angular such as:

- You can, now configure Angular Router to remember and restore the position of scroll by setting `scrollPositionRestoration` to `enabled`.
- You can use **ShadowDOM v1** API for View Encapsulation to specify how CSS is encapsulated in a component (`encapsulation: ViewEncapsulation.ShadowDom`).
- You can use async/await with Jasmine etc.
- You can use a new pipe that allows you to iterate over a map or object and display key/value pairs in the template. 
- Support for TypeScript 2.9: With Angular 6.1, you'll be able to use TypeScript 2.8 and TypeScript 2.9
- Angular CLI v6.1.1: Angular CLI **v6.1.1** is also released with many new features that you can see below. 

## Angular CLI v6.1.1 New Features

- Support for TS 2.8 and 2.9,
- Support for Angular 6.1,
- The use of ES2015 Modules for all files,
- The new `--vendor-source-map` switch that allows you to have source maps for vendor packages. This is useful for debugging your production packages.

## Conclusion

This post is updated with the new Angular 8 features as v8 was just released. 

Now the Angular team is working toward releasing Angular 9!

 







