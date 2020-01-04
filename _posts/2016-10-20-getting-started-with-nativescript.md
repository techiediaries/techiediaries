---
layout: post
title: "Getting started with NativeScript"
codeproject: "http://www.codeproject.com/script/Articles/BlogArticleList.aspx?amid=12327125"
image: "images/content/getting-started-with-nativescript/titleimage.png"
excerpt: "In this tutorial we are going to learn about NativeScript and how to use web technologies to build native mobile apps for Android and iOS "
tags : nativescript
---

NativeScript is a framework that allows web developers to leverage their web development skills to build native mobile apps for Android and iOS(And later Windows Phone as promised by the nativescript team).So thanks to NativeScript if you can use JavaScript and CSS you can build a native mobile app .

Unlike hybride mobile frameworks such as Ionic or any Cordova based framework,NativeScript doesn't use web views but the rendering engine of the target native platform which means you get the same performance as any other native app .

What NativeScript tries to do is bridging the gap between the two worlds of hybride and native mobile apps ,it takes the best of the two worlds and mixes it into one platform but how does NativeScript achive that ?

The reuse of web skills,mainly JavaScript and CSS. 

The use the rendering engine of Android or iOS (Thus no need for a web view and no performance issues).

So thanks to NativeScript :

You can build a mobile app that's 100% Native ,you can call native api directly from the target native platform SDK or any third party library so there is no limitation compared to a native app built by native platform languages (Java or Swift).

You can build cross platform apps with nearly the same/or sometimes the same code base.

You have powerful tools at your hand ,JavaScript,TypeScript,Angular 2.

You can use NPM/Node.js modules in your app but only modules which don't require or depend on some browser API like the DOM. 

You can use a subset of CSS to style your app UI.

You have no web view so no performance issues related to web views. 

You can re-use CocoaPods and Gradle packages.

You can share the code between mobile and web apps. 

Angular 2 and NativeScript ?
-------------------------------

Angular 2 is the newest JavaScript framework built by Google .It's the successor of Angular.js( version 1.x) but was rewritten completly from scratch.Unline Angualr.js Angular 2 can be used outside of web browsers and doesnt' require the DOM so it can be leveraged to build applications for other platforms like Desktop or mobile devices and not just the web.

NativeScript doesn't require Angular 2 and you can use it to build your mobile application with only plain JavaScript but if you know Angular 2 why missing the power given to you to build mobile apps.


Setting up NativeScript
----------------------------

