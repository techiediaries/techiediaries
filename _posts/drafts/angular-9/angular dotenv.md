# 

Using Dotenv with Angular

Most Node developers use  [dotenv](https://www.npmjs.com/package/dotenv)  as a way to manage private API keys. It's especially useful if you're working on a Public Github repo, and you don't want to share access to your Firebase, Google, etc. accounts.

While developing an app using Angular 2 and Angular CLI, I discovered that it's not very easy to integrate the dotenv package, and after a few hours searching for a workaround, I found a process that works well enough.

The best part of this process is that I don't need to install dotenv at all. Here's how:

# Step 0 - Install Angular

[Install Angular](https://www.chrisjmendez.com/2017/07/21/how-to-install-angular/)

# Step 1 - Create an Angular 2 app

Using the  [Angular Cli](https://cli.angular.io/), create a new app.

```language-powerbash
ng new name-of-app

```

# Step 2 - Create an  `.env`  file

In this example, I am placing the  `.env`  file in the  `/environments`  folder. This is where you store environmental variables for Angular.

```powerbash
vi ./name-of-app/src/app/environments/.env

```

Your  `.env`  file will resemble  `/environments/environment.ts`.

```javascript
export const environment = {
  production: false,
  GOOGLE_MAPS_API_KEY: "XXXXXXXXX",
  FIREBASE_CONFIG:  {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx"
  }
};

```

# Step 3 - Modify  `.angular-cli.json`

Modify this file to include a new environment called  **"local"**  and point it to the  **.env**  file.

```javascript
...
"environments": {
  "dev": "environments/environment.ts",
  "local": "environments/.env",
  "prod": "environments/environment.prod.ts"
}
...

```

# Step 4 - Run Angular locally

The final step is to run  `ng serve`  but change the environment to  **local**.

```javascript
ng serve --env=local

```

# Step 5 - Access variables

Open up  `app.module.ts`  and try to access your environmental variables. You're done!

```javascript
console.log(environment.FIREBASE_CONFIG, environment["GOOGLE_MAPS_API_KEY"]);

```

----------

# Resources

-   [Angular cli environmental variables](https://medium.com/@aziz.marwan/angular-cli-environment-variables-75f926c52798)
-   [Angular cli issues](https://github.com/angular/angular-cli/issues/3387)