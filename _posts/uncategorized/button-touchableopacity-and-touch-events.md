---
layout: post
title: "Creating & Styling Buttons in React Native Using TouchableOpacity, TouchableHighlight and TouchableNativeFeedback"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we'll see how to create buttons and style them and also how to create custom buttons using TouchableOpacity,  TouchableHighlight or TouchableNativeFeedback"
tags: [ 'reactnative' ] 
categories: react-native-tutorial
---

In this tutorial, we'll see how to create buttons and style them and also how to create custom buttons using `TouchableOpacity`,  `TouchableHighlight` or `TouchableNativeFeedback`.

React Native provides a `Button` component that has a nice look on all platforms and provides touch events for common gestures like tapping.


In case, the Button component is not enough for your app in terms of look and customizations, you can also build your own custom button using any the base components (`TouchableOpacity`, `TouchableHighlight` and `TouchableNativeFeedback`) provided by React Native.

The `TouchableOpacity`, `TouchableHighlight` and `TouchableNativeFeedback` components allow you to listen for touch events and display feedback when users touch the button area. You'll be able to build a button with any layout and look by using styles and the other builtin components like `View` and `Text`.

There are some differences between the [TouchableOpacity](ttps://facebook.github.io/react-native/docs/touchableopacity), [TouchableHighlight](https://facebook.github.io/react-native/docs/touchablehighlight) components and [TouchableNativeFeedback](https://facebook.github.io/react-native/docs/touchablenativefeedback), such as:

- `TouchableOpacity`, `TouchableHighlight` are mainly used for iOS,
- `TouchableNativeFeedback` is mainly used for Android,
- `TouchableOpacity` increases the lighteness of a button when touched while `TouchableHighlight` increases the darkness of a button when touched.

Let’s add two buttons for opening the URL of the article or bookmarking it for reading later.

Change your `ArticleItem` as follows:


    const ArticleItem = ({article}) => {
      const { description, url, urlToImage } = article;
      return (
        <View>
          <Image source={{ uri: urlToImage }} />
          <Text>
            { title }
          </Text>
          <Text>
            { description }
          </Text>
          <Button onPress = { () => { console.log("Button pressed!")} } title="Open" />
          <Button onPress = { () => { console.log("Button pressed!") } } title="Read later" />
        </View>
      )
    }

When we press one of the buttons, **Button pressed!** will be logged. We’ll implement these buttons later.
 
Next, use the component in `HomeScreen`:


    const HomeScreen = (props) => {
      console.log("articles: ", props.articles);
      return (
        <View>
            <FlatList
              data={ props.articles }
      renderItem={({item}) => <ArticleItem article = { item }/>}
            />
        </View>
      );
    } 

 
This is a screenshot of our home screen:


![React Native Button Example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565137928552_Screenshot_1565137761.png)


We get a basic look, plus the images don’t show at all! 

Press one of the buttons, you should see something like **ReactNativeJS ▶︎ Button pressed!** logged if you look at the logkitty terminal.


Let’s now add some styles to make the UI more professional. Open the `styles.js` file and append the following styles:


    const styles = StyleSheet.create({
        /* [...] */
    
        articleContainer:{
            borderWidth: 0,
            width: '100%',
            padding: 5
        },
        articleImage: {
            height: 200  
        },
        articleTitle:{
            textAlign: "center",
            padding: 20,
            fontSize: 17,
            color: 'black',
            backgroundColor: 'white',
            
        },
        articleDescription:{
            fontSize: 17,
            padding: 10,
            color: 'black',
            backgroundColor: 'white',
        },
        articleBtns:{
            flexDirection: 'row',
            backgroundColor: 'white',
        },
    });


Next, apply the styles on their corresponding components:


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
          <Button onPress = { () => { console.log("Button pressed!")} } title="Open" />
          <Button onPress = { () => { console.log("Button pressed!") } } title="Read later" />
          </View>
        </View>
      )
    }

This is a screenshot of our UI, at this point:



![React Native Styled Button](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565204831223_Screenshot_1565204572.png)


## Styling buttons 

We used the `<Button>` component to create two buttons for reading and bookmarking the news articles. Those buttons look nice, but we still need to add some styles even if just some margin space between the two buttons. Unfortunately, this is not possible! For example, try the following styles:


          <Button style= {{ width: '50%' }} onPress = { () => { console.log("Button pressed!")} } title="Open" />
      

This won’t have any effect on the button. 

React Native provides other solutions like `TouchableOpacity` which allows you to create your own custom buttons and styles them however you like.

You can create your custom button using `<TouchableOpacity>` or simply use it to apply some styles to the existing button. In the `<ArticleItem>` component, wrap both buttons as follows:


          <TouchableOpacity style= {{ width: '50%' }} >
            <Button onPress = { () => { console.log("Button pressed!")} } title="Open" />
          </TouchableOpacity>
          <TouchableOpacity style= {{ width: '50%' }} >
            <Button  style= {{ width: '50%' }} onPress = { () => { console.log("Button pressed!") } } title="Read later" />
          </TouchableOpacity>

We give each button `50%` of the available width. This is a screenshot of our UI:

