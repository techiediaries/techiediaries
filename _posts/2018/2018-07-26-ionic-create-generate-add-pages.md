---
layout: post
title: "Ionic 4/Angular - Create, Generate and Add Pages"
image: "images/content/ionic-create-generate-add-pages.png"
excerpt: " How to create, generate and add pages in Ionic 4 projects" 
tags: ionic 
---

In the previous tutorial we've seen how to create an **Ionic 4** project. Now we'll continue with 
the previous project by adding pages which are the basic buildings of an Ionic app. So let's get started.

You can create pages either manually or generating them using the Ionic CLI v4 which is the recommended method.

In this guide we'll look first at how to create a page manually or generate it with the Ionic CLI, then how to add it to the project.

Go ahead and open your terminal or command prompt and follow the instructions:

## Generating Pages Using Ionic CLI 4

You can generate a new page by running the following command:

```bash
$ ionic g page <pageName> 
```

For example to generate a *contact* page, run:

```bash
$ ionic g page contact 
```

This command will create a folder with name *my-page* and three files: 

```bash
    .
    ├── contact.html 
    ├── contact.scss
    └── contact.ts
```

- `contact.html`: contains UI components for the page.
- `contact.scss`: contains sass styles to style your page.
- `contact.ts`: contains TypeScript code.

In case of Ionic 3, pages are generated with lazy loading by default which means a page has its own module. 

```bash
    .
    ├── contact.html
    ├── contact.module.ts
    ├── contact.scss
    └── contact.ts
```

## Creating Pages Manually 

Head over to your project `src/pages` folder then create a folder with your page name. Then create three files: `contact.html`, `contact.scss` and `contact.ts`. 

Open `contact.ts` and add the following code 

```ts
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
selector: 'contact',
templateUrl: 'contact.html',
})
export class ContactPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {}

}
```

We first import Component decorator from the `@angular/core` package then import `NavController`, `NavParams` from the `ionic-angular` package which are used for adding navigation between pages inside an Ionic app.

Then we create a TypeScript class with a constructor then decorated this page with `@Component` decorator. 

In the decorator parameter `templateUrl` we specify the name of the HTML file associated with the page.

On the class constructor we inject both `NavController` and `NavParams` which provides us with two instances `this.navCtrl` and `this.navParams` that can be used for implementing navigation between pages.


The `@Component` decorator is an Angular class that converts a normal class to a component.

An Ionic page is just an Angular component.

We can actually create the page without injecting `NavController` and `NavParams` but since these two classes are used frequently then you may need to inject them.

## Adding a Page to A Module (Ionic 3+ Only)

If you want to lazy load the page you need also to add a page module file. So go ahead create the `contact.module.ts` file then copy and paste this code: 

```ts
    import { NgModule } from '@angular/core';
    import { IonicPageModule } from 'ionic-angular';
    import { ContactPage } from './contact';

    @NgModule({
    declarations: [
        ContactPage,
    ],
    imports: [
        IonicPageModule.forChild(ContactPage),
    ],
    exports: [
        ContactPage
    ]
    })
    export class ContactPageModule {}
```

## Adding Pages to The Project Main Module  

If the page supports lazy loading then it already has its own module so there is no need to add it to 
the project main module .If it's not then head over to the `src/app/app.module.ts` file then import and add the page to the lists: `entryComponents` and `declarations`:  

```ts
    /* ... */
    import { ContactPage } from '../pages/contact/contact';

    @NgModule({
    declarations: [
        MyApp,
        ContactPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ContactPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}
```

## Conclusion 

So we have seen different methods to create pages in Ionic 4/Angular. We also covered how to add a page 
to main module app or page module if lazy loading is supported (Ionic 4/Angular).


