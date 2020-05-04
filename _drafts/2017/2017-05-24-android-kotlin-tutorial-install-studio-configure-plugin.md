---
layout: post
title: "Android - Kotlin tutorial : Install Android Studio and Configure Kotlin Plugin  "
image: "images/content/android-kotlin-tutorial-install-studio-plugin.png"
excerpt: "In this tutorial we should look at how to install Android studio and Kotlin plugin to start developing for Andoird using Kotlin" 
tags : [android , kotlin]
---

{% include image.html 
    img="images/content/android-kotlin-tutorial-install-studio-plugin.png" 
    title="Install Andoird studio and Kotlin plugin" 
%}

On the previous part ,we have seen why should you ,as an Android Java developer , switch from Java to Kotlin 
for Android development and some pros and cons related to this switch process .

In this tutorial we'll get started using Kotlin by first installing both Android studio and the Kotlin plugin 
to add support for Kotlin on Android Studio .

Android Studio is the official IDE for Android development released by Google in 2014 .It's based on Intellig IDEA IDE 
created by Jetbrains which has also created the Kotlin language .

Installing Android Studio 
------------------------------
------------------------------

Installing Android Studio is easy and straightforward ,just go the <a href="https://developer.android.com/sdk/index.html">official site</a>
and grab the version compatible with your operating system .


If Android Studio doesn't include the plugin by default ,you can easily install the plugin by going to :

    Android Studio File Menu > Settings > Plugins > Browse Repositories 

Then search for "kotlin" and choose the plugin to install .

After installing Kotlin plugin restart Android Studio .

With the Kotlin plugin added to Android Studio ,it can now be used as an IDE for both Java and Kotlin languages .

<div class="note">
I'm using Android Studio 2.3.2 which is the latest version when writing this tutorial (25-05-2017)
</div>

Configuring Kotlin plugin in a project 
-------------------------------------------
--------------------------------------------

Lets get started by opening Android studio then create a new project to work with .

    File > New > New Project

Choose an appropriate name for your project and follow the wizard which will ask you for some information 
about your project such as your company domain then the minimum API level (choose 15 or 16 or whatever)

Next you will need to choose an Activity template ,you can start with any template or just start with 
no activity since we are working with Kotlin not Java (The available activity templates are based on Java )


<div class="note">
If you choose an Activity template ,Android Studio will generate a Java activity for you but you easily use 
the Kotlin plugin to convert any Java activity to a Kotlin Activity which is a nice feature to help you learn 
Kotlin from Java code .
</div>

If your project is created and ready ,now you need to configure Kotlin in the project (Java project by default)
But before you can do that ,you have to add at least one Kotlin source file to the project (.kt) so lets 
create a new Kotlin Activity from scratch .

Go to project -> app -> src -> main 

Then create a new directory with name kotlin then click on the directory name and choose 

    new -> Kotlin Activity 

Enter basic information for activity then OK 

This will create a new kotlin activity for you .

Now you are ready to configure kotlin plugin in this project .

Go to Tools -> Kotlin -> Configure Kotlin in Project 

Choose Single module then OK

Your project build.gradle file will be automatically updated to something like :    

    buildscript {
        ext.kotlin_version = '1.1.2-4'
        repositories {
            jcenter()
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:2.3.2'
            classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"

            // NOTE: Do not place your application dependencies here; they belong
            // in the individual module build.gradle files
        }
    }
    apply plugin: 'kotlin-android'

    allprojects {
        repositories {
            jcenter()
        }
    }

    task clean(type: Delete) {
        delete rootProject.buildDir
    }
    repositories {
        mavenCentral()
    }
    dependencies {
        compile "org.jetbrains.kotlin:kotlin-stdlib-jre7:$kotlin_version"
    }


<iframe width="640" height="360" src="https://www.youtube.com/embed/X1RVYt2QKQE" frameborder="0" allowfullscreen></iframe>

Conclusion
---------------
---------------

After installing Android Studio and configured Kotlin plugin .You can now start building Android apps using 
the Kotlin language instead of Java .See you on the next tutorial in this series.
 





