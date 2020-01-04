---
layout: post
title: "JavaScript ES6 & Node Spread Operator Syntax"
image: "images/content/javascript.png"
excerpt: "In this post, you will learn about the JavaScript Spread syntax or operator." 
tags : [ javascript , nodejs ]
---

Thanks to ES6 we now have the Spread syntax which once you know about it, will change the way your write your JavaScript code in browsers and Node.js and will make it more readable and less complex.

All modern browsers and recent versions of Node.js support the Spread syntax so if you didn't start using it yet, you better start now!

In this post, you'll learn the basic concepts of the JavaScript Spread syntax and how to use it.

## What is the Spread Operator in JavaScript?

The Spread operator is a JavaScript operator that allows you to expand an iterable into its values where you have invoked it. Be wary though that you can't expand an iterable anywhere you want but in specific places where tha values resulted from expanding the iterable are expected depending on what you are spreading (Object literal, array literal or a string etc.).

## What is the Spread Syntax?

The Spread syntax is simply three dots `(...)` preappended to the name of the iterable you want to spread. You can use the Spread operator to expand JavaScript iterables such as objects, arrays and even strings in places where they are expected. For example, in function arguments, as arrays elements or as key-value pairs in object literals.

## How Does the Spread Operator Work?

The Spread operator works by replacing the expanded iterable by its elements. For example, if the iterable is a JavaScript array called `foo = [1,2,3]`, when you invoke `...foo`, the expression will expanded into `1,2,3` so make sure you are calling the Spread operator where it's convenient.

## Using the JavaScript Spread Operator for Arrays by Example

You can use the Spread operator to expand arrays which opens the door for a lot of tricks to replace old and complex JavaScript ways that ware common among developers before ES6 broghut us the `...` syntax. Let's take an example. 

Let's assume we have the following array:

```javascript
const abc = ['a', 'b', 'c'];

const abcdef = [...abc, 'e', 'f'];
```

After executing this code, the abcdef array will be actually `['a', 'b', 'c', 'e', 'f']`.

In this example, the Spread operator (the `...` syntax) spreaded or expanded the abc array into its values and since this happends inside the abcdef array it was expected by JavaScript and as such it merged the values into their new array.

As you can notice, this is simply array concatenation but in a more elegant and easy way.

## Using the JavaScript Spread Operator for Objects by Example

You can use the Spread operator for any iterable including object literals. For objects, this is equivalent to calling the `Object.assign()` used to copy the values of an object into another.

Let's take a simple example:

```javascript
const abc = {a: 'a', b: 'b', c: 'c'};
const abcef = {...abc, e: 'e', f: 'f'};
console.log(efd);
```

After running this code the abcef object will become `{a: "a", b: "b", c: "c", e: "e", f: "f"}`.

## Conclusion

The Spread operator introduced in ES6 is a powerful addition to JavaScript that enable developers to write concise and clean code that doesn't make other devlopers to scratch their head to read your code.

The Spread syntax can actually be used to replace many old techniques used in the JavaScript community and since it's now full supported in all modern browsers and Node.js, most developers are adopting it tp write better code.







