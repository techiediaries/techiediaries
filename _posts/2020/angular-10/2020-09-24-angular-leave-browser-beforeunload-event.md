---
layout: bpost
title: "Angular 10 Leave Browser Beforeunload Event: Warn Users Leaving your App"
image: "images/content/angular.png"
excerpt: "In this article, we'll learn about the beforeunload event which is a browser event that's used to prompt or warn users that they're about to leave a page or in our case the Angular app"
date: 2020-09-24
tags : [angular , javascript]
---

In this article, we'll learn about the `beforeunload` event which is a browser event that's used to prompt or warn users that they're about to leave a page or in our case the Angular app. 

![Angular 10 Leave Browser Beforeunload Event](https://www.techiediaries.com/assets/images/angular-beforeunload.jpeg)

## How to Use beforeunload in JavaScript

You can use the browser's `beforeunload` event in JavaScript to prompt
 users that they're going to close the page as follows:

```js
window.addEventListener('beforeunload', (event) => {
  event.returnValue = `You have unsaved changes, leave anyway?`;
});
```

## How to Use `beforeunload` in Angular

In Angular, you can either use the `CanDeactivate` route guard to warn users when they are about to leave the current route/page to another page in the app but you need to use the `beforeunload` event if you need to watch for the tab closing or the whole app refreshing

Just like plain JavaScript, you'll need to add a listener to the `beforeunload` window event using either JavaScript' `addEventListener` method (Not very recommended) or the Angular APIs such as `HostListener`. For example, you can add the following code in a component:

```ts
@HostListener('window:beforeunload', ['$event'])
unloadHandler(event: Event) {
	// Your logic on beforeunload
}
```

You can also bind a method to the `window:beforeunload` event of a DOM element inside your page as follows:

```html
<div (window:beforeunload)="onBeforeUnload()"></div>
```

