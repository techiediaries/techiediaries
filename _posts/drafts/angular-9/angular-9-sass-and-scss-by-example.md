# Using Sass and SCSS with the Angular 9 CLI

One of the first things you'll usually do in a project is to bring in Sass to make working with CSS easier.

When working with the Angular CLI, the default stylesheets have the .css extension.


For instance, let's create a brand new CLI app:

ng new my-sassy-app --style=scss

1. Creating Angular application with SCSS style files.
Normally, when we run ng new my-app, our app will have .css files. To get the CLI to generate .scss files (or .sass/.less) is an easy matter.
Run the below command in the project root directory.
ng new my-first-app --style=scss
You can also set the --style flag with the following:

--style=scss
--style=sass
--style=less

2. Converting existing Angular CSS project to SCSS style sheet.
If you’ve already created your Angular CLI app with the default .css files, it will take a bit more work to convert it over. You can tell Angular to start processing Sass files with the following command
From Angular 6 to set new style on existing project with CLI:
Run the below command in the project root directory.
ng config schematics.@schematics/angular:component.styleext scss
Or modify directly into angular.json manually:
"schematics": {
      "@schematics/angular:component": {
      "styleext": "scss"
    }
}
Changing the CSS Files to Sass
The Angular CLI will start processing Sass files now. However, it doesn’t go through the process of converting your already existing .css files to .scss files. You'll have to make the conversion manually.

3. Configuring bootstrap
Run the below command in the project root directory.
npm install --save bootstrap
Now that we have Bootstrap, let’s look at how we can include the basic CSS file. This is an easy process by adding the bootstrap.css file to our .angular-cli.json config:
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.css",
  "sass/styles.scss"
],
NOTE: Sometimes adding (../) works.
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.css",
  "sass/styles.scss"
],