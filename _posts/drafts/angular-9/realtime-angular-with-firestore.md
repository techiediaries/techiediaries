# 

This Dot Labs: Realtime App With Angular and Firestore (AngularFire)

![angularfire](https://images.ctfassets.net/zojzzdop0fzx/26Ln6nR3hRwlz08z5OOhVF/f928fdb5a4ba37871315ada824e7abe9/Asset_57.png)

In this tutorial, I'm going to show you how to use Firestore, which is a realtime database from Firebase with Angular. We are going to make use of the basic CRUD opeartions as well as AGM (Angular Google Maps).

## Overview

This application will help you to have a realtime map with a data table showing your favorite places that you have visted or want to visit, so you can share this info with your friends.  ![Screen Shot 2019-12-10 at 1.43.27 AM](https://images.ctfassets.net/zojzzdop0fzx/7cyRtqcLFbyCEE4bFzPIPq/ca8584281ad1df494f399da5d5287369/Screen_Shot_2019-12-10_at_1.43.27_AM.png)

## Firebase setup

1) Go to  [Firebase](https://firebase.google.com/), Sign in with your google account 2) Go to the console 3) Click on  **Add project**  4) Give your project a name 5) Disable  **Google Analytics for this project**  6) Click on  **Create Project**  7) You will see a screen like this. Click on the web icon  ![Screen Shot 2019-12-10 at 1.49.52 AM](https://images.ctfassets.net/zojzzdop0fzx/3egNo3TXVgVUoEguGlKTKd/a8f7e4569db6d2f31e6d59e6b0c9c5ac/Screen_Shot_2019-12-10_at_1.49.52_AM.png)  8) Register your app 9) Copy the  **firebaseConfig**  object, and paste it somewhere secure,  **we will use it later on**  10) Click on  **Continue to Console**  11) Click on the big orange box that says  **Cloud Firestore**  12) Then, on the top, you will see a button that says  **Create database**  13) A modal will show up. Click on radio button **Start in test mode**  14) Click  **Next**  15) Select your Firestore location 16) Click  **Done**

## Angular

Time to work on our Angular application.

1) Create a new angular app

**_Note: Make sure to select SCSS as you CSS compiler._**

```
ng new thisdot-tutorial
```

2) Create a component for our form

```
ng g c places-form
```

3) Create a component for our list of favorite places

```
ng g c places-list
```

4) Create a component for our map with our favorite places

```
ng g c places-map
```

5) Create a new service as follow:

```
ng g s places
```

Now, we are going to install all the packages needed, so we don't have to go back to our app.module file and deal with them later.

6) Install firebase

```
npm i --save firebase @angular/fire
```

7) Install Angular Google Maps (AGM)

```
npm i --save @agm/core
```

8) Go to your app.module, and add the following modules as follows

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*External Modules */
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AgmCoreModule } from '@agm/core';

/*App components */
import { AppComponent } from './app.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { PlacesFormComponent } from './places-form/places-form.component';
import { PlacesMapComponent } from './places-map/places-map.component';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PlacesListComponent,
    PlacesFormComponent,
    PlacesMapComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'GOOGLE MAPS API KEY'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

9)  [Generate a Google API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)  Also, you'll need to make sure you have  **Maps JavaScript API**  service enabled in the  [Google Service Library](https://console.cloud.google.com/apis/library?filter=category:maps)

10) Copy the API key, and paste it in the AgmCoreModule inside of the  **app.module.ts**

11) As you can see in the  **app.module.ts**  file, we have the following line:

```
AngularFireModule.initializeApp(environment.firebaseConfig),
```

This line is using the enviroment variable.

Go to the  **enviroment.ts file**, and make sure your code looks like the following:

```
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'XXXXXXXX',
    authDomain: 'XXXXXXXX',
    databaseURL: 'XXXXXXXX',
    projectId: 'XXXXXXXX',
    storageBucket: 'XXXXXXXX',
    messagingSenderId: 'XXXXXXXX',
    appId: 'XXXXXXXX',
    measurementId: 'XXXXXXXX'
  }
}
```

_**Note: Copy/paste the credentials we copied from the firebase console earlier in the tutorial.**_

12) Inside of your  **index.html**  file, add Semantic UI CDN to give some quick styling to our app

```
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
  integrity="sha256-9mbkOfVho3ZPXfM7W8sV2SndrGDuh7wuyLjtsWeTI1Q="
  crossorigin="anonymous"
/>
```

