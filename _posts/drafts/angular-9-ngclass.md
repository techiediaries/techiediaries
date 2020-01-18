NgClass - How to Add Dynamic Class in Angular 8?

In this Angular 8 NgClass Example, i will show you how to add dynamically add class in angular 8 using ng class. we will apply dynamic CSS classes to the HTML element using the NgClass directive in angular 8. you can learn angular 8 add class dynamically using bellow examples.

There are several way you can add dynamic class in angular 8. there is a best way to implement using NgClass in angular 8. i will give several way to use dynamically classes in angular 8.

If you want to add dynamically css then you can follow this example:  [How to add dynamic css in Angular 8?](https://www.itsolutionstuff.com/post/how-to-set-style-dynamically-in-angular-8example.html).

![](https://www.itsolutionstuff.com/upload/angular-8-ng-class.png)

Now you can see bellow example to adding dynamic class in angular 8.

**Example 1: Simple NgClass**

You can see bellow example app.component.ts and app.component.html file code:

**app.component.ts**

import  {  Component  }  from  '@angular/core';

@Component({

 selector:  'app-root',

 templateUrl:  './app.component.html',

 styleUrls:  ['./app.component.css']

})

export  class  AppComponent  {

 isFavorite:  boolean  =  true;

}

**app.component.html**

<button  

 [ngClass]="{

 'btn-success': isFavorite,

 'btn-primary': !isFavorite

 }">

 My Button

</button>

Now you can see output, it will add "btn-success" class because, itFavorite variable is true.

**Example 2: Simple class**

You can see bellow example app.component.ts and app.component.html file code:

**app.component.ts**

import  {  Component  }  from  '@angular/core';

@Component({

 selector:  'app-root',

 templateUrl:  './app.component.html',

 styleUrls:  ['./app.component.css']

})

export  class  AppComponent  {

 isFavorite:  boolean  =  true;

}

**app.component.html**

<button  

 [class.active] =  "isFavorite"

  >

 My Button

</button>

Now you can see output, it will add "active" class because, itFavorite variable is true.

**Example 3: NgClass with ternary**

You can see bellow example app.component.ts and app.component.html file code:

**app.component.ts**

import  {  Component  }  from  '@angular/core';

@Component({

 selector:  'app-root',

 templateUrl:  './app.component.html',

 styleUrls:  ['./app.component.css']

})

export  class  AppComponent  {

 isFavorite:  boolean  =  true;

}

**app.component.html**

<button  

 [ngClass]="[ isFavorite ? 'btn-success' : 'btn-danger']"

  >

 My Button

</button>

Now you can see output, it will add "btn-success" class because, itFavorite variable is true.

**Example 4: NgClass with Array**

You can see bellow example app.component.ts and app.component.html file code:

**app.component.ts**

import  {  Component  }  from  '@angular/core';

@Component({

 selector:  'app-root',

 templateUrl:  './app.component.html',

 styleUrls:  ['./app.component.css']

})

export  class  AppComponent  {

 myProducts =  [

  {

 id:  1,

 title:  'Gold',

 status:  'active'

  },

  {

 id:  2,

 title:  'Silver',

 status:  'pending'

  },

  {

 id:  3,

 title:  'Bronze',

 status:  'expired'

  },

  ]

}

**app.component.html**

Read Also:  [Reactive Form with Validation in Angular 8](https://www.itsolutionstuff.com/post/reactive-form-with-validation-in-angular-8example.html)

<div *ngFor="let product of myProducts">

  <p [ngClass]="{

 'text-success':product.status === 'active',

 'text-primary':product.status === 'pending',

 'text-danger':product.status === 'expired'

 }">{{ product.title }}

  </p>

</div>

Now you can see output...

Now you can use it as you want.

I hope it can help you....