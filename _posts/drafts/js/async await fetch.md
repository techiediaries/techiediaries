## Fetch It

If you've been using JavaScript for a while, you've probably used the ES6 fetch API, I actually covered it somewhat in my previous post where I decided to refactor a bit of code, that was using the  [GitHub API to return user information](https://fundamentalsofcode.com/refactored-javascript-without-jquery/). It was a fun post and a little bit of work, and I actually learned a little bit more about using the fetch API myself. Especially as it relates to async JavaScript methods.

## [](https://dev.to/shoupn/javascript-fetch-api-and-using-asyncawait-47mp#a-little-bit-about-fetch)A Little Bit About Fetch

Using  `fetch()`  can be thought of as using a lower level API for performing your needs to return a response from a URI, in other words sans framework or library.  `fetch`  was introduced so that developers could more easily make requests to URI's or rest endpoints for applications. Before this the standard was to use ajax calls to using the something the XMLHttpRequest like so  `var xhr = new XMLHttpRequest;`. It's not bad, and still exists in a lot of legacy code out there, so you should also have an understanding of how this works, and the origins of XMLHttpRequests, as this was the standard before REST came to the scene.

## [](https://dev.to/shoupn/javascript-fetch-api-and-using-asyncawait-47mp#the-promise-code)The Promise Code

The below code is not bad, and it does function correctly, however, there are a couple of things about it that make it a little cringe-worthy. Notice the  `.then()`  function, which supports a callback function for resolving the  `fetch`  function. As I said this functions and is fairly readable. In the few short lines of code that it is. However, there are the chaining of .then()'s and this can lead into what is often referred to as callback hell, or nested callbacks, that quickly reduce readability and can easily lead to bad performance or bugs.

```
function getUser(name){
 fetch(`https://api.github.com/users/${name}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
  });
};

//get user data
getUser('yourUsernameHere');

```

## [](https://dev.to/shoupn/javascript-fetch-api-and-using-asyncawait-47mp#async-and-await-to-the-rescue)Async And Await to the Rescue

Using Async/Await is not fully supported across all browsers, so you should be aware of this, and check your needs when developing. Here is a  [resource for checking browser](https://caniuse.com/#feat=async-functions)  support and functionality, and  [check here for using  `fetch`](https://caniuse.com/#feat=fetch). These keywords didn't all make it into the initial ES6 implementation of JavaScript but expect this to be more widely supported across browsers. In my opinion and experience, the below code allows for much easier readability. Keep in mind that in order to call a function using the  `await`  keyword, it must be within the  `async`  function as in the below example. This is just the syntactical sugar of making things more readable, in turn handling the return of a  `Promise`  object more seamlessly and feels more like a synchronous function call rather than asynchronously handled.

```
async function getUserAsync(name) 
{
  let response = await fetch(`https://api.github.com/users/${name}`);
  let data = await response.json()
  return data;
}

getUserAsync('yourUsernameHere')
  .then(data => console.log(data)); 

```

There's a lot that can be covered in this topic, but I thought this was a nice explanation of using these newer features and what to expect in the future as they become more widely supported. I know professionally I still have to support IE 11, but don't let something like that hold you back from using these newer features of the evolving JavaScript language. It really is a beautiful thing to behold.