---
layout: post
title: "Fetching Data with Get Requests using Fetch  in React Native"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we'll learn how to fetch data by sending GET requets using Fetch in React Native"
tags: [ 'reactnative' ] 
categories: react-native-tutorial
---

In this tutorial, we'll learn how to fetch data by sending GET requets using `Fetch` in React Native.

Instead of waiting one second in vein, let’s fetch data and wait for it before we display the home screen.

We’ll be using the news API from [NewsAPI.org](https://NewsAPI.org), register for an account and you’ll get an API key, note it and let’s continue.

React Native provides the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for fetching data from remote servers and APIs. It’s quite similar to the browser APIs such as `fetch()` and `XMLHttpRequest`.

The API is promise-based, so you can also use it with the `async/await` syntax.


> **Note**: React Native supports the `XMLHttpRequest` API; so that means you can also use libraries like [Axios](https://github.com/axios/axios) (after you install it) to fetch data and send API requests.

For more information about Fetch, see [Networking](https://facebook.github.io/react-native/docs/network) on the official docs.

Now, let’s fetch our data.

First, import the `useEffect()` hook:


    import React, { useState, useEffect } from 'react';

`useEffect` is a builtin hook that allows you to perform side effects in your React application such as fetching data.

Next, inside the `App()` function, add the `API_KEY` and `URL` variables:


    const App = () => {
      const API_KEY = "<YOUR_API_KEY_HERE>";
      const URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;


> **Note**: Don’t forget to change `<YOUR_API_KEY_HERE>` with your actual API key.

Next, add the `articles` array for holding the fetched articles:


      const [articles, setArticles] = useState([]);

Next, call the `fetch()` method inside the `useEffect()` hook to fetch data from the API:


      useEffect(()=>{
        fetch(URL)
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson.articles;
        })
        .then( articles  => {
          setArticles(articles);
          setLoading(false);
        })
        .catch( error => {
          console.error(error);
        });
        
      } , []);

Once data is fetched, we assign it to the `articles` variable and we set the `loading` variable to `false`.

Also, pass the `articles` state to the `<HomeScreen>` component via an `articles` prop:


      if (loading){
          return <SplashScreen />
        } else {
          return <HomeScreen articles = { articles }/>
      }


This is the complete source code of the function:


    const App = () => {
      const API_KEY = "<YOUR_API_KEY_HERE>";
      const URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;
      const [articles, setArticles] = useState([]);
      const [loading, setLoading ] = useState(true);
      useEffect(()=>{
        fetch(URL)
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson.articles;
        })
        .then( articles  => {
          setArticles(articles);
          //console.log(articles);
          setLoading(false);
        })
        .catch( error => {
          console.error(error);
        });
        
      } , []);
      
      if (loading){
          return <SplashScreen />
        } else {
          return <HomeScreen articles = { articles }/>
      }
    };

Now, we need to change the `<HomeScreen>` component to display the data passed as a prop:


    const HomeScreen = (props) => {
      console.log("articles: ", props.articles);
      return (
        <View>
          {
            props.articles.map((article, index)=>{
              return <Text key = {index}>
              { article.title }
              </Text>
            })
          }
        </View>
      );
    }

We loop through the `articles` prop using the JavaScript `map()` method and we use a `<Text>` component to display the title of each article.

This not the best way to display lists of data. In the next section, we’ll see how to use the  `FlatList` component.


> **Note**: You may notice the use of `console.log()` in our code to display some information for debugging. In React Native, you need to open a new terminal and run the `react-native log-android` command if you want to see the output of `console.log()`. This is based on [logkitty](https://github.com/zamotany/logkitty).


