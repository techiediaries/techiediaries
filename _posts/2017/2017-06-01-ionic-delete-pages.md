---
layout: post
title: "Ionic 2/Ionic 3 - How to delete pages and remove app module references "
image: "images/content/ionic-delete-page.png"
excerpt: " How to delete pages and remove app module references in Ionic 2 / Ionic 3 projects " 
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-delete-page.png" 
    title="Ionic 2/3 delete pages" 
%}

In the previous tutorial ,we covered how to create and add pages in Ionic 2 / Ionic 3 .In this tutorial we 
are going to see how to delete pages .

This tutorial works for both Ionic 2 and Ionic 3 .

Deleting pages which support lazy loading (Ionic 3 only)
------------------------------------------------------------
------------------------------------------------------------

In Ionic 3 you can lazy load a page by providing it with its own page module which has its own declartaions 
array .for exampe here is a module for a <em>family-list</em> page:

    import { NgModule } from '@angular/core';
    import { IonicPageModule } from 'ionic-angular';
    import { FamilyListPage } from './family-list';

    @NgModule({
    declarations: [
        FamilyListPage,
    ],
    imports: [
        IonicPageModule.forChild(FamilyListPage),
    ],
    exports: [
        FamilyListPage
    ]
    })
    export class FamilyListPageModule {}

So to delete this page you can just delete the folder which contains the page files including the module then 
of course you need to get rid of any references to this page from other pages .

Using your terminal ,navigate inside src/pages directory and run 

    cd src/pages 
    rm -r family-list 

Deleting pages without lazy loading 
------------------------------------------
------------------------------------------

If the page doesn't include lazy loading (Ionic 2) you need to follow these steps to delete pages .

First navigate inside src/pages then delete all page files (HTML ,CSS and TypeScript source files) .

Next head over to app module at <em>src/app/app.module.ts</em> then remove the page import statement then 
remove page from module declarations array and entryComponents array .

For example to remove a HomePage 

    /* .. */
    import { MyApp } from './app.component';
    import { HomePage } from '../pages/home/home'; // 1 ) remove this 
    /* .. */


    @NgModule({
    declarations: [
        MyApp,
        HomePage // 2 ) remove this 
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage // 3 ) remove this 
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},

    ]
    })
    export class AppModule {}
    
The module should look like 


    /* .. */
    import { MyApp } from './app.component';
    /* .. */


    @NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},

    ]
    })
    export class AppModule {}
    

Conclusion
---------------
---------------

We looked at how to delete pages and remove all references to them in main module in both cases of Ionic 2 
and Ionic 3 .
