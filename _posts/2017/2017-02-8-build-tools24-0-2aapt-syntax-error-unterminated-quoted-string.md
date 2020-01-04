---
layout: post
title: "/build-tools/24.0.2/aapt : Syntax error : Unterminated quoted string” "
image: "images/content/aapt-unterminated-quoted-string.png"
excerpt: "/build-tools/24.0.2/aapt : Syntax error : Unterminated quoted string” "
categories : mobiledev
tags : java 
---

{% include image.html
   img="images/content/aapt-unterminated-quoted-string.png"
       title="/build-tools/24.0.2/aapt : Syntax error : Unterminated quoted string” "
%}

I've just started to play with NativeScript which is an awesome framework that allows you to build cross platform
mobile apps using web technologies you are familiar with (If you are a web developer of course) but just like 
native mobile development you need to setup the native development requirements .For Android that means 
Java and Android SDK .

So after installing the required tools ,it was time to build my app for Android platform which unfortunately 
has failed with this output error message :

<b>/build-tools/24.0.2/aapt : Syntax error : Unterminated quoted string”</b>

which is clearly an error that's related to the installed build-tools .After some research I've found out that
Google has dropped support for 32 bit processors so you have two options here :

Either use a 64 bit operating system but you need to make sure you have a 64 bit machine .

Downgrade the version of installed build-tools to version 23 which the latest version that supports 32 bit 
machines .You can find the files here [build-tools_r23.0.3-linux.zip](https://dl.google.com/android/repository/build-tools_r23.0.3-linux.zip)

Make sure you downgrade the version of the platform tools too [platform-tools_r23.0.1-linux.zip](https://dl.google.com/android/repository/platform-tools_r23.0.1-linux.zip)

The process is easy and straightforward you just need to go to the Android SDK directory and replace the 
existing folder with the ones you just downloaded and unzipped .


