---
layout: post
title: "Learn Ionic 4/Angular - what is a component and page? and how to use them?"
image: "images/content/learn-ionic-components.png"
excerpt: "Learn Ionic 3 - what is a component and page ? and how to use them  ?" 
tags : [ionic]
---

{% include image.html 
    img="images/content/learn-ionic-components.png" 
    title="Learn Ionic 3 - what is a component ? and how to use it ?" 
%}

Components are the basic constructs of Angular.

A component is an independent construct which encapsulates the controller code, the view and styles,and has inputs and outputs.

An Ionic 4/Angular app is a bunch of components(an app component + page components) and providers organized together using Angular modules.   

An Ionic 4/Angular app contains a root or app component and optionally 1 or more page components.

Here is an example of a main Ionic app component which lives in the <em>src/app/app.component.ts</em> file:

    import { Component } from '@angular/core';

    @Component({
    templateUrl: 'app.html'
    })
    export class MyApp {
    rootPage:any = 'HomePage';

    constructor(/*...*/) {
        /* ... */
    }
    }

## How to create a page component in Ionic 4/Angular


You can create a page Ionic in two ways, without the CLI or using it the CLI page generator.

Let's start by creating a page without using the CLI generator.

After generating your project, look for the pages folder then create a folder with the name of your page.

Let's say I want to create Home page.

    cd myProject/src/pages
    mkdir home 

Then create three files: home.ts, home.html and home.scss 

- home.ts will contain the TypeScript code of our page. 
- home.html will contain HTML code of our page view.
- home.scss  will contain Sass styles of our page view .



    touch home.ts
    touch home.html 
    touch home.scss 

Open home.ts and add the following code to create a page: 

    import { Component } from '@angular/core';

    @Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    })
    export class HomePage {
        constructor() {

        }
    }
    
So as you can see a page in Ionic 4/Angular is just an Angular component which itself a TypeScript class decorated 
with <em>@Component</em> decorator imported from <em>@angular/core</em>.

The component/page gets the information about its view using the templateUrl which points to a path of an HTML page. In this case the `home.html` file which resides in the same folder.

You can instead provide an inline template using: 

    template : '<p>Hello HomePage</p>'

The selector is the custom HTML tag which can be used to use the component inside another HTML view:

    <page-home></page-home>

We can also use it to style the component, inside home.scss: 

    page-home {
        background : #000;
    }              

Next open home.html and add: 

    <ion-header>
    <ion-navbar>
        <ion-title>
        Ionic 3 Tutorial
        </ion-title>
    </ion-navbar>
    </ion-header>

    <ion-content padding>
        <p>Hello HomePage</p>
    </ion-content>

As you can see, we use different Ionic specific custom tags or UI components to build the UI of our HomePage.
The names of tags are self explanatory.


That is! You have created an Ionic 4 page using Angular components and decorators.

You can also use the Ionic CLI Page generator to create pages on the fly without repeating this boilerplate 
every time.

Use your terminal to type:

    ionic generate page HomePage 

A new page will be created.

## How to use pages in Ionic 4/Angular

You use pages to build apps in two ways:

<ul>
<li>
By declaring and importing pages when the app is starting.
</li>
<li>
By lazy loading pages.
</li>
</ul>

So let's continue with our HomePage. To be able to use it, you need to declare it in <em>src/app/app.module.ts</em>
<ul>
<li>
You start by importing it 
</li>
<li>
Then add it to declarations and entryComponents arrays of your app main NgModule 
</li>
</ul>

    import { HomePage } from '../pages/home/home';

    @NgModule({
    declarations: [
        MyApp,
        HomePage
        ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage  
        ],
    providers: [
        /* .... */
    ]
    })
    export class AppModule {}

You can then make this page 
<ul>
<li>
The root page of your app (from your main app component).
</li>
<li>
As part of a tab system.
</li>
<li>
The view of a modal dialog.
</li>
<li>
A normal page that you can navigate to it from other pages or menu.
</li>
</ul>

You can also use a page by lazy loading it, which is good for performance, because the page is only loaded 
when it's requested by the app.

To lazy load HomePage, you need to do these steps: 
<ul>
<li>
First create an NgModule for HomePage 
</li>
<li>
Decorate HomePage with IonicPage decorator 
</li>
<li>
Then reference HomePage by a string 'HomePage'
</li>
</ul>

So go inside <em>src/pages/home </em> and create <em>home.module.ts</em> then add this code: 

    import { NgModule } from '@angular/core';
    import { IonicPageModule } from 'ionic-angular';
    import { HomePage } from './home';

    @NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
    ],
    exports: [
        HomePage
    ]
    })
    export class HomePageModule {}


Next import  IonicPage <em>ionic-angular</em> and decorate HomePage with it:

    import { IonicPage } from 'ionic-angular';

    @IonicPage()
    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {
        /* ... */

Now you can use the HomePage using the string 'HomePage' without the need to import it.

## Conclusion

So that's it! We have seen how to create pages and how to use them inside an Ionic 4/Angular application.
