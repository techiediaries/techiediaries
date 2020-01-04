---
layout: post
title: "Using Vue.js in WordPress"
image: "images/content/vuejs.png"
excerpt: "In this tutorial, you'll see how you can integrate Vue.js in your WordPress theme or plugin. This will help you create powerful and modern Single Page Apps or SPA themes and will allow you to provide your plugins with Vue.js interfaces that leverage features like virtual DOM, reactivity and components." 
tags : [vuejs , php , wordpress]
---

Using Vue.js with WordPress allows developers to create modern web apps on top of the most popular CMS in the world. In fact, with the addition of the REST API, WordPress has become a complete application platform for building web apps with a PHP/WP back-end and a JavaScript front-end. That means, you take benefits from the modern front-end developments tools, frameworks and libraries like Angular, React and Vue.js to create powerful WordPress themes and plugins. 

## Prerequisites

This tutorial requires a few prerequisites. To complete it, you need to have:

- PHP installed on your development machine,
- WordPress installed and configured,
- Basic knowledge of PHP,
- Working experience of WordPress,
- Basic knowledge of JavaScript,
- Familiarity with Vue.js 


This tutorial is not designed to teach you WordPress or Vue.js but the ways for using them both to create plugins and themes that have a Vue.js front-end.

Themes look more appropriate to use a Vue.js interface but plugins can also benefit from Vue.js to create widgets. You can for example make a plugin that uses Vue.js to fetch and display data from an WordPress REST API or even a third-party API. 

## Introduction
 
In this tutorial, you'll see how you can integrate Vue.js in your WordPress theme or plugin. This will help you create powerful and modern Single Page Apps or SPA themes and will allow you to provide your plugins with Vue.js interfaces that leverage features like virtual DOM, reactivity and components.

### Introducing Vue.js 

Vue.js is JavaScript progressive library for creating modern user interfaces. It has powerful features like:

- Virtual DOM,
- Data binding and reactivity,
- Components etc.

These features will allow you to build maintainable and performant client side web applications.
 
A component is simply a JavaScript class/function that has inputs and outputs, interacts with other components and controls a part of the application screen.

Vue.js borrows many of its features from both React and Angular.js which makes it a powerful library that takes the best features from both worlds. For example, virtual DOM from React and directives from Angular.js.

You can use Vue.js to add small code in your web application which means it can be an alternative to plain JavaScript or jQuery for adding interactivity to your apps, it can be used to create small reusable widgets or also to create full-blown Single Page Apps. 

### Using Vue.js 
 
The official Vue.js docs provides different ways that you can use to create Vue.js projects, such as:

- Using Vue CLI: the recommended way,
- Using a classic `<script>` tag,
- Using a CDN.

Using Vue CLI to create a Vue.js interface for your WordPress API requires more work because you need to tweak Webpack settings to export the final bundles in your theme directory. So the easiest one is to use a single JS file that contains the code for the library.

Basically, this is what you need to do to integrate a Vue.js application with your WordPress theme or plugin:

-   The first thing that Vue.js needs is a DOM element where it can be mounted. In a plugin this can be done using a shortcode, 
-   After that, you will need to import the Vue.js script file in WordPress. This can done, either in themes or plugins by enqueueing the file,
-   Finally, you can proceed by creating your Vue.js application in a JavaScript file and enqueue it.

That's all the steps that you need to follow. Now, let's see how you can create a simple WordPress plugin that uses Vue.js in the front-end.

 
## Integrating Vue.js with WordPress

First, you need to create a child theme or a plugin. To create a child theme, navigate inside the themes folder inside the `wp-content` folder of your WordPress installation directory:

```bash
$ cd /var/www/html/wp-content/themes
$ mkdir vuetheme
```

Your theme needs to include the following files:

-   `style.css`: It has two roles, it contains meta information about your theme and can be used for CSS styles.
-  `functions.php`: It can be used to add any functions in your theme like enqueueing JS scripts and CSS styles etc.
-   `index.php`: This file acts as the index file for your theme.

Now, navigate to the newly created theme and add a `style.css` file. 

```bash
$ cd vuetheme
$ touch style.css
```

Open the `style.css` file and add the following meta information that's required by your theme to be recognized by WordPress as a valid theme that can be activated from the admin interface:

```css
/*
 Theme Name:  Vue Theme
 description: A Vue WordPress Theme
 Author:       Ahmed Bouchefra
 Template:     twentyseventeen
 Version:      1.0.0
*/
```

For the template property, you can see that you are creating a child theme of the *Twenty Seventeen WordPress theme*. 

You can now go to the administration interface and activate this theme.


Next, create and open the `index.php` file and add the following code:

```php
<!DOCTYPE html> 
<html <?php language_attributes(); ?>> 
<head> 
   <?php wp_head(); ?> 
</head> 

<body> 
    <div id="app">
    </div> 
    <?php wp_footer(); ?> 
</body> 
</html>
```

The Vue application will be mounted in the `<div id="app">`.

You can add custom functionality in your theme by using a `functions.php` file that you need to create inside your theme folder:

```bash
$ touch functions.php
```

> The `functions.php` file is a standard WordPress file so you don't need to do anything to load it in your theme except for creating it there.

Next, open the `functions.php` file and add the following code for importing the Vue.js library in your WordPress theme:

```php
function enqueue_scripts(){
   wp_enqueue_script('vue', 'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js', [], '2.5.17');           
}
```


Next, add a `main.js` file inside your theme folder then use the following code to create a Vue instance:

```js
( function() {
 new Vue({
  el: document.querySelector('#app'),
  template: "WP Vue Theme",
  mounted: function(){
   console.log("WP Vue Theme!");
 }
});
})();
``` 

You first create a Vue instance using the `Vue` built-in function. You also provide a plain JavaScript object that lets you add different parts of your Vue application such as: 

- `el` for specifying the DOM element where you can mount the Vue application. You can either specify a CSS selector or an `HTMLElement` object that can be returned from the `document.querySelector('#app')` method.
- `mounted` for specifying a function that gets called when the Vue application is mounted. So you should see a *WP Vue Theme!* in your browser's console when the application is mounted.
- `template` is used to specify a template that gets rendered when the Vue application is mounted.


Finally to make this works, you need to enqueue the `main.js` file that includes the Vue.js code.  Add the following code in your `enqueue_scripts()` function:

```php
wp_enqueue_script('vueapp', plugin_dir_url( __FILE__ ) . 'main.js', [], '1.0', true);
```

You use the `plugin_dir_url` WordPress function to retrieve the full URL of the `main.js` file. `__FILE__` contains path to the current PHP file. So by concatentaing the current path with the `main.js` filename you get the full path of the file.
  
If you visit your WordPress site you should see the *WP Vue Theme* string displayed.

## Conclusion

This is a very simple example of integrating a Vue.js application with WordPress but this can be easily leveraged to add components and routing which will allow you to create much complex Vue.js applications that can consume WordPress REST APIs to create, read, update and delete data in your WordPress database from your Vue.js interface.
