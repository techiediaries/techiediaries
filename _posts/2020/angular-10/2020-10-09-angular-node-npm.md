---
layout: bpost
title: "Node.JS and NPM with Angular 10 and TypeScript Guide"
image: "images/content/angular.png"
excerpt: "In this tutorial guide, we'll introduce Angular and TypeScript developers to Node.js. You'll learn what's Node.js, why would need Node.js as a front-end Angular developer and how to use it with the latest Angular 10 by example"
date: 2020-10-09
tags : [angular]
---

In this tutorial guide, we'll introduce Angular and TypeScript developers to Node.js. You'll learn what's Node.js, why would need Node.js as a front-end Angular developer and how to use it with the latest Angular 10 by example.

We'll also see what versions of Node.js and TypeScript, we need to have to work with Angular 10.

The Angular Framework, Angular CLI, and components used by Angular applications are # Node.JS and NPM with Angular 10 and TypeScript Guide

In this tutorial guide, we'll introduce Angular and TypeScript developers to Node.js. You'll learn what's Node.js, why would need Node.js as a front-end Angular developer and how to use it with the latest Angular 10 by example.

We'll also see what versions of Node.js and TypeScript, we need to have to work with Angular 10.

>The Angular Framework, Angular CLI, and components used by Angular applications are packaged as [npm packages](https://docs.npmjs.com/getting-started/what-is-npm "What is npm?") and distributed via the [npm registry](https://docs.npmjs.com/).


## What's Node.js and Why Would You Need it?

[Node.js](https://nodejs.org/en/) is a JavaScript runtime and platform for running JS in web servers which  allows developers to build backend apps with JS instead of the traditional server-side languages such as PHP or Java.

What's also interesting about Node is that it allows you to build CLI or Command-Line Interfaces that run on the developers' machine. These are not web apps but desktop apps without a GUI interface  that helps developers become more productive with a task or framework. 

For example, Angular has the official CLI utility that allows developers to quickly initialize and work with projects and without this tool setting up a project for the first time, especially for beginners would be much harder.

Angular CLI is actually built on top of Node.JS and can be installed with npm -- the package manager for Node. This is your first contact with Node.JS as a front-end Angular developer. You don't need to learn about the platform APIs but you need to have it installed in your development machine to run the CLI.
 
So, do you need to learn Node.js as an Angular developer? 

That depends! If you only work as a front-end developer, learning Node.js is not required since it's primarily a server-side technology. For working with development CLIs such as Angular CLI, you only need to learn how to install them in your machine  via npm or yarn which another package manager created by Facebook that was meant to solve many of the npm issues.

In the contrary, if you want to become a full-stack web developer with both front-end Angular skills and back-end skills. learning Node.js is a must and this will be much easier than learning other server-side technologies such as php because Node is based on JavaScript or it's actually JavaScript with versatile APIs for accessing the system resources like databases or the filesystem. etc. 
Since JS is the franca-lingua of front-end web development, Angular developers are primarily JS developers. 
Angular is based on TypeScript which is no more than a layer on top of JS that brought static typing to the language.  

As a TypeScript developer, you can use Node.js with TypeScript just like you can use TypeScript tp write front-end web apps with JavaScript.

## How to Download and Install Node.JS?

Now, if you just need to run the Angular CLI to start creating your front-end project then simply head to [the official website](https://nodejs.org/en/download/) and download the right binaries for your system. 

You can also install Angular with nvm, or Node Version Manager, which allows to manage multiple versions of Node in your system without conflicts and make it easy to install any version you need.

> [nvm](https://github.com/nvm-sh/nvm) is a version manager for Node.js, designed to be installed per-user, and invoked per-shell. `nvm` works on any POSIX-compliant shell (sh, dash, ksh, zsh, bash), in particular on these platforms: unix, macOS, and windows WSL.

You can install nvm, using the [install script](https://github.com/nvm-sh/nvm/blob/v0.35.3/install.sh). 

Head over to your terminal and download and run the script manually, using one of the following cURL or Wget commands:

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

The script clones the nvm repository in the `~/.nvm` folder, and attempts to add the source lines from the snippet below to the correct profile file (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

>Angular requires a [current, active LTS, or maintenance LTS](https://nodejs.org/about/releases/) version of `Node.js`. See the `engines` key for the specific version requirements in our [package.json](https://unpkg.com/@angular/cli/package.json).
>To check your version, run `node -v` in a terminal/console window.
 
 
## NPM Package Manager

After you install the CLI with npm, you'll also need to npm to install libraries needed by Angular, the Angular CLI, and Angular apps. These libraries are available as [npm packages](https://docs.npmjs.com/getting-started/what-is-npm). 

All these dependencies are downloaded and installed using the npm package manager.

You can check that you have npm installed, by running the `npm -v` command in your terminal. as [npm packages](https://docs.npmjs.com/getting-started/what-is-npm) and distributed via the [npm registry](https://docs.npmjs.com/).


## What's Node.js and Why Would You Need it?

[Node.js](https://nodejs.org/en/) is a JavaScript runtime and platform for running JS in web servers which  allows developers to build backend apps with JS instead of the traditional server-side languages such as PHP or Java.

What's also interesting about Node is that it allows you to build CLI or Command-Line Interfaces that run on the developers' machine. These are not web apps but desktop apps without a GUI interface  that helps developers become more productive with a task or framework. 

For example, Angular has the official CLI utility that allows developers to quickly initialize and work with projects and without this tool setting up a project for the first time, especially for beginners would be much harder.

Angular CLI is actually built on top of Node.JS and can be installed with npm -- the package manager for Node. This is your first contact with Node.JS as a front-end Angular developer. You don't need to learn about the platform APIs but you need to have it installed in your development machine to run the CLI.
 
So, do you need to learn Node.js as an Angular developer? 

That depends! If you only work as a front-end developer, learning Node.js is not required since it's primarily a server-side technology. For working with development CLIs such as Angular CLI, you only need to learn how to install them in your machine  via npm or yarn which another package manager created by Facebook that was meant to solve many of the npm issues.

In the contrary, if you want to become a full-stack web developer with both front-end Angular skills and back-end skills. learning Node.js is a must and this will be much easier than learning other server-side technologies such as php because Node is based on JavaScript or it's actually JavaScript with versatile APIs for accessing the system resources like databases or the filesystem. etc. 
Since JS is the franca-lingua of front-end web development, Angular developers are primarily JS developers. 
Angular is based on TypeScript which is no more than a layer on top of JS that brought static typing to the language.  

As a TypeScript developer, you can use Node.js with TypeScript just like you can use TypeScript to write front-end web apps with JavaScript.

## How to Download and Install Node.JS?

Now, if you just need to run the Angular CLI to start creating your front-end project then simply head to [the official website](https://nodejs.org/en/download/) and download the right binaries for your system. 

You can also install Angular with nvm, or Node Version Manager, which allows to manage multiple versions of Node in your system without conflicts and make it easy to install any version you need.

> [nvm](https://github.com/nvm-sh/nvm) is a version manager for Node.js, designed to be installed per-user, and invoked per-shell. `nvm` works on any POSIX-compliant shell (sh, dash, ksh, zsh, bash), in particular on these platforms: unix, macOS, and windows WSL.

You can install nvm, using the [install script](https://github.com/nvm-sh/nvm/blob/v0.35.3/install.sh). 

Head over to your terminal and download and run the script manually, using one of the following cURL or Wget commands:

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

The script clones the nvm repository in the `~/.nvm` folder, and attempts to add the source lines from the snippet below to the correct profile file (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

>Angular requires a [current, active LTS, or maintenance LTS](https://nodejs.org/about/releases/) version of `Node.js`. See the `engines` key for the specific version requirements in our [package.json](https://unpkg.com/@angular/cli/package.json).
>To check your version, run `node -v` in a terminal/console window.
 
 
## NPM Package Manager

After you install the CLI with npm, you'll also need to npm to install libraries needed by Angular, the Angular CLI, and Angular apps. These libraries are available as [npm packages](https://docs.npmjs.com/getting-started/what-is-npm). 

All these dependencies are downloaded and installed using the npm package manager.

You can check that you have npm installed, by running the `npm -v` command in your terminal.

In the next article, we'll see how to create an Angular 10 project by example with Node.js.

