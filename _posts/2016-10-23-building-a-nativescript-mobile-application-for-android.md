---
layout: post
title: "Building a NativeScript mobile application for Android"
image: "images/content/building-a-nativescript-mobile-application-for-android/titleimage.png"
excerpt: "In this tutorial we are going to learn about NativeScript and how to use web technologies to build native mobile apps for Android and iOS "
tags : nativescript
---
{% include image.html
       img="images/content/building-a-nativescript-mobile-application-for-android/bigimage.png"
       title="Building a NativeScript mobile application for Android"
%}

In this tutorial i'm going to take you step by step in a journey to build a tiny and helpful mobile application using NativeScript,We can easily target iOS too since we are using NativeScript which allows developers to build cross platform mobile apps using the same (or nearly the same in some cases ) code base ,but infortunatly i don't have a MAC which's required if you want to develop iOS apps.If you have a MAC feel free to use it to build an iOS app too ,the steps are the same.

The mobile app we are going to build in this tutorial is a small applications which can help you to do calculations with dates ,you can use it to answer questions such as

How old am I ?

How many days passed since some predefined date ?

This is from a user perspective ,from a developer percepective ,building this mobile app will show you 

How to use the NativeScript CLI to generate/scaffold a new mobile app project ?

How to build your mobile app for a specific platform (Android or iOS) ?

How to use NativeScript XML based language to build the UI of your mobile app ?

How to use Angular 2 to build your mobile application ?

How to use NPM/Node.js modules (in our case moment.js ) in your app ?

So lets get started .


Using NativeScript CLI to create our project 
---------------------------------------------
---------------------------------------------

So the first step is creating our project with NativeScript ,you need of course to have NativeScript CLI installed in your development machine ,if this is not the case then you need to check my previous tutorial [getting started with NativeScript]().

Now if you have your development machine ready for NativeScript start your terminal/or command prompt and enter the following command to generate a new project.

		tns create momentapp --appid "com.techiediaries.momentapp" --ng

Notice the --ng switch at the end of the command,it just tells nativescript to create an app based on Angular 2 instead of just plain old JavaScript (which is the option by default) and install the required modules to work with Angular 2 for you.

Notice also --appid switch which's used to specify the application unique id 

You should get this message in your terminal/command prompt if there is no problem  

		Project momentapp was successfully created.

Next plug in your mobile app for testing and enter the following command

		cd momentapp
		tns livesync android   

If you want to test with an emulator instead of a physical mobile device you just need to add --emulator 

		tns livesync android   --emulator 


If you are under a MAC system and you want to build an iOS mobile app just change android to ios

		tns livesync ios   

Or
		
		tns livesync ios   --emulator	
		

Installing NPM modules in NativeScript app
-------------------------------------------
-------------------------------------------

To install an npm module inside your NativeScript project ,first cd into your project directory 

		cd momentapp

And then use the normal npm install command

		npm install momentjs

Next in your app's code you can require it normally 

		var moment = require('momentjs');

After building your app for a specific platform the nativescript cli will copy all modules (icluding your own installed modules) inside of node_modules to 'platforms/<platform>/assets/app/tns_modules'.


A primer on Moment.js
--------------------------
--------------------------

Moment.js ia very powerful JavaScript library for manipulating and working with time and dates.It can be used on the browser and also outside the browser in a Node.js application .

You can install it via npm with

		npm install moment

Then you need to require it and start using it

		var moment = require('moment');

Getting the current date and time with :

		moment();

Formatting dates
-------------------
-------------------

To convert to a specified format use format() function

		moment().format('YYYY MM DD');


How to manipulate dates
-----------------------
-----------------------		

		var current = moment();
		
		current.add('days', 1); // adds one day to the current date
		current.add('months', 1); //adds one month to the current date
		current.add('years',1); // adds one year to the current date

In the same way you can use substract() 

		var current = moment();
		
		current.substract('days', 1); // substracts one day to the current date
		current.substract('months', 1); //substracts one month to the current date
		current.substract('years',1); // substracts one year to the current date

How to calculate the difference between dates
------------------------------------------
------------------------------------------

You can calculate the difference between two dates easily using the diff() method

		var firstDate = moment('2016-10-23');
		var secondDate = moment('2016-10-1');

		console.log('Milliseconds between firstDate and secondDate is ', firstDate.diff(secondDate), 'milliseconds');
		console.log('Days between firstDate and secondDate is ', firstDate.diff(secondDate,'days'), 'milliseconds');
		console.log('Weeks between firstDate and secondDate is ', firstDate.diff(secondDate,'weeks'), 'milliseconds');


Calculate time between two dates
-----------------------------------
-----------------------------------

		var firstDate = moment('2016-10-23');
		var secondDate = moment('2016-10-1');

		console.log(firstDate.from(secondDate));
		console.log(firstDate.fromNow());


Building our app's User interface
-------------------------------------
--------------------------------------

We will start by building the home screen 