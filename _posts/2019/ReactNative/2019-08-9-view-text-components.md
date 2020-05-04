---
layout: post
title: "Writing your first React Native component — View & Text"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we’ll learn how to create out first React Native component using View and Text"
tags: [ 'reactnative' ] 
categories: react-native-tutorial
---

In this tutorial, we’ll learn how to create out first React Native component using `View` and `Text`.

The `App.js` file contains the code for the main React component which gets bootstrapped in the `index.js` file using the `AppRegistry.registerComponent()` method:


    import {AppRegistry} from 'react-native';
    import App from './App';
    import {name as appName} from './app.json';
    AppRegistry.registerComponent(appName, () => App);

This will be considered as the **root** component of our application. 

Open the `App.js` file, and remove all the existing (slightly advanced) code then replace it with this simple code instead:



    import React from 'react';
    import {
      View,
      Text,
    } from 'react-native';
    
    
    const App = () => {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Hello, world!</Text>
        </View>
      );
    };
    
    export default App;

Save the file, head back to your emulator and press **R** twice in your keyboard. This is the screenshot of our app now:


![](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564928638096_Screenshot_1564928597.png)



> 
> 
> 
> 
> 
> 
> 
> 
> 
> 
> 
> 
> 
> 
> 
> 
> 


We simply display **Hello, world!** at the center of our application screen.
 

> **Note**: The previous boilerplate code includes some advanced React Native components that are used in production apps so we’ll get back to them once we grasp the basics first.

Now, let’s explain our code.

First of all, we are using the modern ES2015 (ES6) syntax which provides modern features to JavaScript (ES5) such as import, export and arrow functions. 

React Native has ES2015 support thanks to `Babel.js`, so you can use all these features without worrying about support.

We first use the `import` keyword for importing `React` from the `react` package, next we import the basic `View` and `Text` components from the `react-native` package which are part of React Native.


> **Note**: The `View` and `Text` components are basic UI components that can be considered as the equivalents to the `<div>` or `<span>` and `<p>` elements in HTML.

Next, we define our first React component using the function-based approach:


    const App = () => {
      return (
        <View style={ { flex: 1, justifyContent: "center", alignItems: "center" } }>
          <Text>Hello, world!</Text>
        </View>
      );
    };

We use the arrow function syntax (i.e `() => { return }`) to define our component instead of a class-based approach.

Now, the magic begins!

If you haven’t used React before, you might find this syntax confusing. We are including and returning XML-based markup code from our JavaScript function.

This is **JSX**, an extension for JavaScript that allows you to write XML-based markup (or HTML in case of the web) in JavaScript.   
 

> **Note**: You can think of JSX as a template language with JavaScript syntax.

You can also include JavaScript code inside JSX using curly braces `{...}`.

Now, let’s explain the markup code.

**View and Text**

We used the `<View>` component to create a container and the `<Text>` component to display text.

According to the [official docs](https://facebook.github.io/react-native/docs/view.html):


> `View` is the most fundamental component for building a UI, `View` is a container that supports layout with flexbox, style, some touch handling, and accessibility controls. 
> 
> `View` maps directly to the native view equivalent on whatever platform React Native is running on, whether that is a `UIView`, `<div>`, `android.view`, etc.
> 
> `View` is designed to be nested inside other views and can have zero to many children of any type.

Also, according to the [official docs](https://facebook.github.io/react-native/docs/text):


> `Text` is a React component for displaying text.
> 
> `Text` supports nesting, styling, and touch handling.
> 

We could also write our simple component without the `<View>` component:


    const App = () => {
      return (
          <Text>Hello, world!</Text>
      );
    };

And this will still display our text but we can’t use text without the `<Text>` component. For example, the following code will not work:


    const App = () => {
      return (
        <View style={ { flex: 1, justifyContent: "center", alignItems: "center" } }>
          Hello, world!
        </View>
      );
    };

 
This will produce an **Invariant Violation** error with the **Text strings must be rendered within a** `**<Text>**` **component** message:
 

![React Native Invariant Violation Error](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564933126462_Screenshot_1564933115.png)


