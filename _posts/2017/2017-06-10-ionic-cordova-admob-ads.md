---
layout: bpost
title: "Admob Ads with Ionic 5/Angular, Cordova and Ionic Native 5 by Example"
image: "images/content/ionic-cordova-admob-ads.png"
excerpt: " Ionic 5, adding Admob Ads with Cordova and Ionic Native 5" 
tags: ionic 
date: 2020-05-03
---


In this tutorial we are going to see how to implement Google AdMob Ads In Ionic 5 to be able to monetize your apps using ads.

We are going to cover how to add three types of Ads:
<ul>
<li>
Banner Ads,
</li>
<li>
Interstitial Ads,
</li>
<li>
Reward Video Ads.
</li>
</ul>


## Create a New Ionic 5/Angular Project

Let's start our tutorial by creating a new Ionic 5/Angular project from scratch (Optional) based on the blank template using the Ionic CLI 5:

    ionic start AdmobAdsExample blank 

Next, navigate inside your Ionic 5 project folder: 

    cd AdmobAdsExample 

Next, install the Cordova Admob plugin and its Ionic Native 5 wrapper as follows:

    ionic cordova plugin add --save cordova-plugin-admob-free        

    npm install --save @ionic-native/admob-free

Next, open the <em>src/app/app.module.ts</em> file and import `AdMobFree` then add it to the list of providers: 

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
   
## Showing Banner Ads in your Ionic 5 App


Next, open the <em>src/app/app.component.ts</em> file and add the following code: 

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

We have injected `AdMobFree` and created the `showAdmobBannerAds()` method to show banner ads when Cordova is ready.

We have passed two configuration options:

- `isTesting` : true, which tells Admob plugin to use only test ads which is the recommended option when you are still developing your app to avoid accidental clcks that may cause problems with your Google Admob account.
- `autoShow` : true, which shows banner ads immediately after creating them without using the `show()` method.

After developing your Ionic 5 app you need to create real ads, go to [AdMob portal](https://www.google.com/admob/), click "Monetize a new app" button to create a new ad unit.

Next grab your ad pubisher id and add it to configuration options as follows:



        const bannerConfig: AdMobFreeBannerConfig = {
            id: 'ca-app-pub-xxx/xxx', 
            isTesting: false,
            autoShow: true
        };

If you set `autoShow` to `false` then you need to call the `show()` method after preparing the banner: 

        this.admobFree.banner.prepare()
        .then(() => {

            this.admobFree.banner.show()
        })
        .catch(e => console.log(e));    
        }  
 

You can also hide the banner using: 


        this.admobFree.banner.hide()


Or you can completely remove it using:


        this.admobFree.banner.remove()        


## Showing Interstitial Ads in your Ionic 5 App


You can also show Admob Interstitial ads using the following method:

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

You can use the same configuration options and methods to add Interstitial Ads.

## Showing Reward Video Ads in your Ionic 5 App


If you choose to display Reward Video Ads in your Ionic 5 mobile app, you can add and call the following method: 

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

## Conclusion 

We have covered how to monetize Ionic 5/Angular mobile apps with three types of Admob ads so you can earn some money  from your mobile apps if you decide not to sell them and make them available for free to all users.

