---
layout: post
title: "Setting up Admob in Ionic 1 mobile apps"
image: "images/content/setting-up-admob-in-ionic1-mobile-apps/titleimage.png"
excerpt: "Throughout this tutorial we are going to see how to setup Admob ads in Ionic 1 apps "
tags : ionic 
---
{% include image.html
       img="images/setting-up-admob-in-ionic1-mobile-apps/bigimage.png"
       title="Setting up Admob in Ionic 1 mobile apps"
%}

In this tutorial we are going to see how to setup AdMob in Ionic 1 apps ,we'll see first how to create an ad in AdMob then how to install the necessary plugin (cordova pluign) for supporting AdMob inside Ionic apps so lets get started .

The first thing you need to do is signing up for an account at [https://www.google.com/admob/](https://www.google.com/admob/) if you haven't already done this before.

After getting your AdMob account you need to create Ads units to show in your mobile apps.That's actually an easy to do thing.

So after creating our Admob account and then created the Ads unit to use in our app ,lets create an Ionic app and add the ad units to it .

Go ahead and generate a new Ionic 1 project using the CLI

	ionic start ionic1-admob-demo  blank --id "com.techiediaries.demoadmob"

Next add your target platform .I'm going to add Android pltaform since I'm developing for Android and I have no MAC but feel free to use iOS if you are developing on a MAC machine.

	ionic platform add android

Now we need to add a Cordova plugin for Admob support in Ionic 

	cordova plugin add cordova-plugin-admob

Or also you the plugin repo in GitHub

	cordova plugin add https://github.com/floatinghotpot/cordova-plugin-admob		

Next you need to open your app.js file and locate the run() method then add the following code inside this method

	window.plugins.AdMob.setOptions( {
	          publisherId: 'ca-app-pub-9293763250492023/8573028797',
	          interstitialAdId: '',
	          bannerAtTop: false, // set to true, to put banner at top
	          overlap: false, // set to true, to allow banner overlap webview
	          offsetTopBar: false, // set to true to avoid ios7 status bar overlap
	          isTesting: false, // receiving test ad
	          autoShow: true // auto show interstitial ad when loaded
	});

	window.plugins.AdMob.createBannerView();

You can also check the target platform first and then set the publisher id accordingly 
		
			var publisherId = '';
			if(device.platform == "Android")
			{
		    	 publisherId = "ca-app-pub-9293763250492023/8573028797" 
            }
            else
            {
            	 publisherId ="ca-app-pub-9293763250492023/8573028797";	
            }	    

Of course you need to replace the publisherId and interstitialAdId with your own ids from the unit ads we created earlier unless you want to me to make money from your app :D

You can play with all the options above as you like to get a better understanding.

Next attach your device and test 

	ionic run android    	

Or
	ionic run ios


Conclusion
------------

That's all for this tutorial .I hope this can be useful for your and good luck on making money with your apps.

