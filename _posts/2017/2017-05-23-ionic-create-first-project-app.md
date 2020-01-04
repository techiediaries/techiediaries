---
layout: post
title: "Ionic 3 - Create and build first project or application (Android ,iOS and Windows Univeral Platform)"
image: "images/content/ionic-create-first-project-app.png"
excerpt: "In this tutorial we'll see how to quickly create and build our first Ionic 3 project or app " 
tags : [ionic]
---

{% include image.html 
    img="images/content/ionic-create-first-project-app.png" 
    title="Ionic 3 first project" 
%}

Throughout this quick tutorial ,we'll see how to create an Ionic 3 project or application using the Ionic CLI v3 .

This tutorial have a few requirements which are :
<ul>
<li>
Node.js installed .
</li>
<li>
Ionic CLI v3 installed .
</li>
<li>
Cordova installed .
</li>
<li>
Java and Android SDK library installed and configured .
</li>
<li>
A MAC system with Xcode if you plan to build for iOS  .
</li>
<li>
Windows if you plan to target UWP .
</li>
</ul>

Lets first make sure we can undertsand a few things .

You can create an Ionic 3 application if you just have Ionic CLI installed (and inevitably Node.js) then you can simply use the browser to serve 
it just like any normal web app .If you don't know it yet .An Ionic mobile app is just a web application with a mobile like UI ,wrapped by a 
native Cordova container .On the browser we don't even need the Cordova container .

But when do you need the other requirements ,namely Cordova ,different SDKs and systems ?

You only need them ,in two cases :

If you want to build you final app for some target platform i.e Android ,iOS or UWP or the three of them .

If you want to test your app using a real device .

But why you can't just use the browser to test the app ?

You can use the browser to test your app except if you are testing native device features or Cordova plugins such as the Camera ,vibration ,contacts list etc .In this 
case you need a real device so you have to install Cordova and other requirements .

Another thing ,you only need Java and Android SDK if you want to build an Android app ,MAC and Xcode if you want to build an iOS app and Windows if 
you want to build a UWP/Windows Phone app .And you need the three of them if you are targeting the three systems .

You can build iOS apps only on MAC .

<div class="note">
Actually ,you can test your Ionic 3 app entirely on the browser even if using native device features and related Cordova plugins by using plugin mocks
available since Ionic Native v3.x+ but with some added efforts ,you need to create a mock or a fake class which returns fake data or developer supplied 
data and has the same API interface as the Ionic Native plugin you are testing .see this article for an <a href="">example mock of the Camera plugin</a>    
</div> 

Generating your first Ionic 3 project 
----------------------------------------
----------------------------------------

After successfully installed Node.js and Ionic CLI v3 ,you can generate a new project using your terminal 
or command prompt .

So depending on your operating system ,open a terminal or command propmpt and enter the following command 
to generate a project .

    ionic start myapp blank 

That's it ,now wait for the CLI to generate a project with name <em>myapp</em> or any name you choose ,based 
on the blank template which has basic scaffolding for an Ionic project with one example Home page .

After finishing the initial setup ,you should be able to enter to your project directory and serve you app .

    cd myapp
    ionic serve 

Now you should be able to visit your app with a web browser at <em>http://localhost:8200</em> 


Testing your app an Android device 
-----------------------------------
-----------------------------------

Lets say you decided to build to test/build your app on/for Android ,supposing you have the requirements 
met which are the installation of Java ,Android SDK and Cordova .

Anyway Cordova is not a problem ,you can install it anytime with one command via npm 

    npm install -g cordova 

First you need to add Cordova Android platform to your project with :

    ionic cordova platform add android 

Next ,for just testing 

    ionic run android  

Or ,for building 

    ionic cordova run android 

Testing your app on iOS 
---------------------------
---------------------------

Now what if you want to test your app on iOS or build it for iOS .You can do it without any code modification but 
you need to have a MAC system and an iOS phone device of course .

Then you can just install Cordova 

    npm install -g cordova                      

Add an iOS platform to your project 

    ionic cordova platform add ios 

And then 

    ionic cordova run ios 


One important thing to mention to be able to test your app on real device ,you need an USB cable to attach 
the device with your computer and you need to enable the debug mode on your device .At least for Android ,I sincerely 
don't know if this is the case for iOS . 

For seeing all available commands at your disposal when using the Ionic CLI v3 .You can find an <a href="/ionic-cli-v3-commands-cheat-sheet">Ionic CLI v3 command cheat sheet here</a>         

Conclusion
--------------
--------------

By following this tutorial ,you should have generated a project based on Ionic 3 and using the Ionic CLI v3 .

If you have installed and configured taget systems requirements ,you should also be able to test your app 
on a real device or build your app for a target mobile system .   

