---
layout: post
title: "React Native v0.6 for Beginners [2019]: Build your First Mobile App with JavaScript"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we’ll teach you to build your first React Native mobile app from scratch going through the essential concepts"
tags: [ 'reactnative' ] 
---

In this tutorial, we’ll teach you to build your first React Native mobile app from scratch going through the essential concepts.

We’ll be using React Native v0.6, the latest version as of this writing.


![React Native Tutorial](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564879135589_Screenshot+from+2019-08-03+20-51-38.png)



You will learn how to:

- Open your React Native project in Visual Studio Code,
- Compose your first React Native component using View & Text,
- Style components in React Native,
- Define styles with React Native' `StyleSheet`,
- Create layouts in React Native with Flexbox — `flex`, `flexDirection`, `justifyContent` & `alignItems`
- Add a background image with `<Image>` & `<ImageBackground>` in React Native,
- Use React conditional rendering for multiple views
- Use Fetch in React Native for networking,
- Display lists of data in React Native using `FlatList`
- Create buttons with the Button & Touchable components and listening for touch events in your React Native app,
- Save data in local databases with `AsyncStorage` in your React Native app,
- Open external links with Linking in your React Native app,
- Add Navigation using React Navigation, etc.



## React Native vs. Cordova and Ionic

Unlike Cordova, Ionic and other hybrid mobile solutions, you can use React Native for writing truly-native mobile applications for Android and iOS using JavaScript, React, JSX and a bridge that invokes the native rendering APIs for the target mobile system. 

As a result, your application is actually a native application that looks and feels like the native host UI and not a web application that runs inside a web-view. This means, your app will have increased performance that can be slightly equaled to the performance of apps built using Java for Android and Swift for iOS. 


> **Note**: React Native apps fall slightly in terms of performance behind apps built with native languages like Java and Swift because we still have the JS bridge between the app and the native APIs.



## Prerequisites

You will need the following prerequisites to successfully follow this tutorial.
 
### Modern ES6 features

React Native is built on top of React - A popular JavaScript front-end library for building user interfaces, so you will need to know JavaScript including the latest ES6 features such as imports, exports and arrow functions. 

### React basics

**React Native** is simply **React** + a **native bridge**.

So if you learn React, you’ll also end up learning most of React Native and vice versa! 

Except that for React, you’ll need to use HTML and for React Native, you need to use some predefined UI components designed for mobile UIs.

You need to know about:


- Props and state, 
- The component life-cycle methods, 
- How to create React (class-based or function-based) components, 
- React Hooks,
- JSX.

JSX allows you to write XML markup inside JavaScript files. According to the [official website of React](https://reactjs.org/docs/introducing-jsx.html), it’s defined as:


> A syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.

### React hooks - `useState`,`useEffect` and `useContext`

React is now leaning toward a function-based approach for writing components with the introduction of React Hooks which allow you to access the state and other features, which were only available in class-based components before, in your function components.

### Props, state and context

Props, state and context are important concepts in React.

React Native components have predefined props that allow users to configure them. For example, all components have the `style` prop that’s used to apply styles. 
 ****

### Node.js and NPM

The React Native CLI is based on Node.js, so you will need to have Node.js 8.3+ and NPM installed on your machine.

See how you can [install Node.js using a package manager](https://nodejs.org/en/download/package-manager/).


### Testing React Native Apps on Android and Ubuntu 19.04

We’ll be testing our app inside an Android emulator installed on a Ubuntu 19.04 system. So you will need to have:


- JDK 8+ and Android Studio installed on your machine.
- The `ANDROID_HOME`  environment variable set to the path of your Android SDK.

On Ubuntu, you can add Android SDK to your `PATH` by adding the following lines to the  `~/.bash_profile` or `~/.bashrc` configuration files:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

We also added the `tools/bin` and `platform-tools` folder to the `PATH` variable to be able to run various utilities like `adb` from any folder. Next, run the following command:

```bash
$ source ~/.bashrc 
```


> Android Debug Bridge (adb) is a versatile command-line tool that lets you communicate with a device. The adb command facilitates a variety of device actions, such as installing and debugging apps, and it provides access to a Unix shell that you can use to run a variety of commands on a device. [Source](https://developer.android.com/studio/command-line/adb)

As the time of this writing, the latest version of Android SDK Platform Tools version is v29 which has a bug that causes the **adb: error: cannot bind listener: Operation not permitted** and prevents the hot-reload of the changes in the emulator when updating the source code. As of now, you can solve this problem by downgrading your tools to v28 as follows:


- Open Android Studio and go to `SDK Tools`,
- Uncheck `Android SDK Platform Tools` and click `Apply`
- Download `Android SDK Platform Tools 28` using this [link](https://dl.google.com/android/repository/platform-tools_r28.0.0-linux.zip). 
- Unzip the `platform-tools` folder into your Android SDK folder.

See the [adb: error: cannot bind listener: Operation not permitted](https://github.com/react-native-community/cli/issues/437) and [Cannot bind listener: operation not permitted](https://github.com/microsoft/vscode-react-native/issues/1028) issues for more information.

### Starting your React Native app with an Android Emulator

First, let’s see the installed AVDs in our system:

```bash
$ emulator -list-avds
```

In my case, I get the following output:


    Pixel_2_XL_API_28


> **Note**: AVDs stands for Android Virtual Devices. They are not available by default after you install Android Studio. So you’ll need to create an AVD before you can use it to start an emulator. 

Next, you can start your emulator with a specified AVD, using the following command:

```bash
$ emulator -avd Pixel_2_XL_API_28
```

For more information, you can also refer to [Start the emulator from the command line](https://developer.android.com/studio/run/emulator-commandline).

### Open you React Native project in Visual Studio Code

We’ll be using Visual Studio Code as our source code editor. It’s available for Windows, Linux and MAC. It has built-in support for JavaScript, TypeScript and Node.js. You can simply go to the [official website](https://code.visualstudio.com/) and download the right binaries for your system.

On Ubuntu 19.04, you can also install it from the Snap store by running the following command:

```bash
$ sudo snap install code
```

Watch this video for how to get started with VS Code:


<iframe  src="https://www.youtube.com/embed/Sdg0ef2PpBw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### For iOS development

To target iOS, you will need to have a macOS system, next you need to get ****an iOS developer’s account**.** It’s available for free, but only for development. ****


> **Note**: To deploy the app to the iOS App Store, you will need to get a license with $99/year. 

Next, you need to download and install Xcode, from the App Store or from the [official Xcode website](https://developer.apple.com/xcode/).


> **Note**: Xcode includes the Xcode IDE, the iOS simulators, and the iOS SDK.


## Wrap-up

We have seen what we are going to learn by building a mobile application using JavaScript and React Native and all the prerequisites that we are going to need in order to work with React Native in our machine. 

Let's continue to the next part where we'll [create our first React Native project](https://www.techiediaries.com/react-native-tutorial/create-first-reactnative-project/).
