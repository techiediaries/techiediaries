---
layout: post
title: "Solving Already created an SDK Loader with different SDK Path Problem with Android Studio"
image: "images/content/already-created-an-sdk-loader-with-different-sdk-path/titleimage.png"
excerpt: "This post outiles how I exactly solved the Android Studio error: Already created an SDK Loader with different SDK Path" 
categorie: Solving Android Studio Problems 
tags : java 
---


As I mentionned in the previous post I'm on the process of migrating from Eclipse to Android Studio for developing android applications and simple games and in the same time I'm writing a series of small posts to show other developers how I solved the problems i encoutered during this process of migration.

This post outlines how I got and solved 
	
<b>Already created an SDK Loader with different SDK Path</b>

The problem showed up when trying to import a generated gradle project(Using the LibGDX Project Generator) from Android studio which uses a different Android SDK than the default one used by Android studio.The IDE detected the difference and asked which one to consider ,i choosed the one pointed by the project.   

How to solve the error
--------------------------

You can solve this problem in two ways you either change local.properties of your project file to exactly reflect the sdk path used by Android Studio, if that causes any problem for your project you can then change the default SDK used by Android Studio. 


How to change the default SDK used by Android Studio
-------------------------------------------------------

Changing the default SDK used by Android SDK is easy.On the left pane where your project structure shows up ,right click on your project name

{% include image.html
            img="images/content/already-created-an-sdk-loader-with-different-sdk-path/android-sdk-change-1.png"
            title="android studio change sdk"

            %}

The right menu will popups go to module settings anc click on it


{% include image.html
            img="images/content/already-created-an-sdk-loader-with-different-sdk-path/android-sdk-change-2.png"
            title="android studio change sdk"

            %}

Now the Project strcuture window will show up ,Under Android SDK location choose where your Android SDK lives by browsing your filesystem.  


{% include image.html
            img="images/content/already-created-an-sdk-loader-with-different-sdk-path/android-sdk-change-3.png"
            title="android studio change sdk"

            %}

Then just click on Ok and restart Android Studio for changes to take effect.

                   
How to change the local SDK used by your project
-------------------------------------------------------

If you want to just change your project's sdk and leave the default Android Studio SDK unchanged you can use the local.properties file and set sdk.dir variable to point to the path of an Android SDK folder.


	# Location of the android SDK
	sdk.dir=/path/to/sdk


If the file doesn't exist in the root of your project ,exactly where gradle.properties and build.gradle exist,just create it by yourself.

Projects which have a local.properties file with an sdk.dir property will use the chosen sdk insted of the default SDK of Android Studio.

That's all ,I hope this post will help solve your problem too and happy migrating from Eclipse to Android Studio.


