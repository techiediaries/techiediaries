---
layout: post
title: "JavaScript Array.from() (NodeList and arguments)"
image: "images/content/html5.png"
excerpt: "In this example, we'll see how to use the Array.from() method to convert array-like and iterable objects to JavaScript Arrays." 
tags : [html, html5 , javascript]
---

The JavaScript **`Array.from()`** method allows you to convert Array-like objects (e.g. `NodeList` and `arguments`) to an instance of Array. 

You can use the `Array.from()` method to avoid the old hacks used by JavaScript developers to do typical tasks such as:

- Get the arguments of a function by converting the `arguments` object into an instance of Array,
- Iterating over a NodeList returned by methods such as `querySelectorAll()`, etc.


## <a name="arguments_Array_slice" id="arguments_Array_slice">Converting Function `arguments` to `Array` Using `Array.slice()`</a>

For example, before you can process the variables passed to a function we need to convert the `arguments` object, which is automatically available inside the function and lets you pass variable number of parameters to the function, you need to convert it to an Array object. Tradidionally, JavaScript developers, do something like the following code:

```js
function aFunction() {
	const args = [].prototype.slice.call(arguments);

	args.forEach((arg) => {
		console.log(arg);
	});
}
```

We call the Array `slice()` method on the `arguments` object which returns an `Array` instance containing the same number of arguments if we don't pass any other parameters to `slice()`.

After getting the `args` Array instance, we can now use Array methods such as the `forEach()` method to iterate over the array and process function arguments.

But what's wrong with this solution? Simply, It's considered hacky! Since the `slice()` method is applied to arrays and the `arguments` object is iterable but is not an instance of `Array`.

## <a name="NodeList_Array_slice" id="NodeList_Array_slice">Converting a `NodeList` to `Array` Using `Array.slice()`</a>

Another old technique, often, used by JavaScript developers is using the `Array.slice()` method to convert a `NodeList` object to an `Array` instance. Many DOM APIs return a `NodeList` object, such as the famous `querySelectorAll()`, so we need to convert it to an `Array` object to be able to apply `Array` methods, like `forEach()` and `map()`, on it. Let's see this by example:

```js
const nodeList = document.querySelectorAll("div");
const array = [].slice.call(nodeList);
```

This is a screen shot of the example in Chrome's DevTools console:

![NodeList & Array.slice() example](https://i.imgur.com/073nw27.png)

You can see that the variable *nodeList* is an instance of `NodeList` and that the variable *array* is an instance of `Array`.

## <a name="JavaScript_Array_from">Using `Array.from()`</a>

Let's now avoid using the old techniques by taking advantage of the newer the `Array.from()` method, available in modern browsers, which is now the proper way for converting iterable objects, such as `arguments` and `NodeList`, to `Array` object.

## <a name="arguments_Array_from">Converting `arguments` to `Array` Using `Array.from()`</a>

We'll start by the function arguments example. The previous code can be transformed to the following code:

```js
function aFunction() {
	const args = Array.from(arguments);

	args.forEach((arg) => {
		console.log(arg);
	});
}
```

Next, we call the function with some arguments and see the results get printed on the console:

```js
aFunction("arg0","arg1","arg2","arg3")
```

This is the output in Chrome console:

![arguments and Array.from() example](https://i.imgur.com/fLNuH7W.png)


## <a name="NodeList_Array_from">Coverting `NodeList` to `Array` Using `Array.from()`</a>

Next, let's see how to use the `Array.from()` method to convert a `NodeList` object an `Array` object. The previous code becomes:

```js
const nodeList = document.querySelectorAll("div");
const array = Array.from(nodeList);
```

This is the result on the console:

![NodeList with Array.from()](https://i.imgur.com/H8dx5oh.png) 

The example shows that *nodeList* is an instance of `NodeList` while *array* is an instance of `Array`.

## <a name="Array-from-Arrow_Function">Mapping Values Using Arrow Functions</a>

The `Array.from()` method lets you enhance the convertion process using the second argument which takes an arrow function. The arrow function is applied to the elements of the iterable object.

Let's say we want to get an array of classNames instead of the whole DOM object 

```js
const nodeList = document.querySelectorAll("div");
const classNames = Array.from(nodeList, node => node.className);
```

This is the example running on DevTools console:

![Array.from Arrow Map](https://i.imgur.com/5m1wOLD.png)


## <a name="Array_from_References" id="Array_from_References">References</a>

- [Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)


