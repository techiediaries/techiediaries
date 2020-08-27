---
layout: bpost
title: "Angular 10 Auto-Complete Example"
image: "images/content/angular.png"
excerpt: "In this example, we'll learn how to build an Angular 10 auto complete example"
date: 2020-08-27
tags : [angular]
---

In this example, we'll learn how to build an Angular 10 auto complete example.

We'll need to have a few prerequisites for this tutorial such as Node.js and Angular CLI v10 installed on our local development machine.

Next, you'll need to create a project using the following command:


```bash
$ ng new Angular10AutoCompleteExample
```

The CLI will ask you a couple of questions — If  **Would you like to add Angular routing?**  Type  **y**  for Yes and  **Which stylesheet format would you like to use?**  Choose  **CSS**.


## Installing Angular-Ng-Autocomplete

Next, you'll need to navigate to your project's folder and install the `angular-ng-autocomplete` library:

```bash
$ cd Angular10AutoCompleteExample
$ npm install angular-ng-autocomplete
```

## Importing the `AutocompleteLibModule`

Next, open the src/app/app.module.ts file and import `AutocompleteLibModule` and add it in the `imports` array"

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```


That's it, you can now use `angular-ng-autocomplete` in your components.


## Adding Auto Complete Feature to our Angular 10 App

Open the `src/app/app.component.ts` file and update it as follows:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  keyword = 'name';
  public countries = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    }
  ];
    selectEvent(item) {
    // do something with selected item
  }


}
```

Next. open the `src/app/app.component.html` file and update it as follows:

```html
<div class="ng-autocomplete">
  <ng-autocomplete
    [data]="countries"
    [searchKeyword]="keyword"
    placeHolder="Enter the Country Name"
    (selected)='selectEvent($event)'
    (inputChanged)='onChangeSearch($event)'
    (inputFocused)='onFocused($event)'
    historyIdentifier="countries"
    [itemTemplate]="itemTemplate"
    [notFoundTemplate]="notFoundTemplate">
  </ng-autocomplete>

  <ng-template #itemTemplate let-item>
    <a [innerHTML]="item.name"></a>
  </ng-template>

  <ng-template #notFoundTemplate let-notFound>
    <div [innerHTML]="notFound"></div>
  </ng-template>
</div>  
```

Finally, we can some CSS code for styling the auto complete component. Open the `src/app/app.component.css` file and update it as follows:

```css
.ng-autocomplete {
  width:100%;
  max-width: 600px;
  display: table;
  margin: 0 auto;
}
```

Check the [docs](https://github.com/gmerabishvili/angular-ng-autocomplete) for more information.

## Conclusion

In this example, we've seen how to implement the auto complete feature in our Angular 10 app using `angular-ng-autocomplete`.
