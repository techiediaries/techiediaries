---
layout: post
title: "How to Create and Publish Node.js Modules to NPM"
image: "images/content/getting-started-with-npm-or-nodejs-package-manager/titleimage.png"
excerpt: "In this tutorial we are going to learn the essential concepts about npm or the nodejs package manager"
tags : nodejs
---

**In this tutorial, we'll learn how to create a Node module and publish it to the npm registry.**

Thanks to Node.js JavaScript developers can build server applications and become full-stack web developers. Node is built on the V8 runtime (Rendering engine behind Chrome) and is written in C++ which makes it very fast. Despite being built, in the first place, as a server technology - developers are using it to build tools that can be used for development, particularly for automating time consuming tasks such as assets minification, compressing and building etc. As a result Node didn't just affect the world of server applications but has also changed client side development.

Popular frontend development frameworks and libraries like Angular, React, Vue and Ionic all provide CLI tools based on Node.js for helping developers quickly get started developing apps. 

In this tutorial, we'll learn how to get started using NPM, the official package manager for Node.js


## What's NPM

Node.js has its own packages manager, called npm (Node Package Manager) that developers can use to install existing packages and also publish their own packages so other developers can re-use without re-inventing the wheel.  

You can access the npm registry from the http://npmjs.org/ address.

You can use npm to publish open source Node.js modules for free but your module will be publicly accessible for anyone to use. If you want to publish a private module you can simply opt in for a paid plan.   

NPM is the official package manager for Node.js that you can use to install Node.js modules from the command line interface. 

## Your First Steps with Node.js

