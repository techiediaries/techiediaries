---
layout: bpost
title: "React State Array Get Length Example"
image: "images/content/angular.png"
excerpt: "In this quick tip article, we'll see how to get the length of an array or state array in React"
date: 2020-09-15
tags : [javascript, react]
---

In this quick tip article, we'll see how to get the length of an array or state array in React.

React is a JavaScript library for rendering user interfaces therefore it simply deals with the UI and doesn't provide its own utilities for handling arrays or similar tasks. As a result, you simply need to use the built-in JavaScript methods and APIs.

## JavaScript' Array Length by Example in React

In this example, we'll see how to get the length of an array in React and JavaScript.


JavaScript already provides many built-in methods for getting the length of an array, let's see how to use in a React example.

>The length property of an object which is an instance of type Array sets or returns the number of elements in that array. The value is an unsigned, 32-bit integer that is always numerically greater than the highest index in the array. [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)


Create an `index.js` file and add the following code:

```js
import React from 'react'

class App extends React.Component {

    render(){
        const array = ["React","is", "awesome", "!"];
        const length = array.length;
        return(
            <div>
                <p>Array length is { length }.</p>
            </div>
        )
    }
    
}

ReactDOM.render(<App />, document.getElementById("root"));
```

In the `render()` method, we simply define a JavaScript array then we get the length of the array using the `Array.length` method. Finally we return a JSX markup to didplay the length of the array.

You should import React and ReactDOM in your project and use ReactDOM to mount the component in the DOM:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.6.3/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.6.3/umd/react-dom.production.min.js"></script>

<div id="root"></div>
```

In the same way, you can get the length of the array in React state as follows:


```js
class App extends React.Component {
  state = {
    array: ["Hello", "React"]
  };


  render() {
    return (
      <div>
        <p>React State Array Length: {this.state.array.length}</p>        
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## Conclusion

In this quick example, we've seen how to use the `Array.length` method to get the length of a local array or state array and render the result in the DOM.
