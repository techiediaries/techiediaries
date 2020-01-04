---
layout: post
title: "HTML5 History API"
image: "images/content/html5.png"
excerpt: "The HTML5 History API allows you to control the browser history from JavaScript. For example, you can navigate the history stack and set the URL of the address bar dynamically and without a full-page refresh" 
tags : [html, html5 , javascript]
---

The **HTML5 History API** allows you to control the browser history from JavaScript. For example, you can add entries in the *history* object (`window.history`) or set the URL of the address bar dynamically and without a full-page refresh (which means you can navigate between pages, of the same origin, without manually entering URLs and pressing *Enter*).



Before the HTML5 History API, developers had to use `hash` URLs to change the current URL (`window.location="#hash"`) without reloading the page and create client side routing in Single Page Applications (SPAs). 

Nowadys and thanks to HTML5 History API, we can create complex SPAs and fully fledged apps that run on the client side without URL hashes. Most client side libraries such as React, Vue or Angular etc. make use of the History API to create advanced routing which abstracts the inner details of this API in a high level interface that makes client side routing a breeze.


The `window` object has a `history` object that represents the browser's history. The object provides many methods and properties that let you manipulate the user's history jsut like you would manually do using the browser's back and forth buttons.

The HTML5 API is available from the `window.history` object. You can simply open the console of your browser and type `window.history` which will show you the obeject and its properties:

![HTML5 History API](https://i.imgur.com/Iyyv2A5.png) 

The History object exposes many methods:

- back(): go back in history, e.g. `window.history.back();`
- forward(): go forward in history, e.g. `window.history.forward();` 
- go(): load a page, by its position index relative to the current page (index *0*), from the session history, e.g. `window.history.go(-1);` is equivalent to calling back and `window.history.go(1);` is equivalent to calling forward. 
- pushState(): push a state to the history stack, e.g. `history.pushState({ foo: "bar" }, "new page", "newpage.html");`
- replaceState(): replace a state in the history state, e.g. `history.replaceState({ foo: "bar" }, "new page", "newpage.html");`
- length: stores the length of the history stack, e.g. ` window.history.length;`
- state: stores the current state, e.g. `const currentState = history.state;`

From the Developer Tools console, you can also run the methods of the HTML5 History API and see live results on your current page. Start with a new tab, open *DevTools* (I'm using Chrome) then activate the console panel then run the following line of JavaScript code:

```js
history.pushState(null, null, 'path');
```

This will add a *path* string to the end of the current URL `https://www.techiediaries.com/path`: 

![HTML5 History API](https://i.imgur.com/tbFLDcs.png)

Before running the previous code I have already visited `https://www.techiediaries` from the address bar.

The first parameter of the `pushState()` method is the data which can be passed to the new state, the second parameter is the title and the third is the URL. Note, that you can't pass URLs with different origins from the current one, otherwise you'll get a Same Origin Policy error that will prevent you from accessing the page. So if you run:

```js
history.pushState(null, null, 'https://www.google.com');
```

You will get the following error:

>**Uncaught DOMException: Failed to execute 'pushState' on 'History': A history state object with URL 'https://www.google.com/' cannot be created in a document with origin 'https://www.techiediaries.com' and URL 'https://www.techiediaries.com/path2'.**

![HTML5 History API](https://i.imgur.com/dSIu6DD.png)


## References

- [Manipulating the browser history](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [Manipulating History
for Fun & Profit](http://diveintohtml5.info/history.html)
- [Implementing pushState for twitter.com](https://blog.twitter.com/engineering/en_us/a/2012/implementing-pushstate-for-twittercom.html)
- [What's the shebang/hashbang (#!) in Facebook and new Twitter URLs for?](https://stackoverflow.com/questions/3009380/whats-the-shebang-hashbang-in-facebook-and-new-twitter-urls-for/3951093#3951093)


