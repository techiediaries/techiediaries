---
layout: post
title: "A Re-Introduction to Ionic (Ionic 4+, PWAs, Stencil, Capacitor and  Electron)"
image: "images/content/ionic.jpg"
excerpt: "If you have been following with the Ionic framework then you'll have probably noticed the buzz around some new technologies/tools and concepts mainly PWAs (Progressive Web Apps), Stencil, Capacitor and Native PWAs. Are you confused/worried by all that? Don't be It's all related and has one ultimate goal which is to make Ionic a powerful framework-agnostic library for building mobile (progressive) web apps that have first class access to native device features." 
tags : [javascript, capacitor, ionic, stencil, electron] 
---


If you have been following with the Ionic framework then you'll have probably noticed the buzz around some new technologies/tools and concepts mainly PWAs (Progressive Web Apps), Stencil, Capacitor and Native PWAs. Are you confused/worried by all that? Don't be It's all related and has one ultimate goal which is to make Ionic a powerful **framework-agnostic** library for building mobile (progressive) web apps that have first class access to native device features.

The major components toward the new Ionic is **Stencil** and **Capacitor** 

If you were to describe Ionic to a new developer you would tell him Ionic is a framework on top of Angular and Cordova to build hybrid mobile apps (mobile web apps that, essentially, have native access to users devices and are installable via App Stores)  

But actually Ionic is not a framework It's an UI (User Interface) library built on top of Angular so the real framework here is Angular supercharged with a beautiful mobile UI components and best patterns (lists and virtual scrolling etc.) 

It's not just about the UI, Ionic has also access to native features of the mobile platforms (Android and iOS etc.) thanks to the independent tool Apache Cordova (which is essentially a runtime and a set of plugins that allow you to call native features of mobile devices from JavaScript)

So a better re-definition for your  new Ionic developer friend would be: **It's a mobile UI library on top of Cordova that uses Angular (previously Angular.js)** for whatever you use a framework/Angular for when building client side web applications (structure, helper libraries, strong design patterns like Dependency Injection etc.)

Cordova and Angular constitute the two major corner stones technologies for Ionic. You can't use Ionic without any one  

So we have **Stencil** and **Capacitor** the two corner stones for the new modern and future Ionic and **Cordova** and **Angular** the two corner stones for the old Ionic  (still supported by future Ionic versions). Can you see where Stencil and Capacitor fit in **vs.** Cordova and Angular? If not yet maybe you need to bit of refresh on what Stencil and Capacitor are?

