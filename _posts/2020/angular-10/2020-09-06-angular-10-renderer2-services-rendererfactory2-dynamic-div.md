---
layout: bpost
title: "Angular 10 Renderer2 in Services with RendererFactory2: Append Dynamic Div Example"
image: "images/content/angular.png"
excerpt: "In this quick example, how to dynamically create a div, with an `id` and append it to the body element in an Angular 10 service. We'll see how to use RendererFactory2 in services to create an instance of Renderer2"
date: 2020-09-06
tags : [angular]
---

In this quick example, how to dynamically create a `div`, with an `id` and append it to the body element in an Angular 10 service. We'll see how to use `RendererFactory2` in services to create an instance of `Renderer2`. 


In services, you can use `RendererFactory2` to create a `Renderer2` instance. For example:

```ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DOMService {
  private renderer: Renderer2;
  constructor (rendererFactory: RendererFactory2) {
    // Get an instance of Renderer2
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  createDIV() {
    // Use Renderer2 to create the div element
    const div = this.renderer.createElement('div');
    // Set the id of the div
    this.renderer.setProperty(div, 'id', 'container');
    // Append the div to the body element
    this.renderer.appendChild(document.body, div);

    return div;
  }
}
```

>Creates and initializes a custom renderer that implements the Renderer2 base class. [RendererFactory2](https://angular.io/api/core/RendererFactory2)


If you try to inject `Renderer2` directly in a service you will get the following error because it can be only injected in components or directives:

```js
Unhandled Promise rejection: StaticInjectorError[Renderer2]: 
  StaticInjectorError[Renderer2]: 
    NullInjectorError: No provider for Renderer2! ; Zone: <root> ; Task: Promise.then ; Value: Error: StaticInjectorError[Renderer2]: 
  StaticInjectorError[Renderer2]: 
    NullInjectorError: No provider for Renderer2!
```

