# How to Set Style Dynamically in Angular 8?
  

If you want to set style dynamically in angular 8 then i will help you to apply style dynamically in angular component. i will give three example of set inline style css dynamically in angular js.

we will use ngStyle for set dynamically style in angular 8. we can use ngStyle attribute in angular templates.

I will give you three example of angular 8 set style width dynamically example. we will use simple way and also i will give you example using component and change dynamically style css.

![](https://www.itsolutionstuff.com/upload/angular-8-set-style-dynamic.png)

**Example 1:**

In first example, we will use ngStyle and write all inline css on that attribute, it is a very simple example:

**app.component.html**

<h1 [ngStyle]="{'color':'red', 'font-weight':'bold'}">

 This is ItSolutionStuff.com Example

</h1>

**Example 2:**

In second example, we will write css on component file and we will use that css variable in ngStyle directive in html file:

**app.component.ts**

import  {  Component,HostListener,  Inject  }  from  '@angular/core';

@Component({

 selector:  'app-root',

 templateUrl:  './app.component.html',

 styleUrls:  ['./app.component.css']

})

export  class  AppComponent  {

 headingCss =  {

  'color':'red',  

  'font-weight':'bold'

  };

}

**app.component.html**

<h1 [ngStyle]="headingCss">

 This is ItSolutionStuff.com Example

</h1>

**Example 3:**

In third example, we will create one array with each key has different css value in component and we will use it in html template file.

**app.component.ts**

import  {  Component,HostListener,  Inject  }  from  '@angular/core';

@Component({

 selector:  'app-root',

 templateUrl:  './app.component.html',

 styleUrls:  ['./app.component.css']

})

export  class  AppComponent  {

 categories =  [

  {

  'name':'Laravel',

  'color':  'red',

  },

  {

  'name':'Codenigter',

  'color':  'orange',

  },

  {

  'name':'Angular',

  'color':  'green',

  }

  ];

}

**app.component.html**

Read Also:  [How to get Current Date and Time in AngularJS?](https://www.itsolutionstuff.com/post/how-to-get-current-date-and-time-in-angularjsexample.html)

<ul>

  <li [ngStyle]="{'color':category.color}" *ngFor="let category of categories">

 {{ category.name }}

  </li>

</ul>

I hope it can help you...