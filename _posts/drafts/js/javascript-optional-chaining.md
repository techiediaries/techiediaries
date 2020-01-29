# JavaScript Optional Chaining

The  **optional chaining operator**  is a new feature coming in the next ECMAScript standard.

It’s still not official, but  [available in Chrome 80](https://chromestatus.com/feature/5668249494618112)  behind a flag.

Have you ever used the && operator as a fallback? It’s one of my favorite JavaScript features.

In JavaScript, you can first check if an object exists, and then try to get one of its properties, like this:

```js
const car = null
const color = car && car.color

```

Even if  `car`  is null, you don’t have errors and  `color`  is assigned the  `null`  value.

You can go down multiple levels:

```js
const car = {}
const colorName = car && car.color && car.color.name

```

In some other languages, using  `&&`  might give you true or false, since it’s usually a logic operator.

Not in JavaScript, and it allows us to do some cool things.

Now this new optional chaining operator will let us be even more fancy:

```js
const color = car?.color
const colorName = car?.color?.name

```

If  `car`  is  `null`  or  `undefined`, the result will be  `undefined`.

With no errors (while with && in case  `car`  was  `undefined`  we had a  `ReferenceError: car is not defined`  error)

You can use this syntax today using  [this Babel plugin](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining).