---
layout: post
title: " React Native Tutorial & Example [2019]"
image: "images/content/reactnative.png"
excerpt: "Throughout this tutorial, you’ll learn to create your first React Native app step by step by emphasizing basic theory and practice. We'll use the latest 0.6 version released in 2019"
tags: [ reactnative, react ] 
---

Throughout this tutorial, you’ll learn to create your first React Native example app step by step by emphasizing basic theory and practice.

We’ll make use of React Native v0.6 (released in 2019), which is the latest version at the time of writing this tutorial.

## What we'll be building in this React Native tutorial?

We'll be building a simple news app example that allows you to read and save news in the local storage for reading them later. 

We’ll be using the news API from [NewsAPI.org](https://NewsAPI.org), register for an account and you’ll recieve an API key, note it and let’s continue.

![React Native Tutorial 2019](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564879135589_Screenshot+from+2019-08-03+20-51-38.png)


## What we'll be learning in this React Native tutorial?

In this React Native tutorial, we will teach you about the following topics:
 

- How to scaffold a React Native project,
- How to create a view in React Native by composing predefined UI components and Flexbox layout,
- How to implement navigation in your React Native app,
- How to style the UI, 
- How to fetch data from REST API servers, 
- How to get user input in React Native, 
- How to respond to touch events in React Native,
- How to display images in React Native, etc.

## What're the Prerequisites of this React Native tutorial?

In order to follow this React Native tutorial, you will need to have some prerequisites:



- Familiarity with modern JavaScript/ES6 features: React Native is based on React which is a JavaScript library for building UIs, so you will need to be familiar with JavaScript and the latest ES6 features such as imports, exports and arrow functions. 


- React basics:  You will need to be familiar with 
    - Components, 
    - State and properties, 
    - React Hooks,
    - JSX: JSX is a powerful syntax extension that allows you to write your UI code with XML-like syntax and JavaScript., etc.
- Node.js and NPM: We’ll be using React Native CLI for generating and working with our project which is built on to of Node.js, so you will need to have Node.js 8.3+ and NPM installed on your system. You can refer to the official docs for how to [install Node.js using a package manager](https://nodejs.org/en/download/package-manager/).
- JDK 8+ and Android Studio installed on your system for Android development.
- The `ANDROID_HOME`  environment variable set to the path of your Android SDK.

On Ubuntu, you can add Android SDK to your `PATH` by adding the following lines to the  `~/.bash_profile` or `~/.bashrc` configuration files:


    export ANDROID_HOME=$HOME/Android/Sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/tools/bin
    export PATH=$PATH:$ANDROID_HOME/platform-tools

We also added the `tools/bin` and `platform-tools` folder to the `PATH` variable to be able to run various utilities like `adb` from any folder. Next, run the following command:


    $ source ~/.bashrc 


## How to run an Android Emulator

You can test your React Native app in a real device or better yet an emulator. Make sure you have created an Android Virtual Device in your system. Next, check the names of the installed AVDs using the following command in your terminal:


    $ emulator -list-avds

For example, I have the following virtual device installl:


    Pixel_2_XL_API_28


Next, you need to run the following command to start your emulator with a chosen AVD:


    $ emulator -avd Pixel_2_XL_API_28



## Editing the code with Visual Studio Code

This is not a requirement and you can use your prefered IDE but in this React Native tutorial we’ll be use Visual Studio Code. It has great support for JavaScript and you can easily install it from the [official website](https://code.visualstudio.com/).

### For iOS development

You can also built your React Native app for iOS provided that you are using a macOS, you only need to get a free **iOS developer account**. 


> **Note**: To deploy the app to the iOS App Store**,** you will need to get a license with $99/year. 

For development, you will need to install Xcode from the [official Xcode website](https://developer.apple.com/xcode/).


> **Note**: Xcode includes the Xcode IDE, the iOS simulators, and the iOS SDK. ****


## Generate your React Native project

If you have the previous prerequisites, let’s get started by generating a new React Native project using React Native CLI.

Head over to a new terminal and run the following command to run the [React Native CLI](https://github.com/react-native-community/cli) using the `npx` command:


    $ npx react-native init firstapp


> **Note**:  Thanks to the npx tool, you don’t need to install React Native CLI. You can run directly from npm. 

We used the `init` command of React Native CLI to create a project called *firstapp*.


Next, you need to navigate inside your React Native project and run the Metro Bundler using the following commands:

 

    $ cd firstapp
    $ react-native start

[Metro](https://facebook.github.io/metro/) is a bundler for JavaScript and React Native created by Facebook for compiling the React Native code. 

Next, let’s leave Metro running and open a new terminal where you need to run the following commands to build and start your React Native application in the Android emulator you started earlier:
    

    $ cd firstapp 
    $ react-native run-android   

   
The `run-android` command will build and run the app in the Android virtual device.


> **Note**: For iOS, you will need to use the `react-native run-ios` command to build and run your app.

If your React Native app is successfully built, you’ll see a **BUILD SUCCESSFUL** message in your terminal and your app will be started in the Android emulator:


![React Native App in the Android Emulator](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564919621852_Screenshot+from+2019-08-04+12-39-41.png)


 
This is a screenshot of our app running inside an Android emulator:


![React Native App on Android](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564879162661_Screenshot_1564872622.png)

Congratulations, you have started your first React Native app in your Android emulator. Now, let’s start writing the code.

If you have VS Code installed, head back to your previous terminal and run the following code from your project’s folder to open your it in VS Code: 


    $ code .


![React Native Project in VS Code](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564921198015_Screenshot+from+2019-08-04+13-19-42.png)


If you do any changes in your code, they will be live reloaded in your Android emulator so you don’t need to restart your app again.


## Understanding the structure of your React Native project

 
After running our React Native app and opening the project in our IDE, let’s understand the structure of our project.
 
The project has the typical folders and configuration files for a Node.js project like the `package.json` and `package-lock.json` files and the `node_modules` folder. We also have these files and folders:


- `babel.config.js`: The configuration file for Babel (A compiler and transpiler for JavaScript)
- `metro.config.js`: The configuration file for Metro, a JavaScript bundler for React Native,
- `app.json`: configures parts of our app that don’t belong in code. See this [article](https://docs.expo.io/versions/latest/workflow/configuration/).
- `watchman.config`: The configuration file for [Watchman](https://facebook.github.io/watchman/), a file watch service,
- `.flowconfig`: The configuration file for [Flow](https://flow.org/), a static type checker for JavaScript,
- `.eslintrc.js`: The configuration file for [ESLint](https://eslint.org/), a JavaScript and JSX linter (a tool for code quality),
- `.buckconfig`: The configuration file for [Buck](https://buck.build/), a build system created by Facebook,
- `.gitignore` and `.gitattributes`: ignores all files in version control that should be unique to each development machine,
- `android`: The folder for the Android project,
- `ios`: The folder for the iOS project,
- `__tests__`: The folder for tests,
- `App.js`: The main component in our React Native app,
- `index.js`: The main file of our application where the components are registered.

That’s it. We have seen the most important files and folders of our React Native project generated using the official CLI.


## Create a React Native screen

After understanding the basic structure of our project, let’s now see how we can use the prebuilt React Native UI components to create a view.

We already have an `App.js` file which contains the code of the root React component in our app. So go ahead and open the `App.js` file in your code IDE, and remove the existing code then add the following code instead:



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

We first import `React` from `react`, next we import the View and Text components from `react-native`.

Next, we create a functional React component called `App` using the ES6 arrow syntax. This function returns the JSX code that describes the UI of our screen.

The `View` and `Text` components are basic UI components that can be considered as the equivalents to the `<div>` or `<span>` and `<p>` elements in HTML.

Finally, we export the App function so it can be imported from the other files.

After saving the file, go to your Android emulator and press **R** twice in your keyboard to reload your app. You should get the following UI:


![React Native App](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564928638096_Screenshot_1564928597.png)


The previous JSX code created an empty screen with a **Hello, world!** text at the center.
 
**JSX** is an extension for JavaScript that allows you to write HTML-like markup in JavaScript.   
 
> **Note**: You can think of JSX as a template language with JavaScript syntax.

You can also include JavaScript code inside JSX using curly braces `{ }`.

## The React Native `View` Component 

In our `App` component, we used the `View` component to create a container for our text 

[View](https://facebook.github.io/react-native/docs/view.html) is a fundamental React Native component for creating a UI. It’s simply a container which is equivalent to a native view such as `UIView` in iOS, or `android.view` in Android.

You can nest View components to create complex layouts and add zero or multiple children inside a View.

View supports the Flexbox layout by default, can have styles and can listen for touch events.

## The React Native `Text` Component 

Inside the `View` container, we used a [Text](https://facebook.github.io/react-native/docs/text) component which wraps our **Hello World** text.

In React Native, you have to use a Text component if you want to display text in the UI. It supports nesting, styling, and touch handling.

For example, we could write our previous component without the `<View>` component and it will still work:


    const App = () => {
      return (
          <Text>Hello, world!</Text>
      );
    };

But we can’t add text without the `<Text>` component. For example, if you write the following code:


    const App = () => {
      return (
        <View style={ { flex: 1, justifyContent: "center", alignItems: "center" } }>
          Hello, world!
        </View>
      );
    };

 
You will get an **Invariant Violation** error with the **Text strings must be rendered within a** `<Text>` component message:
 

![React Native Text Error](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564933126462_Screenshot_1564933115.png)


## Styling the UI in React Native 

At this point of our React Native tutorial, we have seen how to create a basic screen using the View and Text components. Let's now see how to style our simple UIs using CSS written in JavaScript. The CSS properties are defined using the [camelCase](https://en.wikipedia.org/wiki/Camel_case) instead of hyphens. For example, you need to use `backgroundColor` instead of  `background-color`.

All the React Native components like View and Text can have a `style` prop in which you can provide styles for the component using an inline JavaScript object or a reference to a JavaScript variable that contains the styles.

You can also provide an array of styles with the last style has precedence which can be used for emuating style inheritance which doesn't exist in React Native.


In our previous example, we supplied some inline styles using the `style` prop which allowed us to center the text in our view:


    <View style={ { flex: 1, justifyContent: "center", alignItems: "center" } }></View>
    


## Adding styles in React Native with `StyleSheet`

React Native provides a `StyleSheet` API that allows you to define and manage multiple styles in seprate places of files instead of adding them in your JSX code.

You simply need to call the `StyleSheet.create()` method for defining reusable styles in one place/fie and reference them from your JSX code. 


> **Note**: In React Native, styles don’t cascade, but you can emulate cascading by re-using the same style object in the parent and chidren components.

At this point of our React Native tutorial, we have added some inline styles to our View component to center our **Hello World** text which is fine for our simple example but for the sake of learning best practices, let's take the inline styles from the JSX and define them in their own object using the `StyleSheet.create()` method. 

Head over to your code IDE, locate the `App.js` file and start by importing `StyleSheet` as follows:


    import {
      StyleSheet,
    } from 'react-native';

Next, in the same file, add a `styles` variable and add your styles using the `StyleSheet.create()` method as follows:


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }
    });

We can now use the `container` reference to apply our styles to any React Native component.

Next, apply the styles to `View` component as follows:


    const App = () => {
      return (
        <View style={styles.container}>
          <Text>
            Hello, world!
          </Text>
        </View>
      );
    };

You can also pass an array instead of one object to the `style` prop:


    const App = () => {
      return (
        <View style={ [styles.container] }>
          <Text>
            Hello, world!
          </Text>
        </View>
      );
    };



> **Note**: Fo bigger apps, you can also add styles in separate files and import them using the `import` statement so you can reuse them in multiple views.

Again for the sake of learning the best practices, let’s define styles in a separate file in our simple tutorial example. 

First, let's start by creating a new `styles.js` file. Head back to your terminal and run the following command from your project's folder:


    $ touch styles.js

Next, add the following code in the `styles.js` file:


    import {
        StyleSheet,
    } from 'react-native';
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    });
    export default styles;

We import `StyleSheet` from `react-native` and we call the `create()` method to create a bunch of styles referenced by `container`. We also need to export the `styles` object so we can import it from the other JS files.

Next, you need to import the `styles` object in your `App.js` file as follows:


    import styles from './styles';
    
    const App = () => {
      return (
        <View style={ [styles.container] }>
          <Text>
            Hello, world!
          </Text>
        </View>
      );
    };



## Building layouts in React Native with Flexbox

Ath this point of our React Native tutorial, we have created a basic screen using some fundamental UI components such as View and Text and we have seen how to define styles and apply them using the `style` prop. We have also seen how to build a basic layout using Flexbox, let's now see more details about Flexbox.

Flexbox is the default layout for buiding UIs in React native. It's quite similar how it works in CSS except that the `flexDirection` defaults to `column` instead of `row`, and the `flex` parameter supports only a single number (a proportion of the available space).

In Flexbox, items are laid out horizontally or vertically (default) depending on the value of the `flexDirection` property (`row` | `column` | `row-reverse` | `column-reverse` ).

### Flex

The `flex` property is designed to specify a proportion of the available space (vertical or horizontal depending on `flexDirection`) to a child element.


> **Note**: You don’t need to add `display: flex` to a container to make it a flex container. Elements are by default flex containers. 

You can also use properties like `justifyContent` and `alignItems` to align items either on the X-axis or the Y-axis.

### Justifying Content

You can use the `[justifyContent](https://facebook.github.io/react-native/docs/layout-props#justifycontent)` property to define how to align items in the main axis of a container. The main axis can be either the X-axis or the Y-axis depending on the value of `flexDirection` which means:


- When `flexDirection`  is set to `column` , `justifyContent` will align items vertically,
- When `flexDirection`  is set to `row` , `justifyContent` will align items horizontally,

You can align items in many ways:


- `flex-start` (default): Align the items to the start of the container,
- `flex-end`: Align the items to the end of the container,
- `center`: Align the items in the center of the container,
- `space-between`: Align the items across the main axis of the container with equal space between them.
- `space-around`: Align the items across the main axis of the container, the remaining space will distributed around all items i.e to the beginning of the first child and end of the last child.

### Aligning Items

You can use the `[*alignItems*](https://facebook.github.io/react-native/docs/layout-props#alignitems)` *property to specify how to align items along the cross axis of the container.* 

Align items is similar to `justifyContent` but it aligns items according to the cross axis.

It takes the following values:


- `stretch` (default): Stretch children of a container to match the `height` of the container's cross axis.
- `flex-start` Align children of a container to the start of the container's cross axis.
- `flex-end` Align children of a container to the end of the container's cross axis.
- `center` Align children of a container in the center of the container's cross axis.
- `baseline` Align children of a container along a common baseline. Individual children can be set to be the reference baseline for their parents.


> **Note**: You can use this [playground](https://yogalayout.com/playground/) to visually play with Flexbox. 

Equipped with this basic information about Flexbox, let’s understand our previous snippet and improve it:


        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }

This is the style object applied to the `<View>` component.

We used the `flex` property to assign the available space to the container `<View>`. This means it will span all the viewport since we only have one `<View>` component. 

We used the `justifyContent` property with a `center` value to center the children of the `<View>` component vertically and the `alignItems` property set to `center` to center the children of the `<View>` horizontally.

This makes the **Hello, world!** text (wrapped within the `<Text>` component) vertically and horizontally centered in our application:


![React Native Tutorial](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564928638096_Screenshot_1564928597.png)


## Adding images in React Native

Images are important in most apps, let's see how to add a background image in our React Native tutorial.

Let’s add a background image to our previous screen.

Since the previous screen is the only screen in our example app, let's make it the welcome/splash screen of our app that shows an image with the name of our app. 

Head over to your IDE, change the `App` component to show the name and description of our app.


In your `App.js` file, import `<ImageBackground>` as follows:


    import {
      View,
      Text,
      Button,
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


Let's also add some styles for the new elements. Go to  the `styles.js` file and add the following styles:


    const styles = StyleSheet.create({
        container: {
            flex: 1,
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
        },
        backgroundImage:{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.7
        }
    });


This is the screenshot of our view:


![React Native example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565108777214_Screenshot_1565108693.png)

## Creating multiple React Native screens

At this point of our React Native tutorial, we have created a basic splash screen with some text and a background image that can be considered as a welcome screen of our app. Let’s create another screen that will be used to render the news headlines from the news REST API.

In the same `App.js` file, define a `HomeScreen()` function as follows:


    const HomeScreen = () => {
      return (
        <View>
          <Text>
            Here, will be rendered our news.
          </Text>
        </View>
      );
    }


Before tacking React Native navigation, let's see how we can use [conditional rendering](https://reactjs.org/docs/conditional-rendering.html) to create and change between multiple views in simple example apps. 

First, change the name of the original `App` component to `SplashScreen`. Now we have two components: `SplashScreen` and `HomeScreen`.

Next, define a new `App()` function as follows:


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

We used the `useState` hook to define a `loading` state variable so you also need to import the `useState()` method:


    import React, { useState } from 'react';

The laoding variable has an initial value of `true` which means the `<SplashScreen />` component will be rendered. After one second, the value of loading will be `false` which will cause the `<SplashScreen />` to disappair and `<HomeScreen />` will be rendered instead.

This is just for the sake of showing how conditional rendering can be used to create multiple views. We'll see later in this React Native tutorial how we can use a real navigation system to implement mutiple views with more control and features. 

## Fetching data in React Native

Instead of switching between the two views based on time, let’s see how we can fetch data from a remote REST API before displaying the home screen. This is a more realistic use case!


In React Native, you can use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for calling REST APIs or getting data from web servers. 

In a functional React components, we don't have life-cycle methods so we need to use the `useEffect` hook for performing side effects.


In the `App.js` file, import the `useEffect()` method as follows:


    import React, { useState, useEffect } from 'react';



Next, define the `API_KEY` and `URL` constants as follows:


    const App = () => {
      const API_KEY = "<YOUR_API_KEY_HERE>";
      const URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;


> **Note**: You need to replace `<YOUR_API_KEY_HERE>` with your API key from the News API.

Next, define the `articles` variable for storing the articles and initialize it with an empty array:


      const [articles, setArticles] = useState([]);

Next, call the `fetch()` API in the `useEffect()` method to get data from the news API:


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



Also, finally we need to pass the `articles` variable to the `<HomeScreen>` component using a custom `articles` property as follows:


      if (loading){
          return <SplashScreen />
        } else {
          return <HomeScreen articles = { articles }/>
      }


As you can guess, the HomeScreen component doesn't actually know about any prop called `articles` so we need to modify our component to render the items passed via the `articles` prop:


    const HomeScreen = (props) => {
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

We simpy render each news article using a `Text` component.

This not the most efficient method of rendering lists. In the next section of our React Native tutorial, we’ll learn how to use the  `FlatList` component to render lists.


## Rendering lists in React Native

In React Native, you can use [FlatList](https://facebook.github.io/react-native/docs/flatlist) or [SectionList](https://facebook.github.io/react-native/docs/sectionlist) for rendering lists.

Let's change our previous code to use a flast list. In the `App.js` file, start by importing 
the `FlatList` component as follows:


    import {
      FlatList
    } from 'react-native';

Next, update the `HomeScreen` component as follows:


    const HomeScreen = (props) => {
      return (
        <View>
            <FlatList
              keyExtractor={(item, index) => index.toString()
              data={ props.articles }
      renderItem={({item}) => <Text> {item.title}</Text>}
            />
        </View>
      );
    }

We use the data prop to pass the articles to the list and the renderItem to tell React Native how to render each item of our data. In our example, we simply render the title of each item using the `Text` component:

![React Native FlatList Example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565123455841_Screenshot_1565123418.png)

We can also render complex components as the list item. Let's first create a custom component that dispays the title and description of a news article.

In the `App.js` file, define the `ArticleItem` component as follows:


    const ArticleItem = ({article}) => {
      const { description, title } = article;
      return (
        <View>
          <Text>
            { title }
          </Text>
          <Text>
            { description }
          </Text>
        </View>
      )
    }

The component accept an `article` prop and render the title and description of the article with Text components. 

## Using buttons in React Native

React Native provides a button component and a set of "Touchable" components for implmenting custom buttons if the default one is not enough.

We need to be able to open a news article or save it for reading later in our app so let's change our `ArticleItem` component as follows:


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

For now, when your press the buttons you will only see **Button pressed!** message in the terminal if you are listenning for logs. We’ll learn how to implement the actual features using the `Linking` and `AsyncStorage` modules in our React Native tutorial in the next sections.
 
We also added an `<Image>` component to display the image of the article.


Next, let's wire the `ArticleItem` component to the `FlatList` component in `HomeScreen` function as follows:


    const HomeScreen = (props) => {
      return (
        <View>
            <FlatList
              data={ props.articles }
      renderItem={({item}) => <ArticleItem article = { item }/>}
            />
        </View>
      );
    } 

 
This is our UI at this point:


![React Native Example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565137928552_Screenshot_1565137761.png)

Unlike what's expected the images of the articles don’t appear! 

To solve this issue, we need to add a height to the Image component. Head over to the `styles.js` file and add the following styles:


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


Next, you need to apply the styles to their components:


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

Now, we have a much better UI:



![React Native UI](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1565204831223_Screenshot_1565204572.png)

## Tutorial wrap-up 

Throughout this React Native tutorial for the latest v0.6 released in 2019, we have created a simple example mobile app for Android and iOS using the fundamental concepts in React Native.  
