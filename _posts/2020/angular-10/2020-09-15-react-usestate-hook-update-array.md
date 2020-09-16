---
layout: bpost
title: "Update Arrays with React useState Hook Without Push"
image: "images/content/react.png"
excerpt: "In this article, we'll see by example how to update arrays via the React hook useState() using the push() method of the Array object"
date: 2020-09-15
tags : [javascript , react]
---

In this article, we'll see by example how to update arrays via the React hook `useState()` using the `push()` method of the Array object.

## Creating an Array State with `useState()`

First, let's see how to use the `useState()` hook for creating an array state variable.

```js
import React from "react";

const { useState } = React;

const [myArray, setMyArray] = useState([]);

```

We destructure the return value of the `useState()` hook to get a variable that contains the state array and a method for updating the state. 

You can't update the array directly without using the method returned from `useState()`. In our case, it's `setMyArray()`.

## Adding a New Element to the State Array

Now since the state is an array, how to add a new element to the array?

Normally, we would use the `push()` method for adding a new element to an array:

```js
myArray.push(1);
```

However, with React, we need to use the method returned from `useState` to update the array.


We simply, use the update method (In our example it's `setMyArray()`) to update the state with a new array that's created by combining the old array with the new element using JavaScript' Spread operator.

We can also define a function that creates the new array from the old array and pass it to the `useState` update method.

```js
setMyArray(oldArray => [...oldArray, newElement]);
```

The function will have the old array as a first parameter. In case, you want to use the first approach, you need to access the old array from the state object.

## Full React Example for Updating a State Array 

This is a full example:


```js
<body>
<div id="root"></div>

<script>
const { useState } = React;

const App = () => {
    const [myArray, updateMyArray] = useState([]);

    const onClick = () => {
        updateMyArray( arr => [...arr, `${arr.length}`]);
    };
    return [
        <input type="button" onClick={ onClick } value="Update" />,
        
        <div>{myArray.map( e =>
          <div>{ e }</div>
        )}
        </div>
    ];
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.8.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.1/umd/react-dom.production.min.js"></script>
</body>
```

We pass in a function to our `updateMyArray()` method that will take care of providing a new array by concatenating the old array with the new element using the Spread operator. The new element in this example is simply the length of the old array.    

## Conclusion

In this example, we've seen how to update array state in React using the `useState` hook and the Spread operator instead of the `push()` method used to normally add new elements to arrays in JavaScript.




