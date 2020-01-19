---
layout: post
title: "Angular 9/8 How-To: Create Angular Components?"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this quick how-to post, we'll learn how to use the  ng generate component  command of Angular CLI, or its  ng g c shortcut command, for creating Angular components in your project." 
tags : [angular, angular-how-tos, angular9] 
---


In this quick how-to post, we'll learn how to use the  `ng generate component`  command of Angular CLI, or its  `ng g c` shortcut command, for creating Angular components in your project.

If you are new to these how-tos, check out how to [install and set up a project and the prerequisites](https://www.techiediaries.com/angular-cli-tutorial/).

## How to Use `ng generate component`  or  `ng g c`

Let's assume we want to create a Angular component named home.

Open a new command-line interface, navigate into the root of your Angular project and run the following command:

```bash
$ ng generate component home
```

Or you can also run the following command:

```bash
$ ng g c home
```

Angular CLI will generate 4 files for the component in the  `src/app`  folder of your project:

```bash
  /home/home.component.ts       # Component class
  /home/home.component.html     # Component template
  /home/home.component.css      # Component styles
  /home/home.component.spec.ts  # Component tests
```

We can also customize where the component's files are placed.
 
 Angular CLI adds the component to the   `declarations`  array of the module.

```ts
@NgModule({
  // [...]
  declarations: [ AppComponent, HomeComponent ]
  // [...]
})
export class AppModule { }
```

This will allow `HomeComponent`  in any component in the `AppModule`. 


## How to Customize the Output of  `ng generate component`

By default the `ng generate component` or  `ng g c` commands, generate a folder and four files for the component. But you can change the default behavior if you want in two ways:

- Using flags with the command,
- Using the `angular.json`  configuration file.

### Using Flags with the `ng generate command`

Let's generate an `about` component without a subfolder and without the specification file. 

Head back to the terminal and run the following command:

```bash
$ ng generate component about --flat=true --spec=false
```


## Using the  `angular.json`  File

Let's now see by example how to configure the CLI from the  `angular.json`  file to not generate  `.spec.ts`  file for a component.

Go back to your terminal and run the following command:

```bash
$ ng config schematics.@schematics/angular:component.spec false
```

## How to Set the Component's Folder
 
You can aso define the folder of the component by  specefying the path as follows:

```bash
$ ng generate component components/contact
```

This will create the contact component inside the components folder which will also be created if it doesn't exist inside the  `src/app`  folder of the project. 

## Manually Creating Components  

You can also create Angular components manually by creating the necessary files and add the component's class to the `declarations` array of the module where it should be used.

## Angular CLI Naming Conventions

When you create an Angular component with Angular CLI, it will follow these conventions:

-   The `Component` suffix is added to the name you submit for the component. 
-   The  `app-` prefix  is added to the selector of the component. 
-   The name of the component class  is in upper camel case,

## Conclusion

In this howto post, we have seen how to create components in Angular using the `ng generate component`  command or its  `ng g c` shortcut command.
