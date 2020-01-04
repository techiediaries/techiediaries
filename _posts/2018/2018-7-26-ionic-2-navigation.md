---
layout: post
title: "Ionic 4/Angular Routing and Navigation Tutorial & Examples"
image: "images/content/ionic-2-navigation.png"
excerpt: "How to add navigation between pages inside Ionic 4 apps" 
tags : [ionic2 , ionic ]
---

{% include image.html 
    img="images/content/ionic-2-navigation.png" 
    title="Ionic 2 navigation" 
%}

In this tutorial we'll learn about routing and navigation in Ionic 4/Angular.

Ionic 4 uses a navigation stack for implementing navigation between pages. You can simply think about a stack of pages, one page id on top of another page.

In a stack (computer data structure) you can only access the element on top. In the Ionic 4
terminology this means you can only view the page on top of the navigation stack so to navigate to another page you need to do one of these two actions:


- Push the page on the stack ,in this case it becomes on top because pushing on stack means putting the element 
at the top .
- Pop a page(s) until your target page becomes on the top but this means your page needs to be already existing on navigation stack which only means you have navigated to it before .This is how Ionic 2 implements the back action 
button (by popping the current page from the navigation stack).

So by only understanding these two stack concepts you can understand the Ionic 4 navigation system:

- When you navigate to a page, you are pushing the page on top of the stack.

- When you navigate from a page, you are popping the page from the top of the stack.

You can read more about the stack data structure from this [Wikipedia link](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) 

## Getting Started with Ionic 4 Navigation 

Now, that we have seen the theory behind Ionic 4 navigation system. let's see how to implement it. Don't worry you don't have to implement a stack by yourself, Ionic 4 have already done that for you.You can easily accomplish navigation by using the `NavController` component alongside many other components.

If you have already generated an Ionic 4 project with some pages, you have probably seen the `NavController` injected into every page constructor so you don't have to do anything else except navigating but how?

The `NavController` component exposes many methods so you can control the navigation stack with all ease but `NavController` is not the only available component for navigation, there are other components:

- NavParams
- NavPop
- NavPush
- Nav
- NavBar etc.

Now let's see each of these components by example so we can understand when and where to use each of them.

We will start by generating a new Ionic 4 project (based on blank template) so go ahead and execute the following commands in your terminal or command prompt:

```bash
$ ionic start ionic-2-navigation blank
```

The `blank` template has only one page, the `HomePage` so let's first add some other pages so go ahead and navigate inside your project folder and use the `ionic g page` generator to quickly create some new pages: 

```bash
$ cd ionic-2-navigation 
$ ionic g page about 
$ ionic g page contact 
```

You need to add these two pages to your `app.module.ts`. To do that, simply open the `src/app/app.module.ts` file and add the two pages to the `declarations` and `entryComponents` arrays after importing them.

```ts
    import { NgModule, ErrorHandler } from '@angular/core';
    import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
    import { MyApp } from './app.component';
    import { HomePage } from '../pages/home/home';
    import { AboutPage } from '../pages/about/about';
    import { ContactPage } from '../pages/contact/contact';

    @NgModule({
    declarations: [
        MyApp,
        HomePage,
        AboutPage,
        ContactPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AboutPage,
        ContactPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
    })
    export class AppModule {}
```

## Using NavController 

Now we are ready to add a simple navigation, let's add code to be able to navigate from our home page to either our about or contact page by clicking on some buttons.

Open the `app/src/pages/home/home.ts` file and do the following steps:

- Import the two page components 
- Add two methods, `gotoAbout()` and `gotoContact()`


Importing the two page components: 

```ts
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
```

Adding methods for navigation: 

```ts
    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {

    constructor(public navCtrl: NavController) {
        
    }

    public gotoAbout(){
        this.navCtrl.push(AboutPage);
    }

    public gotoContact(){
        this.navCtrl.push(ContactPage);
    }

    }
```

As you can see we navigate to another page by using the `push()` method of `NavController` which is injected via the page constructor and becomes available from `this.navCtrl` object.

The `NavController` is already and imported for us and injected by the Ionic CLI page generator but if you are creating a page manually you need to import the `NavController` service from `ionic-angular` and inject it via component constructor to be able to use it.

To navigate to another page, first we import and then we use the `NavController` push method which takes the target page/component as a parameter.


Next we need to bind the two methods to two buttons on component view (`home.html`). Open the `src/pages/home/home.html` file and add two buttons 

```html
    <button ion-button (click)="gotoAbout();">Go to about</button>

    <button ion-button (click)="gotoContact()">Go to contact</button>
```

Let's add a back button to our about and contact pages. Open the `src/pages/about/about.ts` file and add a `goBack()` method:

```ts
    goBack(){
        this.navCtrl.pop();
    } 
```

Then bind it to a button in the corresponding component view: 

```html
    <button ion-button (click)="goBack()">Go back</button>
```

Do the same for contact page.

So by using the NavController service we can navigate between pages via two methods `push()` and `pop()` which respectively pushs a page to navigation stack thus making it visible, and pops a page from navigation stack to make it disappear so the previous page on stack becomes on top (visible).


The next service we are going to see is NavParams which allows us to pass parameters between 
pages when navigating.

