---
layout: post
title: "How to Install Android Studio 3.4 on Ubuntu 19.04 | 18.04"
image: "images/content/how-to-install-java-8-jdk-8u101-on-ubuntu-via-ppa/titleimage.png"
excerpt: "This post shows you how you can install Android Studio v3.4 on Ubuntu 19.04 and Ubuntu 18.04"
tags : [ ubuntu , android ] 
---

[Android Studio](https://developer.android.com/studio) is the official IDE for  developing and building Android apps. It's built by Google on top of the JetBrains IntelliJ IDEA IDE. It comes with all what you need to write apps for Android with Java and Kotlin and build the final production APK. 

Android Studio works across all major operating systems like Windows and Linux/Ubuntu. In this post, we'll be looking at how you can install the latest version of Android Studio (v3.4 as of this writing) in your Ubuntu 19.04 system. 

>**Note**: The instructions to install Android Studio v3.4 are also valid for Ubuntu 18.04 LTS (Long Time Support).

## Prerequisites

You need to have:

- A machine with Ubuntu 19.04 or Ubuntu 18.04 installed,
- OpenJDK 8 installed on your system. You can follow this post on how to [install OpenJDK 8 on your Ubuntu 19.04 system](https://www.techiediaries.com/ubuntu-install-java-openjdk) or simply run the `sudo apt install openjdk-8-jdk` command.

You can check if you have Java 8 installed on your system using the following command:

```bash
$ java -version
```

## How to install Android Studio 3.4 on Ubuntu 19.04?

Now, if you have the prerequisites, let's see how you can install the latest version of Android Studio in your latest version of Ubuntu.

At the time of this writing, the latest stable version of Android Studio is **v3.4.1**. 

Go ahead and open your terminal and run the following command:

```bash
$ sudo snap install android-studio --classic
```

You'll be prompted for your sudo password, you need to enter it and hit `Enter`.

We are using [the snappy packaging system](https://snapcraft.io/).

>Snaps work across Linux on any distribution or version. Bundle your dependencies and assets, simplifying installs to a single standard command.

Wait for the installation procedure to complete and that's it! You are ready to use Android Studio in your system.

## How to Launch Android Studio?

After installing Android Studio, you can launch it right from your terminal by typing:

```bash
$ android-studio
```

You'll be presented by a dialog box which tells you to import your Android settings. If you have a previous installation of Android Studio, simply browse to the configuration folder. If not, go with the default option which is **Do not import settings**.

![Installing Android Studio](https://www.diigo.com/file/image/badcbccczobboredbozdrpbqsoa/Screenshot+from+2019-06-14+17-57-48.jpg?k=1b83de17cb5b91a85544a078ef0c17cf)

Next, you'll be presented with a wizard which will help you set up your development environment for Android Studio:

![Installing Android Studio](https://www.diigo.com/file/image/badcbccczobborercbzdrpbqsre/Screenshot+from+2019-06-14+18-04-16.jpg?k=3447a75c0da94e2e54623d2a811feaba)

Click on the **Next** button, and you will be presented with a window to choose your type of setup you want for Android Studio:

![Installing Android Studio](https://www.diigo.com/file/image/badcbccczobborobrazdrpbraba/Screenshot+from+2019-06-14+18-07-34.jpg?k=b872c834d54f46ab57ab91be8945c55d)


Unless you want to customize your installation settings, let's choose **Standard** which will install the most common settings and options. This is recommended for most users.

Click, **Next** and you'll be taken to the following window to choose your UI theme:

![Installing Android Studio](https://www.diigo.com/file/image/badcbccczobboroeaazdrpbradc/Screenshot+from+2019-06-14+18-09-57.jpg?k=63e9e939b560d14c4ca34de683ac6401)

Choose your theme and click on the **Next** button.

You'll be taken to a window to verify your chosen settings. Simply click on **Next**.

Wait for the Wizard to download and install the required dependencies before you can start your first Android project:

![Installing Android Studio]](https://www.diigo.com/file/image/badcbccczobbosaopezdrpbrcsd/Screenshot+from+2019-06-14+19-08-42.jpg?k=bdbf2c901766e9ebfe919407161abfaa)

Happy Coding!

![Android First App](https://www.diigo.com/file/image/badcbccczobbosbodqzdrpbrdpd/Screenshot+from+2019-06-14+19-19-58.jpg?k=f88580ca3b094e5a395a7c49b497d6bd)

## Conclusion

In this post, we've seen how we can install Android Studio 3.4 on our Ubuntu 19.04 system and how we can launch and set up Android Studio after installing it. The instructions are also valid for Ubuntu 18.04 LTS.



