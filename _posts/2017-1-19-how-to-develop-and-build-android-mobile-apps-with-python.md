---
layout: post
title: "How to develop and build Android mobile apps with Python"
image: "images/content/how-to-develop-and-build-android-mobile-apps-with-python.png"
excerpt: ""
categories : python
tags : python 
---

{% include image.html
   img="images/content/how-to-develop-and-build-android-mobile-apps-with-python.png"
       title="How to develop and build Android mobile apps with Python"
%}

have you ever wanted to build your Android mobile app but you don't have the necessary Java and Android skills
to do that and no time to learn them or maybe you hate Java and you love Python and you want to be able to use
it to develop anything for any platform .Well today in this post i'll show how you can use Python to develop
mobile apps for Android devices or even better how to transform your existing Python application into an Android APK .

Getting started with python-for-android 
-----------------------------------------
-----------------------------------------

python-for-android is an open source tool which allows you to package and run Python apps on Android mobile devices .

It has many features such as

Python 2 and Python 3 support .

Can be used with either webviews ,Kivy framework or PySDL2 library .

Can be used with powerful Python packages such as Numpy or SQLAlchemy ORM .

How to install python-for-android under Ubuntu 16?
-----------------------------------
-----------------------------------

You can install python-for-android  by using the PIP package manager but first you need to install a bunch 
of dependencies so open your terminal 

    sudo apt-get install -y build-essential ccache git zlib1g-dev python2.7 python2.7-dev libncurses5:i386 libstdc++6:i386 zlib1g:i386 openjdk-7-jdk unzip ant ccache

Also make sure you have installed the [Android SDK](https://developer.android.com/sdk/index.html#Other) and [Android NDK](https://developer.android.com/ndk/downloads/index.html)

Don't forget to set $ANDROIDSDK ,$ANDROIDNDK envoronments variables to locations of installed Android SDK and NDK .

Then 

    pip install python-for-android

next you can build your Python application to an APK depending on the type of your application

For applications built using Kivy framework use

p4a apk --private myapp-folder --package=com.techiediaries.myapp --name "My application" --version 0.1 --bootstrap=sdl2 --requirements=python2,kivy


You can also build a Python web application (built by Flask in our example) to an Android APK using 

p4a apk --private my-app-folder --package=com.techiediaries.myapp --name "My WebView Application" --version 0.1 --bootstrap=webview --requirements=flask --port=5000


if you have developed a Python application using PySDL2 you can turn it into an Android APK using 

p4a apk --private my-app-folder --package=com.techiediaries.myapp --name "My SDL2 application" --version 0.1 --bootstrap=sdl2 --requirements=your_requirements

You need to specify any requirement with --requirments option .

You can also pass many paramters to control your built APK .Check all available buid options from this [link](https://python-for-android.readthedocs.io/en/latest/buildoptions/#bootstrap-build-options)


Conclusion
------------ 

Thanks to python-for-android .If you are a Python developer you now have the chance to build mobile apps for 
Android without having to learn Java or any other mobile development technology .For more information about this
tool feel free to check their [docs](https://python-for-android.readthedocs.io/en/latest/) or their [GitHub repository](https://github.com/kivy/python-for-android)



