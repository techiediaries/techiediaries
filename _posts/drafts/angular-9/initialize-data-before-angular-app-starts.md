
# Initialize data before Angular App Starts

Tuesday, June 11, 2019

By: Chris Dunn

It's generally a good idea to separate client configuration options from the rest of your code and display logic. These options could include API Endpoints, Language options, logging configuration or display settings. It makes it easier to customize these options for the various environments in the development process (development, test, staging, production).

Angular supports the concept of client configuration with environment files. At first this may seem like a perfect place for these configuration settings. The only problem is it requires you rebuild your application for each environment. If my application works in test, I don't want to have to rebuild for staging and then production. Especially if the only changes are to API Endpoints.

We do this all the time in .net applications with the web.config and  appSettings.json  file. We simply read in all of configuration settings available in config files and start the application. The good news is that similar to the Startup class in .net core, we have  APP_INITIALIZER  in Angular. Simply put, the  APP_INITIALIZER  is function that will be executed when an application is initialized.

## Configuration File/Service

So let's get into the example of how we would go about loading an external JSON configuration file into our Angular application when it starts.

First, lets define our json configuration file. We'll name it  app.config.json  and it has two values, version and an API endpoint.

TypeScript: app.config.json

{  
"version":  "1.0.0",  
"apiEndpointContacts":"/api/contacts/"  
}  
  

Next, we need to create a service that can load and store the configuration settings. Here I have the same properties defined (named the same) as are found in the json file. We are also passing the HTTPClient into the constructor so DI can inject the service which we'll need to load the json file.

A load function is defined which returns a promise. Currently we are not able to use  Observables as we are in other cases with Angular. It uses the  HttpClient  service to retrieve the json file, convert it to a promise from the default  Observable. Then using  Object.assign, we map the values from the json file to the properties in the  AppConfigService.

TypeScript

import  { Injectable }  from  '@angular/core';  
import  { HttpClient }  from  '@angular/common/http';  
import  'rxjs/add/operator/toPromise';  
import  { map }  from  'rxjs/operator/map';  
  
@Injectable()  
export  class  AppConfigService {  
  
public version: string;  
public apiEndpointSomeData: string;  
  
constructor(private http: HttpClient) {}  
  
load() :Promise<any> {  
  
const  promise =  this.http.get('/assets/app.config.json')  
.toPromise()  
.then(data  =>  {  
Object.assign(this, data);  
return  data;  
});  
  
return  promise;  
}  
}  
  

## NgModule and APP_INITIALIZER

The last thing we need to do is wire everything into the application start. This is done in the  app.module.ts  file. For this we need to create a factory function that returns the promise from our load function in the  AppConfigService. I've called it  appInit.

We then add a new entry in the providers section of  NgModule  where we are providing an  APP_INITALIZER  using the factory  appInit()  with a dependency on the  AppConfigService  service. This will make sure that on the application start, the factory will be called which creates an  AppConfigService, which calls the load method, populating the object from the json file.

TypeScript

import  { NgModule, APP_INITIALIZER }  from  '@angular/core';  
import  { AppConfigService }  from  './services/app-config.service';  
  
export  function  appInit(appConfigService: AppConfigService) {  
return  ()  =>  appConfigService.load();  
}  
  
@NgModule({  
declarations: [  
AppComponent  
],  
imports: [  
BrowserModule.withServerTransition({  appId:  'ng-cli-universal'  }),  
],  
providers: [AppConfigService,  
{  
provide: APP_INITIALIZER,  
useFactory: appInit,  
multi:  true,  
deps: [AppConfigService]  
}],  
bootstrap: [AppComponent]  
})  
export  class  AppModule { }  
  

## Using the Configuration

Now that our application has configuration options for the given environment or just in general, we need to be able to use them when making calls or setting other values. The following is a sample data service which make API calls for our application data. Just like with any other service we define, we inject it into the constructor which can then be used inside the class. In this case setting the API endpoint for the calls.

TypeScript

import { AppConfigService } from './app-config.service';

@Injectable()
export class DataService{

  constructor(private http: HttpClient, private config:AppConfigService) { }

  getSomeData():Observable<SomeModel> {
    return this.http.get(this.config.apiEndpointSomeData)
      .map((res: SomeModel) => new SomeModel(res));
  }


}

One final note. You can have more than one  APP_INITIALIZER  call to execute multiple startup operations in Angular.

**Tags:**