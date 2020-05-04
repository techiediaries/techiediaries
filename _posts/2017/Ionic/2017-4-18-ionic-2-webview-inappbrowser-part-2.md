---
layout: post
title: "Create a cross platform mobile app for your responsive website with Ionic 2/3 and InAppBrowser webview -PART 2"
image: "images/content/mobile-app-ionic-2-inappbrowser.png"
excerpt: "Create a cross platform (Android ,iOS and Windows ) mobile app for your responsive website with Ionic 2/3 and InAppBrowser part 2" 
tags : ionic
---

{% include image.html 
    img="images/content/mobile-app-ionic-2-inappbrowser.png" 
    title="Create a mobile app for your responsive website with Ionic 2/3 and InAppBrowser" 
%}

On the [previous part](/ionic-2-webview-inappbrowser) ,we have discussed why a mobile app is such good thing for you business and your online presence ,and we have seen how you can use 
Ionic 2 with Cordova InAppBrowser plugin to create a cross platform mobile version for your responsive website ,without reinventing the wheel by creating a new 
app from scratch ,with the ability to target more than one mobile platform ,particularly the most popular platforms on the world  : Android ,iOS and Windows (Phone)

In this part we are going to continue building our app or precisely optimizing our mobile app by making some minimal modifications .So lets get started .

On the previous part we have generated an Ionic 2 project based on the blank template which has created a Home page for us but we don't actually need 
that page so delete folder home with its contents <em>/src/pages/home</em> .

And make sure also to modify <em>src/app/app.module.ts</em> to remove all references to HomePage 

    import { HomePage } from '../pages/home/home';

And 

    @NgModule({
    declarations: [
        MyApp,
        HomePage // delete this 
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage //And this 
    ],
    providers: [
        StatusBar,
        SplashScreen,
        InAppBrowser,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}    


Open <em>src/app/app.component.ts</em> and delete references to HomePage 

    import { HomePage } from '../pages/home/home';

And 

      rootPage:any = HomePage;

Open  <em>src/app/app.html</em> and delete 

    <ion-nav [root]="rootPage"></ion-nav>

Now everything is clean .We need to add the code to open a webview and load our responsive website .I'll use ,as previously ,the official website of
Ionic <em>https://ionic.io</em> but you should use your own website instead .

Open <em>src/app/app.component.ts</em> and delete then copy this 

    import { Component } from '@angular/core';
    import { Platform } from 'ionic-angular';
    import { StatusBar } from '@ionic-native/status-bar';
    import { SplashScreen } from '@ionic-native/splash-screen';

    import { InAppBrowser } from '@ionic-native/in-app-browser'; // 1

    @Component({
    template: '<p>loading...</p>'
    })
    export class MyApp {

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ,private iab: InAppBrowser /* 2 */) {
        platform.ready().then(() => {

            statusBar.styleDefault();
            const browser = this.iab.create('https://ionic.io','_self',{location:'no',hidden : 'yes'});//3
            browser.on('loadstop').subscribe((e)=>{ // 4
                splashScreen.hide();
                browser.show();
            });

        
        
        });
    }
    }

1 - We start by importing InAppBrowser from <em>@ionic-native/in-app-browser</em> .

2 - We inject InAppBrowser via class constructor .

3 - We create a hidden in app browser without a location bar on the current app window which takes us to our responsive website 

The in app browser object gets created when the splash screen is running when the platform ready event is fired .



4 - We subscribe to <em>loadstop</em> event which is fired when the in app browser finishes loading the website .When the event is fired 
we hide the splash screen and we show the in app browser .

Sincerely after fully developing my app using the InAppBrowser webview .It turns out that,it is far from perfect ,this not exactly the behavior 
I was looking for ,mainly for these reasons :

It seems there is a bug with InAppBrowser when used with Ionic 2 ,that is because using the InAppBrowser with the <em>_self</em> option is supposed to 
open the website in the same web view used by Cordova ,with a condition to white list the target URL ,according to the plugin documentation but that is not the case ,
the InAppBrowser opens a new browser/webview .

This has two side effects ,first the downgrade of your app performance since Ionic 2 uses itself a webview and the in app browser gets opened in its own 
webview  ,so there will be two webviews or browsers opened .

If you can ignore this ,there is also another side effect related to user interface ,when you press the device back button and with no navigation history 
in the in app browser ,it gets closed taking us to app component view .The desired behavior I wanted is to close the app not just the In App Browser .

But you can find a workaround for this ,by adding some buttons to the app component view ,since we need some controls anyway , 
I have added two buttons : a close button which closes the app and also a relaunch button which reopens the in app browser and navigate to target 
website .

Here is the new code of the component 

    import { Component } from '@angular/core';
    import { Platform } from 'ionic-angular';
    import { StatusBar } from '@ionic-native/status-bar';
    import { SplashScreen } from '@ionic-native/splash-screen';

    import { InAppBrowser } from '@ionic-native/in-app-browser'; // 1

    @Component({
    template: '<button (click)="exitApp()">Close <button> <button (click)="reopen()">Relaunch website <button> '
    })
    export class MyApp {
        targetUrl : string = "https://ionic.io";
    
    openUrl(hidden){

        const browser = this.iab.create(this.targetUrl,'_self',{location:'no',hidden : hidden});
        return browser;
    }

    public reopen(){
        this.oppenUrl("no");
    }
    public exitApp(){
        this.platform.exitApp();
    }    
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ,private iab: InAppBrowser /* 2 */) {
        platform.ready().then(() => {

            statusBar.styleDefault();
            const browser = this.openUrl('yes');//3
            browser.on('loadstop').subscribe((e)=>{ // 4
                splashScreen.hide();
                browser.show();
            });

        
        
        });
    }
    }

After some investigation ,I did find another solution using the ThemeableBrowser Cordova plugin which is a fork of the InAppBrowser that allows
you to customize the in app browser with menus ,buttons and themes .


Conclusion
----------------
----------------    

So that is all for this second part of creating a mobile version of our responsive website .As I've mentioned on the previous part we are using 
a hybrid framework which can have performance issues especially on old devices despite the efforts done by the Ionic team to improve the 
performance of Ionic but it still generates a hybrid app which can not be as performing as a true native application .So if you are obsessed 
with performance or you are app targets users with old devices (for example in less developed countries ) you may want to switch to a native framework 
such as NativeScript .Just watch Techiediaries for a tutorial on how to achieve the same thing in this tutorial with  NativeScript .


