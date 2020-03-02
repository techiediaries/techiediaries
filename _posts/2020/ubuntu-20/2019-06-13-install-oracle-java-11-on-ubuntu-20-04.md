---
layout: post
title: "How to Install Oracle JAVA 11/14 on Ubuntu 20.04/19.04"
image: "images/content/how-to-install-java-8-jdk-8u101-on-ubuntu-via-ppa/titleimage.png"
excerpt: "This post shows you how you can install Oracle Java 11/14 on Ubuntu 20.04 and Ubuntu 19.04"
categories: ubuntu
date: 2020-03-02
tags : [ ubuntu , java ] 
---

In this post, we'll see how we can install Oracle Java 11 LTS (Long Time Support) and Java 12 on Ubuntu 20.04 (or also Ubuntu 19.04).

## Java 11 is the LTS Version

Java 11 is the LTS version of Java. As Java 8 has ended support in Junuary 2019, companies will be upgrading their projects to current LTS version. 

Java 14 is the latest version which has brought many [new features and enhancements](https://www.oracle.com/technetwork/java/javase/12-relnote-issues-5211422.html).

It's not recommended to use Java 14 in production but you can use it for hobby projects or to experiment with the new features.

## How to Install Java 11 LTS on Ubuntu 19.04?

Open a terminal and start by adding the Linux Uprising PPA, which contains Oracle Java 11 (LTS) and 12 installers for Ubuntu, Linux Mint and Debian,using the following command:

```bash
sudo add-apt-repository ppa:linuxuprising/java
```

On Ubuntu 19.04, you don't need to update your system packages using:

```bash
$ sudo apt-get update
```

Finally, you can install Java 11 LTS using:

```bash
$ sudo apt-get install oracle-java11-installer
```

You need to accept the license (press Tab to highlight OK and hit Enter):

![Install Java 11 LTS on Ubuntu 19.04](https://www.diigo.com/file/image/badcbccczobbpserqrzdrpcpqrc/Screenshot+from+2019-06-15+18-12-34.jpg?k=4acdbb53bad8ea34a149b3d3069ef004)

Next, choose **Yes**:

![Install Java 11 LTS on Ubuntu 19.04](https://www.diigo.com/file/image/badcbccczobbpsersozdrpcpqrd/Screenshot+from+2019-06-15+18-13-00.jpg?k=4ef56219d04ff0e54f81446e2505bac2)

Let's make it the default version in our system using:

```bash
$ sudo apt-get install oracle-java11-set-default
```

You can check your installed version of Java using:

```bash
$ java -version
```

![Install Java 11 LTS on Ubuntu 19.04](https://www.diigo.com/file/image/badcbccczobbpspdrczdrpcprrr/Screenshot+from+2019-06-15+18-39-35.jpg?k=c8a0863149aed497054b6df2fefb4d6c)

You can uninstall Java 11 from your system using:

```bash
$ sudo apt-get remove oracle-java11-installer
```

## Installing Java 14 on Ubuntu 19.04 Using a PPA

You can find the packages of Oracle JDK 14 for Ubuntu from the **Linuxuprising** PPA repository. 

Open a new terminal and run the following command to add this PPA to your system:

```bash
$ sudo add-apt-repository ppa:linuxuprising/java
```

Enter your password when prompted and hit Enter.

Next, you need to run the following command to update your system repositories:

```bash
$ sudo apt update
```

Finally, you can install Java 14 on your system by running the following command:

```bash
$ sudo apt install oracle-java14-installer
```

You can set Java 14 as the default version in your system using `oracle-java14-set-default`:

```bash
$ sudo apt y install oracle-java14-set-default
```

## Installing Java 14 Without a PPA on Ubuntu 19.04

You can also install Java 14 on your system without using a PPA. 

Go to the [Oracle official website](https://www.oracle.com/technetwork/java/javase/downloads/jdk12-downloads-5295953.html) and download the deb package for JDK 14.

Next, open your terminal and navigate to where you have downloaded the deb package and run the following command:

```bash
$ sudo dpkg -i jdk-14.0.0_linux-x64_bin.deb
```

That's it! You have installed Java 14 on your Ubuntu 19.04 system.

## Conclusion

In this post, we've seen how to install the latest Java 14 version from Oracle in our Ubuntu 20.04 system. These methods are also valid for Ubuntu 19.04 systems.


