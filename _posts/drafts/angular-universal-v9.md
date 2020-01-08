# Angular Universal v9: Upgrade and What's New?

## The  _"new"_  & improved Angular Universal ✨

> **Disclaimer:**  These packages are still in  `RC`  (release candidate), Angular v9 is as well. Some things  _may_  change slightly before final release, but we will make sure to keep this page updated in case that happens!

#### TL;DR

1.  Make sure your Angular application is already upgraded to the latest v9 (RC)
2.  Install the latest (RC) Universal schematics  `ng add @nguniversal/express-engine@next`
3.  If you're coming from an existing Universal schematic v8 (express-engine or hapi-engine) upgrade via "ng update" ie:  
    `ng update @nguniversal/express-engine —-next`
4.  For a LIVE-reloading Node & browser dev-server:  
    `ng run <app_name>:serve-ssr`
5.  Automatically generate static prerendering (via guess-parser):  
    `ng run <app_name>:prerender`


## What's new with Universal?

**The Angular Universal schematics**  has received some  **_HUGE_**  and long-awaited updates and improvements! Bringing us effortless static prerendering (with the help of Guess.js  [guess-parser](https://github.com/guess-js/guess/tree/master/packages/guess-parser)  predicting routes), and a vastly simplified & improved developer experience! Behind the scenes, the schematic also comes with new Angular "builders" (that do a lot of the heavy lifting), compiling your application in parallel, handling prerendering, and much more.

> _Angular Universal (server-side rendering) is now truly a 1st class citizen, having the developer experience and build automation that we all know and love from Angular itself._

#### Upgrading an Existing Angular App

You can setup the latest Angular Universal schematics with an existing Angular CLI project, just make sure it has already been updated to the latest CLI v9 RC.

For help upgrading your Angular application itself from 8 to 9, please refer to  [https://update.angular.io/#8.0:9.0](https://update.angular.io/#8.0:9.0).

#### Upgrading an existing Universal App

If you're coming from an  _existing_  Universal application that was generated with the v8 @nguniversal engine schematic (express-engine or hapi-engine). ( 🙏[Alan Agius](https://twitter.com/AlanAgius4)  )

`ng update`  can now help you automatically upgrade to the latest schematic!

> **NOTE**: During this update several  **backup files will be created**, one of them for  `server.ts`. If this file defers from the default one, you may need to copy some changes from the server.ts.bak to server.ts  _manually_. These changes were needed to make the server.ts compatible with Ivy (ie: using the AppServer Module instead of NgFactory because it is no longer produced by default in Ivy)

Existing  **express-engine**  generated app:

```shell
$ ng update @nguniversal/express-engine —-next

```

Existing  **hapi-engine**  generated app

```shell
$ ng update @nguniversal/hapi-engine —-next

```

**These updates will automatically:**

-   Update your existing project configuration and structure to be compatible with Ivy
-   Remove the previous webpack config & @nguniversal/module-map-ngfactory-loader
-   Add prerender & live-server "builder" configurations

----------

## Getting Started with Angular Universal ⚡️

> **NOTE**: In this demo we're going to start off with a brand new v9-rc Angular application scaffolded by the Angular CLI.

First, let's make sure we have the latest  `@angular/cli@next`  installed (`@next`  because we want to install the upcoming v9  _RC_  verison).

```shell
$ npm i -g @angular/cli@next

# ? Would you like to add Angular routing? (y/N) y

```

Now let's create a new Angular application (we are going to call our application  `angular-universal-v9`, but name yours whatever you prefer!)

```shell
$ ng new angular-universal-v9

```

### The updated @nguniversal Schematics

Next, let's setup our application to utilize the latest (RC) Angular Universal schematics provided from  `@nguniversal/`, make sure to  `cd`  into your new/existing applications root after running it.

ie:  `$ cd angular-universal-v9`

```shell
$ ng add @nguniversal/express-engine@next

```

## What's new?

Let's open up the application in our favorite editor to take a look at what we have so far.

If you're coming from previous versions of the Angular Universal schematic (or it's all new to you), you'll notice that our project now has a few new important files, and some new additions to your  `package.json`  scripts.

```python
# Sample output:

CREATE src/main.server.ts (298 bytes)
CREATE src/app/app.server.module.ts (318 bytes)
CREATE tsconfig.server.json (325 bytes)
CREATE server.ts (1937 bytes)

UPDATE package.json (1821 bytes)
UPDATE angular.json (5205 bytes)
UPDATE src/main.ts (432 bytes)
UPDATE src/app/app.module.ts (438 bytes)
UPDATE src/app/app-routing.module.ts (284 bytes)

```

Taking a look at our  `package.json`, we can see we now have a few new additional scripts / shortcuts to running some of the new features of the Angular Universal builders!

```json
"scripts": {
  ...
  "dev:ssr": "ng run angular-universal-v9:serve-ssr",
  "serve:ssr": "node dist/angular-universal-v9/server/main.js",
  "build:ssr": "ng build --prod && ng run angular-universal-v9:server:production",
  "prerender": "ng run angular-universal-v9:prerender"
}

```

### "Live" Angular Universal Development

Let's fire up our first script just to see how much the developer experience has improved with the new Angular builders that will be handling all of the magical parellel compilation (behind the scenes).

```shell
$ npm run dev:ssr

```

This is now building both our  _Client_  **AND**  _Server_  bundles simultaneously via Angular builders. Kudos to the amazing effort by  [Manfred Steyer](https://twitter.com/ManfredSteyer)  and others for making this happen!

```shell
** Angular Universal Live Development Server is listening on http://localhost:4200 **

```

Now fire up  `https://localhost:4200`  as you would a normal Angular application, and take a look!

It may look like your standard Angular CLI generated application - but go ahead and  **"View Source"**!

```html
<!-- view-source:localhost:4200 -->

<!-- ... -->
<body>
<app-root _nghost-sc20="" ng-version="9.0.0-rc.7">
  <div _ngcontent-sc20="" role="banner" class="toolbar">
    <img _ngcontent-sc20="" width="40" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2v">
    <span _ngcontent-sc20="">Welcome</span>
    <!-- ... -->

```

We are getting a  _live-preview_  of our Angular Application  **server-side rendered**! Go ahead and make some changes to  `app.component.html`  (or any other file) and notice your terminal re-compiling both client&server bundles, and even  **live-reloading**  the webpage itself (via browsersync) once both have completed!

**🥂 Amazing 🥂**

A nice use-case for this is to actively test your entire application in real-time, letting you refresh different routes, ensuring that there aren't any  _errors_  with your application when being rendered from the server. (Take for example, you're using the global  `window`  object in your code-base somewhere, you could spot the error before it gets to production and make the neccessary fixes.)

----------

## Angular Static Prerendering

Prerendering is now  _easier than ever_  thanks to the new schematics, and can be generated via one simple command!

```shell
$ ng run <app_name>:prerender

```

Or shorthand version in our package.json:

```shell
$ npm run prerender

```

----------

## Real-world Prerendering Demo 🧭

> **NOTE**: Demo code can be found on  [GitHub here](https://github.com/TrilonIO/angular-universal-v9)  if you'd prefer to skip ahead!

For fun, let's setup a few quick routes & components so we can really take it for a test drive, and see what kind of options we have to handle more complex scenarios such as prerendering  _dynamic_  or parameter-based routes.

```python
 # example routes we're going to create & demo

 /home
 /products
 /products/:id (ie: /products/1124, /products/05919251, etc)

```

Let's create the home & products modules & routes real quick:

```shell
$ ng g m home --route home --module app
$ ng g m products --route products --module app

```

Now let's add a quick dynamic component & route for specific  `/products/:id`  pages now:

```shell
$ ng g c products/product --inline-template --inline-style --skip-tests

```

Next, let's update the newly created  `product.component.ts`  component to bring in the dynamic routing param (for our little demo).

```ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  template: `
    <p>
      Product ID = {{ productId }} // 👈
    </p>
  `,
  styles: []
})
export class ProductComponent {

  public productId = this.route.snapshot.paramMap.get('id'); // 👈

  constructor(private route: ActivatedRoute) { }
}

```

Next, open up the  `products-routing.module.ts`  to include this new dynamic component and param  `:id`  that we're going to use.

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':id', component: ProductComponent} // 👈👈👈
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

```

Lastly, let's clean up our  `app.component.html`  and make it super simple:

```html
<h1>Universal v9 Demo</h1>
<router-outlet></router-outlet>

```

### Demo time

So let's fire up that prerendering script, and see what we get!

```shell
$ npm run prerender

# Or:
$ ng run angular-universal-v9:prerender

```

```python
# sample output
Prerendering 2 route(s) to /angular-universal-v9/dist/angular-universal-v9/browser

CREATE /angular-universal-v9/dist/angular-universal-v9/browser/home/index.html (27819 bytes)
CREATE /angular-universal-v9/dist/angular-universal-v9/browser/products/index.html (27831 bytes)

```

**It worked!!**  ✨✨✨

If you go to your  `/dist`  folder and open up each index.html file inside /home/ and /products/ folders you should see the correct templates rendered inside, javascript bundles included, etc.

```html
<!-- /dist/angular-universal-v9/browser/home/index.html -->
<p _ngcontent-sc21="">home works!</p>

<!-- /dist/angular-universal-v9/browser/products/index.html -->
<p _ngcontent-sc21="">products works!</p>

```

If you want to fire up a quick testing/demo server, you can utilize something like  `http-server`.

```shell
$ npm i -g http-server
$ http-server ./dist/angular-universal-v9/browser

```

Should output:

```shell
Starting up http-server, serving ./dist/angular-universal-v9/browser
Available on:
  http://127.0.0.1:8080
  http://127.94.0.1:8080
  http://127.94.0.2:8080
  http://192.168.0.12:8080
Hit CTRL-C to stop the server

```

Now you can test locally and view  `http://127.0.0.1:8080/home`  or  `http://127.0.0.1:8080/products`!

----------

**But what about our dynamic / parameterized-routes**  like  `/products/:id`  (that we have in our demo)?

It seems guess-parser is unable to be detect these routes automatically, but that makes sense. How could it know  _WHAT_  are -real- possible values here!

How can we handle these situations?

### Prerendering Dynamic / Parameterized Routes

Luckily we have 2 new options for  _manually_  adding dynamic routes that can't be automatically detected via guess-parser. After all, we surely have a database full of IDs where these "products" get their data from, right?

One option during prerendering is that we can pass in the  `--routes`  flag for each manual route in the terminal, - OR - pass in an entire  `.txt`  file containing  _all_  of the additional routes needed.

> **TIP**: Whichever method you use, you only need to include  _additional_  routes that aren't automatically detected by the guess-parser.

```shell
$ ng run <app_name>:prerender --routes '/products/1' --routes '/products/555'

```

**Optimal Approach:**  The simpler approach would be to provide all of your required dynamic/parameter-based routes within the  `routes.txt`  file, and utilize the  `--routesFile`  flag.

**Routes.txt file:**

```txt
/products/1
/products/555

```

Now pass in the  `--routesFile`  option.

```shell
$ ng run <app_name>:prerender --routesFile routes.txt

```

> **TIP:**  Ideally you'd want to create a script (ie: Node.js script) that hits an API/Database and gets all potential ID's (in our specific scenario), and outputs everything into a generated  `routes.txt`  automatically. Otherwise this would be quite the tedious and unmanageable task to handle manually!

#### Testing it in our Demo app:

If we created a  `routes.txt`  file with those two ID's, (1, 555) we should get the sample output prerendered below!

```python
Prerendering 4 route(s) to /angular-universal-v9/dist/angular-universal-v9/browser
CREATE /angular-universal-v9/dist/angular-universal-v9/browser/products/index.html (1310 bytes)
CREATE /angular-universal-v9/dist/angular-universal-v9/browser/products/1/index.html (1282 bytes)
CREATE /angular-universal-v9/dist/angular-universal-v9/browser/products/555/index.html (1284 bytes)
CREATE /angular-universal-v9/dist/angular-universal-v9/browser/home/index.html (1298 bytes)

```

**We just prerendered routes with dynamic parameters!**

----------

## Dynamic Server-side rendering

Sometimes our applications are  _constantly_  in a state of change, and we are unable to simply prerender pages. In this instance, we need to do standard dynamic SSR, utilizing a live Node.js server that receieves page requests, serializes our application, and returns the html in  _real-time_.

For this we have two scripts in our  `package.json`, and that  `server.ts`  file at the root of your project that you may have noticed!

```bash
// Build the client/server
$ npm run build:ssr

// Run the Node.js server
$ npm run serve:ssr

```

These scripts will bundle up the client/server bundles, the Node.js express server (found in  `server.ts`), and then  _RUN_  the Node.js application at  `http://localhost:4000`  so we can test it!

Fire up your browser to  `http://localhost:4000`  and you can see everything in action, with View Source populated just like before.

The only difference is now these pages are being server-side rendered  _on-demand_  PER request!

----------

## In Conclusion

-   Angular Universal is now easier than ever!
-   Remember that Angular itself (and the schematics) are currently in RC (release candidate) so be aware that there may possibly be some changes before the final release.
-   Make sure your Angular application is already upgraded to the latest v9 (RC)
-   If you're coming from an existing Universal schematic v8 (express-engine or hapi-engine) upgrade via "ng update" ie:  
    `ng update @nguniversal/express-engine —-next`
-   Install the latest (RC) Universal schematics  `ng add @nguniversal/express-engine@next`
-   For a LIVE-reloading Node & browser dev-server:  
    `ng run <app_name>:serve-ssr`
-   Prerendering: (via guess-parser):  
    `ng run <app_name>:prerender`
-   Dynamic SSR:  
    `npm run build:ssr`