---
layout: post
title: "Electron with Angular 10/9 Tutorial"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn how to integrate Angular 10 with Electron to build cross-platform desktop apps with the most powerful web technologies"
date: 2020-08-05 
tags : [ angular , angular-10] 
---

In this tutorial, we'll learn how to easily integrate Angular 10/9 with Electron to build cross-platform desktop apps with the most powerful web technologies.

You will need to have recent versions of Node and NPM installed on your machine and you'll also need Angular CLI 10 for creating the Angular project.

## Creating an Angular 10 Project

Let's start by creating an Angular 10 project. Open a new terminal and run the following command:

```bash
$ ng new angular-10-electron-demo
``` 

You'll be prompted for a couple questions about the routing and stylesheets format. You can choose the convenient answers for your project. Both answers won't actually affect how we integrate Electron with Angular 10. 

You optionally can see you app up and running in a web browser by executing the following commands:

```bash
$ cd angular-10-electron-demo
$ ng serve
```

Next, simply go to the `http://localhost:4200` address.

![Electron + Angular 10](https://www.diigo.com/file/image/badcbccczobedbqocdzdrrcspad/ElectronApp.jpg)

Now, let's see how we can integrate this app with Electron.


## Installing Electron in your Angular 10 Project

Make sure you are inside your Angular 10 project and run the following command to install Electron as a development dependency:

```bash
$ cd angular-electron-demo
$ npm install --save-dev electron@latest
```


## Creating the Electron App

Next, create a `main.js` file in your project and add the [following code](https://github.com/electron/electron-quick-start/blob/master/main.js):

```javascript
const {app, BrowserWindow} = require('electron')
    const url = require("url");
    const path = require("path");

    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
      })

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/index.html`),
          protocol: "file:",
          slashes: true
        })
      );
      // Open the DevTools.
      mainWindow.webContents.openDevTools()

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })
```

We create a GUI window using [BrowserWindow](https://electronjs.org/docs/api/browser-window#browserwindow) and load the `index.html` file, using the `loadURL()` method, that will be available in the `dist` folder which will be created after building our Angular project. 

Go to the  `angular.json`  file in your project's folder,  and change the value of the  `projects → architect → build → options → outputPath`  key from  `dist/angular-electron-demo`  to just  `dist`:

```javascript
      "projects": {
        "electron-angular-10-demo": {
          "root": "",
          "sourceRoot": "src",
          "projectType": "application",
          "prefix": "app",
          "schematics": {},
          "architect": {
            "build": {
              "builder": "@angular-devkit/build-angular:browser",
              "options": {
                "outputPath": "dist", 
```

This will make sure the compiled files will be copied under the `dist` folder instead of a subfolder.

Next, in the  `package.json`  file, add the  `main`  key with the value set to  `main.js`:

```json
    {
      "name": "angular-10-electron-demo",
      "version": "0.0.0",
      "main": "main.js",
      // [...]
    }
```

## Integrating Angular 10 & Electron 

Next, add a script for conveniently starting the Electron app after building the Angular 10 project:

```json
    {
      "name": "angular-electron-demo",
      "version": "0.0.0",
      "main": "main.js",
      "scripts": {
        "ng": "ng",
        "start": "ng serve",
        "build": "ng build",
        "test": "ng test",
        "lint": "ng lint",
        "e2e": "ng e2e",
        "start:electron": "ng build --base-href ./ && electron ."
      }, 
      // [...]
    }

```

Now, we can use the  `start:electron`  script to execute the  `ng build --base-href ./ && electron .` which first builds the project and then run electron from the current folder.

Go back to your terminal and run:

```bash
$ npm run start:electron
```

Your app should be compiled and started as the following screenshot:

![Electron + Angular 10](https://www.diigo.com/file/image/badcbccczobpbrrarrzdrsospbd/Electron+and+Angular+8.jpg)

## Solving the "Failed to load module script" Issue with Angular 10 

If you are using the latest Angular 10 version, your Electron app will be started but without the Angular app due to a **Failed to load module script** error:

This is because Angular 8+ uses [differential loading](https://web.dev/codelab-serve-modern-code)  which basically means we'll get two builds, a modern es2015 build and an ES5 legacy build. The web browser will load the right build based on its capabilities.

You can solve this issue in many ways by telling the TypeScript compiler to output a legacy ES5 build. 

Go to the `tsconfig.json` file and simply update the **target** key from `es2015` to `es5`:

```json
{
  "compilerOptions": {
    "target": "es5",
}
```

That's it. This should resolve the problem and load the Angular 8 app inside the Electron container.

## Conclusion

In this quick tutorial, we've seen how to integrate Angular 10 with Electron. 