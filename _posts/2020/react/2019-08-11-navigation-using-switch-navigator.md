---
layout: post
title: "Adding Navigation using React Navigation & Switch Navigator"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we'll learn how to add navigation using React navigation and the switch navigator"
tags: [ 'reactnative' , react] 
categories: react-native-tutorial
---

In this part, we'll learn how to add navigation using React navigation and the switch navigator.

React Native doesn’t include builtin navigation support but you can use third-party packages provided by the community such as the `react-navigation` library. 

This library comes also with iOS and Android gestures and animations for transitioning between screens.

After creating your components or screens, you can provide a route configuration using methods like  `createSwitchNavigator()` which creates a switch navigation system. In the route configuration, you supply the route names as the keys and and the components to use for the routes via a `screen` property.

You can also specify the initial route in the navigation stack using the `initialRouteName` on the options object.

Head back to your terminal and run the following command from the root of your project to install `react-navigation` from npm:


    $ npm install --save react-navigation

 
You also need to install the `react-native-gesture-handler` and `react-native-reanimated` libraries:


    $ npm install --save react-native-gesture-handler react-native-reanimated

After that, you need to re-run your `react-native run-android` command if your app is already started.


> **Note**: For iOS, it’s the `react-native run-ios` command.

## Restructuring our project code

Before adding navigation, let’s first restructure our code. In the previous parts, we have added all components in one `App.js` file. This is file for small examples but when your project starts growing, you need to put reusable components and screens in their own files and even folders.

Let’s create two `components` and `screens` folders in the root of our project:


- The `components` folder will contain the reusable components in our project,
- The `screens` folder will contain the screens of our application.


Head back to your terminal, make sure your are in the root folder of your React Native project and run the following command to create the two folders:


    $ mkdir components screens

Open the App.js file and let’s start with our first screen which is `SplashScreen`. 

Inside the `screens` folder, create a `SplashScreen.js` file:


    $ cd screens
    $ touch SplashScreen.js

Open the `SplashScreen.js` file and add the following code:


    import React from 'react';
    
    import {
        View,
        Text,
        ImageBackground
      } from 'react-native';
    import styles from '../styles';
    
    const SplashScreen = () => {
        return (
            <View style={styles.container} >
                <ImageBackground style={styles.backgroundImage} source={{ uri: 'http://i.imgur.com/IGlBYaC.jpg' }} style={styles.backgroundImage}>
    
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>
                            Newzzz
              </Text>
                        <Text style={styles.logoDescription}>
                            Get your doze of daily news!
              </Text>
    
                    </View>
                </ImageBackground>
            </View>
        );
    }
    export default SplashScreen;

Next, remove the code of the component from the `App.js` file and replace it with an import  from the `screens/SplashScreen.js` file:


    import SplashScreen from './screens/SplashScreen';

Next, in the `components` folder, create an `IconButton.js` file and add the following code:

{% raw %}

    import React from 'react';
    
    import {
      View,
      Text,
      Image,
      TouchableHighlight,
    } from 'react-native';
    const IconButton = ({title, color, bgcolor, onPress, width, icon }) =>{
        return (
          <TouchableHighlight onPress = { onPress } style= { { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: bgcolor } }>
      
          <View style={ {width: width, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } }>
            <Image style = { { height: 27, width:27, margin : 5 } } source = {  icon }></Image>
            <Text style = { {color: color }} > { title } </Text>      
          </View>
          </TouchableHighlight>
        );
      }
    export default IconButton;
{% endraw %}

Next, inside the `components` folder, add an `ArticleItem.js` file and add the following code:

{% raw %}

    import React from 'react';
    
    import {
        View,
        Text,
        Image,
        Linking
      } from 'react-native';
    import AsyncStorage from '@react-native-community/async-storage';
    import bookmarkIcon from '../assets/bookmark.png';
    import readIcon from '../assets/read.png';
    import IconButton from './IconButton';
    import styles from '../styles';
    
    const saveArticle = async (key, value) =>{
        try {
          await AsyncStorage.setItem(key, value);
          getAllData();
      
        } catch (e) {
          console.log(e);
        }
      };
      
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
      
      const openURL = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
      }
      
      
      
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
            <IconButton width= "50%" color = "white" bgcolor = "#ff5c5c" icon = { readIcon } onPress = { () => { openURL(url)} } title = "Open" />
            <IconButton width= "50%" color = "white" bgcolor = "#ff5c5c" icon = { bookmarkIcon } onPress = { () => { saveArticle(title, url); } } title = "Read later" />
            </View>
          </View>
        )
      }
      export default ArticleItem;
{% endraw %}


Next, inside the `components` folder create a `FlatListItemSeparator.js` file and add the following code:

{% raw %}


    import React from 'react';
    
    import {
        View
    } from 'react-native';
    const FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }
    export default FlatListItemSeparator;
{% endraw %}

Make sure to remove the `FlatListItemSeparator` component from the App.js file

Next, create a `FlatListHeader.js` file and add the following code:

{% raw %}

    import React from 'react';
    
    import {
        View,
        Text
    } from 'react-native';
    const FlatListHeader = () => {
        return (
            <View elevation={1}
                style={{
                    height: 100,
                    width: "97%",
                    margin: 5,
                    backgroundColor: "#fff",
                    border: 2.9,
                    borderColor: "black",
                    alignSelf: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 16,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 7.49
                }}
            >
                <Text style={{ textShadowColor: 'black', textShadowOffset: { width: 1, height: 3 }, textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30, fontSize: 40 }}>Latest articles</Text>
            </View>
        );
    }
    export default FlatListHeader;
{% endraw %}

