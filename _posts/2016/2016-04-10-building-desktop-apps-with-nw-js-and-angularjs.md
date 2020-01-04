---
layout: post
url: /building-desktop-apps-nw-js-angularjs
title: Building Desktop Apps With NW.js and AngularJS
author: mrnerd
tags : nwjs 
---
This article gets you started building Desktop applications using only web development technologies such as JavaScript,HTML and CSS,,this is only possible exploiting an intel project called nw.js.

To illustrate working with all these technologies ,we'll be creating a Desktop application to download videos from Youtube ,the final source code of our application will be available on Github.

nw.js or previously node-webkit, lets you call Node.js modules from the DOM so we can exploit a Node.js module to download YouTube videos to avoid reinventing the wheel and concentrate on nw.js aspects rather than the details behind downloading videos from YouTube.

Key features this app uses

NW.JS ;The intel project which made building Desktop application with web technologies possible
jQuery : Javascript library for easily working with the DOM
Backbone.js:Client side Javascript framework for building apps.  
Bootstrap :CSS framework to enable developers to easily style html pages  without being a designer.  
ytdl-core :Node.JS module for downloading YouTube videos.  
Before starting development ,make sure you have Node.js installed in your system,if this is not the case try to install it by following this tutorial which will introduce you to Node.js and the process of installing it. 

Downloading and setting NW.js 

The current stable version of NW.js ,when writing this article,is 0.12.3 .It is available for Windows,Linux and OSX both for 32 and 64 architectures .

  To ease this process of installing NW.js i'm going to use a starter boilerplate project available on Github

This project sets up three things for you:

Cross platform development environment which works the same way on OSX, Windows and Linux.

Basic structure for NW.js app.

Scripts to generate installers of your app for all three operating systems.

To be able to work with NW.js using this project follow these simple instructions :

First create a folder for your project ,cd into the created project

Clone the starter boilerplate from Github using the Git utility ,please make sure you have installed Git before you continue,if you don't have Git installed .Otherwise if you don't want to install Git just visit https://github.com/szwacz/nw-boilerplate  then download the project as a zip file and extract into your project folder.

git clone https://github.com/szwacz/nw-boilerplate.git vidown

 cd vidown

npm install

npm start 

If everything went well you should have a running application on your desktop 

You can install the ytdl-core module via npm

npm install ytdl-core 

 


