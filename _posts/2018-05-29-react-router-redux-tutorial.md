---
layout: post
title: "React Router Redux Tutorial"
image: "images/content/react.png"
excerpt: "In this tutorial we'll look at how to use react-router-redux (previously known as redux-simple-router) to control the URL as a part of the application state." 
tags : [javascript, react]
---

In this tutorial we'll look at how to use **react-router-redux** (previously known as **redux-simple-router**) to control the URL as a part of the application state.

If you are using Redux to manage the application state and the React Router to add routing between components then you might had some situations where you wanted to keep the URL state in sync with the Redux store? The **react-router-redux**  library does exactly that. 

The library works by keeping a copy of the location information hidden inside the Redux state which will come handy when you manipulate (rewind, reset or replay etc.) your application state with tools such as [Redux DevTools](https://github.com/gaearon/redux-devtools) as the library will make sure to propagate all updates to the React Router (which will update the components tree accordingly).

Please note that, you don't want to use this library if you only need to use both Redux and the React Router in your application to handle global state and routing as the two libraries can be used together without any problems and without using any extra libraries. You only need this library if you need to record user actions and rewind/replay them but in sync with the React Router.

## Generate a React Application 

If you don't have Create React App installed, first run the following command to install it from npm:

```bash
npm install -g create-react-app
```

Next, let's create a new React application:

```bash
create-react-app react-redux-router-demo
```


## How to Use react-router-redux?

After generating a React application, you need to install Redux, React Redux bindings and React Router DOM from npm:

```bash
cd react-redux-router-demo
npm install --save redux react-redux react-router-dom
```

Next, you need to install **react-router-redux** from npm using:

```bash
npm install --save react-router-redux
```
