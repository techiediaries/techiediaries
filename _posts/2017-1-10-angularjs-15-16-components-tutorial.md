---
layout: post
title: "Angularjs 1.5/1.6 components tutorial"
image: "images/content/angularjs-15-16-components-tutorial/titleimage.png"
excerpt: "Angularjs 1.5/1.6 components tutorial "
categories : angular1x
---

{% include image.html
   img="images/content/angularjs-15-16-components-tutorial/bigimage.png"
       title="Angularjs 1.5/1.6 components tutorial"
%}



Starting with version 1.5 Angular team has introduced the component method in Angular 1.x so now you can build component based apps without using Angular 2 or React not just that ,starting to use components in your apps will make migrations easier and painless when you decide to migrate to Angular 2 or when your company decides  ,because switching to the next version of Angular is a matter of time nothing else .

Web applications frameworks are starting to adopt a new component based architecture instead of classical and long time used architectures such as MVC or MVVM .The first well known library was React from FaceBook then Google decided to do the same so they have introduced a completely rewritten from scratch version of Angular framework which is Angular 2 that introduced the new concept of components and a huge performance improvements .

But a lot of developers are still using Angular 1 for different reasons ,the most important reason are existing applications that were written in Angular 1 which need to be still developed or at least maintained .Also teams and companies can’t just change a framework overnight because in reality Angular 2 is a whole new framework not just an update of Angular 1 .

Because of all these reasons the Angular team is still working on improving and updating Angular 1 .In the same time making migrations to Angular 2 as easy as possible by introducing Angular 2 concepts in Angular 1 and the most important concept are components .

Angular 1.5 introduced the component method which is an improved wrapping of a directive  but much cleaner and easier to use .So the first thing you need to know is that .component() method in Angular 1.x is just syntactic sugar of the .directive() method that ,in my opinion, every developer hates ,including me .But believe now you’ll love its twin method .component() because it will introduce you to a whole new world and it will make writing directives or components much cleaner and easier .

In component based architecture you build your app as a set of components with a root component being the parent of all other child components .A component is by definition a reusable and isolated piece of code which has inputs and outputs   but in practice you can use components and they are actually used by developers not just for repetitive and reusable of code but even for code that can be used once so you can use them for reusable code or just to organize your code .In fact there are two types of components 

Clever components ,which make use of other components .

Dump components which can used anywhere they fit .They have input and output and they are isolated so they allow maximum reusability by a sort plug and play mechanism .
Writing a component in Angular 1.x is basically writing directives with some defaults .For example :

A component have an isolated scope by default .
A component uses a controller instead of a link function .
A component uses controllerAs syntax automatically .

Now this is how you write your first component

	app.component('myComponent', {
	  bindings: {
	    data: '='
	  },
	  templateUrl: 'my-component.html',
	  controller: function() {
	  	
	  }
	});

So we have used .component() method with the first parameter as the name of your component ,the second parameter is an object with a set of options :

The bindings provides all component bindings
The templateUrl specify the component’s template you can also use template for inline html code for simple components .

The controller specify the component's controller function .

So as you can see it’s much cleaner and straightforward way of building components (directives) .bindToController is the default behavior and you don’t need to specify the controllerAs option because it is automatically set to $ctrl .

For more information about the new .component() syntaxic sugar method read the official docs 

# Conclusion

There are other features in Angular 1.5 which makes adopting component based architecture much easier in the future for Angular framework developers such as $onInit lifecycle hook ,one way data bindings  and require mechanism which will cover in future posts .

 




  




