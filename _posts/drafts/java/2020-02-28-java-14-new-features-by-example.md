---
layout: bpost
title: "The New Features in JDK14/Java 14?"
image: "https://www.techiediaries.com/techiediaries.png"
excerpt: " JDK14 - Java 14 - What's new features in Java 14"
date: 2020-02-28
categories: java
tags : [java]
---

Java 14 is due to be released on March 2020. It's not an LTS release and will be obsoleted with the release of Java 15.

## Text Blocks

Sometimes you need to embed HTML, SQL, or JSON code into your Java code which can be done strings but it's usually hard to read, particularly the big portions of code. This why Java 14 introduced Text Block.

A text block contains zero or more content characters, which are enclosed by open and close delimiters.

This is an example string with HTML code:

```java
String html = "<html>\n" +
              "    <body>\n" +
              "        <p>Hello, world</p>\n" +
              "    </body>\n" +
              "</html>\n";
```




