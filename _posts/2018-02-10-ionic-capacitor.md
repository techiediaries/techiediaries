---
layout: post
title: "Using Capacitor with Ionic 4"
image: "images/content/ionic.jpg"
excerpt: "In this tutorial we'll see how we can add Capacitor to an Ionic 3 project instead of Cordova" 
tags : [capacitor, ionic] 
featured: true
---

Capacitor is the new open source project created by the Ionic team which is now in its [Alpha version](https://blog.ionicframework.com/announcing-capacitor-1-0-0-alpha/)

Capacitor aims to provide a better alternative to Cordova for Ionic apps that will allow you to build apps that can run natively on major mobile (Android, iOS etc.), desktop (thanks to Electron) and web (as progressive web apps) platforms.

There is no magic behind Capacitor because what it does is providing a cross platform API that runs the right methods depending on the underlying platform.

Capacitor has a plethora of features so I will quote from [this article](https://blog.ionicframework.com/announcing-capacitor-1-0-0-alpha/) on the Ionic blog

>-   First class Progressive Web App support: use the same APIs you do for native apps on the web for 100% code sharing, including Web UI’s for plugins like `Camera`!
>-   Simple Plugin model for building reusable plugins or quickly adding custom native code
>-   Embraces Swift on iOS for maximum compatibility with existing iOS developer ecosystem
> -   A rich standard library of Native features with simple APIs, such as Filesystem access, Haptic feedback, Background tasks, and more.
> -   Treats your native project as a source artifact, making it easy to add custom native code and install SDKs that require native
> modifications, as well as sharing native work with existing native
> developer teams (if desired).
> -   Drops into any existing modern frontend project
> -   Has no global CLI, so versions of Capacitor are easily managed per-app
> -   Plugins are managed through `npm install`.
> -   Support for many Cordova plugins (and improving all the time).

Now without further introduction let's see how we can use Capacitor with an Ionic app instead of Cordova. 

In future, the Ionic CLI will provide the option to use Capacitor when you generate a new app but for now you'll need to take care of that manually.

## Generating a New Ionic App

First let's start by generating a new Ionic app. For that head over to your terminal and run the following command:

```bash
ionic start ionic-capacitor-app blank --type=angular
```

It goes without saying that you need to have the Ionic CLI and Node.js installed on your machine to be able to create Ionic projects.

## Integrating Capacitor with Ionic 

After generating your Ionic app you can now add Capacitor so head back to your terminal then navigate inside your root folder and follow the other steps

```bash
cd ionic-capacitor-app
``` 

When asked *Would you like to integrate your new app with Cordova to target native iOS and
 Android?* You can answer *No* since we are going to use Capacitor instead of Cordova (You can also use add  `--no-cordova` to Ionic start command)
 
Next add `@capacitor/core` and `@capacitor/cli` to your project : 

```bash
npm install --save @capacitor/core @capacitor/cli
```

Next init Capacitor by running the following command with your ap information

```bash
npx cap init ionic-capacitor-app com.techiediaries.myapp
```

Make sure to use your app name for the first parameter and your app id for the second parameter (`
npx cap init [appName] [appId]
`).

This command will add a `capacitor.config.json` inside your project folder with the following content 

```
{
  "appId": "com.techiediaries.myapp",
  "appName": "ionic-capacitor-app",
  "bundledWebRuntime": false,
  "webDir": "www"
}
```

Now you need to generate the **www** folder with the Ionic app built files by running the *build* command:

```bash
npm run build
```

### Adding the Android Platform

before you can run your app you need to add a platform either *android*, *ios* or *web* so let's add the Android platform 

```bash
npx cap add android
npx cap sync  
```

You can also use the *copy* command instead of *sync*

```bash
npx cap copy
```

The difference is that *copy* will only copy the web assets but *sync* will also update native dependencies so use it if you have added any native dependencies.

Now you can open your Android project using the Android Studio using:

```
npx cap open
```

This will prompt you to choose a platform to open *android*, *ios* or *web* select android for Android.
 
If that doesn't open Android Studio you can simply open Android Studio manually and then File->Open... command then navigate to your project and open the *android* folder.

![](https://screenshotscdn.firefoxusercontent.com/images/8ea40540-ee5e-472a-b338-3d4f75a122ed.png)

You can now use Android Studio to launch your app using an emulator or a real device.

This is a screen shot of the Ionic app running inside an emulator 

![](https://screenshotscdn.firefoxusercontent.com/images/51b9a2c8-70bb-4b6d-b441-db22fba0bc53.png) 



## Conclusion

In this short tutorial we have seen how to add Capacitor to an Ionic 4 project. Next we'll see how to use Capacitor plugins to access native device features such as the Camera and Geolocation. 

