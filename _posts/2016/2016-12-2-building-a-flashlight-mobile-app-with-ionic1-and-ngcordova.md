---
layout: post
title: "Building a multilingual flashlight mobile app with Ionic 1 and ngCordova"
image: "images/content/building-a-flashlight-mobile-app-with-ionic1-and-ngcordova/titleimage.png"
excerpt: "Throughout this tutorial we are going to learn how to use Ionic 1 and ngCordova by building a flashlight app for Android and how to use angular-translate to add mutli language support to our app ."
tags : ionic 
---

{% include image.html
       img="images/content/building-a-flashlight-mobile-app-with-ionic1-and-ngcordova/bigimage.png"
       title="Throughout this tutorial we are going to learn how to use Ionic 1 and ngCordova by building a flashlight app for Android and how to use angular-translate to add mutli language support to our app ."
%}


In this tutorial we are going to use the hybrid mobile development framework Ionic 1 with ngCordova and multiple Cordova plugins to build a flashlight mobile app for Android (and for iOS too if you are using a MAC for development) .

You can get the app from [the Android app store](https://play.google.com/store/apps/details?id=com.techiediaries.easylight)

And you can also clone the [GitHub repo](https://github.com/techiediaries/easylight-yet-another-flashlight-android-app) 

{% include image.html
       img="images/content/building-a-flashlight-mobile-app-with-ionic1-and-ngcordova/easylight-flashlight-android-app.png"
       title="Throughout this tutorial we are going to learn how to use Ionic 1 and ngCordova by building a flashlight app for Android and how to use angular-translate to add mutli language support to our app ."
%}


Through building this app we are going to cover how we can use different Cordova plugins for accessing multiple native device functionality .

We are going also to use ngCordova which's a set of Angular.js services that wrap Cordova plugins .

Before starting lets highlight the big titles of our tutorial:

So we'll see how to scaffold or generate an Ionic 1 project,adding target platforms and Cordova plugins.

We'll see how to make our app multilingual . 

We'll see how to access device camera flashlight and turn it on and off .

We'll see how to monetize the app with AdMob.

We'll see how to generate the app resources:icons and splash .

We'll see how to prepare our app for release and publishing to the app store . 

First of all lets introduce Ionic framework for those who don't know it yet .Ionic is a hybride mobile framework which allows web developers to build mobile apps using the technologies they are already familiar with ,which are JavaScript,HTML and CSS .In fact any one can develop with Ionic 1 not just web developers because learning the three pilars of the web is not hard at all and you don't even need to be highly skilled with HTML ,CSS and JavaScript to start using the Ionic framework .Ionic uses Angular.js framework to structure the app code ,HTML and CSS for presentation and theming .Ionic is based on Cordova which's a popular wrapper/framework for accessing native device functionality such as Camera ,Accelerometer ,Contacts etc.For more information about hybrid mobile development read [why going mobile hybrid](http://www.techiediaries.com/building-hybride-mobile-apps-with-ionic1-and-ionic2-tutorials/why-going-mobile-hybride/)

For the time of this writing Ionic is available in two different versions Ionic 1 and Ionic 2 which's completly rewritten from scratch by Ionic team and based on Angular 2 instead of Angular.js but since Ionic 2 is still in RC(release condidate) version ,we are going to use Ionic 1 for our app.

So lets get started .First you need to install the Ionic CLI (Command Line Interface ) so open up your Command prompt if you are under Windows or your terminal if you are under Linux or MAC and enter the following commands

	npm install -g ionic


You should also install Cordova 

	npm install -g cordova

As you can see ,we are using NPM to install the Ionic CLI because it's a Node.js tool (like any awesome cli tool these days) so you need to have Node.js installed on your operating system.If not just get the installer from the official Nodejs website or follow this tutorial on [how to use NVM to install Node.js](http://www.techiediaries.com/how-to-install-node-js-6-on-ubuntu-15/){rel="nofollow"}
 
Please note that if you want to be able to build your mobile app for Android or iOS(only under MAC) you need to have Java and Android SDK installed or XCode installed in case of iOS.You should find tutorials on the web on how to install those requirements. 

Now after installing the Ionic CLI ,lets scaffold our Ionic 1 mobile app (based on the sidemenu template)


	 ionic start easylight sidemenu --app-id "com.techiediaries.easylight"

The Ionic CLI will take care of downloading the sidemenu template and generate your starting app with some default pages and a side menu .

We use --app-id switch to tell Ionic what's the package name of our app .If you don't provide one Ionic will generate a random name for your but you can change it later in your project config.xml file.

	<widget id="com.techiediaries.switchlight" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">

Next we need to add the target native platforms with

	cordova platform add android  // for Android

	cordova platform add ios  // for ios

BUT you need to make sure you've installed the SDKs of native platforms .Java SDK and Android SDK for Android and XCode for iOS.

Also you won't be able to add an iOS platform and build your app to target iOS unless you are developing under a MAC system.For Android you can target it either under Linux/Windows or MAC .


Now cd into your app directory and begin by installing ngCordova library using bower 

	bower install ng-cordova 

If you take some time to look at your project structure you should notice the existence of package.json ,bower.json and gulpfile.js among other files and folders which means that Ionic is using NPM and Bower as package managers and Gulp as a task runner so if you are already familiar with these tools you should feel at home.

Now to edit/add files we need to go under www folder where you should find Angular.js code and html views.
Open your index.html file and include ngCordova before app.js and controllers .

	<script src="lib/ngCordova/dist/ng-cordova.min.js"></script>

Next open app.js and include ngCordova as a dependency for Angular.js app

	angular.module('starter', ['ionic','ngCordova','starter.controllers'])

Adding support for multiple languages 
-------------------------------------

Since Ionic uses Angular.js we are going to leverage an Angular.js library for adding i18n support to our Ionic app so go ahead and install angular-translate using Bowser

	bower install angular-translate

Next we add it in our index.html file before our app.js
	
	<script src="lib/angular-translate/angular-translate.min.js"></script>

Next add 'pascalprecht.translate' to your app dependencies.

	angular.module('starter', ['ionic','ngCordova','pascalprecht.translate','starter.controllers']) 

In run() method inject both $cordovaGlobalization and $translate

	angular.module('starter', ['ionic','ngCordova','pascalprecht.translate','starter.controllers'])
	.run(function($ionicPlatform,$cordovaGlobalization,$translate) {
			    $cordovaGlobalization.getPreferredLanguage().then(
				    function(result) {
				      console.log("the language " + angular.toJson(result));
				      var parts = result.value.split('-');
				      if(parts.length > 0)
				      {
				        var lang = parts[0];
				        $translate.use(lang);
				      }else
				      {
				        $translate.use('en');
				      }
				    },
				    function(error) {

					});		
	})

So what we have done ?

We have used $cordovaGlobalization.getPreferredLanguage() to get the language of the device running the app then we set $translate.use() to set the language that angular-translate will use .In this way our app will be translated in the device language if there are translations for that language otherwise will use English.

Next in app .config() method we inject $translateProvider and set our app strings in different languages

  var en_translations = {
    app_title : "EasyLight",
    app_desc : "EasyLight lets you use your mobile as a flashlight",
    app_author : "Built by Ahmed Bouchefra",
    light_on : "Switch the light on",
    light_off : "Switch the light off",
    enable_accelo : "Enable/Disable the accelometer",
    menu_home: "Home",
    menu_about: "About",
    rate: "Rate"


  };
  var fr_translations = {
    app_title : "TorcheSimple",
    app_desc : "TorcheSimple vous permets d'utiliser votre phone comme une torche ",
    app_author : "Crée par Ahmed Bouchefra",    
    light_on : "Activer/Désactiver l'éclairage",
    light_off : "Éteindre l'éclairage ",
    enable_accelo : "Activer l'accéléromètre" ,
    menu_home: "Principal",
    menu_about: "A Propos",
    rate: "Rate"
  };
  var ar_translations = {
    app_title : "شعلة",
    app_desc : "شعلة تطبيق يسمح لك باستعمال المحمول كمصباح يدوي بكل سهولة",
    app_author : "المبرمج : احمد بوشفرة",        
    light_on : "أشعل النور",
    light_off : "أطفئ النور",
    enable_accelo : "تمكين التسارع",
    menu_home: "الصفحة الرئيسية",
    menu_about: "حول",
    rate: "Rate"     
  };

	$translateProvider
	    .translations('en', en_translations) // we provide English translations
	    .translations('fr',fr_translations)  // Frensh translations
	    .translations('ar',ar_translations)  // Arabic translations
	    .preferredLanguage('en'); // we set the default language 

Now on our templates we should use translate filter to display any string.For example :  

	{{"app_title" | translate }}	    


How to access device camera flashlight ?
------------------------------------------

Since we are buidling a flashlight app we need to access the device Camera flashlight so we need to install the cordova camera plugin

Under your Ionic project folder run 

		cordova plugin add cordova-plugin-camera

	angular.module('starter', ['ionic','ngCordova','pascalprecht.translate','starter.controllers'])

	.run(function($ionicPlatform,$cordovaFlashlight,$cordovaGlobalization,$translate) {
		/* .... 
			Omitted some code parts
			......
		*/
	    $cordovaFlashlight.available().then(function(availability) {
	       
	        $cordovaFlashlight.switchOn().then(
	          function (success) { 
	              console.log("Flashlight is on !");
	          },
	          function (error) { 
	            console.log('Error while switching Flashlight on')
	          }
	        );      

	    }, function () {

	      alert('Flashlight is not available');

	    });		
	});		

This code will check if flashligh is available then switch the flash light on when the app starts.

Next we need to add some a bunch of controller methods to be able to switch it off and on again .

angular.module('starter.controllers', [])
.controller('HomeCtrl', function($scope,$cordovaFlashlight) {
  
  $scope.isOn = true;
  $scope.turnOn = function(){
        //nativeclick.trigger();
        $scope.isOn = true;
        $cordovaFlashlight.switchOn().then(
          function (success) { 
              console.log("Flashlight is on !");
          },
          function (error) { 
            console.log('Error while switching Flashlight on')
          }
        );          
  }
  $scope.turnOff = function(){
        //nativeclick.trigger();
        $scope.isOn = false;
        $cordovaFlashlight.switchOff().then(
          function (success) { 
              console.log("Flashlight is off !");
          },
          function (error) { 
            console.log('Error while switching Flashlight off')
          }
        );    
  }});

So you can see that we have added two methods turnOn() and turnOff() to $scope now we need to bind them to home template 

home.html

	<ion-view view-title="{{'app_title' | translate }}" style="background: #0d455f">
	  <ion-content style="overflow-y: auto;">

	  <h1>
	  	<img style="width: 100%;height: 100%;padding:5px; " src="img/title.png">
	  </h1>

		   <div class="item item-body"  style="background: #0d455f">
		   	<button class="button button-full button-energized" ng-click="turnOn()">
	            {{"light_on" | translate }}
	        </button>
	        <button class="button button-full button-assertive" ng-click="turnOff()">
	            {{"light_off" | translate }}
	        </button>
	        
		   </div>

		</div>
	</ion-content>
	</ion-view>


Monetizing our app with AdMob 
------------------------------

In this part we will add AdMob monetization support to our app .Since AdMob uses native ads we need to install a Cordova plugin so in your terminal/prompt execute :

	cordova plugin add cordova-plugin-admob
Or
	cordova plugin add https://github.com/floatinghotpot/cordova-plugin-admob

Next we need to add some settings 

So in your app .run() method add the following code

    window.plugins.AdMob.setOptions( {
          publisherId: 'ca-app-pub-9293763250492023/8573028797',
          interstitialAdId: '',
          bannerAtTop: false, // set to true, to put banner at top
          overlap: false, // set to true, to allow banner overlap webview
          offsetTopBar: false, // set to true to avoid ios7 status bar overlap
          isTesting: true, // receiving test ad
          autoShow: true // auto show interstitial ad when loaded
    });

    window.plugins.AdMob.createBannerView(); 

Of course you need to change the publiser id to reflect your own AdMobe publiser id unless you want me to make some money from your app.

Also make sure to make isTesting:false when you want to release you app to the app store .But when developing it's recommended to assign true to isTesting so you won't accidently click on your Ads when testing your app which's against the terms of Google AdMob . 

Preparing the app for publishing to app stores
------------------------------------------------

The last step is to prepare our mobile app for app store release .I'm going to publish it to the Google app store since i'm targetting only Android devices.

First we need to generate app resources such as icons and splash screen .Go inside resources folder in the root of your project you should find two images icon.png and splash.png and two folders android and ios which contains resources for both android and ios with different resolutions and aspect ratios.

You don't have to modify the resources inside android and ios folder all you need to do is to provide your source images icon.png and splash.png (you can also use Photoshop and illustrator images) and then enter 

	ionic resources 

Then wait for some time while Ionic generates platform specific resources with different sizes for different resolutions and aspect ratios .

You need to create resources for the largest size needed .The Ionic cli will take care of resizing and cropping them for specific for specific device resolutions

The minimum size of icon should be 192×192 px .

The minimum size of splash image should be 2208x2208 px and all artwork should be centered inside a square of size 1200x1200 px .

Next to prepare the project for release build remove the cordova-plugin-console which's not needed any more

	cordova plugin rm cordova-plugin-console

Then use the following command to build the app for release with cordova 

	cordova build --release android
Next you should sign your app before you can upload it to the store .So first use the keytool to generate a key based on a key phrase and some other info that tool will ask you after executing 

	keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
Then use the jarsigner utility to actually sign your apk with the generated key 

 	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore my-apk-unsigned.apk alias_name

Next you should align the signed apk with 
	
	zipalign -v 4 myapk-unsigned.apk myapk.apk

No if everything went without any errors you should get your myapk.apk file which's ready for publishing on the 
[Android app store](https://play.google.com/apps/publish/)
 
You can get the app from [the Android app store](https://play.google.com/store/apps/details?id=com.techiediaries.easylight)

And you can also clone the [GitHub repo](https://github.com/techiediaries/easylight-yet-another-flashlight-android-app)

Conclusion
-----------

So in this tutorial we have covered how to use Ionic 1 ,Cordova and angular-translate to build a multilingual Android app that you can also build for iOS .We have seen how to build the release version of our app using Cordova and how to add multiple Cordova plugins to access native functionality of mobile devices such as Camera and native Ads .   






	     