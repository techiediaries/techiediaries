---
layout: bpost
title: "Install Node.js and Angular CLI with GitHub Actions"
image: "images/content/blazor.png"
excerpt: "A quick example to show you how to install Node.js and Angular CLI in GitHub Actions"
date: 2020-08-30
tags : [git, github]
---

A quick example to show you how to install Node.js and Angular CLI in GitHub Actions.

```yaml
- uses: actions/checkout@v1
- name: Installing Node
  uses: actions/setup-node@v1
     with:
        node-version: 12.8
- name: Installing npm dependencies including the Angular CLI
   run: npm install     
- name: Build
   run: npm run build -- --prod
```

We first install Node, next we run the `npm install` and `npm build` commands to install the Angular project dependencies including Angular CLI and build the project for production.
