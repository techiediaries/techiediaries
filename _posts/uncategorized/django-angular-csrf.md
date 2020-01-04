---
layout: post
title: "Adding the Django CSRF Protection to Angular 4+ Post Requests/Forms"
image: "images/content/angular.jpg"
excerpt: "" 
tags : [django , angular , python] 
---

## CSRF Protection in Django


Django backend that requires every POST/PUT/PATCH/DELETE request to have a valid CSRF token. 



While building a web app using Django as backend with Angular JS I came accross with a page not found 404 error when I was trying to send some data using the Angular’s $http.post().

When trying to send a form using a POST method it needs to be verified with CSRF. If you are using Angular this verification method does not work.


https://medium.com/@Angular.js/how-to-create-a-post-request-including-csrf-token-using-django-and-angularjs-a5c734629693

