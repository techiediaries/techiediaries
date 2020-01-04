---
layout: post
title: "Adding a background image in React Native - Image & ImageBackground"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we’ll learn how to add a background image in React Native using either the Image component with absolute positioning or ImageBackground"
tags: [ 'reactnative' ] 
categories: react-native-tutorial
---

In this tutorial, we’ll learn how to add a background image in React Native using either the `Image` component with absolute positioning or `ImageBackground`.

Let’s now change our previous component to display a background image and a centered text with the name of our app.

First, change our component to display the name and description of our app as follows:



    const App = (props) => {
      return (
        <View style = { styles.container } >
                
          <View style= { styles.logoContainer }>
            <Text style = { styles.logoText }>
              Newzzz
            </Text>
            <Text style = { styles.logoDescription }>
              Get your doze of daily news!
            </Text>
            
          </View>
        </View>
      );
    }

Also, open the `styles.js` file and add the following styles:


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            fontFamily: "-apple-system, BlinkMacSystemFont Segoe UI",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "orange"
        },
        logoContainer:{
            alignItems: "center",
        },
        logoText: {
            fontSize: 24,
            fontWeight: '600',
            color: 'white'
        },
        logoDescription:{
            fontSize: 15,
            fontWeight: '600',
            color: 'white'
        }
    });


This is the screenshot of our UI, now:


![React Native Example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565105747267_Screenshot_1565105729.png)


We have used the `backgroundColor` property to set `orange` as the color of the container `<View>`.

This is good but what if we want something more fancy? We can use an image as a background. 

In React Native, we can include images using either the `<Image>` or `<ImageBackground>` components. What’s the difference between these two components?

With the release of React Native v0.50+, the `<Image>` component can not have nested content anymore (See this [link](https://github.com/facebook/react-native/releases/tag/v0.50.0)) but we can use `<ImageBackground>` instead if we want to create nested content. 

If you try to add other children inside the `<Image>` component, you’ll get the following error:

**The** `<Image>` **component cannot contain children. If you want to render content on top of the image, consider using the** `<ImageBackground>` component or absolute positioning.


![React Native UI](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565103752177_Screenshot_1565103624.png)


## Using Image with absolute positioning

Go to the `App.js` file and start by importing the Image component:


    import {
      View,
      Text,
      Button,
      Image,
    } from 'react-native';

Next, change the `App` component as follows:


    const App = (props) => {
      return (
        <View style={styles.container} >
          <Image style= { styles.backgroundImage } source={{ uri: 'http://i.imgur.com/IGlBYaC.jpg' }}>
          </Image>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>
              Newzzz
            </Text>
            <Text style={styles.logoDescription}>
              Get your doze of daily news!
            </Text>
          </View>
        </View>
      );
    }

Next, add the following style object inside the `styles.js` file:


        backgroundImage:{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            opacity: 0.3
        },


Here is a screenshot of our view:

![React Native Image Example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565108065303_Screenshot_1565108028.png)


That’s nice! We achieved this using the `<Image>` component with absolute positioning. 

## Using `ImageBackground`

Another way is to use `<ImageBackground>`. 

In your `App.js` file, start by importing `<ImageBackground>`:


    import {
      View,
      Text,
      Button,
      Image,
      ImageBackground,
    } from 'react-native';

Next, change the `App` component as follows:


    const App = (props) => {
      return (
        <View style = { styles.container } >
        <ImageBackground  style= { styles.backgroundImage } source={{uri: 'http://i.imgur.com/IGlBYaC.jpg'}} >
                
          <View style= { styles.logoContainer }>
            <Text style = { styles.logoText }>
              Newzzz
            </Text>
            <Text style = { styles.logoDescription }>
              Get your doze of daily news!
            </Text>
            
          </View>
          </ImageBackground>
        </View>
      );
    } 

Next, change the `backgroundImage` style as follows:


        backgroundImage:{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.7
        },

This is the screenshot of our view:


![BackgroundImage Example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565108777214_Screenshot_1565108693.png)


