---
layout: post
title: "Electron Tutorial [2018]"
image: "images/content/electron.png"
excerpt: "Electron quick start Tutorial" 
tags : [electron] 
---

In this tutorial, you'll learn to use Electron.js to create cross-platform desktop applications with web technologies i.e JavaScript, HTML and CSS.

Electron allows you to develop desktop applications with web technologies such as JavaScript, HTML and CSS by providing a web container and a runtime with rich native cross-platform APIs. You could also think of it as a Node.js environment for desktop apps.


In this Electron tutorial, you'll learn:

- What's Electron,
- The Electron application architecture: Main and Renderer processes,
- How to cummunicate between the main and renderer processes inside an Electron application,
- How to share data between multiple renderer processes in Electron applications,
- How to use Node.js APIs in Electron applications,
- How to compile native Node.js modules to target Electron ABI,
- How to access Electron APIs,
- And finally; how to create a simple desktop application with Electron, JavaScript and HTML.


## What's Electron?

Electron is a tool, developed by GitHub for its Atom Editor. But it was later extracted from Atom into an independent platform to allow developers to build cross-platform desktop applications that target Windows, Linux and MAC with web technologies i.e JavaScript, HTML and CSS and related tools and frameworks.

Electron uses Chromium, the open source browser created by Google and used as a base for many popular browsers. That means, Electron is simply a web container with a rich API that integrates your "web" application with the native features of the underlying system. 

What mekes Electron more powerful than just a web container is the support of the Node.js runtime so you can also make use of the powerful Node.js APIs and ecosystem for building desktop apps just like you build server-side applications.

In recap, Electron provides multiple environments and runtimes such as Node.js, the modern HTML5 APIs and a rich and cross-platform API for accessing native features of the underlying operating system. So you can build powerful desktop applications with no restrictions. 

### Electron Applications Architecture

In Electron, you have two types of processes; the **Main** and **Renderer** processes. 

The main process is the one that runs the `main` script in the `package.json` file. This script can create and display GUI windows, also many Electron APIs are only available from the main process.  **An Electron application has always only one main process**. 

Electron makes use of the chromium browser to display web pages. Each web page runs on its own process called the **renderer** process.

You could also think of Electron as a web browser but unlike typical browsers (such as Chrome, Firefox and Edge etc.) web pages don't run inside isolated or sandboxed environments since they have access to Node.js APIs and by result can communicate with the low level APIs of the underlying operating system. 

**Note that Electron is not a JavaScript binding for GUI libraries but a browser/Node.js runtime that uses web pages as its GUI.**

### Electron Main vs. Renderer Processes

The main process uses the `BrowserWindow` to create native GUI Windows. A window runs a web page in its own renderer process.

Renderer processes are not able to call native GUI APIs so they need to communicate with the main process, via different mechanisms, which will handle the native operations and return any results to the requesting renderer process.  

### Communication Between Renderer and Main Processes

Electron provides different ways to allow communication between main and renderer processes, such as:

- Sending messages using [`ipcRenderer`](https://electronjs.org/docs/api/ipc-renderer) and [`ipcMain`](https://electronjs.org/docs/api/ipc-main) modules;
- RPC communication using the [remote](https://electronjs.org/docs/api/remote) module. 

### Sharing Data Between Renderer Processes

Each renderer process is isolated and only manages its own web page but in many situations, you need to share data between web pages (i.e renderer processes). There are multiple ways to achieve that, such as:

- using the HTML5 APIs like [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), and [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API);
- using the main process as global storage area via the IPC (Inter-Process Communication) system in Electron.

For example; in the main script, add the following code:

```js
global.sharedObject = {
    aProperty: 'value'
}
```  

We simply, add variables and objects to the `global` namespace.

Then, in scripts running in the web pages, add:

```js
require('electron').remote.getGlobal('sharedObject').aProperty = 'new value';
```

We import the `electron` module and we use the `getGlobal()` method of the `remote` property to access and modify global objects.

### Using Node.js in Electron

Electron provides complete access to Node.js in main and renderer processes. That means, you have access to a full and rich ecosystem of APIs and also the modules available from npm which is the biggest repository of open-source modules in the world. 

### Compiling Native Node.js Modules for Electron

Keep in mind that native Node.js modules, such as SQLite3, require re-compilation to target the Electron ABI. You need to use the [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild) package for rebuilding native APIs to target the Electron API

You can follow this [tutorial](https://electronjs.org/docs/tutorial/using-native-node-modules) for more information on how to compile native Node.js module for Electron.

### Accessing Electron APIs

Electron provides a rich and cross-platform ecosystem of APIs. APIs can be accessed from only the remote process or only the renderer processes or both.

To access APIs, you need to import/require the`electron` module:

```javascript
const electron = require('electron')
```

For example, the `BrowserWindow` API, which is only available from the main process, can be imported using the following syntax:

```javascript
const { BrowserWindow } = require('electron');
const window = new BrowserWindow();
```  

If you want to access it from a renderer process, you can simply run:

```javascript
  const { BrowserWindow } = require('electron').remote
  const window = new BrowserWindow()
```


## Creating your First Electron Application

In this section, we'll see how we can create a simple Electron example. 

First, create a folder for your project and add a `package.json` file using:

```bash
npm init -y
```

This will scaffold a `package.json` file with default values:

```json
{
  "name": "electronjs-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

You can also omit the `-y` from the command to be able to specify these information in the prompt.

Next, we need to create two files:

- The `index.html` file which contains an HTML page for buidling the UI
- The `main.js` file which contains code that bootstraps the Electron application and create the main GUI.

```bash
touch main.js index.html
```

 Now we need to change the main property of the `package.json` file to `main.js`:

```json
"main": "main.js",
```

Next, we need to install `electron` from npm using the following command:

```bash
npm install --save-dev electron
```

This command will install `electron` locally. Read [the official guide](https://electronjs.org/docs/tutorial/installation) for more options for installing `electron`.

Next, we need to use a `start` script to run the `main.js` file with Electron. In the `package.json` file and add:

```json
  "scripts": {
    "start": "electron .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Now, let's run a GUI window from the main process. Open the `main.js` file and start by importing the `electron` module:

```javascript
const {app, BrowserWindow} = require('electron')
```

Next, we need to create an instance of the `BrowserWindow` and load the `index.html` file. Add the `createWindow()` function with the following content:

```javascript
  function createWindow () {
    window = new BrowserWindow({width: 800, height: 600})
    window.loadFile('index.html')
  }
```

We set the window's width to *800* and the height to *600.

Next, we need to listen for the `ready` event and we call the `createWindow()` method when the app is ready:

```js
  app.on('ready', createWindow)
```

We can also add code to handle situatios such as when closing all Windows:

```js
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
```

Now to create our UI, we simply use HTML and CSS. Add this simple markup to the `index.html` file:

```html
<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Simple Desktop Application</title>
    </head>
    <body>
      <h1>Hello World!</h1>
    </body>
  </html>
```

Finally, you can use the following command to start the application:

```bash
npm start
```

## Conclusion

In this tutorial, we've used Electron to build a simple desktop application with HTML and JavaScript.