---
layout: post
title: "How to package and distribute Electron apps "
image: "images/content/how-to-package-and-distribute-electron-apps/titleimage.png"
excerpt: "In this tutorial we are going to learn how to package and distribute our apps built using Electron "
categories : github-electron
tags : electron
---

{% include image.html
   img="images/content/how-to-package-and-distribute-electron-apps/bigimage.png"
       title="How to package and distribute Electron apps "
%}

In this tutorial we are going to learn how to package and distribute our apps built using Electron .If you don’t know what Electron is then perhaps this is not for you since this tutorial is useful only for people who have already developed a Desktop app using Electron and looking for how to package it for distribution to users .

Before we start our tutorial on how to package Electron apps ,let's first introduce Electron .It’s simply a cross platform solution for building cross platform Desktop applications  using web technologies such as JavaScript ,HTML and CSS .Thanks to Electron ,if you are a web developer you can use your existing skills to build develop desktop applications for major operating systems Linux ,Windows and MAC .

Electron is built and maintained by GitHub .For a more technical definition Electron is a sort of Desktop container that wraps your web apps so they can look like native Desktop apps but not just a matter of feel and look Electron also provide a rich API to your apps in order to be able to access functionality such as the file system  and communication with operating system .In fact GitHub team behind building Electron didn’t reinvent the wheel or started from scratch they have just put Node.js which is a well known server platform based on JavaScript   side by side with Google Chromium and added a low level api for anything related to the host operating system .

Now enough introduction to Electron and let's see how you can package and distribute your application  .
How to package Electron apps ?
There are many solutions out there but the one I prefer is electron-packager which is both a Nodejs library and a CLI utility .You can use it under and for packaging for major operating systems Windows ,Linux and MAC both 32bit and 64bit architectures .

If you are using a Linux system which is what is i’m using and what should every serious developer use  then you can build packages for Linux and also for Windows if you have [Wine](https://www.winehq.org/) 1.6 or later  installed .Under Windows you can only package for Windows and to create packages for MAC you need a MAC operating system .

# Installation of electron-packager 

You can install electron-packager via npm either locally or globally .So open up your terminal under Linux/MAC or Command prompt under Windows and enter 

	//local
	npm install electron-packager --save-dev

	//global
	npm install electron-packager -g

## How to use electron-packager ?

After installing electron packager you can start using to package your apps .So again from your terminal /Command prompt enter 

	electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]

Where 

<sourcedir> - the source folder of your app 

<appname> - your application name ,choose a name for your application

<platform> - specify the target platform .linux,windows or OSX

<arch> - specify the target architecture ia32 ,darwin or 64 

After executing this line electron-packager will take care of downloading the most recent version of Electron for the right platform and architecture and then start packaging your application specified in sourcedir .

## Setting the Product Name

Next you need to open the package.json of your project and set a product name for your app 

	{
	 "name": "app",
	 "productName": "MyApp",
	 "version": "0.1.0",
	 "main": "main.js",
	 "devDependencies": {
	 "electron": "^1.4.3",
	 "electron-packager": "^8.1.0"
	 }
	}

## How to interactively use electron-packager ?

A better way to use electron-packager is electron-packager-interactive

Which is simply a wrapper around electron-packager that makes the process of packaging easy and interactive so let is start by installing it from npm using 
	
	npm install -g electron-packager-interactive

And then start it using

	$ electron-packager-interactive
	or
	$ epi

The CLI will asks some questions about your app source folder ,the target platform and architecture and some basic information such as the name of your app and then package the application by invoking electron-packager for you with submited options .
 


# Conclusion

This is the end for this short tutorial about how to package electron apps using the npm package electron-packager .


 




