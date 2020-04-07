---
layout: post
title: "Installing Node.js v10/12 & NPM on Ubuntu 20.04/19.04"
image: "images/content/
how-to-install-java-8-jdk-8u101-on-ubuntu-via-ppa/titleimage.png"
excerpt: "This post shows you how you can install Node.js on Ubuntu 19.01 and Ubuntu 20.04 for Angular 9 development"
categories: ubuntu
date: 2020-03-02
tags : [ ubuntu , nodejs, angular ] 
---

Node.js is a platform for building server side applications and command line tools using JavaScript. In this post, we'll be looking at how to install Node.js 12, Node.js 11 and Node.js 10 LTS in our Ubuntu 20.04 system. Node.js makes use of NPM to install and manage packages which will be also installed when you install Node.

> **Note**: These instructions are also valid for Ubuntu 19.04

## Why Do we Use Node.JS for Angular?

Angular is a frontend client-side JS framework so it's not based on Node.js which is a server-side platform for building web apps but you will often need to install Node.js in your Angular development environment because Angular CLI, the official tool for generating and working with Angular projects is built on top of Node.

Node.js is required for Angular develoment but it's not necessary in production after your build your Angular project which will produce plain JavaScript files that can be executed by a web browser.

Nowadays, modern frameworks and libraries like Angular, React or Vue all have some sort of a CLI or Command-Line Interface that makes it easy to generate projects that can be served locally without much configurations or particularly dealing with complex build tools like Webpack.

Besides being a server-side platform, Node has also emerged as a convenient platform for building Command Line Interfaces thanks to its rich package ecosystem that contains over 900,000 packages in the npm registry. 

## What is the Angular CLI?

[Angular CLI](https://angular.io/cli) is the official command-line interface tool for Angular develoment that you use to initialize, develop, scaffold, and maintain Angular applications. Since, it's buit on top of Node.js, you can install it from NPM using the following commad after you install Node.js on your system (See the instructions below):

```bash
$ npm install -g @angular/cli
```

## How to Install Node.js 10 LTS and NPM v5.8 on Ubuntu 20.04?

You can install Node 10 LTS using the official PPA, so you don't need to add anything except running the following command in your terminal:

```bash
$ sudo apt-get install Node.js
```

You'll be prompted for your sudo password, enter it and hit **Enter**.

Wait for the installation to finish and run the following command in your terminal to verify the installed version:

```bash
$ node -v
```

You should get **v10.15.2**.



![Install Node.js 10 On Ubuntu 20.04](https://www.diigo.com/file/image/badcbccczobbpcpscszdrpcaood/Screenshot+from+2019-06-15+03-48-33.jpg?k=e242dffd28c10b2d1eb4b878b2bf2f71)

NPM doesn't come installed with Node so you'll need to separately install it. In your terminal, run the following command:

```bash
$ sudo apt-get install npm
```

After finishing the installation, run the following command to verify the installed version:

```bash
$ npm -v
```

You should get **v5.8.0**.


## How to Install Node.js 11 & NPM 6.7 on Ubuntu 20.04?

With the official Ubuntu 20.04 PPA, you'll get Node 10.x LTS version installed but what if you want a newer version? You simply need to add the PPA for the version you want to install.

In you terminal, run the following command:

```bash
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
```

If cURL is not installed on your system, simply run the following command:

```bash
$ sudo apt install curl
```

Finally, you need to run the following command to install Node.js 11.x and npm:

```bash
$ sudo apt-get install -y nodejs 
```

Now, if you run:

```bash
$ node -v
```

You should get **v11.15.0**

You'll also get **v6.7.0** of NPM installed.

## How to Install Node.js 12 & NPM on Ubuntu 19.04?

In the same way, we can install Node v12 on our Ubuntu system. In you terminal, add the following PPA:

```bash
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```

The command will also run the the `apt update` command for you to update your system packages.

Next, run the following command:

```bash
$ sudo apt-get install -y nodejs 
```

You should have Node **v12.4.0** and NPM **v6.9.0** installed on your system.

![Install Node.js on Ubuntu 19.04](https://www.diigo.com/file/image/badcbccczobbpcsqobzdrpcarad/Screenshot+from+2019-06-15+04-32-49.jpg?k=edb41dc4a2d93c7c891840c7e84256ac)
Happy coding!

## Installing Node.js Using NVM

You can also use [NVM](https://github.com/nvm-sh/nvm) for installing Node.js on your Ubuntu system. NVM stands for Node Version Manager and it's simply a POSIX-compliant bash script for installing and managing multiple active Node.js versions.

Open a terminal and start by installing the script using either cURL or wget:

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

Next, you can run the following command to list the available Node versions:

```bash
$ nvm ls-remote
```

Next, you can choose a specific version and install it using the following command:

```bash
$ nvm install 10.15.2
```

This will install Node.js 10 LTS on your Ubuntu 20.04 system.

## Installing Node.js from the Official Website

You can simply head over to the [official website](https://nodejs.org/en/download/) and download the required binary for your system. There are binaries for Linux/Ubuntu, macOS and Windows both for 64bit and 32bit processors.

## Installing Node.js via a Package Manager

You can refer to the [official docs](https://nodejs.org/en/download/package-manager/) for instructions on how to use the official package manager in your system (In our case, Ubuntu) to install Node.js.

## Conclusion

Throughout this post, we have seen why we need to use Node.js for Angular 9 development and how we can install Node v10 LTS, Node v11 and Node v12 and NPM (Node Package Manager) on our Ubuntu 20.04 system. These instructions also work on Ubuntu 19.04 LTS.






