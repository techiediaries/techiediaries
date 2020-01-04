---
layout: post
title: "Jakarta EE Tutorial"
image: "images/content/java.png"
excerpt: "In this tutorial you'll learn about Jakarta EE—the open source version of Java Enterprise Edition (Java EE) which has been renamed to Jakarta EE for copyright reasons related to the Java brand owned by Oracle so names like J2EE or Java EE are no longer valid names for this platform" 
tags : [java] 
---

In this tutorial you'll learn about **Jakarta EE**—the open source version of Java Enterprise Edition (Java EE) which has been renamed to Jakarta EE for copyright reasons related to the "Java" brand owned by Oracle so names like J2EE or Java EE are no longer valid names for this platform.

Renaming Java EE to Jakarta EE was necessary because Oracle, the owner and creator of this platform moved Java EE to the [Eclipse Foundation](https://www.theregister.co.uk/2017/10/03/java_ee_goes_eclipse_now_what/). But without granting the use of the Java brand to Eclipse Foundation.

The Jakarta EE Tutorial will teach you the Jakarta EE features that you can use to develop enterprise applications.

This tutorial is designed for developers that want to develop and deploy Jakarta EE applications.

## Introduction 

Enterprise applications implement the business logic for an enterprise and provide many features such as portability, speed, security, and reliability.

Thanks to Jakara EE (Enterprise Edition) creating enterprise apps is easier and faster comparing with other technologies.


Jakarta EE comprises many technologies such as:

- Java Server Pages or JSP,
- Java Server Faces or JSF,
- Serverlets,
- JSTL,
- JDBC,
- Struts,
- Java Persistence API or JPA
- Hiberante ORM 

A Jakarta EE application is comprised of multiple components:

-  Enterprise Applications that run inside an EJB (Enterprise Java Beans) container
- Web Applications that use technologies such as Servlet API, JSP, JSF etc. And run inside a Web Container
- Client applications which run in the client side within a Java SE environment
- Applets which are GUI applications that run in the web browser.

Jakarta EE applications follow a n-tier architecture:

- Client tier: use web browsers and GUI apps (JavaFX and Swing etc.)
- Server tier: JSP, JSF, Servlets components and EJBs, JMS, JPA, JTA specifications
- Database tier

Curious about what all these **JSP**, **JSF**, **JSTL**, **Serverlets**, **Struts**, **JDBC** and **JPA** names mean? Let’s, first, define them:

**JSP** stands for Java Server Pages and it’s a server side technology for building dynamic web pages with Java. JSP has access to all other Java APIs such as JDBC for working with databases.

**JSF** stands for Java Server Faces and it’s a technology/framework and specification for creating web interfaces with reusable UI widgets.

**JSTL** stands for JSP Standard Tag Library and it’s a set of tags that can be used for implementing common programming language operations such as looping and conditional statements etc. in HTML templates. Simply it’s the template language for Jakarta EE platform.

A **Serverlet** is a Java program that is already compiled and used to create dynamic web content.

[Apache Struts](https://struts.apache.org/) is a free, open-source, MVC framework for creating modern Java web applications.

**JDBC** stands for Java Database Connection and It's a Java API for connecting to databases and executing SQL queries against the database. JDBC makes use of jdbc drivers for connecting to different types of databases from different programming languages.

**JPA** stands for Java Persistence API and it’s Java specification for accessing, persisting, and managing/mapping data between Java OOP classes and a relational database. **Hibernate** is the most popular ORM (Object Relational Mapper) implementation of JPA.

## Conclusion

In this introduction tutorial, we've explored some technologies related to the new Jakarta EE platform.













