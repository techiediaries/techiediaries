---
layout: post
title: "Saving data in local databases with AsyncStorage & React Native"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we'll learn how to use AsyncStorage in React Native to save data in a database."
tags: [ 'reactnative' , react ] 
categories: react-native-tutorial
---

In this tutorial, we'll learn how to use `AsyncStorage` in React Native to save data in a database.

After creating and styling our list of data using the `FlastList` component and added two buttons for opening URLs with web browsers and saving article meta-data locally for reading later. Let’s see how to implement the functionality of the **Read later** button using the `AsyncStorage` module in React Native.

[AsyncStorage](https://github.com/react-native-community/async-storage) is an asynchronous, unencrypted, persistent, key-value storage system for React Native that should be used instead of LocalStorage because it makes use of efficient data storage mechanisms such as files and database systems (SQLite).

On iOS, `AsyncStorage` stores small values in a serialized dictionary and larger values in separate files. On Android, `AsyncStorage` makes use of SQLite or [RocksDB](http://rocksdb.org/).

Head over to your terminal, make sure you are inside your React Native project and run the following command:


    $ npm install @react-native-community/async-storage --save

 
 You need to run the `run-android` (or `run-ios`) again, after installing `async-storage`:
 

    $ react-native run-android

 
Next, open the `App.js` file and import `AsyncStorage` as follows:
 

    import AsyncStorage from '@react-native-community/async-storage';

Next, add the following method:


    const saveArticle = async (key, value) =>{
      try {
        await AsyncStorage.setItem(key, value);
      } catch (e) {
        console.log(e);
      }
    };


At this point, before we implement the UI for displaying the bookmarks, we can make sure the values are properly stored in our local database using the following method:


    const getAllData = () =>{
      AsyncStorage.getAllKeys().then((keys) => {
        return AsyncStorage.multiGet(keys)
          .then((result) => {
            console.log(result);
          }).catch((e) =>{
            console.log(e);
          });
      });
    }

You simply need to call it from the `saveArticle()` method as follows:


    const saveArticle = async (key, value) =>{
      try {
        await AsyncStorage.setItem(key, value);
        getAllData();
      } catch (e) {
        console.log(e);
      }
    };

You also need to run the `react-native log-android` or `react-native log-ios` command to see the output of `console.log()` method in your terminal.

Next, now all you need to do is calling the `saveArticle()` method when pressing the **Read later** button. In your `ArticleItem` component, change the `onPress` prop of the second `IconButton` component as follows:

{% raw %}

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
{% endraw %}

When the read later button is pressed, we call the `saveArticle()` method with the title as key and URL as value.

We’ll see in a next part how to create a component for displaying the bookmarked articles using the  `AsyncStorage.getAllKeys()` and `AsyncStorage.multiGet()` methods.


