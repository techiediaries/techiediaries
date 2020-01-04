---
layout: post
title: "Using Electron with Flask and python-shell"
image: "images/content/python.png"
excerpt: "In this tutorial, you'll learn to build GUIs for your Flask applications using Electron and web technologies i.e HTML, CSS and JavaScript" 
tags : [python , nodejs, electron , node, django] 
---

In the previous [tutorial](https://www.techiediaries.com/python-electron-tutorial), we've seen how to use Electron and `python-shell` to create Python apps with Electron GUIs. This opens the door for using the modern frontend web technologies, the Node.js and npm modules (the biggest open source repository in the world) and the Python libraries combined to create powerful applications.

In this tutorial, we'll use Flask, a popular web framework for building web applications with Python, and Electron to build a desktop application with an Electron GUI. There are many benefits of combining Flask with Electron to build applications, such as: 

- If you are running a Python/Flask web developer, you can use your existing skills to build cross platform desktop applications;
- If you already have an existing Flask application, you can easily target desktop apps without reinventing the wheel etc.

## What's Electron?

We assume here that you are a Flask developer so an Electron introduction might be useful. 

Electron is a platform, created by GitHub, to enable developers to create cross-platform desktop applications for Windows, Linux and macOS using web technologies i.e JavaScript, HTML and CSS.

Electron is based on Chromium, just like Chrome and Opera (and many browsers) so it's actually a web container. Electron also provides a Node.js runtime so you can use the Node.js APIs and ecosystem for building desktop apps (not just server apps and CLI tools).

Using Electron, you can use take benefits of the Node.js APIs, the modern HTML5 APIs but also a rich and cross-platform API for accessing native operating system features and creating native windows and dialogs.

For more information, read the [Electron tutorial](https://www.techiediaries.com/electron-tutorial).

## Creating the Electron Application

Let's not re-invent the wheel and use the Electron application we created in the previous [tutorial](https://www.techiediaries.com/python-electron-tutorial). It's available from GitHub, so you simply need to clone it and install the dependencies using the following commands:

```bash
git clone https://github.com/techiediaries/python-electron-app
cd python-electron-app
npm install
npm start
```   

![Electron Python](https://i.imgur.com/bM6cJR3.png)

## Creating a Basic Flask Application

Now, that we've created our Electron GUI application, let's create a basic Python/Flask application and use it as an "engine" for our application. We'll also use the `python-shell` module to enable communication between the Python process and Electron process.

We'll use Pipenv to create an isolated virtual environment for Python packages. Pipenv is the official package manager for Python. 

First, create a virtual environment based on Python 3 using the following command:

```bash
pipenv --three
```

This will create a `Pipfile` file inside the project's folder and create a virtual environment inside your `home` folder.

You can now install the `flask` package using:

```bash
pipenv install flask 
```

Next activate the environment using:

```bash
pipenv shell
```

Next create the `engine.py` file and add this basic code to run a Flask server that simply returns  the *Hello World from Flask!* response:

```python
import sys
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World from Flask!"
if __name__ == "__main__":
	app.run(host='127.0.0.1', port=5000)
```

Now, open the `main.js` file and add the following code, inside the `createWindow()` function, to spawn Python and run the `engine.py`:

```python
var pyshell =  require('python-shell');
pyshell.run('engine.py',  function  (err, results)  {
 if  (err)  console.log(err);
}); 
```

We use the `python-shell` module which is installed when you executed `npm install` in the cloned project. If you are creating a new project from scratch, make sure to install `python-shell` and any other dependencies.

Now open the `index.html` file and add:

```html
<a href="http://127.0.0.1:5000/">Go</a>
```


When you click on the *Go* link, you'll visit the the home path of the Flask server:

![Flask Electron](https://i.imgur.com/cs1NUhU.png)


You'll get the *Hello World from Flask!* response:

![Flask Electron](https://i.imgur.com/fkZuY6Y.png)

## Conclusion

We've created a basic application with Flask and Electron. This can be further developed to create more complex desktop apps by implementing the logic in Python and Flask and use Electron with web technologies for creating the GUI interface.

