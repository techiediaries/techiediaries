---
layout: post
title: "PHP Tutorial with AngularJS 1.6+"
image: "images/content/building-websites-php-angularjs.jpg"
excerpt: "In this tutorial you will learn, step by step, how to build websites with plain PHP 7 (next tutorials will be dedicated to advanced frameworks such as Symfony, Laravel 5 and CodeIgniter), MySQL database, Bootstrap 4 and AngularJS framework." 
tags : [angularjs , php]
---


![AngularJS 1.6 + PHP 7](/assets/images/6.jpg)


Throughout this **PHP tutorial** you will learn, step by step, how to build web applications and sites with **PHP 7**(next tutorials will be dedicated to advanced frameworks such as Symfony, Laravel 5 and CodeIgniter), MySQL database, Bootstrap 4 and AngularJS framework. 

You will get introduced to AngularJS, the  JavaScript framework created by Google, covering all the basics. You will learn how to build a simple website with PHP 7, MySQL and AngularJS 1.6+ from scratch, next you'll learn how to build a CRUD web application with PHP 7 API on the back-end and AngularJS on the front-end.  

* [Introduction to AngularJS](#angularjsintro)
* [Introduction to PHP 7 (or PHP 7 new features)](#php7intro)
* [Introduction to Ajax](#ajaxintro)
* [Tutorial and projects requirements](#requirements) 
* [The development tools for PHP 7 and AngularJS](#tools)
* [The first project: building a Single Page Application (SPA) portfolio website with PHP 7 and AngularJS 1.6+](#spaportfolio)
	* The project anatomy (files and folders)
	* Create index.php
	* Integrating Bootstrap 4 and jQuery
	* Integrating AngularJS 1.6 and AngularJS UI Router
	* Creating the AngularJS application module (portfolioApp)
	* Adding routing (states) and navigation using Angular UI Router
	* Creating the HTML templates or partials
	* Components in AngularJS 1.5+ (instead of directives)
	* Creating AngularJS 1.5+ components 
	* Linking states directly to components  
* The second project: building a CRUD web application with PHP 7 and AngularJS 1.6+
	* The project anatomy 
	* How to integrate Angular Material, Roboto Font and Custom CSS
	* How to build a CRUD API with PHP 7?    
	* How to get data with AngularJS?
	* How to post data with AngularJS?
	* How to create or insert data with AngularJS?
	* How to read or find data with AngularJS?
	* How to delete data with AngularJS?
	* How to update data with AngularJS?
* Conclusion

## <a name="php7intro">Introduction to PHP 7 (or which are the new features of PHP 7?)</a>

PHP is the most popular server side language for building websites and web  applications. PHP is a scripting language that gets interpreted by a web server such as Apache and can be embedded in HTML then rendered on the server. The newer version of PHP is **7.2** when writing this tutorial. So what's new  with PHP 7? Lets take a look at the top 5 features:

* Performance a.k.a speed.
* Better error handling.
* Type declarations for variables and functions.
* New operators such as Spaceship and Null Coalesce.

PHP has many pros and cons:

- PHP is known to be the easiest programming language 
- PHP has a confusing syntax for new developers
- PHP powers 80% of the websites on the Internet
- PHP is considered the most hated programming language by developers
- PHP powers some of the most popular websites in the world such as Facebook and Wikipedia etc.
- PHP has the most popular CMSs in the world such as WordPress, WooCommerce, Drupal and Magento etc.
- PHP is less safer than other server languages
- PHP is less scalable that other server langauges 

## <a name="angularjsintro">Introduction to AngularJS</a>

AngularJS is a JavaScript framework created by Google that allows you to build client side web applications following a structured approach. It allows you to use plain HTML for writing templates and extend it by writing components or directives that can be used as custom HTML tags.

AngularJS is a powerful framework that makes use of a variation of the MVC (**M**odel-**V**iew-**C**ontroller) architectural pattern. Actually it's an MV* framework which is short for Model-View-Whatever which means you can create any kind of linking between the Model and the View like the classical Controller link or a ModelView like MVVM pattern etc. The Model is the data (i.e data structures and variables or database), View is the user interface (i.e HTML templates).

AngularJS helps developers create the three components i.e the Model, the View or the Controller easily by offering clear and concise syntax (such as `.controller()` and `.component()`etc.) then takes care to orchestarte the interactions of these components transparently and without re-inventing the wheel by developers.       

AngularJS allows developers to use the plain old HTML to build the user interface or the view and extend HTML itself by writing cutsom tags, that can be used just like normal tags (like `<p>` or `<div>`), using directives. As a result of this AngularJS encourages code re-use and Don't Repeat Yourself (DRY) concepts  since you can write directives once and use them anywhere in the project or other projects (organized as modules). 

In AngularJS the Model is just plain old JavaScript objects and variables but with more features such as **two-way data bindings** or commonly known as **Reactive programming** which simply means that when the model is changed, th changes are automtically reflected on the related view and the same the other way. AngularJS provides special objects such as `$scope` and `$rootScope` to wire the model and the view so changes in one side get reflected on the other side.

AngularJS allows you to do more with less code so you can create a fully functional MVC web application with data bindings in fewer lines of code. 

AngularJS code is very maintainable and can be tested more easily thanks to strong features such as **Dependency Injection** (or DI) which allows you to create services then inject them anywhere you want to use them (i.e controller and other services).
      
## <a name="ajaxintro">Introduction to Ajax</a> 



AJAX stands for **A**synchronous **Ja**vaScript and **X**ML, and is a technology that enables a web page to use JavaScript for sending and receiving data from a web server without refresh. 

XML stands for e**X**tensible **M**arkup **L**anguage and is used for exchanging data over the Internet or between different applications. Asynchronous means non-blocking i.e when the Ajax call is sent, your web page continues working as normal without waiting for data or hanging and when data is received it gets displayed. So to recap Ajax is a mechanism for communications between web browsers and web servers by sending requests and getting responses asynchronously and without page refresh.  

In AngularJS, you can work with Ajax using the **$http** service.

 
## <a name="requirements">Tutorial and projects requirements</a> 	

This tutorial assumes you already have a PHP development environment setup and ready. If you don't! We have a set of tutorials dedicated to this subject so be sure to follow them first so you can prepare your machine for PHP and AngularJS development.

For working with this tutorial's project you need these things installed on your development machine.


 * A web server: you can install either Apache or Nginx (You can also use the built-in PHP 7 server for development).
 * PHP 7: you need to have PHP 7 installed.
 * MySQL: you need to have MySQL database management system installed to be able to create and work with databases.

## <a name="tools">The development tools for PHP 7 and AngularJS</a>

## <a name="spaportfolio">The first project: building a Single Page Application (SPA) portfolio website with PHP 7 and AngularJS 1.6+</a>
### The project anatomy (files and folders) 

Our first project has a simple directory structure 

```bash
.
├── app
│   ├── app.js
│   ├── assets
│   │   ├── js
│   │   └── styles
│   │       └── style.css
│   └── views
│       ├── contact.html
│       └── portfolio.html
└── index.php
```

![PHP 7 + AngularJS 1.6](/images/content/php7-angularjs16-project-structure.png)

* The *app* folder contains all client side app source files.
* The *app/assets* file contains the styles and external JavaScript (if any) files.
* The *app/views* contains the HTML views or partials of the AngularJS app.
* The *app.js* is the main file of the AngularJS app.
* The index.php is the index file of our project. 

### Create index.php

Create an `index.php` file then copy and paste the following content

```php
<!doctype html>
<html>

<head><title> AngularJS's Portfolio </title></head>

<body></body>
</html>
```

### Integrating Bootstrap 4 and jQuery

Create a `style.css` file in `app/assets/styles` then copy and paste the following styles:

```css
        /*
		* Globals
		*/

        /* Links */

        a,
        a:focus,
        a:hover {
            color: #fff;
        }

        /* Custom default button */

        .btn-secondary,
        .btn-secondary:hover,
        .btn-secondary:focus {
            color: #333;
            text-shadow: none;
            /* Prevent inheritance from `body` */
            background-color: #fff;
            border: .05rem solid #fff;
        }


        /*
		* Base structure
		*/

        html,
        body {
            height: 100%;
            background-color: #333;
        }

        body {
            color: #fff;
            text-align: center;
            text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
        }

        /* Extra markup and styles for table-esque vertical and horizontal centering */

        .site-wrapper {
            display: table;
            width: 100%;
            height: 100%;
            /* For at least Firefox */
            min-height: 100%;
            -webkit-box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
            box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
        }

        .site-wrapper-inner {
            display: table-cell;
            vertical-align: top;
        }

        .cover-container {
            margin-right: auto;
            margin-left: auto;
        }

        /* Padding for spacing */

        .inner {
            padding: 2rem;
        }


        /*
		* Header
		*/

        .masthead {
            margin-bottom: 2rem;
        }

        .masthead-brand {
            margin-bottom: 0;
        }

        .nav-masthead .nav-link {
            padding: .25rem 0;
            font-weight: bold;
            color: rgba(255, 255, 255, .5);
            background-color: transparent;
            border-bottom: .25rem solid transparent;
        }

        .nav-masthead .nav-link:hover,
        .nav-masthead .nav-link:focus {
            border-bottom-color: rgba(255, 255, 255, .25);
        }

        .nav-masthead .nav-link+.nav-link {
            margin-left: 1rem;
        }

        .nav-masthead .active {
            color: #fff;
            border-bottom-color: #fff;
        }

        @media (min-width: 48em) {
            .masthead-brand {
                float: left;
            }
            .nav-masthead {
                float: right;
            }
        }


        /*
		* Cover
		*/

        .cover {
            padding: 0 1.5rem;
        }

        .cover .btn-lg {
            padding: .75rem 1.25rem;
            font-weight: bold;
        }


        /*
		* Footer
		*/

        .mastfoot {
            color: rgba(255, 255, 255, .5);
        }


        /*
		* Affix and center
		*/

        @media (min-width: 40em) {
            /* Pull out the header and footer */
            .masthead {
                position: fixed;
                top: 0;
            }
            .mastfoot {
                position: fixed;
                bottom: 0;
            }
            /* Start the vertical centering */
            .site-wrapper-inner {
                vertical-align: middle;
            }
            /* Handle the widths */
            .masthead,
            .mastfoot,
            .cover-container {
                width: 100%;
                /* Must be percentage or pixels for horizontal alignment */
            }
        }

        @media (min-width: 62em) {
            .masthead,
            .mastfoot,
            .cover-container {
                width: 42rem;
            }
        }
```

Then update `index.php` to include the **Bootstrap 4** library from **MaxCDN** and our `style.css` file. You can also download the library and put it in the `app/assets/styles` folder. Please note that Bootstrap needs jQuery included too.

```php
<!doctype html>
<html>

<head>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ"
        crossorigin="anonymous">
    <link rel="stylesheet" href="app/assets/styles/style.css"/>    
</head>

<body>

    <div class="site-wrapper">

        <div class="site-wrapper-inner">

            <div class="cover-container">

                <div class="masthead clearfix">
                    <div class="inner">
                        <h3 class="masthead-brand">AngularJS's Portfolio</h3>
                        <nav class="nav nav-masthead">

						<!-- NAVIGATION_PLACEHOLDER -->	
                        </nav>
                    </div>
                </div>

				<div class="inner cover">

					<!-- UI_VIEW_PLACEHOLDER -->	
                    
                   
                </div>

                <div class="mastfoot">
                    <div class="inner">
                        <p>Cover template for
                            <a href="https://getbootstrap.com">Bootstrap</a>, by
                            <a href="https://twitter.com/mdo">@mdo</a>.</p>
                    </div>
                </div>

            </div>

        </div>

    </div>

    <ul>





    </ul>

    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb"
        crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn"
        crossorigin="anonymous"></script>

</body>

</html>
```
### Integrating AngularJS 1.6 and AngularJS UI Router 

Now we need to include the AngularJS 1.6 library and the UI Router to add routing to our SPA (Single Page Application) portfolio website.

So go ahead and update `index.php` to include these changes:

* Include the AngularJS and Angular UI Router libraries from Google CDN before `</body>`. You can also download and put them inside `app/assets/js` folder. Don't also forget to include `app.js` which will host the AngularJS app.

```html
 
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js"></script>
    <script src="https://unpkg.com/@uirouter/angularjs/release/angular-ui-router.js"></script>
	<script src="app/app.js"></script>
 
```

* Add `ng-app` with the name of our main AngularJS module that we will create later in `app/app.js`. This is required for bootstrapping the AngularJS app.  

```html
<body ng-app="portfolioApp">
```

### Creating the AngularJS application module (portfolioApp)

Now it's time to create the actual Angular app. Inside `app` folder create an `app.js` file then copy and paste the following code:

```js

var portfolioApp = angular.module('portfolioApp', ['ui.router']);
```

### Adding routing (states) and navigation using Angular UI Router

Now let's configure our app to specify the different app states for the UI Router.

```js
portfolioApp.config(function ($stateProvider,$urlRouterProvider) {

    var mainState = {
        name: 'main',
        url: '/',
        template: '<h1>Welcome to my portfolio website!</h1><p>In this website you will find information about me and my projects</p>'
    }

    var portfolioState = {
        name: 'portfolio',
        url: '/portfolio',
        templateUrl: 'app/views/portfolio.html'
    }
    var contactState = {
        name: 'contact',
        url: '/contact',
        templateUrl: 'app/views/contact.html'
    }


    var aboutState = {
        name: 'about',
        url: '/about',
        template: "<h1>About Me</h1><p>I'm a web developer and entrepreneur with 3+ years of experience</p>"
    }

    $stateProvider.state(mainState);
    $stateProvider.state(portfolioState);
    $stateProvider.state(contactState);
    $stateProvider.state(aboutState);
    $urlRouterProvider.otherwise('/');

});


``` 


Below `<!-- NAVIGATION_PLACEHOLDER -->` paste the following links to add navigation:

```html

<a class="nav-link" ui-sref="main" ui-sref-active="active">Main</a>
<a class="nav-link" ui-sref="portfolio" ui-sref-active="active">Portfolio</a>
<a class="nav-link" ui-sref="about" ui-sref-active="active">About</a>
<a class="nav-link" ui-sref="contact" ui-sref-active="active">Contact</a>

```

`ui-sref` custom attribute is provided by the UI Router it's like `href` attribute but instead of URLs it links to states.  

Below `<!-- UI_VIEW_PLACEHOLDER -->` paste the following UI Router directive: 

```html
<ui-view></ui-view>
```
Inside this directive the UI Router renders the HTML template linked to the current route via router's state. 

You can also use this alternative syntax:

```html
<div ui-view></div>
```
### Creating the HTML templates or partials

Next create `portfolio.html` and `contact.html` in `app/views/` 

```html
<h1>
    Contact
</h1>
```

```html
<h1>
    My Portfolio
</h1>
```

 We have created only two templates in `views` since we have used an inline template for the other routes. 

 

You should now have a simple SPA with basic routing.

You can use the PHP built-in server to serve the website locally

```bash

php -S 127.0.0.1:8000

``` 

![PHP 7 AngularJS basic navigation](/images/content/angularjs-php7-basic-nav.gif)

Now let's see more advanced AngularJS concepts i.e. components, controllers and services.

### Components in AngularJS 1.5+ (instead of directives)


In AngularJS 1.5+ you can build apps using a component based architecture. Components are syntax sugar over the old AngularJS directives, with common defaults and many improvements, which allow you to create your own custom HTML elements. 

The Component model encourages the separation of concerns, the encapsulation and the maximum reusability principles, you can build your app as a set of components with a root component and child components. 

In this section we'll see:

* The AngularJS component introduced in Angular 1.5.
* How to directly link to AngularJS 1.5+ components in Angular UI-Router?
* How to access resolved state data in components?
* How to communicate between routed (parent and child) components?

An AngularJS 1.5 component is a reusable piece of code (JavaScript and HTML), which encapsulates behavior and view. 

* A component is self-dependent,
* A component has its own isolated scope, 
* A component does not access the parent `$scope`,
* A component has many life-cycle events.

A component communicates with other components via inputs (using explicit data bindings) and outputs (using explicit events bindings).

These are the steps, to follow, for building a component based application with AngulatJS 1.6+ (or 1.5+)

- First, create a `.component()` which has a template and a controller (which you usually use in the UI-Router state definition).

- Create state definitions for routes by linking to the corresponding components. 

- Create templates for components and link to them via component's `template` or `templateUrl` attributes.

- Declare variables and functions on the component `controller` (using `this`) 

- Reference the component's controller, from the component's template, using `$ctrl`

- Use a one-way data binding (i.e., <.) to pass inputs to components, and events bindings to get output.

The AngularJS UI-Router allows states/views to be defined as combinations of url, template/templateUrl and controller or as combinations of url and component .

The template can be defined either as raw template (via `template` attribute) or a path to a template (using `templateUrl` attribute)

### Creating AngularJS 1.5+ components 

Here is an example of the old way of defining states in AngularJS 

```js
.state('portfolio', {
  url: '/portfolio',
  templateUrl: 'views/portfolio.html',
  controller: 'PortfolioController',
  resolve: {
    projects: function(PortfolioService) {
      return PortfolioService.findAll();
    }
  }
});
```

This is still valid but since we are using the modern component model approach we'll use components instead.

```js
.state('portfolio', {
  url: '/portfolio',
  component: 'portfolio',
  resolve: {
    projects: function(PortfolioService) {
      return PortfolioService.findAll();
    }
  }
});
```

The template and the controller are specified in the component's definition.

### Creating AngularJS 1.5+ components 

From the previous structure of our portfolio app we can see that we can create 4 components.

* The *portfolio* component linked to *portfolio* state
* The *profile* component linked to *about* state
* The *contact* component linked to *contact* state
* The *main* component linked to *main* state

For now all components will use static, data hard-coded directly on the app. Later will change our code to get dynamic data from a PHP server.  

Here is an example of our *portfolio* component

```js


    .component('portfolio', {
        bindings: {

        },

        controller: function (PROJECTS) {

            //define component's behavior here by linking methods and variables to this.
            this.projects = PROJECTS;

            console.log(this.projects);
        },
        template: `
        <h1>Portfolio</h1>
        <div ng-repeat="project in $ctrl.projects"> 
            <h2 >
                {{project.name}}
            </h2>
            <p>
                {{project.description}}
            </p>
        </div>

    `
    });

```

also don't forget to declare a constant for holding projects.

```js

portfolioApp.constant('PROJECTS',[

   {name:"Project 1" , description:"Project 1 description"},
   {name:"Project 2" , description:"Project 2 description"},
   
]);

```
You can access the controller in the template by using `$ctrl` without using the `controllerAs` property.

The one-way binding (projects) is bound to `$ctrl`. 

You can use ES6 multi-line strings to define multi-line templates. 

You can use your component like any other HTML element:


```html
<portfolio projects="$parent.projects"></portfolio>
```

Let's create the *profile* component

```js


.component('profile', {
  bindings: {
    
  },
  
  controller: function() {
  },
  template: `
    <h1>Profile</h1>
    I'm a web developer and entrepreneur with 3+ years of experience.
  `
});

```

Let's create the *contact* component

```js


.component('contact', {
  bindings: {
    
  },
  
  controller: function() {
	  this.contactMe = function(){
		  alert("Thanks!");
	  }
  },
  template: `
    <h1>Contact</h1>
	<form ng-submit="$ctrl.contactMe()" >
	<div class="form-group">
		<label for="yourName">Your Name</label>
		<input type="text" class="form-control" id="yourName"  placeholder="Enter name">

		<label for="yourMessage">Your Message</label>
		<textarea style="height:100px;"  class="form-control" id="yourMessage"  placeholder="Enter message"></textarea>
		
		<label for="emailAddr">Your Email address</label>
		<input type="email" class="form-control" id="emailAddr" aria-describedby="emailHelp" placeholder="Enter email">
		<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
	</div>
	
	<button type="submit" class="btn btn-primary">Submit</button>
	</form>
  `
});

```

Let's create the *main* component

```js


.component('main', {
  bindings: {
    
  },
  
  controller: function() {
  },
  template: `
	<h1>Welcome to my portfolio website!</h1>
	In this website you will find information about me and my projects
  `
});

```

For now since the app is not complex we can declare components inside `app.js`
without any problems. Later we'll see how to create a JavaScript file for each component.

### Linking states directly to components  

We can use any components declaratively by specifying its name like any other HTML tag but in our case since all components are top level we can link them directly to routes.

So go ahead and update your app's states in `app.js` to reflect the new changes

```js
    var mainState = {
        name: 'main',
        url: '/',
        component : 'main'
    }

    var portfolioState = {
        name: 'portfolio',
        url: '/portfolio',
        component : 'portfolio'
    }
    var contactState = {
        name: 'contact',
        url: '/contact',
        component : 'contact'
    }


    var aboutState = {
        name: 'about',
        url: '/about',
        component : 'profile'
    }

```

![PHP 7 AngularJS basic navigation](/images/content/angularjs-php7-basic-nav2.gif)

##Conclusion

In this PHP tutorial we have created a modern AngularJS (1.5+) app with a PHP 7 backend.

We have seen concepts like components, controllers, templates and services. We have also seen how to use the Angular UI-Router to create different routes for our SPA portfolio website.
