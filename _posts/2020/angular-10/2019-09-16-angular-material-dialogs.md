---
layout: bpost
title: "Angular 10/8 Material Dialog with Example"
image: "images/content/angular.jpg"
excerpt: "This tutorial shows you how you can use Angular 7/8 Material to build Material UI dialogs for your web application" 
tags : [angular, angular-10-material-examples] 
date: 2020-08-05 
author: ahmed
---

In this tutorial, we're going to learn how to use the Angular Material Dialog component (`MatDialog` along with `MatDialogRef`, `MAT_DIALOG_DATA` and `MatDialogConfig`) to build a custom Angular dialog example in Angular 10.


We'll also see common cases to work with the Angular Material Dialog such as:

- how to create a dialog,
- how to pass data to the dialog component,
- how to get data back from a dialog component,
- how to use various configuration options for dialogs.


Before starting, first, you’ll need to make sure you have followed the steps to set up Angular Material for your Angular application.

Provided that you have initialized a project using [Angular CLI 10 (or v6+)](https://www.techiediaries.com/angular-cli-tutorial/), you can use the `ng add` command for quickly setting up Angular 10 in your project without going through most of the [manual steps](https://material.angular.io/guide/getting-started):

```bash
$ cd your_angular-project
$ ng add @angular/material 
```

Next, you need to [configure animations or disable them](https://material.angular.io/guide/getting-started#step-2-configure-animations).



Most Angular Material components have their own module, so you can use a specific component without importing the whole library. For Material Dialog, you need to import the `MatDialogModule` module. Open the `src/app/app.module.ts` file and add the following import:

```ts
import { MatDialogModule } from '@angular/material/dialog';
```

Next, you need to add `MatDialogModule` to the `imports` array of the application module as follows: 

```ts
/* ... */

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```


Now, you are ready to create your Angular Material dialog. The process involves a few steps:

- First, you need to import and inject `MatDialog` via the component constructor where you want to call the Material dialog,
- Next, you need to create an instance of `MatDialogConfig` which holds the configuration options for the Material dialog (this is optional, you can also pass a literal object),
- Finally, you need to call the `open()` method of the injected `MatDialog` instance with the component to use as the body of the dialog and the configuration object.

From the final step, you can understand that the `open()` method needs a component as a body so we'll need to create an Angular component.

## Creating an Angular 10 Component 

Head back to your terminal and use Angular CLI 10 to generate a component as follows:

```bash
$ ng generate component dialog-body
```   


Next, (this step may not be necessary for newer versions of Angular CLI) you’ll need to import the dialog component in the application module and add it into the _declarations_ and _entryComponents_ arrays:

```ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from "./app.component";
import { DialogBodyComponent } from "./dialog-body/dialog-body";

@NgModule({
  declarations: [AppComponent, DialogBodyComponent],
  imports: [BrowserModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogBodyComponent]
})
export class AppModule {}
```

## Step 1: Importing and Injecting `MatDialog`

To be able to call the dialog, you'll need to import and inject `MatDialog` in the calling component. In our example, it's `AppComponent`:

```ts
import { Component, Inject } from "@angular/core";
i
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Example Angular 10 Material Dialog";
  
  constructor(private matDialog: MatDialog) {}
}
```  

## Step 2: Opening the Angular 10 Material Dialog

Next, add the `openDialog()` method which opens the dialog:

```ts
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogBodyComponent, dialogConfig);
  }
```


As we already said, you  open the Material dialog by calling the `open()` method of the injected `MatDialog` instance and you pass the dialog component as a parameter and an optional configuration object.

You can pass different configuration option such as:

- data: object or string to send data to the dialog,
- height: set the height of the dialog,
- width: set the width of the dialog,
- disableClose: enable/disable closing the form by clicking outside the dialog,
- autoFocus: if true, automatically sets focus on the first form field etc.

## Step 3: Creating the Material Dialog Component

We have previously generated the Angular component that will be used for the body of the dialog.

We have a bunch of Angular Material directives that are designed to style the Material dialog body:

-   `mat-dialog-title`: This directive is used for the title of the dialog, 
-   `mat-dialog-content`: this directive is designed for the container of body of this dialog, 
-   `mat-dialog-actions`: this directive is designed for the container of the action buttons at the bottom of the dialog

Open the `src/dialog-body/dialog-body.component.html` file and update it as follows:

```ts
<h2 mat-dialog-title>This is a Dialog title</h2>

<mat-dialog-content>

<p> Place content here </p>
</mat-dialog-content>

<mat-dialog-actions>
	<button class="mat-raised-button" (click)="close()">Close</button>
</mat-dialog-actions>
``` 

## Step 4: Closing the Dialog and Implementing Action Buttons

The `MatDialogRef` provides a reference of the opened dialog. This reference can be used to close the dialog and also to notify the calling component when the dialog gets closed. Any component created via `MatDialog`  can inject the `MatDialogRef` reference and use it to perform the previously mentionned operations. 

Now let's implement the close button in our Angular dialog. First import `MatDialogRef` from `@angular/material/dialog`:

```ts
import { MatDialogRef } from "@angular/material/dialog";
```

Next, inject `MatDialogRef<DialogBodyComponent>` as `dialogRef`:

```ts
@Component({
  selector: "dialog-b",
  template: "<h1>Dialog body component</h1>"
})
export class DialogBodyComponent {
  constructor( public dialogRef: MatDialogRef<DialogBodyComponent>){}
}
```

Finally, you can use this reference, to the dialog component, to control many aspects such as closing the Material dialog or sending data back to the parent component. Add the following method to `DialogBodyComponent`:

```ts

  close() {
    this.dialogRef.close();
  }
```

You can optionally pass some value which can be received back in the calling component.

```ts
	close() {
    this.dialogRef.close("Thanks for using me!");
  }
```

## Step 5: Sending Data to the Angular 10Dialog Component

To be able to send or share data with the Angular dialog component, you can use the `data` option to pass data:

```ts
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    let dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);
  }
```

You can also pass objects instead of simple string values:

```ts
dialogConfig.data = { name: "some name"};
```
For accessing shared data in your dialog component, you need to use the `MAT_DIALOG_DATA` injection token:
 

```ts
import { Component, Inject } from "@angular/core";

import {
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: "dialog-b",
  template: "passed in data: {{ data }}"
})
export class DialogBodyComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
```

## Step 6: Receiving Data from the Angular 10 Dialog Component

In the calling component, we can get the data passed from the dialog. From the previous example, you can see that calling the `open()` method returns a reference to the dialog:

```ts
 let dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);
```

This dialog reference has a `afterClosed()` observable which can be subscribed to. The data passed from the dialog is emitted from this observable.

```ts
dialogRef.afterClosed().subscribe(value => {
  console.log(`Dialog sent: ${vaue}`); 
});
``` 

## Conclusion

Dialogs are important UI components for most web applications and thanks to Angular Material you can easily create professional-looking dialogs.

In this tutorial, we've seen how to use the `MatDialog` component (along with `MatDialogRef`, `MAT_DIALOG_DATA` and `MatDialogConfig`) from the Angular Material Dialog module to create a simple dialog component in Angular 10.
