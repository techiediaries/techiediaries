---
layout: post
title: "How to Install JAVA 8 (OpenJDK 8) on Ubuntu 19.04"
image: "images/content/how-to-install-java-8-jdk-8u101-on-ubuntu-via-ppa/titleimage.png"
excerpt: "This post shows you how you can install Java 8 on Ubuntu 19.01"
tags : [ ubuntu , java ] 
---

The stable version of Java 8 (1.8) has been released on 18 2014.You can download it from the [official website](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).Java 8 has new features(like lambdas and functional programming) and security updates, you can get more information of [what's new in Java 8 from this link](http://www.oracle.com/technetwork/java/javase/8-whats-new-2157071.html).

If you are under Ubuntu 19.04, you can install Java 8 using OpenJDK 8. 


## Installing Java 8 on Ubuntu 19.04

To install OpenJDK 8 in Ubuntu 19.04, you have two methods:

- Download the OpenJDK 8 package manually from its [Ubuntu 18.10 repository](http://security.ubuntu.com/ubuntu/pool/universe/o/openjdk-8/), 
- Use OpenJDK builds PPA.


## Installing  Java 8 (OpenJDK) Using Ubuntu 18.10 Repository:

Let's start by seeing how you can install OpenJDK 8 via Ubuntu 18.01 repository

First, you need to download the following packages for 64-bit systems:

- [openjdk-8-jdk](http://security.ubuntu.com/ubuntu/pool/universe/o/openjdk-8/openjdk-8-jdk_8u191-b12-2ubuntu0.18.10.1_amd64.deb)
- [openjdk-8-jdk-headless](http://security.ubuntu.com/ubuntu/pool/universe/o/openjdk-8/openjdk-8-jdk-headless_8u191-b12-2ubuntu0.18.10.1_amd64.deb)
- [openjdk-8-jre](http://security.ubuntu.com/ubuntu/pool/universe/o/openjdk-8/openjdk-8-jre_8u191-b12-2ubuntu0.18.10.1_amd64.deb)
- [openjdk-8-jre-headless](http://security.ubuntu.com/ubuntu/pool/universe/o/openjdk-8/openjdk-8-jre-headless_8u191-b12-2ubuntu0.18.10.1_amd64.deb)

For 32-bit systems check this [link](http://security.ubuntu.com/ubuntu/pool/universe/o/openjdk-8/).

Next, you siply need to use the dpkg tool to install these packages. Open your terminal, go to where you have downloade the packages and run the following command:

```bash
$ sudo dpkg -i ./openjdk-8-*.deb
```

If the setup fails due to dependency problems. Simply run the following command:

```bash
$ sudo apt -f install
```

That's it! You now have installed Java 8 on your Ubuntu 19.04 system using Ubuntu 18.04 repository.

## Installing Java 8 (OpenJDK) In Ubuntu 19.04 via a PPA

You can also install OpenJDK 8 via a PPA. Open your terminal and run the following command:

```bash
$ sudo add-apt-repository ppa:openjdk-r/ppa
```

You'll be prompted for your sudo password. Enter it and hit Enter.

Next, you can simply install Java 8 (OpenJDK) by running the following commands:

```bash
$ sudo apt update
$ sudo apt install openjdk-8-jdk openjdk-8-jre
```

## Conclusion

So we have seen how you can install Java 8 (OpenJDK 8 ) on your Ubuntu 19.04 system using packages from Ubuntu 18.04 and a PPA.