![TouchableOpacity Example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565210334035_Screenshot_1565210317.png)


This is much nicer, now!

You can also simply wrap `<Button>` inside a `<View>` container component and apply the styles to the container instead. So, this also works:


          <View style={ {width:"50%"} }>
            <Button   onPress = { () => { console.log("Button pressed!") } } title="Read later" />
          </View>

This is a simple solution but we could also use `TouchableOpacity` to create custom buttons by wrapping other components like `<Text>` and `<Image>` or a combination of them to create advanced button layouts.

You can only apply styles like width and margin to the button but things like colors are not applied. Instead, you need to use the `color` prop of `Button`:


            <Button color="#ff5c5c" onPress = { () => { console.log("Button pressed!")} } title="Open" />
    

This a screenshot of our colored buttons:

![React Native Colored Button](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565225018641_Screenshot_1565224987.png)



> **Note**: The react `Button` component renders the native button on each platform it uses. Because of this, it does not respond to the `style` prop. It has its own set of props.


Refer to this [link](https://facebook.github.io/react-native/docs/button.html) for a reference of the available props.

The `color` prop of `Button`  can be only used to change the background color of the button not the color of the text. Again, we need to use `[TouchableOpacity](https://facebook.github.io/react-native/docs/touchableopacity)` or `[TouchableHighlight](https://facebook.github.io/react-native/docs/touchablehighlight)` for changing the foreground color and other customization.

Let’s see this with example. 

First, prepare two icons in the PNG format, create an `assets` folder and place them in it. Call one `bookmark.png` and the other `read.png` .

Next, in your `App.js` file import the icons:


    import bookmarkIcon from './assets/bookmark.png';
    import readIcon from './assets/read.png';

Next, import the `TouchableOpacity` component:



    import {
      TouchableOpacity
    } from 'react-native';

Next, create `BookmarkButton` and `ReadButton` as follows:



    const BookmarkButton = ({title, color, onPress, width }) =>{
      return (
        <View style={ {width: width } }>
          <TouchableOpacity onPress = { onPress } style= { { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff5c5c'} }>
          <Image style = { { height: 27, width:27, margin : 5 } } source = {  bookmarkIcon }></Image>
          <Text style = { {color: color }} > { title } </Text>
          </TouchableOpacity>
        </View>
      );
    };
    const ReadButton = ({title, color, onPress, width }) =>{
      return (
        <View style={ {width: width } }>
          <TouchableOpacity onPress = { onPress } style= { { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff5c5c'} }>
          <Image style = { { height: 27, width:27, margin : 5 } } source = {  readIcon }></Image>
          <Text style = { {color: color }} > { title } </Text>
          </TouchableOpacity>
        </View>
      );
    };

Next, change the `ArticleItem` by using the previous custom buttons instead:


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
            
          <ReadButton width= '50%' color="white" onPress = { () => { console.log("Button pressed!")} } title="Open" />
          
          <BookmarkButton width= '50%' title="Read later" color = "white" onPress = { () => { console.log("Button pressed!")} } />
          
          </View>
        </View>
      )
    }

This is a screenshot of our UI:

![React Native TouchableOpacity Example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565231084720_Screenshot_1565230955.png)


In fact, we can take re-usability to the next level by creating only one custom button and use props to customize it.


    const IconButton = ({title, color, bgcolor, onPress, width, icon }) =>{
      return (
        <View style={ {width: width } }>
          <TouchableOpacity onPress = { onPress } style= { { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: bgcolor } }>
          <Image style = { { height: 27, width:27, margin : 5 } } source = {  icon }></Image>
          <Text style = { {color: color }} > { title } </Text>
          </TouchableOpacity>
        </View>
      );
    }

Next, replace the two buttons with the following:


          <View style = { styles.articleBtns}>
          <IconButton width= "50%" color = "white" bgcolor = "#ff5c5c" icon = { readIcon } onPress = { () => { console.log("Button pressed!")} } title = "Open" />
          <IconButton width= "50%" color = "white" bgcolor = "#ff5c5c" icon = { bookmarkIcon } onPress = { () => { console.log("Button pressed!")} } title = "Read later" />
          </View>

We can now specify a text color, background color, width, icon and the onPress touch event for our buttons.

## When to use `TouchableOpacity`, `TouchableHighlight` or `TouchableNativeFeedback`?


`TouchableHighlight must have one child (not zero or more than one). If you wish to have several child components, wrap them in a View.`[link](https://facebook.github.io/react-native/docs/touchablehighlight.html)


You can particularly use `TouchableHighlight` on iOS for creating buttons and tochable elements.

You can use `TouchableOpacity` for lightening the opacity of a button. It can be particularly used on iOS.

You can use `TouchableNativeFeedback` on Android for creating touchable elements and buttons that respond to touch events. It adds a ripple effect to the background when touched.


This is what the [docs](ttps://facebook.github.io/react-native/docs/touchablehighlight.html) says about `TouchableHighlight`:

> A wrapper for making views respond properly to touches (Android only). On Android this component uses native state drawable to display touch feedback. [Source](h)

Let’s now change our button to use `TouchableHighlight` instead:


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

This will give the same look except that when you press the button, it will darken the view.
  
