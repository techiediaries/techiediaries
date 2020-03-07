---
layout: post
title: "Java 14/13 Switch Expressions by Example"
image: "images/content/java.png"
excerpt: "We'll learn about the new Java 14/13 switch expressions by Example" 
tags : [ java]
categories: java
date: 2020-03-07
author: ahmed
---

Java 14 is due to be released on March 17, 2020 with many new features.

One of the new features of Java 14 is switch expressions.

## What are Switch Statements in Java?

If you have worked with Java before or any programming language you are already familiar with the switch statement.

According to the [Oracle docs](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html):

>Unlike if-then and if-then-else statements, the switch statement can have a number of possible execution paths. 

This means we can use the switch statement to replace several nested if-else statements in your code which results in cleaner and maintainable code  

The following code example, declares an int named `month` whose value represents a month. The example simply displays the name of the month, based on the value of month, using the switch statement:

```java
public class SwitchExample {
    public static void main(String[] args) {

        int month = 8;
        String monthString;
        switch (month) {
            case 1:  monthString = "January";
                     break;
            case 2:  monthString = "February";
                     break;
            case 3:  monthString = "March";
                     break;
            case 4:  monthString = "April";
                     break;
            case 5:  monthString = "May";
                     break;
            case 6:  monthString = "June";
                     break;
            case 7:  monthString = "July";
                     break;
            case 8:  monthString = "August";
                     break;
            case 9:  monthString = "September";
                     break;
            case 10: monthString = "October";
                     break;
            case 11: monthString = "November";
                     break;
            case 12: monthString = "December";
                     break;
            default: monthString = "Invalid month";
                     break;
        }
        System.out.println(monthString);
    }
}
```

This code works by comparing the switch argument `month` with the provided case values. If none of the case values is equal to the argument, then the block under the default case is executed. In this case, `monthString` will be assigned the `Invalid month` value.

The break statements ensures that the next block in the switch statement is not executed.

Since the `month` variable has an initial value of eight, the code will print `August` when executed.

## What are Switch Expressions in Java 14?

Switch expressions were first introduced in Java 12, got an impovement in Java 13 and will be a standard feature in Java 14.

We can write the previous code using a new syntax that uses the `->` operator instead of the colon:

```java
        switch (month) {
            case 1 ->  monthString = "January";
            case 2 -> monthString = "February";
            case 3 ->  monthString = "March";
            case 4 ->  monthString = "April";
            case 5 ->  monthString = "May";
            case 6 -> monthString = "June";
            case 7 -> monthString = "July";
            case 8 ->  monthString = "August";
            case 9 ->  monthString = "September";
            case 10 -> monthString = "October";
            case 11 -> monthString = "November";
            case 12 -> monthString = "December";
            default -> monthString = "Invalid month";
        }
```

We don't need the `break` statement to stop the execution from flowing to the next cases.

We can see that we are repeating the assignement operation multiple times in our code. Thanks to the switch expressions, we can rewrite our code as follows:

```java
String monthString = switch (month) {
            case 1 -> "January";
            case 2 -> "February";
            case 3 ->  "March";
            case 4 ->  "April";
            case 5 ->  "May";
            case 6 ->  "June";
            case 7 ->  "July";
            case 8 ->  "August";
            case 9 ->  "September";
            case 10 -> "October";
            case 11 -> "November";
            case 12 -> "December";
            default -> "Invalid month";
}        
```

We can assign the switch expressions to variables or place them wherever expressions are expected in your Java code.

## The New Java 14 Yield Statement

Java 14 also introduced a new `yield` statement to yield a value which becomes the value of the enclosing switch expression. For example:


```java
String monthString = switch (month) {
            case 1 -> "January";
            case 2 -> "February";
            case 3 ->  "March";
            case 4 ->  "April";
            case 5 ->  "May";
            case 6 ->  "June";
            case 7 ->  "July";
            case 8 ->  "August";
            case 9 ->  "September";
            case 10 -> "October";
            case 11 -> "November";
            case 12 -> "December";
            default -> {
              System.out.println("Invalid month!");
              yield "Invalid month";
            }
        }        
```

the `default` case takes a code block which makes use of the `yield` statement to yeld the `Invalid month` value. 

We can even get rid of the `monthString` variable and call the switch expression inside `System.out.println()` method as follows:

```java
public class SwitchExample {
    public static void main(String[] args) {

        int month = 8;
        System.out.println(switch (month) {
            case 1 -> "January";
            case 2 -> "February";
            case 3 ->  "March";
            case 4 ->  "April";
            case 5 ->  "May";
            case 6 ->  "June";
            case 7 ->  "July";
            case 8 ->  "August";
            case 9 ->  "September";
            case 10 -> "October";
            case 11 -> "November";
            case 12 -> "December";
            default -> "Invalid month";        
        });
    }
}
```

These are the important aspects of switch expressions in Java 14 which can be used to write cleaner and more maintainable Java code. 
