---
layout: bpost
title: "Using Async/Await with Array.Reduce"
image: "images/content/angular.png"
excerpt: "In this quick example, we'll learn how to use Picture-in-Picture with JavaScript and Angular 10"
date: 2020-08-31
categories: angular
tags : [angular, javascript]
---

In this quick example, we'll learn how to use `Async/Await` with `Array.Reduce()` in JavaScript and how to choose between serial and parallel processing.

>In the first article, we’ve covered how async/await helps with async commands but it offers little help when it comes to asynchronously processing collections. In this post, we’ll look into the reduce function, which is the most versatile collection function as it can emulate all the other ones.

## The reduce function

>Reduce iteratively constructs a value and returns it, which is not necessarily a collection. That’s where the name comes from, as it reduces a collection to a value.

The iteratee function gets the previous result, called memo in the examples below, and the current value, e.

The following function sums the elements, starting with 0 (the second argument of reduce):

```js
const arr = [1, 2, 3];

const syncRes = arr.reduce((memo, e) => {
	return memo + e;
}, 0);

console.log(syncRes);
// 6
```

## Asynchronous reduce

>An async version is almost the same, but it returns a Promise on each iteration, so memo will be the Promise of the previous result. The iteratee function needs to await it in order to calculate the next result:

```js
// utility function for sleeping
const sleep = (n) => new Promise((res) => setTimeout(res, n));

const arr = [1, 2, 3];

const asyncRes = await arr.reduce(async (memo, e) => {
	await sleep(10);
	return (await memo) + e;
}, 0);

console.log(asyncRes);
// 6
```
>With the structure of async (memo, e) => await memo, the reduce can handle any async functions and it can be awaited.

>Concurrency has an interesting property when it comes to reduce. In the synchronous version, elements are processed one-by-one, which is not surprising as they rely on the previous result. But when an async reduce is run, all the iteratee functions start running in parallel and wait for the previous result (await memo) only when needed.

https://advancedweb.hu/how-to-use-async-functions-with-array-reduce-in-javascript/

## Conclusion

The reduce function is easy to convert into an async function, but parallelism can be tricky to figure out. Fortunately, it rarely breaks anything, but in some resource-intensive or rate-limited operations knowing how the functions are called is essential.


```js
const fetchProducts = async () => {
  const categories = [ 'category1', 'category2', 'category3' ];

  return await categories.reduce(async (acc, category) => {
    const res = await fetch(`https://server.com/api/products.json?category=${category}`);

    const products = await res.json();

    acc.push({
      category,
      products,
    });

    return acc;
  }, []);
}
```

In the above example, our function will loop through each of the three locations, make an API call for job posting data, and add the data and location to an array. If you were to run this function, you'd receive the error

jobsAccumulator.push is not a function

. Why is that? The culprit is with our accumulator. If you add a

console.log()

message at the top of the reducer, you'll see during the second iteration that

jobsAccumulator

is an unresolved promise.

To fix this, we need to do two things:

    Set our initial accumulator (source array) as a promise resolution
    Wait on our job posting data to load in each iteration before continuing on to the next


```js
const fetchProducts = async () => {
  const categories = [ 'category1', 'category2', 'category3' ];

  return await categories.reduce(async (acc, category) => {
    const res = await fetch(`https://server.com/api/products.json?category=${category}`);

    const products = await res.json();

    acc.push({
      category,
      products,
    });

    return acc;
  }, Promise.resolve([]));
}
```

The first change to take a look at above is on line 12. We're setting our accumulator as a resolved promise that contains an array. We're doing this so that we can resolve our previous promises before continuing on to the next.

The other key piece is on line 5. We've renamed our accumulator to

previousPromise

so that we can get a better idea of what's happening behind the scenes. Before continuing through each iteration, we're waiting on the previous promise to resolve and then we fetch the next set of job postings.

And it's as simple as that! After the reduce method has finished, our function

fetchJobs()

should return a nicely formatted array of job postings for each location.

https://stackfive.io/blog/using-async-await-with-reduce
