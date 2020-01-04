---
layout: post
url: /node-js
title: Node.js Tutorial & Examples (Node.js 10)
author: ahmed
excerpt: "Node.js tutorial for biginners" 
tags : [nodejs , node , js , javascript]
---

In this **Node.js** tutorial for biginners, you'll be getting started with Node.js by learning how to build example Node.js applications from CLI tools to server side web applications.

In this first tutorial about Node.js, We'll be introducing Node.js.

This first Node.js tutorial targets beginners who have never heard of Node.js before, but also developers with prior working knowledge of Node.js 

This tutorial is first in a series of tutorials about many intermediate to advanced Node.js subjects. In this one we first introduce Node.js for those who have never heard of it with essential background information about this platform.

Node.js is misunderstood by many developers. In fact, It's a platform and not a programming language, the language used in Node.js is JavaScript, which is based on Chrome V8 engine. The essential goal of Node.js was to bring JavaScript into the server world, after being for many years a language of the the browser in the client side, as you might know JavaScript is one of the most, if not the most popular language in the world. Developers around the globe use JavaScript, despite the ambiguities related to this language, and all client browsers understand JavaScript, so bring it to the server was a brilliant and very useful idea which had and still has a great success.

As I've said, Node.js is not a language neither a server so you can not compare it to, let's say for example, the well known Apache web server or nginx and you can not compare it to PHP like some developers tend to do. It's a platform and a runtime environment built on top of V8 engine to offer a solid event driven I/O API for developers to build servers and other tools writing only JavaScript code.

Another thing that made Node.js great is that It opened the door for the community to create many tools to ease development tasks which helped create the modern JavaScript development ecosystem, ranging from generators, task runners, CSS and HTML minifiers, obfuscators, build tools, compilers etc. Thanks to Node.js and these tools web and hybrid mobile development has changed dramatically from what is was before, making developers more productive.

Many servers and frameworks have been built on top of Node.js which respond to many industry requirements, one of the most used and known servers and frameworks are Express.js which is a very powerful web framework and server and the base for other great frameworks, another framework built on top of Node.js is Meteor which is considered an innovation in how modern web applications development should be. 

Node.js use modules to give developers the ability to extend it, developers around the world have created a lot of modules which can be installed via its npm registry with just one command line, you can find an npm module for any functionality you are looking for which made Node.js one of the favorite platforms for developers.

NPM stands for Node Package Manager. It's used by Node.js developers to install and uninstall Node.js packages or modules via a central registry which represents the largest ecosystem of open source libraries in the world. 

Developers has also used the Node.js platform to create mobile frameworks to build hybrid mobile applications that run across different devices such as Android and iOS with Javascript, HTML and CSS.    

You can use Node.js to develop not only for the web and mobile but also for the Desktop thanks to a new project called nw.js  which  was created by intel,nws.js permits node.js modules to be called from the DOM or Document Object Model ,developers can use their existing skills with Javascript,html and css to create Desktop applications too.

Thanks to Node.js JavaScript is available on the server to create static,API and real-time servers and on the desktop as a platform that enable developers to use and create tools to assist and help them with many everyday requiring tasks,many frameworks and tools to build hybrid mobile applications are Nodejs modules so Node.js became a necessary platform that should be present in any developer's computer even if he a PHP or Python or other server side language web developer, as a modern web developer you should have the knowledge to use it at least to be able to exploit its extensive list of web and hybrid mobile developer tools.

Please note that the primary practical use of Node.js is to create real time rich  media applications which exchange extensive amount of data between its client and the server side but it is also used to create traditional web applications that serves server rendered html files to the client.   

Node.js is a runtime with a pwoerfull set of librraires and builtin modules for executing many tasks such as writing and reading files and many io filesystem api 

Node.js is a single threaded platform which uses only a single thread and asynchronous non blocking callbacks to execute concurrent tasks without waiting for any task to finish  

You can easilly create basic http servers with the builin module http,using a few lines of javascript code 

```js
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(9090);
 
console.log('server listen on port 9090'); 
```

This basic http module doesn't offer complex web server tasks out of the box but there are other modules which you can use instead of http module to create full featured web servers such as  Express which is a framework to create web applications with their own integrated server.

## How to install the current version of Node.js

Depending on your operating system, you'll find binaries in Node.js official website `https://nodejs.org/en/`. 

If you use Ubuntu I'm going to show you how to install the latest version of Node.js via Ubuntu Package Manager  

How to install Node.js modules?

You can install Node.js modules via npm or manually which is not very recommended especially if the module has many dependencies which you need to get them and install them manully too which can be a painfull task.

Installing via the Node package manager or npm is the easy and recommended way to install modules ,if Node.js and npm are installed in your system then it is a matter of  one command line to download and install your module for example to install express you need to enter the following line

```bash
$ npm install  expressjs
```

After the command finishes Express.js will be installed locally in your project, if you want it to be installed globally and will be available to any Node.js project just add `-g` to the previous line.

```bash
$ npm install -g expressjs
```

You can also install many modules automatically by using a `package.json` file, enter the project directory, execute. 

```bash
npm init 
```

Your `package.json` will be created, you need to modify it to include all dependencies you want to install with their versions. This is an example of a `package.json` file:

```json
{
  "name" : "testServer",
  "version" : "0.1",
  "dependencies" : {
    "express" : "4.0.x"
  }
}
```

Now just enter: 

```bash
npm install
```

And wait for your modules to finish installing.

## Hosting Solutions for Node.js Applications

- www.modulus.io 
- www.heroku.com
- www.openshift.com

Popular books to learn Node.js

- Node.js in Action 
- Smashing Node.js: JavaScript Everywhere
- Mastering Node.js
- http://book.mixu.net/node/
- http://chimera.labs.oreilly.com/books/1234000001808/index.html

- https://github.com/visionmedia/masteringnode


## Concluion 

Last word about Node.js, It is an open source non blocking or aynchronous and very efficient IO run-time environment available for major operating systems such as Linux, Windows and MAC OS

That will be all for this article, you are welcome to comment for any clarification or remark, in the next article I'm going to show you how to create Node.js modules.

Have a great learning experience! 

 