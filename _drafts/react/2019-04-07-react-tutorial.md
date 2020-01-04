---
layout: post
title: "Build your First App with React 16.8 - Components, Hooks, Forms, REST APIs and Styling"
image: "images/content/react.png"
excerpt: "In this tutorial you will learn how to build your first React app. We'll be using Hooks, forms, Axios for consuming REST APIs and Bootstrap 4 for styling the UI" 
tags : [ react ]
---

In this tutorial you will learn how to build your first [React 16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) application. We'll be using React Hooks, forms, Axios for consuming REST APIs and Semantic UI for styling the user interface.

The application we'll be building is a simple news applications that grabs news from [NewsAPI.org](NewsAPI.org).

> **Note**: With React 16.8, React Hooks are available in a stable release!



## Introducing React

Let's start our tutorial by introducing React for beginners.

So what's React?

Simpy put, React is a library for building interactive user interfaces. It's created by Facebook and it's now the most popular frontend UI library across the world.

React makes use of virtual DOM to make rendering UIs very fast.  

## Can I Use Hooks Today?

[Yes! Starting with 16.8.0](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html#can-i-use-hooks-today), React includes a stable implementation of React Hooks for:

- React DOM
- React DOM Server
- React Test Renderer
- React Shallow Renderer

> Note that to enable Hooks, all React packages need to be 16.8.0 or higher. 

### How to Add React to Your HTML Page

Adding React to your HTML page is a matter of using a `<script>` tag. For example:

```html
<!DOCTYPE html>
<html lang="en">
<title>React Example</title>

<script src= "https://unpkg.com/react@16/umd/react.production.min.js"></script>

<script src= "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>

</body>
</html>
``` 

### What is JSX

JSX stands for JavaScript XML. It's an extension to JavaScript that allows you to embed HTML in JavaScript code.

> **Note**: Please note that you don't have to use string quotes around your HTML code in JSX.

### What is the React DOM render()

> The method ReactDom.render() is used to render (display) HTML element.

```html
<div id="id01">Hello World!</div>

<script type="text/babel">
ReactDOM.render(
    <h1>Hello React!</h1>,
    document.getElementById('id01'));
</script>
```







