---
layout: bpost
title: "Read JSON Files In NodeJS With require() and fs.readFileSync()"
image: "images/content/javascript.png"
excerpt: "How to read JSON files with NodeJS require()  and fs.readFileSync()"
date: 2020-09-01
tags : [javascript , nodejs]
---

In Node.js you have two methods for reading JSON files `require()` and `fs.readFileSync()`. 

For static JSON files, use the `require()` method because it caches the file. but for dynamic JSON file the `fs.readFileSync()` is preferred.

After reading the JSON file using `fs.readFileSync()` method, you need to parse the JSON data using the `JSON.parse()` method.

Using the require method, you can read your JSON file in one line of code as follows:

```js
let data = require('./file.json')
```

Using the `fs.readFileSync()` method, you cann read the file in two lines of code:

```js
const fs = require('fs')
let data = JSON.parse(fs.readFileSync('file.json', 'utf-8'))
```
