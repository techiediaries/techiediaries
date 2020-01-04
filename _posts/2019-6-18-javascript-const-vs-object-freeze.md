---
layout: post
title: "Constant in JavaScript: const vs. Object.freeze()"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this tutorial, we'll look at the difference between `const` and `Object.freeze()` in JavaScript." 
tags : [ javascript ] 
---

In this tutorial, we'll look at the difference between `const` and `Object.freeze()` in JavaScript.

Objects are commonly used in JavaScript to hold complex values and user defined types. 

The `const` keyword  is used as a modifier before a variable to make it a constant i.e its value can't be changed once it's assigned when intilaizing the variable. For example:

```js
const foo = 'bar';
``` 


If you try to update the value of the `foo` variable, you will get a `TypeError` with **Assignment to constant variable message**. This is a screenshot from Google DevTools:

![JavaScript' const vs. Object.freeze()](https://www.diigo.com/file/image/badcbccczobcaaoeopzdrpocapq/js-const.jpg?k=afcca6da9dd290c0f347cc3387cd63f2)


> **Note**: `let` and `const` are introuced in ES6 as a new way to declare variables. `const` variables can only be assigned during their declaration.
> 
> Please also note that the value itself of a `const` variable is mutable (can be changed) but the symbol that references the value is what actually can't be changed at a later point to reference a different value.
 
The `const` keyword is block-scoped i.e you can not access it outside its immediately containing block and follows the **Temporal Dead Zone** rule which states that a variable can’t be used before its declaration. 

Let's see this example of code and how we can read it:

```javascript
if (true) {
    const foo = 'bar';
}
```

By just looking at this piece of code and thanks to the `const` keyword, we can draw many conclusions:

- We can't access `foo` before the declaration according to the Temporal Dead Zone rule,
- We can't change the `foo` symbol to reference another value,
- We can't access `foo` outside the containg `if` block.

This makes our code more readable and also safer!

For more information, check out [Let’s use `const`! Here’s why](https://ponyfoo.com/articles/var-let-const).

## How about `object.freeze()`?

Since the `const` keyword makes the reference constant but not the value itself, we can update the values for arrays and objects without getting `TypeError`. For example:

```javascript
const foo = {
	value : 'bar'
};

foo.value = 'baaar';
console.log(foo.value);
```

This is a screenshot of the code executing in the console:

![JS const on object](https://www.diigo.com/file/image/badcbccczobcaasepezdrpocpbp/js-const-object.jpg?k=936261d2d0295c7176d7753bc35d069e)

So, as you see, we can mutate the value of the object.

## How to Make a Constant Object in JavaScript?

We simply use the `Object.freeze()` method. Let's apply it to our previous example:


```javascript
const foo = {
	value : 'bar'
};

Object.freeze(foo); 
foo.value = 'baaar';
console.log(foo.value);
```

![JavaScript Object.freeze()](https://www.diigo.com/file/image/badcbccczobcabaddpzdrpocprs/js-freeze-object.jpg?k=4eb6994e7e299f2c9b539d99b8176f1a)

After applying the `Object.freeze()` method to `foo`, we will not be able to mutate its value but it doesn't throw any error, it just silently prevent the mutation of the value.

## Conclusion

In this quick tutorial, we've seen how to create constant variables and objects in JavaScript thanks to  `const` and `Object.freeze()` introduced in ES6. 
 




