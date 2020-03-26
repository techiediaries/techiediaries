---
layout: post
title: "How to Use FormData in TypeScript 3.8"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this tutorial, we'll learn to use FormData in TypeScript 3" 
categories: angular
tags : [typescript] 
---

In this post, we'll learn how to use FormData in TypeScript 3.8 to send an HTML form.

```ts
const form = document.querySelector('form')
const data = new FormData(form);

for (const pair of data) {
    // cool stuff
}
// OR
for (const pair of data.entries()) {
    // cool stuff
}
```

I had no luck with these. Using for..of causes TypeScript to complain that data is not an iterator (I think it is, or at least in JS it can be used like one with for...of), or that data has no such property entries. This makes a little more sense - it doesn't yet in all environments. I tried tweaking my tsconfig.json to target esnext but that didn't do it, and I'd rather keep that set to es5 anyway. Switching to use for..in on data does what you'd expect, really - it enumerates all of the methods available on data:

It turns out the fix for this is subtle - you need to specifically tell TypeScript you're going to be using this method by adding dom.iterable to your tsconfig.json - it's not automatically brought in with 

```json
"dom":
"lib": [
  "dom",
  "dom.iterable",
  "esnext"
],
```

Now you can for (let entry of data.entries()) to your heart's content! That's still not as concise as it could be, though - in JavaScript you can just write (let entry of data). We can allow this pattern in TypeScript by adding one more line to tsconfig.json:
"downlevelIteration": true,    
This compiler option "provide[s] full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'." Now our code can match the JS exactly!

<form>
        <fieldset>
            <legend>Choices</legend>

            <input type="radio" name="choice" id="choice1" value="choice1" checked>
            <label for="choice1">Choice 1</label>

            <input type="radio" name="choice" id="choice2" value="choice2">
            <label for="choice2">Choice 2</label>
        </fieldset>
        <button type="submit">Do The Thing!</button>
</form>
To get at the user's choice, I'm using code like this:
const form = document.querySelector('form')!;

form.onsubmit = (_) => {
  const data = new FormData(form);
  const choice = data.get('choice') as string;
  doCoolThing(choice);
  return false; // prevent reload
};


A few TypeScript-y things to note - I'm using the ! operator at the end of the querySelector call. This is the non-null assertion operator - querySelector returns a value of type Element | null. I prefer to keep strictNullChecks on, so TS doesn't enjoy me trying to operate on form as if it were an element - this operator tells the compiler that I promise there will be a form to select and it won't return null.

Also, FormData.get() returns a value of type string | File | null. This is another case where I've quite literally just written the form myself - I know it's gonna be a string. I'm using as to cast to the proper type.

Finally, I return false to prevent the page from actually reloading - the re-draw to the canvas happens inside doCoolThing, and if the page reloads it'll disappear along with the form data! I'm not sending anything to a server, just using the user input locally on the page.

