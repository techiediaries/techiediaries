---
layout: bpost
title: "Convert String To Number/Array In JavaScript with React Hooks/Vue.JS Examples" 
date: 2020-05-09
categories: javascript 
author: ahmed
tags: [react, vuejs, javascript]
excerpt: "In this tutorial, we'll learn by example how to convert a string to the corresponding integer or float number or array of numbers using the built-in JavaScript methods with simple React and Vue.js examples"
---

In this tutorial, we'll learn by example how to convert a string to the corresponding integer or float number or array of numbers using the built-in JavaScript methods with simple React and Vue.js examples.

We’ll first start by understanding the methods and tricks used to convert strings to integer and float numbers, or array of numbers and finally see practical examples with simple React, React Hooks and Vue.JS apps.

When passing React props to components, which expect numeral values, in the way we assign regular HTML properties i.e using the `"` quotes, string to number conversion is one of the possible ways we pass the accurate values besides using prop types or passing props via curly braces. We'll see that by example later in the article. 
 
## JavaScript’ `parseInt()` and `parseFloat()`
 
JavaScript provides two built-in methods for casting a string to a integer or float number provided that the string contains a valid integer or float. The two methods are   `parseInt()` and `parseFloat()`.

However, developers have resorted to use other tricks and techniques, other than the built-in techniques for performance reasons.

## How To Convert String to Number In JavaScript

Let’s get started with a simple plain JavaScript example to demonstrate how to convert a JavaScript string to a number.
 
Head back to your command-line interface and create a file named `convert.js`, open it and add the following code:

```js
const num = Number('2020');
console.log(num);
```

Next, go back to the terminal and run the `convert.js` script with node if you have it installed in your development machine:

```bash
node convert.js
```

If you don't have node installed on your system, you can also use your browser to run this code. Simply go to DevTools and write the code in the console and press Enter to run it.
 
`Number` is JS object that can wrap other objects and provides many built-in methods. Don’t use the constructor  i.e `new Number("2020")` since this will return a Number object instead of a number value.

## Convert a String to Integer Using `parseInt()`

JavaScript has a built-in `parseInt()` method that converts a string into a corresponding integer. It takes two arguments. The first argument is the string to convert and the second argument is the numeral base.

Go back to the `convert.js` file and add the following code:

```js
let year = "2020";
let iyear = parseInt(year, 10);
console.log(iyear);//2020
```

The `parseInt()` method takes two arguments, the first argument is the string to parse to an integer and the second argument is the radix or the numeral base, if you are not familiar with this mathematical notion, simply use the ten radix to convert the number to the format used by humans for doing calculation. There are also other common bases such as 2 for the binary systems used by computers or 16 for the hexadecimal system also mostly used in computer tools.

## Convert a String to Float Using `parseFloat()`

JavaScript has another built-in method called `parseFloat()` that converts a string into a float number:

```js
const pieStr = "3.14";
typeof pieStr
"string"
const pie = parseFloat(pieStr, 10);
typeof pie
"number"
```

This method will parse the string into a float number in the base 10 numeral system.

These two methods are frequently used by developers to convert JavaScript strings to integer and float numbers which are enough for simple code examples but for complete apps, particularly those that need to benefit from each available bit of performance (and frankly which app doesn’t require better performance..), developers resort to other tricks with some JS operators which weren't designed for the first place for type conversion.
      
## Convert a String to Number Using the `+` Unary Operator

You can also make use of the unary operator  or `+` before a string to convert it to a number but the string should only contain number characters. For example:

```js
let result = +"2020";
typeof  result
"number"
```

As you see when using the unary plus operator with a JS string, the result is a number.

## Using the `Math.floor()` Method

Just like the `+` unary operator, the built-in `Math.floor()`  can be used to convert a string to an integer. For example:

```js
let result = Math.floor("2020.1");
console.log(result); // 2020
```

Unlike the plus unary operator, if you pass a float number, it will be converted to an integer so use it only when this is the desired behavior.

## Using `* 1`, Multiplying by One

You can also multiply a string by one to convert it into a number. This is has also the benefit of being one of the fastest methods in JavaScript. It's similar to the `+` unary operator, as it doesn't perform conversion to an integer if the number is a float.

```js
'10.0' * 1 //10 ✅
'10.20' * 1 //10.2 ✅
'10.33' * 1 //10.33 ✅
'10000' * 1 //10000 ✅
```

There are also many other methods to convert a string to number in JavaScript such as:

```js
~~num //bitwise not
num / 1 // diving by one
num - 0 // minus 0
```

## What’s the Preferred Method?

Many developers prefer to use the `Number` object, without the the `new` keyword (which creates a new JavaScript object instead of returning a value)

```js
const result = Number('2020') //2020
```

This works for floats as well.

## Performance

All these methods are used by developers but each one is different in terms of performance on different environments, depending on the implementation. 

Generally speaking  `* 1` is reported by many developers as the best for performance. the winner performance-wise 10x faster than other alternatives.


## Converting a JavaScript String to Array of Numbers 

Let’s now see a little advanced example by converting a JS array of strings into numbers using one of the previous methods.

Let’s take the following string:

```js
const numbersStr = "1,2,3,4,5";
```

How to convert this string into a JS array of the corresponding numbers?

First, we need to call the string into an array of multiple strings using the comma as the separator:

```js
const numbersArr = numbersStr.split(',');
```

The result will be:

```js
["1", "2", "3", "4", "5"]
```

Next, we can iterate over this array and convert each string to a number:

