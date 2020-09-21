---
layout: bpost
title: "Angular 10 Browser Beforeunload Event"
image: "images/content/angular.png"
excerpt: ""
date: 2020-09-20
tags : [angular]
---

>I explain a bit about the beforeunload event—which lets you prompt or warn your user that they're about to leave your page. If misused, this can be frustrating for your users—why would you use it? 

Before we get into the code, what is the tl;dr from my video? 📺👨‍🏫

use the beforeunload event to warn a user they're going to close your page, but only when it's important
a Set of Promise objects can be useful to control beforeunload
… and, maybe you can use sendBeacon rather than prompting at all!


## How to Use beforeunload in JavaScript

If you want to prompt or warn your user that they're going to close your page, you need to add code that sets .returnValue on a beforeunload event:

```js
window.addEventListener('beforeunload', (event) => {
  event.returnValue = `Are you sure you want to leave?`;
});
```

## How to Use beforeunload in Angular

Confirmation for routing to another module can be easily implemented with CanDeactivate.

Refreshing and xing the tab can be a bit trickier. You will have to add listener to a window event beforeunload.

Something like this could work for a given component:

@HostListener('window:beforeunload', ['$event'])
unloadHandler(event: Event) {
	// Your logic on beforeunload
}


<div (window:beforeunload)="doSomething()"></div>
or

@Component({ 
  selector: 'xxx',
  host: {'window:beforeunload':'doSomething'}
  ..
)}
or

@Component({ 
  selector: 'xxx',
  ..
)}
class MyComponent {
  @HostListener('window:beforeunload')
  doSomething() {
  }
}

