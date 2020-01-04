---
layout: post
title: "PHP Form Tutorial & Example: $_GET and $_POST"
image: "images/content/php.png"
excerpt: "In this tutorial, you will learn how to handle HTML forms in PHP using $_POST and $_GET arrays" 
tags : [php]
---

HTML Forms are an important concept in PHP web development. If you are a PHP developer or aim to become one, you should learn how to handle forms since they are required in almost every website that requires submitted information from users. In this tutorial, we'll present you with a complete and detailed guide of how to create and use forms in PHP. We'll start with the traditional approach of handling forms in PHP, next we'll see examples of how to work with forms when using frontend JavaScript libraries like React, Vue and Axios.

## What is an HTML Form

[An HTML form](https://www.w3.org/TR/WD-html40-970708/interact/forms.html) is used to get information from the users visiting a website. Technically, it's an HTML tag used to create an element with various types of controls such as simple inputs, text areas, check and radio boxes, labels and buttons, etc.

> You can either submit the input from forms to a server for processing or email it.

You can create a form in HTML using the `<form>` and `</form>` tags. Inside the area defined by the opening and closing tags, you can use controls to create the elements of the form, depending on what information you need to get from users.

In this tutorial we'll learn about:

- How and why we use HTML forms in PHP
- How to create a form in PHP
- How to use the POST method 
- How to use the GET method
- How to build a simple login and registration form in PHP


## Why Using HTML Forms

Nowadays, most web apps need a way to get input from users. Here comes the role of HTML forms which are used to enable users to submit input to the HTTP server.

You can use forms for handling multiple tasks such as:

- Enabling users to register (create new accounts) and login
- Inserting data into a database system and make CRUD operations,
- Submitting queries for searching a database etc.  

## How to Create a Form in PHP

Actually, you creat a form in HTML which can be embedded in the PHP code.

You can create a form in HTML by using the `<form>` tag. 

- You then need to add the input controls, 
- Specify the type of the HTTP method to that will be used to submit information to the server,
- Add the submit URL that will be used to process the form data,

Let's see a simple example form. 

Start by creating a project folder using the following command:

```bash
$ mkdir php-form-example
```

Next, navigate inside the folder and create an `index.php` file and add the following content:

```html
<html>
<head>
	<title> Register Form</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
    <h2 id="logo">Register Form</h2>

    <form action="register.php" method="POST"> 
    
    <label for="fullname">Name:</label>
    <input type="text" name="fullname"> <br/> 
    
    <label for="email">Email:</label>
    <input type="email" name="email"> <br/>

    <label for="password">Password:</label>
    <input type="password" name="password"> <br/> 
    
    <input type="submit" value="Register!">
    </form>
</body>
</html>
```  

The `<form>` tag has an action attribute with the `register.php` value which means our form will be submitted to th `/register.php` URL to be processed via the POST method specified in the `method` attribute.

We have added controls for creating labels, input fields and submit button.

Now, let's use the PHP builtin development server to start a server at `127.0.0.1:8000`. Simply run the following command from the folder of your project:

```bash
$ php -S 127.0.0.1:8000
```

Using your web browser, navigate to the `http://127.0.0.1:8000` address. You should see the following form:

![PHP Registration Form](https://www.diigo.com/file/image/bbccosoazoaprqrraqzdrcpcrcb/Register+Form.jpg)

With some basic CSS styling, we can get a better looking form:

![PHP Form Example](https://www.diigo.com/file/image/bbccosoazoaprqsasczdrcpcred/Register+Form.jpg)

Here is the codepen for the example with CSS styles:

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="css,result" data-user="techiediaries" data-slug-hash="MdwOyw" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS Form Style">
  <span>See the Pen <a href="https://codepen.io/techiediaries/pen/MdwOyw/">
  CSS Form Style</a> by Techiediaries (<a href="https://codepen.io/techiediaries">@techiediaries</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Processing the PHP Form: `$_POST` & `$_GET` Arrays

In the `action` attribute of the form tag we specified `register.php` as the URL of file that will process the form once it's submitted. We also specified `POST` as the method that will be used to submit the form to the server.

In the project's folder, create a `register.php` file and add the following code which will simply returns the data that you have submitted via the form:

```php
<?php
 echo "You have submitted, name: " . $_POST['fullname'] . ", email: ". $_POST['email']. " and password: ". $_POST['password'];
?>
``` 

Since we have specified the POST method in the form, we can get the submitted information from the `$_POST` array.

The keys in the array are the values specified in the `name` attribute of the corresponding input in the HTML form.

If you want to use the GET method to submit data in your form you need to specify `action="GET"` in your form. In this case, you can get the submitted data via the `$_GET` array instead.

> **Note**: Please note that the form values submitted via a GET method are appended to the URL and are visible to anyone via the browser's address bar.

> You can use the PHP `isset()` to make sure a value exists in the `$_POST` or `$_GET` arrays before trying to access it. For example: `if (isset($_POST['email']))`.

## Wrap-up

Forms are a crucial part of any web application. As such, PHP makes it easy to access the data of submitted forms via the `$_POST` and `$_GET` arrays.

You can create a form using the `<form>` tag and various types of controls.     






