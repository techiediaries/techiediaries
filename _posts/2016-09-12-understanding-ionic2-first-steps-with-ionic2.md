---
layout: post
title: "Understanding Ionic/Angular v4 : Your First Steps with Ionic"
image: "images/content/understanding-ionic2-first-steps-with-ionic2/titleimage.png"
excerpt: "In this tutorial we are going to make our first steps creating and understanding an Ionic 2 mobile application "
categories: building-hybride-mobile-apps-with-ionic1-and-ionic2-tutorials
tags : ionic 
---

<a data-pin-do="embedPin" data-pin-width="large" href="https://www.pinterest.com/pin/427490189612764467/"></a>


Ionic 4 is the latest version of the popular Ionic framework used to build cross platform and hybrid mobile applications with web technologies. 

Ionic 4 is framework-agnostic and can be used with any framework or no framework at all (Just plain JavaScript) 

Ionic 4 has new features and optimizations which were not available in the previous versions such as CSS variables.

Personally what we like the most about Ionic is the embracing of the modern JavaScript ES6/TypeScript which brings us classes, modern import and export system,and decorators etc.

Before starting to learn Ionic 4 with Angular, make sure you have basic knowledge of Angular.

We also assume you are using Linux as the development machine and Android as the target mobile device but don't worry if you are using another operating system for developing or targeting another mobile OS. The steps are the same - That's actually one of the benefits of using Cordova based/hybrid mobile frameworks.

Ionic 4 is a vast libray with a lot of features therefore we are going to make a series of tutorials so we can cover as many topics as we can.

This tutorial is the first one of the series.


What you need to do before you can start building your mobile application is installing the required tools: 

- Java SDK.
- Android SDK.
- [Node.js](/how-to-install-node-js-6-on-ubuntu-15/)


I've already covered how to [install Node.js in a previous tutorial](/how-to-install-node-js-6-on-ubuntu-15/) so feel free to check it in case you are finding any problem while installing Node.js or you can simply grab the installer from [here](https://nodejs.org/dist/latest-v6.x/).


![Installing Ionic 4](/images/content/understanding-ionic2-first-steps-with-ionic2/ionic2-nvm.png)


We personally prefer to use NVM or The Node Version Manager to install Node.js because it allows you to quickly install and work with any version of Node.js and easilly switch between the existing versions.  


## Installing Ionic 4 and Cordova

After installing the Node.js platform; the next step is to install Ionic 4 and Cordova

So go ahead execute the following command in your terminal: 
  
```bash
$ npm install -g cordova ionic@latest
```



![Installing Ionic 4](/images/content/understanding-ionic2-first-steps-with-ionic2/ionic2-install.png)

Next, you should be able to generate and serve a new Ionic 4 application using the CLI: 

```bash
$ ionic start myApp --type=angular
```

![Ionic 4 New App](/images/content/understanding-ionic2-first-steps-with-ionic2/ionic2-new-app.png)

![Ionic 4 app](/images/content/understanding-ionic2-first-steps-with-ionic2/ionic2-new-app-2.png)

The `--type=angular` allows you to generate an Ionic 4 project based on Angular.

After generating the application, just navigate into your application directory and run the `ionic serve` command to run your mobile app:	

```bash
$ cd myApp
$ ionic serve 
```

Now your Ionic 4 app is served and you can test it using your local web browser.

In this phase you don't need an emulator or even an actual device to develop your application but all these options are available with Ionic whenever you need them.

If everything went correctly you should see an app based on a Tabbed UI layout 

![serve Ionic 4 project](/images/content/understanding-ionic2-first-steps-with-ionic2/ionic2-served.png)
            

Please note that the default app which gets generated is based on the tabs project which gives you a ready tab system to build your app upon but you can also specify other templates to use such as the sidemenu or the tutorial templates


    	ionic start myApp sidemenu --type=angular
    	ionic start myApp tutorial --type=angular
  	  ionic start myApp blank --type=angular


Cordova is used to run your mobile app on a native device or emulator. You can easilly install it using the following command:
  
  	sudo npm install -g cordova


## Building your Ionic 4 Mobile App


After generating your app and installing Cordova you can build your app for either Android or iOS. Just make sure you have installed the required SDKs -	The Java SDK and Android SDK in case you want to build for Android and a macOS with Xcode if you want to build for iOS and then follow these simple steps:

  	ionic platform add android 

or 
  
  	ionic platform add ios
    ionic run android

or
  
  	ionic run ios

or if you are using an emulator

	  ionic emulate android

or
    ionic emulate ios


That's all what's needed to generate your Ionic 4 app and build it. If you are using these tools for the first time you are going to struggle a little bit when installing the Java SDK, Android SDK and latest version of Node.js depending on the operating system you use but don't worry there are many resources on the web to help you just search for them.


With Ionic 4, we can benefit from the high level and modern languages such as ES6 and TypeScript without worrying about Browser support and Ionic with the help of Webpack takes care of transpiling and compiling everything on the fly to ES5 which is what currently all browsers supports.