13) Add the fontawesome CDN inside the  **index.html**  file

Get your own CDN link  [here](https://fontawesome.com/start)

14) Create a new model file with the name  **place.model.ts**

15) Copy/paste the following code inside of the place model

```
export interface Place {
  name: string;
  lat: number;
  long: number;
  id: string;
  visited: false;
}
```

16) Go to your  **places-form.components.ts**  file. We are going to create our form as follows:

_**Note: I'm also injecting via dependency injection, my places service.**_

```
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlacesService } from '../places.service';

@Component({
 ....
})

export class PlacesFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(''),
    long: new FormControl(''),
    lat: new FormControl('')
  });
  constructor(private placesService: PlacesService) {}

  ngOnInit() {}

  onSubmit() {
    const place = this.form.value;
    this.placesService.addPlace({ ...place, visited: false });
    this.form.reset();
  }
}
```

17) Inside of your  **places-form.component.html**, copy/paste the code that contains the form.

```
 <div class="form-fav">
      <form class="ui form" [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="field">
             <input
             type="text"
             name="name"
             placeholder="Place Name"
             formControlName="name"
             />
       </div>
       <div class="field">
            <input
            type="text"
            name="latitude"
            placeholder="Latitude"
           formControlName="lat"
        />
      </div>
      <div class="field">
           <input
           type="text"
           name="Longitude"
           placeholder="Longitude"
           formControlName="long"
           />
      </div>
      <button class="ui inverted violet button" type="submit">
              <i class="fas fa-star"></i> Add to Favorites
      </button>
   </form>
</div>
```

18) Now, go to your  **places-form.component.scss**  file, and add the following styling.

```
.form {
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #222;
  padding: 8px;
  align-items: flex-start;
}
```

19) Time to work with our  **places-list.component.ts**  file.

**Note:** In this file, we are going to create an  _**Input()**_  that will take the array of places comming from our parent component. Also, notice I'm importing the places service, because we are going to call some actions inside of our service like the  **delete**  and  **edit**

```
import { Component, OnInit, Input } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit {
  @Input() places: Place[];
  constructor(private placesService: PlacesService) {}

  ngOnInit() {}

  onDelete(id: string) {
    this.placesService.deletePlace(id);
  }

  onUpdate(id: string, visited: boolean) {
    this.placesService.updatePlace(id, visited);
  }
}
```

20) In the  **places-list.component.html**  file, you are going create the list that displays your favorite places. The last column will be an actions column. This column will allow you to  **delete**  or  **edit**  your data.

```
<table class="ui celled table">
  <thead>
    <tr>
      <th><i class="fas fa-map-marker-alt"></i> Place Name</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let p of places">
      <td>{{ p.name }}</td>
      <td>{{ p.lat }}</td>
      <td>{{ p.long }}</td>
      <td class="actions">
        <div class="action remove" (click)="onDelete(p.id)">
          Remove<i class="fas fa-backspace"></i>
        </div>
        <div class="action" (click)="onUpdate(p.id, p.visited)">
          <ng-container *ngIf="p.visited; else notVisited">
            <span class="visited"
              >Visited<i class="fas fa-smile-wink"></i
            ></span>
          </ng-container>
          <ng-template #notVisited>
            <span class="not-visited"
              >Not Visited <i class="fas fa-sad-tear"></i
            ></span>
          </ng-template>
        </div>
      </td>
    </tr>
  </tbody>
</table>
```

21) Time to style our table :) Lets make it look at least a little decent. Inside of your  **places-list.component.scss**  file, add the following code.

```
.actions {
  display: flex;
  justify-content: space-around;
  .action {
    display: flex;
    align-items: center;
    cursor: pointer;

    i {
      margin: 2px;
    }
  }

  .remove {
    color: #ff3232;
  }

  .visited {
    color: rgb(32, 218, 141);
  }

  .not-visited {
    color: rgb(252, 214, 0);
  }
}
```

22) Time to add the favorites places to our map. Open the  **places-map.component.ts**  file, and add the following code.

**Note:**  As you can see, I'm creating an  _**Input()**_  that takes an array of places, which is the data that will populate our markers in the map.

