---
layout: post
title: "Understanding Ionic/Angular 4 : Creating Pages and Navigation Systems"
image: "images/content/understanding-ionic2-creating-pages-and-navigation-systems/titleimage.png"
excerpt: "In this tutorial we are going to learn how to create pages and navigation systems in Ionic 4 mobile application"
categories: building-hybride-mobile-apps-with-ionic1-and-ionic2-tutorials
tags : ionic 
---

<a data-pin-do="embedPin" data-pin-width="large" href="https://www.pinterest.com/pin/427490189612764325/"></a>


In this tutorial we'll learn how to create pages and navigation in your Ionic 4 application based on Angular.

## Generating a New Ionic 4 Project


Let's start our journey by generating a new Ionic 4 project based on Angular using the Ionic CLI 4. In your terminal, run the following command:

```bash
$ ionic start navigationApp blank --type=angular 
```

## Generating Ionic 4 Pages

Next, let's generate tow pages in our application for about and contact. In your terminal run the following commands:

```bash
$ ionic generate page about 
$ ionic generate page contact
```


## Adding Navigation Between Pages


At this point, we have three pages - home, contact and about. We need to add navigation from the home to about and contact pages.

There are many ways to implement navigation between pages in your Ionic 4 app.


### Basic Navigation System


We are going to use <ion-nav> for creating a navigation controller. If you look in the `app.ts` file you should notice that there is already a navigation controller: 

{% highlight javascript %}
import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);

{% endhighlight %}

In order to use this navigation controller from other pages you only need to inject it via the class constructor of the corresponding page. To actually navigate between pages you need to push and pop pages from the injected navigation controller.

Now to be able to navigate from `HomePage` to `AboutPage` we only need to import `AboutPage` and push it to the history stack then the navigation controller will take care of the rest.

Add the following code to `HomePage`:

{% highlight javascript %} 
  
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';

  goToAboutPage(){
    this.nav.push(AboutPage);
  }
  goToContactPage(){
  	this.nav.push(ContactPage);
  }

{% endhighlight %}

And then bind this method to a `click` event using the following code:
 
 {% highlight html %} 

   
    <ion-content>
      <button (click)="goToAboutPage()">
        Go to AboutPage
      </button>
      <button (click)="goToContactPage()">
        Go to AboutPage
      </button>

    </ion-content>`

{% endhighlight %}

Next, add the following code to `AboutPage`: 

{% highlight javascript %} 

  goBack() {
    this.nav.pop();
  }
{% endhighlight %}  

In this navigation system; the current page is always on the the top of the navigation stack and to manipulate the top of the stack you have two methods - `push` and `pop`; push to add another page to the stack top and pop to remove the current page from the top.  

You can also have a ready Back button by just adding a `<ion-navbar>` component to your pages header.

In each child page header add the following code:

{% highlight html %} 

  <ion-header>
    <ion-navbar>
      <ion-title>Page Title</ion-title>
    </ion-navbar>
  </ion-header>

{% endhighlight %}


Please notice that you can only use this simple navigation system if there's a simple parent child relationship between your pages.

In our case `HomePage` is a parent of both `AboutPage` and `ContactPage` - `HomePage` is the root of our navigation controller which is injected into `AboutPage` and `ContactPage`. 

Now what if you have a more complex relationship between your pages such as having multiple root pages. In this case you have the choice between two navigation systems either the `tab` or the `menu` based navigation systems.



## Ionic 4 Tab Based Navigation

Imagine that we have many top level pages without any parent child relationship between them.

Instead we need to be able to navigate to any page of them, we choose, from one place.

The tab system comes to the rescue. Implementing this navigation system is really easy with Ionic 4. All you have to do is adding a `tabs` page with the following command:

{% highlight html %} 

	ionic generate page tabs

{% endhighlight %}

Next, add the following code inside the `tabs.html` template:

{% highlight html %} 

	<ion-tabs>
	  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>
	  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>
	  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>
	</ion-tabs>

{% endhighlight %}

And inside `tabs.ts` file add the following code:

{% highlight javascript %} 

import {Component} from '@angular/core'
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tab3Root = ContactPage;
  }
}

{% endhighlight %}

No you should change the root property of `<ion-nav>` in the `app.ts` file to point to tabs.

## Ionic 4 Menu Based Navigation

The recommended method of navigation by the ionic team is tabs but sometimes when you have many top level pages we can not use the tab system. 

In this case we can substitue tabs with a side menu to navigate between between root pages. So let's add a side menu to our app.

Open the `app.ts` file and change the template to the following code: 

{% highlight html %} 

 `
    <ion-menu [content]="content">
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
      <ion-content>
        <ion-list>
          <button ion-item (click)="openPage(rootPage)">
            Home
          </button>

          <button ion-item (click)="openPage(aboutPage)">
            About
          </button>
          <button ion-item (click)="openPage(contactPage)">
            Contact
          </button>

        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-nav id="nav" #content [root]="rootPage"></ion-nav>`

{% endhighlight %}

Next, add the following code to the `MyApp` class:

{% highlight javascript %} 

	   private rootPage = HomePage;
	   private aboutPage = AboutPage;
	   private contactPage = ContactPage;


	  openPage(page) {
	    // Reset the nav controller to have just this page
	    // we wouldn't want the back button to show in this scenario
	    this.rootPage = page;

	    // close the menu when clicking a link from the menu
	    this.menu.close();
	  }

{% endhighlight %}

This is the full content of the `app.ts` file: 

{% highlight javascript %} 

	import {Component} from '@angular/core';
	import {Platform, ionicBootstrap} from 'ionic-angular';
	import {StatusBar} from 'ionic-native';
	import {TabsPage} from './pages/tabs/tabs';
	import {HomePage} from './pages/home/home';
	import {AboutPage} from './pages/about/about';
	import {ContactPage} from './pages/contact/contact';


	@Component({
	  template: '<ion-menu [content]="content">
	      <ion-toolbar>
	        <ion-title>Pages</ion-title>
	      </ion-toolbar>
	      <ion-content>
	        <ion-list>
	          <button ion-item (click)="openPage(loginPage)">
	            Login
	          </button>
	          <button ion-item (click)="openPage(signupPage)">
	            Signup
	          </button>
	        </ion-list>
	      </ion-content>
	    </ion-menu>

	  <ion-nav #content  [root]="rootPage"></ion-nav> '
	})
	export class MyApp {
	   private rootPage = HomePage;
	   private aboutPage = AboutPage;
	   private contactPage = ContactPage;

	  constructor(platform: Platform) {
	  	this.rootPage = TabsPage;
	    platform.ready().then(() => {

	      StatusBar.styleDefault();
	    });
	  }
	}

	ionicBootstrap(MyApp);

{% endhighlight %}

## Conclusion


That's all for this quick tutorial. We have learned how to create pages and add simple, tabs and menu based navigation in our Ionic 4 application based on Angular