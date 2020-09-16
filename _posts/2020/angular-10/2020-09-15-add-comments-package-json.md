---
layout: bpost
title: "How to add comments to package.json"
image: "images/content/angular.png"
excerpt: "In this quick tip article, we'll see how to add comments to the package.json file"
date: 2020-09-15
tags : [json , javascript]
---

In this quick tip article, we'll see how to add comments to the `package.json` file.

## What's `package.json`?

The `package.json` file uses the JSON format for storing meta-information about a Node.js project, and most importantly managing the project's dependencies installed or that should be installed from the npm registry. It can also contain scripts for building and running your project and any related development tools such as a live-reload server or Sass preprocessor, etc.

## How to Create a `package.json` file?

You can create a `package.json` file manually or using the `npm init` command once you install Node and npm in your machine.

This is an example `package.json` file generated using the `npm init` command with the default values:

```json
{
  "name": "e",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Once you install a dependency from npm, for example:

```bash
$ npm install bootstrap
```

This will be the content of the `package.json` file:

```json
{
  "name": "e",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bootstrap": "^4.5.2"
  }
}
```

Since Node is used for powering most front-end tools, such as Angular CLI , Vue CLI and React Create App, you'll ofter need to work with the `package.json` file in your front-end projects.

## How to Add Comments to your `package.json` File?

There is an angoing discussion about if we need comments in JSON files that by default they don't support them but there are also many ways that you can use to add comments to your JSON files including the `package.json` file.

> You can find most of the possible [ways to add comments to JSON](https://www.techiediaries.com/json-comments/) in the linked article.

For the `package.json` file, you can't use tools that pre-process your file and remove any added comments that are not supported by JSON, since the file itself is not part of your project's workflow. However, you can add comments as valid JSON properties, For example, going back to our generated `package.json` file, we can comment it as follows:

```json
{
  "name": "e",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bootstrap": "^4.5.2"
  },
  "comments": {
    "dependencies": "We use Bootstrap 5, we will upgrade to v5 once is ready for production",
    "description": "Add a description",
    "license": "Still deciding MIT or BSD"
  }
}
```

This will be a good way for adding comments to your `package.json` file if you maintain a good structure of your comments preferably close to the structure of your `package.json` file itself.

The idea is originally taken from this [post](https://dev.to/napolux/how-to-add-comments-to-packagejson-5doi).

