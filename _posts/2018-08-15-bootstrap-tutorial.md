---
layout: post
title: "Bootstrap Tutorial for Django Developers"
image: "images/content/bootstrap.png"
excerpt: "" 
tags : [] 
---

## Adding Bootstrap 4 for CSS Styling

For quickly building a beautifully styled web page, we can use Bootstrap (v4). Bootstrap requires jQuery and Popper.js so we must first include them in the `<head>` of our template:

```html
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
```  

Next, include the JavaScript file for Bootstrap:

```html
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js"></script>
```

Finally, you need to include the CSS file for Bootstrap, also in the `<head>` section:

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css">
```

Now you are ready to use Bootstrap classes and utilities for styling your application.

Create a `index.html` template that extends the `base.html`:

```html
{ % extends "base.html" % }

{ % block content % }
 
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-12">
		<h1>Django Bootstrap 4 Tutorial</h1>
		  <p>Welcome to our Django Home Page</p>
		</div>
	</div>	
</div>


{ % endblock % }
```
>Components and options for laying out your Bootstrap project, including wrapping containers, a powerful grid system, a flexible media object, and responsive utility classes.

## Containers

>Containers are the most basic layout element in Bootstrap and are **required when using our default grid system**. Choose from a responsive, fixed-width container (meaning its `max-width` changes at each breakpoint) or fluid-width (meaning it’s `100%` wide all the time).
  
>Use `.container-fluid` for a full width container, spanning the entire width of the viewport.      
