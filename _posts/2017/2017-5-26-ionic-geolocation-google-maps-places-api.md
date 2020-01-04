---
layout: post
title: "Ionic 4 - Geolocation Plugin, Google Maps and Places API"
image: "images/content/ionic-geolocation-maps-location-api.png"
excerpt: "Create an Ionic 3 app which uses the Geolocation Cordova plugin ,Google maps and the Google Places API" 
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-geolocation-maps-location-api.png" 
    title="Ionic 2/3 Geolocation, Google maps and Places API" 
%}

Throughout this tutorial, you'll learn to use Geolocation and Google Maps in Ionic 4/Angular.

In this tutorial we are going to create a nearby restaurants mobile app using Ionic 4 and Angular. 

We are going to learn how to use: 

- The Cordova Geolocation plugin and its Ionic 4 Native wrapper to get the current user position or GPS location,

- Google Maps to dispaly a map with a marker showing current user position,

- Google Places API to get a list of nearby places or restaurants in our case.

Also, check out 


[Ionic 4 - Create a Nearby Restaurants App with Geolocation Plugin ,Google Maps and Places API Part 2](/ionic-geolocation-google-maps-places-api-part-2)


## Generating a New Ionic 4/Angular Project

Let's start by generating a new Ionic 4 project based on Angular using the Ionic CLI v4. Open your terminal or command prompt and run: 

    ionic start nearby-restaurants blank --type=angular 

Navigate inside your project root directory and serve your Ionic application:

    cd nearby-restaurants 
    ionic serve 

## Adding a Target Android platform 

Since we are building an Android app, we are going to add an Android target but you can also add an ios or windows platform: 

    ionic cordova platform add android 

Next run the app on your device using: 

    ionic run android -l 

Now just continue developing your app, all changes will be synced automatically to your mobile device thanks to the `-l` switch. 

## Installing and Configuring the Cordova Geolocation plugin and its Ionic Native Wrapper 

The Cordova Geolocation plugin allows you to get the current user location or GPS position which is what we need to be able to get the nearby restaurants so let's add the plugin by running:

    ionic cordova plugin add cordova-plugin-geolocation --save 

Then install the Ionic native 3.x+ wrapper for this plugin via npm 

    npm install --save @ionic-native/geolocation 

Next we need to add a little bit of configuration so head over to `src/app/app.module.ts` file and start by importing `Geolocation` from `ionic-native` and add it to the list of main module providers:        


```ts
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

## Getting the Current User Position with the Geolocation Cordova Plugin 

Head over to the `src/pages/home/home.ts` file and follow these steps:

Start by importing `Geolocation`, `GeolocationOptions`, `Geoposition` and `PositionError`: 

    import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
    
Next, inject `Geolocation` via the component constructor: 

      constructor(public navCtrl: NavController,private geolocation : Geolocation) {}

Next, add two members for options and current position 

    @Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    })
    export class HomePage {
    options : GeolocationOptions;
    currentPos : Geoposition;
    constructor(public navCtrl: NavController,private geolocation : Geolocation) {} 

Next, add the `getUserPosition()` method: 

    getUserPosition(){
        this.options = {
            enableHighAccuracy : true
        };

        this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

            this.currentPos = pos;      
            console.log(pos);

        },(err : PositionError)=>{
            console.log("error : " + err.message);
        });
    }

Finally, call the `getUserPosition()` when the view enters: 

    ionViewDidEnter(){
        this.getUserPosition();
    }    


## Adding Google Maps JavaScript SDK 

After getting the current user position, we need to display that position in a Google map. But we first need to setup the Google Maps JavaScript SDK.

open the `src/index.html` file and add this script tag to include the SDK: 

    <script src="http://maps.google.com/maps/api/js?key=YOUR_API_KEY_HERE"></script>

To grab an API key go to this <a href="https://developers.google.com/maps/documentation/javascript/get-api-key">link</a> 

After getting the API key paste it in instead of `YOUR_API_KEY_HERE` in the script tag.

Next add two variables: 

    import { Component , ViewChild ,ElementRef } from '@angular/core';
    import { NavController } from 'ionic-angular';
    import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 

    declare var google;

    @Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    })
    export class HomePage {
    options : GeolocationOptions;
    currentPos : Geoposition;
    @ViewChild('map') mapElement: ElementRef;
    map: any;


Then add this method to create a map: 

    addMap(lat,long){
        
        let latLng = new google.maps.LatLng(lat, long);
    
        let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.addMarker();
    
    }

Next, add the following method to add a marker: 

    addMarker(){
    
        let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
        });
    
        let content = "<p>This is your current position !</p>";          
        let infoWindow = new google.maps.InfoWindow({
        content: content
        });
    
        google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
        });
    
    }

Change your `getCurrentPosition()` method to display the map based on the current user position: 

    getUserPosition(){
        this.options = {
        enableHighAccuracy : false
        };
        this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

            this.currentPos = pos;     

            console.log(pos);
            this.addMap(pos.coords.latitude,pos.coords.longitude);

        },(err : PositionError)=>{
            console.log("error : " + err.message);
        ;
        })
    }


Next you need to change the `src/pages/home/home.html` file: 

    <ion-header>
    <ion-navbar>
        <ion-title>
        Nearby Me Restaurants
        </ion-title>
        <ion-buttons end>
        <button ion-button (click)="showNearbyResto()"><ion-icon name="list"></ion-icon>Restaurants</button>
        </ion-buttons>  

    </ion-navbar>
    </ion-header>

    <ion-content padding>

    <div #map id="map"></div> 
    
    </ion-content>

The map won't show up but it's there. All you need to do is to add some styles to the `src/pages/home/home.scss` file:

    page-home {
        .scroll {
            height: 100%
        }
    
        #map {
            width: 100%;
            height: 100%;
        }
    }


## Conclusion 

That's the end of this tutorial part. We have seen how to get the current user position using the Cordova Geolocation plugin and how to display the user current position on a Google Map in our Ionic 4/Angular mobile application.

On the next part, we'll continue building our app to display a list of nearby locations (restaurants) using the Google Location API.

  