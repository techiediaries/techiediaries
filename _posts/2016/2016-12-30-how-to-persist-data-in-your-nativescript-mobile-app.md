---
layout: post
title: "How to persist data in your NativeScript mobile app"
image: "images/content/how-to-persist-data-in-your-nativescript-mobile-app/titleimage.png"
excerpt: "In this tutorial we are going to see different options you have when it comes to persist data in your mobile application built using NativeScript"
categories : nativescript
tags : nativescript
---
{% include image.html
       img="images/content/how-to-persist-data-in-your-nativescript-mobile-app/bigimage.png"
       title="How to persist data in your NativeScript mobile app"
%}


Data persitence is a necessity in many mobile applications.NativeScript offers many mechanisms that allow developers to persist data in mobile applications:

[Using filesystem](https://docs.nativescript.org/ApiReference/file-system/HOW-TO)
-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------

[Using sqlite](https://www.npmjs.com/package/nativescript-sqlite)
-----------------------------------------------------------------
-----------------------------------------------------------------

[Using Loki database](https://www.npmjs.com/package/nativescript-loki)
---------------------------------------------------------------------
---------------------------------------------------------------------
What is Loki
LokiJS is a document oriented database written in javascript, published under MIT License. Its purpose is to store javascript objects as documents in a nosql fashion and retrieve them with a similar mechanism. - [LokiJS](https://github.com/techfort/LokiJS)

npm install nativescript-loki --save


[Using  NativeScript application settings](https://docs.nativescript.org/ApiReference/application-settings/HOW-TO)
------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------