Before we can start learning how to use npm, we need to install Node.js. This tutorial will not cover how to install Node.js. You can simply ahead over to [official website] (https://nodejs.org/en/download/) and grab the installer for your operating system.

You can make sure you have Node installed on your system by running the following command in your terminal:

```bash
$ node --version
```


Next you need to make sure you have the latest npm version:


```bash
$ npm install npm@latest -g
```

If you get an EACCES error you just need to [fix the npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

After getting the latest npm version installed, the next step would be to create an npm account which is needed of you want to be able to publish your package(s).

Go to [this signup page](https://www.npmjs.com/signup) and submit the necessary information to create your account then make sure to confirm your email address.

Now you need to provide the npm executable with your configuration information. Simply run the following commands in your machine:

  
```bash
$ npm set init.author.name "YOUR_AUTHOR_NAME"
$ npm set init.author.email "YOUR_EMAIL_ADDRESS"
$ npm set init.author.url "YOUR_AUTHOR_URL"
```

Next you need to add a user using the following command:

```bash
$ npm adduser
```

This will ask for your credentials - the username and email.

You just need to do that for the first time, npm will save your information in the `~/.npmrc` file so you don't need to re-enter them each time you want to publish a new npm module.

![Publish NPM Package](/images/content/getting-started-with-npm-or-nodejs-package-manager/npm-adduser.png)

Now let's start building our first Node.js module and publish it to npm.

An npm module or a Node.js module is simply a [CommonJS](http://www.commonjs.org/specs/modules/1.0/) module. Don't worry if you don't know anything about CommonJS. To be able to create a module you just need to know these two things: 

- How to import or require other modules with the `require` method.
- How to export JavaScript functions and other objects with `module.exports`.

The boilerplate for any module that you create should be similar to the following example:



	var module1 = require('module1');
	var module2 = require('module2');
	/* ... */
	var modulex = require('modulex');


	module.exports = function() {

		console.log('hello nodejs');
	}  


The module we are going to build is a simple command line utility that prints the current date and time to the console when you invoke it via your terminal CLI on linux and macOS or the command prompt on Windows.

So go ahead and create a folder to host your Node.js module

```bash
$ mkdir techietime && cd techietime
```
At this point you should have a name for your npm module and you should make sure you choose a unique name by searching the npm registry for your chosen name. You can also use namespaces.

Next you need to initialize your npm module. In your terminal run the following command:

```bash
$ npm init
```

You'll be prompted for some information (name, version and license etc.) that you need to enter and then npm will create a `package.json` file. Basically this is your first npm module.

![NPM module](/images/content/getting-started-with-npm-or-nodejs-package-manager/npm-init.png)

This is the content of the `package.json` file:

	{
		"name": "techietime",
		"version": "1.0.0",
		"description": "a nodejs module which shows you current date and time when you ask it",
		"main": "index.js",
		"scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1"
		},
		"keywords": [
		    "time",
		    "date"
		],
		"author": "Ahmed Bouchefra <mr0.0nerd@gmail.com> (http://techiediaries.com)",
		"license": "MIT"
	}


Next, create and `index.js` file (the main entry of our module):



```bash
$ touch index.js
```

![NPM Module](/images/content/getting-started-with-npm-or-nodejs-package-manager/npm-module-folder.png)

We are going to print the current time and date in a nice colorized format so we need to install some useful npm modules to re-use them in our module.

Let's start with `chalk` - a nice npm module which colorizes your terminal screen output:

```bash
$ npm install chalk --save
```

Next, let's install `clear` - a handy npm module which allows you to clear the terminal screen:


```bash
$ npm install clear --save
```

Next, let's install `figlet` - a module which allows you to create ASCII art:

```bash		
$ npm install figlet --save
```

Since we are creating a CLI utility, we don't need to export any code but we need to `require` the modules we've just installed. Open the `index.js` file and add the following content:  

	#!/usr/bin/env node

	/**
	* Print the current date and time
	*
	* @return {String}
	*/


	"use strict";

	var chalk       = require('chalk');
	var clear       = require('clear');
	var figlet      = require('figlet');


	clear();
	console.log('\n');

	console.log(
		chalk.white(
		    figlet.textSync('TechieTime', { horizontalLayout: 'full' })
		)
	);
	var currentTime = 'Current date and time  : ' + new Date();

	console.log('\n');
	console.log( currentTime );
	console.log('\n');

This is a CLI utility so we need to make it globally available. To do that we have added `#!/usr/bin/env node` at the top of the `index.js` file: 

Next, open the `package.json` file and add:


	"bin": {
		"techietime": "./index.js"
	}

This tells npm the name of the file to execute when we invoke our module from the terminal.

Now you need to install your module globally using the following command from your module's root folder:


```bash
$ npm install -g 
```

You can run `techietime` from any location in your terminal. You should get the current time printed.

![NPM module](/images/content/getting-started-with-npm-or-nodejs-package-manager/npm-showtime.png)


## Publishing your Module to The NPM Registry


Head back to your terminal and navigate to your module's folder:


```bash
$ cd techietime
```

Next, enter the following command to publish your module to npm:


```bash
$ npm publish
```

Before publishing it's preferable to add a `readme.md` file for documenting your module:

```bash
$ touch readme.md
```

Open the `readme.md` file and add your module info. For example:

{% raw %}

TechieTime
=========

A Node.js module that prints your current date and time from your terminal.


## Installation

  npm install techietime --save

## Usage

Open your terminal CLI and enter techietime 


## Contributing

You are more than welcome to contribute 

## Release History

* 1.0.0 Initial release

{% endraw %}

The npm registry is not the only way to make your module available for others to use. You can also push it to GitHub. It can be installed using the repository URL. For our case:

```bash
$ npm install git://github.com/techiediaries/techietime.git
```

Make sure you have Git installed and then initialize a new repository using the following commands:



	cd techietime
	git init
	git add .
	git commit -m "first commit"
	git remote add origin https://github.com/techiediaries/techietime.git
	git push -u origin master


You will be prompted for your GitHub credentials, enter them and hit `Enter` then wait for your repository to be pushed to GitHub.

That's it. You can get the code of this tutorial from this [GitHub repository](https://github.com/techiediaries/techietime). 

## Conclusion


In this tutorial we have seen how to create a Node.js module, publish to npm and push it to GitHub for other developers to be able to install from npm. 


		
References
--------------

the npm docs <a href="https://npmjs.org/doc/" ref="nofollow"> https://npmjs.org/doc/</a>

package.json contents <a href="https://npmjs.org/doc/json.html" rel="nofollow">https://npmjs.org/doc/json.html</a>
		   