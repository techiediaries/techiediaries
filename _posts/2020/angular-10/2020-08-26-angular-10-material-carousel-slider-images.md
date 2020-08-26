---
layout: bpost
title: "Angular 10 Material Carousel Slider with Images"
image: "images/content/angular.png"
excerpt: "Angular Material doesn't provide a builtin carousel component that allows you to build material UIs with carousels but the community developed some libraries such as @ngmodule/material-carousel. Let's how to use this library by example with the latest Angular 10 version to implement a simple carousel with images in our app"
date: 2020-08-26
tags : [angular]
---

Angular Material doesn't provide a builtin carousel component that allows you to build material UIs with carousels but the community developed some libraries such as `@ngmodule/material-carousel`. Let's how to use this library by example with the latest Angular 10 version to implement a simple carousel with images in our app.

You need to have the latest version of Angular CLI 10 installed on your development machine and generated an Angular 10 app using the CLI.

## Implementing a Material Carousel with Angular 10 Example

If you need to to add image slider/carousel in your Angular 10 application without implementing it from scratch by yourself since there isn't a built-in one in Material. You can follow the instructions below to show you how to use an external library to integrate a carousel slider without much hassle.

If you have the required prerequisites, follow the instructions below.

### Adding Angular Material

First, open a command-line interface and run the following command to add Angular material in your project:

```bash
$ ng add @angular/material
```

You'll be asked a bunch of questions that you can answer as you see fit for your use case.

### Installing `material-carousel`

Next, you need to install the `@ngmodule/material-carousel` library using the following command:

```bash
$ npm install @ngmodule/material-carousel
```

Next, you need to import `MatCarouselModule` in the application module. Open the `src/app/app.module.ts` file and update it as follows:


```ts
// [...]
import { MatCarouselModule } from '@ngmodule/material-carousel';
 
@NgModule({
  // [...]
  imports: [
    // [...]
    MatCarouselModule.forRoot(),
    
  ]
})
export class AppModule {}
```

That's it, you can now use the carousel component in your Angular templates as follows.

Open the `src/app/app.component.ts` file and add the following code: 

```ts
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

// [...]

export class AppComponent {

  // Array of images
  
  slides = [{'image': 'https://gsr.dev/material2-carousel/assets/demo.png'}, {'image': 'https://gsr.dev/material2-carousel/assets/demo.png'},{'image': 'https://gsr.dev/material2-carousel/assets/demo.png'}, {'image': 'https://gsr.dev/material2-carousel/assets/demo.png'}, {'image': 'https://gsr.dev/material2-carousel/assets/demo.png'}];

}
```

Next, open the `src/app/app.component.ts` file and update it as follows:

```html
<h1>Angular 10 Material Carousel Slider</h1>
  
  <mat-carousel
  timings="200ms ease-in"
  [autoplay]="true"
  interval="6000"
  color="white"
>
  <mat-carousel-slide
    *ngFor="let slide of slides; let i = index"
    [image]="slide.image"
    overlayColor="#ffffff"
    [hideOverlay]="false"
  ></mat-carousel-slide>
</mat-carousel>
```

We create a `<mat-carousel>` element and we pass in any properties to configure the carousel such as the time interval between slides and the color, etc.

Next, we iterate over the `slides` array in our Angular component using the `ngFor` directive and we create a slide for each image using the `<mat-carousel-slide>` directive. We can also configure properties for the slides such as `image`, `overlayColor` and `hideOverlay`, etc.


Refer to the [docs](https://www.npmjs.com/package/@ngmodule/material-carousel) for more information about the library.

## Conclusion

In this short post, we've seen by example how to easily create a carousel your Angular 10 Material UI using the `@ngmodule/material-carousel` library since Angular Material doesn't provide a built-in carousel component by default out of the box.
 
