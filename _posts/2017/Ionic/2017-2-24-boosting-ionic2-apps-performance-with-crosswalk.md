---
layout: bpost
title: "Boosting the Performance of Ionic 5 Apps with Crosswalk"
image: "images/content/ionic2-crosswalk.png"
excerpt: "boosting the performance of Ionic 2 apps with Crosswalk"
categories : mobiledev
date: 2020-05-03
tags : ionic 
---

{% include image.html 
    img="images/content/ionic2-crosswalk.png" 
    title="boosting the performance of Ionic 2 apps with Crosswalk" 
%}

<ol>
<li> What is Crosswalk?</li>
<li> The downside of Crosswalk?</li>
<li>How to use Crosswalk?</li>
<li>
<ol>
    <li>Requirements</li>
    <li>Creating the Ionic 5 project </li>
</ol>
</li>    
</ol>

## 1 - What is Crosswalk?


If you have already developed or used hybrid apps i.e mobile apps built using modern web technologies instead of native mobile languages such as Java or Swift, then you have for sure noticed the bad performance of these apps when running on Android devices even for small animations and also when scrolling lists of data. If you run
the same html, css and JavaScript on Android Chrome or any modern browser you'll notice that your app works much better.

So why there is such difference in performance when running your app on Android Chrome 
vs the embedded Cordova brower?

In a perfect world, the web browser used by Cordova should be the same one installed on your Android device but unfortunately that's not the case. In fact until Android 4.4 the old internal webkit based browser is used by Cordova to render your apps so the older your Android device is ,the older the browser which results in bad performance.

Even if the the newer Android versions have newer browsers you can not be sure of the version your app user is using and if your app will run without performance issues. 

Because of all these reasons, some Intel developers have decided to create a nice tool that allows you to use a custom webview instead of the one used by Cordova (which is the default system webview ) which will give your app the same environment across all devices. The tool is the famous project Crosswalk.

## 2 - The downside of Crosswalk 

The Crosswalk project has ons downside which is the size ,your app size will be increased by around 15 MB and even around 50 MB when installed so it may not be the prefect solution for everyone's needs.

## 3 - How to use Crosswalk with Ionic 5?


Now , we are going to see how you can use Crosswalk with Ionic 5 framework so you can boost your app performance.
    
### 3.1 1. Requirements


So first of all you need to have all the required tools installed which includes: 

- The Android SDK,
- Ionic 5,
- Cordova.

Now let's create our Ionic 5 project 

## 4. Creating the Ionic 5 Project

Let's start by scaffolding a new Ionic 5 project.

Open your terminal or command prompt and enter: 

    ionic start ionic-crosswalk-example blank 
    cd ionic-crosswalk-example/

Now let's add the target platform we need to support. Crosswalk can be used with Android or iOS but it's more useful in case of Android:

    ionic platform add android

Now it's time to add Crosswalk which can be done just like any other normal Cordova plugin: 

    ionic plugin add cordova-plugin-crosswalk-webview

Crosswalk only supports only versions higher than 4.4 .In Ionic 5 apps the minimal SDK is 4.0 so we need to set the minSdkVersion to 20 .To do that just open the  platforms / android / AndroidManifest.xml file and change the following line 

    <uses-sdk android:minSdkVersion="16" android:targetSdkVersion="24" />

To 

    <uses-sdk android:minSdkVersion="20" android:targetSdkVersion="24" />            







