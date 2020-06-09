---
layout: post
title: "JavaScript ES6 Arrow Function Default Parameters & Multiple Return Values"
image: "images/content/javascript.png"
excerpt: "In this post, you will learn about the JavaScript function default parameters and return values." 
tags : [ javascript ]
---

Just like most programming languages, [JavaScript](https://www.techiediaries.com/javascript/) provides functions which are logical unit of code instructions that execute a specific task or implement a certain algorithm. A function has zero or more parameters and a single return value.

## How to Declare a JavaScript Arrow Function?

Let's take an example of a JavaScript function using the arrow syntax:

```js
const func = () => {
  // Other instructions
}
```

## How to Declare a JavaScript Arrow Function with Parameters

This function takes no parameter. Let's now see a function with one parameter:

```js
const func = param => {
  // Other instructions
}
```

Or also two parameters:

```js
const func = (param1, param2) => {
  // Other instructions
}
```

## How to Declare JavaScript Functions with Default Values?

In ES6, functions can take parameters with default values:

```js
const func = (param1 = 'param1', param2 = 'param2') => {
  // Other instructions
}
```

So now if you call the `func` function without passing any parameters:

```js
func();
```

The `param1` and `param2` variables will have the 'param1' and 'param2' values as initial values.


## How to Return a Value from A JavaScript Function?

JavaScript functions always return a value. If no value is explicetly returned from the function, `undefined` is returned.

You can use the `return` statement to return a single value from a function. For example:

```js
const func = (param1 = 'param1', param2 = 'param2') => {
  
  return param1 + ' ' + param2;
}
```

We can call the function and assign the returned value to a variable like so:

```js
const ret = func(); // ret = 'parma1 param2'
```
 
## How to Return Multiple Values from a Function in JavaScript?

You can only return one value from a function. But you can use various way to simulate returning multiple values. 

You can use arrays and objects and use object/array destructuring assignment to get individual values.

Let's see this by example:

```js
const func = (firstName = 'kaima', lastName = 'Abbes') => {
  
  return [firstName, lastName];
}

const [firstName, lastName] = func();
```

We call the function which returns an array and we use the array destructuring syntax to get the individual return values.

Let's see another example using an object:

```js
const func = (firstName = 'kaima', lastName = 'Abbes') => {
  
  return {firstName: firstName, lastName: lastName};
}

const {firstName, lastName} = func();
```

We call the `func()` function and we use the object destructuring assignment to get individual return values.

## Conclusion

In this post, we've seen how to use arrow functions with default parameters and multiple return values.





