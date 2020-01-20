Angular Font Awesome - How to install font awesome in Angular 8?
 By Hardik Savani |  December 5, 2019 |  Category : Angular


Hi Dev,

Today, i wanted to show you how to use font awesome icons in angular 8. i want to give you simple example of angular 8 install font awesome icons using npm command. we will install font-awesome library for font awesome icons.

Icons is a basic requirement of each project. icons indicate more, you don't need to write label for it. icons also make beautiful layout of our application. If you think to use icons in your application then you will always prefer to use font awesome icons. font-awesome provide lots of icons and you can use it very easily.

So, i think example, i will learn how to install font awesome icons in angular 8 application step by step. it's very simple but, for new developer that can understand how it you can do it.

Let's see bellow steps:



Step 1: Create New App

You can easily create your angular app using bellow command:

ng new my-new-app

Step 2: Install font-awesome

In this step, you need to just install font-awesome on your angular 8 and import css file to style.css file. this is only for css importing. so you can run command bellow:

npm install font-awesome --save
Read Also: How to Set Style Dynamically in Angular 8?
Step 3: Import CSS

After successfully, installed font-awesome, we need to import css files on angular.json file. so let's add following lines on it.

angular.json

"$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "appFont": {
      ....
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "node_modules/font-awesome/css/font-awesome.css",
              "src/styles.css"
            ],
      ......
OR, you can also give path like as this way, if above is not working:

"$schema": "./node_modules/@angular/cli/lib/config/schema.json",

  "version": 1,

  "newProjectRoot": "projects",

  "projects": {

    "appFont": {

      ....

            "assets": [

              "src/favicon.ico",

              "src/assets"

            ],

            "styles": [

              "../node_modules/font-awesome/css/font-awesome.css",

              "src/styles.css"

            ],

      ......

Step 4: Use Font Awesome Icons

Now we are ready to use font awesome classes in our html file. so let's add following code on your app.component.html file.

src/app/app.component.html

Read Also: How to Create Custom Validators in Angular 8?
<h1>Angular Font Awesome - How to install font awesome in Angular 8? - ItSolutionStuff.com</h1>
   
<i class="fa fa-user fa-5x"></i>
<i class="fa fa-dashboard fa-5x"></i>
<i class="fa fa-money fa-5x"></i>
<i class="fa fa-home fa-5x"></i>
<i class="fa fa-th fa-5x"></i>
You can run application.

You will see layout as like bellow:



You can also use icons from here: Font Awesome Icons List.

I hope it can help you...