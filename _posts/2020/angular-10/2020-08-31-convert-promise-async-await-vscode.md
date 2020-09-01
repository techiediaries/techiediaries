---
layout: bpost
title: "Convert Promise-Based Chain to Async/Await with VS Code"
image: "images/content/blazor.png"
excerpt: "In this quick example, we'll learn how to convert a promise in JavaScript to async/await syntax manually and then with VS Code"
date: 2020-08-31
tags : [javascript , vscode]
---

In this example, we'll see how to convert a promise to async/await syntax in JavaScript/TypeScript manually and then automatically using a Visual Studio Code feature. 

Now that the Async/Await syntax is becoming popular among JavaScript developers, promises can be, in most cases, avoided but they are still frequently used to write asynchronous logic since they are not deprecated. 

When writing complex logic code, chaining the `then()` functions of promises will make your code looks like spagetti. just like the old callbacks. Using the Async/Await syntax, in this case, will help you write clean and more maintainable code. Let's see how to convert a promise-based chain to the async/await syntax.


## Convert a Promise Chain to Aync/Await Example 1

For example, this a simple example of a promise-based chaining:

```js
fetchData()
	.then(process())
	.then(processAgain());
```

This can be easily converted into `async/await` syntax as follows:

```js
const response1 = await fetchData();
const response2 = await process(response1);
const response = await processAgain(response2);
```

This looks like asynchronous code which is more aligned with how our minds can perceive things.

Promise chaining is used when we have a task with multiple steps with each step making asynchronous operations, like connecting to a database or fetching data from a remote API.

> Please note than when using the `then()` methods, we use local variables that are scoped to the `then()` function of the step but when converting to the `async/await` syntax those variables will become available to all functions so this may make the code less readable 

## Converting Promises to Async/Await with Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/) provides a nice feature that allows developers to convert chains of `Promise.then()` calls to `async/await` calls automatically.

This work with both TypeScript and JavaScript.

You can use it as follows:

- First, select the code that conatins the `Promise.then()` calls,
- Next, click the lightbulb icon which will appear,
- Finally, choose `Convert to async function`.


## Conclusion

Promises are still used by front-end developers and there is nothing wrong about that but using `async/await` will result in code that can be easily  understood and maintainned if done carefully. Async/await is already supported on modern web browsers except for IE. Writing asynchronous code with `async/await` will be more readable and easy maintainable.

You can use Visual Studio Code to easily migrate your old promise-chained code to `async-await` code!
