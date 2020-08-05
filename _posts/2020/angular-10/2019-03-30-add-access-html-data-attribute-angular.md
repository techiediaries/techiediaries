---
layout: post
title: "HTML5 Data Attributes in Angular 10/9"
image: "images/content/django.png"
excerpt: "In this quick tutorial, we'll see how you can add/set and access HTML5 data attributes in Angular 10/9"
date: 2020-08-05 
tags : [ angular ]
---

![HTML5 Data Attributes in Angular](https://www.techiediaries.com/images/angular-html-data-attribute.png)


In this quick tutorial, we'll see how you can add/set and access HTML5 data attributes in [TypeScript and Angular 10](https://www.techiediaries.com/typescript-tutorial/).

We assume you have an Angular 10 project up and running.

We'll be using [https://stackblitz.com/](https://stackblitz.com/edit/angular-set-access-data-attribute-binding?file=src/app/app.component.ts) for this demo and for the sake of simplicity we'll be working on the existing app component.

> Also read how to build a full-stack app in our [Angular 10 tutorial](https://www.techiediaries.com/angular/angular-9-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/). 

## Adding a TypeScript Array

Open the the `src/app/app.component.ts` file and the following array which holds a set of messages:

```ts
export class AppComponent  {
  name = 'Angular';

  messages = [
    {
      id: 11214544,
      text: "Message 11214544"
    },
    {
      id: 11214545,
      text: "Message 11214545"
    },
    {
      id: 11214546,
      text: "Message 11214546"
    },
    {
      id: 11214547,
      text: "Message 11214547"
    }

  ]
}
```

## Displaying the Array of Data with Angular 10 `ngFor`

Next, open the `src/app.component.html` and add the following code:

{% raw %}
```html
<h1>
  Messages
</h1>

<ul>
  <li *ngFor="let message of messages">
    {{ message.text }}
  </li>
</ul>
``` 
{% endraw %}

We simply loop through the `messages` array using the `*ngFor` directive and display the text of each message using curly braces.

This should give us the following output:

![Angular 10 data attribute binding](https://www.diigo.com/file/image/bbccosoazoabpdccppzdqscaqcd/angular-set-access-data-attribute-binding+-+StackBlitz.jpg) 

## Using HTML Data Attributes with Angular 10

Now, let's suppose we have a requirement in which we need to add the message ID to the `<li>` element holding the given message.

We can simply use data attributes for implementing this requirement. 

Let's first see the [definition of data attributes from w3schools](https://www.w3schools.com/TagS/att_global_data.asp):

>The data-* attributes is used to store custom data private to the page or application.
>
>The data-* attributes gives us the ability to embed custom data attributes on all HTML elements.
>
>The stored (custom) data can then be used in the page's JavaScript to create a more engaging user experience (without any Ajax calls or server-side database queries).
>
>The attribute name should not contain any uppercase letters, and must be at least one character long after the prefix "data-"

Data attributes are easy to set and access in HTML and JavaScript but since we are using Angular we need little more work!

Now, let's change our previous template to add a data attribute that holds the ID of ecah message to `<li>` element. Go back to the `src/app/app.component.html` file and add the following changes:

{% raw %}
```html
<h1>
  Messages
</h1>

<ul>
  <li *ngFor="let message of messages" [attr.data-message-id]="message.id">
    {{ message.text }}
  </li>
</ul>
```
{% endraw %}

We simply use attribute binding to add and set a value for a data attribute.

According to [Angular docs](https://angular.io/guide/template-syntax):

>Attribute binding syntax resembles property binding. Instead of an element property between brackets, start with the prefix attr, followed by a dot (.) and the name of the attribute. You then set the attribute value, using an expression that resolves to a string.

> Check out how to use [HTML data attributes with TypeScript and Angular 10](https://www.techiediaries.com/angular/textarea-keydown-focusin-events/) for tracking the unread messages in a chat UI.

Now, if you insepct your page DOM, you'll see that each `<li>` tag has a `data-message-id` attribute with the corresponding message ID from the array.

![Angular 10 Data Attribute Binding](https://www.diigo.com/file/image/bbccosoazoabpddbrbzdqscaqse/Screenshot+from+2019-03-31+00-09-35.jpg?k=264adb26f4590a693a87b4654470d0dc)

After adding and setting the value of the data attribute, let's see how we can access and get the value of the attribute in Angular.

Go back to the `src/app/app.component.html` file and add the following changes:

{% raw %}
```html
<ul>
  <li #messageEl *ngFor="let message of messages" [attr.data-message-id]="message.id">
    {{ message.text }}
    <br><button (click)="logMessageId(messageEl)">Console Log </button>
  </li>
</ul>
```
{% endraw %}

We add reference variable called `#messageEl` to the `<li>` tag and we also add a `<button>` and bind its click event to a `logMessageId()` method which takes the template reference variable of the `<li>` tag.

Next, open the `src/app/app.component.ts` file and add the `logMessageId()` method to the component:

```ts
  logMessageId(el){

    let messageId = el.getAttribute('data-message-id');
    //let messageId = el.dataset.messageId;
    console.log("Message Id: ", messageId);

  }
```

We can get the value of the data attribute using the `dataset` property or the `getAttribute()` method on the `messageEl` template reference variable.

If you click on the **Console Log** button, you should see the value of the `data-message-id` data attribute of the corresponding message displayed on the console.


## Conclusion

That's it for this quick tutorial. We have seen how we can add and access HTML5 data attributes in Angular 10. You can see the demo example we've used in this tutorial in this [link](https://stackblitz.com/edit/angular-set-access-data-attribute-binding).









