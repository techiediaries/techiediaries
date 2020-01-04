---
layout: post
title: "How To Use External Plain JavaScript Libraries in TypeScript Projects"
image: "images/content/use-external-javascript-libraries-typescript-projects.png"
excerpt: "How To Use External Plain JavaScript Libraries in TypeScript Projects" 
tags : [javascript,typescript]
---

{% include image.html 
    img="images/content/use-external-javascript-libraries-typescript-projects.png" 
    title="How To Use External Plain JavaScript Libraries in TypeScript Projects" 
%}

If you are into front end development then your probably have used or at least heard of all modern frameworks 
built in TypeScript or ES6 (TypeScript is just ES+) and used with build systems such as Webpack and SystemJS .
TypeScript is a modern language created by Microsoft ,it's a strongly typed superset of JavaScript which has support for 
OOP and other modern features such as decorators . TypeScript compiles to JavaScript since browsers and node understand 
JavaScript .

Writing code in TypeScript makes developers more productive and able to manage complexity of bigger and complex 
projects but how about all existing JavaScript libraries out there that you can't live without them  ? Can you still
use them with TypeScript ?

The short answer is definitely YES ! but you need some intermediate steps !

Please note that ,you can write plain old JavaScript in a TypeScript project without any problems since 
JavaScript is a subset of TypeScript ,you only need these steps if you are planning to use an external JavaScript library 
with TypeScript .

There are many scenarios that we need to cover i.e in the browser and in a node environment .So lets started .

The first step you need to do if you want to include a plain JavaScript library in TypeScript is to look for 
typings for that particular lib .The majority of popular libraries have typings so they can be easily used 
with TypeScript but sometimes you can't find typings for a library ! in this case you have two options :

Either create typings for that library but this process can be time consuming and needs a deep knowledge of 
the library internals .

Or you can just follow these simple steps to include the library without using typings .

First include the library source file before the compiled TypeScript file of your project ,using script tag 
in your HTML file .

Next ,In your TypeScript file before using the library ,add 

    declare var libGlobal: any;

You need to replace libGlobal with your library global object which gives access to the library API .

Then just use any library function just like normal .    

Using external libraries with TypeScript project for Node environment
---------------------------------------------------------------------------
---------------------------------------------------------------------------

You have decided to write Node apps in TypeScript instead of plain JavaScript so how can you use node modules 
available from npm ?

Lets suppose you have installed some node library using npm :

    npm install --save mylib 

 If you try to use the import system of TypeScript to import this lib 

    import * from "mylib";

This will fail with errors such as :

    ........: error TS2307: Cannot find module 'mylib'.

This can be solved by installing typing for mylib if they do exist .

In case typings for your li don't exit you'll try to use the usual require style of Node  

    var mylib = require("mylib");

This also will fail with error :

    .......: error TS2304: Cannot find name 'require'.               

Which means TypeScript can not recognize require statement .But this can be easily solved by installing 
the typings for node ,which are available from npm ,using : 

    npm install @types/node --save


So if you are using Node ,just install the node typings and you can use any JavaScript library which can be 
imported using the require statement ( CommonJS modules ) .

Conclusion 
--------------------
--------------------

We have seen how we can use external JavaScript libraries with TypeScript language when developing applications 
for the browser or node environments .

 





