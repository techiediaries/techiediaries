---
layout: post
title: "Java 14 Switch Expressions by Example"
image: "images/content/java.png"
excerpt: "" 
tags : [ java]
categories: java
date: 2020-03-05
author: ahmed
---

Java 14 is due to be released on March 17, 2020.with many new features.

One of the new features of Java 11 is switch expressions.


## What are Switch Expressions in Java 14?

If you have worked with Java before or any programming language you are already familiar with switch statement.


Switch Expressions were a ‘preview’ feature in earlier releases. Java 14 make it standard now.

You typically write a switch like this:

switch (type) {
  case RUN, START:
    System.out.println("RUN");
    break;
  case STOP:
    System.out.println("STOP");
    break;
  default:
    System.out.println("Unknown");
}
All the break statements ensures that the next block in the switch statement is not executed.

Now we can refactor the code to make use of this new switch form:

switch (type) {
  case RUN, START -> System.out.println("RUN");
  case STOP -> System.out.println("STOP");
  default -> System.out.println("Unknown");
};
With Switch Expression:

System.out.println(
    switch (type) {
      case RUN, START -> "RUN";
      case STOP -> "STOP";
      default -> "Unknown";
    }
  );
Java 14 introduces new yield statement to yield a value which becomes the value of the enclosing Switch Expression. For example:

String state = switch (type) {
      case RUN, START -> "RUN";
      case STOP -> "STOP";
      default -> {
        System.out.println("Not recognize state!");
        yield "Unknown";
      }
    }
  );
Or you can also use traditional switch block like this:

String state = switch (type) {
      case RUN, START: 
        yield "RUN";
      case STOP:
        yield "STOP";
      default -> {
        System.out.println("Not regconize state!");
        yield "Unknown";
      }
    }
  );