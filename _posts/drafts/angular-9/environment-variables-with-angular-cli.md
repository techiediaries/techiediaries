Setting up environment variables is quite difficult with angular CLI. angular CLI facilitate with environments for development as well as production.  `environment.*.ts`  files are responsible to handle the environments in angular CLI.

The problem will arise with the deployment of angular app to Heroku and while we will enable the pipeline for it, The npm **heroku-postbuild** script runs when the Heroku slug is built when you “promote” releases through your Heroku pipeline (e.g. from “development” to “staging” to “production”), the pre-built Heroku slug is promoted “as is”, and is NOT rebuilt.

`Consider a scenario:`  That you are deploying the changes to staging but your  **package.json**  runs  **“heroku-postbuild”: ng build --prod’**  means that when you git push to your “development” app, the slug will get built with the “prod” options. That is fine for the “production” app . here `ng build --prod` then  **`environment.prod.ts`**  will be used instead.

`environment.prod.ts`

export const environment = {   
   production: true,  
   productionApiUrl: 'http://domain.com'  
}

`angular.json`

"environmentSource": "environments/environment.ts",  
"environments": {  
  "dev": "environments/environment.ts",  
  "prod": "environments/environment.prod.ts"  
}

Slug will build with above mentioned  **‘productionApiUrl’**  means at staging it will point to production API endpoint.

**So here the questions comes in mind that how we can change properties based on the environments(staging and production) or environment variables ?**

It can be resolved by using dotenv but unfortunately, simply trying to run dotenv’s  `config`  function doesn’t seem to work with  `environment.*.ts`  files—this would certainly be the most pragmatic way to do it. But when I tried to do this, everything would just come up  `undefined`

The following steps will help to use dotenv (process.env) with angular CLI

1.  `npm install -g dotenv`
2.  Add a  `.env`  with your sensitive environment variables as per the dotenv README
3.  Add a script (I called it  `config-env.ts`  that to dynamically generate your environment-specific file using environment variables (process.env)
4.  Update the  `scripts`  in your  `package.json`  to run  `config-env.ts`  first, then the respective  `ng build`command

`package.json`

"config": "ts-node ./src/config-env.ts",  
"start": "npm run config -- && node server.js",  
"heroku-postbuild": "npm run config -- && ng build --prod" 

`config-env.ts`

import { writeFile } from 'fs';require('dotenv').config();const environment = process.env.ENVIRONMENT;let apiURL;if (environment === 'production') {  
  apiURL = process.env.PRODUCTION_API_ENDPOINT;  
} else if (environment === 'test') {  
 apiURL = process.env.TEST_API_ENDPOINT;  
}const targetPath = `./src/environments/environment.prod.ts`;  
const envConfigFile = `  
export const environment = {   
    production: true,   
    apiUrl: '${apiURL}'};`writeFile(targetPath, envConfigFile, function (err) {  
  if (err) {   
       console.log(err);  
}

`.env`

ENVIRONMENT= // define environment here  
PRODUCTION_API_ENDPOINT= // production api endpoint  
TEST_API_ENDPOINT= // staging api endpoint

Above process will generate file  `environment.prod.ts`  with different API endpoints based on the environment variables , like above it will be easy to use other properties with  `dotenv`