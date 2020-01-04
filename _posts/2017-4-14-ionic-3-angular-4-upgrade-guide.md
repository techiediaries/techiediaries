---
layout: post
title: "How to upgrade to Ionic 3/Angular 4 "
image: "images/content/ionic-3-angular-4-upgrade-guide.png"
excerpt: "How to upgrade to Ionic 3/Angular 4 complete guide" 
tags : [ionic]
---


{% include image.html 
    img="images/content/ionic-3-angular-4-upgrade-guide.png" 
    title="Ionic 3 ,Angular 4" 
%}


If you have not already heard .Ionic 3 is already released which comes with Angular 4 support and many features .So in this 
post I'll show you quickly how you can easily upgrade to Ionic 3 and Angular 4 .

Don't worry ,Ionic 3 is not a completely new rewritten framework as it was the case with Ionic 2 .The reason behind this version of Ionic 3
is the compatibility with Angular 4 which introduces new features ,newest version of TypeScript but most importantly ,Angular 4
produces faster and smaller apps .You can read more about this on <a href="http://angularjs.blogspot.com/2017/03/angular-400-now-available.html" target="_blank">Angular 4 official blog</a>

Ionic 3 has also introduced some changes in project structure but they are optional . 

Ionic 3 has a lot of great features :

<ul>
<li>
The lazy loading of modules .
</li>
<li>
The support of async/await  .
</li>
<li>
IonicPage decorator for setting up deep links ,etc.
</li>
</ul>


How to upgrade to Ionic 3 ?
-----------------------------
-----------------------------
Upgrading your project to Ionic 3 is actually very easy .All you need to do is updating your package.json and execute npm install

So go ahead and open package.json of your project and copy this 

    "dependencies": {
        "@angular/common": "4.0.0",
        "@angular/compiler": "4.0.0",
        "@angular/compiler-cli": "4.0.0",
        "@angular/core": "4.0.0",
        "@angular/forms": "4.0.0",
        "@angular/http": "4.0.0",
        "@angular/platform-browser": "4.0.0",
        "@angular/platform-browser-dynamic": "4.0.0",
        "@ionic-native/core": "3.4.2",
        "@ionic-native/splash-screen": "3.4.2",
        "@ionic-native/status-bar": "3.4.2",
        "@ionic/storage": "2.0.1",
        "ionic-angular": "3.0.1",
        "ionicons": "3.0.0",
        "rxjs": "5.1.1",
        "sw-toolbox": "3.4.0",
        "zone.js": "^0.8.4"
    },
    "devDependencies": {
    "@ionic/app-scripts": "1.3.0",
    "typescript": "~2.2.1"
    }

Remove the old node_modules then execute 

    npm install 

Wait until the new dependencies are installed and then continue with these changes which are mainly related to Angular 4.

Open <em>app/app.module.ts</em> then import the <em>BrowserModule</em> from <em>@angular/platform-browser</em>

    import { BrowserModule } from '@angular/platform-browser';

Next you need to add it to the imports array 

    imports: [
        BrowserModule,
        /* ...*/
    ],    


In case your are using the HTTP module in your application ,you need to import the <em>HttpModule</em> in  <em>app/app.module.ts</em>:
and add it to imports array 

    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
    ],

Don't forget to also install Ionic native via npm with

    npm install --save @ionic-native/core

Now you need to check you have Ionic 3 successfully installed so go ahead inside your project folder and run 

    ionic info 

    Your system information:

    Cordova CLI: 6.5.0 
    Ionic Framework Version: 3.0.1
    Ionic CLI Version: 2.2.2
    Ionic App Lib Version: 2.2.1
    Ionic App Scripts Version: 1.3.0
    ios-deploy version: Not installed
    ios-sim version: Not installed
    OS: Linux 4.2
    Node Version: v7.9.0
    Xcode version: Not installed


    

<iframe width="640" height="360" src="https://www.youtube.com/embed/oQJMUOznMrA" frameborder="0" allowfullscreen></iframe>



Upgrading to Ionic 3.0.1 
--------------------------------
-------------------------------

Ionic 3.0.1 is released and has 3 minor updates .To upgrade your project to this version ,follow these steps

First make sure you have upgraded your project to Ionic 3.0.0 then open package.json and simply change 
<em>ionic-angular</em> from <em>3.0.0</em> to <em>3.0.1</em>

    "ionic-angular" : "3.0.1"

Then open up your terminal and enter 

    npm install

You can use ionic info to check if Ionic framework is upgraded to the latest version successfully .

<iframe width="640" height="360" src="https://www.youtube.com/embed/NXaVf12NQtI" frameborder="0" allowfullscreen></iframe>


Conclusion
------------
--------------

So that is all you need to upgrade your project to use Ionic 3 instead of Ionic 2 .See your on the next posts .



