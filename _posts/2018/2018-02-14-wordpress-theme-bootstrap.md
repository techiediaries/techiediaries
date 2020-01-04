---
layout: post
title: "Building a One Page WordPress Theme with Bootstrap 4"
image: "images/content/wordpress.jpg"
excerpt: "Throughout this tutorial we'll be building a responsive one page WordPress theme with Bootstrap 4 styling. First we'll start by creating the directory structure and different files either required or some optional templates then we'll integrate Bootstrap 4 using the functions.php file." 
tags : [wordpress, bootstrap] 
---

Throughout this tutorial we'll be building a responsive one page WordPress theme with Bootstrap 4 styling. First we'll start by creating the directory structure and different files either required or some optional templates then we'll integrate Bootstrap 4 using the `functions.php` file.

## What You'll Learn

In this tutorial you'll learn

* about the basic requirements of WordPress theme development 
* how to create a WordPress theme from scratch
* how to provide meta information about your theme to WP
* how to customize different WP theme templates
* how to display the WordPress Loop
* how to use WP tags like `get_header()` and `get_footer()`, `get_sidebar()` to include the header, footer and sidebar template fragments in each template
* how to use the `get_template_part()` WP tag to create custom template partials 
* how to use `functions.php` to include CSS and JavaScript assets. In our case Bootstrap 4 JS and CSS files.
* how to use WP hooks
 
## Requirements 

First of all, this tutorial has a set of requirements. If you are going to create a theme by following the steps then you'll need to have a development machine with PHP, MySQL and WordPress installed. 

I'm not going to cover the procedures of installing these tools since the web has a already tons of tutorials to cover that.

WordPress is a PHP Content Management System that uses MySQL for database that's whay you'll need PHP and MySQL.

Once you have installed WordPress head over to your WordPress installation folder (normally inside a `www/http` folder) then navigate to `wp-content` where you will find a `themes`. 

## Create style.css and index.php


The `themes` folder is where you need to place your themes. If you use the administration dashboard to install themes they are automatically uploaded in this folder so if you are in a local machine then simply do your work inside this folder directly.

Now go ahead and create a folder with two first files `style.css` and `index.php`. They are both required by WordPress so your theme will not function or be recognized if your don't supply at least these two files.

If you use a Bash CLI use the following commands to create the folder and files

```bash
mkdir bootstrap4-theme
cd bootstrap4-theme
touch style.css
touch index.php
```   

Next you need to open the `style.css` file and add the necessary meta information about your theme as a CSS comment.

```css
/*   
Theme Name: One Page Bootstrap 4 Theme
Theme URI: <THEME_URI>
Description: A One Page WP Theme.
Author: <AUTHOR_NAME>
Author URI: <AUTHOR_URI>
Version: 1.0
*/
``` 


You need to replace the information with your own.

Make sure to remove any whitespace at the top of the `style.css` file.

The `style.css` is not just a meta information file but also the main CSS file for your theme. So just leave it now and you can go back when you need to add custom CSS styles for your theme.

Next you need to add content to `index.php`. This is the template that gets displayed when the user visits your WordPress website.

So open `index.php` and put the following content 

```php
<?php get_header(); ?>
<?php get_template_part('templates/content','loop'); ?>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
```

* `get_header()` includes the `header.php` template file, 
* `get_sidebar()` includes the `sidebar.php` template file,
* `get_footer()` includes the `footer.php` template file
* `get_template_part()` includes the content of another file `templates/content-loop.php`.

Do we need to use these tags to include different template parts in `index.php`? Actually for this simple one page theme we don't need them we can just include the content of these templates directly inside `index.php` but for the sake of learning how to organize themes with multiple pages we need to use these tags.

Imagine you have many templates and  you have embedded the header in each template. If you want to change anything in the header you'll have to go over each template and update it. The same goes for the footer, the sidebar and any other template that's the same in multiple templates.

 `get_header()`,  `get_sidebar()` and `get_footer()` include predefined templates (i.e  `header.php`, `sidebar.php` and  `footer.php`). For other custom templates you can use `get_template_part()` with the custom filename (`{slug}-{name}.php`) as a parameter. 

## Create Partial Templates

Create a `templates` folder then create a `content-loop.php` which includes the WordPress loop and add the following content

```php
<div>
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<h2><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>
<?php the_content(); ?>
<?php endwhile; else: ?>
<p>There no posts to show</p>
<?php endif; ?>
</div>
```

