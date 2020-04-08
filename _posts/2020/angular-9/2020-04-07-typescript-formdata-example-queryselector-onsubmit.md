---
layout: bpost
title: "FormData in TypeScript: Submit Form with querySelector and onsubmit"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this tutorial, we'll learn to use FormData in TypeScript 3.8" 
tags : [typescript] 
---

In this post, we'll learn how to use FormData in TypeScript 3.8 to submit an HTML form. We'll also see how to:

- `querySelector` to query for a DOM element,
- `onsubmit` for handling the form's submit event. 


We'll be using Stackblitz for quickly creating a TypeScript app without setting up a local development in our machine.

Head to [https://stackblitz.com](https://stackblitz.com) and create a new TypeScript app.

Next, open the `index.html` file and update it as follows:

```html
<div id="app">
	<form id="myform">
		<fieldset>
			<label>
        Name: 
      </label>
			<input type="text" name="textInput"/>

    </fieldset>
		<button type="submit">Submit</button>
	</form>
</div>
```

We created a form with `myform` ID and two `label` and `input` elements.

Now, let's see how we can submit this form from TypeScript.

Open the `index.ts` file and update it as follows:

```ts
// Import stylesheets
import './style.css';


const form: HTMLFormElement = document.querySelector('#myform');


form.onsubmit = () => {
  const formData = new FormData(form);

  const text = formData.get('textInput') as string;
  console.log(text);
  return false; // prevent reload
};
```

We used the `querySelector` method to query for the form with the `myform` ID.

> The [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement) interface represents a `<form>` element in the DOM. It allows access to—and, in some cases, modification of—aspects of the form, as well as access to its component elements.

Next, we used the `onsubmit` method of the form to listen for the submit event on the form.

Inside the handler arrow function passed to the `onsubmit` method, which will be used to handle the form submission, we create an instance of `FormData` and we pass in the form element to the instance.

Finally, we simply displayed the form data in the console by using the `get` method of `FormData` to get the value entered in the `input` field.


This is the [example in Stackblitz](https://stackblitz.com/edit/typescript-formdata-example).