```js
const numbers = numbersArr.map((n) => {
    return parseInt(n, 10);
});
```

We can also create a more compact code as follows:

```js
const nums = "1,2,3,4,5".split(',').map( n => parseInt(n, 10))
```

The string is converted to an array, then using the JS `Array.map` method, we map each value with an arrow function returning the integer equivalent of the string.

For increasing performance and writing a shorter code, we can convert the string to number using the other conversion tricks such as the unary plus operator:

```js
const nums = "1,2,3,4,5".split(',').map(n => +n)
```

We can also use the [Array.from](https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/from) method as follows:

```js
var numStr = "1,2,3,4,5";
var nums = Array.from(numStr.split(','),Number);
```

>The `Array.from()` method creates a new, shallow-copied `Array` instance from an array-like or iterable object.

The first argument is a JS array created by splitting the original string to an array of strings and the second argument is a map function that will applied to each element of the array, converting it to a number by wrapping it with `Number`, resulting  in a new array of numbers.

The second line is simply short for:

```js
var nums = Array.from(numStr.split(','),(n) => Number(n)); 
```

## JavaScript String to Number Conversion in Vue.JS

Now that we have seen how to perform string to number conversions in JS, let’s see how to apply that concrete cases when working with popular JS libraries such as React or Vue.JS

Let’s assume we have the following JSON data that will be returned from a REST API:

```json
{
  "products": [
    {
      "id": 1,
      "productName": "P01",
      "price": "114.00"
    },
    {
      "id": 2,
      "productName": "P02",
      "price": "333.00"
    },
    {
      "id": 3,
      "productName": "P03",
      "price": "743.00"
    },
    {
      "id": 4,
      "productName": "P04",
      "price": "449.00"
    }
  ]
}
```
 
In our Vue.js or React app, we can fetch and consume these JSON data from our remote server using the Fetch API or an HTTP client like Axios. We want then to  convert the product prices to numbers from strings.

Here is our JavaScript function:

```js
const fetchProducts = () => {

  axios({
    method: 'GET',
    url: '/api'
  })
    .then(response => {
      this.products = response.data.products
      for (let i = 0; i < this.products.length; i++) {
        this.products[i].price = 1*this.products[i].price;
      }
    })
};
```

This is the Vue.js app:

```js
let newApp = new Vue({  
    el: ‘#app’,  
    data: {  
	products: []
    },  
    methods: {  
	fetchProducts: fetchProducts,  
	created: function() {  
		this.fetchProducts();  
	}  
})
```

## Passing Props as Strings Instead of Numbers: React Hooks Example with JS `parseInt` and `parseFloat` Methods

When working with React, you'll mostly need to pass props to components which can be done in multiple ways. For example, using the regular HTML way i.e:

```jsx
<MyComponent value="2" />
```  

This will pass the `value` prop as a string not a number even if we mean to use the latter type because what the component would expect.

There is multiple solutions for this. If you need the prop value as a number, you simply need to use the string to number conversion tricks and APIs we've seen in the article such as `parseInt()`. 

You can also use curly brackets when passing the prop :

```js
<MyComponent value={2} />
```

You can also make use of React Prop Types to define what data type of a property in a React component should be. 

This is a simple React component with hooks that converts the string props, that would be passed to it from a parent component, into numbers before working with their values:
 
```js
import React from 'react';

export const TimerComponent = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  const [paused, setPaused] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const [time, setTime] = React.useState({
    hours: parseInt(hours, 10),
    minutes: parseInt(minutes, 10),
    seconds: parseInt(seconds, 10)
  });

  const tick = () => {
    if (paused || finished) return;

    // Time up
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      setFinished(true);
    } else if (time.minutes === 0 && time.seconds === 0) {
      
      setTime({
        hours: time.hours - 1,
        minutes: 59,
        seconds: 59
      });
    } else if (time.seconds === 0) {
      
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59
      });
    } else {
      
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1
      });
    }
  };

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);

    return () => clearInterval(timerID);

  });

  return (
    <div>
      <p>
	    {`${time.hours.toString()}:${time.minutes.toString()}:${time.seconds.toString()}`}
      </p>
      <p>{finished ? "This is time!" : ''}</p>
    </div>
  );
};
```

This React component expects the `hours`, `minutes` and `seconds` props which should be numbers so it might be a good idea to parse these props to numbers regardless how the parent pass these values.
 

## Conclusion

In this article, we've seen how we can convert strings to numbers in JavaScript which is common operation whey you are writing JS code.

We have seen that JavaScript provides many tricks and built-in APIs for converting a number into its equivalent string such as the built-in `parseInt` and `parseFloat` methods, and also multiplying, dividing by one or using the unary plus operator before the string variable.

Most developers find that the latter tricks are better in terms of performance than the built-in `parseInt` and `parseFloat` methods.

We've also seen an example of converting a string into an array of numbers using the conversion tricks with JS methods like `Array.map`, `Array.from` and `split`.

Finally, we have seen  how to use string to number conversion with real-world cases when building apps with popular JavaScript libraries like React (React Hooks) and Vue.js.


### References

- [Javascript String to int conversion](https://stackoverflow.com/questions/18713508/javascript-string-to-int-conversion)
- [How to convert a string of numbers to an array of numbers?](https://stackoverflow.com/questions/15677869/how-to-convert-a-string-of-numbers-to-an-array-of-numbers)
- [Vue.Js - How to parse integer array object data](https://stackoverflow.com/questions/51796296/vue-js-how-to-parse-integer-array-object-data)
