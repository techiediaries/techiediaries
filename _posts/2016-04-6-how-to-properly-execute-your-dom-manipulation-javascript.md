---
layout: post
url: /properly-execute-dom-manipulation-javascript
title: How to Execute the DOM Manipulation JavaScript
author: mrnerd
tags : javascript
---

In this tutorial, you'll learn about how to **properly execute DOM manipulation JavaScript**.

jQuery is the most popular JavaScript library for DOM manipulation. It has a healthy community and a huge base of users around the world. 

Also, jQuery has a lot of plugins to solve and provide developers with solutions to many common and uncommon web development problems. In this quick tutorial I'm going to show you some tricks to effectively work with JavaScript and jQuery when manipulating DOM.

So let's start with the first thing you should know.

Before you execute any DOM manipulation JavasScript or jQuery code you need to tell the browser to execute your code only when the DOM is ready i.e when all page elements are loaded. Otherwise your code may not function properly. You simply need to listen for the *ready* event which is emitted by the browser when DOM is ready. Basically we have three ways to listen for the DOM ready event:

- With plain JavaScript using `document.addEventListener()`. The only shortcoming of this method, it doesn't work in older IE versions but I guess this is not going to be a problem in future since the majority of users will stop using older versions. You don't have to include jQuery to use this one because it is part of the standard and all modern browsers are implementing it.

```js
document.addEventListener('DOMContentLoaded',function(){
    // Your code goes here
});
```

- Using jQuery ready function:

```js
$(document).ready(function(){ /* your code goes here */});
```

Or just:

```js
$(function(){ /* your code goes here */});
```

So these are the 3 methods you can use to listen for content ready event and you should remember to only execute your DOM manipulation code inside listeners for the ready event, otherwise you code will execute fast before the page has completely loaded missing some elements that your code is working or depending on so you'll end up getting wierd and unexplained errors. I remember when I first begin writing code for DOM manipulation that I always forget to listen for the ready event and wasted a lot of time to figure out what's wrong with my code so hope you do not waste your time too.

I forget to mention that there exists also another way which is used especially if your target old browsers because it works everywhere regarding of the use of jquery or a modern browser.

```js
function r(f){/in/.test(document.readyState)?setTimeout(r,9,f):f()}
```

This method checks for `document.readyState` if it contains the "in" string for "loading", if yes we set a timeout to recheck again, if not we execute our function f which is supposedly our DOM listener function here. 

So after adding the line above you just need to execute your code in this way:

```
r(function(){
    // your code goes here 
});
```

Original code by original author for this method is here

## Conclusion

In this quick tutorial, we've seen different methods for manipulting DOM with JavaScript and jQuery.