---
layout: post
title: "Consume a JSON REST API in Svelte 3 with fetch(), onMount() and async/await"
image: "images/content/react.png"
excerpt: "In this tutorial, we'll see an example of consuming a third-party JSON REST API in Svelte.js 3 using the fetch() method available in modern browsers. We'll also see how to import and use the Svelte's onMount() life-cycle method to run code when the component is mounted and the async/await syntax to await a JavaScript promise. Finally, we'll see how to iterate over the fetched data in the template with the `each` block." 
tags : [sveltejs ] 
---


In this tutorial, we'll see an example of consuming a third-party JSON REST API in Svelte.js 3 using the `fetch()` method available in modern browsers. We'll also see how to import and use the Svelte's `onMount()` life-cycle method to run code when the component is mounted and the `async/await` syntax to await a JavaScript promise. Finally, we'll see how to iterate over the fetched data in the template with the `each` block.

These are the steps of this example:

- Step 1 - Initializing a Svelte 3 Project 
- Step 2 - Fetching the JSON Data
- Step 3 - Displaying Data
- Step 4 - Serving the App

We'll learn:

- How to generate a Svelte 3 app and serve it locally,
- How to use the `onMount()` life-cycle method to run code when the component is mounted in the DOM
- How to consume a REST API and fetch JSON data from a remote server using the `fetch()` method 
- How to use the async/await syntax with the `fetch()` and `onMount()` methods to  make asynchronous code look synchronous and avoid using callbacks
- How to iterate over data using the `each` block

We assume you have Node.js and NPM installed on your local development machine.

## Step 1 - Initializing a Svelte 3 Project 

Let's start with our first step where we'll initialize our Svelte 3 project using the  [degit](https://github.com/Rich-Harris/degit)  tool.

In your command-line interface, run the following command:

```bash
$ npx degit sveltejs/template svelte-fetch-example
```


## Step 2 - Fetching the JSON Data

Next, open the the `App.svelte` file where the root component of our app exists and add the following code:

```javascript
<script>
    import { onMount } from "svelte";
    
    const apiURL = "https://jsonplaceholder.typicode.com/todos";
    let data = [];

</script>
```

We imported the  `onMount()`  life-cycle method from “svelte” and defined a couple of variables. Namly the  `apiURL` and  `data` variables,  which hold the URL of the REST API that we're going to consume and the items that will be fetched .

Next, simply call the `fetch()` method inside the `onMount` method as follows:

```javascript
<script>
    // [...]

    onMount(async function() {
        const response = await fetch(apiURL);
        data = await response.json();
    });
</script>    
```

The  `fetch()`  method returns a JavaScript Promise, this means we can use the async/await syntax to avoid using callbacks.

## Step 3 - Displaying Data

In the same `App.svelte` file, add the following HTML markup 
Next, let’s add the following HTML markup to create the UI of our application and display the news data:

```html
        {#each data as item }
            <div>
                <p> {item.title} </p>
            </div>
        {/each}

</div>

```

We use the  `each`  block to iterate over the fetched data items and we display the  `title` of each item.


## Step 4 - Serving the App & Conclusion

After adding the code, let's now serve our app locally to make sure this works. In your terminal, navigate to your project's folder and start the server as follows

```bash
$ cd svelte-fetch-example
$ npm start
```

As a recap, we've seen how to consume a JSON REST API from a third-party server in Svelte 3 using the JavaScript `fetch()` method, the Svelte' `onMount()` method and ES7 async/await syntax. We've also seen how to iterate over the fetched data using the `each` block.  
