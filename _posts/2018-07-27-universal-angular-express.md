---
layout: post
title: "Angular 6 Universal Example Application with Express.js"
image: "images/content/universal-angular-express.png"
excerpt: "Throughout this tutorial we are going to build an example, server side rendered, web application with Angular 6 and Express server." 
tags : [angular , express] 
---

Throughout this tutorial we are going to build an example, server side rendered, web app with Angular 6 and Express server. The application is a simple portfolio website to showcase your projects with home, projects and contact pages.

By building this example project we'll learn how to create Angular 6 web applications and how to render them on the server side (So you can have a SEO friendly website), instead of client side, then serve them with Node.js and Express.js server. 

## Generating a New Angular 6 Project 

Let's get started by generating a new Angular 6 web application using Angular CLI 6 (We assume you already have the latest version of Angular CLI installed)

```bash
$ ng new angular-universal-portfolio
```

Next run the local development server with:

```bash
$ cd angular-universal-portfolio 
$ ng serve 
```

Your web app will be served from [http://127.0.0.1:4200](http://127.0.0.1:4200).

## Adding Angular 6 Components 

Next create the required page components (home, projects and contact) using Angular CLI 6:

```bash
$ ng g component home 
$ ng g component projects 
$ ng g component contact
```

## Adding Material Design 6 

To add Meterial Design 6 to your Angular 6 project, you need to install these required dependencies:

```bash
$ npm install --save @angular/cdk
$ npm install --save @angular/material
$ npm install --save hammerjs  
$ npm install --save-dev @types/hammerjs
```

Next you need to import `MaterialModule` and add it to the `imports` in the `app.module.ts` file:

Don't also forget to import `hammerjs`

```ts
    
    import { MaterialModule } from '@angular/material';

    import 'hammerjs';

    @NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent,
        ProjectsComponent    
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'angular-universal-demo'}),
        FormsModule,
        HttpModule,
        MaterialModule,
        RouterModule.forRoot([
        { path: '', component: HomeComponent, pathMatch: 'full'},
        { path: 'projects', component: ProjectsComponent, pathMatch: 'full'},
        { path: 'contact', component: ContactComponent, pathMatch: 'full'},
        
        ])   
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }    
```

Before you can add Material 6 components to your project you also have to add this to your project `styles.css` file:

```css
    @import '~https://fonts.googleapis.com/icon?family=Material+Icons';
    @import '~https://fonts.googleapis.com/icon?family=Roboto';
    @import '~@angular/material/prebuilt-themes/indigo-pink.css';
    body {
        font-family: Roboto;
    }
```

Then in the `tsconfig.app.json` file add:

```json
    "types": [
      "hammerjs"
    ]
```

## Adding Server Side Rendering Support 

To add server side rendering to our Angular 6 application we need to install the `@angular/platform-server` into our project using:

```bash
$ npm install --save @angular/animations
$ npm install --save @angular/platform-server
```

Next we need to install `ts-node`:

```bash
$ npm install --save-dev ts-node
```

To add TypeScript support to Node. 

We also need to install express server

```bash
$ npm install --save express 
```

Since this is the server framework that we are going to use to render and serve our 
app on the server side.

### Adding Server App Module 

Create the `src/app/app.server.module.ts` file then add:

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

### Updating Client App Module 

Next update the `src/app/app.module.ts` file to look like:

```ts    
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { HttpModule } from '@angular/http';
    import { RouterModule } from '@angular/router';
    
    import { HomeComponent } from './home/home.component';
    import { ContactComponent } from './contact/contact.component';
    import { ProjectsComponent } from './projects/projects.component';
    
    import { AppComponent } from './app.component';
    
    @NgModule({
      declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent,
        ProjectsComponent    
      ],
      imports: [
        BrowserModule.withServerTransition({appId: 'angular-universal-demo'}),
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
          { path: '', component: HomeComponent, pathMatch: 'full'},
          { path: 'projects', component: ProjectsComponent, pathMatch: 'full'},
          { path: 'contact', component: ContactComponent, pathMatch: 'full'},
          
        ])   
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
```    

### Adding Server Code 

Create a `src/server.ts` file then add:

```ts
    import 'reflect-metadata';
    import 'zone.js/dist/zone-node';
    import { platformServer, renderModuleFactory } from '@angular/platform-server'
    import { enableProdMode } from '@angular/core'
    import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app.server.module.ngfactory'
    import * as express from 'express';
    import { readFileSync } from 'fs';
    import { join } from 'path';
    
    const PORT = 5000;
    
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

### Launching the Server 

Next in `package.json` change start script to launch the express server:

```json    
    "prestart": "ng build --prod && ngc",
    "start": "ts-node src/server.ts"    
```

Now run you express rendered web app with:

```bash
$ npm start 
```

You server will be listenning from  `http://localhost:5000` 

You can visit this address from your browser then check the HTML source of the page to confirm that your app component, which says *app works!*, is rendered on the server

You should see something similar if you insepct the source code of your page:


```html
<app-root _nghost-c0="" ng-version="4.3.1">
    <h1 _ngcontent-c0="">
        app works!
    </h1>
</app-root>
```

As you can notice, the `AppComponent` is rendered on the server.

Now serve your app using Angular CLI 6 dev server:

```bash
$ ng serve 
```

Go to `http://localhost:4200` with your browser then check the source code again:

    <app-root>Loading...</app-root>

The `AppComponent` component is not rendered on the server.

### Creating the Portfolio Website

Now after setting up server side rendering and successfully launching the express server which renders and serves our Angular 6 components, let's create our portfolio website. We have previously created the essential components: home, projects and contact then setup the routing for them in App Module:    

```ts
    RouterModule.forRoot([
          { path: '', component: HomeComponent, pathMatch: 'full'},
          { path: 'projects', component: ProjectsComponent, pathMatch: 'full'},
          { path: 'contact', component: ContactComponent, pathMatch: 'full'},
          
        ])   
    ]
```

## Conclusion

In this tutorial, we've seen how to create a universal (server side rendered) Angular 6 application.




    


