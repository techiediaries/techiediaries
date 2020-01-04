---
layout: post
title: "How to Run Python Script in Node.js: Numpy and Scipy Example"
image: "images/content/python.png"
excerpt: "In this tutorial we'll see how to call Python from Node.js." 
tags : [] 
---

In this tutorial we'll see how to run Python from Node.js with Numpy and Scipy Example.

# How to Communicate between Node.js and Python

In this tutorial we'll see how to communicate between Node.js and Python.

Node.js is a powerful platform for building server applications with JavaScript but not as powerful for numerical and scientific computation. Python, on the other hand, is right tool for these tasks. Python provides libraries like `numpy` and `scipy` which make scientific computing a breeze.

You can call Python code from Node.js by running a Python process for doing computations and returning the results back to Node.

In this tutorial we'll see how you can use the `child_process` standard library in Node.js to spawn a Python process which will calculate the sum of all elements in an array, using the `numpy` library, and return back the result to the Node.js script.

You need to have the following prerequisites:

- Node.js and NPM installed on your machine;
- Python 3.

## Creating a Node Script

Let's start by creating a Node.js script. In your terminal, run the following commands:

```bash
$ mkdir node-python-example
$ npm init -y
```

A `package.json` file will be created with the following content:

```json
{
  "name": "node-python-example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Next, create an `index.js` file:

```bash
$ touch index.js
```
