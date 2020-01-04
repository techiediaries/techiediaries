---
layout: post
title: "Flask By Example Tutorial: Templates, Inheritance & render_template() Example"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this quick tutorial, you will be introduced to templates and template inheritance in Flask with Jinja." 
tags : [ python , flask ] 
author: kaima
---

Flask makes uses of the [Jinja2](http://jinja.pocoo.org/docs/) template engine. If you don't know what is a template language, it's simply HTML with variables and other programming constructs like conditional statement and for loops etc. This allows you to so some logic in the template itself. The template language is then rendered into plain HTML before being sent to the client.

Jinja2 is a powerful feature-packed template engine for Python heavily inspired by the built-in template engine of Django. It has features such as unicode support and template inheritance and is available under BSD license.

In a the Jinja template language, you need to put variables inside curly braces i.e `{{ ... }}`. For expressions and other logic like for loops, you need to put them between tags like {% raw %} `{% ... %}` {% endraw %} .

>**Note:** You can create a Jinja template by simply creating an `html` file under the `/templates` folder in a Flask project. 

## Flask Templates Example

Let's see a simple flask example that demonstrates how to work with templates.

Open a new terminal and create then activate a virtual environment using the following commands:

```bash
$ cd ~/demos
$ mkdir flask-templates-example
$ cd falsk-templates-example
$ python3 -m venv .env 
$ source .env/bin/activate
```

Next, install `flask` using `pip`:

```bash
$ pip install flask
```

Next, create a `server.py` file and add the following code:

```python
import os
from flask import Flask, render_template


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", message="Hello Flask!");	


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)
```

We create a route `/` which is mapped to the `index()` function. This function renders the `index.html` template.

We use the `render_template()` method to render the `index.html` template which we'll be creating in the `templates` folder of our project. Optionally, we can pass variables like the `message` variable that will be available to the template.

Next, create a `templates` folder and add an `index.html` file with the following content:

{% raw %}
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Flask Template Example</title>
  </head>
  <body>
    <div>
      <p>{{ message }}</p>
    </div>
  </body>
</html>
```
{% endraw %}

We use the curly braces to display the value of the `message` variable. 

We can also pass complex types  like lists. For example, change the `render_template()` line to the following:

```python
def index():
    return render_template("index.html", message="Hello Flask!", contacts = ['c1', 'c2', 'c3', 'c4', 'c5']);
```

We pass the `message` and `contacts` variables to our `index.html` template.

Now, open the `templates/index.html` file and update it as follows:

{% raw %}
```html
<!DOCTYPE html>
<html>

<head>
    <title>Flask Template Example</title>
</head>

<body>
    <div>
        <p>{{ message }}</p>

        <p>{{ contacts }}</p>
        <p>My Contacts:</p>
        <ul>
            {% for contact in contacts %}
            <li>{{ contact }}</li>
            {% endfor %}
        </ul>
    </div>
</body>

</html>
```
{% endraw %}

We use the curly braces to display the values of the `message` and `contacts` variables. Next, we use the {% raw %} `{% for %} ... {% endfor %}` {% endraw %} loop to loop through the `contacts` list and display each value.

You can see a list of the supported control constructs in `Jinja` from the official [docs](http://jinja.pocoo.org/docs/templates/#list-of-control-structures).

You can run you application using the following command:

```bash
$ python server.py
```

This will start a development server on port we specified i.e the `8000` port. You will get the following output in your web browser:

![Flask template example](https://www.diigo.com/file/image/bbccosoazesrpddpcbzdqqdqsab/Flask+Template+Example.jpg)


## Template Inheritance in Jinja

One important feature in template languages is template inheritance i.e a child template can inherit or extend a base template. This will allow you to define your template and a clear and concise way and avoid complexity. 

Imaging, you have an application with multiple pages and each page has the same header. If you want to change something in the header you would need to go through all the templates and change the header for each one which can be a tedious task. Thanks to template inheritance, you only need to create a base template that contains the common header code once and then make all the other templates extend the base template. Since the header portion is common between all templates and is defined only once in the base template, now you can change your header in only one place and all templates will inherit the updated header.     

You can use the {% raw %} `{% extends %}` {% endraw %} and {% raw %} `{% block %}` {% endraw %} tags to work with template inheritance. The {% raw %} `{% extends %}` {% endraw %} tag is used to specify the parent template that you want to extend from your current template and the {% raw %} `{% block %}` {% endraw %} tag is used to define and override blocks in the base and child templates. 

Let's now see template inheritance by example.

Create a `templates/base.html` file and add the following code:

{% raw %}
```html
<!DOCTYPE html>
<html>

<head>
    <title>Flask Template Example</title>
</head>

<body>
    <h1>Flask Template Example</h1>
    
    {% block content %}
    {% endblock %}

</body>

</html>
```
{% endraw %}

We add a `<h1>Flask Template Example</h1>` header that will be common by all child templates that extends this base template. Next, we define a `content` block which will be overridden by the child templates to add their own code in this area.

Next, open the `templates/index.html` and add the following code:

{% raw %}
```html
{% extends "base.html" %}
{% block content %}
<div>
    <p>{{ message }}</p>

    <p>{{ contacts }}</p>
    <p>My Contacts:</p>
    <ul>
        {% for contact in contacts %}
        <li>{{ contact }}</li>
        {% endfor %}
    </ul>
</div>
{% endblock %}
``` 
{% endraw %}

We use the {% raw %} `{% extends "base.html" %}` {% endraw %} tag to extend the base template and then we fill the `content` block with code specific  to the `index.html` template. 

![Flask template example](https://www.diigo.com/file/image/bbccosoazesrpdpdpszdqqdraqr/Flask+Template+Example.jpg)


 
## Conclusion

In this quick tutorial, you have been introduced to templates and template inheritance in Flask with Jinja.