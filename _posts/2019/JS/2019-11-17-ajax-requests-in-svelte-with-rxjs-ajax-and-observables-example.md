---
layout: post
title: "Make Ajax/Http Requests in Svelte 3: RxJS ajax() and Observables Example"
image: "images/content/sveltejs.png"
excerpt: "In this quick example, we'll see how to make Ajax calls or send HTTP requests in Svelte.js 3 using the RxJS' ajax() method and Observables" 
tags : [sveltejs ] 
---

In this quick example, we'll see how to make Ajax calls or send HTTP requests in Svelte.js 3 using the RxJS' `ajax()` method and Observables.

Svelte 3 has a built-in support for Observables and provides a way to subscribe to them in the markup.

This example is divided in 3 steps:

- Step 1 - Generate a Svelte 3 app
- Step 2 - Import the RxJS 6 library
- Step 3 - Make the Ajax calls
- Step 4 - Subscribing to the RxJS Observable & Rendering data

## Step 1 - Generate a Svelte 3 App 

Let's start with generating our Svelte 3 app using the  [degit](https://github.com/Rich-Harris/degit)  tool.

In your command-line interface, run the following command:

```bash
$ npx degit sveltejs/template svelte-rxjs-ajax-example
```


## Step 2 - Import the RxJS 6 Library

Next, import the RxJS v6 library in the `App.svelte` file as follows:

```js
<script>  
import rx from "https://unpkg.com/rxjs/bundles/rxjs.umd.min.js";  
</script>
```
## Step 3 - Make the Ajax Calls

After importing the RxJS library, we can use the `ajax()` method alongside with various operators for making Ajax calls and parsing the response while returning an RxJS Obervable at the end  
 
```js
<script>  
const { pluck, startWith } = rx.operators;  
const ajax = rx.ajax.ajax;  
   
const apiURL = "https://api.github.com/search/repositories?q=rxjs";  
   
const reposObservable = ajax(URL).pipe(  
    pluck("response"),  
    pluck("items"),  
    startWith([])  
 );  
</script>
```

Please note that the actual Ajax call is made after we susbscribe to the returned RxJS Observable.

## Step 4 -  Subscribing to the RxJS Observable & Rendering data

For actually making the Ajax call, we need to subscribe to the returned Observable from the `ajax()` method.

Svelte 3 provides a way to subscribe to an Observable in the markup by simply preceding it with the `$` sign as follows:

```html
{#each $reposObservable as r}  
  <div>  
    <a href="{r.url}">{r.name}</a>  
  </div>  
{/each}
```

## Conclusion

In this example, we've seen how to send an Ajax request in Svelte 3 using the `ajax()` method of RxJS and Observables
