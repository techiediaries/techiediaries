---
layout: post
title: "NativeScript & Camera Tutorial"
image: "images/content/nativescript.png"
excerpt: "In this tutorial we'll cover how to access device camera with NativeScript and JavaScript for Android and iOS" 
tags : "nativescript" 
next : /nativescript-javascript-tutorial
previous : /nativescript-javascript-tutorial
categories : nativescript-javascript-tutorial
---

In this tutorial section we'll be covering how to use the device camera with NativeScript using JavaScript.
We'll see how to create a demo NativeScript project and then how to access the phone camera 
to take some pictures in Android and iOS mobile apps and save them to phone gallery.


<h2>Create NativeScript project </h2>

Lets get started by creating a new NativeScript project using Telerik NativeScript CLI so open your terminal 
on Linux/MAC or command prompt on Windows then run :

    tns create CameraDemo 

Next navigate to your project root folder then add your target(s) platform(s) , either Android ,iOS or Both of 
them  :

    tns platform add ios
    tns platform add android


<h2>Add Camera plugin for accessing device Camera</h2>

At the root folder of your project run the following command to install the NativeScript Camera plugin :

    tns plugin add nativescript-camera


<h2>Requesting permissions </h2>

For newer Android and iOS APIs make sure you explicitly request permissions to use the user's camera 
using 

    camera.requestPermissions();


<h2>Creating the user interface</h2>

Lets create a simple user interface with a button ,when clicked ,launchs the user camera to take pictures :

    <Page xmlns="http://schemas.nativescript.org/tns.xsd" navigatingTo="onNavigatingTo" class="page">
        
        <Page.actionBar>
            <ActionBar title="My App" icon="" class="action-bar">
            
            </ActionBar>
        </Page.actionBar>
        <ScrollView>
            <StackLayout class="p-20">
            
                <Button text="Take Picture" tap="{{ takePicture }}"></Button>

            </StackLayout>    
        </ScrollView>
    </Page>


Now on your view model .


Start by importing the required modules 

    var Observable = require("data/observable").Observable;
    var camera = require("nativescript-camera");
    var imageModule = require("ui/image");

Then create a view model and export it 

    function createViewModel() {
        var viewModel = new Observable();

        viewModel.picture = "https://placehold.it/300x300";

        var options = { width: 300, 
                        height: 300, 
                        keepAspectRatio: false, 
                        saveToGallery: true };
        
        
        viewModel.takePicture = function() {
            
            if(!camera.isAvailable()){
                console.log("Camera is not available on this device")
            }
            else
            {
                camera.takePicture(options)   
                    .then(function (imageAsset) {
                        
                        viewModel.set('picture', imageAsset);
                        
                    }).catch(function (err) {
                        console.log("Error -> " + err.message);
                });
            }     

        }

        return viewModel;
    }

    exports.createViewModel = createViewModel;


Conclusion 
-----------------
-----------------

We have seen how to use the Camera plugin for NativeScript to access user's camera in order to take pictures 
on Android and iOS mobile devices and save them to Phone device gallery.
