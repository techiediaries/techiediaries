---
layout: post
title: "JavaScript ES6 by Example — Array.find() & Array.findIndex()"
image: "images/content/js.png"
excerpt: "Array.find() and Array.findIndex() are two new methods in JavaScript ES6. They make searching arrays more easier than before without writing cumbersome code and loops." 
tags : [javascript]
skipRss: true
---

`Array.find()` and `Array.findIndex()` are two new methods in JavaScript ES6. They make searching arrays more easier than before without writing cumbersome code and loops.

Let's see them in more details with simple examples.

## The `Array.find()` Method by Example 

The `Array.find()` method is used to search for the first element in the array that verifies the passed predicate. 

Let's take this simple example of an array of numbers:

```js
let myArr = [9, 3, 2, 4, 9, 11, 19];

myArr.find((v)=>{
    return  v % 2 === 0;
});
```

In this example, we are looking for the first even number (can be divided by zero) in the array. In this case, this will return 2.

the `find()` method calls the `(v)=>{ return  v % 2 === 0;}` predicate for each element in the array until the predicate returns true. In this case the element is returned. If no element is found, `undefined` is returned.


> **Note**: A predicate is simply a function that returns a boolean value i.e true or false.

## The `Array.findIndex()` Method by Example

The `findIndex()` method is quite similar to the `find()` method but returns the index of the element instead of the element itself.

It takes a predicate and returns the index of the first element in the array that satisfies the predicate. If no element exists `-1` is returned.

Let's take the previous example: 

```js    
let myArr = [9, 3, 9, 4, 9, 11, 19];

let ind = myArr.findIndex((v)=>{
    return  v % 2 === 0;
});    

if(ind !== -1) {
      console.log("There exists at least one even number in the array: ", myArr[ind])
}
```

Instead of returning 4, the `findIndex()` method returns its index which is 3.

We save the index in the `ind` variable then we check if it's different than `-1`. In this case, we display **There exists at least one even number in the array:** in the console along with the element corresponding to the returned index.

## Wrap-up

We've seen examples of using ES6 `Array.find()` and `Array.findIndex()` method which provides easy ways to search for an element in JavaScript arrays.
