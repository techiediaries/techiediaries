---
layout: bpost
title: "Ionic 5/Angular enableProdMode() "
image: "images/content/ionic2-enableprodmode.png"
excerpt: "In this article we are going to see what does enableProdMode do and an example code on how to use it to enable production mode in Ionic 5/Angular"
date: 2020-05-03
tags : [ionic2 , ionic ]
---


Ionic 5 supports the latest version of Angular, the popular Google client side framework.

In development phase, Angular works on development mode which has assertions and various necessary framework checks turned on.

After serving your Ionic 5 app using the browser, if you look on the console you are going to find an Angular message telling you that Angular is running on development mode and that you need to enable the production mode using  the `enableProdMode()` function. There is a good reason for this so if you just enable Angular production mode you are going to: 
<ul>
<li>
Have a good boost on performance and speed of your Ionic 5 app: The device ready event will fire much sooner. 
</li>
<li>
Reduce the app size by half.
</li>
</ul>

## How to Enable Angular Production Mode in your Ionic 5 App?

To enable Angular production mode in Ionic 5, we use the `enableProdMode()` function. Here is a detailed example on how to do it.

First of all, open the `src/app/main.ts` file. 

Next, import `enableProdMode` from Angular  core: 

    import {enableProdMode} from '@angular/core';
 
    import { AppModule } from './app.module';
 
Next, call the `enableProdMode()` function before bootstraping your module:

    enableProdMode();
 
    platformBrowserDynamic().bootstrapModule(AppModule);


## Conclusion

So that is all for this short tip tutorial where I just showed you how to enable Angular  production mode in Ionic 5 when you are ready to build and publish your mobile app to increase performance and speed, and reduce app size.
 