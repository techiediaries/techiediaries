---
layout: post
title: "Ionic 2 enableProdMode() "
image: "images/content/ionic2-enableprodmode.png"
excerpt: "In this article we are going to see what does enableProdMode do and an example code on how to use it to enable production mode in Angular 2" 
tags : [ionic2 , ionic ]
---

{% include image.html 
    img="images/content/ionic2-enableprodmode.png" 
    title="Ionic 2 enableprodmode " 
%}

Ionic 2 uses Angular 2 ,the next version of the popular Google client side framework .Angular 2 is more
powerful than Angular.js and provides more performance and speed on mobile and desktop .

In development phase ,Angular 2 works on development mode which has assertions and various necessary 
framework checks turned on .

After serving your Ionic 2 app using the browser ,if you look on the console you are going to find 
an Angular 2 message telling you that Angular 2 is running on development mode and that you need to enable
the production mode using  enableProdMode() function .There is a good reason for this so if you just 
enable Angular 2 production mode you are going to : 
<ul>
<li>
Have a good boost on performance and speed of your Ionic 2 app :the device ready event will fire much sooner 
</li>
<li>
Reduce the app size by half .
</li>
</ul>

How to enable Angular 2 production mode ?
-------------------------------------------
-------------------------------------------

To enable Angular 2 production mode in Ionic 2 we use the enableProdMode() function .Here is a detailed example on how to 
do it .

First of all, open src/app/main.ts 

Then import enableProdMode from Angular 2 core 

    import {enableProdMode} from '@angular/core';
 
    import { AppModule } from './app.module';
 
 Then call the enableProdMode() function before bootstraping your module

    enableProdMode();
 
    platformBrowserDynamic().bootstrapModule(AppModule);


Conclusion
-------------
-------------

So that is all for this short tip tutorial where I just showed you how to enable Angular 2 production mode
on Ionic 2 when you are ready to build and publish your mobile app to increase performance and speed ,and
reduce app size .
 