---
layout: post
title: "How to make a transparent window with GitHub Electron "
image: "images/content/how-to-make-a-transparent-window-with-github-electron/titleimage.png"
excerpt: "Throughout this tutorial ,we are going to see how to make your window transparent in apps built with GitHub Electron "
categories : github-electron
---
{% include image.html
   img="images/content/how-to-make-a-transparent-window-with-github-electron/bigimage.png"
       title="Throughout this tutorial ,we are going to see how to make your window transparent in apps built with GitHub Electron"
%}

In this post which belongs to a series of posts about GitHub Electron I'm going to show you how you can make your app window transparent using a bunch of few parameters (Actually ,generally you need to set just one parameter ) so let's get started .

First of all ,this  tutorial assumes that you have already installed your development environment depending on your operating system so anything related to necessary tools setup won't be shown in this post .

So go ahead and create a new Electron project or you can just test this with an existing app .Anyway here the code for to create a Window in Electron 


	const electron = require('electron')
	const {BrowserWindow} = require('electron')
	const app = electron.app;

	function createAppWindow(){

	  var mainWindow = new BrowserWindow({
						width: 1024, 
						height:600,
						frame:true,
						show:false});

	  	mainWindow.loadURL(`file://${__dirname}/index.html`)
	  	mainWindow.webContents.on('did-finish-load', function() {
	    	mainWindow.show();
	  	});
	  
	  	mainWindow.on('closed', function () {
	    	mainWindow = null
	  	});

	}


	app.on('ready', createAppWindow)



So this function will instantiate a new BrowerWindow with submitted options then will load your index.html file .

The window will be shown when the content has finished loading .

Now to make this window transparent you just need to supply another option which is transparent and set its value to true so go ahead and change the previous code to 


	var mainWindow = new BrowserWindow({
					width: 1024, 
					height:600,
					show:false,
					frame:true,
					transparent : true,
					backgroundColor: '#2e2c29'
	});

Create a main.js file and copy the previous code inside it .

Now create an index.html file inside your project root folder .


	<!DOCTYPE html>
	<html>
	    <head>
	        <meta charset="UTF-8">
	        <title> Electron transparent Window</title>
	    </head>
	    <body>
	        <div>
	            <p> Hello World </p>
	        </div>
	    </body>
	</html>



Now create a package.json file inside your project root folder and copy the following content

	{
	  "name": "Transparent Electron App",
	  "description": "",
	  "version": "0.0.1",
	  "main": "main.js",
	  "authors": [],
	  "license": "MIT",
	  "private": true,
	  "scripts": {
	    "start": "electron .",
	  },
	  "dependencies": {
	  },
	  "devDependencies": {
	  }
	}

We have added a start script which launches the Electron executable from current directory .Now just execute npm start to launch our example project .

For Linux users ,you need add --enable-transparent-visuals --disable-gpu 
To your start script

	"scripts": {
	    "start": "electron --enable-transparent-visuals --disable-gpu ."
	}

To enable transparency .

# Conclusion

So that's the end of this quick Electron tip you can find the code of this app on GitHub .See you in another post and thanks for reading .



