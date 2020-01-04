---
layout: post
title: "Ionic 4 Tutorial with AngularJS and Cordova"
image: "images/content/ionic.jpg"
excerpt: "In this tutorial we'll see how to build a simple mobile application with AngularJS, Ionic 4 and Cordova" 
tags : [angularjs, ionic, cordova] 
---

Did you enjoy using Angular.js for building Ionic 1.x apps? But was forced to migrate to TypeScript/Angular 2+ to use the latest Ionic versions (2+) which don't support AngularJS anymore or do you still use the Ionic 1.x version because you don't want to use TypeScript? If YES then fortunately for you you can now use JavaScript and AngularJS with the latest and future versions of Ionic (4+) because Ionic is going framework agnostic starting with version 4.

Since the Ionic CLI doesn't yet support generating framework agnostic apps we'll manually execute different tasks that the Ionic CLI do for us behind the curtain  (mainly things related to integrating Cordova)

So for now you'll need to generate a new Cordova project     

## Prerequisites

It goes without saying that you need to have Node, NPM and Cordova installed also the SDKs for the platforms you need to target (i.e Android or iOS) and also a MAC for building iOS apps. 

## Installing Cordova 

If you don't have Cordova installed you can simply run the following command  

```bash
npm install cordova -g 
```

Depending on your npm configuration you might need to add *sudo* to install packages globally.

## Generating a New Cordova Project

Now let's get started by generating a new Cordova project by running the following command:

```bash
cordova create ionic4-cordova-angularjs
```
## Installing AngularJS and Ionic 4 Core Components
 
Navigate inside your Cordova project then install AngularJS and Ionic 4 core package (which contains Compiled Stencil Components/Web Components  for Ionic 4) from npm

```bash
cd ionic4-cordova-angularjs
npm install angular
npm install @ionic/core
```

You can now use AngularJS and Ionic 4 components with your Cordova application but since they are installed in `node_modules` you need to copy them inside `www` either using a hook script or manually. For simplicity I will just copy them manually into `www/js` folder.

Please note that you need the whole `@ionic` folder for Ionic to work correctly.

You can then include them using a `<script>` tag so open the `www/index.html` then add the following code:

```html
<script src="js/angular.min.js"></script>
<script src='js/@ionic/core/dist/ionic.js'></script>
```  

## Adding the Browser Platform 

Next let's add the [browser platform](https://github.com/apache/cordova-browser) which allows you to build  Cordova applications that run in the browser (and also PWAs)

So head back to your terminal, make sure your inside your Cordova application and then run the following command:

```bash
cordova platform add browser
```
 
 You can then run your app using 

```bash
cordova run 
```

You app will be started using your default browser  and served from `http://localhost:8000/`.

## Adding Routing using UI-Router

Before adding any pages let's first setup routing whithin our Cordova application using the [UI-Router](https://ui-router.github.io/ng1/)

>UI-Router is the defacto standard for routing in AngularJS. Influenced by the core angular router $route and the Ember Router, UI-Router has become the standard choice for routing non-trivial apps in AngularJS (1.x).

So head back to your terminal then run the following command to install the router from npm:

```bash
npm install --save @uirouter/angularjs
```

Again copy the `angular-ui-router.js` from the `@uirouter` in the `node_modules` folder to the `www/js` folder then add a `<script>` to include it in the `www/index.html` file

```html
<script src="js/angular-ui-router.js"></script>
```

## Creating an AngularJS App and Add States

Next you need to create an AngularJS application so create an `app.js` in `www` then add the following code:

```js
var myApp = angular.module('app', ['ui.router']);
myApp.config(function($stateProvider,$urlRouterProvider) {
  

  var homeState = {
    name: 'home',
    url: '/home',
    component: 'home'
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    component: 'about'
  }

  $stateProvider.state(homeState)
  $stateProvider.state(aboutState);
  $urlRouterProvider.otherwise('/home');
});
``` 


## Creating your  Ionic Pages 

Let's create our first Ionic page. Create a folder called pages. Inside it create a `home` folder with a file `home.html` and `home.js` files 

```bash
mkdir pages
cd pages
mkdir home
touch home.html
touch home.js
```

Open `home.html` then add the following content

```html
<ion-page class="show-page">
    <ion-header>
        <ion-toolbar>
            <ion-title>Ionic 4 + AngularJS Application </ion-title>
        </ion-toolbar>
    </ion-header>
          <ion-content class="content" padding>
                <p>This is the home page</p>
                <a ui-sref="home" ui-sref-active="active">Home</a>
                <a ui-sref="about" ui-sref-active="active">About</a>
          </ion-content>
</ion-page>
```

Next open `home.js` and add the following code

```js
angular.module('app').component('home', {
    templateUrl:  './pages/home/home.html',
             
    controller: function() {
        console.log("home component");
    }
})
  
```

Now let's create the about page. Create the about folder then inside it add `about.html` and `about.js`

Open `about.html` then add the following code

```html
<ion-app>
        <ion-page class="show-page">
          <ion-header>
            <ion-toolbar>
              <ion-title>Ionic 4 + AngularJS Application </ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content class="content" padding>
                <p>This is the about page</p>
                <a ui-sref="home" ui-sref-active="active">Home</a>
                <a ui-sref="about" ui-sref-active="active">About</a>
          </ion-content>
        </ion-page>
</ion-app>
``` 

Next open `about.js` and add the following code:

```js
angular.module('app').component('about', {
    templateUrl:  './pages/about/about.html',
             
    controller: function() {
        console.log("about component");
    }
})  
```

You'll need to include these components in `index.html`

```html
<script src="./app.js"></script>
<script src="./pages/home/home.js"></script>
<script src="./pages/about/about.js"></script>
```

Next change the `<body>` to add these changes

```html
    <body ng-app="app">

    <ion-app>      
        <ui-view></ui-view>
    </ion-app>    
        <script type="text/javascript" src="cordova.js"></script>
    </body>
```



If you get scaling problems like in the following screen shot 

![](https://screenshotscdn.firefoxusercontent.com/images/f913187a-c11b-4bd2-bafe-e4d2b8738b1c.png)

 You simply need to add the following tags copied from an Ionic app in the `<head>` of your `index.html` file
 

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
<meta name="msapplication-tap-highlight" content="no">  
```

Now if your run your app using `cordova run` you should see the following page 



![](https://screenshotscdn.firefoxusercontent.com/images/6b7e739f-e24e-4342-b3bb-bb48430a256d.png)


You can navigate between the home and about pages using the links


## Adding a Target Cordova Platform

You can  add a target platform using


```bash
cd ionic4-cordova-angularjs
cordova platform add ios --save
cordova platform add android --save
```
This will ad Android and iOS platforms



## Running your App in Real Devices

You can also run your app using a real device so first attach a device then run the following commands

```bash
cordova run android --device
```

Or for iOS 

```bash
cordova run ios --device
```

## Conclusion

In this tutorial we have seen how to use Ionic 4 components with AngularJS. 
