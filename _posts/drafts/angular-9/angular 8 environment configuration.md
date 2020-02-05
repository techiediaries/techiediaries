This article assumes you at least have an introductory level of knowledge about  **Angular and the Angular CLI**. If you need a refresher, check out the  [Angular Tour of Heroes tutorial](https://angular.io/tutorial).

https://medium.com/angular-in-depth/becoming-an-angular-environmentalist-45a48f7c20d8
https://www.w3resource.com/angular/angular-workspace-configuration.php

In this article we will:

1.  Explore the default environments the Angular CLI creates.
2.  Modify the environment information.
3.  Explain how to create a new environment with our own configuration.

In this article I show building the examples using an Angular Workspace called  [**ng-configuration**](https://github.com/t-palmer/ng-configuration). For your convenience I have made it available on  [GitHub](https://github.com/t-palmer/ng-configuration).

# What are Angular Application Environments?

An  **Angular Application Environment**  is JSON configuration information that tells the build system which files to change when you use  `ng build`  and  `ng serve`.

Let’s say you have a back end REST API deployed on a server that provides services to your Angular application. You might have a URL for your own development server, another for the test server, and another for the production server. Using Angular Application Environments you can set up three configurations and specify which to use for  `ng build`  and  `ng serve`.

This article is targeted at  **Angular 6**  which really improved both the ease of use and the documentation for Application Environments. The official Angular documentation for environments is here:  
[https://github.com/angular/angular-cli/wiki/stories-application-environments](https://github.com/angular/angular-cli/wiki/stories-application-environments)

# Getting Started

Make sure you have installed version 6 of the  [Angular CLI](https://cli.angular.io/). Let’s use the Angular CLI to create a workspace called  **ng-configuration**:

ng new ng-configuration

NOTE: To support IE see my article:  [Angular and Internet Explorer](https://blog.angularindepth.com/angular-and-internet-explorer-5e59bb6fb4e9).

We can do a quick test to see the default application running:

cd ng-configuration  
ng serve

Then open your browser to:  [http://localhost:4200](http://localhost:4200/)

![](https://miro.medium.com/max/50/1*AczZhlP4UbF-GmA7WGEGZw.png?q=20)

![](https://miro.medium.com/max/712/1*AczZhlP4UbF-GmA7WGEGZw.png)

# Introducing Configurations

By default the Angular CLI creates a  `src/environments`  folder with two environment files in it:  `environment.ts`  and  `environment.prod.ts`.

These files are referenced in our  `angular.json`  file. Take a look and find the following lines:

"configurations": {  
"production": {  
"fileReplacements": [  
{  
"replace": "src/environments/environment.ts",  
"with": "src/environments/environment.prod.ts"  
}  
],  
"optimization": true,  
"outputHashing": "all",  
"sourceMap": false,  
"extractCss": true,  
"namedChunks": false,  
"aot": true,  
"extractLicenses": true,  
"vendorChunk": false,  
"buildOptimizer": true  
}  
}

Notice the  `fileReplacements`  array. This tells  `ng build`  and  `ng serve`, “If I use the  **production**  configuration, replace the contents of the  **environment.ts**  file with the contents of the  **environment.prod.ts**  file.”

# A Simple Environment Example

Let’s try a very simple example that shows how to switch between our  **default**  and  **production**  configurations and display some configuration data from the proper environment file.

Modify your  `src\app\app.component.html`  and  `src\app\app.component.ts`  files to look like this:

In  `app.component.ts`  take a look at lines 2 and 10:

import { environment } from '../environments/environment';env = environment;

This imports the environment file as  `environment`. Then we set our local variable  `env`  so our template can access it. Remember that our component template can only access public members on our component so it wouldn’t be able to see  `environment`  directly.

Then we display the raw  **json**  object in our component’s template like this:  
`<pre>{{env | json}}</pre>`

First we will do  `ng serve`  using the default:

ng serve

Open your browser to:  [http://localhost:4200](http://localhost:4200/)  and you should see something like this:

![](https://miro.medium.com/max/60/1*sysp32QGVGEfWqIn_HWA2A.png?q=20)

Note that this matches what we see in our default  `src\environments\environment.ts`  file.

Now let’s try using the  `prod`  environment file. To do this we will run  `ng serve`  using the  **production**  configuration:

ng serve --configuration=production

Now the GUI shows us what is in  `src\environments\environment.prod.ts`.

![](https://miro.medium.com/max/60/1*zIcdS0KPWMQBBFgOWR1E5g.png?q=20)

Because we used the  **production**  configuration flag, Angular replaced the contents of our  `environment.ts`  file with the contents of our  `environment.prod.ts`  file.

# Modifying Configuration Information

Take a look again at the  `src/environment/environment.ts`  file. Notice that it is  **TypeScript**  and that it exports a single object called  `environment`.

export const environment = {  
production: false  
};

Let’s update the object to add the name of the environment. Remember that  `src/environment/environment.ts`  will be used by default. So modify it to look like this:

export const environment = {  
production: false,  
name: 'default'  
};

Now serve the application using the defaults:

ng serve

Now in our component we see the updated configuration information.

![](https://miro.medium.com/max/60/1*D5c5ZSjI56zUfBlxpUjVlg.png?q=20)

Of course, we can add things like service URLs, debug logging flags, etc. or whatever data our Angular application needs.

**IMPORTANT**: All the data in the environment file will be visible to the client.

> **NEVER** put any sensitive information like passwords or secret keys in your environment files.

# Adding Environments

You can also create your own environments. Let’s add a new environment and name it  **test**.

Create a new environment file:  
`src\environments\environment.test.ts  
`with the contents:

export const environment = {  
production: false,  
name: 'test'  
};

We need to tell  `angular.json`  about our new environment file. In the  `build`  element there is a  `configurations`  object. Add a new object for our  **test**  configuration so that it looks like this:

"configurations": {  
"production": {  
"fileReplacements": [  
{  
"replace": "src/environments/environment.ts",  
"with": "src/environments/environment.prod.ts"  
}  
],  
"optimization": true,  
"outputHashing": "all",  
"sourceMap": false,  
"extractCss": true,  
"namedChunks": false,  
"aot": true,  
"extractLicenses": true,  
"vendorChunk": false,  
"buildOptimizer": true  
},  
"test": {  
"fileReplacements": [  
{  
"replace": "src/environments/environment.ts",  
"with": "src/environments/environment.test.ts"  
}  
]  
}  
}

Now, this modification only affects  `ng build`. We want to also be able to use it with  `ng serve`. So we need to make one more change.

In the  `serve`  element add a reference to our  **test**  configuration. It should look like this:

"serve": {  
"builder": "@angular-devkit/build-angular:dev-server",  
"options": {  
"browserTarget": "ng-configuration:build"  
},  
"configurations": {  
"production": {  
"browserTarget": "ng-configuration:build:production"  
},  
"test": {  
"browserTarget": "ng-configuration:build:test"  
}  
}  
},

And now we can serve our application using the  **test**  environment:

ng serve --configuration=test

![](https://miro.medium.com/max/60/1*OsV0j9mrL4S_nhk2OJzeDQ.png?q=20)

# Summary

Now we know how to add our own environments.

Use  **Angular Application Environments**  when you need a convenient way to manage configuration information for your applications.
