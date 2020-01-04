---
layout: post
title: "Ionic 3 Grid System Tutorial "
image: "images/content/ionic2-grid-layout.png"
excerpt: "In this tutorial we are going to understand the Ionic 3 grid layout system to build complex user interfaces with Ionic 3" 
tags : [ionic2, electron , ionic] 
---

{% include image.html 
    img="images/content/ionic2-grid-layout.png" 
    title="Ionic 2 grid layout" 
%}

On the previous tutorial, we have seen how to use [Ionic 2 Split pane](/ionic2-split-pane-desktop) and used it to create a desktop app with Electron and Ionic 2. On this tutorial we are going to see how to use the grid system which can be used on small mobile screens and on larger desktop and tablets screens where can be much useful.

## Understanding Ionic 3 Grid System

The grid layout system in Ionic 3 allows you to build complex user interfaces via rows and columns just 
like popular CSS frameworks such as Bootstrap and Foundation.

In most cases when you are building mobile apps with Ionic 3,you just need to place user interface components and wrapping them inside Ionic 3 lists which can produce good results but on larger screens such as tablets or Desktop (If you are using Ionic 3 for Desktop apps UIs) you may need to use advanced
layout systems such as the Grid layout system.

The grid layout uses rows (`ion-row`) and columns(`ion-col`) to break up the available space.

To create a row you need to use the `ion-row` directive. For a column use `ion-col` directive.

For example: 

```html
    <ion-grid>
        <ion-row>
            <ion-col ></ion-col>
            <ion-col ></ion-col>
        </ion-row>
    </ion-grid>
```

The Ionic 3 grid system uses 12 columns so to specify the size of any column you just set a number from 1 to 12 with the col attribute (col-width). For example:

```html
    <ion-grid>
        <ion-row>
            <ion-col col-1>This column will take 1/12 of available horizontal area (1 column of 12)</ion-col>
        </ion-row>
        <ion-row>
            <ion-col col-12>This column will take the whole row (12 columns)</ion-col>
        </ion-row>
    </ion-grid>
```

Just like Bootstrap you can provide different sizes for different breakpoints.

To create columns with different sizes depending on the size of screens you can simply use this syntax: 

```html
    col-<breakpoint>-<width>  
```

- *width* can be any value from 1 to 12.

- *breakpoint* can be either xl(extra small), sm(small), md(medium) or lg(large).


For example let's create a grid with one row which has two column.

For large/medium Desktop screens or tablets, the two columns will divide the row space between them.

For small mobile screens, each column will take the whole row space.

```html
    <ion-grid>
    <ion-row>

        <ion-col col-sm-12 col-xl-12 col-md-6 col-lg-6 ></ion-col>
        <ion-col col-sm-12 col-xl-12 col-md-6 col-lg-6 ></ion-col>

    </ion-row>
    </ion-grid>     
```

Here is a screenshot of Electron app built using Ionic 2 split pane and grid system components 

![Ionic 3 Grid Example](/images/content/ionic2-electron.jpg)


## Conclusion

Using the grid system, you can build complex user interfaces for Ionic 3 apps. Both the grid system and 
[split pane component](/ionic2-split-pane-desktop) seen on the previous tutorial can be more useful when using Ionic 3 for apps on larger screens such as tablets and desktops.

You can see the code accompanying this tutorial on [GitHub](https://github.com/techiediaries/ionic2-electron)





