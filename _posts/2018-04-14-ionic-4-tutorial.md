---
layout: post
title: "Ionic 4 Tutorial for Beginners: Custom Elements, Buttons, Navs and Tabs"
image: "images/content/ionic.png"
excerpt: "Ionic 4 Tutorial for Beginners: Custom Elements, Buttons, Navs and Tabs" 
tags : [javascript , ionic] 
---

Throughout this **Ionic 4 tutorial**, we'll learn how to use the latest version of Ionic — Ionic 4 which is now in RC. Starting with Ionic 4, Ionic is going framework agnostic, which means you can use it with any framework or no one at all i.e with plain vanilla JavaScript and native web components (custom elements) supported by modern web browsers.

> **Note**: If you want to learn how to use Ionic 4 components with plain JavaScript keep reading! Otherwise check out these tutorials for building Ionic apps with Ionic 4 and Angular:
>
> [Ionic 4 JWT Authentication Tutorial: Using Angular HttpClient with Node & Express.js Server](https://www.techiediaries.com/ionic-jwt-authentication-httpclient)
> 
> [Ionic 4 Tutorial: Building and Theming a Login & Register UI with Angular Forms](https://www.techiediaries.com/ionic-ui-forms-theming)



The Ionic 4 components are now being ported to web components. You can use web components everywhere they are supported i.e in all major modern web browsers. 

You can use Ionic 4 with any framework/language (TypeScript, JavaScript, Stencil, Angular, React, Vue or maybe jQuery. It's your choice) to build hybrid mobile applications or alternatively build PWAs (Progressive Web Apps).

In this tutorial, we'll use plain JavaScript with Ionic web components to build a simple application that you can either make it as a PWA by adding the essential PWA features or hybrid mobile application using Cordova or Capacitor (a modern alternative to Cordova built by the Ionic team). 

We're going to focus on Ionic web components so we're not going to see how to use Cordova or Capacitor but you can follow these tutorials after finishing with this one:  

- [Ionic 4 Tutorial with AngularJS and Cordova](https://www.techiediaries.com/ionic-angularjs/)
- [Ionic 4 Tutorial with Vue](https://www.techiediaries.com/ionic-vue/)
- [Using Capacitor with Ionic 3](https://www.techiediaries.com/ionic-capacitor/)
- [A Re-Introduction to Ionic (Ionic 4+, PWAs, Stencil, Capacitor and Electron)](https://www.techiediaries.com/ionic-capacitor-stencil-pwa/) 

Now, let's get started with the first step. Let's create an HTML page with basic elements:

Create a folder `ionic-javascript-template` then inside it create the file `index.html` and add the following content:

```
<html>

<head>
	<title>Ionic 4 JavaScript Template</title>
	<meta  name="viewport"  content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
</head>
<body>
	
	<script src="src/index.js"></script>
</body>
</html>
```   

if you don't want to deal with Node.js, you can use [codesandbox.io](https://codesandbox.io/s/4wryq9xwl9) which provides an online code environment for JavaScript and other frameworks such as Angular and React etc. without the hassle of installing a development environment. 

You can also just use plain old JavaScript in the old way. I'm using Node here for the sake of npm to quickly install some dependencies.

So create a `package.json` inside your project's folder then add the following content:

```json
{
  "name": "ionic-javascript-template",
  "version": "1.0.0",
  "description": "Simple Ionic 4 Web Components Template",
  "main": "index.html",
  "scripts": {
    "start": "serve"
  },
  "dependencies": {},
  "devDependencies": {
    "serve": ""
  }
}
```

Next run the following command to install the dependencies:

```bash
npm install
```

Now create a `src` folder where you can put your JavaScript files. Inside it add the `index.js` file with this initial code to print the famous "hello world" message.

```js
document.body.innerHTML = `
<h1>Ionic 4 Web Components Template</h1>
<div>
  Hello World
</div>
`;
``` 

You have two commands at your disposal `npm start` and `npm build`.

So open a terminal window and run `npm start` to open a dev server. You can then open `http://localhost:5000` in your browser to see your JavaScript application up and running.

Now let's focus on implementing the Ionic 4 web components:

First you need to install the `@ionic/core` package from npm using:

```bash
npm install --save @ionic/core
```

Next you need to include the `node_modules/@ionic/core/dist/ionic.js` file in your `index.html` file:

```html
<script  src='node_modules/@ionic/core/dist/ionic.js'></script>
```

Let's now modify `src/index.js` to use some Ionic Core web components:

```js
document.getElementById("app").innerHTML  =  `

<ion-app>
	<ion-header>
		<ion-toolbar color='primary'>
		<ion-title>Ionic JavaScript Starter</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content padding>
		Hello Ionic 4
	</ion-content>	
</ion-app>
`;
```

We are using various components:

- `<ion-app>`: [App is a container element for an Ionic application. There should only be one `<ion-app>` element per project. An app can have many Ionic components including menus, headers, content, and footers. The overlay components get appended to the `<ion-app>` when they are presented.]
-  `<ion-header>`
-  `<ion-toolbar>`
-  `<ion-title>`
-  `<ion-content>`

This is what you should get: 

![Ionic 4 tutorial example](https://screenshotscdn.firefoxusercontent.com/images/a488d93b-238f-4a0f-b39c-ccc6eae81854.png)

Now let's add a button and attach it to some action:

For buttons you need to use the `<ion-button>` component so inside the previous page `<ion-content>` add: 

```html
<ion-button id="printToConsole"> Print To Console
</ion-button>
```

This how you page looks like now:

![Ionic 4 tutorial](https://screenshotscdn.firefoxusercontent.com/images/5335341c-c377-4504-b611-983e35904406.png)


Now how do you attach an action to this button? You can simply use event listeners but first you need to query the DOM for the button with id *printToConsole*:

```js
var  printToConsoleBtn  =  document.querySelector("#printToConsole");
```

Next use `addEventListener()` to attach the click event to a simple handler that prints to the console.

```js
printToConsoleBtn.addEventListener('click',(e)=>{
	console.log("Button clicked!");
});
```



## Adding Navigation Using The Nav Component

Now let's see how we can implement something a little advanced, navigation between multiple pages.

We first need to create some pages as web components:

### Create a Home Page/Web Component

Open `src/index.js` and add the following code:

```js
customElements.define('app-home', class  extends  HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {

		this.innerHTML  =  `
			<ion-header>
			<ion-toolbar color='primary'>
				<ion-title>Ionic JavaScript Starter </ion-title>
			</ion-toolbar>
			</ion-header>
			<ion-content padding>
				<p>This is home!</p>
			</ion-content>
		`;
	}
});
```  
### Create An About Page/Web Component

In the same file `src/index.js` file define the *page-about* web component using the following code:

```js
customElements.define('app-about', class  extends  HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {

		this.innerHTML  =  `
			<ion-header>
			<ion-toolbar color='primary'>
			<ion-title>Ionic JavaScript Starter</ion-title>
			</ion-toolbar>
			</ion-header>
			<ion-content>
			<p>
			Welcome to the Ionic JavaScript Starter.
			You can use this starter to build Mobile/PWA applications with
			web components using JavaScript and ionic/core!
			</p>
			<ion-button id="backBtn">Go Back</ion-button>
			</ion-content>
		`;
		}
	});
``` 

Now that we have created our components. Let's create navigation between them. We'll use the the `<ion-nav>` component.

```
document.body.innerHTML  =  `

<ion-app>
	<ion-nav></ion-nav>
</ion-app>
`;
```

We need to set a root component to be loaded as the first component of the navigation stack as the stack can't be empty. To do that, we need to first wait for the navigation component to be ready so we'll execute the following code in the *onload* event.

```js
document.body.onload  =  init();
``` 

Now let's define the `init()` function:

```js
async  function  init() {
	const  nav  =  document.querySelector('ion-nav');
	await  nav.componentOnReady();
	nav.root  =  'app-home';
}
```
We are making the function *async* so we can use the *await* keyword to wait for *componentOnReady()* method which returns a Promise. When the component is ready we set the *root* of the `<ion-nav>` component (which we have grabbed using  the *querySelector()* DOM API) to the *app-home* web component.

Now, let's add a button to the home page to be able to navigate to the about page 

```html
<ion-nav-push id="navPush" component="">
	<ion-button class="next">Go to About</ion-button>
</ion-nav-push>
``` 

We need to wait for the component to be ready before setting the component to be pushed so in the *connectedCallback()* method add the following code

```js
const  navPush  =  this.querySelector('#navPush');
await  navPush.componentOnReady();
navPush.component  =  "app-about";
```

We are using the *await* keyword so make sure to add *async* before *connectedCallback()*.

 Next, let's add a back button in the *app-about* method to go back to the home page:

```html
<ion-nav-pop>
	<ion-button>Go Back</ion-button>
</ion-nav-pop>
``` 

 As a recap, we are using various Ionic core components to implement a simple navigation system:

- `<ion-nav>`: the main component for navigation. It represents a navigation stack. This component needs to take a root component to be loaded as the first component.
- `<ion-nav-push>`: this component pushes a component in the navigation stack.
- `<ion-nav-pop>`: this component pops a component from the navigation stack.
- Components have a `componentOnReady()` method that signals when a component is ready.
- Ionic components only work with web components so you need to create any new pages using  the `customElements.define()` method available on modern browsers.


## Using Tabs Component

In the previous section, we implemented a simple navigation pattern with root/push/pop actions. Now let's use tabs for more advanced navigation.

First we start by creating a custom element called `app-tabs`:

```js
customElements.define('app-tabs',class  TabsPage  extends  HTMLElement {

	async  connectedCallback() {
		this.innerHTML  =  ``;
	}
}
``` 

Next, create the tabs container component

```html
<ion-tabs></ion-tabs>
```

Inside that, you can add multiple tabs using `<ion-tab>`. Let's create three tabs

```html
<ion-tab label='Home' icon='home'>
<!-- tab content here -->
</ion-tab>
<ion-tab label='About' icon='map'>
<!-- tab content here -->
</ion-tab>
<ion-tab label='Contact' icon='contact'>
<!-- tab content here -->
</ion-tab>
```

For each tab, we can specify the label and the icon. For the content, you can either add inline content or use the `<ion-nav>` component to load another component/page as a root. 

For the first two tabs, we load the home and about components. Put this HTML code 

```html
<ion-tab label='Home' icon='home'>
	<ion-nav class="tab-one-nav"></ion-nav>
</ion-tab>

<ion-tab label='About' icon='map'>
	<ion-nav class="tab-two-nav"></ion-nav>
</ion-tab>
```

Next, let's set the root components for each tab navigation stack:

```js
async  connectedCallback() {

	this.innerHTML  =  ``;
	
	const  navOne  =  this.querySelector('.tab-one-nav');
	await  navOne.componentOnReady();
	await  navOne.setRoot('app-home');
	const  navTwo  =  this.querySelector('.tab-two-nav');
	await  navTwo.componentOnReady();
	await  navTwo.setRoot('app-about');
}
```

For the last tab, we use inline content to create the tab's layout:

```html
<ion-tab label='Contact' icon='contact'>
	<ion-header>
		<ion-toolbar color='primary'>
		<ion-title>Ionic JavaScript Starter</ion-title>
	</ion-toolbar>
	</ion-header>
	<ion-content>
		<p>Hello! I'm the third tab!</p>
	</ion-content>
</ion-tab>
```

You can then set `app-tabs` component as the root for the main navigation component instead of the home component: 

```js
async  function  init() {
	const  nav  =  document.querySelector('ion-nav');
	await  nav.componentOnReady();
	nav.root  =  'app-tabs';
}
```

![Ionic 4 tutorial](https://screenshotscdn.firefoxusercontent.com/images/6e3d005f-dacf-428b-b0d5-b725b148eae3.png)

## Conclusion

In this tutorial, we have seen how we can use various Ionic 4/Core components such as Tabs, Navs and Buttons. In next tutorials we'll focus on other components like Menus and the Ionic Router. You can find the source code in this [repository](https://github.com/techiediaries/ionic-javascript-starter).










