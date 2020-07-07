---
layout: bpost
title:  "Angular 10 Material Date Picker with Calendar and Date Range"
date:   2020-07-07
tags: [angular]
canonical: "https://shabang.dev/angular-10-material-date-picker-calendar-range/"  
---

Angular 10 has been recently released and introduced some new features as usual with any new major release. Among the new features is adding the **date range** feature to the date picker component of Angular Material.

Throughout this tutorial, we'll learn how to create a basic material date picker using `mat-datepicker` directive and then how to create one with a date range using the new `mat-date-range-picker` directive available in Angular 10 Material.

We also learn how to use the `matDatepickerFilter` property of the `input` field to disable specific dates using a filter function
 and the `disabled` property which is available on the `<input>`, `<mat-datepicker-toggle>` and `<mat-datepicker>` elements to make the element disabled.
 
We'll learn about Material date picker events that can be triggered from the `input` field -- the  `dateInput` and `dateChange` events then  how to use the `min` and `max` properties of the `input` field to set the range of dates that can be selected by the users of your Angular 10 app.
 
Finally, we will learn how to change the calendar start view using the `startView` property of `<mat-datepicker>` directive which can be used to show a _month_, _year_, or _multi-year_ for user selection and how to use the `startAt` property to set start date on `<mat-datepicker>`.

## Generating an Angular 10 Project

As a prerequisite you need to have Angular 10 CLI installed which you need to use to generate a new Angular 10 project using the following command:

```bash
$ ng new AngularMaterialDateRangePicker

#? Would you like to add Angular routing? No
#? Which stylesheet format would you like to use? CSS
```

You'll be prompted for routing and the style-sheets format, answer them as you see fit because that's not going to affect the tested feature.

## Setting up Angular 10 Material

Next, you need to setup Angular Material in your project. This can be done easily with the following command:
 
```bash
$ ng add @angular/material
```

Next, you need to choose a material theme for the project from the list:

```bash
? Choose a prebuilt theme name, or "custom" for a custom theme: (Use arrow keys)
> Indigo/Pink        [ Preview: https://material.angular.io?theme=indigo-pink ]
  Deep Purple/Amber  [ Preview: https://material.angular.io?theme=deeppurple-amber ]
  Pink/Blue Grey     [ Preview: https://material.angular.io?theme=pink-bluegrey ]
  Purple/Green       [ Preview: https://material.angular.io?theme=purple-green ]
  Custom
```

Next, say  Yes or No for the Material typography styles: 

```bash
? Set up global Angular Material typography styles? No
```

Next, you need to choose to enable Browser Animation support:

```bash
? Set up browser animations for Angular Material? Yes
```

That's it, we have added  Material support to our Angular 10 project.

At this step, you can run your Angular 10 application in your web browser using the following command:

```bash
$ ng serve --open
```

Now you are ready to use the date range feature with the material date picker.

## Importing Angular 10 Material Modules

Before using Material UI components in an Angular 10  project, you need to import the modules of the needed components in the application's module.

Angular Material date picker can be used with the `mat-datepicker` or `mat-date-range-picker` directives in the component's template. For using the Material date picker, we first need to import the `MatDatePicker` module.

Next, you need to import the `MatDatepickerModule`, `MatNativeDateModule`, and `MatInputModule` in your main module. Open the `src/app/app.module.ts` file and update as follows:

```ts
//src/ap/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Angular 10 Material Date Picker Example

Let's get started by implementing a simple basic date picker. Open the `src/app/app.component.html`  file and add the following markup:

```markup
<input matInput [matDatepicker]="picker" placeholder="Pick a date">
<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
<mat-datepicker #picker></mat-datepicker>
```

As you can see, the Material date picker is implemented, using an `input` field, and a calender popup. We use the `matDatepicker` property on the `input` element to connect it to the  `mat-datepicker` directive using a template reference variable (`#picker`).

You can also use the `startAt` property to set start date on `<mat-datepicker>` as follows:

```html
<mat-datepicker #picker [startAt]="startDate"></mat-datepicker>
```

Make sure you define a `startDate` variable in your component as follows:

