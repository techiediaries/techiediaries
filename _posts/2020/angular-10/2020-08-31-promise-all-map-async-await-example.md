---
layout: bpost
title: "Promise.all() and map() with Async/Await by Example"
image: "images/content/angular.png"
excerpt: "In this quick example, we'll learn how to use Promise.all() with Async/Await in JavaScript"
date: 2020-08-31
tags : [javascript]
---

In this quick example, we'll learn how to use `Promise.all()` and `map()` with `Async/Await` in JavaScript to impelemt certain scenarios that can't be implemented with for loops with `async/await`. 

## Example of JavaScript Promises that Rely on Each Other

More often than not when making asynchronous operations, in real-world apps. such as http requests that return some data from a server, you would need to make other subsequent requests that rely to each other.

For example, let's presume, we have the following method for getting a bunch of product categories 


// First promise returns an array after a delay
```js
const getProducts = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(
      () => resolve([{ id: 'product1' }, { id: 'product2' }, { id: 'product3'}, { id: 'product4'}]),
      1000
    )
  })
}
```

We use the `setTimeout` method to resolve the promise with an array of products after one second to simulate a real http request which would normally take some time to return.

After fetching the products, we'll need to get the ID of each product with code similar to this:

```js
// this promise depends on the result of the previous promise
const getProductId = (category) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(category.id), 1000)
  })
}
```

We'll also need a third promise that depends on the second promise: 

```js
const capitalizeId = (id) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(id.toUpperCase()), 700)
  })
}
```

## Combining And Resolving all Promises with For Loop and Async/Await

Now, how to combine all these promises to get the products and capitalize their IDs?

Since the first, returns an array, we can wait for it to resolve and iterate over the array and run the other two promises subsequently i.e for each array item, we wait for the `getProductId` promise to be resolved then call the `capitalizeId` promise as follows:

```js
const capitalizeProductsIds = async () => {
  const products = await getProducts()

  for (let product of products) {
    const productId = await getProductId(product);
    console.log(productId);

    const capitalizedId = await capitalizeId(productId);
    console.log(capitalizedId);
  }

  console.log(products);
}

capitalizeProductsIds()
```


Combining the `async/await` syntax with the `for..of` loop will give us the following output

```console

product1
PRODUCT1

product2
PRODUCT2

product3
PRODUCT3

product4
PRODUCT4

(4) [{…}, {…}, {…}, {…}]
```

That's not the behavior that we are really looking to implement but instead we want to execute the first promise and wait for it to complete, then the second promise and finally the third promise when the second is fully completed.

## Combining And Resolving all Promises with `Promise.all()`, `map()` and `Async/Await`


So instead of using the for loop with the `async/await` syntax, we need to use the `Promise.all()` and `map()` methods with `async/await` as follows:

```js
const capitalizeProductsIds = async () => {
  const products = await getProducts()

  Promise.all(
    products.map(async (product) => {
      const productId = await getProductId(product);
      console.log(productId);

      const capitalizedId = await capitalizeId(productId)
      console.log(capitalizedId);
    })
  )

  console.log(products);
}
capitalizeProductsIds();
```

This is the output:

```console
(4) [{…}, {…}, {…}, {…}]

product1
product2
product3
product4

PRODUCT1
PRODUCT2
PRODUCT3
PRODUCT4
```

So the first promise will be resolved then all the promises returned from the `getProductId()` for each product and then finally all the promises returned from `capitalizeId()` for each ID returned from the previous promises.

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all):

>The Promise.all() method takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises. This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.

