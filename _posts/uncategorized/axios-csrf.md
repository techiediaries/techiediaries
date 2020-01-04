---
layout: post
title: "Axios CSRF Protection"
image: "images/content/axios.jpg"
excerpt: "" 
tags : [django , rails , javascript ] 
---

When building modern web applications with Frameworks such as Python Django, Flask or Ruby Rails etc. 

Fortunately, axios allows to read the token from the Django cookie.

I found myself trying to create a JavaScript application which sends HTTP requests using axios against a Django backend that requires every POST/PUT/PATCH/DELETE request to have a valid CSRF token. Fortunately, axios allows to read the token from the Django cookie (thanks to @tobire42 for finding that out) and send it along with every request automatically, see this wonderful post about the different options on how to do that. I liked this solution to configure the client only:
import axios from 'axios';
 
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

This will pipe the csrftoken back through to Django, no more configuration needed. Please note: Django’s documentation about the default header name seems outdated and we need to use the one above instead (or configure the name to be whatever we like).

The same thing can be done with other frontend frameworks, e.g. for jQuery we can do (see Django docs for a getCookie() implementation):
$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
  },
});
