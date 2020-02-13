#  ECMAScript 2020  (ES2020) New Features with Examples

JavaScript is one of the most popular languages in the world, it's available on browsers and servers. It's constantly evolving with amazing new features. 

In this post, we’re going to see some of the upcoming new features introduced in ES2020 with examples.

## Getting Started with EcmaScript 2020

Since these new features are not yet available across all modern browsers and even when they are added, you'll need to update your web browser or node platform to the latest version, let's use [babeljs](https://babeljs.io/) with the [Parcel bundler](https://parceljs.org/)  to use the next version of JavaScript today.



```bash
$ npm install -g parcel-bundler
```

package.json

```
"scripts": {
  "start": "parcel index.html"
},

```

Sadly, at the time of this writing we’re too far ahead of our time and there doesn’t seem to be a working preset for ES2020. If you throw these in a  `.babelrc`  file and save, Parcel should handle installing everything for you.

.babelrc

```
{
  "plugins": [
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-syntax-bigint"
  ]
}

```


## Private Class Variables

One of the main purposes of classes is to contain our code into more reusable modules. Because you’ll create a class that’s used in many different places you may not want everything inside it to be available globally.

Now, by adding a simple hash symbol in front of our variable or function we can reserve them entirely for internal use inside the class.

```
class Message {
  #message = "Howdy"

  greet() { console.log(this.#message) }
}

const greeting = new Message()

greeting.greet() // Howdy
console.log(greeting.#message) // Private name #message is not defined

```

## Promise.allSettled

When we’re working with multiple promises, especially when they are reliant on each other, it could be useful to log what’s happening to each to debug errors. With  `Promise.allSettled`, we can create a new promise that only returns when all of the promises passed to it are complete. This will give us access to an array with some data on each promise.

```
const p1 = new Promise((res, rej) => setTimeout(res, 1000));

const p2 = new Promise((res, rej) => setTimeout(rej, 1000));

Promise.allSettled([p1, p2]).then(data => console.log(data));

// [
//   Object { status: "fulfilled", value: undefined},
//   Object { status: "rejected", reason: undefined}
// ]

```

## Nullish Coalescing Operator

Because JavaScript is dynamically typed, you’ll need to keep JavaScript’s treatment of truthy/falsy values in mind when assigning variables. If we have a object with some values, sometimes we want to allow for values that are technically falsy, like an empty string or the number 0. Setting default values quickly gets annoying since it’ll override what should be valid values.

```
let person = {
  profile: {
    name: "",
    age: 0
  }
};

console.log(person.profile.name || "Anonymous"); // Anonymous
console.log(person.profile.age || 18); // 18

```

Instead of double pipes we can use the double question marks operator to be a bit more type strict, which only allows the default when the value is null or undefined.

```
console.log(person.profile.name ?? "Anonymous"); // ""
console.log(person.profile.age ?? 18); // 0

```

## Optional Chaining Operator

Similar to the nullish coalescing operator, JavaScript may not act how we want when dealing with falsy values. We can return a value if what we want is undefined, but what if the path to it is undefined?

By adding a question mark before our dot notation we can make any part of a value’s path optional so we can still interact with it.

```
let person = {};

console.log(person.profile.name ?? "Anonymous"); // person.profile is undefined
console.log(person?.profile?.name ?? "Anonymous");
console.log(person?.profile?.age ?? 18);

```

You can  [refer to this post](https://alligator.io/js/v8-optional-chaining-nullish-coalescing/)  to learn more about Optional Chaining and Nullish Coalescing.

## BigInt

We won’t go into the technical details, but because of how JavaScript handles numbers, when you go high enough things start to get a bit wonky. The largest number JavaScript can handle is 2^53, which we can see with  `MAX_SAFE_INTEGER`.

```
const max = Number.MAX_SAFE_INTEGER;

console.log(max); // 9007199254740991

```

Anything above that and things start to get a little weird…

```
console.log(max + 1); // 9007199254740992
console.log(max + 2); // 9007199254740992
console.log(max + 3); // 9007199254740994
console.log(Math.pow(2, 53) == Math.pow(2, 53) + 1); // true

```

We can get around this with the new  `BigInt`  datatype. By throwing the letter ‘`n`’ on the end we can start using and interacting with insanely large numbers. We’re not able to intermix standard numbers with BigInt numbers, so any math will need to be also done with BigInts.

```
const bigNum = 100000000000000000000000000000n;

console.log(bigNum * 2n); // 200000000000000000000000000000n

```

## Dynamic Import

If you had a file full of utility functions, some of them may rarely be used and importing all of their dependencies could just be a waste of resources. Now we can use  [async/await](https://alligator.io/js/async-functions/)  to dynamically import our dependencies when we need them.

This will not work with our current Parcel setup, since we're using imports which will only work in a Node.js environment.

math.js

```
const add = (num1, num2) => num1 + num2;

export { add };

```

index.js

```
const doMath = async (num1, num2) => {
  if (num1 && num2) {
    const math = await import('./math.js');
    console.log(math.add(5, 10));
  };
};

doMath(4, 2);

```

## Conclusion

Now you’re ready to start amazing or perhaps confusing your coworkers with JavaScript features that aren’t even in most browsers, yet (unless they are if you are reading this from the future 😉).