## Using NavParams 

In many situations we need to pass parameters from one page to another for example from a list page to a detail page. Ionic 4 has made this also as easy as navigating with `NavController`.

You can pass parameters with the `push()` method of `NavController` as the second parameter of the method but to retrieve them you need to use the NavParams service so lets see how to do it with an example.

Again open the `src/pages/home/home.ts` file and modify the `gotoAbout()` method like this :

```ts
  gotoAbout(){
    this.navCtrl.push(this.aboutPage,{param1 : "hello" , param2 : "world"});
  }
```

You pass parameters as JavaScript object to the second parameter of the `push()` method. You can name a parameter whatever you want, but of course, it needs to be a valid TypeScript keyword.

We need now to get these parameters in our about page, start by opening the `src/pages/about/about.ts` file then follow the 
steps: 

- Import NavParams from `ionic-angular`
- Inject the service via component constructor
- Use the get method or data attribute of NavParams instance to retrieve values

Importing NavParams:

```ts
import { NavParams } from 'ionic-angular';
```

Injecting service and retrieving parameters 

```ts
    @Component({
    selector: 'page-about',
    templateUrl: 'about.html'
    })
    export class AboutPage {
    private param1 : string ;
    private param2 : string ;
    private allParams ;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.param1 = this.navParams.get("param1");
        this.param2 = this.navParams.get("param2");
        this.allParams = this.navParams.data ;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AboutPage');
    }

    goBack(){
        this.navCtrl.pop();
    }

    }
```

You can find more information about NavParams service on its <a href="https://saniyusuf.com/ionic-by-component-navigation/" target="blank">official docs</a>

## Using NavPush and NavPop

Ionic 4 provides two other services which allow you to accomplish navigation but this time declaratively i.e inside page views.

- `NavPush` is the equivalent to the `push()` method of `NavController`.

- `NavPop` is the equivalent to the `pop()` method of `NavController` 

Let's take now an example to understand how to use them. Open the `/src/pages/home/home.ts` and `/src/pages/home/home.html` files.

- Add two instance variables to HomePage class ,aboutPage and contactPage to hold AboutPage and ContactPage instances 
- Add buttons with navPush and navPop attributes to home.html

Adding instance variables:

```ts 

    export class HomePage {
        public aboutPage = AboutPage;
        public contactPage = ContactPage;
        public myParams = {
            param1 : "Hello",
            param2 : "World"
        };
```

Adding buttons 

```html
    <button ion-button [navPush]="aboutPage">Go to about </button>
    <button ion-button [navPush]="contactPage">Go to contact</button>
```

What if you want to pass parameters?

This is also easy you just to use the `navParams` property: 

```html
<button ion-button [navPush]="aboutPage" [navParams]="params">Go to about </button>
```

But make sure to add a member variable `myParams` which holds all parameters you want to pass, to `HomeClass`. 


For using navPop you just add it to a button without any value: 

```html
<button ion-button navPop>Go back</button>
```

And that is it ,you have a quick way to add a back button to your page without much code.

So what/when to use <a target="blank" href="http://ionicframework.com/docs/v2/api/components/nav/NavPop/">NavController</a> or <a target="blank" href="http://ionicframework.com/docs/v2/api/components/nav/NavPush/">NavPush/NavPop</a> ?

Both services can be used to add navigation so it depends on your preferences and needs but if you want a quick 
declarative way to add navigation use NavPush and NavPop. Otherwise if you want more control and the ability to add actions before or after navigation use NavController.   
 

## Using The Nav Component

`Nav` is another declarative equivalent of NavController which allows you to set the root page from HTML views.

In your generated project based on the blank template you already have HomePage set as a root page.

If you open the `src/app/app.html` file, the view associated with the root app component, you are going to find this code: 

```html
<ion-nav [root]="rootPage"></ion-nav>
```

In the `src/app/app.component.ts` file, the `rootPage` is set to `HomePage`: 

```ts
    @Component({
    templateUrl: 'app.html'
    })
    export class MyApp {
        rootPage = HomePage;

```
You can also set the root page using `NavController`' `setRoot()` method 

```ts
this.navCtrl.setRoot(HomePage);
```

## Using Navbar 

A `Navbar` is the navigational toolbar which you find on top of your app pages with a back button. A Navbar may contain a title, buttons, a segment and a search bar etc.

Our blank demo already have a `Navbar` in `home.html`: 

```html
    <ion-header>
    <ion-navbar>
        <ion-title>
        Ionic Blank
        </ion-title>
    </ion-navbar>
    </ion-header> 
```

So let's add some buttons to our Navbar 

```html
    <ion-header>
        <ion-navbar>
            <ion-title>
                Ionic 2 navigation demo
            </ion-title>
        </ion-navbar>
        <ion-buttons end>
            <button ion-button icon-only (click)="openModal()">
                <ion-icon name="options"></ion-icon>
            </button>
        </ion-buttons>        
    </ion-header> 
```    

## Conclusion 

We have seen the different components/services offered by Ionic 4 to allow developers to easily add 
routing and navigation between pages and set root page components.

Ionic 4 has also other components to add advanced types of navigation such as menus and tabs.
