---
layout: post
title: "HTML Tutorial: Angular 7/8 Template Syntax - Interpolation, ngFor & ngIf Directives"
image: "images/content/html.png"
excerpt: "In this tutorial, we’ll teach you HTML which is used as the template language for Angular. We’ll build a simple HTML app before tackling any Angular concepts since it’s a prerequisite in any web development and one of the three pillars of the web along with JavaScript and CSS."
tags: [ html, angular, angular8, angular-9-ngfor-examples, angular-9-ngif-examples, angular-9-router-examples, angular-9-tutorials ] 
---
 
In this tutorial, we’ll teach you HTML which is used as the template language for Angular. We’ll build a simple HTML “app” using JAMStack approach and we'll learn about the Angular advanced concepts (Such as data binding, interpolation, loops with the `ngFor` directive , and conditional rendering with the `ngIf` directive). HTML is a prerequisite in any web development and one of the three pillars of the web along with JavaScript (or compiled TypeScript) and CSS.

> **Note**: HTML is the language of Angular templates


## What is HTML?

**HTML** stands for **HyperText Markup Language** is an artificial markup language that can be used by programmers to create the structure of web documents. It’s one of the three pillars of the web along with JavaScript and CSS. It can be interpreted by a web browser which transforms an HTML source code comprised of HTML tags to an actual web page with text, tables, forms and links etc.


## How Does Angular Use HTML?

A web browser can only understand plain HTML, JavaScript and CSS. While Angular uses HTML for creating views, it adds some template structures such as loops and conditional directives along with other syntax symbols for variable interpolation and data binding which are not part of HTML thus they are compiled ahead of time and transformed to plain HTML.

An Angular application is executed when a typical `index.html` file is served to the browser:


```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular Demo</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

The JavaScript bundles for Angular are built and injected into the `index.html` file after building the application.

Except for the typical HTML tags, we also have a custom `<app-root>` tag which is used to include the Angular root component which is by convention called `App`. This will result in including all the children components and eventually the full Angular application.

Angular also uses HTML for the individual components' templates which are used to create the views of the application.

For example, the root component in an Angular application generated with the official Angular CLI has an associated template called `app.component.html`. This is not a convention as we should explicetly tell the component where to find the template. This is done using a `templateUrl` meta-property as follows:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Demo';
}
```

We can also use an inline HTML template using a `template` property.

> **Note**: The `<html>`, `<body>`, and `<base>` tags have no useful role in Angular templates.

## Angular Template Syntax

In Angular templates, you can use plain HTML but also special syntax and directives that allow you to take benefits of the full power of Angular features such as interpolation, binding, ngClass, ngStyle, ngFor and ngIf, etc.

### Interpolation

Interpolation enables you to use variables and expressions in your HTML template, either between HTML element tags or within attribute assignments. 

You can embed a variable or expression in your HTML templates using the double curly braces, `{{` and `}}`.

For example, in the previous `App` component, we have a `title` variable with an initial value of `Angular Demo`. We can use interpolation to display this value in the related `app.component.html` template:

{% raw %}
```html
<h1>{{title}}</h1>
```
{% endraw %}

Angular will dynamically replace the title variable with its value in the template.

