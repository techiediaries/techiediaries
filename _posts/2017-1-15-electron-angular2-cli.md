---
layout: post
title: "Electron Angular 6 CLI Tutorial"
image: "images/content/electron-angular2-cli/titleimage.png"
excerpt: "This is a short tutorial to create a starter project which shows you how to use and integrate the latest version of the popular Google framework Angular 2 with GitHub Electron to build a cross platform Desktop application using the latest web technologies "
categories : github-electron
---

{% include image.html
   img="images/content/electron-angular2-cli/bigimage.png"
       title="Electron with Angular 2 and Angular 2 CLI"
%}

In this tutorial, we are going to build a starter project which shows you how you can use Electron with Angular 6 to build Desktop applications. The final project starter will be available from [GitHub](https://github.com/techiediaries/electron-angular2-starter){:target="_blank"} so feel free to clone it and start using it to build your Electron app with Angular 6 without reinventing the wheel.

But if you want to go through the process step by step,let's get started!

The first thing you need to do is installing the [Angular CLI 6](https://cli.angular.io){:target="_blank"} which is a nice tool inspired from ember-cli that allows you to quickly scaffold a new Angular 6 based project and also assists you during the development of your project by providing commands to scaffold different Angular 6 artifacts such as components and services etc. And provides you with a development server. So open up your terminal/command prompt and enter the following: 
	
```bash
npm install -g angular-cli
```

Make sure you have Node.js and NPM installed on your system but since your are working with Electron then you'll definitely have them already installed.

Next we need to scaffold a new Angular 6 project: 

```bash
ng new electron-angular2-starter
```

Next, navigate inside your project and serve it:

```bash
cd electron-angular2-starter
ng serve
```

If you have no problem you should be able to visit your app from your browser by going to [http://localhost:4200](http://localhost:4200).

You'll have a nice "app works!" message displayed .

Now just go back to your terminal and enter CTRL+C to terminate the development server and then start integrating our Angular 6 project with Electron.

But before we continue you need to have Electron installed:

```bash
npm install -g electron
```

Inside `electron-angular2-starter` create a folder with name 'electron':

```bash
mkdir electron
touch main.js package.json
```

Open up `package.json` and copy the following:

```json
	{
	  "name": "electron-angular2-starter",
	  "version": "0.1",
	  "main": "main.js"
	}
```

Next open up `main.js` and copy the following code:

```js
	const electron = require('electron')
	const app = electron.app
	const BrowserWindow = electron.BrowserWindow
	let mainWindow

	function createWindow () {
	
	  mainWindow = new BrowserWindow({width: 800, height: 600})

	  mainWindow.loadURL(`file://${__dirname}/index.html`)

	  mainWindow.webContents.openDevTools()

	  mainWindow.on('closed', function () {
	    mainWindow = null
	  })
	}
	app.on('ready', createWindow)

	app.on('window-all-closed', function () {
	  if (process.platform !== 'darwin') {
	    app.quit()
	  }
	})

	app.on('activate', function () {
	  if (mainWindow === null) {
	    createWindow()
	  }
	})
```

Next go to your app src/index.html file and modify this line: 

```html
	<base href="/">
```

to: 

```html	
	<base href="./">			  
```

Next we need to create some npm scripts which will make the process easy for us.

So open up your Angular 6 project `package.json` file

Under scripts add these 3 scripts

```json
    "build": "ng build && cp -R src/public dist/public",
    "postbuild": "cp -a electron/. dist",
    "electron": "npm run postbuild && electron dist" 
```

That's it you can now build and run your project with

```bash
npm run build 
npm run electron
```

You should have your Electron app started with the "app works!" message just like in the browser.

{% include image.html
   img="images/content/electron-angular2-cli/electron-angular2-app-works.png"
       title="Electron with Angular 2 and Angular 2 CLI"
%}


## Conclusion

In this tutorial, we've seen how to create a simple Electron application with Angular 6 integration.


