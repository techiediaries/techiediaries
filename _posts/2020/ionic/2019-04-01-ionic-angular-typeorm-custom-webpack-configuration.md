---
layout: post
title: "Build a CRM App with Ionic 5/Angular and TypeORM:  Custom Webpack Configuration [Part 1]"
image: "images/content/ionic.png"
excerpt: "Throughout this tutorial series, we'll be building a CRM application with Ionic 5 and TypeORM. In this first tutorial we'll learn to integrate TypeORM with Ionic 5/Angular and a custom Webpack configuration" 
date: 2020-02-14
tags : [ionic] 
---


Throughout this tutorial series, we'll be building a CRM application with Ionic 5/Angular and TypeORM.

In this first part tutorial, we'll see how to:

- Install the Ionic CLI 5,
- Generate a new Ionic 5 project,
- Serve your application in development and use the browser to test it,
- Install TypeORM from `npm`,
- Set up and integrate TypeORM with your Ionic 5 project.
- Use a custom webpack configuration with Ionic 5/Angular.
  

You can also read how to use [Ionic 5 with Node and TypeORM](https://www.techiediaries.com/angular/jwt-rest-api-auth-node-typescript-typeorm-database/) to build a full-stack chat application with front-end and back-end apps.

Let's get started with the prerequisites!

## Prerequisites

In order to complete this tutorial, you will need a few requirements:

- Node.js and NPM installed on your system;
- Basic knowledge of TypeScript.

## Installing Ionic CLI 5

[The Ionic command-line interface](https://ionicframework.com/docs/cli/) or CLI is the official tool for generating Ionic projects and work with them.

If you have Node and NPM installed in your machine, open a new terminal and run the following command to install Ionic CLI v4:

```bash
$ npm install -g @ionic/cli
```

## Creating an Ionic 5 Project

After installing the Ionic CLI, you can now proceed to create a new project. Navigate to your working directory and run the following commands:

```bash
$ ionic start  
```

You will be prompted for entering:

- The project's name, enter `ionic-crm`,
- The starter template, choose `sidemenu`.

After that, the project will be generated and dependencies will be installed from `npm`.

Finally, you will be prompted if you would like to **Install the free Ionic Appflow SDK and connect your app? (Y/n)** Type **n** as we'll not use the cloud services in this tutorial.

Now, navigate to your project's root folder and start the development server:

```bash
$ cd ionic-crm
$ ionic serve
```

You server will be listening from the `127.0.0.1:8100` address.

## Installing and Integrating TypeORM

After creating the project, let's now install and integrate TypeORM. Open a new terminal, navigate to your project and install TypeORM from `npm`:

```bash
$ cd ionic-crm
$ npm install typeorm --save
```

As the time of this writing, **typeorm v0.2.16** will be installed.

Next, install Node.js types:

```bash
$ npm install @types/node --save-dev
```

Since we'll be doing testing in the browser we also need to install `sql.js`:

```bash
$ npm install sql.js --save
```

As the time of this writing, **sql.js v0.5.0** will be installed.

Next, open the `tsconfig.json` file and add `"typeRoots": ["node_modules/@types"]` under `compilerOptions` if it's not already there.

Next, open the `src/tsconfig.app.json` and change accordingly:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "types": ["node"],
    "paths": {
      "typeorm": ["node_modules/typeorm/browser"]
    }
  },
  "exclude": [
    "test.ts",
    "**/*.spec.ts"
  ]
}
```

## Adding a Custom Webpack Configuration

Next, create a custom Webpack configuration file in the root of your project:

```bash
$ touch custom.webpack.config.js 
```

Open the `custom.webpack.config.js` file and add the following code:

```js
const webpack = require('webpack');
console.log('The custom config is used');
module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            'window.SQL': 'sql.js/js/sql.js'
        }),
        new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
            result.request = result.request.replace(/typeorm/, "typeorm/browser");
        })
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    optimization: {
        minimize: false
    }
};
```

Next, head back to your terminal and install the `@angular-builders/custom-webpack` and `@angular-builders/dev-server` packages from npm:

```bash
$ npm install --save @angular-builders/custom-webpack
$ npm install --save @angular-builders/dev-server
```

The **@angular-builders/custom-webpack v7.4.3** and **@angular-builders/dev-server v7.3.1
** packages will be installed.

The [`@angular-devkit/build-angular:dev-server`](https://www.npmjs.com/package/@angular-devkit/build-angular)  builder makes use of the custom webpack builder to get webpack configuration. Unlike the default  `@angular-devkit/build-angular:dev-server`  it doesn't use`@angular-devkit/build-angular:browser`  configuration to run the development server. If you use  `@angular-builders/dev-server:generic`  along with  `@angular-builders/custom-webpack:browser`,  `ng serve`  will run with custom configuration provided in the latter.


Now, open the `angular.json` file, locate the `projects -> app -> architect -> build -> builder` entry and swap **@angular-devkit/build-angular:browser** with **@angular-builders/custom-webpack:browser**.

Next, under the `options` object, add `"customWebpackConfig": {"path": "./custom.webpack.config.js"}`:

```json
  "projects": {
    "app": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {},
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./custom.webpack.config.js"
            },
