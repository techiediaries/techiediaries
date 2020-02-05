This Dot Labs: Runtime environment configuration with Angular
When planning to deploy an Angular application, you might have the need for some configuration that can be different for every environment that's hosting the application. Even when you are only deploying to a single environment, the configuration can be different from the one used for local development. Often, a frontend application needs to communicate with a backend, whose URL can be different for each environment. In this article, we'll modify an Angular application to make use of a configurable API URL in such a way that it can differ for each environment to which you're deploying.

Angular environments
Angular has a built-in environment system that allows you to specify configuration for multiple environments. When building the application with a given target environment, Angular CLI will replace the environment.ts file with the content of the environment-specific environment file (e.g. environment.qa.ts, environment.prod.ts).

Even though this works quite well, the downside of this is that we need to recompile and reupload the artifacts for each environment to which we are planning to deploy. As the idea behind an Azure DevOps release pipeline is to use a single build artifact, and deploy them to, theoretically, an endless amount of environments, this approach doesn't work well with the way we're setting up Continuous Deployment.

Runtime environment configuration
As we need to be able to deploy our application to multiple environments using a different configuration without recompiling the application for a specific environment, we will need to have some kind of runtime configuration. This means we'll need to swap out the environment configuration after the artifacts are built.

One way we can do this in an Angular application is by including a config.json file in the assets directory that contains the configuration settings. Including the JSON file in the assets directory ensures it's being copied to the dist folder when running ng build without the need to make any changes to the angular.json file.

Go ahead and create the config.json file using a single apiUrl property:

    {
        "apiUrl": "http://localhost"
    }
We can load the config file as part of an APP_INITIALIZER, ensuring the application isn't started before the config file is loaded. Before we can include an actual APP_INITIALIZER, we will create a service that's responsible for fetching the config.json file using Angular's HttpClient.

    @Injectable({
      providedIn: 'root'
    })
    export class ConfigService {
      config: Config;
    
      constructor(private http: HttpClient) {}
    
      loadConfig() {
        return this.http
          .get<Config>('./assets/config.json')
          .toPromise()
          .then(config => {
            this.config = config;
          });
      }
    }
Once we added the above service to an Angular application, we can hook it into Angular's APP_INITIALIZER:

    export const configFactory = (configService: ConfigService) => {
      return () => configService.loadConfig();
    };
    
    @NgModule({
      ...
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: configFactory,
          deps: [ConfigService],
          multi: true
        }
       ],
       ...
    })
    export class AppModule { }
Wherever we need access to the environment-specific configuration, we can inject the ConfigService, and access the config property.

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {
      title = 'ng-azure-devops';
    
      constructor(configService: ConfigService) {
        console.log('config', configService.config);
      }
    }
In the above component, we're injecting the ConfigService in order to log the entire config object to the console. This should allow us to inspect whether or not the configuration has been set correctly for any environment. In a real application, you probably need to inject the config in the services that are responsible for calling that environment-specific API, and use the API URL to build the endpoint URL.

Replacing the configuration file
Now that we have everything in place to include configuration at runtime using a JSON file, all that's left to do is to replace that file with the environment-specific configuration, and it will be picked up when running the application.

One way could be to include multiple environment configuration files in source control, (config.qa.json, config.prod.json, ...) and swap them during deployment.

However, I prefer not to add a separate config file for each environment to which we're deploying. Instead, I think it's a good idea to use a single file, and update its content as part of an automated release pipeline. This allows for a separation between the code-base, and the different number of environments to which it's being deployed.

This Dot Inc. is a consulting company which contains two branches : the media stream, and labs stream. This Dot Media is the portion responsible for keeping developers up to date with advancements in the web platform. This Dot Labs provides teams with web platform expertise, using methods such as mentoring and training.