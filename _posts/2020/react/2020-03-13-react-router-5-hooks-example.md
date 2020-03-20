---
layout: bpost
title: "React Router 5.1+ Hooks"
image: "images/content/react.jpg"
author: ahmed
excerpt: "In this tutorial, you will learn about routing in React using React Router 5.1+ hooks"
tags : react 
categories: react
---

[React Router 5.1](https://reacttraining.com/blog/react-router-v5/)  introduced four hooks to implement routing in a function-based way. 

In this tutorial, we'll see how to use React Router 5 hooks by example. 

Please note that you need to be using React 16.8+ version to use hooks either built-in or custom third-party hooks including the router hooks.


## React Router 5/4 Example Without Hooks

Let's see how to route a component without in the old way i.e without using hooks. 

If you need to map a component named `Home` as an example to the main path, you simply need to write the following line of code after you import the `Route` and `Home` components:

```js
<Route path="/" component={Home} />
```

Now when you go to the `/` path, the `Home` component will be rendered.

The component will be passed various route props such as `match`,  `location`  and  `history` which will allow you to access routing information in your component.

If you need to pass extra props. you'll have to use the `render` property insted of `component`: 

```js
<Route path="/" render={({ match }) => <Home match={match} mine={true} />}>
```

## Our Example with React Router 5 Hooks

Now, let's write our previous example with hooks. We map the `Home` component to the `/` path using the following syntax:

```javascript
<Route path="/">
  <Home />
</Route>
```

Route props such as `match`,  `history`  or  `location` are not passed to the `Home` component so we need to use the new router hooks to access these features.


## The `useHistory` Hook

The `useHistory` hook allows access to the  `history`  prop in React Router.

First, you need to import the hook from the `react-router-dom` package:

```javascript
import { useHistory } from 'react-router-dom';
```

Next, you can call the hook inside the `Home` component as follows:

```js
function Home() {
  const history = useHistory();
  return <button onClick={() => history.push('/user')}>User</button>;
}
```

## The `useLocation` Hook

The `useLocation` hook enables access to the `location`  prop in React Router that provides the router state and location.

You can use this hook to access the query parameters or the route string.

You need to start by importing the hook as follows:

```javascript
import { useLocation } from 'react-router-dom';
```

Next, you need to use it inside your component as follows:

```js
function User() {
  const location = useLocation();
  useEffect(() => {
    
    console.log("Location Info: ", location.pathname. location.search);
    
  }, [location]);
  return <div>User Info</div>;
}
```

Each time the  `location`  property changes,  the `location.pathname` and `location.search` will be printed on the console.
