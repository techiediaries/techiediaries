---
layout: post
title: "Creating your first React Native project"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we’ll teach you to build your first React Native mobile app from scratch going through the essential concepts"
tags: [ 'reactnative' , react ] 
categories: react-native-tutorial
---

After introducing React Native and seeing all the required prerequisites for creating a mobile application with React Native, let's now see how to create our first project from scratch.

Open a new terminal and run the following code to invoke the [React Native CLI](https://github.com/react-native-community/cli) using the `npx` command:


    $ npx react-native init firstapp


> **Note**: Before continuing, you should, by now, have started your Android emulator or connected a real device to your machine. 

Next, start the Metro Bundler using the following commands:

 

    $ cd firstapp
    $ react-native start


> **Note**: [Metro](https://facebook.github.io/metro/) is a JavaScript bundler for React Native which is fast, scalable and integrated that compiles your React Native code (ES6+) to JavaScript (ES5) using Babel. 

You need to leave Metro running. So open a new terminal and run the following commands to compile and launch your application in the Android emulator:
    

    $ cd firstapp 
    $ react-native run-android   

   
The `run-android` command will compile and install the app in Android.


> **Note**: If you are under a macOS and you want to install the app in an iOS emulator or real device, you need to use the `react-native run-ios` command instead.


You need to wait for your app to be built. You’ll finally get the **BUILD SUCCESSFUL** message in your terminal and your app should be opened in the emulator or a real device if attached.

This is a screenshot:


![React Native App in the Android Emulator](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564919621852_Screenshot+from+2019-08-04+12-39-41.png)


 
This is a screenshot of our app running inside an Android emulator:


![React Native App on Android](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564879162661_Screenshot_1564872622.png)


As, we previously mentioned, if you have Android SDK Platform Tools v29, you may get  **adb: error: cannot bind listener: Operation not permitted.** In this case, you need to downgrade to v28. Refer the previous **Testing on Android and Ubuntu 19.04** section.

## Opening your project in Visual Studio Code

After running your app inside the Android emulator. Run the following command to open the project in Visual Studio Code from your project’s folder:


    $ code .


![React Native Project in VS Code](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564921198015_Screenshot+from+2019-08-04+13-19-42.png)


## The anatomy of a React Native project

In the left panel, we can see the structure of our project. It includes the typical folders and configuration files for a Node.js project such as the `package.json` and `package-lock.json` files and the `node_modules` folder. We have also other configuration files such as:


- `babel.config.js`: The configuration file for Babel (A compiler and transpiler for JavaScript)
- `metro.config.js`: The configuration file for Metro, a JavaScript bundler for React Native,
- `app.json`: configures parts of our app that don’t belong in code. See this [article](https://docs.expo.io/versions/latest/workflow/configuration/).
- `watchman.config`: The configuration file for [Watchman](https://facebook.github.io/watchman/), a file watch service,
- `.flowconfig`: The configuration file for [Flow](https://flow.org/), a static type checker for JavaScript,
- `.eslintrc.js`: The configuration file for [ESLint](https://eslint.org/), a JavaScript and JSX linter (a tool for code quality),
- `.buckconfig`: The configuration file for [Buck](https://buck.build/), a build system created by Facebook,
- `.gitignore` and `.gitattributes`: ignores all files in version control that should be unique to each development machine

We have the following folders:


- `android`: The folder for the Android project,
- `ios`: The folder for the iOS project,
- `__tests__`: The folder for tests.


We have the following JavaScript files:


- `App.js`: The main component in our React Native app,
- `index.js`: The main file of our application where the components are registered.

## Wrap-up

In this part, we have created our first React Native project using the React Native CLI via the `npx` command. We have also deployed our mobile application to our Android emulator. Finally, we have opened our project with Visual Studio Code and explained the basic anatomy of a React Native project.    

