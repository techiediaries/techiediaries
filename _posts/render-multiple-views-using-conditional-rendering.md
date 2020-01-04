---
layout: post
title: "Render Multiple Views in React Native using Conditional Rendering"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we'll see how to render multiple views (a splash screen and a home view) in React Native using conditional rendering"
tags: [ 'reactnative' ] 
categories: react-native-tutorial
---

In this tutorial, we'll see how to render multiple views (a splash screen and a home view) in React Native using conditional rendering.

In the previous part, we created a simple view a background image and centered text. Let's now see how to make it as a splash screen of our app and create another view that will be used to display the news data from a remote source.

Add a `HomeScreen()` function as follows:


    const HomeScreen = () => {
      return (
        <View>
          <Text>
            Here, will be displayed our news data.
          </Text>
        </View>
      );
    }



Now, how do we switch between multiple views or screens? We need to use a navigation library but before tackling navigation, let’s see how to use [conditional rendering](https://reactjs.org/docs/conditional-rendering.html) for achieving the same thing, but this is only for simple cases.

Now, rename `App` to `SplashScreen`. In this point, we’ll have two components `SplashScreen` and `HomeScreen`.

 Next, create a new `App()` function that has the following code:


    const App = () => {
      const [loading, setLoading ] = useState(true);
      setTimeout(() =>{
        setLoading(false);
      } , 1000);
      
      if (loading){
          return <SplashScreen />
        } else {
          return <HomeScreen />
      }
    };


Don’t forget to import the `useState()` hook:


    import React, { useState } from 'react';

The splash screen will show up for one second, next it will disappear and the home screen will be rendered instead.

In the next tutorial, we'll see how to fetch real news data from a REST API using the `Fetch` API in React Native.

