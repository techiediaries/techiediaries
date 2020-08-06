---
layout: post
title: "Documentation for @techiediaries/ngx-qrcode"
image: "images/content/generate-qrcodes-angular.png"
excerpt: "Documentation for @techiediaries/ngx-qrcode"
date: 2020-08-06 
tags : [angular]
---

`@techiediaries/ngx-qrcode`  An Angular Component library for Generating QR (Quick Response) Codes.

You can use the  `@techiediaries/ngx-qrcode`  to easily generate QR codes inside your Angular 9/10 or Ionic 5 applications

> QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached. A QR code uses four standardized encoding modes (numeric, alphanumeric, byte/binary, and kanji) to efficiently store data; extensions may also be used.  [Source](https://en.wikipedia.org/wiki/QR_code)

## How to install `@techiediaries/ngx-qrcode`?

To use `ngx-qrcode` in your project, install it via npm or yarn:

```bash
$ npm install @techiediaries/ngx-qrcode --save
```

Via yarn:

```bash
$ yarn add @techiediaries/ngx-qrcode
```

## How to use `@techiediaries/ngx-qrcode`?


Import  `NgxQRCodeModule`  from  `@techiediaries/ngx-qrcode`  into your  `src/app/app.module.ts` file as follows:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the library has been imported, you can use the ngx-qrcode component in your Angular application.

In  the `src/app/app.component.html` file add the following code:

```html
<div style="text-align:center">
  <h1>
    @techiediaries/ngx-qrcode demo 
  </h1>
</div>

<ngx-qrcode 
  [elementType]="elementType" 
  [value] = "value"
  cssClass = "aclass"
  errorCorrectionLevel = "L">
</ngx-qrcode>
```

Next, in  the `src/app/app.component.ts` file add:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';
}
```

## How to develop `@techiediaries/ngx-qrcode`?

To generate all  `*.js`,  `*.d.ts`  and  `*.metadata.json`  files:

```bash
$ npm run build
$ yarn build
```

To lint all  `*.ts`  files:

```bash
$ npm run lint
$ yarn lint
```

## How to run unit tests?

In development mode:

```
$ npm run test:watch ngx-qrcode
or
$ yarn test:watch ngx-qrcode
```

Add  `--codeCoverage`  option to see code coverage in  `coverage`  folder.

## License

The library is available under the MIT license.

