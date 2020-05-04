---
layout: bpost
title: "Ionic 5 and ThemeableBrowser Webview: Create a cross platform mobile app for your responsive website"
image: "images/content/mobile-app-ionic-2-inappbrowser.png"
excerpt: "Create a cross platform (Android ,iOS and Windows ) mobile app for your responsive website with Ionic 5 and ThemeableBrowser" 
date: 2020-05-03
tags : ionic
---

{% include image.html 
    img="images/content/mobile-app-ionic-2-themeablebrowser.png" 
    title="Create a mobile app for your responsive website with Ionic 2/3 and ThemeableBrowser" 
%}

On the [previous part](/ionic-2-webview-inappbrowser) ,we have seen how to build an app that displays your website to your app users 
using Ionic 5 and InAppBrowser plugin which can be a workaround solution for people who have already
a responsive website and don't want to invest time or money building an app from scratch for their business. 

We have seen also that is not the best solution in terms of performance and also because of some 
implementation issues with InAppBrowser.

After some investigation, we have found a relatively better solution using the ThemeableBrowser Cordova 
plugin which is no more than a fork of InAppBrowser with more features such as:

<ul>
<li>
The ThemeableBrowser enables you to add an an app browser with custom styles
</li>
<li>
Add menus and buttons with custom actions. 
</li>
</ul>

This is supposed to be a better solution than the InAppBrowser but again we are in a world of bugs so we 
hope that we don't find any bugs using the ThemeableBrowser to turn our responsive website to a mobile app.

Now let's get started!

## Generating a new Ionic 5/Angular project and installing ThemeableBrowser 

If you are coming from the previous post, you can use the previous generated project. If not just 
make sure you have all the requirements installed,Cordova and Ionic, then generate a new Ionic 5/Angular project 
using:

    ionic start myWebsiteApp blank --type=angular

For use we are going to continue with the previous project and we will just swap InAppBrowser with ThemeableBrowser.

Next we need to add a target platform. Since we are targeting Android we can use this command: 

    ionic platform add android 

> Note: Make sure you have Java and Android installed on your system.
>
>If you want to target iOS ,you need a MACOS.


Now we need to add The Ionic Native plugin and the Cordova plugin for ThemeableBrowser by simply opening a terminal, navigating inside our project folder and running the following commands:

    ionic plugin add cordova-plugin-themeablebrowser
    npm install --save @ionic-native/themeable-browser

To be able to inject ThemeableBrowser in our class constructor we need to provide it in 
the <em>src/app/app.module.ts</em> file 

So go ahead open the <em>src/app/app.module.ts</em> file and start by importing the ThemeableBrowser from 
<em>@ionic-native/themeable-browser</em> module.

Next, add it to the list of providers: 

    /* other imports */
    import { ThemeableBrowser } from '@ionic-native/themeable-browser';
    
    @NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ThemeableBrowser,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}

Next open your app component and add code to create an in app browser: 

    import { Component } from '@angular/core';
    import { Platform } from 'ionic-angular';
    import { StatusBar } from '@ionic-native/status-bar';
    import { SplashScreen } from '@ionic-native/splash-screen';

    import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

    @Component({
    template: '<p>loading...</p>'
    })
    export class MyApp {

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ,private themeableBrowser: ThemeableBrowser) {
        platform.ready().then(() => {
        
        statusBar.styleDefault();
        splashScreen.hide();

        const options: ThemeableBrowserOptions = {
            statusbar: {
                color: '#ffffffff'
            },
            toolbar: {
                height: 44,
                color: '#f0f0f0ff'
            },
            title: {
                color: '#003264ff',
                showPageTitle: true
            },
            backButton: {
                image: 'back',
                imagePressed: 'back_pressed',
                align: 'left',
                event: 'backPressed'
            },
            forwardButton: {
                image: 'forward',
                imagePressed: 'forward_pressed',
                align: 'left',
                event: 'forwardPressed'
            },
            closeButton: {
                image: 'close',
                imagePressed: 'close_pressed',
                align: 'left',
                event: 'closePressed'
            },
            customButtons: [
                {
                    image: 'share',
                    imagePressed: 'share_pressed',
                    align: 'right',
                    event: 'sharePressed'
                }
            ],
            menu: {
                image: 'menu',
                imagePressed: 'menu_pressed',
                title: 'Test',
                cancel: 'Cancel',
                align: 'right',
                items: [
                    {
                        event: 'helloPressed',
                        label: 'Hello World!'
                    },
                    {
                        event: 'testPressed',
                        label: 'Test!'
                    }
                ]
            },
            backButtonCanClose: true
        };

        const browser: ThemeableBrowserObject = this.themeableBrowser.create('https://ionic.io', '_self', options);
        
        
        
        });
    }
    }


`image` and `imagePressed` values refer to resources that you need to provide.

You can change the colors and images to get a custom theme for the in app browser.

You can also listen for events and provide custom app behavior.


## Conclusion

So that's it! We sincerly hope you are getting your desired requirement from these series of articles
which are designed to show you how to turn your responsive hosted website to a mobile application that can be compiled for major platforms such as Android, iOS and Windows Universal Platform.

If you are happy with the performance of your app then good for you. You can also take another 
approach which is building a true native app with a webview using NativeScript which is going to achieve
the same requirement in this tutorial but with boosted performance since you'll have only one webview 
instead of two webviews used in the Ionic 5/Cordova case.