```
import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../place.model';

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.scss']
})
export class PlacesMapComponent implements OnInit {
  @Input() places: Place[];
  
  //This will define the center of the map
  lat = 53.2734;
  long = -7.77832031;

  constructor() {}

  ngOnInit() {}
}
```

23) Let's add the agm map component to our  **places-map.component.html**  file.

**Note:**  I'm looping throught the array of places to add the markers to our map.

```
<div class="places">
  <div class="map">
    <agm-map [latitude]="lat" [longitude]="long" [zoom]="4">
      <agm-marker
        *ngFor="let p of places"
        [latitude]="p.lat"
        [longitude]="p.long"
      ></agm-marker>
    </agm-map>
  </div>
</div>
```

24) Don't forget to specify the height of your map, or it won't appear. Specify the height inside of the  **places-map.component.scss**  file

```
agm-map {
  height: 100vh;
}
```

25) Go to your  **app.component.ts**  file. We are going to create a variable that grabs the places stored in our Firestore databse.

Note: As you can see, I'm injecting the places services via dependency injection.

```
import { Component } from '@angular/core';
import { PlacesService } from './places.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'This Dot app';

  constructor(private placesService: PlacesService) {}
  places$ = this.placesService.places$;
}
```

26) In this step, we are going to add all of our components to  **app.component.html**  for them to be displayed in our application.

**Note:**  Notices I'm passing the places array to the inputs in the  **places-list**, and  **places-map**  components. Also notice I'm using the async pipe to handle the subcription and unsubcription of the observable.

```
<div class="places">
  <app-places-form></app-places-form>
  <div class="columns" *ngIf="places$ | async as places">
    <div class="places-list">
      <app-places-list [places]="places"></app-places-list>
    </div>
    <div class="map">
      <app-places-map [places]="places"></app-places-map>
    </div>
  </div>
</div>
```

27) Let's add the main styling to our app to give it the shell structure. Go your  **app.component.scss**  file, and add the following code:

```
.places {
  margin: 18px 18px;
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "places-list map";
  }

  .places-list {
    grid-area: places-list;
  }

  .map {
    grid-area: map;
  }
}
```

## CRUD with Firestore

28) Go to your  **places.service.ts**, and add the following code:

**Note:**  the  **places$**  field is an observable from firestore, and  **delete**,  **add**,  **update**  actions are promises.

```
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Place } from './place.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor(private firestore: AngularFirestore) {}

  firestorePlacesCollection = this.firestore.collection('places');

  //READ
  places$ = this.firestorePlacesCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(p => {
        const place = p.payload.doc;
        const id = place.id;
        return { id, ...place.data() } as Place;
      });
    })
  );

  //CREATE
  async addPlace(data: Place): Promise<void> {
    try {
      await this.firestorePlacesCollection.add(data);
    } catch (err) {
      console.log(err);
    }
  }

  //UPDATE
  async updatePlace(id: string, visited: boolean): Promise<void> {
    try {
      await this.firestorePlacesCollection
        .doc(id)
        .set({ visited: !visited }, { merge: true });
    } catch (err) {
      console.log(err);
    }
  }

  //DELETE
  async deletePlace(id: string): Promise<void> {
    try {
      await this.firestorePlacesCollection.doc(id).delete();
    } catch (err) {
      console.log(err);
    }
  }
}
```

## Time to run our app!

29) In your command line, run

```
ng serve --o
```

**Note:**  You might see an error message telling you that something went wrong with the Google Maps API. In this case, you most probably need to enable  [billing](https://console.cloud.google.com/billing)  for this project in your  **Google Cloud Account**. No worries, you won't be charged since there is a  [free tier](https://cloud.google.com/maps-platform/pricing/)  available.

30) Create some data, and you should see something like this:  ![Screen Shot 2019-12-10 at 1.43.27 AM](https://images.ctfassets.net/zojzzdop0fzx/7cyRtqcLFbyCEE4bFzPIPq/ca8584281ad1df494f399da5d5287369/Screen_Shot_2019-12-10_at_1.43.27_AM.png)

31) Go back to the Firebase console, and see the Firestore console with the new data created.

Don't forget to follow me on Twitter  [@devpato](https://twitter.com/devpato), and let me know what you think about this tutorial!

_This Dot Inc. is a consulting company which contains two branches : the media stream, and labs stream. This Dot Media is the portion responsible for keeping developers up to date with advancements in the web platform. This Dot Labs provides teams with web platform expertise, using methods such as mentoring and training._