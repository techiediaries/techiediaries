---
layout: post
title: "Post Multipart Form Data in Python with Requests: Flask File Upload Example"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this tutorial we'll demonstrate how to upload a file from a Python server to another server by sending a POST request with multipart/form-data using the Python requests library." 
tags : [ python , django] 
author: omar
---


In this tutorial we'll demonstrate how to upload a file from a Python server to another server by sending a POST request with `multipart/form-data` using the Python `requests` library.

We'll be using two servers. The server that receives the file doesn't need to be a Python server but since we'he previously created one with Django in this [tutorial](https://www.techiediaries.com/django-rest-image-file-upload-tutorial/), let's use it instead of re-inventing the wheel. 

> Note: Typically we upload files from a client to a server but in this tutorial, we'll see how we can upload files from a server to another web server using Python and the Requests library.

Open a new terminal and create and activate a virtual environment:

```bash
$ python3 -m venv .env
$ source .env/bin/activate
```  

Next, clone the GitHub repository and install the dependencies:

```bash
$ git clone https://github.com/techiediaries/django-rest-file-upload.git server2
$ cd server2
$ pip install -r requirments.txt
```

Next, run the server using the following commands:

```bash
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```

The server will be available from the `127.0.0.1:8000` and will expose an `/upload` endpoint that accepts a POST request.

> **Note**: This server has also CORS enabled which means it can accept requests from different domains so make sure to enable CORS if you are using any other server.


## Creating the Flask Server

Now, let's proceed to create the uploading Python server that will make use of the Requests library to send a POST requests to the `127.0.0.1:8000/upload` endpoint for uploading a file between two servers. 

### Installing requests

Let's install the requests library using `pip`:

```bash
$ pip install requests
```

### Installing Flask

We'll be using Flask; a single file and lightweight web framework for creating the Python server that uploads the file. First install flask using `pip`:

```bash
$ pip install flask
```

Next, create a `server.py` file and add the following code:

```python
import os
from flask import Flask, request, render_template
import requests

app = Flask(__name__)

@app.route('/handle_form', methods=['POST'])
def handle_form():
    print("Posted file: {}".format(request.files['file']))
    file = request.files['file']
    return ""

@app.route("/")
def index():
    return render_template("index.html");	


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)

```

We create a `/` route for rendering the `index.html` template that will display a form and `/handle_form` route that will process the multipart form, get the uploaded file from the `requests.files[]` array and return. We'll use this method to send the form to the django server using the requests library.

Next, create a `templates` folder and add an index.html file with the following code:

```html
<!DOCTYPE html>
<html>

<head>
    <title>Upload New File</title>
</head>

<body>
    <h1>Upload Files</h1>

    <form action="handle_form" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="Upload">
    </form>

</body>

</html>
```

We create a form of `multipart/form-data` encoding type that has a file field for selecting a file from the hard drive.

### Sending Files with the Requests Library

The `handle_form()` of our flask application receives the posted file  but  doesn't save it. Instead, we'll use the requests library to upload it to the django server.

Simply change the `handle_form()` method as follows:

```python
@app.route('/handle_form', methods=['POST'])
def handle_form():
    print("Posted file: {}".format(request.files['file']))
    file = request.files['file']
    files = {'file': file.read()}
    r = requests.post("http://127.0.0.1:8000/upload/", files=files)
    
    if r.ok:
        return "File uploaded!"
    else:
        return "Error uploading file!"
```

We get the posted form from the `request.Files` array, next we use the `requests.post()` method to upload the file to the other server using a POST request. If the requests is successful, `r.ok` will be True.

Next, run the server using the following command:

```bash
$ python server.py
```

Your Python server will be available from the `127.0.0.1:8080` address.

![Python file upload](https://www.diigo.com/file/image/bbccosoazesrpqdqddzdqqeaqra/Upload+New+File.jpg)

If you select a file and upload it, you should have the file uploaded in the `media` folder of the django server.

## Conclusion

In this tutorial, you've seen how you can use Python and the requests library to upload a file from a server to another server.

