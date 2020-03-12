---
layout: post
title: "Adding stack navigation with Stack Navigator"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we'll learn how to add navigation using React navigation and the switch navigator"
tags: [ 'reactnative' , react] 
categories: react-native-tutorial
---

In the previous part, we’ve added navigation to our application using `SwitchNavigator` from the React Navigation library. This enables us to navigate between two screens, a splash and home screen. Now, let’s see how to add stack navigation between the home screen and a **read later** screen that we will create next, but we’ll implement its functionality later in the upcoming parts.

According to the [docs](https://reactnavigation.org/docs/en/stack-navigator.html):


> StackNavigator provides a way for your app to transition between screens where each new screen is placed on top of a stack.
> By default the stack navigator is configured to have the familiar iOS and Android look & feel.

You can create a stack navigator by calling the `createStackNavigator()` method which takes a route configuration and a navigation configuration as arguments.

Inside the `screens` folder. Create a `ReadLaterScreen.js` file and add the following initial code:


    import React from 'react';
    import { View, Text} from 'react-native';
    const ReadLaterScreen = () => {
        return <View>
            <Text>
                Read later screen
            </Text>
        </View>
    };
    export default ReadLaterScreen;


Go to the `App.js` file, next import the `createStackNavigator()` method and the `ReadLaterScreen` component:


    import ReadLaterScreen from './screens/ReadLaterScreen';
    
    import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
     

Next, create a stack navigator as follows:


    const MainNavigator = createStackNavigator({
      Home: HomeScreen,
      ReadLater: ReadLaterScreen
    });

Also, you need to change the switch navigator as follows:


    const AppNavigator = createSwitchNavigator({
      Splash: SplashScreen,
      Main: MainNavigator
    });

We moved to the `HomeScreen` component from the switch navigator to the stack navigator and we nested the stack navigator called `MainNavigator` into the switch navigator called `AppNavigator`.

That’s it. We already have created an application container and called it from the `App` component:


    AppContainer = createAppContainer(AppNavigator);
    const App = () => {
      return <AppContainer />
      
    };
    export default App;

Now, we only need to be able to navigate from the home screen to the read later screen when we press the **Read later** button which will save the link in the local database and navigate us to the screen where we’ll find all the saved links.

First, open the `screens/HomeScreen.js` file and pass the `props.navigation` object to the `ArticleItem` component:


                <FlatList
                    data={ props.navigation.getParam("articles", []) }
                    ListHeaderComponent={FlatListHeader}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ArticleItem article={item} navigation = { props.navigation }/>}
                />

Next, open the `components/ArticleItem.js` file and call the navigate() method of the navigation object when the **Read later** button is pressed:


            <IconButton width= "50%" color = "white" bgcolor = "#ff5c5c" icon = { bookmarkIcon } onPress = { () => { saveArticle(title, url); navigation.navigate("ReadLater"); } } title = "Read later" />

Now, if your reload your app, you should be able to navigate to the read later screen by clicking on the **Read later** button in any news article.

After, adding the stack navigator you’ll notice that the components that are part of the navigator have a blank top bar:

![](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565539933268_Screenshot_1565539896.png)
![](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565539926215_Screenshot_1565539836.png)


Now, how to customize the text and color of the top navigation bars?

You can customize the the top navigation bar using the `navigationOptions` object for each screen component or the `defaultNavigationOptions` object for all screens.

Change the stack navigator as follows:


    const MainNavigator = createStackNavigator({
      Home: HomeScreen,
      ReadLater: ReadLaterScreen
    },
      {
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTitle: 'Newzzz'
        },
      }
    );

We provide a second argument to `createStackNavigator()` method which takes a configuration object for customization many aspects of the navigation.

Here we use the `headerTitle` property to set a default header title for all the screens of the navigation stack and we set a default background color using `backgroundColor`.

We can also customize each screen differently using `navigationOptions` in the route configuration.

Let’s see that by customizing the header title of the read later screen:


    const MainNavigator = createStackNavigator({
      Home: HomeScreen,
      ReadLater: {
        screen: ReadLaterScreen,
        navigationOptions: () => ({
          headerTitle: `Reading list`
        }),
      },
    },
      {
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTitle: 'Newzzz'
        },
      }
    );

Instead of directly passing the component to the route configuration, we use an object with a screen property that specifies the component to render and the `navigationOptions` that takes an arrow function which returns a configuration object for the screen.

Here we only set the title using the `headerTitle`  but you can refer to the [docs](https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator) for more navigation options.

These are the screenshots of the screens, after customizing the navigation bars:


![](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565543002985_Screenshot_1565542943.png)
![](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565542996831_Screenshot_1565542663.png)
