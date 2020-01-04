---
layout: post
title: "Developing Firefox extensions with WebExtension"
image: "images/content/developing-firefox-extensions-with-webextension/titleimage.png"
excerpt: "In this tutorial we are going to dive into creating FireFox addons using WebExtension API "
tags : webextension 
---
{% include image.html
       img="images/content/developing-firefox-extensions-with-webextension/bigimage.png"
       title="building firefox extensions with webextension"
        %}

What is a FireFox extension ?
------------------------------

So first of all ,what is a FireFox extension ?

A Firefox extension is a sort of a small app that's running inside of Firefox to extend its functionality .All major and modern browsers such as Firefox,Opera,Chrome or Microsoft Edge can be extended with an extension or addon.


What are WebExtensions ?
------------------------

WebExtensions are simply a cross browser system for building extensions or add-ons,it's largely comptaible with Chrome and Opera [extension API](https://developer.chrome.com/extensions) so with small modifications you can build addons which can supported by the four major opertaing systems that exist namely Chrome,FireFox,Opera and even Microsoft Edge 

What's web-ext and how to get started using it?
------------------------------------

web-ext is a nodejs utility designed to help you develop  Firefox addons with WebExtension API.

You can easily install it via npm :

	npm install -g web-ext

To check if it is correctly installed just type :

	web-ext --version

Now to test an extension you just enter into your extension directory and execute 

	cd my-extension
	web-ext run	

The next logical step to do after developing and testing your newly built extension is packaging ,web-ext makes this very easy you just need to execute 

	web-ext build

Make sure you are under your extension folder.

Next comes extension distribution 
----------------------------------

You can either distribute your extension on Mozilla addon store or by yourself but you have to sign it first to do again we'll use web-ext command line utility 

	web-ext sign --api-key=yourapikey --api-secret=yourapisecret

--api-key: API key ,you get it from addons.mozilla.org 
--api-secret: API secret, you get it from addons.mozilla.org 


There are other commands that can be very helpful when developing your extension you can view all of them by just entering :

		web-ext --help


Creating a Firefox extension from scratch with WebExtension
-------------------------------------------------------------

Now lets create our first WebExtension for FireFox.This first addon is very simple it opens a tab with a "hello webextension" when clicking on browser action button .

So create a new directory and cd into it

	mkdir hello-firefox-webextension && cd quick-firefox-webextension
	mkdir icons

## Creating manifest.json

Under the root of your addon create a new file,call it manifest.json 
	
	touch manifest.json

And put the following content inside of it

	{

	  "description": "Creating your first FireFox WebExtension ",
	  "manifest_version": 2,
	  "name": "hello-ff-webextension",
	  "version": "1.0",
	  "homepage_url": "http://www.techiediaries.com",
	  "icons": {
	    "48": "icons/icon-48.png"
	  },

	  "applications": {
	    "gecko": {
	      "id": "hello-ff-webextension@techiediaries.com",
	      "strict_min_version": "45.0"
	    }
	  },


	}



So lets explain what's in manifest.json file ?
 manifest_version,name,version,description are self explanatory they are just basic metadata about your addon.

icons specify the paths of icons to use for your addon.

content_scripts is a key which takes an array of scripts to inject in visited webpages by your addon ,matches specify the pattern the url of the webpage meets for the script to be injected.js specify the path of the script to inject.

Now lets test our addon ,all you have to do is to navigate to your extension folder in case you are not inside of it.

	cd hello-firefox-webextension

and use web-ext to test the addon

	web-ext run

If you are using a version of FireFox before 48 :

	web-ext run --pre-install


This will run an instance of FireFox with the addon installed.The addon will stay until you restart FireFox.

Adding a Browser Action and background script
------------------------------------------------

To add a browser action all you have to do is adding 

	  "browser_action": {
	    "default_icon": "icons/icon-32.png"
	  }

To your manfest.json file.

Make sure you add an icon(32x32) to your icons folder with icon-32.png name.


Next we add a background script,so create a javascript script file with any name you choose
	
	touch background.js

and add the following meta information to your manifest.json file so your addon will recognize your background script.
	
	  "background": {
    	"scripts": ["background.js"]
  	   }

Where scripts is an array which contains paths to all background scripts we need to include,in our case there is only one background script in the root folder of our addon. 

Now after adding necessary meta information lets the actual code that handle the logic of our extension.Our addon only opens a new tab when clicking the browser action icon ,so open background.js file and add this code:

	function openIndex() {
	  chrome.tabs.create({
	     "url": chrome.extension.getURL("index.html")
	   });
	}

	chrome.browserAction.onClicked.addListener(openIndex);	

Now lets explain :

We start by creating a javascript function which creates a new tab with the url pointing to our index.html file ,to get the url to index.html we use the getURL() function which belongs to chrome.extension namespace and takes the path to index.html.

Next we added a listenner for clicks on our addon's browser action so whenever we click on the browser action icon the openIndex function gets executed .
 

Conclusion
-------------

I hope this tutorail helps you understand how to build your FireFox addons or extensions using the new cross browser WebExtension API.You can find the source in [GitHub](https://github.com/techiediaries/hello-firefox-webextension).

References
-------------

[web-ext commands reference](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/web-ext_command_reference).


Source of [Hello FireFox WebExtension](https://github.com/techiediaries/hello-firefox-webextension)


