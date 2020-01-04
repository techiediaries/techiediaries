---
layout: post
title: "Ionic 4/Angular: Consuming a WordPress Rest API"
image: "images/content/wordpress-ionic2.png"
tags: [wordpress,ionic]
excerpt: "In this tutorial ,we are going to see how to build an Ionic 4 app for consuming WordPress rest API " 
---

{% include image.html 
    img="images/content/wordpress-ionic2.png" 
    title="Consuming WordPress Rest API with Ionic 2" 
%}

![Ionic 4 WordPress](/images/content/wordpress-ionic2.png)

In this tutorial, we are going to see how to build a cross platform mobile app and WordPress client
for Android, iOS and Windows Universal Platform using Ionic 4/Angular.

If you have a WordPress website or blog and want to create a mobile version of it, just follow with us.
We are going to cover all the required steps to build a mobile client which connects to and consumes the WordPress API. 

## Tutorial requirements

This tutorial has a few requirements, you need to have the Ionic CLI 4 installed. You also need to have a 
WordPress website installed either locally or remotely.

Prior to WordPress 4.7, you need to install the WordPress API plugin - WP-API. For WordPress 4.7+ WP-API is integrated in the core so you don't have to do anything.

## Generating a New Ionic 4 Project 

Let's get started by generating a new Ionic 4 project based on Angular. Open your command prompt on Windows or your terminal on Linux/MAC and enter the following command:

    ionic start wp-ionic blank --type=angular 

Wait until the command finishes and then navigate into your project's folder and serve it to make sure everything is working as expected:

    cd wp-ionic 
    ionic serve 

## Integrating WordPress with Ionic 4

We are going to use a WordPress API client for JavaScript which is designed specifically to work with 
WordPress 4.7+. If you are using WordPress 4.6 or a prior version with the old WP Rest API plugin some 
commands will not work.

First of all, get the client from this <a href="https://wp-api.github.io/node-wpapi/wpapi.zip">link</a>.

Next, unzip the content of the `wpapi.zip` file into the <em>app/assets</em> folder.

Next, open the <em>index.html</em> file of your Ionic 4 project and include the library before Ionic scripts.

    <script src="assets/wpapi.js"></script>

That is all we need to do, to be able to use the WordPress Rest API client in our Ionic 4/Angular project.

## Generating a Service Provider 

Now let's generate an Ionic 4/Angular service provider to encapsulate the WordPress Rest API client logic. Make sure you are under your project directory then run the following command:

    ionic generate service WPService 

Open the generated provider from the <em>src/providers/wp-service.ts</em> file.

To be able to access the client JavaScript API from TypeScript add the following code: 

    declare var WPAPI : any;        

