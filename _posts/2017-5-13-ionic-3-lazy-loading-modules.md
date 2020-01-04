---
layout: post
title: "Ionic 4/Angular - Lazy Loading Modules"
image: "images/content/ionic-lazy-loading.png"
excerpt: "Ionic 3 - Lazy loading modules" 
tags : [ionic]
---

{% include image.html 
    img="images/content/ionic-lazy-loading.png" 
    title="Ionic 3 - Lazy loading modules" 
%}

Lazy loading refers to the process of loading chunks of code (such as a component, directive or pipe) when it's requested not when the app is loading. The most obvious benefit of lazing loading is the increased performance especially when the app is starting.

To demonstrate how we can lazy load a component or page,let's create a new Ionic 4 project based on Angular and the blank template:

    ionic start lazy-loading-demo blank 

Navigate inside the project directory and open it with your prefered IDE/Code Editor. We are using Visual Studio Code:

    code .

Open the <em>src/app/app.module.ts</em> file:

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
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}
         
You can see, there are two components in the declarations and entryComponents arrays. This means that 
we are importing two components into our module.

Now let's lazy load the HomePage component so it can be loaded only when it's requested.

First of all, remove all references to HomePage from our app module including the import statement.

Next, we need to give HomePage its own NgModule, so create a new file <em>src/pages/home/home.module.ts</em>:

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


> Note: You can also just remove home page and re-generate it using the CLI: `ionic g page HomePage` 
>
>A new page with its own NgModule will be generated. 

Next add <em>@IonicPage()</em> decorator to HomePage:


    import { IonicPage } from 'ionic-angular';

    @IonicPage()
    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {

The last thing you need to do to lazy load HomePage page is going to <em>src/app/app.component.ts</em>.

Remove the import statement of HomePage, then remove the reference to HomePage and replace it with the string containing name of the page i.e 'HomePage': 

    export class MyApp {
    rootPage:any = 'HomePage';

## Conclusion


So we have seen the process of lazy loading a page in your Ionic 4/Angular app which is simply creating an NgModule for it and decorate 
it with an IonicPage decorator, then reference it by a string of its name.



 



