---
layout: post
title: How to use Cordova InAppBrowser in Ionic 4 to Open External URLs 
image: "images/content/how-to-use-inappbrowser-with-ionic2-to-launch-external-urls/titleimage.png"
excerpt: "In this tutorial we are going to see together how to use InAppBrowser a Cordova plugin to launch external websites urls"
categories: building-hybride-mobile-apps-with-ionic1-and-ionic2-tutorials
tags : ionic
---

<a data-pin-do="embedPin" data-pin-width="large" href="https://www.pinterest.com/pin/427490189612767644/"></a>


In this tutorial, we are going to learn how to use the Apache [Cordova plugin InAppBrowser](https://github.com/apache/cordova-plugin-inappbrowser) to launch external websites in Ionic 4.

We are going to start the tutorial by creating a new Ionic 4 project using the Ionic CLI 4. In your terminal, run the following command:

```bash
$ ionic start myApp blank --type=angular
$ cd myApp
$ ionic platform add android
```

The `--type=angular` option tells ionic CLI to scaffold an Ionic 4 project based on Angular. This is necessary because Ionic 4 is now framework agnostic.

Since We are using a Linux/Ubuntu system, we can only build for Android. In case you are using a macOS system you can also target iOS and you can  add the iOS platform using the following command:


```bash
$ ionic platform add ios
```

Next, let's add the InAppBrowser Cordova plugin that allows you to launch external URLs inside your Ionic 4 mobile appliation. In your terminal, run the following command:

```bash
$ cordova plugin add cordova-plugin-inappbrowser
```

The InAppBrowser plugin provides a web browser view which behaves like any regular web browser but inside your Ionic application.

The InAppBrowser plugin allows you to open, external URLs instead of using the main cordova web view. It provides its own control buttons instead of your app controls and it has a simple API since it's only needed for opening external URLs. 

After making sure the Cordova platform is ready, you can call the following method to open URLs:


	cordova.InAppBrowser.open(url, target, options); 


- `url`: Contains the external url to load. 

- `target`: Defines how InAppBrowser will open the url which has three options:

- * `_self`: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.

- * `_blank`: Opens in the InAppBrowser.
	
- * `_system`: Opens in the system's web browser.

- `options`: Provides options for InAppBrowser ,one common options supported by all platforms is location which displays or hides the InAppBrowse location bar ,the default value of options is the string location=yes


## Conclusion
--------------------

That's all for this small tutorial which just shows you how to use the Cordova plugin inappbrowser to launch external urls. 














