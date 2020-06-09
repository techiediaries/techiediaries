---
layout: post
title: "Angular 7|8 Modules"
image: "images/content/html.png"
excerpt: "Learn about Angular modules"
tags: [ angular ] 
---

Let's now learn abour Angular modules.
 
Angular projects adhere to a **modular** and **component-based** architecture. 

According to [Wikipedia](https://en.wikipedia.org/wiki/Modular_programming):


> **Modular programming** is a software design technique that emphasizes separating the functionality of a program into independent, interchangeable **modules**, such that each contains everything necessary to execute only one aspect of the desired functionality.

Angular makes it easy to create **modules** by providing ****[**NgModules**](https://angular.io/guide/ngmodules)**:**

A **NgModule** is a TypeScript class decorated with the **@NgModule** decorator which takes a few metadata that does the following:


- Declares which components, directives, and pipes belong to the module.
- Makes some of those components, directives, and pipes public so that other module's component templates can use them.
- Imports other modules with the components, directives, and pipes that components in the current module need.
- Provides services that the other application components can use.

> Please note that Angular modules are not [JavaScript modules](https://www.techiediaries.com/es-modules-import-export-default/).

Every Angular app has at least one module, conventionally called the **root** module. This is the module that gets [bootstrapped](https://angular.io/guide/bootstrapping) for running the application.

Head over to your Angular project in the Stackblitz IDE. Open the `src/app/app.module.ts` file, you should see the following code:


    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { FormsModule } from '@angular/forms';
    
    import { AppComponent } from './app.component';
    import { HelloComponent } from './hello.component';
    
    @NgModule({
    imports: [ BrowserModule, FormsModule ],
    declarations: [ AppComponent, HelloComponent ],
    bootstrap: [ AppComponent ]
    })
    export class AppModule { }

At the top, we have some import statements. `NgModule` belongs to the `@angular/core` package.

After the imports, we configure the module by decorating the `AppModule` class with `@``[NgModule](https://angular.io/api/core/NgModule)` and stating what components and directives belong to it (In the `declarations` array) as well as which other modules it uses (In the `imports` array). For more information on the structure of an `@``[NgModule](https://angular.io/api/core/NgModule)`, you can read [Bootstrapping](https://angular.io/guide/bootstrapping) from the official Angular guide.


There is more that you should know about modules but let's leave that to after you build your first app.