The loop logic is simple PHP code that can be understood by any PHP developers. This code checks of there are any created posts in the database using the `have_posts()` function (otherwise displays *There no posts to show* message ) then enters a *while* loop. Inside the loop, many functions are called such as the `the_permalink()`( for displaying the post permalink), `the_title()`(for displaying the title) and  `the_content()`(for displaying the post content).
  
 
 You can read more information about the WordPress Loop from the [docs](https://codex.wordpress.org/The_Loop_in_Action).

Next create `header.php` with the following content

```php
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>

    <meta name="description" content="">
    <meta name="author" content="">

    <meta name="viewport" content="width=device-width">
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="#"><?php bloginfo('name'); ?></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
    </nav>
```

This will simply display a Bootstrap navigation bar with dynamic information thanks to these WordPress tags:

* `bloginfo('name')` this WP tag is used to retrieve the name of your website,
* `wp_title()` is a WP tag that can be used to retrieve the title for the current page,
* `wp_head()` is a WP tag that once called fires the [wp_head action](https://codex.wordpress.org/Plugin_API/Action_Reference/wp_head). This action is used by WordPress to place links and other resources in the `<head>` of your template.

Next you need to create `footer.php` (this is the template used for displaying the footer across your theme) and the following content.

```php
< ?php wp_footer(); ?>
</body>
</html>
```    

This template simply closes the `<body>` and `<html>` templates but can be customizer to whatever footer you need. 

One required thing is that you need to call the `wp_footer()` WP tag which is similar to `wp_header()` but for footer, it places resources at the footer.

Next you need to create the `sidebar.php` template 

```php
<div id="primary" class="sidebar-nav">
    <?php do_action( 'before_sidebar' ); ?>
    <?php if ( ! dynamic_sidebar( 'sidebar-primary' ) ) : ?>
        <aside id="search" class="widget widget_search">
           <?php get_search_form(); ?>
        </aside>
        <aside id="archives" class"widget">
            <h1 class="widget-title"><?php _e( 'Archives', 'shape' ); ?></h1>
            <ul>
                <?php wp_get_archives( array( 'type' => 'monthly' ) ); ?>
            </ul>
        </aside>
        <aside id="meta" class="widget">
            <h1 class="widget-title"><?php _e( 'Meta', 'shape' ); ?></h1>
            <ul>
                <?php wp_register(); ?>
                <li><?php wp_loginout(); ?></li>
                <?php wp_meta(); ?>
            </ul>
        </aside>
   <?php endif; ?>
</div>
```

This code will display the Search, Archive, and Meta Widgets.

This is a simple sidebar template from the [docs](https://developer.wordpress.org/themes/functionality/sidebars/#create-a-sidebar-template-file) for displaying default WP widgets.

Read about more options to customize the sidebar template from [WordPress docs](https://codex.wordpress.org/Customizing_Your_Sidebar).

We have customized many different and most common templates. WordPress allows you to customize every aspect of your theme. 

## Adding Bootstrap 4 Files

Now we need to complete one more step in order to add Bootstrap 4 styles to the theme.

There are many methods you can use to include CSS and JavaScript assets in your theme. We'll use the proper and recommended way i.e using the special `functions.php` file.

First go ahead and download [Bootstrap 4 files](https://getbootstrap.com/docs/4.0/getting-started/download/).

Next create two folders `js` and `css`. Inside `js` create a sub-folder `vendor`.

Now unzip the Bootstrap 4 files then copy `bootstrap.min.css` inside `css`, `bootstrap.min.js` inside `js`. 

Bootstrap 4 depends on jQuery and Popper.js so you'll need to place those files inside the `js/vendor` folder.

Grab [jQuery’s slim](https://blog.jquery.com/2016/06/09/jquery-3-0-final-released/) and [Popper.js](https://popper.js.org/) then place then place them in `js/vendor`.

If the files are ready let's tell WP to include them in the head of your theme.
 
Go ahead and create a `functions.php` PHP file in your theme folder then add this code:

```php
<?php

function enqueue_styles() {

	wp_enqueue_style( 'bootstrap', get_template_directory_uri() . '/css/bootstrap.min.css' );
	wp_enqueue_style( 'core', get_template_directory_uri() . '/style.css' );

}
add_action( 'wp_enqueue_scripts', 'enqueue_styles');
function themebs4_enqueue_scripts() {

	wp_enqueue_script( 'jqslim', get_template_directory_uri() . '/js/vendor/jquery-3.2.1.slim.min.js' );
	wp_enqueue_script( 'popper', get_template_directory_uri() . '/js/vendor/popper.min.js' );
	wp_enqueue_script( 'bootstrap', get_template_directory_uri() . '/js/bootstrap.min.js' );
}
add_action( 'wp_enqueue_scripts', 'enqueue_scripts');
```    

You can notice that we have also included the core `style.css` file.

`wp_enqueue_style()`: 

>registers the style if source provided (does NOT overwrite) and enqueues. [Source](https://developer.wordpress.org/reference/functions/wp_enqueue_style/)

`wp_enqueue_script()`:

>Registers the script if $src provided (does NOT overwrite), and enqueues it. [Source](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)

`wp_enqueue_scripts`:

>wp_enqueue_scripts is the proper hook to use when enqueuing items that are meant to appear on the front end. Despite the name, it is used for enqueuing both scripts and styles. [Source](https://codex.wordpress.org/Plugin_API/Action_Reference/wp_enqueue_scripts)

`add_action()`:

>Actions are the hooks that the WordPress core launches at specific points during execution, or when specific events occur. Plugins can specify that one or more of its PHP functions are executed at these points, using the Action API. [Source](https://developer.wordpress.org/reference/functions/add_action/)

## Conclusion

In this tutorial I showed you how you can easily create a responsive WordPress theme from scratch using Bootstrap 4.