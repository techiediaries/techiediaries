---
layout: bpost
title: "Add your Angular 10 Proxy Configuration to angular.json"
image: "images/content/angular.png"
excerpt: "You can configure Angular CLI to use a proxy in the angular.json file so you don't need to specify the –proxy-config CLI option each time your run your local development server"
date: 2020-09-06
tags : [angular]
---

You can configure Angular CLI to use a proxy in the `angular.json` file so you don't need to specify the –proxy-config CLI option each time your run your local development server:

```bash
$ ng serve --proxy-config proxy.conf.json
```


Open the the `angular.json` file, and simply add the `proxyConfig` option to the `serve` target as follows:

```json
"architect": {
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
      "browserTarget": "<application-name>:build",
      "proxyConfig": "src/proxy.conf.json"
    },
```

>You can use the proxying support in the webpack dev server to divert certain URLs to a backend server, by passing a file to the --proxy-config build option. For example, to divert all calls for http://localhost:4200/api to a server running on http://localhost:3000/api, take the following steps. [Source](https://angular.io/guide/build#proxying-to-a-backend-server).

Next, add a new `src/proxy.conf.json` file with the following configuration:

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

Next, simply run the `ng serve` to run your server with the configured proxy information.