```ts
startDate = new Date(1990, 0, 1);
```

You can also change the calendar start view  using `startView` property of `<mat-datepicker>` which can be used to show a _month_, _year_, or _multi-year_ for selection with month is the default:

```ts
startView="year";
startView="multi-year";
```

You can use the `min` and `max` properties of the `input` field to set range of dates that can be selected as follows:

```markup
<input matInput [min]="minDate" [max]="maxDate" [matDatepicker]="picker" placeholder="Pick a date">
```

The `minDate` and `maxDate` variables need to defined in the associated component's class with the desired date values:

```ts
minDate = new Date(1989, 2, 1); 
maxDate = new Date(1999, 3, 3);
```

Material date picker provides two events that can be fired from the `input` field which are `(dateInput)` and `(dateChange)`:

- `dateInput` is fired when values are changed by typing a date in the input field or pick a date from the calendar  
- `dateChange` is fired on blur after the user changes the value in the input field or the date is changed from the calendar.

This is an example:

```markup
<input matInput [matDatepicker]="picker" placeholder="Pick a date" (dateInput)="inputEvent($event)" (dateChange)="changeEvent($event)">
```

You need to define the `inputEvent` and `changeEvent` methods in the corresponding component's class as follows:

```ts
inputEvent(event){
    console.log(event.value);
}
changeEvent(event){
    console.log(event.value);
}
```

You can use the `matDatepickerFilter` property of the `input` field to disable specific dates using a filter function which returns either true or false for a date in calendar popup. If the the function returns `false` for date, it will be disabled and can not be selected by users:

```markup
<input matInput [matDatepicker]="picker" [matDatepickerFilter]="fn" placeholder="Pick a date">
```

You need to define the filtering function in the corresponding component's class. For example:

```ts
  fn = (aDate: Date): boolean => {
    const date = aDate.getDate(); 
    // Odd dates are disabled.
    return date % 2 == 1;
  }
```

You can use the `disabled` property which is available on the `<input>`, `<mat-datepicker-toggle>` and `<mat-datepicker>` elements to make the element disabled and read-only:

```markup
    <input matInput [matDatepicker]="picker" placeholder="Pick a date" [disabled]="true">
    <mat-datepicker-toggle matSuffix [for]="picker" [disabled]="true">
    </mat-datepicker-toggle>
    <mat-datepicker #picker [disabled]="true"></mat-datepicker>
```

## Angular 10 Material Date Picker with Range Feature

Let's now see how to use the date picker component with the range feature. First run the following command to generate a new Angular component:

```bash
$ ng g c date-range-picker-example
``` 

Next, open the `src/app/date-range-picker-example/date-range-picker-example.html` file and update it as follows:

```html
<mat-form-field>
  <mat-label>Enter a date range</mat-label>
  <mat-date-range-input [rangePicker]="picker">
    <input matStartDate matInput placeholder="Start date">
    <input matEndDate matInput placeholder="End date">
  </mat-date-range-input>
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-date-range-picker #picker></mat-date-range-picker>
</mat-form-field>
```

Next, open the `src/app/app.component.html` file and include the component as follows:

```html
<date-range-picker-example></date-range-picker-example>
```

## Conclusion

In this tutorial, we've seen how to use the material date picker with comes with a new date range feature in Angular 10.

We've seen how to create a basic material date picker using `mat-datepicker` directive and then how to create one with a date range using the new `mat-date-range-picker` directive available in Angular 10 Material.

We learned how to use the `matDatepickerFilter` property of the `input` field to disable specific dates using a filter function
 and the `disabled` property which is available on the `<input>`, `<mat-datepicker-toggle>` and `<mat-datepicker>` elements to make the element disabled and read-only.
 
We learned about Material date picker events that can be fired from the `input` field which are `(dateInput)` and `(dateChange)` and how to use the `min` and `max` properties of the `input` field to set the range of dates that can be selected by the users of your Angular 10 app.
 
Finally, we also learned how to change the calendar start view using `startView` property of `<mat-datepicker>` which can be used to show a _month_, _year_, or _multi-year_ for selection and how to use the `startAt` property to set start date on `<mat-datepicker>`.

