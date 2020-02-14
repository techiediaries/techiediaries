---
layout: post
title: "Ionic 5 Storage Tutorial and Example"
image: "images/content/ionic.jpg"
excerpt: "This tutorial will cover how to use Ionic 5/Angular local/native storage to easily store and persist key-value pairs and JSON objects. Ionic Storage abstracts all the available mechansims for data storage such as native Cordova SQLite and browser storage APIs like IndexedDB, WebSQL or localStorage."
date: 2020-02-13
tags : [ ionic] 
---


This tutorial will cover how to use Ionic 5/Angular local/native storage to easily store and persist key-value pairs and JSON objects. Ionic Storage abstracts all available mechansims for data storage such as native Cordova SQLite and browser storage APIs like IndexedDB, WebSQL or localStorage.

The most convenient way will be automatically chosen depending on your use case or the underlying platform, for example for native apps running on mobile devices SQLite will be used for storage but for Progressive Web Apps running on the browser platform, where there is no native storage, either localStorage or IndexedDB will be used.

## Installing the SQLite Cordova Plugin

First of all, before you can use SQLite as a storage option for native apps, you'll need to install the Cordova plugin for SQLite using the following command:
    
    ionic cordova plugin add cordova-sqlite-storage


Next, just like any module you need to add it to the list of imports in `src/app/app.module.ts`:    

    import { IonicStorageModule } from '@ionic/storage';
    /* ... */    
    @NgModule({
      /* ... */
      imports: [      
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
      ],
      bootstrap: [IonicApp],
      /* ... */
    })
    export class AppModule {}

Now you are ready to use the Storge API in any component by simply injecting it via the component constructor. So let's create a full demo showing how you can use Storage API inside an Ionic 5/Angular application (either native app or progressive web app).

## Create an Ionic 5/Angular Project 

Open your terminal or command prompt and create an Ionic 5 project using the following command:

    ionic start ionic-storage-example blank --type=angular
    
This will generate a new project based on the `blank` template which has only on default home page (this is sufficient for our example demo).

Next, navigate inside your project directory then open it with your favorite code editor. I'll be using VSCode.

First follow the installation instructions on the get Started section above. 

Next open the `src/pages/home/home.ts` file and import then inject the `Storage` class:

    import { Component } from '@angular/core';
    import { Storage } from '@ionic/storage';
 
    @Component({
     selector: 'app-home',
     templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
    })
    export class HomePage {

      constructor(public storage: Storage) {}
    }

Now let's suppose you need to persist some app settings such as the theme color. We can do that using the Storage class APIs such as the `get()` and `set()` methods as follows:

      public set(settingName,value){
        return this.storage.set(`setting:${ settingName }`,value);
      }
      public async get(settingName){
        return await this.storage.get(`setting:${ settingName }`);
      }
      public async remove(settingName){
        return await this.storage.remove(`setting:${ settingName }`);
      }
      public clear() {
        this.storage.clear().then(() => {
          console.log('all keys cleared');
        });
      }

Please note that these methods return Promises. Also for the sake of this simple example, we added these methods on the component but normally this kind of logic should be placed inside Angular services.

## Adding the UI 

Now, let's add some buttons to trigger these methods:

Open the `src/pages/home/home.html` and add the following code:

    <ion-content padding>
      <button ion-button (click)="set('color','blue')">Set Color To Blue</button>
      <button ion-button (click)="remove('color')">Remove Color Setting</button>
    </ion-content>

Values can be simple values such as strings and numbers or complex JSON objects.


## Conclusion

That's all for this tutorial where we have seen how to use Ionic 5/Angular Storage class to persist key-value pairs and JSON objects. For advanced CRUD you may want to consider using Ionic Native SQLite or PouchDB.




