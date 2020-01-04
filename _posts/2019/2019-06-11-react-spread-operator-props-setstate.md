---
layout: post
title: "ES6 Spread Operator in React by Example: Props and setState"
image: "images/content/react.png"
excerpt: "In this post, you will learn about using the JavaScript Spread operator in React." 
tags : [ react ]
author: ahmed
---

If you are a React beginner, you may have came across the three dots syntax (`...`) in many React code examples which may have confused you. In fact, this syntax is part of ES6 and not React itself and it's used by two operators - the Spread and Rest operators.

The Spread operator lets you expand an iterable like a string, object or array into its elements while the Rest operator does the inverse by reducing a set of elemnts into one array.

Both operators have many use cases and are used nowadays by most JavaScript developers to achieve the old JS tricks without getting things complex. The dots syntax is supported in all modern browsers which means you can use it with React with no worries. In fact, since most React developers make use of build systems and transpilers such as Babel to support latest JS features, you can safely use the dots syntax in your React code.

## Passing React Props Using the Spread Operator in JSX

You can use the ES6 Spread operator to pass props to a React component. Let's take an example for a component that expects two props:  

```js
function App() {
  return <Hello firstName="Ahmed" lastName="Bouchefra" />;
}
```

Using the Spread operator, you would write the following code instead:

```js
function App() {
  const props = {firstName: 'Ahmed', lastName: 'Bouchefra'};
  return <Hello {...props} />;
}
```

According to the [React docs](https://reactjs.org/docs/jsx-in-depth.html#spread-attributes):

>You can spread the props attributes to pass it in JSX using the Spread operator which passes the whole props object. So when your intent is to pass the whole props object, that's fine to use!

This is a clean syntax but in some cases it may be considered an anti-pattern which means you need to avoid using it. But Why?

When you use the `...props` syntax, you actaully expand the `props` object from the parent component, which means all its attributes are passed down the child component that may not need them all. This will make things like debugging harder.

Also according to the docs:

>Spread attributes can be useful but they also make it easy to pass unnecessary props to components that don’t care about them or to pass invalid HTML attributes to the DOM. We recommend using this syntax sparingly.


## Using the Spread Operator with setState() for Setting the Nested State

Let's suppose, you need to use the setState() method to update your component state. Since the `setState()` may work asynchronously in manu cases for performance reasons. You would need to write the following code:

```js
this.setState((state) => ({
  state1: state.state1 + 1,
}))
```

The `state1` variable which is part of our component state will be incremented by one. 

Now, let's suppose we have a state with a nested object in our component:

```js
this.state = {
  stateObj: {
    attr1: '',
    attr2: '',
  },
}
```

You can use the Spread syntax to update the nested state object.

```js
this.setState(state => ({
  person: {
    ...state.stateObj,
    attr1: 'value1',
    attr2: 'value2',
  },
}))
```

## The Rest Operator in React Example

The dots syntax can be also used to call the Rest operator in ES6. It's mostly useful when you want to avoid using the `arguments` object to access the passed arguments to a function.

This is an example pattern that uses the Rest operator to create authenticated routes in React using React Router:

```js
const AuthenticatedRoute = ({ ...rest }) => {
  const id = this.state;
  if (!id) {
    return <Redirect to={{ pathname: '/home' }} />;
  }
  return <Route {...rest} />;
};
// In Use
<AuthenticatedRoute
  path='/dashboard'
  data={this.state.data}
  render={() => (
    <SomeComponent someProps={this.someProps} />
  )}
/>
```


## References

- [React setState() with prevState and Object Spread Operator](https://www.rockyourcode.com/react-set-state-with-prev-state-and-object-spread-operator)
- [React Anti-Pattern: JSX Spread Attributes](https://codeburst.io/react-anti-pattern-jsx-spread-attributes-59d1dd53677f)
- [Spread Operator Tricks
](https://dev.to/robaguilera/spread-operator-tricks-4g9k)

## Conclusion

As a recap, we've seen various way to use the ES6 Spread operator in react such as for:

- Passing props to child components,
- Using the Spread operator with the `setState()` method for setting the nested data
- Using the Rest operator in React.

