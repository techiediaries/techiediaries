---
layout: post
title: "React 16.6 New Features: React.memo() and Suspense/React.lazy()"
image: "images/content/learn-django.png"
excerpt: "We'll learn about important new features of React such as React.memo() and React.lazy()"
tags : [javascript, react]
---

React 16.6 is released in late October 2018 and comes with many new features. In this post, we'll look at two important features: `React.memo()` and `React.lazy()`.
 
Using `React.memo()` which stands for memoization, developers can optimize their React apps for performance by re-rendering function components only when thier props have changed, similar to using  `PureComponent` or `shouldComponentUpdate` for class components.

Using `React.lazy()`, developers can now make use the `Suspense` component for splitting the code by calling the `React.lazy()` with a dynamic import.

## Understanding `React.memo()`

`React.memo()` is a Higher Order Component i.e a function that takes a React component as a parameter and returns another component. It's similar to `React.PureComponent` but for function components instead of classes.

[Wikipedia](https://en.wikipedia.org/wiki/Memoization) defines Memoization as an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

Both `React.memo()` and `React.PureComponent` are used to control which components to render which helps increasing the performance of the application since they can prevent any unecessary re-rendering of the components.

React DevTools will allow you to see which components are being re-rendered.

Any component that's returned from the `React.memo()` function will not be re-rendered if its props haven't changed!

You can use `React.memo()` to wrap any React functional component which will make it re-render only when its props have changed.

For example, let's suppose we have the following functional component:

```js
const MyComponent = props => <div> Hello {props.name}!</div>;
```

We can create a higher order component tha re-renders only when the props have changed using:

```js
const MemoiedComponent = React.memo(MyComponent);
```

## Understanding `React.lazy()`

`React.lazy()` enables developers to lazy load components only when they are needed. This has many benefits, particularly for performance as It helps reduce the app's bundle size. It can be added using different ways, for example with a Webpack plugin or an external library but also just with React starting with v16.6+.

Code splitting and lazy loading are techniques used to optimize the loading time of your application by only importing the code necessary for rendering the above-the-fold area of your app which increases the user's perceived performance.

One way for achieving these strategies is through using dynamic imports which return a JavaScript Promise that gets resolved only when necessary which allows you delay the loading of a module.

When we need to use lazy loading in React, we'll need to use an external library like `react-loadable` but not any more with React 16.6.

Now that React 16.6 is released, we don't need to use library for adding lazy loading support because it's built right into React by using a `Suspense` component and the `React.lazy()` method. 
 

```js
import React, {lazy, Suspense} from 'react';
const MyLazyComponent = lazy(() => import('./lazy.component'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Lazy loading...</div>}>
      <MyLazyComponent />
    </Suspense>
  );
}
```

We simply wrap the `import` statement with the `lazy()` method.

We also wrap the lazy-load component with the `<Suspense>` and we provide a fallback.

Suspense is a new React feature that helps with dealing with async operations like data fetching.
 
## Conclusion

Now, you can use functional components and still be able to optimize your app for performance without using [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) by taking advantage of `React.memo()` which works by only rendering a component if rendering will be different.

Using `<Suspense>` and `React.lazy()` we can lazy load a component without using an external library starting with React 16.6+. 




