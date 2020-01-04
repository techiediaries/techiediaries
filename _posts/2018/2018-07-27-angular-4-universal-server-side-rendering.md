---
layout: post
title: "Building Angular 6|7 Universal Apps (Server Side Rendering)"
image: "images/content/angular-4-universal.png"
excerpt: "In this tutorial we'll see how to render Angular 6 universal apps on the server " 
tags : [angular]
---

Angular 6|7 allows developers to build modern SPAs (or Single Page Apps) which are considered the modern apps of our time. SPAs have many advantages over old traditional apps such as:

- The client is responsible of doing most rendering. For the server its major role is serving the app files to the client.
- No page refresh.
- No need for reaching the server for every action.
- Easy navigation between different pages.
- Improved performance.
- No extra requests to server to load new pages.
- User friendliness etc.


As seen, SPAs have a lot of advantages, particularly an improved User Experience, which is what matters the most when building apps. But they have a major SEO problem, they can't be indexed by Search engines.

This is not totally correct! Since Google can index and render JavaScript apps but not all engines are as advanced as Google. Also social networks such as Facebook only understands server rendered HTML. You can easily notice this when trying to share an SPA website on Facebook or other social networks. The social 
network won't be able to recognize the meta content of your shared page like the title.

So to make sure, every search engine and social network out there can recognize your website content, you need
to implement the old server side rendering or create what we call **Universal** apps which are SPAs with server side rendering.

## Getting started with Angular Universal 

Angular Universal is a technology that allows server side rendering for Angular apps.

Thanks to Angular universal, you can build apps that have the best features of both worlds such as: 

- Performance: Since your app is rendered on the server, first time users will quickly see a rendered view without waiting for the client to complete rendering.
- SEO friendliness: Many search engines and social networks can read only plain HTML so to optimize your website for these engines you need to have server side rendering 
- Social networks friendliness: By enabling server side rendering, social media websites can correclty display previews of your apps or websites when sharing links.  

Starting from Angular 4.0.0 the majority of Angular Universal code is located in the `@angular/platform-server` package.

## Creating an Angular 6 Project

Now let's create an Angular 6 demo project to show how to add server side rendering.

You need to have Angular CLI 6 installed then open your terminal and run: 

```bash
$ ng new angular-universal-demo
$ cd angular-universal-demo 
```

Next install Angular Universal located in the `@angular/platform-server` package: 

```bash
$ npm install --save @angular/platform-server
```

You also need to install the `@angular/animations` package otherwise you'll get errors:

```bash
$ npm install --save @angular/animations
```


Now, open the `src/app/app.module.ts` file then update it to reflect these changes:

```ts
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { HttpModule } from '@angular/http';

    import { AppComponent } from './app.component';

    @NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'angular-universal-demo'}),
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }
```

Now you need to add a server app module so go ahead and create a new TypeScript file `src/app/app.server.module.ts` then copy and paste the following code: 

```ts
    import { NgModule } from '@angular/core';
    import { ServerModule } from '@angular/platform-server';
    import { AppModule } from './app.module';
    import { AppComponent } from './app.component';

    @NgModule({
    imports: [
        ServerModule,
        AppModule
    ],
    bootstrap: [AppComponent]
    })
    export class AppServerModule { }
```

Next create an Express server in the `src/server.ts` file:

```ts
    import 'reflect-metadata';
    import 'zone.js/dist/zone-node';
    import { platformServer, renderModuleFactory } from '@angular/platform-server'
    import { enableProdMode } from '@angular/core'
    import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app.server.module.ngfactory'
    import * as express from 'express';
    import { readFileSync } from 'fs';
    import { join } from 'path';

    const PORT = 4000;

    enableProdMode();

    const app = express();

    let template = readFileSync(join(__dirname, '..', 'dist', 'index.html')).toString();

    app.engine('html', (_, options, callback) => {
    const opts = { document: template, url: options.req.url };

    renderModuleFactory(AppServerModuleNgFactory, opts)
        .then(html => callback(null, html));
    });

    app.set('view engine', 'html');
    app.set('views', 'src')

    app.get('*.*', express.static(join(__dirname, '..', 'dist')));

    app.get('*', (req, res) => {
    res.render('index', { req });
    });

    app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}!`);
    });
```


Open the `src/tsconfig.app.json` file and exclude the `server.ts` file:

```json
    {
    "extends": "../tsconfig.json",
    "compilerOptions": {
        "outDir": "../out-tsc/app",
        "module": "es2015",
        "baseUrl": "",
        "types": []
    },
    "exclude": [
        "server.ts",
        "test.ts",
        "**/*.spec.ts"
    ]
    }
```

Next, open the `tsconfig.json` and add `angularCompilerOptions`:

```json
    {
    "compileOnSave": false,
    "compilerOptions": {
        "outDir": "./dist/out-tsc",
        "baseUrl": "src",
        "sourceMap": true,
        "declaration": false,
        "moduleResolution": "node",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "target": "es5",
        "typeRoots": [
        "node_modules/@types"
        ],
        "lib": [
        "es2016",
        "dom"
        ]
    },
    "angularCompilerOptions": {
        "genDir": "./dist/ngfactory",
        "entryModule": "./src/app/app.module#AppModule"
    }  
    }
```

## Installing ts-node and Running your Demo Server

Now you need to install `ts-node` via npm: 

```bash
$npm install -D ts-node
```

Next, open the `package.json` file and add these two scripts:

```json
    "prestart": "ng build --prod && ngc",
    "start": "ts-node src/server.ts"
```

You can now test your demo by running 

```bash
$ npm run start
```

You should be able to visit `http://localhost:4000` with your browser to see your old message *app works!*.

You can find the source code of this demo at <a href="https://github.com/techiediaries/angular-universal-demo">GitHub</a>    


## Conclusion

We have seen how to build Universal SPA application with Angular 6 which can be rendered on the server side.


