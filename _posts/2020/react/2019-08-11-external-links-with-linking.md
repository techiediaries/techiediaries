---
layout: post
title: "Opening external links with Linking in React Native"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we'll see how to use Linking in React Native to open external links and URLs"
tags: [ 'reactnative', react ] 
categories: react-native-tutorial
---

In this tutorial, we'll see how to use `Linking` in React Native to open external links and URLs using the default web browser in your mobile system.

After implementing the functionality of the read later method using `AsyncStorage`, let’s now see how to use the `Linking` module in React Native to open a URL using the web browser.

Let’s start by importing `Linking` in the `App.js` file as follows:


    import {
      Linking
    } from 'react-native';

Next, add the following method:


    const openURL = (url) => {
      Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }

This method calls the `openURL()` method of `Linking` to open a URL in the web browser.

Finally, you need to call this method in the `ArticleItem` component as follows:


    const ArticleItem = ({article}) => {
      const { title, description, url, urlToImage } = article;
      return (
        <View style = { styles.articleContainer }>
          <Image style={ styles.articleImage } source={{ uri: urlToImage }} />
          <Text style= { styles.articleTitle }>
            { title }
          </Text>
          <Text style = { styles.articleDescription }>
            { description }
          </Text>
          <View style = { styles.articleBtns}>
          <IconButton width= "50%" color = "white" bgcolor = "#ff5c5c" icon = { readIcon } onPress = { () => { console.log("Button pressed!")} } title = "Open" />
          <IconButton width= "50%" color = "white" bgcolor = "#ff5c5c" icon = { bookmarkIcon } onPress = { () => { saveArticle(title, url); } } title = "Read later" />
          </View>
        </View>
      )
    }


![](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565474886209_Screenshot_1565474847.png)
![](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565474752268_Screenshot_1565474605.png)


When you click on the **Open** button, the corresponding article will be opened in the default web browser in the mobile system.

You can do more things with `Linking` with provides you with a general interface to interact with both incoming and outgoing app links. You can refer to the [docs](https://facebook.github.io/react-native/docs/linking) for more information.
