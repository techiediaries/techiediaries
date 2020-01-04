---
layout: post
title: "Flutter Tutorial for iOS and Android"
image: "images/content/angular.png"
excerpt: "Flutter tutorial for biginners" 
tags : [flutter] 
---

In this Flutter tutorial for biginners, you'll learn to build **native** Android and iOS **cross platform** mobile apps using Dart.

## What's Flutter?

Flutter is a cross-platform framework for building native mobile applications. Flutter is created by Google and uses Dart (A programming language created by Google, similar to JavaScript).

Flutter is different from other cross platform mobile frameworks and libraries such as Ionic, NativeScript, React native or Xamarin etc. Because the final built application is an actual native application with no web container like in the case of hybrid frameworks (Ionic) or JavaScript runtimes like in the case of NativeScript for example. As a result, apps built using Flutter provide more performance and better integration with the underlying device.

You can watch this video where Google announced Flutter, a mobile UI framework that “helps developers craft high-quality native interfaces for both iOS and Android”.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fq4N0hgOWzU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>



## Flutter First Example

Flutter is based on Dart, sso you need to have the basics of Dart if you want to build mobile apps with Flutter.

here is a first example of a Flutter application:

```dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Hello Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Introduction to Flutter'),
        ),
        body: new Center(
          child: new Text('Created using Flutter!'),
        ),
      ),
    );
  }
}
```

The `runApp()` function takes an instance of a Widget and makes it the root of the widget tree.

The MyApp widget extends the [`StatelessWidget`](https://docs.flutter.io/flutter/widgets/StatelessWidget-class.html) to create a stateless widget i.e a widget which doesn't manage any state. In the new widget we override and implement the [`build()`](https://docs.flutter.io/flutter/widgets/StatelessWidget/build.html) function which describes the widget using a set of low-level widgets. In our example, the `AppBar` and `Center` widgets to build our UI.


## How to Get Started with Flutter for Android?

Getting with Flutter is easy, you first need to grab the Flutter's SDK for your operating system i.e Windows, Mac or Linux by going to the [official website](https://flutter.io/get-started/install/).

After installing the SDK, you can use the following command to check for the dependencies that you need to install:


```bash
flutter doctor
```

In most cases, this will alert to install the Android SDK, if it's not installed on your system.

To install Android SDK, simply head to the [official website](https://developer.android.com/studio/index.html) and install Android Studio which is required to install the SDK.


After installing Android Studio and Android SDK, you can either use a real device or the emulator to run your Flutter application. 

 

  