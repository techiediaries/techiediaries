---
layout: post
title: "Ionic 4/Angular - Geolocation Plugin, Google Maps and Places API [Part 2]"
image: "images/content/ionic-geolocation-maps-location-api.png"
excerpt: "Create an Ionic 3 app which uses the Geolocation Cordova plugin ,Google maps and the Google Places API" 
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-geolocation-maps-location-api.png" 
    title="Ionic 2/3 Geolocation ,Google maps and Places API" 
%}

On the previous part we have added a Google Map to our Ionic 4 application and used the Cordova Geolocation plugin and its Ionic native wrapper to get the current user position.

Check out the first part: 

[Ionic 4 - Geolocation Plugin, Google Maps and Places API](/ionic-geolocation-google-maps-places-api) 


On this part we are going to continue building our nearby restaurants mobile app so let's get started. 

First of all, you need to change the script tag for including the Google Maps JavaScript SDK in the `src/index.html` file to enable the Places API: 

    <script src="http://maps.google.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>

Next open the `src/pages/home/home.scss` file and add these styles: 

    page-home {
        .scroll {
            height: 100%
        }
    
        #map {
            width: 100%;
            height: 40%;
        }
    } 

The Google map will take only 40% of height.

Next, open the `src/pages/home/home.html` file and change it accordingly:

    <ion-header>
    <ion-navbar>
        <ion-title>
        Nearby Me Restaurants
        </ion-title>
    </ion-navbar>
    </ion-header>

    <ion-content padding>

    <div #map id="map"></div> 
    
    <div style="width : 100% ;height: 60%">
        <ion-list>
        <ion-item *ngFor="let place of places">
            <p>{{place.name}}</p>
        </ion-item>
        </ion-list>
    </div>
    
    </ion-content>


Now, in the `src/pages/home/home.ts` file, add a member variables of type `Array` to hold the nearby places: 

    declare var google;

    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {
    options : GeolocationOptions;
    currentPos : Geoposition;
    places : Array<any> ; 


Next, add a `getRestaurants()` method to get the list of the nearby restaurants:

    getRestaurants(latLng)
    {
        var service = new google.maps.places.PlacesService(this.map);
        let request = {
            location : latLng,
            radius : 8047 ,
            types: ["restaurant"]
        };
        return new Promise((resolve,reject)=>{
            service.nearbySearch(request,function(results,status){
                if(status === google.maps.places.PlacesServiceStatus.OK)
                {
                    resolve(results);    
                }else
                {
                    reject(status);
                }

            }); 
        });
    
    }

This method returns a Promise which resolves with the list of restaurants or if there is an error it will be rejected with the status code.

We have wrapped the `service.nearbySearch()` method, which uses callbacks, in a Promise to play nice with the Angular change detection.    

Also add a `createMarker()` method: 

    createMarker(place)
    {
        let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location
        });   
    }   

This method creates a marker from a place. It's called for every place returned by the `nearbySearch()` method.     

Finally update the `addMap()` method to invoke the previous methods: 

    addMap(lat,long){
        
        let latLng = new google.maps.LatLng(lat, long);
    
        let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.getRestaurants(latLng).then((results : Array<any>)=>{
            this.places = results;
            for(let i = 0 ;i < results.length ; i++)
            {
                this.createMarker(results[i]);
            }
        },(status)=>console.log(status));

        this.addMarker();
    
    }

The `places` variable holds the list of the nearby restaurants which are then displayed using `<ion-list>` on the view.

## Conclusion 

That is it! You have now created a nearby app with Ionic 4/Angular which gets the current user location using the Cordova Geolocation plugin and Ionic Native then uses the Google Places API to search for the nearby restaurants and display them in a Google Map.




