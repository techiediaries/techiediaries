---
layout: post
title: "querySelector, querySelectorAll and forEach By Example"
image: "images/content/html5.png"
excerpt: "In this example, we'll see how to use the querySelector() method, the querySelectorAll() method and forEach() to iterate over a NodeList object." 
tags : [html, html5 , javascript]
---

In this example, we'll quickly learn to use modern APIs such as the DOM `querySelector()` method and the `querySelectorAll()` method and how to iterate over a **NodeList** object using `forEach()`. We'll also see some techniques used in browsers that don't support iterating over a NodeList using `forEach()` and how to convert a NodeList to an Array using the `Array.from()` method.

`querySelector` and `querySelectorAll` are DOM APIs available on modern web browsers. They are used to query DOM elements that match a CSS selector. You can select elements by class, ids or names or any complex CSS [selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors).

Let's take this simple html example:

```html
<!DOCTYPE html>
<html>
<body>
 <header>
 <h1>
 querySelector & querySelectorAll Example
 </h1>
 </header>
 <div class="container">
 <div class="row">
 <div class="col">.COL 1</div>
 <div class="col">.COL 2</div>
 <div class="col">.COL 3</div>
 <div class="col">.COL 4</div>
 <div class="col">.COL 5</div>
 </div>
 <div class="row">
 <div id="exampleDiv">Example DIV</div>
 </div>
 </div>
 <footer>Copyright 2018</footer>
</body>
</html>
```

Now before the closing `</body>` add a `<script>` tag with the following JavaScript to query `<div>` elements with `.col` class:

```js
const cols = document.querySelectorAll("div.col");
```

The `document.querySelectorAll("div.col")` instruction returns a **NodeList** of the 5 `<div class="col">` elements on the page.

This is a screenshot of the result on Chrome DevTools:

![querySelectorAll Example](https://i.imgur.com/kEqkeQz.png)


A NodeList is a list (collection) of nodes that can be returned by APIs such as `Node.childNodes` and the `document.querySelectorAll()` method.

You can also use `document.querySelector()` to query a single DOM element:

```js
const exampleDiv = document.querySelector("#exampleDiv");
```

This will return the `<div id="exampleDiv">Example DIV</div>` element:

![querySelector example](https://i.imgur.com/C37rzGq.png)


## <a name="querySelectorAll_NodeList_forEach" id="querySelectorAll_NodeList_forEach">Looping Over querySelectorAll NodeList using forEach</a>

In the previous example we've seen that the `querySelectorAll()` method returns a **NodeList** not a typical array. 

You can use JavaScript' `forEach` to easily loop over the elements of a typical array but how about a NodeList?

You can use `forEach` with a NodeList in modern browsers like Chrome and Firefox but not supported in all browsers (Safari, IE and Edge)

```js
cols.forEach(e => { console.log(e); })
```

*cols* is a NodeList.

This is a screen shot of the result on Chrome DevTools console:

![NodeList forEach](https://i.imgur.com/hRgZfpR.png)

Now, how to make sure our code works in all browsers? By simply avoiding looping directly over the return value of the `querySelectorAll()` method.

```js
const cols = document.querySelectorAll('.col');

[].forEach.call(cols, (e)=>{
 console.log(e);
});

```

This is a screen shot of the result on Chrome DevTools console:

![NodeList forEach](https://i.imgur.com/HYF8rS8.png)

Another alternative is to use `Array.from()` method to convert the *NodeList* object to a JavaScript Array but it's only available on modern browsers.

```js
Array.from(cols);
```

This is the result:

![Array.from & NodeList](https://i.imgur.com/cr4KLdx.png)

The `Array.from()` method allows you to create a new Array instance from an array-like (such as arguments and NodeList) or iterable object.

## References

- [NodeList docs](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
- [Array.from() docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)