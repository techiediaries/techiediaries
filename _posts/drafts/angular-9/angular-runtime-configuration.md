(https://www.tektutorialshub.com/angular/angular-runtime-configuration/#source-code)

## Where to Store configuration

The Angular has the  [environment variables](https://www.tektutorialshub.com/angular/angular-environment-variables/)  where you can keep the runtime settings, but it has limitations. The.setting of the  [environment variables](https://www.tektutorialshub.com/angular/angular-environment-variables/)  are defined at build time and cannot be changed at run time.

We can keep the configuration information in a database. But we still need to store the REST endpoints to connect to the database.

The right approach is to store the configuration information in the file in a secured location. We will deploy the configuration file along with the App. The App can load the configuration from it when the application loads.

For the examples in this tutorial, we will keep it in the  `src/app/assets/config`  folder

You can use any format to store the configuration. The popular choice is either  **JSON**  or  **XML**  format. For Example  `appConfig.json`  or  `appConfig.xml`

Below is the typical structure of configuration file in  **JSON**  format

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

{

"appTitle":  "APP_INITIALIZER Example App",

"apiServer"  :  {

"link1"  :"http://amazon.com",

"link2"  :"http://ebay.com"

},

"appSetting"  :  {

"config1"  :  "Value1",

"config2"  :  "Value2",

"config3"  :  "Value3",

"config3"  :  "Value4"

}

}

## When to read the configuration

Some of the configuration information is needed before we load our first page. Hence it is better to read the configuration very early in the application. The Angular provides the injection token named  [APP_INITIALIZER](https://www.tektutorialshub.com/angular/angular-how-to-use-app-initializer/), which it executes when the application starts.

  
[Best Angular Books](https://www.tektutorialshub.com/angular/angular-best-books/)  
**The Top 8  [Best Angular Books](https://www.tektutorialshub.com/angular/angular-best-books/), which helps you to get started with Angular**

### APP_INITIALIZER

The `[APP_INITIALIZER](https://www.tektutorialshub.com/angular/angular-how-to-use-app-initializer/)` is  the predefined injection token provided by Angular. The Angular will execute the function provided by this token when the application loads. If the function returns the promise, then the angular will wait until the promise is resolved. This will make it an  ideal  place to read the configuration and also to perform some initialization logic before the application is initialized.

To use  `[APP_INITIALIZER](https://www.tektutorialshub.com/angular/angular-how-to-use-app-initializer/)`  first we need to import it our Root Module.

1

2

3

import  {  NgModule,  APP_INITIALIZER  }  from  '@angular/core';

Next, We need to create a service, which is responsible for reading the configuration file. The  `AppConfigService`  in the example below loads the configuration in its  `load`  method

1

2

3

4

5

6

7

8

9

@Injectable()

export  class  AppConfigService  {

constructor(private  http:  HttpClient)  {}

load()  {

//Read Configuration here

}

}

Next, create a factory method, which calls the  `load`  method of  `AppConfigService`. We need to inject the  `appConfigService`  into the factory method as shown below

1

2

3

4

5

export function initializeApp(appConfigService:  AppConfigService)  {

return  ()  =>  appConfigService.load();

}

Finally, use the  `[APP_INITIALIZER](https://www.tektutorialshub.com/angular/angular-how-to-use-app-initializer/)`  token to provide the  `initializeApp`  using the  `useFactory`. Remember to use the  `deps`  to add  `AppConfigService`  as dependency as the  `initializeApp`  uses that service. The  `multi: true`  allows us to add more than one provider to the  `[APP_INITIALIZER](https://www.tektutorialshub.com/angular/angular-how-to-use-app-initializer/)`  token.

1

2

3

4

5

6

providers:  [

AppConfigService,

{  provide:  APP_INITIALIZER,useFactory:  initializeApp,  deps:  [AppConfigService],  multi:  true}

],

[](https://www.tektutorialshub.com/angular/angular-services/)**Suggested Reading**

-   [Dependency Injection](https://www.tektutorialshub.com/angular/angular-dependency-injection/)
-   [Angular Providers](https://www.tektutorialshub.com/angular/angular-providers/)
-   [Injector, Injectable & Inject](https://www.tektutorialshub.com/angular/angular-injector-injectable-inject/)
-   [APP_INITIALIZER](https://www.tektutorialshub.com/angular/angular-how-to-use-app-initializer/)

## Reading the Configuration file

To Read the Configuration file, we need to make an HTTP GET  `request`  and return a  `Promise`.

If you do not return a  `promise`, then angular will not wait for the function to finish. The  `observable`  is not yet supported

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

load()  {

const  jsonFile  =  `assets/config/config.json`;

return  new  Promise<void>((resolve,  reject)  =>  {

this.http.get(jsonFile).toPromise().then((response  :  IAppConfig)  =>  {

AppConfigService.settings  =  <IAppConfig>response;

console.log(  AppConfigService.settings);

resolve();  //Return Sucess

}).catch((response:  any)  =>  {

reject(`Failed to load the config file`);

});

});

}

## Example Application

Create a new Angular App.

### Create the Config file

We will use the JSON format for our configuration.

First, We will create an Interface  `IAppConfig`

Create the  `app-config.service.ts`  in the  `src/app`  folder and create  `IAppConfig` as shown below.

1

2

3

4

5

6

7

8

9

10

11

12

13

export  interface  IAppConfig  {

env:  {

name:  string

}

apiServer:  {

link1:string,

link2:string,

}

}

Then create the actual configuration file in the  `assets/config/config.json`  as shown below

1

2

3

4

5

6

7

8

9

10

11

12

{

"env":  {

"name":"Dev"

},

"apiServer"  :  {

"link1"  :"http://amazon.com",

"link2"  :"http://ebay.com"

}

}

### Service

The task of the service is to send the HTTP GET request to the  `config.json`  file and store the configuration.

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

import  {  Injectable  }  from  '@angular/core';

import  {  HttpClient  }  from  '@angular/common/http';

@Injectable()

export  class  AppConfigService  {

static  settings:  IAppConfig;

constructor(private  http:  HttpClient)  {}

load()  {

const  jsonFile  =  `assets/config/config.json`;

return  new  Promise<void>((resolve,  reject)  =>  {

this.http.get(jsonFile).toPromise().then((response  :  IAppConfig)  =>  {

AppConfigService.settings  =  <IAppConfig>response;

console.log('Config Loaded');

console.log(  AppConfigService.settings);

resolve();

}).catch((response:  any)  =>  {

reject(`Could not load the config file`);

});

});

}

}

Create  `static` `settings`  variable

1

2

3

static  settings:  IAppConfig;

Next, we inject  `HttpClient`  in the constructor. We use the HTTP get method to read the configuration file.

1

2

3

constructor(private  http:  HttpClient)  {}

In the  `load`  method,  `jsonFile`  constant is assigned to the location of config file.

1

2

3

const  jsonFile  =  assets/config/config.json;

Then, we return the  `Promise`

1

2

3

return  new  Promise<void>((resolve,  reject)  =>  {

Inside the  `Promise`  we make a GET request to the config file. The returned  `response`  is mapped to the  `IAppConfig`  interface.

1

2

3

this.http.get(jsonFile).toPromise().then((response  :  IAppConfig)  =>  {

Assign it to the settings variable. Note that it is a  `static`  variable. Hence, we are  using `AppConfigService.settings` here.

1

2

3

AppConfigService.settings  =  <IAppConfig>response;

Output the values to the console

1

2

3

4

console.log('Config Loaded');

console.log(  AppConfigService.settings);

And Finally, call the  `resolve`  to return the  `Promise`

1

2

3

resolve();

And, in case of any errors  `catch`  it and  `reject`  the  `Promise`. The Angular will stop loading the application

1

2

3

4

5

.catch((response:  any)  =>  {

reject(`Could not load the config file`);

});

### Loading the Runtime configuration

Next, step is to inject the Service in  `AppModule`

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

37

import  {  BrowserModule  }  from  '@angular/platform-browser';

import  {  NgModule,  APP_INITIALIZER  }  from  '@angular/core';

import  {  HttpModule  }  from  '@angular/http';

import  {  AppRoutingModule  }  from  './app-routing.module';

import  {  AppComponent  }  from  './app.component';

import  {  AboutUsComponent,  ContactUsComponent,  HomeComponent}  from  './pages'

import  {  AppConfigService  }  from  './app-config.service';

import  {  HttpClientModule  }  from  '@angular/common/http';

export function initializeApp(appConfigService:  AppConfigService)  {

return  ():  Promise<any>  =>  {

return  appConfigService.load();

}

}

@NgModule({

declarations:  [

AppComponent,  AboutUsComponent,HomeComponent,ContactUsComponent

],

imports:  [

HttpClientModule,

BrowserModule,

AppRoutingModule,

],

providers:  [

AppConfigService,

{  provide:  APP_INITIALIZER,useFactory:  initializeApp,  deps:  [AppConfigService],  multi:  true}

],

bootstrap:  [AppComponent]

})

export  class  AppModule  {  }

First, we need to import  `APP_INITIALIZER`  from the  `@angular/core`.

1

2

3

import  {  NgModule,  APP_INITIALIZER  }  from  '@angular/core';

Next import  `AppConfigService`  &  `HttpClientModule`

1

2

3

4

import  {  AppConfigService  }  from  './app-config.service';

import  {  HttpClientModule  }  from  '@angular/common/http';

We have  `appConfigService`  which loads the configuration. Now we need a function, which invokes the  `load`  method. Hence we will create a function  `initializeApp`, which calls the  `appConfigService.load()`  method

1

2

3

4

5

6

7

export function initializeApp(appConfigService:  AppConfigService)  {

return  ():  Promise<any>  =>  {

return  appConfigService.load();

}

}

Finally, we need to tell angular to execute the  `initializeApp`  on application startup. We do that by adding it to the providers array using the APP_INITIALIZER token as shown below.

1

2

3

4

5

6

providers:  [

AppConfigService,

{  provide:  APP_INITIALIZER,useFactory:  initializeApp,  deps:  [AppConfigService],  multi:  true}

],

The  `useFactory`  is used because  `initializeApp`  is a function and not a class

We make use of the  `deps:[AppConfigService]` flag to let angular know that  `initializeApp`  has a dependency on  `AppConfigService`.

The  `multi : true`  creates the multi-provider DI token. The APP_INITIALIZER is a multi-provider token. We can define more than one Provider for APP_INITIALIZER. The Angular Injector invokes each of them in the order they appear in the Providers array.  

### Read the configuration in components

The following  `AboutUsComponent`  shows how to read the runtime settings in the component

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

import  {  Component  }  from  '@angular/core';

import  {  AppConfigService}  from  '../../app-config.service';

@Component({

template:  `About Us`,

})

export  class  AboutUsComponent

{

protected  apiServer  =  AppConfigService.settings.apiServer;

constructor()  {

console.log(this.apiServer.link1);

console.log(this.apiServer.link2);

}

}

First import the  `AppConfigService`  in the component/service.

1

2

3

import  {  AppConfigService}  from  '../../app-config.service';

Next, get a reference to the  `AppConfigService.settings`

1

2

3

protected  apiServer  =  AppConfigService.settings.apiServer;

And the use it in your component/service etc

![](data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20%20%22%3E%3C/svg%3E)

## Summary

In this article, we learned how to create and runtime configuration and use it in an angular application. We use the injection token  [APP_INITIALIZER](https://www.tektutorialshub.com/angular/angular-how-to-use-app-initializer/)  provided by Angular to hook into the Angular initialization process and read the config file. The config file is in JSON format and stored in the src/app/assets/config folder. We make an HTTP GET request to get the data from the config file.

## Source Code

[Download Source Code](https://github.com/tekTutorialsHub/Angular-Configuration)

[APP INITIALIZER](https://www.tektutorialshub.com/angular/angular-how-to-use-app-initializer/)

[Environment Variables](https://www.tektutorialshub.com/angular/angular-environment-variables/)


# 

Angular Runtime Configuration

[APP INITIALIZER](https://www.tektutorialshub.com/angular/angular-how-to-use-app-initializer/)

[Environment Variables](https://www.tektutorialshub.com/angular/angular-environment-variables/)

Most apps need some sort of Run-time configuration information, which it needs to load at startup. For example, if your app requires data, then it needs to know the base location of your REST endpoints. Also, development, testing & production environments may have different endpoints

Applies to: Angular 2, Angular 4, Angular 5, Angular 6, Angular 7, Angular 8. Angular 9

Table of Content  [[hide](https://www.tektutorialshub.com/angular/angular-runtime-configuration/#)]

-   [Where to Store configuration](https://www.tektutorialshub.com/angular/angular-runtime-configuration/#where-to-storenbspconfiguration)
-   [When to read the configuration](https://www.tektutorialshub.com/angular/angular-runtime-configuration/#when-to-readnbspthe-configuration)
    -   [APP_INITIALIZER](https://www.tektutorialshub.com/angular/angular-runtime-configuration/#app-initializer)
-   [Reading the Configuration file](https://www.tektutorialshub.com/angular/angular-runtime-configuration/#reading-the-configuration-file)
-   [Example Application](https://www.tektutorialshub.com/angular/angular-runtime-configuration/#example-application)
    -   [Create the Config file](https://www.tektutorialshub.com/angular/angular-runtime-configuration/#create-the-config-file)
    -   [Service](https://www.tektutorialshub.com/angular/angular-runtime-configuration/#service)
    -   [Loading the Runtime configuration](https://www.tektutorialshub.com/angular/angular-runtime-configuration/#loading-the-runtime-configuration)
-   [Summary](https://www.tektutorialshub.com/angular/angular-runtime-configuration/#summary)
-   [Source Code]
