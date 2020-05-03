---
layout: bpost
title: "Ionic 5 and Electron Split Pane Example for Large Screens and Desktop "
image: "images/content/ionic2-split-pane-desktop.png"
excerpt: "In this tutorial we are going to learn how to use the Split Pane component with Ionic 5" 
date: 2020-05-03
tags : [ ionic2 , ionic , electron ] 
---

{% include image.html 
    img="images/content/ionic2-split-pane-desktop.png" 
    title="Ionic 2 Split Pane " 
%}

The Ionoc Split Pane allows Ionic 5 developers to build user interfaces with two split views for devices with large screens such as tablets or Desktop.

The Ionic team is working to make Ionic a framework for building user interfaces for Desktop environments and not just tablets and mobile phones by adding the Split Pane which is a very requested UI component on Desktop apps.

## Ionic 5 for Desktop Apps?

If you are already familiar with Ionic 5 but you have never used it for building user interfaces for Desktop apps you may be wondering, Isn't Ionic 5 a hybrid mobile framework,so how can we use it for Desktop apps?

Yes, Ionic 5 is a hybrid mobile framework based on Angular. It is actually a bunch of UI components built using HTML ,CSS and JavaScript on top of Apache Cordova which is really the actual container that does the heavy job of interfacing with mobile device native features and allow you to actually build a mobile app with web technologies.

So now how can you build Desktop apps with Ionic 5?

Just like Cordova, there is another great container but this time for Desktop environments (Windows ,Linux and MAC) which allows you to wrap JavaScript apps into a native like Desktop application .The project is Electron ,built by 
GitHub .

There are many other projects similar to Electron, the most popular is NW.js by Intel which follows another approach but allows you also to build cross platform Desktop apps with web technologies .

You can use either Electron or nw.js to wrap your Ionic 5 app into a Desktop application. For the sake of this tutorial, I'm going to use Electron to show how to build a Desktop app with Ionic 5 and the Split Pane component 

## Getting Electron 


We need to create an Electron app so we are going to use Github quick start project to quickly scaffold a new app.

Open your terminal/command prompt and execute: 

     git clone https://github.com/electron/electron-quick-start electron-ionic-starter
     cd electron-ionic-starter 
     npm install 
     npm start

You will be presented with a blank Electron project based on Electron , next we need to integrate with Ionic 5. You don't 
need to do any complex configuration. You just need to install Ionic. Scaffold your Ionic 5 app, build it and then point Electron to the location of Ionic 5 web files.       


## Installing Ionic 5


Now we proceed to install Ionic 5. You don't need to install Cordova or any SDKs (For Android or iOS), because what we need is the UI components of Ionic 5 which are just Angular + CSS + HTML, since we are using Ionic 5 as a UI interface library for our Electron Desktop app.  

So go ahead and install Ionic CLI using your terminal or command prompt: 

    npm install -g ionic 

## Creating an Ionic 5/Angular Project

Next, let's use the Ionic CLI 5 to scaffold a new blank Ionic 5 app inside our Electron app folder:

    ionic start blank  app -    

We named our Ionic 5 project  'app'. Deel free to change to a more elegant name.  

## Integrating Ionic 5 with Electron

Now let's hook the two apps.

Open your Electron project `main.js` file then look for the create window function: 

    mainWindow = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/www/index.html'),
        protocol: 'file:',
        slashes: true
    })) 

After building (ionic serve) your Ionic 5 project. The App files will live under the `www` folder.

So now before we continue we need to execute: 

    ionic serve 

Inside our Ionic 5 project 

Next, run our Electron app using: 

    npm start 

You should see your Ionic 5 app with default template running inside Electron.

## Adding the Ionic 5 Splite Pane 


Open `src/pages/home/home.html` file, delete everything and copy this code which adds a split pane with a menu at left:

    <ion-split-pane>
    <!--  our side menu  -->
    <ion-menu [content]="content">
        <ion-header>
        <ion-toolbar>
            <ion-title>Menu</ion-title>
        </ion-toolbar>
        </ion-header>
        <ion-content>
        <ion-list>
            <ion-item (click)="openMain()" >Main</ion-item>
            <ion-item  (click)="openAbout()">About</ion-item>            
        </ion-list>
        </ion-content>    
    </ion-menu>

    <!-- the main content -->
    <ion-nav [root]="rootPage" main #content></ion-nav>
    </ion-split-pane>

So we have added an `ion-split-pane` with an `ion-menu` which creates a menu at left and `ion-nav` at right. Next, we will add code to change the content of `ion-nav` when we click buttons on the menu.

You should pay attention to some details on the `ion-nav` and `ion-menu` components which are: 

<ul>
<li>
root, which is binded to rootPage variable that defines the page that will be presented 
</li>
<li>
main, you should add this attribute to tell ion-split-pane where the main content lives 
</li>
<li>
#content, which specifies the target of menu actions 
</li>
</ul>


In the `src/pages/home.ts` file, we should initialize the `rootPage` variable with an initial value (a page). So first we need to generate new pages using: 

    ionic g page main 
    ionic g page about 
    

 Then open the `src/app/app.module.ts` file and make sure to import and add any page you have created to module `declarations` and `entryComponents` lists:


    import { NgModule, ErrorHandler } from '@angular/core';
    import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
    import { MyApp } from './app.component';
    import { HomePage } from '../pages/home/home';
    import { MainPage } from '../pages/main/main';
    import { AboutPage } from '../pages/about/about';

    @NgModule({
    declarations: [
        MyApp,
        HomePage,
        MainPage,
        AboutPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        MainPage,
        AboutPage   
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
    })
    export class AppModule {}
   

Next open the `src/pages/home/home.ts` file and copy the following code: 

    import { Component } from '@angular/core';

    import { NavController } from 'ionic-angular';

    import { MainPage } from  '../main/main';
    import { AboutPage } from  '../about/about';



    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {
        rootPage :any = MainPage ;
        constructor(public navCtrl: NavController) {
            
        }
        openMain(){
            this.rootPage = MainPage ;
        }
        openAbout(){
            this.rootPage = AboutPage ;
        }            

    }

You can now build your app using:

    ionic serve 

And then run electron using: 

    npm start 



{% include image.html 
    img="images/content/ionic2-electron.jpg" 
    title="Ionic 2 with Electron" 
%}


You can see the code accompanying this tutorial on [GitHub](https://github.com/techiediaries/ionic2-electron)



## Conclusion 

In this tutorial, we have seen how to use the new Split Pane component of Ionic 5 to build the user interface  for a desktop app based on Electron. See your on the next tutorial with a close tutorial about Ionic 5 grids.
        

