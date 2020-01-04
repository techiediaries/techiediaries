---
layout: post
title: "Java 11 Tutorial: Introduction & New Features"
image: "images/content/java-tutorial.png"
excerpt: "A quick introduction tutorial to learn Java 11 for beginners"
tags: [java]
---

![Java 11 Tutorial](https://www.techiediaries.com/images/content/java-tutorial.png)

Java is one of the most popular languages for building enterprise applications and all 
sort of apps for web, desktop and mobile.

Java 11 is the current LTS version which has many improvements. Java 12 is also available but not yet recommended for production. 

> **Note**: Java 11 Oracle JDK is paid for commercial use.
>
> A new version is released in each six months.
> If you want to use it for free in production, you can You can [download the OpenJDK version](https://jdk.java.net/11/). 

## What's new with Java 11?

Java 11 has many new features. Let's see some of them:

### Running Java Source File with One Command

Now, you don't have to compile the source file with `javac` before running it. You can run it with the `java` command and will be compiled behind the scenes.


### Type Inference for Local Variables in Lambda Expressions

You can now omit the type of your variable by using the `var` keyword to declare variables. In implicitly typed lambda expressions, the `var` keyowrd can be used for parameters:

```java
(var param1, var param2) -> param1 + param2
```

### Improved HTTP Client

Java 11 added support for HTTP/1.1, HTTP/2 and WebSockets in the Http client.


### The String Repeat Method

Java 11 added the `String.repeat()` method which allows you to repeat a string a specified number of times.

The following code calls the repeat() method of String to repeat the string four time:

```java
var s = "str";
var ssss = s.repeat(4);
System.out.println(ssss);
```

### The String `isBlank()` Method 

A new `isBlank()` method is introduced in Java 11 which can be used to check if a string is blank or not:

```java
System.out.println("".isBlank()); //true
```

### More String Methods

JDK 11 added many useful String methods such as:

- `strip()`: strip the white space from the start and the end of a string, 
- `stripLeading()`: strip the white space from the start of a string, 
- `stripTrailing()`: strip the white space from the end of a string,
- `lines()`: splits a string by line and returns an array.

### New File Methods: `readString()` and `writeString()`

Java 11 introduced the `readString()` and `writeString()` for reading and writing from files.


## Java is not JavaScript

Java has known many improvements to incorporate modern programming concepts so this tutorial will get you started
with Java considering all the modern concepts introduced in Java.

The Java programming language is very used among professional programmers to build web, desktop and mobile 
applications. It's also the native language of the most popular mobile operating system - Android by Google.

Java was developed by Sun Microsystems and today it is owned by Oracle.

Java is not JavaScript and has nothing to do with it so pay attention they are very distinct languages. 

Java is a general purpose and interpreted language to build apps that run on a cross platform virtual machine where JavaScript is the scripted language for web browsers used to build client side apps that run on the browser or to add some interactivity to web pages.

Applications built using Java are cross platform, you can build once and run everywhere there is a Java virtual machine.

Watch this funny video about Java apocalypse 

<iframe width="640" height="360" src="https://www.youtube.com/embed/E3418SeWZfQ" frameborder="0" allowfullscreen></iframe>


## What types of applications you can build with Java?

We can build multiple types of applications using Java such as 

- Desktop GUI based applications, 
- Applets which are Java apps incorporated in web pages,
- Android mobile applications,
- Web applications,
- 3D applications and games etc.

## Should you learn Java in 2019? 

When you want to decide if you should learn a programming language, you need to consider a few things:

- What kind of development you want to do and types of apps you want to build,
- And the market i.e can you find a job as a developer for that particular language?

It's not really about the language itself because all modern programming languages have powerful features and concepts to satisfy real world requirements and also there is no programming language without its own set of pros and cons but it's about the language market and your needs.

So when it comes to Java language, it's one of the top three or even the first most used languages in the world for many years where it's used mainly in two development areas:


- Web apps development for enterprise (large corporations) .
-  Android apps development where Java is the native language of the Android platform.

These two areas are dominated by Java language but you can also use Java for many other areas like game development.

So, should you still learn Java in 2019? 

Yes, you should! Java is still a required language and it's not going anywhere on the forseable future.


![](/images/content/java-tutorial/top-programming-languages-2016.png)

Java is ranked on the second position just after SQL for the number of jobs in 2016.

Another study from [newrelic.com](newrelic.com) shows that Java is still at the top in its 20 year anniversary:


![](/images/content/java-tutorial/top-programming-languages-2016-newrelic.png)

## What's Java Virtual Machine?

One of the strong points of Java is portability thanks to its virtual machine. 

The Java virtual machine (JVM) abstracts away the differences between operating systems and allows your apps to be used with Windows, MAC and Linux without having to modify anything in the source code or to rebuild the app. Just write once and deploy
everywhere and you only need to install your operating system version of JVM.

After compiling the source code, the compiler will produce an intermediary byte code language which can be interpreted by the Java Runtime Environment (JRE) so you don't worry about your application portability since the byte code can be executed by the JVM across all operating systems.

To make things easy for you, you need an Integrated Development Environment (IDE) which can make the tasks of writing, testing and debugging your code easy and quick. 

There many IDEs that support Java such as [Eclipse](https://www.eclipse.org/), [IntelliJ IDEA](https://www.jetbrains.com/idea/) and [Netbeans](https://netbeans.org/).

Now let's install the required tools to start developing Java apps.

## Installing the JRE and JDK 

Start by downloading the JRE and JDK from the [official Oracle website](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

You can either download the Java platform 11 or JDK 11 alone or with the NetBeans IDE.

You have noticed that the Oracle website offers downloads for both JDK and JRE so what the difference 
between the JDK and JRE?

JRE is a runtime which executes or run Java apps. It has to be installed on your machine so you can run apps developed with Java.

JDK is a platform which is only necessary if you are developing Java apps. It includes all the tools for compiling and building your Java apps but also the JRE.

So click on the download link for the JDK which will take you to a page that contains the versions for major operating systems .

Choose the right version for you, download it and install it!

As a wrap-up , you need a JRE to run Java apps but if you need to build apps you also need to install the JDK.

In our next tutorial, we are going to see how to [install Java 11 on our Ubuntu system](https://www.techiediaries.com/ubuntu-install-oracle-java)

# Conclusion

Java has been around for 20+ years and still ranks on the top among the most popular and commonly used programming languages 
in the world. It's everywhere in cloud infrastructures, web apps, mobile apps and embedded applications.