Stencil is basically a web component compiler that makes it easy to author web components using a set of features similar to what you find in modern web frameworks such as TypeScript support, JSX, async rendering.  At this point you'll understand that Stencil is a replacement for Angular? and the answer is both Yes (but not directly) and No. Yes because the whole purpose of Stencil is to make Ionic framework agnostic i.e you'll get to use Ionic without any framework and No because, as an Ionic developer,  you don't actually need to use or even know about Stencil. It's used behind the scenes by the Ionic team to build and generate web components that are supported natively in modern web browsers so Ionic components will become web components available everywhere in the modern web and Stencil is not needed in Runtime (Unlike Angular) so basically **the standard compliant web components are the replacement for Angular in Ionic 4+** (don't worry you still get to use Ionic as before with Ionic/Angular with all the previous features and constructs but better performance). Also if you are a React, Preact or Vue etc. developer you can use these libraries with Ionic to build your mobile apps.          

The Ionic Team is using Stencil for building the Ionic components but you can also use it to build your own web components and even complete (and fastest possible) apps. There are two official templates, one for [building standalone web components](https://github.com/ionic-team/stencil-component-starter)  and a [starter app template for building apps](https://github.com/ionic-team/stencil-app-starter).  

Starting from Ionic 4, Ionic will use web components for the UI components so even if you don't want to use Stencil as a development tool you will still get the benefits of performance and cross framework usage.
     
I hope that you understand now how Stencil fits in the equation.

Now let's move on to **Capacitor vs. Cordova**

First what is Capacitor? This is the official definition from [https://capacitor.ionicframework.com/docs/](https://capacitor.ionicframework.com/docs/)

>Capacitor is a cross-platform app runtime that makes it easy to build web apps that run natively on iOS, Android, Electron, and the web. We call these apps "Native Progressive Web Apps" and they represent the next evolution beyond Hybrid apps.

Let's break it down

* Capacitor is a cross-platform runtime just like Cordova except that it has native support for the Web and Electron (Cross Platform Desktop Apps) 
* Capacitor can be used to build PWAs that also have native access in mobile devices 

Ionic has done a great work building the Ionic Native layer on top of Cordova. When I first heard of Ionic Native I thought it's an alternative to Cordova but it turned out to be just a modern Promise/Observable based TypeScript interface that wraps existing Cordova plugins (which use the JavaScript callbacks that everyone dislike--See [Callback Hell](http://callbackhell.com/), [The Great Escape from Callback Hell](https://itnext.io/the-great-escape-from-callback-hell-3006fa2c82e) and [Node.js Generators & Compare with Callbacks](https://www.guru99.com/node-js-generators-compare-callbacks.html))
 and ensures that native events trigger change detection in Angular. 

Ionic Native allows developers to mock plugins which can be used for many great tasks. See how you can [develop Ionic apps entirely in the browser by mocking plugins that need real devices (such as the SQLite plugin)](https://www.techiediaries.com/mocking-native-sqlite-plugin/) and [Mocking Ionic Native 3.x plugins](https://www.techiediaries.com/mocking-ionic-native-3-x-plugins/).

Ionic Native library and plugins were the closest thing to mobile native platforms/features that the Ionic has as the part of the Ionic project.  But it's still Cordova with its design principles, limitations, advantages and disadvantages. That's why Capacitor was created to be a replacement for Cordova with a modern tooling and features and the official native layer for Ionic in future versions.      

The question that you may ask is: Are they re-inventing the wheel? 

In my opinion they are not because  the modern features are worth it and another open source like Cordova or better backed by the most popular hybrid framework Ionic will surly have its place.   

Let's again quote from Capacitor docs

>Capacitor is a spiritual successor to Apache Cordova and Adobe PhoneGap, with inspiration from other popular cross-platform tools like React Native and Turbolinks, but focused entirely on enabling modern web apps to run on all major platforms with ease. Capacitor has backwards-compatible support for many existing Cordova plugins.

Let's also break this

* Capacitor is a successor to Cordova (and PhoneGap) so that means it needs to be taking into consideration the weaknesses of Cordova and avoid them which we we'll only see how is that achieved when the project advances
* Capacitor also gets inspiration from tools like React Native which uses a different approach than Cordova    
* Capacitor has a compatibility layer which provides support for the existing Cordova plugins 

### Native Shell Add-ons

Capacitor will support the use for native shell add-ons such as menus, tabs and navigation with fallbacks to web equivalents.  

There are many advantages for a native UI for mobile apps such as

Benefits of a native UI

* performance
* native look and feel
* more respect to user accessibility settings etc.

There is something equivalent to native Addons in Cordova. 

Cordova  allows access to the native UI with many plugins for things such as [dialogs, alerts, prompts and action sheets etc.](https://developer.telerik.com/featured/adding-native-touches-hybrid-app/)   

See also the [ACE](https://github.com/microsoft/ace) Cordova plugin by Microsoft which allows to build Cordova apps with true native UIs but the plugin is no maintained by MS due for the reason outlined in its GitHub repository.



### Electron support

Capacitor will also support Electron as a target platform so your Capacitor/Ionic application will also targets desktop platforms besides the web and mobile platforms.  


    
## What is A PWA?

>Progressive Web Apps are experiences that combine the best of the web and the best of apps. They are useful to users from the very first visit in a browser tab, no install required. As the user progressively builds a relationship with the app over time, it becomes more and more powerful. It loads quickly, even on flaky networks, sends relevant push notifications, has an icon on the home screen, and loads as a top-level, full screen experience.[source](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/)
You can also read my article on SitePoint about [PWAs](https://www.sitepoint.com/progressive-web-apps-a-crash-course/)

### How About Native PWAs?

Progressive Web Apps have first class in Capacitor and since it's a native layer these PWAs have also access to native feature that's the reason behind the name Native PWAs


## Ionic Native 5?

Ionic Native 5 is also updated to be framework-agnostic status, as a step toward making Ionic with any or without a framework at all. You can now use Ionic Native with Angular.js so you don't need the absolute ngCordova anymore if you still want to use Angular.js for building your Ionic apps (like Ionic 1)

Ionic Native 5 can be used in different ways thanks to three available bundles:

* using Angular 5+ providers, 
* using ES6 modules (plugins are used statically)
* using an Angular.js module (for Angular.js support)



## Conclusion

 Starting with Ionic 4 and Ionic Native 5 you will be able to use some of the future Ionic which will change the way you can build cross-platform apps that can run everywhere from multiple mobile platforms, the web, as progressive web apps, and desktop platforms. 

What I also like about all this is the ecosystem around Ionic i.e Stencil, Capacitor and Ionic Native 5 as those tools can be used separately from Ionic to build fully fledged cutting edge apps so stay tunned for tutorials where I'm going to cover all these awesome tools to build different apps.