## The Anatomy of an Ionic 4 App

![Ionic 4 project anatomy](/images/content/understanding-ionic2-first-steps-with-ionic2/ionic2-anatomy.png)

Instead of plain JavaScript Ionic/Angular v4 uses TypeScript which adds more features so you should familiarize yourself with TypeScript if you intend to develop mobile apps with Ionic 4 and Angular. Now let's try to investigate the anatomy or structure of an Ionic 4 project based on Angular.

First of all, this is a Cordova based project with plugins directory for installing Cordova plugins which includes default plugins.

It is also a Nodejs project since it has a `package.json` file and a `node_modules` directory.


There is also a `tsconfig.json` used for TypeScript configuration.


In the `app` folder lives the TypeScript source files .The entry file is `app.ts` which hosts the root component. 


{% highlight javascript %}

import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';

{% endhighlight %}

{% highlight javascript %}

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp)

{% endhighlight %}

## Explaining

The app starts by importing the necessary constructs(classes,functions and decorators etc.) using the modern ES6 import system.

The first one is `Component` which's a decorator from the Angular core if this is the first time you meet a decorator then simply accept my simple definition for it as a start:a decorator adds functionality to any class it decorates in our case the Component decorator transforms MyApp class into a Component.

Decorators begins by an @ symbol and takes an object as a parameter. In this case the only attribute of this parameter is template which specifies the template we are going to use for MyApp component.

You can put a raw HTML code right in template or specify the relative path of an HTML file by using `templateUrl` instead.

Next we import `Platform` and `ionicBootstrap` from the `ionic-angular` package.


We import StatusBar from ionic-native.

We import TabsPage from './pages/tabs/tabs'.


After declaring our class MyApp. In the constructor we assign the TabsPage class to our rootPage member variable and then check if the platform is ready to execute `StatusBar.styleDefault();`

Now how we specify TabsPage as our roo? 

Just look at HTML code in decorator you should see `[root]="rootPage"` which means that the root property of `<ion-nav>` is bound to the private class member `rootPage`.   


Next, the app gets bootstrapped using `ionicBootstrap(MyApp)` with `MyApp` as a parameter.


Angular brought us componentd. Components are a way of organizing your code as independent parts. Each part is a standalone and self dependent, and can communicate with other components. 

All modern frameworks are starting to use this software pattern because it has big benefits when building,testing and maintaining your application code.

We are not going to talk about why using components is a better choice because this can take pages, anyway the web is full of this kind of information if you are interested.


## Creating and Navigating Between Ionic 4/Angular Pages 


Now let's see how to add and navigate between pages. If you look into the `app/pages` directory you may notice that each page has its own folder which hosts html,scss and typescript files that belongs to each page .If we open up the about.ts file 



{% highlight javascript %}
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  constructor(private navController: NavController) {
  }
}

{% endhighlight %}


You should notice that the about page is represented by a Component.So again we import the necessary constructs and then decorates our AboutPage class using @Component decorator .This time we use templateUrl to specify a relative path to our about.html file which will be used by  AboutPage component to dispaly the about page.


You should notice one more thing the NavController class is injected via the class constructor.


You should be carefull to add the export keyword before the class if you need to import this class from other files.


Now let's look in the html template associated with this page. 


{% highlight html %}
<ion-header>
  <ion-navbar>
    <ion-title>
      About
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding class="about">
</ion-content>

{% endhighlight %}


These are self explanatory Ionic tags which setup a header and a content area with `<ion-header>` and `<ion-content>`.


So in order to create a page you need to create a class and template file and an optional scss file for styling the page markup.



## Creating the Ionic 4 Tab System


Now lets understand how the tab ui was created. Go to the tabs folder inside pages and locate tabs.ts and tabs.html

{% highlight javascript %}

import {Component} from '@angular/core'
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tab3Root = ContactPage;
  }
}

{% endhighlight %}

So the typescript code behind this tab system is very simple. As you can see first we import the `@Component` decorator. Next we import all pages to use for tabs and then we assign these pages to the private variables tab1Root,tab2Root and tab3Root in the constructor. 


{% highlight html %}
<ion-tabs>
  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>
  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>
  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>
</ion-tabs>
{% endhighlight %}

Now in the HTML code we bind these variables to the root property of each `<ion-tab>`.

## Creating Ionic 4/Angular Pages

Ionic 4 has functionality to generate pages without writing so much code by hand. To simply generate a page,just use the Ionic CLI and type:


{% highlight html %}

	ionic g page aPage

{% endhighlight %}


{% include image.html
            img="images/content/understanding-ionic2-first-steps-with-ionic2/ionic2-generate-page.png"
            title="Ionic 2 generate a page "
            %}



## Creating Ionic 4/Angular Services

To generate a service use the `g provider` command:

{% highlight html %}

	$ ionic g provider aService

{% endhighlight %}


## Conclusion


In this tutorial we have made our first steps towards learning Ionic 4 based on Angular.


