---
layout: post
title: "Error:Buildtools 24.0.2 requires Java 1.8 or above. Current JDK version is 1.7 Under Ubuntu"
image: "images/content/error-buildtools-24-0-2-requires-java-18-or-above-current-jdk-version- is-17-ubuntu/titleimage.png"
excerpt: "In this tutorial we are going to make our first steps creating and understanding an Ionic 2 mobile application "
categorie: Errors 
tags : java 
---

Rencently i've started working with Android Studio instead of Eclipse for developing Android applications.As usual,when starting with a new development tool ,the installation process takes time and causes a lot of frustration to most developers .Anyway to work with the latest Android Studio you need to have Java 1.8 installed in your computer as recommended by Google on its Android studio website,if you just go with any version of Java,you have already, and ignore that recommendation, all is going to be fine until you create your first project you'll be welcomed with this error:

	<b>Error:Buildtools 24.0.2 requires Java 1.8 or above. Current JDK version is 1.7</b>

So if you are encoutering the same problem and you are using Ubuntu feel free to follow my post on how to solve the probem.


First of all i've installed the latest version of Java(1.8) using this PPA ppa:webupd8team/java.If you have a problem installing Java you can follow this detailed post on [How to install Java 1.8 under Ubuntu 15](/2016-09-19-how-to-install-java-8-jdk-8u101-on-ubuntu-via-ppa)

After installing Java 8 I started my Android Studio again and when i've executed my newely created project i encoutered the same problem again .So what the hell is going on ? don't worry I have the solution here .

Change your project settings to use Oracle Java 1.8 instead of Java 1.7
--------------------------------------------------------------------------

This is very simple just hit F4 or Right Click on your project and choose module settings from the menu 

Now all you have to do is changing


https://www.youtube.com/watch?v=MR49-iseQP0

  





 

 





