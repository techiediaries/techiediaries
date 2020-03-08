---
layout: bpost
title: "Java 14 Records Tutorial by Example"
image: "images/content/java.png"
excerpt: "We'll learn about the new Java 14/13 switch expressions by Example" 
tags : [ java]
categories: java
date: 2020-03-07
author: ahmed
---

In this tutorial, we'll learn about Java 14 records, how and when to use them.

While building any application, we often need to create classes whose primary purpose is to hold data/state. These classes generally contain the same old boilerplate code in the form of getters, setters, equals(), hashcode() and toString() methods


## What Are Java 14 Records?

Records are a new feature introduced in Java 14 for enabling developers to write compact and concise data classes without the unnecessary boilerplate code.

But, what's a data class? 

A data class is a class that contains only fields and methods for accessing and modifying them (getters and setters). It's used as a container for data used by other classes. 

It's similar to `case` classes in Scala, data classes in Kotlin and record classes in C#, etc.


Let's take an example of a `Product` class that can be used as a carrier of products data:

```java
public class Product {
    private String id;
    private String name;
    private String description;
    

    public Product(String id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Product product = (Product) o;

        if (id != null ? !id.equals(product.id) : product.id != null) return false;

        return name != null ? name.equals(product.name) : product.name == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}
```

For implementing a simple class with only three fields, we need to write nearly 50 lines of code.

IDEs can help you generate most of this code but there may still be other problems besides writing the code such as the readability of your overall source code. Also you'll need to regenerate or modify the constructors, getters/setters and equals()/hashcode() methods if you add new fields.

Instead of writing this code yourself or use the IDE to generate it, Java 14 allows you to use records which instruct the compiler to generate this code for you behind the curtains. Unlike the IDE, this code will not be present in your source code which makes your code free of any boilerplate code.

In Java 14, you can write the previous code as follows:

```java
public record Product (  
    String id,
    String name,
    String description
){}
```

- a private final field, with the same name and type, for each component in the state description;
- a public read accessor method, with the same name and type, for each component in the state description;
- a public constructor, whose signature is the same as the state description, which initializes each field from the corresponding argument;
implementations of equals and hashCode that say two records are equal if they of the same type and contain the same state;
- implementation of toString that includes all the components, with their names.


## Compact constructor

Additionally, Records introduced Compact Constructor, with the aim that only validation and/or normalization code need to be given in the constructor body. The remaining initialization code is supplied by the compiler.
For example, if we want to validate a Person age to make sure that it's not negative, the code would looks similar to:

```java
public record Person(  
    String firstName,
    String lastName,
    int age,
    String address,
    Date birthday
){
public Person{  
    if (age < 0) { 
        throw new IllegalArgumentException( "Age must be greater than 0!"); 
     }
   }
}
```

Notice that no explicit parameter list is given for the compact constructor, but is derived from the record component list.

Can I define additional methods, fields...
The short answer to this question is Yes, you can add static fields/methods! But the question is however, should you ?!
Keep in mind that the goal behind Records is to enable developers to group related fields together as a single immutable data item without the need to write verbose code. Which means that whenever you feel the temptation to add more fields/methods to your record, think if a full class makes more sens and should be used instead.
For example, we can define a method that returns a Person's full name:

```java
public record Person(  
    String firstName,
    String lastName,
    int age,
    String address,
    Date birthday
){
public String fullName(){  
    return firstName + " " + lastName;
 }
}

```

## Conclusion


Records address a common issue with using classes as wrappers for data. Plain data classes are significantly reduced from several lines of code to a one-liner.
Keep in mind that Records are a preview language feature, which means that, although it is fully implemented, it is not yet standardized in the JDK.

https://blogs.oracle.com/javamagazine/records-come-to-java