So after getting some basic information about NativeScript  lets start by installing it .As any other awesome tool nowadays NativeScript uses Node.js so you need to have it installed in your system,otherwise [you can follow this tutorial on how to install Node.js](http://www.techiediaries.com/how-to-install-node-js-6-on-ubuntu-15/)

Next you need to install the NativeScript CLI from npm(nodejs packager manager),just enter the following line of commands in your Windows command prompt or Linux/Mac terminal

{% highlight bash %}
npm install -g nativescript
{% endhighlight %}

If everything goes without any installation issues you'll have two equivalent commands available at your disposal to work with NativeScript which are as you can guess nativescript and tns(Telerik NatievScript).Using one of these commands and its related subcommands you can scaffold,build and run your NativeScript based mobile application.

Please note that native development requires special setup depending on your target platform ,for example for Android you need to have Java installed and Android SDK and an optionnal android emulator if you are not intending to use a mobile device ,during developement,for testing.For iOS you need a MAC OS and you need XCode installed.

After installing the native development platform required tools you can vereify if you are ready for developing with NativeScript using the following command

{% highlight bash %}
nativescript doctor
{% endhighlight %}

If you get “No issues were detected” then you are ready to go.


Building your first mobile app with NativeScript
-------------------------------------------------

So go ahead and start your terminal or command prompt then scaffold your first mobile project using nativescript cli

{% highlight bash %}
nativescript create myApp --appid "com.techiediaries.myapp" 
{% endhighlight %}

--appid is used to specify the application id  

If you want to create an app based on Angular 2 add --ng switch 

{% highlight bash %}
nativescript create myApp --appid "com.techiediaries.myapp"  --ng
{% endhighlight %}


go ahead and cd into your app directory 

{% highlight bash %}
cd myApp
{% endhighlight %}


If you execute ls you should get a directory structure similar to

{% include image.html
       img="images/content/getting-started-with-nativescript/dirstructure.png"
       title="Getting started with NativeScript"
%}

All your work should be done in app where you can put your app common and platform specific code and files.

After adding you code you need to prepare your project for a target platform (Android or iOS) by executing the following command

{% highlight bash %}
nativescript prepare android (for Android)
nativescript prepare ios (for iOS)
{% endhighlight %}

The prepare command does no magic it just copies the platform specic content to each platform specific subdirectory in platforms directory so you make sure each paltform gets only its specific assets.


Next you need to add target platforms to your project so you can build your mobile application,to do that just execute the following command : 

{% highlight bash %}
nativescript platform add android
nativescript platform add ios		 		 
{% endhighlight %}

Now you can build your app with

{% highlight bash %}
nativescript build android
nativescript build ios
{% endhighlight %}

Afer bulding your app you should find your app package in

platforms → android → bin (The APK for Android) 

platforms → ios → build → emulator (Emulator build (APP) for iOS)

platforms → ios → build → device (Device build (IPA) for iOS) 


You can also deploy your project to a device to test it during development with

{% highlight bash %}
nativescript deploy android
nativescript deploy ios		
{% endhighlight %}


If you don't have a physical device at hand for testing you can use an emulator and you can run your app in the emulator using 

{% highlight bash %}
nativescript emulate android
nativescript emulate ios		
{% endhighlight %}


To avoid using all these commands you can use the run command which takes care of running the three commands prepare, build, and deploy for you

{% highlight bash %}
nativescript run android
nativescript run ios		
{% endhighlight %}

Or to run in emulators

{% highlight bash %}
nativescript run android --emulator
nativescript run ios --emulator	
{% endhighlight %}

When developing you need to see your changes on the fly and fast ,so you need to livesync with

{% highlight bash %}
nativescript  livesync android 
nativescript  livesync ios 
{% endhighlight %}

Which works either if you are using an emulator or the actual device.NativeScript will take care of synchronizing your changes with your app just make your changes and be ready to see the result on your emulator or physical device connected via an USB.

Building The User Interface of your mobile app
------------------------------------------------
-------------------------------------------------

As we mentionned before,NativeScript uses the native layout renderer of the target platform (Either Android or iOS).It is different from hybride mobile frameworks so you application doesn't execute in a webview and you have no html tags to build your app ui instead you use a NativeScript specific XML based language that gets converted to Android or iOS specific layout language 

NativeScript layouts
---------------------
----------------------

NativeScript has many layouts.A layout is a sort of a container which allows you to place ui elements/components .Different layouts has diffrent algorithms for placing elements,you can use any layout you choose depending on your needs: 

The Absolute layout

This layout uses absolute coordinates (left,top) to place elements.

To use it you need to import the AbsoluteLayout module 

{% highlight bash %}
import absoluteLayoutModule = require("ui/layouts/absolute-layout");
{% endhighlight %}

The Grid Layout

This layout uses rows and columns to place any component.

You need to import the GridLayout module with

{% highlight bash %}
var layout = require("ui/layouts/grid-layout");
{% endhighlight %}

The Stack layout

This layout places elements stacked either horizontaly or vertically.

To use it you need to import the StackLayout module with

{% highlight bash %}
var StackLayout = require("ui/layouts/stack-layout").StackLayout;
{% endhighlight %}

The Dock layout

This layout places elements at the edges (left,top,right,bottom,)

To use it you need first to import the DockLayout module using require

{% highlight bash %}
import dockModule = require("ui/layouts/dock-layout");
{% endhighlight %}

 
The Wrap layout
		
This layout place ui components next to each other(Horisontally or vertically ) when space is available.You can set the orinetation to be horizontal or vertical as you need.

To use you need to require the WrapLayout module with

{% highlight bash %}
import wrapLayoutModule = require("ui/layouts/wrap-layout"); 
{% endhighlight %}

You have two options ,either create your layouts using NativeScript xml ui language or JavaScript code .For example lets create a simple grid layout with some Labels.

With XML

{% highlight bash %}
<Page>
	<StackLayout orientation="vertical">
		<Button text="Click Me" />
	</StackLayout>
</Page>
{% endhighlight %}

The same layout can be created with JavaScript/TypeScript code

{% highlight bash %}
var StackLayout = require("ui/layouts/stack-layout").StackLayout;
import enums = require("ui/enums");
var stackLayout = new StackLayout();
stackLayout.orientation = enums.Orientation.horizontal;
var btn = new Button();
btn.text ="Click Me"
stackLayout.addChild(btn);
{% endhighlight %}

Can I use existing NPM/Nodejs modules in my NativeScript app
------------------------------------------------------------
-----------------------------------------------------------

The short answer is Yes you can .As long as the module doesn't depend or rely on a browser specific api like the DOM for example   
Using popular packages such as lodash or moment.js is very straighforwrd all you need to do is installing them and then require them,the process is very straightorward :

First you need to go inside your project directory and install the npm module via normal npm install command : 

{% highlight bash %}
npm install --save node-uuid
{% endhighlight %}

And then in your app code require it and start using it normally

{% highlight bash %}
var uuid = require('node-uuid'); 
{% endhighlight %}

After building your project with : 

{% highlight bash %}
nativescript build <platform>
{% endhighlight %}

The ClI will copy all modules inside of node_modules folder to 	platforms/<platform>/assets/app/tns_modules.	


The MVVM pattern
--------------------
-------------------
MVVM stands for Model-View-ViewModel and it is an architectural pattern like MVC or Model-View-Controller.In fact MVVM is just a variation of the MVC architecture which replaces the Controller component with a ViewModel compenent that adds features such as two data binding ,the viewmodel is an observable object that observes the model and signal the changes on the model to the view so it updates itself.

MVVM helps keep the user interface and app logic separated.
Using NativeScript with vanilla JavaScript requires you to understand how a MVVM pattern works and how to use it.

Using existing native Android/iOS librariries with NativeScript
-----------------------------------------------------------------
-----------------------------------------------------------------

NativeScript allows you to use native platform librariries in your NativeScript app code without so much effort ,all you need is some tweaking and configuration and then the api is ready for you to call from JavaScript code.


Installing NativeScript plugins from NPM
--------------------------------------
--------------------------------------

Install the plugin from NPM using the CLI:

{% highlight bash %}
tns plugin add nativescript-physics-js
{% endhighlight %}

NativeScript with TypeScript
----------------------------
----------------------------

Instead of vanilla JavaScript you can choose to use TypeScript to build your mobile application with NativeScript ,you just need to install via (make sure you are under your project directory)

{% highlight bash %}
nativescript install typescript
{% endhighlight %}

And then you can start using it.

If you don't know what TypeScript is ? then it's just a strongly typed superset of JavaScript created by Microsoft which adds OOP (Object Oriented Programming) features to JavaScript.lots of TypeScript features were added to JavaScript 2015/EcmaScript 6 and other features planned to be added in the next version es6+.


NativeScript with Angular 2
-------------------------------
--------------------------------

Angular 2 is the latest version of Angular which is a javascript framework for building applications,unlike angular.js(1.x) Angular 2 can be used to build applications outside the web browser since it is independent from the DOM.Angular 2 can be used to build mobile and also desktop applications with native like speed and performance.   

References
---------------
-----------------

[The documentation for NativeScript](https://docs.nativescript.org/)

[The NativeScript API reference](https://docs.nativescript.org/api-reference/globals.html)

[NativeScript Project Roadmap](https://www.nativescript.org/roadmap)


