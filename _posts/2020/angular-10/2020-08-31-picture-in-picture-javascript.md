---
layout: bpost
title: "Picture-in-Picture with JavaScript and Angular 10"
image: "images/content/angular.png"
excerpt: "In this quick example, we'll learn how to use Picture-in-Picture with JavaScript and Angular 10"
date: 2020-08-31
categories: angular
tags : [angular, javascript]
---

In this quick example, we'll learn how to use the Picture-in-Picture mode in JavaScript. Next, we'll see how to an example of using this new web API with Angular 10. 

Picture-in-Picture (PiP) is a new feature in modern browsers that enables users to watch videos in a floating window that stays always on top of other windows.

## How to Check if your Browser Supports Picture-in-Picture

You can simply use the `document.pictureInPictureEnabled` boolean to check  if Picture-in-Picture is supported and enabled in your web browser.

```js

if ('pictureInPictureEnabled' in document) {

    if(document.pictureInPictureEnabled){
          console.log('Picture-in-Picture Web API is enabled');
    }
  
}
else{
  console.log('Picture-in-Picture Web API is not supported');
} 
```

For Picture-in-Picture support we check if `pictureInPictureEnabled` property exists in the document object then we verify that the web API is enabled if equals true. 

## Implementing Picture-in-Picture video in JavaScript

Now after checking that Picture-in-Picture is supported and enabled in your web browser, let's see how to implement this feature in a simple example with vanilla JavaScript.

Create an HTML file and add the following code:

```html
    <video id="videoElement" controls="true" src="<URL TO VIDEO>"> </video>
    <button id="btn"> Enable Picture in Picture </button>
```

Next, add a `<script>` tag with the following code:

```js
<html>
  <head>
   <title>Picture-in-Picture Example</title>
  </head>
  <body>
    <video id="videoElement" controls="true" src="<URL TO VIDEO>"> </video>
    <button id="btn"> Enable Picture in Picture </button>

    <script>
        const videoElement = document.getElementById('videoElement');
        let startButton = document.getElementById('btn');
        
        startButton.addEventListener('click', startPiPMode);

        async function startPiPMode(event) {
            startButton.disabled = true; 

            try {
                if (videoElement !== document.pictureInPictureElement) {
                    await videoElement.requestPictureInPicture();
                    startButton.textContent = "Exit Picture In Picture";
                }
                else {
                    await document.exitPictureInPicture();
                    startButton.textContent = "Enable Picture In Picture";
                }
            } catch (error) {
                console.log(error);
            } finally {
                startButton.disabled = false;
            }
        }
      
    </script>
  </body>
</html>
```

First, we add a click handling function to the button in which we add the code for checking if we already have a video playing with Picture in Picture enabled by simply comparing the video DOM element to `document.pictureInPictureElement`. If no video is playing, we then  we call `requestPictureInPicture()` on the video element to enable Picture in Picture, which will return a promise. 

We use Async/Await syntax to avoid dealing with the `then()` callback

If the promise is resolved or the function is returned in case of async/await , the video element is moved to the right corner of your screen with your video playing.

Finally, we toggle the button to exit Picture in Picture mode using the `document.exitPictureInPicture()` method.

## Implementing Picture-in-Picture video in TypeScript and Angular 10

Let's now see how to implement Picture-in-Picture with TypeScript and Angular 10.

As a prerequisite, you need to have Node.js and Angular CLI v10 installed on your local development machine. 

## Creating an Angular 10 Project

First, create an Angular 10 project using the following command:

```bash
$ ng new Angular10PictureInPictureExample
$ cd Angular10PictureInPictureExample 
```

The CLI will ask you a couple of questions — If  **Would you like to add Angular routing?**  Type  **y**  for Yes and  **Which stylesheet format would you like to use?**  Choose  **CSS**.


Next, open the `src/app/app.component.html` file and update it as follows:

```html
   <h1>
     Picture-in-Picture with Angular 10 Example
   </h1>
    <video #videoElement controls="true" src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"> </video>

```

Next, open the `src/app/app.component.ts` file and start by importing `ViewChild`, and `ElementRef`:

```ts
import { Component, ViewChild, ElementRef } from '@angular/core';
```

Next, define the following interface:

```ts
interface VideoElement extends HTMLVideoElement {
  requestPictureInPicture(): any;
}
```

So we can access the `requestPictureInPicture()` without getting the **undefined method** error since we are using TypeScript.

Next, query for the video element via its template variable using `ViewChild` as follows: 

```ts
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  @ViewChild("videoElement") videoElement: ElementRef;

```

Next, call the `addEventListener()` to listen for the `play` event on the video DOM element (accessed from the `.nativeElement` property) and then call the `requestPictureInPicture()` method to enter the Picture-in-Picture mode as follows:

```ts
  ngAfterViewInit(){
    const video:  VideoElement = this.videoElement.nativeElement;

    video.addEventListener('play', async (e) => {
      await video.requestPictureInPicture();
    })
  }
```

This is the full component's code:

```ts
import { Component, ViewChild, ElementRef } from '@angular/core';

interface VideoElement extends HTMLVideoElement{
  requestPictureInPicture(): any;
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  @ViewChild("videoElement") videoElement: ElementRef;

  ngAfterViewInit(){
    const video:  VideoElement = this.videoElement.nativeElement;
    video.addEventListener('play', async (e) => {
      await video.requestPictureInPicture();
    })
  }

}
```

This is the live example in [Stackblitz](https://stackblitz.com/edit/angular-picture-in-picture-example?file=src/app/app.component.ts) 

## Conclusion

In this example, we've seen what Picture-in-Picture is and how to use it with both vanilla JavaScript and within a TypeScript Angular 10 app.
