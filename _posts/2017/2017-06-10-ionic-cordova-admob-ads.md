---
layout: post
title: "Ionic 2 / Ionic 3 - Adding Admob Ads with Cordova and Ionic Native 3.x+"
image: "images/content/ionic-cordova-admob-ads.png"
excerpt: " Ionic 2 / Ionic 3 - Adding Admob Ads with Cordova and Ionic Native 3.x+" 
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-cordova-admob-ads.png" 
    title="Ionic 2/3 Admob Ads" 
%}

Introduction 
-------------------
--------------------

In this tutorial we are going to see how to implement Google AdMob Ads In Ionic to be able to monetize 
your apps using advertisement business model .

We are going to cover how to add three types of Ads :
<ul>
<li>
Banner Ads
</li>
<li>
Interstitial Ads
</li>
<li>
Reward Video Ads
</li>
</ul>


Getting started 
---------------------
---------------------

Lets start our tutorial by creating a new Ionic project from scratch (Optional) based on the blank template 
using the Ionic CLI v3 .

    ionic start AdmobAdsExample blank 

Next navigate inside your project root folder 

    cd AdmobAdsExample 

Then install the Cordova Admob plugin and its Ionic Native 3.x wrapper .

    ionic cordova plugin add --save cordova-plugin-admob-free        

    npm install --save @ionic-native/admob-free

Open <em>src/app/app.module.ts</em> then import AdMobFree and add it to the list of providers 

    import { AdMobFree } from '@ionic-native/admob-free';    

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
        AdMobFree,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}
   
Showing Banner Ads 
----------------------
----------------------

Next open <em>src/app/app.component.ts</em> and add 

    import { Component } from '@angular/core';
    import { Platform } from 'ionic-angular';
    import { StatusBar } from '@ionic-native/status-bar';
    import { SplashScreen } from '@ionic-native/splash-screen';
    import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

    import { HomePage } from '../pages/home/home';
    @Component({
    templateUrl: 'app.html'
    })
    export class MyApp {
    rootPage:any = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen , private admobFree : AdMobFree ) {
        platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        this.showAdmobBannerAds();
        });
    }
    showAdmobBannerAds(){
        const bannerConfig: AdMobFreeBannerConfig = {
            isTesting: true,
            autoShow: true
        };
        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner.prepare()
        .then(() => {
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
        })
        .catch(e => console.log(e));    
        }      
    
    }

We have injected AdMobFree then created showAdmobBannerAds() method to show banner ads when Cordova is ready .

We have passed two configuration options :

isTesting : true to tell Admob plugin to use only test ads which is the recommended option which you are 
still developing your app to avoid accidental clcks that may cause problems with your Google Admob account .

autoShow : true to show banner ads immediately after creating them without using show() method .

After developing your app you need to create real ads so 

Go to [AdMob portal](https://www.google.com/admob/), click "Monetize a new app" button to create new ad unit.

Next grab your ad pubisher id and add it to configuration options :



        const bannerConfig: AdMobFreeBannerConfig = {
            id: 'ca-app-pub-xxx/xxx', 
            isTesting: false,
            autoShow: true
        };

If you set autoShow to false then you need to call the show() method after preparing the banner : 

        this.admobFree.banner.prepare()
        .then(() => {

            this.admobFree.banner.show()
        })
        .catch(e => console.log(e));    
        }  
 

You can also hide the banner with 


        this.admobFree.banner.hide()


Or completely remove it 


        this.admobFree.banner.remove()        


Showing Interstitial Ads 
----------------------------
----------------------------

You can also show Admob Interstitial ads with :

    showInterstitialAds(){
        const bannerConfig: AdMobFreeBannerConfig = {
        id: 'ca-app-pub-xxx/xxx',
        isTesting: false,
        autoShow: false
        };
        this.admobFree.interstitial.config(bannerConfig);

        this.admobFree.interstitial.prepare()
        .then(() => {
            this.admobFree.interstitial.show()
        })
        .catch(e => console.log(e));    
        }  

You can use the same configuration options and methods to add Interstitial Ads .

Showing Reward Video Ads 
-------------------------------
-------------------------------

If you choose to display Reward Video Ads in your mobile app you can add and call this method 

    showRewardVideoAds(){
        const bannerConfig: AdMobFreeBannerConfig = {
        id: 'ca-app-pub-xxx/xxx',
        isTesting: false,
        autoShow: false
        };
        this.admobFree.rewardvideo.config(bannerConfig);

        this.admobFree.rewardvideo.prepare()
        .then(() => {
            this.admobFree.rewardvideo.show()
        })
        .catch(e => console.log(e));    
        }

Conclusion 
---------------
----------------

We have covered how to monetize Ionic mobile apps with three types of Admob ads so you can earn some money 
from your mobile apps if you decide not to sell them and make them available for free to all users .

