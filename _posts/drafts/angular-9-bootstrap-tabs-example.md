In this tutorial, we will implement The  _Tabset_  UI component in Angular application using the ng-bootstrap package.

The ng-bootstrap package provides a number of UI components that are compatible with the latest versions of Angular. Bootstrap components are getting used for a long time by developers to add multi-device and screen support. So using ng-bootstrap components not only fasten the development process but also adds up responsive behavior to these components by default.

Let’s get started with Bootstrap Tabset component implementation. We will create a new Angular 8 application using the ng CLI tool the install ng-bootstrap package.

Here we go!

[![](https://www.freakyjolly.com/wp-content/uploads/2019/10/angular-bootstrap-tabset-demo.png)](https://www.freakyjolly.com/wp-content/uploads/2019/10/angular-bootstrap-tabset-demo.png)

## Create a new Angular Project

To create an Angular project we will use the Ng CLI tool. The current version is 8.3.6.

Run the following command in the terminal.


$  ng new  ng-bootstrap-tabset

Would you like to  add Angular routing?  Yes

Which stylesheet format would you like to  use?  CSS

## Install and Configure Bootstrap

To use bootstrap components in an Angular project, install the  `ng-bootstrap`  package by running below NPM command in terminal:


$  npm install  --save  @ng-bootstrap/ng-bootstrap

#### Update App Module for Bootstrap

After installation, open  **app.module.ts**  file to import  `NgbModule`  then add in the  `imports`  array as shown below:


// app.module.ts

import  {  BrowserModule  }  from  '@angular/platform-browser';

import  {  NgModule  }  from  '@angular/core';

import  {  AppRoutingModule  }  from  './app-routing.module';

import  {  AppComponent  }  from  './app.component';

import  {  NgbModule  }  from  '@ng-bootstrap/ng-bootstrap';

@NgModule({

declarations:  [

AppComponent

],

imports:  [

BrowserModule,

AppRoutingModule,

NgbModule

],

providers:  [],

bootstrap:  [AppComponent]

})

export  class  AppModule  {  }

#### Add Bootstrap Style to UI Components

The ng-bootstrap package only provides the functionally active components, but to add bootstrap style to them we need to install  `bootstrap`  package.

Run following NPM command to install bootstrap:


$  npm  i  bootstrap

Now open **styles.css**  file then add below import:



/* You can add global styles to this file, and also import other style files */

@import '~bootstrap/dist/css/bootstrap.css';

That’s it we are now ready with Bootstrap installation and configuration. Now we can use Bootstrap UI components in any component of our Angular application.

## Use Bootstrap  _Tabset_  Components

To use  **Bootsrap Tabset component**, we add  `ngb-tabset`  component as a tab wrapper and each tab is created by  `ngb-tab`  component as shown below:


<ngb-tabset>

<ngb-tab title="Tab One">

<ng-template ngbTabContent>

<p>Tab one content here</p>

</ng-template>

</ngb-tab>

<ngb-tab title="Tab Two">

<ng-template ngbTabContent>

<p>Tab two content here</p>

</ng-template>

</ngb-tab>

<ngb-tab title="Tab Three">

<ng-template ngbTabContent>

<p>Tab three content here</p>

</ng-template>

</ngb-tab>

</ngb-tabset>

These components are supported by  `input`  and  `output`  properties as discussed below.

## Methods and Properties:

## NgbTabset

The  `ngb-tabset`  is the main wrapper for Tabset tabs.

#### Input Properties

**activeId**: Id of the tab to be active/opened

**destroyOnHide**: Default is  `true`. The non-visible tabs will be removed from DOM.

**justify**: The horizontal arrangement of tabs can have any of these types: `"start" | "center" | "end" | "fill" | "justified"`

**orientation**: The orientation of tabs can be set to `"horizontal" | "vertical"`

**type**: Style of tabs, can be  `"tabs"`  and  `"pills"`.

#### Output Properties

**tabChange**: Tab change event is emitted before tab change.

#### Methods

**select**: Tab can be selected by providing its id.

Above discussed properties and methods can be used as shown in the following example template:


```html
<ngb-tabset

activeId="tab-2"

justify="justified"

type="pills"

(tabChange)="beforeChange($event)"

#myTabSet="ngbTabset"

>

<ngb-tab title="Tab One"  id="tab-1">

<ng-template ngbTabContent>

<p>Tab one content here</p>

</ng-template>

</ngb-tab>

<ngb-tab title="Tab Two"  id="tab-2">

<ng-template ngbTabContent>

<p>Tab two content here</p>

</ng-template>

</ngb-tab>

<ngb-tab title="Tab Three"  id="tab-3">

<ng-template ngbTabContent>

<p>Tab three content here</p>

</ng-template>

</ngb-tab>

<ngb-tab title="Tab Four"  id="tab-4">

<ng-template ngbTabContent>

<p>Tab four content here</p>

</ng-template>

</ngb-tab>

</ngb-tabset>

<p>

<button class="btn btn-outline-primary"  (click)="myTabSet.select('tab-2')">Selected tab with "tab-2" id</button>

</p>
```

The  `tabChange`  output property event can be handled in component by importing  `NgbTabChangeEvent`  to get tab properties as shown below:


```ts

// app.component.ts

import  {  Component  }  from  '@angular/core';

import  {  NgbTabChangeEvent  }  from  '@ng-bootstrap/ng-bootstrap';

@Component({

selector:  'app-root',

templateUrl:  './app.component.html',

styleUrls:  ['./app.component.css']

})

export  class  AppComponent  {

title  =  'ng-bootstrap-tabset';

beforeChange($event:  NgbTabChangeEvent)  {

// dont do anything if id matches

if  ($event.nextId  ===  'tab-4')  {

$event.preventDefault();

}

}

}
```

## NgbTab

The  `ngb-tab`  component is used to create a tab in Tabset.

#### Input Properties

**disabled**: Takes boolean value to enable or disable a specific tab.

**id**: Used to define an identifier for a tab.

**title**: String value for tab title.

```html
<ngb-tabset>

<ngb-tab

id="tab-1"

disabled="true"

title="Tab One">

<ng-template ngbTabContent>

<p>Foo content of customized labeled tab</p>

</ng-template>

</ngb-tab>

</ngb-tabset>
```

## HTML layout in Tab Title and Content

Custom HTML content can be added for Tab title and its content using  `ngbTabTitle`  and  `ngbTabContent`  component directive.

In each  `ngb-tab`, we can place  `ng-template`  element with  `ngbTabTitle`  and  `ngbTabContent`  to custom content as shown below:

```html
<ngb-tabset>

<ngb-tab id="tab-1">

<ng-template ngbTabTitle>

<b>Custom</b>  <i> Tab</i>  <u> One</u>

</ng-template>

<ng-template ngbTabContent>

<p>Foo content of customized labeled tab</p>

</ng-template>

</ngb-tab>

</ngb-tabset>
```