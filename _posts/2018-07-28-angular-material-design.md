---
layout: post
title: "Getting started with Material Design 6 in Angular 6"
image: "images/content/angular-material-design.png"
excerpt: "How to get started with Material Design 6 in Angular 6" 
tags : [angular ] 
---

{% include image.html 
    img="images/content/angular-material-design.png" 
    title="Angular Material Design 2" 
%}


In this first part of a tutorial series to get started with Material Design 6 in Angular 6, we are going to cover 
how to install and add support for Material 6 to an Angular 6 project, generated using the Angular CLI 6. 

## Getting Started

First of all, make sure you have created an Angular 6 project using the Angular CLI 6. 

Then use your terminal or command prompt to install the required npm package to add support for Angular Material 6.
    
```bash    
npm install --save @angular/cdk
npm install --save @angular/material
```

Next you'll need to add the Angular Material Module to your app module `app.module.ts`

So start by importing it:

```ts
import { MaterialModule } from '@angular/material';
```

Then simply add it to the *imports* array:

```ts    
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        MaterialModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
```

Some components depend on <em>hammerjs</em> so you need also to install these dependencies:

```bash
npm install --save hammerjs  
npm install --save-dev @types/hammerjs
```

Then make sure to import hammer in <em>app.module.ts</em> 

```ts
    import 'hammerjs';
```

Next open <em>tsconfig.app.json</em> and add <em>hammerjs</em> to types array:

```json
    "types": [
          "hammerjs"
        ]
```

There is one more little thing that you need to do to make Material Design 6 work properly.

Open your project <em>styles.css</em> and import the Roboto font and Material icons then set Roboto as the font for body element:

```css
    @import '~https://fonts.googleapis.com/icon?family=Material+Icons';
    @import '~https://fonts.googleapis.com/icon?family=Roboto';
    body {
        font-family: Roboto;
    }
```

That's because Material 6 components depend on these resources.

### Adding a theme 

Before using the Material components, we need to add a theme. There are many built in themes available with 
the default installation of Angular Metarial2 that are available from <em>/node_modules/angular/material/prebuilt-themes/</em> 
folder.

Make sure to look there for all available themes then choose one an import it in project styles.css file:

```css
    @import '~@angular/material/prebuilt-themes/indigo-pink.css';
```

Now you are good to go!

## Testing with Material Card Component

If you have successfully installed and configured <em>Material2</em>, you can now test some of its components to make sure everything is ok.

Open <em>app.component.html</em> then add these examples:

```html
    <md-card >
        <md-card-header>Example MD Card</md-card-header>
        <button md-button>A Button </button>
        <button md-raised-button>Another Button </button>
        <button md-raised-button color="primary">A 3rd Button</button>
     
        <button md-raised-button color="accent">The 4th Button</button>
        
        <md-card-footer>
          <button md-fab>
            <md-icon>add circle</md-icon>
          </button>
        </md-card-footer>
     
      </md-card>
```

## Conclusion 

That's all for this first part, we have seen how to install and setup the required packages to work with Material Design in Angular 6.

On this next part we are going to see some examples so stay tunned!


    
