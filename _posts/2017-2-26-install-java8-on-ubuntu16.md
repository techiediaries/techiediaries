---
layout: post
title: "Java tutorial : Install Java 8/9 on Ubuntu 16"
image: "images/content/java-tutorial.png"
excerpt: "Java tutorial : Install Java on Ubuntu 16"
categories: java-tutorial
tags: java 
---

{% include image.html 
    img="images/content/java-tutorial.png" 
    title="Java tutorial : Install Java 8 on Ubuntu 16" 
%}

As we have seen a the previous posts ,Java JRE and JDK are required to respectively run and build Java 
apps .So in this article we are going to cover how we can install the latest version of Java ( Both the JRE and the JDK ) 
on Ubuntu 16.04 

How to install the default JRE/JDK 
------------------------------------
------------------------------------

You can easilly install a packaged version of Java on Ubuntu using the package manager apt-get which will install
OpenJDK 8 a non Orcale implementation of the Java platform .

So go ahead and open up your terminal then execute the following commands 

    sudo apt-get update

Next install the default JRE with 

    sudo apt-get install default-jre

Next install the default JDK platform with 

    sudo apt-get install default-jdk

How to install Oracle JRE/JDK 
------------------------------
------------------------------

Installing the official version of Java from Oracle is bit different .

You need first to start by adding the Oracle's PPA with 

    sudo add-apt-repository ppa:webupd8team/java

Next update 

    sudo apt-get update

Then install Java 8 with 

    sudo apt-get install oracle-java8-installer

Setting the default Java for your system
--------------------------------------------
--------------------------------------------

If you have both OpenJDK and official Java version installed on your Ubuntu 16 then you may need to install
the default version for your system .

You can easily do that using the update-alternatives utility .
So go ahead and execute 

        sudo update-alternatives --config java


{% include image.html 
    img="images/content/java-tutorial/java-updates.png" 
    title="Java tutorial : Install Java 8 on Ubuntu 16" 
%}

The output on your system will be different depending on your installed versions of Java .

To set the default java type 

    sudo update-alternatives --config java 

{% include image.html 
    img="images/content/java-tutorial/set-default-java.png" 
    title="Java tutorial : Install Java 8 on Ubuntu 16" 
%}

Enter a number to set the default java .

You can also set the default java compiler (javac ) with

    sudo update-alternatives --config javac

The next thing to do is setting Java_HOME environment variable so you can execute different java utilities 
from any location .

Open /etc/environment with your prefered text editor .

Make sure you add sudo .

    sudo gedit /etc/environment 

then add 

    JAVA_HOME="/usr/lib/jvm/java-8-oracle/jre/bin/java"

To the environment file and save .

Make sure you add the correct path to java which can be different depending on your system .
You can find the correct path from the output of sudo update-alternatives --config

Installing Java 9 /JDK 9 
---------------------
---------------------

You can also install Java 9 which will be released on March 2017 but only if you want to test and play with the 
new [features](https://jdk9.java.net/)  

    sudo apt-get install oracle-java9-installer

Conclusion
---------
------------

So we have now installed Java JRE and JDK on our Ubuntu 16 system and configured JAVA_HOME environment 
variable to correct Java path .
In the next article we are going to get started learning Java so see you on the next post .





    


    

