Our leading topic is how to get current url in angular component. i will show you angular get current route url using router. we will get current url using angular router. you can easily get current url (route path) in angular 6, angular 7, angular 8 and angular 9.

we will use angular Router library to getting current url in component file. we can easily get current route path with Router.

We might be some time need to get current path or current router url in angular application. so if you need now then i will help you how you can get current url in angular. so you can see basic solution bellow:

You can get current url like as bellow, i also written full example with output so, you can understand:

this.router.url;

window.location.href;

Now i will give you full example. you can write code on your component file as like bellow:

**Component File**

import  {  Component,  OnInit  }  from  '@angular/core';

import  {  Router  }  from  '@angular/router';

@Component({

 selector:  'app-posts',

 templateUrl:  './posts.component.html',

 styleUrls:  ['./posts.component.css']

})

export  class  PostsComponent  implements  OnInit  {

 constructor(private router:  Router)  {  }

 ngOnInit()  {

 console.log(this.router.url);

 console.log( window.location.href);

  }

}

You can see output also.

**Output:**

Read Also:  [Angular 8 Routing and Nested Routing Tutorial With Example](https://www.itsolutionstuff.com/post/angular-8-routing-and-nested-routing-tutorial-with-exampleexample.html)

/posts

http://localhost:4200/posts

I hope it can help you...
