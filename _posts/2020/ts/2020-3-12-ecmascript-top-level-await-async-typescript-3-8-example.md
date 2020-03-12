---
layout: bpost
title:  "EcmaScript Top-level Await Without Async in TypeScript 3.8+ By Example"
date:   2020-3-12
categories: typescript 
tags: [typescript]
---

In this article. we'll learn about the top-level await syntax introduced in TypeScript 3.8+.

## Understanding `Async/Await` in JavaScript/TypeScript

In JavaScript, we can use async/await syntax for working with asynchronous operations in a synchronous way. It's a syntax sugar over promises that enables developers to avoid using the `then()` callbacks and call the operations synchronously. For example, let's take this example async function which sends a request using the JS fetch API:

```ts
async function getData() {
    let res = await fetch('/data.json');
    let data = await res.json();
    return data;
}
```

Since the returned data is itself a promise, we can call this function as follows:

```ts
getData().then((v) => console.log(v));
```

Inside the `getData` async function, we can use the await keyword with the JavaScript `fetch` method to avoid using the `then` callback of the returned promise:  

```ts
function getData() {
    return fetch('/data.json').then(res => {
        return await res.json();
    })
}
```

The previous syntax is clear and align more with how we read code in our mind. 

## Await Without Async!

The `await` syntax can be only used inside `async` functions, and that's not generally a problem because we simply need to declare the function as `async` by prepending the `async` keyword to its definition. 

One clear exception of this is when we need to await an asynchronous function in the top level of your source code i.e outside any functions. In this case, we'll get a syntax error. Thit is is also useful when using the developer console on Chrome.

For example, we can't do this:

```ts
let res = await fetch('/data.json');
let d = await res.json();
console.log(d);
```


The top-level await is a Stage 3 proposal for ECMAScript and once implemented in JavaScript will enable developers to run the previous code without errors so we can await any asynchronus function that returns a promise directly at the top level of a module or a script.

## EcmaScript Top-Level Await in TypeScript 3.8

TypeScript 3.8 anticipates this and implemented many features of the coming ES2020 standard such as private fields and the top-level await.

This means our previous code can run without any errors, you only need to call inside a module.

Any TypeScript file with import or export statements can be considered as a module, so we onl need a slight modification of our code:

```ts
let res = await fetch('/data.json');
let d = await response.json();
console.log(d);

export {}
```

You also need to set the target compiler setting to be `es2017` or above, and the module compiler setting to be `esnext` or `system`.

## Conclusion

The top-level await syntax is a long awaited feature among JavaScript developers which will be implemented in the next EcmaScript standard but until then we can use it with TypeScript v3.8+ from now on. 