Next let's connect to our WordPress API endpoint: 

    @Injectable()
    export class WPService {
    wp : any ;

    constructor(public http: Http) {
        
        console.log('Hello WPService Provider');
        this.wp = new WPAPI({ endpoint: 'http://localhost/wp-json' });
        console.log(wp);
    
    }
    //....

> Note: We are using a local WordPress installation. If that is not your case you need to change the endpoint to point to your WordPress website domain name.    

Make sure to add this provider to the list of providers in the <em>src/app/app.module.ts</em> file:

    import { WPService } from '../providers/wp-service';
    
    @NgModule({
        /* .... */

    providers: [
        StatusBar,
        SplashScreen,
        WPService,
        {provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
    })
    export class AppModule {}

Now let's generate a Posts page using: 

    ionic g page Posts 

Again include the page in the <em>src/app/app.module.ts</em> file:

    import { PostsPage } from '../pages/posts/posts';


    @NgModule({
    declarations: [
        MyApp,
        PostsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        PostsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        WPService,
        {provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
    })
    export class AppModule {}
    
Let's also add a menu to our app so we can access our page(s). 

Open or add an <em>app.html</em> file and paste this code to create a menu which has links to all pages in our project: 

    <ion-menu [content]="content">
    <ion-header>
        <ion-toolbar>
        <ion-title>Menu</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content>
        <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
            {{p.title}}
        </button>
        </ion-list>
    </ion-content>

    </ion-menu>
    <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>

You need to have the code at <em>src/app.component.ts</em> similar to the following: 

    import { Component, ViewChild } from '@angular/core';
    import { Nav, Platform } from 'ionic-angular';
    import { StatusBar } from '@ionic-native/status-bar';
    import { SplashScreen } from '@ionic-native/splash-screen';

    import { PostsPage } from '../pages/posts/posts';


        @Component({
        templateUrl: 'app.html'
        })
        export class MyApp {
        @ViewChild(Nav) nav: Nav;

        rootPage: any = PostsPage;

        pages: Array<{title: string, component: any}>;

        constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
            this.initializeApp();

            // used for an example of ngFor and navigation
            this.pages = [
            { title: 'Posts', component: PostsPage },
            ];

        }

        initializeApp() {
            this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            });
        }

        openPage(page) {
            // Reset the content nav to have just this page
            // we wouldn't want the back button to show in this scenario
            this.nav.setRoot(page.component);
        }
        }

Don't forget to add a button to toggle the menu on and off in your pages: 

    <ion-header>
    <ion-navbar>
        <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Posts</ion-title>
    </ion-navbar>
    </ion-header>

> Note: If you have generated your project based on the menu template, you will have a menu already setup and you don't have to do all these steps.

The next step now is to inject the `WPService` provider via PostsPage provider:

Open the <em>src/pages/posts/posts.ts</em> file then add: 
    
    /* ... */
    import { WPService } from '../../providers/wp-service';

    @Component({
    selector: 'page-posts',
    templateUrl: 'posts.html'
    })
    export class PostsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams ,private wpService : WPService) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad PostsPage');
    }
    }

Go ahead and serve your project using the following command:

    ionic serve 

You should see a console log printing the WPAPI object,if everything goes right. 

{% include image.html 
    img="images/content/ionic-wp-console.jpg" 
    title="Consuming WordPress Rest API with Ionic 2" 
%}

## Displaying WordPress Posts

After we have successfully integrated the WordPress Rest API client within our Ionic 4/Angular app, let's now 
fetch and display WordPress posts in our mobile app.

So go ahead and open the <em>app/providers/wp-service.ts</em> file and let's add a method to fetch posts using the REST client API:

    @Injectable()
    export class WPService {
    wp : any ;

    constructor(public http: Http) {
        console.log('Hello WPService Provider');
        this.wp = new WPAPI({ endpoint: 'http://localhost/wp-json' });
        console.log(this.wp);
    
    }
    public posts(){
        return this.wp.posts().then(function( data ) {
            // do something with the returned posts
            //console.log(data);
            var paging = data._paging;
            var results = [];
            for(var i = 0; i < paging.total ; i++)
            {
                results.push(data[i]);
            }
            return results;
        }).catch(function( err ) {
            // handle error
            console.log(err);
            return err;
        }); 
    }

    }


Next, open the PostsPage page and add the following command: 

    @Component({
    selector: 'page-posts',
    templateUrl: 'posts.html'
    })
    export class PostsPage {
    public posts ;

    constructor(public navCtrl: NavController, public navParams: NavParams ,private wpService : WPService) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad PostsPage');
        var that = this;
        this.wpService.posts().then(function(r){
            
            that.posts = r;
            console.log(that.posts);

        }) 
    }
    }

After fetching the posts, we need to display them, so open the <em>src/pages/posts/posts.html</em> file and add the following code: 

    <ion-content padding>
    <ion-list>
        <button ion-item *ngFor="let post of posts" (click)="itemTapped($event, post)">
        <ion-icon name="list" item-left></ion-icon>
        { { post.title.rendered } }
        </button>
    </ion-list>
    
    </ion-content>
 
 You should see a list of posts, depending on the posts you have on your WordPress website.
 
 ## Conclusion

 That is the end of this tutorial. It's just a basic demo showing how to use the WordPress Rest API 
 in Ionic 4 apps based on Angular but you can develop your app to include more advanced things such as fetching and displaying categories, posts pagination and many other features.

