---
layout: post
title: "TypeScript Tutorial for Angular 7/8 Devs"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn about TypeScript. The language of Angular" 
tags : [ angular , typescript ] 
---

In this tutorial, we'll learn about TypeScript. The language of Angular.

Angular is written in TypeScript and officially recommended to be used with TypeScript, so you’ll need to have some knowledge of TypeScript,  particularly the [object oriented concepts](https://www.techiediaries.com/object-oriented-programming-concepts) such as classes and decorators which are both frequently used in Angular.

> **Note**: If you know JavaScript, you already know a great part of TypeScript, because it’s a superset of JavaScript, except for the class-based OOP features and static types.   



## What is TypeScript?

TypeScript is a strongly-typed super-set of JavaScript developed by Microsoft. This means three things:


- TypeScript provides more features to the original JavaScript language.
- TypeScript doesn't get in the way if you still want to write plain JavaScript.
- TypeScript does also integrate well with most used JavaScript libraries. 


> **Note**: TypeScript is not the first attempt to create a super-set of JavaScript but it's by far the mot successful one. 

TypeScript provides powerful OOP (Object Oriented Programming) features like:


- inheritance,
- interfaces and classes, 
- a declarative style, 
- static typing and modules. 

Although many of these features are already in JavaScript but they are different as JS follows a prototypical-based OOP not class-based OOP.

TypeScript features make it easy for developers to create complex and large JavaScript apps that are easier to main and debug.

TypeScript is supported by two big companies in the software world, Microsoft, obviously because it's the creator but also by Google as it was used to develop Angular from v2 up to Angular 8 (The current version).  It's also the official and recommended language to build Angular apps.

TypeScript is a compiled language which means we’ll need to compile the source code into JavaScript to be able to run it in web browsers which do only understand one programming language. Fortunately, the TypeScript compiler integrates well with the majority of build systems and tools.

You can install the TypeScript compiler using npm and then you can call it by running the `tsc source-file.ts` command from you terminal. This will generate a `source-file.js` file with the same name. 

You can control many aspects of the compilation process using a `tsconfig.json` configuration file. For example, we can specify the module system to compile to and where to output the compiled file(s).

For large projects, you need to use advanced tools or task runners like Gulp and Grunt or code bundlers like Webpack.

You can use [grunt-typescript](https://www.npmjs.com/package/grunt-typescript) and [gulp-typescript](https://www.npmjs.com/package/gulp-typescript) plugins for integrating TypeScript with Gulp and Grunt which will allow you to pass the compiler options from your task runners.
For Webpack, you can use the [loader](https://github.com/s-panferov/awesome-typescript-loader) to work with TypeScript.


More often than not, you'll need to use external JavaScript libraries in your project. You’ll also need to use **type definitions**.

Type definitions are files that end with the `.d.ts` extension — They allow us to use TypeScript interfaces created by other developers for different JavaScript libraries to integrate seamlessly with TypeScript. These definitions are available from the DefinitelyTyped registry, from where we can install them.

To install them you need to use [Typings](https://github.com/typings/typings). It has its own configuration file, which is called `typings.json`, where you need to specify paths for type definitions.


