---
layout: post
title: "Serving Files in Express with sendFile()"
image: "images/content/django.png"
excerpt: "Serving Files in Express with sendFile()" 
tags : [ express ]
---

In this quick post, we'll learn about the `sendFile()` method in Express and how to use it to send static files.

## The sendFile() Method

The Express framework provides a `sendFile()` method available on the response object which can be used to send static files to the client. 

Let's start by creating a public folder in our project directory:

```bash
$ mkdir public
```

Next, navigate to the `public` folder and create an `index.html` file with the following content:

```html
<html>
<head>
    <title>Sending Static Files with Express</title>
</head>
<body>
    <p>This is a static file!</p>
</body>
</html>
```

Next, create an `app.js` file in the root folder of your project and add the following code to create a simple Express.js server running on the `3000` port:

```js
const express = require('express');
const app = express();
app.use(express.static('public')); /* this line tells Express to use the public folder as our static folder from which we can serve static files*/


app.listen(3000, function(){
  console.log("Listening on port 3000!")
});
```

> Here we assume, you have a `package.json` file in your project's root folder and [Express.js](https://www.npmjs.com/package/express) installed: `npm install --save express`.

Next, let's define a root route that will be used to send the static HTML file to the client:

```bash
app.get('/', function(req, res){
  res.sendFile('index.html');
}); 
```

We use the `get()` method from the Express instance to call a given callback function when we visit the `/` route. The callback function is passed a request and response object that we named `req` and `res`.

In the callback, we call the `sendFile()` of the response object to send the `index.html` file.

You can now start your Express server using the following command:

```bash
$ node app.js
```

You server will be running from the `http://localhost:3000` address. Open your web browser and navigate to that URL, you should see a blank page with **This is a static file!**. This is our `index.html` file served and interpreted by the browser. You can also use the `sendFile()` method to serve other types of static files like images for example.


