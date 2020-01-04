---
layout: post
title: "How to update Ionic Native to latest version "
image: "images/content/update-ionic-native-version.png"
excerpt: "How to update Ionic Native to latest version "
categories : mobiledev
tags : ionic 
---

{% include image.html
   img="images/content/update-ionic-native-version.png"
       title="How to update Ionic Native to latest version"
%}

In this quick post ,we are going to see how to check the current version of your Ionic native module and how
update Ionic native to the latest version .

[Ionic native](http://ionicframework.com/docs/v2/native/) is an Ionic wrapper for Cordova plugins which allows you to interface with mobile device in your 
Ionic based app .

Ionic native is just an NPM module so you can install it and update via npm using your terminal 

First of all, we need to get the list of all available ionic-native versions so open up your terminal and
type

    npm list ionic-native  

Next you need to verify your currently installed ionic-native version with

    npm info ionic-native version


Next if you have an old version you just need to type this command to update your ionic-native to the latest
version 

    npm update ionic-native 