Make sure to remove the `FlatListHeader` component from the `App.js` file.

Next, add a `HomeScreen.js` file inside the screens folder and add the following code:

{% raw %}

    import React from 'react';
    
    import {
        View,
        FlatList
    } from 'react-native';
    import FlatListItemSeparator from '../components/FlatListItemSeparator';
    import FlatListHeader from '../components/FlatListHeader';
    import ArticleItem from '../components/ArticleItem';
    const HomeScreen = (props) => {
        console.log("articles: ", props.articles);
        return (
            <View>
                <FlatList
                    data={props.articles}
                    ListHeaderComponent={FlatListHeader}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ArticleItem article={item} />}
                />
            </View>
        );
    }
    export default HomeScreen;  
{% endraw %}

Next, remove the code of the `HomeScreen`  component from the `App.js` file and replace it with an import statement:


    import HomeScreen from './screens/HomeScreen';

This is the code of the `App.js` file:


    import React, { useState , useEffect } from 'react';
    import SplashScreen from './screens/SplashScreen';
    import HomeScreen from './screens/HomeScreen';
    
    const App = () => {
      const API_KEY = "<YOUR_API_KEY>";
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
    export default App;

We simply import `SplashScreen` and `HomeScreen` components from the screens folder and we use React conditional rendering to render them. We also use the `useState` and `useEffect` hooks to create state and fetch data.


> **Note**: Make sure to replace `<YOUR_API_KEY>` with your own API key from the news API.

When data is still loading the `loading` state variable has a `true` value. After data is fetched, it will have a `false` value.

If `loading` is true, we tell React Native to render the `SplashScreen` component. Otherwise, it renders the `HomeScreen` component with the `articles` data, fetched from the news server using the Fetch API and the `useEffect()` hook, passed as a prop.   

If your Android emulator is running, press double R in your keyboard to reload your app or run the following command to start the emulator with your app:


    $ react-native run-android

If there is no error, congratulations, you have successfully restructured your code.

This is a screenshot of our project’s structure in Visual Studio Code:


![React Native Example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565482994600_Screenshot+from+2019-08-11+01-22-58.png)


Now, let’s replace conditional rendering with a real navigation system. 


## React Navigation using `createSwitchNavigator`

According to the [docs](https://reactnavigation.org/docs/en/switch-navigator.html):


> The purpose of SwitchNavigator is to only ever show one screen at a time. By default, it does not handle back actions and it resets routes to their default state when you switch away. This is the exact behavior that we want from the authentication flow.


First, in your `App.js` file, add the following imports:


    import { createSwitchNavigator, createAppContainer } from "react-navigation";

Next, create a switch navigator using the following code: 


    const AppNavigator = createSwitchNavigator({
      Splash: SplashScreen,
      Home: HomeScreen
    });

We pass in a route configuration of tow routes:


- The `Splash` route mapped to the `SplashScreen` component,
- The `Home` route mapped to the `HomeScreen` component.

Next, create an application container using the following code: 


    AppContainer = createAppContainer(AppNavigator);

According to the [docs](https://reactnavigation.org/docs/en/app-containers.html):


> Containers are responsible for managing your app state and linking your top-level navigator to the app environment. On Android, the app container uses the Linking API to handle the back button. The container can also be configured to persist your navigation state. On web, you'd use different containers than React Native.

Next, call the app container component from your `App` function as follows: 


    const App = () => {
      return <AppContainer />
    };

Next, we’ll add the code  for fetching data (which was previously in the `App()` function) to `SplashScreen`.

First, import the `useEffect()` hook:


    import { useEffect } from 'react';

Next, change `SplashScreen` as follows:


    const SplashScreen = (props) => {
        const API_KEY = "<YOUR_API_KEY_HERE>";
        const URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;
    
        useEffect(()=>{
          fetch(URL)
          .then((response) => response.json())
          .then((responseJson) => {
            return responseJson.articles;
          })
          .then( articles  => {
            props.navigation.navigate("Home", {articles: articles});
          })
          .catch( error => {
            console.error(error);
          });
          
        } , []);
        return (
            <View style={styles.container} >
                <ImageBackground style={styles.backgroundImage} source={{ uri: 'http://i.imgur.com/IGlBYaC.jpg' }} style={styles.backgroundImage}>
    
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>
                            Newzzz
              </Text>
                        <Text style={styles.logoDescription}>
                            Get your doze of daily news!
              </Text>
    
                    </View>
                </ImageBackground>
            </View>
        );
    }

When data is fetched, we use the `navigate()` method of the `navigation` object available from the `props` object to navigate to the `Home` route associated with `HomeScreen` and we pass in the `articles` data as a route parameter:


    props.navigation.navigate("Home", {articles: articles});

For more information, see [Passing parameters to routes](https://reactnavigation.org/docs/en/params.html)**.**

Next, change `HomeComponent` as follows:


    const HomeScreen = (props) => {
        return (
            <View>
                <FlatList
                    data={ props.navigation.getParam("articles", []) }
                    ListHeaderComponent={FlatListHeader}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ArticleItem article={item} />}
                />
            </View>
        );
    }

Instead of getting the `articles` data from the props object, we now need to retrieve it from the `articles` route parameter, passed from `SplashScreen`, using the `getParam()` method of the `navigation` object available from the `props` object.

That’s it. You should be able to have the same behavior as before using React Native navigation instead of conditional rendering.

