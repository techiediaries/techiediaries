---
layout: post
title: "Theming and Styling Ionic 4 Apps"
image: "images/content/ionic2-theming-styling.png"
excerpt: "Some tips and notes for how to style Ionic 3 apps " 
tags : [ionic2 , ionic]
---

{% include image.html 
    img="images/content/ionic2-theming-styling.png" 
    title="Ionic 2 styling " 
%}

We have been building hybrid mobile apps with Ionic 4 and Angular for a couple of months now. One of the trick things about Ionic 4 is styling and theming.

In this article we'll show you some tips on how to do styling and theming for the latest Ionic 4 version.

Ionic 4 provides a simple theming system which uses Sass variables and cutsom CSS classes/styles to change
components styling.

You can change default Ionic 4 colors by going to the `src/theme/variables.scss` and provides many predefined
Ionic 4 Sass variables such as:

```css
    $colors: (
    primary:    #387ef5,
    secondary:  #32db64,
    danger:     #f53d3d,
    light:      #f4f4f4,
    dark:       #222,
    customColor: #009688

    );
```

Then to use any color inside `$colors` use the color attribute of the component with the name of the variable. For example:

```html
    <ion-navbar color="primary">
        <ion-title>Title</ion-title>
    </ion-navbar>
```

You can also provide your own custom color names.

Ionic 4 also provides also a set of other predefined Sass variables For styling the toolbar such as 

```css
    $toolbar-background: #123456;
    $toolbar-border-color: #123456;
    $toolbar-text-color: #123456;
    $toolbar-active-color: #123456;
    $toolbar-inactive-color: #123456;
    $toolbar-title-color : #000;
```

To apply custom SCSS styles you have two options:

- For global styles you can use `src/app/app.scss`
- For page specific styles you can use `src/pages/xxxx/xxxx.scss` files.

## How to hide or disable the `ion-content` scrollbar?

For previous versions of Ionic 4 you can use the *setScrollDisabled* method to disable the scrollbar but 
unfortunately starting from Ionic 2.0.0-rc.6 it is no longer available (public), so how to disable the `ion-content` scrollbar?

You can use direct class name. For example: 

```css
   .no-scroll .scroll-content{
         overflow: hidden;
    }
```

Or even better to hide scrollbar but show it when there is a lot of content: 

```css
    .scroll-content {
            overflow-y: auto !important;
    }    
```

Make sure to add these CSS styles in the `src/app/app.scss` file. 

## How to apply custom styles to side Menus (ion-menu)

Ionic 4 side menus can be created using the `<ion-menu>` directive. Here is an example of an Ionic 4 menu: 

```html
    <ion-menu [content]="content">
        <ion-header>
        <ion-toolbar>
            <ion-title>Menu</ion-title>
        </ion-toolbar>
        </ion-header>
        <ion-content >
        <ion-list>
            <ion-item (click)="openMain()" >Main</ion-item>
            <ion-item  (click)="openAbout()">About</ion-item>
            <ion-item (click)="openHelp()">Help</ion-item>
            <ion-item (click)="openContact()">Contact</ion-item>
    
        </ion-list>
        </ion-content>    
    </ion-menu>

    .menu-inner .item {
        background-color: #387ef5;
    }


    .menu-inner > ion-header, 
    .menu-inner > ion-content, 
    .menu-inner > ion-footer {
        background-color: #123456; 
    }

    .toolbar-title {
        color : #fff;
    }
```

## Styling the Toolbar (ion-toolbar)

To style the Ionic 4 toolbar or top bar you have a bunch of scss variables which are: 

```css
    $toolbar-background: #123456;
    $toolbar-border-color: #123456;
    $toolbar-text-color: #123456;
    $toolbar-active-color: #123456;
    $toolbar-inactive-color: #123456;    
```

Just put them in the `variables.scss` file and change their values to your desired colors.

`ion-header`, `ion-content`, `ion-footer` and `ion-toolbar` make part of every Ionic 4 page so you can either: 

- Add globals styles to these elements. In this case you need to put them in `src/app/app.scss` 
- or add specific page styles so for example to style only main page just add styles inside `src/pages/main/main.scss` 

```css
    page-main {

        .content{
            background: #fff;
        }
        .toolbar-title {
            color : #fff;
        }    
    }
```

## Conclusion

In this quick tutorial, we've seen many tricks to add styling and theming to your Ionic 4 application.
