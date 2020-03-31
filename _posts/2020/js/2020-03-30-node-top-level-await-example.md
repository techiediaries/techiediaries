---
layout: bpost
title: "JavaScript/Node Top-lavel Await Example" 
date: 2020-03-30 13:33
categories: javascript 
author: ahmed
tags: [nodejs, javascript]
excerpt: "Before the new top-level await, you can only await for a piece of code inside a (arrow) function that's defined with the async keyword"
---

Before the new top-level await, you can only await for a piece of code inside a (arrow) function that's defined with the `async` keyword. This also means that you can’t make use of the await keyword at the top-level of your code without defining a function first. 

Top-level await allows developers to await for modules just like async functions.

v8 has added support for the top-level await for ES modules. 


This is a new ECMAScript proposal, which has reached stage 3.

> Note: TypeScript 3.8 added support for this feature so you can use it without waiting for the next JavaScript version.

ES modules are synchronous reusable pieces of code inside JavaScript files that have import and export keywords. This has some drawbacks, for example what if you need to call a module which relies on some asynchronous operation?

Top-level await allows you to use the await keyword outside async functions. 

Thanks to top-level await, you can await for resources in ECMAScript modules. This means, other modules who import them.

Top-level await can be only used at the top level of modules. There is no support for regular scripts or non-async functions.


Currently we need to use the `await` syntax inside async functions. This means if we want to use it at the top-level without explicitely defining a function, we need to define an immediately invoked function expression as follows:

```js
(async () => {
  await /* ... */
})()
```

You also can define an arrow function before call it:

```js
const myAsyncFunc = async () => {
  await /* ... */
}

myAsyncFunc()
```


Thanks to the top-level await feature will be able to run code with await in the top-level without wrapping it with any function:

```js
await FunctionReturningPromise(/* ... */)
```

Also check out these resources:

-   [The top-level `await` proposal](https://github.com/tc39/proposal-top-level-await) was an important source of this blog post. Is is very well written and quite readable.
-   [Section “Loading modules dynamically via `import()`”](https://exploringjs.com/impatient-js/ch_modules.html#loading-modules-dynamically-via-import) in “JavaScript for impatient programmers”
-   [Chapter “Async functions”](https://exploringjs.com/impatient-js/ch_async-functions.html) in “JavaScript for impatient programmers”
-   [Chapter “Asynchronous iteration”](https://exploringjs.com/impatient-js/ch_async-iteration.html) in “JavaScript for impatient programmers”

