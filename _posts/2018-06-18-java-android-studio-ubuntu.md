---
layout: post
title: "Installing Java 8 and Android Studio on Ubuntu 18.04"
image: "images/content/ubuntu.png"
excerpt: "Throughout this tutorial, we'll see how to install Java 8 and Android Studio on either Ubuntu 16.04 or Ubuntu 17.01." 
tags : [ubuntu, java, android] 
---

Throughout this tutorial, we'll see how to install **Java 8** and **Android Studio** on either **Ubuntu 18.04**.

Android Studio by Google is the official IDE for building Android mobile applications so before you can do any Android mobile development you need to have a development machine ready with Java 8 and Android installed.

Android Studio has the best and fastest tools for building apps for each type of Android devices.


![Android Studio](https://developer.android.com/studio/images/studio-homepage-hero.jpg)

Android Studio has many features such as:

- [Visual layout editor](https://developer.android.com/studio/write/layout-editor) which can be used to build complex layouts visually and generates code with `ConstraintLayout`
- [Intelligent code editor](https://developer.android.com/studio/intro/) which helps developers completing code for Java, Kotlin and C/C++.
- [Fast emulator](https://developer.android.com/studio/run/emulator) for quickly running and testing Android applications. 
- etc.

## Installing Java 8 on Ubuntu 18.04

Java 8 is required for developing Android applications and as such you need to install Java first. You have many choices for Java:

- The official Oracle Java
- The open source version of Java -- OpenJDK

Let's install the Oracle Java using a PPA by running the following commands:

First start by adding the PPA:

```bash
sudo add-apt-repository ppa:webupd8team/java
```

Next, you'll need to update the cache using:

```bash
sudo apt-get update
```

Finally, install `java-common` and `oracle-java8-installer` packages using the following command:

```bash 
sudo apt-get install java-common oracle-java8-installer
```

When installing these packages you will be prompted to accept the Oracle License agreement. You need to accept it for the installation to complete.

You should get this message: **Oracle JDK 8 installed
**.

After installing Oracle Java, you need to setup the `JAVA_HOME` environment variable which should point to where Java is installed.

To set Oracle JDK8 as default, install the "oracle-java8-set-default" package by running the following command:

```bash
sudo apt-get install oracle-java8-set-default
```

You can then either re-open a new terminal or run `source /etc/profile` in your current terminal to activate the new environment variables.

## Installing Android Studio in Ubuntu 18.04 

After installing Oracle Java and set it as the default in Ubuntu. You can now install Android Studio by either going to the [official website](https://developer.android.com/studio/) and downloading the ZIP package for Linux 32bit or 64bit. Or install Android Studio from a PPA which is the preferred method that I'm going to show you in this tutorial.

So go ahead and start by adding the PPA **ppa:maarten-fonville/android-studio**

```bash
sudo add-apt-repository ppa:maarten-fonville/android-studio
``` 

Next run the update command:

```bash
sudo apt update
```

Finally, install Android Studio by running the following command:

```bash
sudo apt install android-studio
```

This will take some time to download Android Studio and install it. 

After installing Android Studio, you can access it from Unity Dash.


## Conclusion

In this tutorial, we've seen how to setup a development environment with Java 8 and Android Studio in Ubuntu 18.04 which are required for developing Android applications.