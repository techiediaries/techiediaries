---
layout: post
title: "Building Universal Windows Platform Apps with Ionic 2"
image: "images/content/building-universal-windows-platform-apps-with-ionic2/titleimage.png"
excerpt: "Building Universal Windows Platform Apps with Ionic 2"
tags : windows 
---
{% include image.html
       img="images/content/building-universal-windows-platform-apps-with-ionic2/bigimage.png"
       title="Building Universal Windows Platform Apps with Ionic 2"
%}

In this tutorial we are going to get you started using the Ionic 2 framework to build Universal Windows apps but before you can build apps for the universal windows platform you need to have some necessary tools installed in your developement environment :

So you need first to install Visual Studio 2015 and make sure you check Universal Windows App Development Tools and also HTML/JavaScript (Apache Cordova) since we are using Ionic 2 which's based on Cordova.

After installing and setting up the requirements we continue by generating an Ionic 2 project :

		ionic start myApp
		cd myApp
		npm install

As you can add an Android or iOS target platform with : 

		ionic platform add android 
		ionic platform add ios

Now you can also add the windows platform with

		 ionic platform add windows

To target the Windows 10 platform instead of Windows 8.1 you have to specify the target version in your config.xml

		<platform name=”windows”>
		        <preference name=”windows-target-version” value=”10.0″ />
		</platform>		

Now we need to build the project,as you may guess to build for the windows platform you just execute the following line:

		ionic build windows

Now we need to go to Visual Studio to open and run our project so start by launching Viusal Studio then go to File->Open and  navigate to your project . /paltforms/windows/xxx.sln .Many projects will be opened look for universal platform project and set it as the startup project.

Next you can run your project very easily from within Viusal Studio using an emulator ,just click on the run button(the green one) and then select your target emulator and you should have your UWP app deployed to your emulator 




