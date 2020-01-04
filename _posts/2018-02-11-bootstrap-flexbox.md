---
layout: post
title: "Bootstrap Tutorial: Bootstrap 4 Grid/Flexbox Explained"
image: "images/content/bootstrap.jpg"
excerpt: "This is tutorial is an introduction of the Bootstrap Grid system with taking Flexbox into consideration as Bootstrap 4 is now using Flexbox as the default display system for the grid layout that brings many new and powerful features to how you can build your website layouts using the Bootstrap 4 grid." 
tags : [bootstrap] 
---

In this **Bootstrap tutorial**, we'll learn about the Grid layout based on Flexbox in Bootstrap 4.

This tutorial is an introduction of the Bootstrap Grid system with taking Flexbox into consideration as Bootstrap 4 is now using Flexbox as the default display system for the grid layout that brings many new and powerful features to how you can build your website layouts using the Bootstrap 4 grid.

Flexbox is a CSS 3 display system that aims to make it easy and straightforward to create layouts for dynamic or unknown screen sizes by allowing the container to have more control over the size of elements and then adapt to different view ports. 

Without further introductions let's create and decipher a simple page layout using Bootstrap 4 grid system.

First you need to create an HTML page and link the Bootstrap 4 assets. You can simply use this template from the official Bootstrap 4 [docs](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>BS 4 Flexbox Examples</title>
  </head>
  <body>
    Add Content Here

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
```

In order to create a grid you'll have to use some predefined BS classes (`.container`, `.row`, `col-*-*`)

The grid should have a container, rows and columns.

The container is simply a `<div>` with the `.container` or `.container-fluid` classes. Why do you need a container and what is the difference between those two classes?

The container simply provides a width or a maximal width for all the other elements of the grid. For the difference   `.container` allows you to create fixed-width container and `.container-fluid` allows you to create a full *100%* container.

Rows provide home for columns. The number of rows can theoretically be unlimited.

Columns are what make the cells for the grid system. Each row can only take up to 12 columns (each column spans *1/12* of the available width). Practically a column spans more than one unit but there is one important rule **ALL COLUMNS SHOULD ADD UP TO 12**

![](https://screenshotscdn.firefoxusercontent.com/images/999e8047-b1e5-409f-b97e-2c6f3c5a68f7.png)      

 
 To create a column you simply use a `<div>` with the the class(es) `col-*-*`

The first star for the screen breakpoint (`xs, sm, md, lg, xl`) and the second star for column size (*1 .. 12*).

```html
  <div class="row">
    <div class="col-sm-1 first-column">
      <p>.col-sm-1</p>
    </div>
    ...
    <div class="col-sm-1 second-column">
      <p>.col-sm-1</p>
    </div>   
  </div>
```

See this [code pen](https://codepen.io/techiediaries/pen/BYJOrL)

Now let's create a second row with two columns

```html
  <div class="row">
    <div class="col-sm-6 first-column">
      <p>.col-sm-6</p>
    </div>
    <div class="col-sm-6 second-column">
      <p>.col-sm-6</p>
    </div>   
  </div>
```
 
Note that `.col-sm-6` + `.col-sm-6` === `.col-sm-12`

Also note that you don't need to explicitly add upper breakpoint classes i.e `col-md-6`  to  `col-xl-6` because  `.col-sm-6` means the size of the column should be 6 units from the small breakpoint and up 

![](https://screenshotscdn.firefoxusercontent.com/images/f49f364d-d656-4eb7-97a6-fba568167a08.png)

Next let's add a third row with three columns 

![](https://screenshotscdn.firefoxusercontent.com/images/f4dc6a62-bde7-4f5f-8cc4-f4ce79f203c8.png)

The first column spans two units, the second spans three units and the third spans the remaining 7 units. All colmuns sized add up to 12

`.col-sm-2` + `.col-sm-3` + `.col-sm-7` === `.col-sm-12`

If you have previously used Bootstrap before version 4 you should have be familiar with all these concepts so what the new features Bootstrap 4 bring?

If you need to create a layout with automatic width columns you simply need to use `.col-*` or just `.col` without specifying the size and Bootstrap will take care of equally dividing the available width among those columns 

```html
  <div class="row">
    <div class="col first-column"></div>
    <div class="col second-column"></div>
    <div class="col first-column"></div>
  </div>
``` 
 
![](https://screenshotscdn.firefoxusercontent.com/images/8f78ec06-4814-4dfc-8bfc-2c373fb5a3f0.png)


Now if you add a bunch of text to each column in order to chane their heights you are going to get something like 

![](https://screenshotscdn.firefoxusercontent.com/images/811687b8-1d1b-4a6e-94d1-a678a98c4278.png)

As can be seen, unlike Bootstrap 3 all columns have the same height disregarding their contents which gives a better sense of a grid system. 

## Bootstrap 4 Flex Utilities
     
Bootstrap 4 by default uses Flexbox but it also provides a set of class utilities that allow you to work with Flexbox without resorting to custom CSS.

If you want to make a div element a flex container you can simply add the `.d-flex` class to a `<div>`

```html
<div class="d-flex">
This is now a flex container
</div>
```

Or you can instead use `d-inline-flex` to create a inline flex container.

These two classes have also responsive versions i.e you can use `d-d-*-flex` and `d-*-inline-flex` where the start can be one of these breakpoints values `xs, sm, md, lg and xl`.

One important aspect of Flexbox is the ability to easily set the direction of items inside a flex container.

By default the direction is horizontal from left to right but can be set to be horizontal but from right to left with `.flex-row-reverse ` or set it to be from left to right again with `.flex-row` (the default).

You can also use the `.flex-column` class to set a vertical direction from top to bottom, or the `.flex-column-reverse` class to change the vertical direction from bottom to top.
 
See the other available classes to control flex properties from the [docs](https://getbootstrap.com/docs/4.0/utilities/flex/).

## Bootstrap 4 Display Utilities

Bootstrap 4 provides a set of utilities that make it easy to set the display property of elements responsively i.e you can change the display property for specific breakpoints or screen sizes. See the docs for more [details](https://getbootstrap.com/docs/4.0/utilities/display/)

>Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing. 

Simply use `.d-{type}` for the `xs` breakpoint or `.d-{breakpoint}-{type}` for `sm, md, lg, and xl` where type can be one of these display types 

* none
* inline
* inline-block
* block
* table
* table-cell
* table-row
* flex
* inline-flex


## Conclusion

In this tutorial, we've seen the grid layout in Bootstrap 4. Bootstrap has always been a powerful CSS framework for developers building their websites without a CSS designer in the team and now with the new features such as the default support for Flexbox you have great tools to build responsive layouts with being a CSS expert.







