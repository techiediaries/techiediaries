---
layout: post
title: "Android - Kotlin tutorial : how to declare a class and create first activity "
image: "images/content/android-kotlin-tutorial-install-studio-plugin.png"
excerpt: "In this post ,we'll see how to declare a Kotlin class and create your first Kotlin Activity" 
tags : [android]
---

On the previous tutorial ,we covered how to download and install Android Studio then install the Kotlin 
plugin to add support for Kotlin language in the Android official IDE .

In this tutorial ,we'll cover how to create Kotlin classes and then how to use this knowledge to create 
and understand our first Kotlin Android activity .

Just like Java to declare a class in Kotlin ,we use the keyword <em>class</em>

    class MyKtClass {
        
    }  

Kotlin classes extends by default the <em>Any</em> class ,which is somehow the equivalent of <em>Java Object</em>.

A class has a default constructor which can be accessed by using an init block 

You can pass parameters just after the class name 
    
    class MyKtClass(message : String) {
        init {
            
        }
    }   

In case the class has no content ,you can omit the curly braces 

    class MyKtClass(message : String)

    