> **Note**: You can change default interpolation delimiter used by Angular by using the [interpolation](https://angular.io/api/core/Component#interpolation) property in the component metadata.

## Angular Built-In Directives: ngFor and ngIf

Angular provides many builtin directives such as `ngFor` for iterating over arrays of data and `ngIf` for conditionally rendering HTML elements.

The `ngFor` directive allows you to iterate through arrays in your HTML templates while `ngIf` allows you to express conditions in your template. These are powerful programming-like constructs that extend HTML thanks to Angular.

We'll see below how to use `ngFor` and `ngIf` with a practical example.

## Extending HTML with Angular Components and Directives

Angular allows you to extend the HTML vocabulary of your templates with components and directives that can be considered as new elements and attributes.



## What is an HTML Document?

An HTML document is simply a plain text document with the `.html` extension instead of `.txt`
 
Most tags have opening and closing parts. Each tag begins with `<` symbol and ends with `>` symbol.   For example:


- The topmost tag that defines and HTML document is `<html></html>`. All the content should be contained between the opening and closing tags.
- The body tag that defines the body of the web page is `<body></body>`.
- The tag to add a title of the page is `<title> … </title>`. etc.

Tags can have attributes that provide extra information to the browser for how to display the element.


> Web servers serve only plain HTML to web browsers without any server-side programming constructs. 

 
HTML is an essential requirement if you want to create websites. Most developers start their journey in web development by learning HTML, this is the case for both  frontend developers that use JavaScript to create client-side apps and backend developers that use server-side languages like PHP or Python to create web apps. 



> **Notes**: You can also use JavaScript frameworks like Angular or libraries like React or Vue to create apps with JS and HTML. All these tools, make use of components that use HTML as the template language for creating views.
> 
> You can extend HTML by creating new tags using custom elements and web components which are standard browser technologies that don’t require a third-party tool, framework or library to be interpreted by the browser. 


## Prerequisites

You don’t need a fully-fledged development environment with a lot of tools installed to start learning HTML. You only need a text editor (that optionally has syntax highlighting for HTML) and a web browser like Chrome or Firefox or even IE.

You also need some basic knowledge to work with your operating system, Windows, Linux or macOS, particularly how to create and open files.

You can also use online development environments such as [CodePen](https://codepen.io/), [JSBin](http://jsbin.com/) or  [JSFiddle](https://jsfiddle.net/) for trying HTML without creating files in your computer. Actually, these online environments are most useful if you are unable to create files in your system or you are using devices like phones and tablets while you are learning HTML, JavaScript or CSS.

In this tutorial, I’ll assume you are working with a Unix-based terminal (present in macOS or Linux) and can be installed on Windows. Don’t worry though, the command we’ll use is for navigating to a working folder and creating a file, you can do this in your preferred way.  

HTML is not a programming language but instead a markup language that you can use to apply tags on some text to give it a semantic or meaning, create a structure for a page like header, footer, columns, sections and navigation menus. It can be also used to add images and videos to your pages from local or external sources.


> **Note**: A programming language has advanced constructs and features like loops for iterating over arrays of data and conditional statements for making decisions etc. HTML doesn't have these constructs so It can’t be considered as a programming language since It just displays and formats visual elements on a web page. 
> 
> Many template languages are built on top of HTML to provide these constructs. For instance, Angular provides a template syntax that includes data binding like interpolation for easily updating the page with data from the parent component, and directives such as `*ngFor` and `*ngIf` for iterating over data and displaying HTML elements conditionally.  


## Creating the very basic HTML document

Go ahead and open a terminal and run the following commands:


    $ cd ~
    $ mkdir my-first-webpage
    $ cd my-first-webpage
    $ touch index.html

    
We simply navigate to the home folder. Next, we create a folder called `my-first-webpage`. Next, we navigate inside it and create an `index.html` file.
 
Now, use a text editor (like Vim or whatever you prefer) and open the `index.html` file. Next, simply add the following code:


    <!DOCTYPE html>
    <html>
      <head>
        <title>My first HTML page</title>
      </head>
      <body>
        <p>This is my first web page</p>
      </body>
    </html>     


We first add a doctype which must be present. Nowadays in modern browsers that understand HTML5 it’s mostly useless, but required. In the old days, it was used to link to some type definition documents that contain syntax rules of the language. 

According to [Wikipedia](https://en.wikipedia.org/wiki/Document_type_declaration), this is the definition of a doctype:


> A **document type declaration**, or **DOCTYPE**, is an instruction that associates a particular SGML (for example, a webpage) with a document type definition(DTD) (for example, the formal definition of a particular version of HTML 2.0 - 4.0) or XML document. In the serialized form of the document, it manifests as a short string of markup that conforms to a particular syntax.

   

Next, we add an opening `<html>` tag with its closing `</html>` tag which mark the start and end of the HTML code. Between these two tags, you can add the necessary code for creating your web page. 

Next, we add the head section of the document using the `<head>` and `</head>` tags: The `[<head>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head)` element is sort of a container for all the tags that represent some information about your document such as the title which is added using a `<title>` element. Inline CSS styles or links to external CSS files or meta tags. 

Next, we add the `<body></body>` section which contains the content of your web page.

Inside the body, we add **This is my first web page** paragraph wrapped by the `<p>` and `</p>` tags.

Now, go ahead and open the index.html file with your web browser (Make sure to save its content in the text editor). You should not see the tags but a rendered blank page with **This is my first web page** just like in the following screenshot:


![My first HTML page](https://paper-attachments.dropbox.com/s_1CD79E9FC94E7E377A7BFC7E24054592C06613BE95B9EC02F24C63D9DEA5BF8C_1564362980143_first-webpage.PNG)



## Escaping Special HTML Characters

HTML has a set of special characters such as `<` and `>` which are used to surround the tag names also characters like `"` and `'` used for the values of tag attributes and  `&`.  So, how can you display these characters in your HTML page? i.e tell the browser not to interpret them but simply display them like regular content. You can do this by **escaping** these characters using their codes:


![](https://paper-attachments.dropbox.com/s_9316621809BE02A9E86F709F3D533FA6006B93AB22AE1DB251B5048103898D4A_1566590262941_8927657_520409957_39235177.png)


Each code begins with `&` and ends with `;`.


## HTML Comments

When you are writing HTML code, you may need to comment your code but you don’t want these comments to appear in the web page since they are only intended for your or other developers that read the source code of your web page.

To write a comment, HTML provides `<--` and `-->` tags. You should surround you comment with them. For example!


    <!-- This is a comment -->



> **Note**: In web browsers, you can read the source code of any web page that is currently displayed without any restrictions using **View page source** from a contextual menu or pressing **CTRL + U** in your keyboard. These instructions are valid for Chrome but you should find similar instructions for other browsers.

 


## HTML Links and Navigation

HTML provides hypertext links using the `<a>` tag which works by surrounding a text that becomes the link. The target page is specified using the `href` attribute. For example:


    <a href="https://www.techiediaries.com">Go to Techiediaries</a>

The href value can reference a local HTML document using its relative path or an external document using its URL (Uniform Resource Locator).


> **Note**: You also need to know about HTML Headers, HTML Paragraphs, HTML Sections, HTML Tables, and HTML Forms.


Let’s create a simple HTML website which has pages like home, about and contact page.

In the contact page, we’ll add an HTML form and thanks to cloud services users can submit their information without needing to add a backend for our app, we’ll use a cloud service FormSpree which allows us to get what usesr  submit using our form via emails.
 
## Can you build something useful with HTML alone? 
 
Yes, you can! Not fully-fledged apps but you can create a static HTML website which you can use to share information with your visitors. You’ll be able to create multiple pages and add navigation between them and you can add content, paragraphs, divisions, sections, headlines and horizontal lines which are enough to present a document or article with a basic appearance.

But if you want to take it further, you can use a front-end framework like Angular to build powerful apps that can be hosted in a web server and even server rendered in the server before sent the browser which are required for SEO and performance purposes.