``` 


Next, change the `builder` property under the `serve` property to `@angular-builders/dev-server:generic`:

```json
  "projects": {
    "app": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {},
      "architect": {
        "build": {},
        "serve": {
          "builder": "@angular-builders/dev-server:generic",
          "options": {
            "browserTarget": "app:build"
          },
```

Now, if you serve your application again, the custom Webpack configuration will be used and you should see **The custom config is used** message displayed in your terminal.

![Ionic 5 custom webpack configuration](https://i.imgur.com/VGTVtcj.png)



 
## Creating a First Entity

Let's create an example entity. In your `src/` folder create a folder named `entities`:

```bash
$ cd src/
$ mkdir entities
```

Next, create a `contact.ts` file and add the following code:

```ts
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('contact')
export class Contact {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}
```

We created a `Contact` entity with `id`, `firstName` and `lastName` fields.

## Setting up TypeORM

Now, let's set up TypeORM. In your terminal, run the following command to generate a service:

```bash
$ ionic generate service orm
```

Next, open the `src/app/orm.service.ts` and add the following imports:

```ts
import { Platform } from '@ionic/angular';

import {
  createConnection,
  ConnectionOptions,
  getConnection,
  Connection
} from 'typeorm';

import { Contact } from './entities/contact';
```

Next, inject `Platform`:

```ts
export class OrmService {

  constructor(private platform: Platform) { }
```

Next, add the following method which creates a connection:

```ts
  private createConnection(): Promise<Connection> {
    let dbOptions: ConnectionOptions;

    if (this.platform.is('cordova')) {

      dbOptions = {
        type: 'cordova',
        database: '__crmdb',
        location: 'default'
      };
    } else {

      dbOptions = {
        type: 'sqljs',
        location: 'browser',
        autoSave: true
      };
    }
    
    Object.assign(dbOptions, {
      logging: ['error', 'query', 'schema'],
      synchronize: true,
      entities: [
        Contact
      ]
    });

    return createConnection(dbOptions);
  }
```

Next add the `ready()` method:

```ts
  async ready() {
    try {

      await getConnection();

    } catch (ex) {

      console.log('Connection not established!', ex);

      await this.createConnection();

    }
  }
```

Now, open the `src/app/app.component.ts` file and import then inject `OrmService`:

```ts
// [...]
import { OrmService } from './orm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ormService: OrmService
  ) {
    this.initializeApp();
  }
```

Next, change the `initializeApp()` method to call the `ready()` method of `OrmService`:

```ts
  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    await this.ormService.ready();
  }
```


