---
layout: bpost
title: "Bootstrap 4 Custom File Input Button Text"
image: "images/content/angular.png"
excerpt: "In this quick tip article, we'll see how to add comments to the package.json file"
date: 2020-09-15
tags : [json , javascript]
---

In this quick tip article, we'll see how to use custom text and styles with Bootstrap 4 file input.

## Bootstrap 4 File Input 

HTML file input enables you to upload one or multiple files such as images or import data from files.


## Bootstrap 4 Basic and Custom Input

Bootstrap 4 enables you to use two types of file inputs which are basic and custom inputs. 

You can simply add the `.form-control-file` to your `<input>` element for a basic file input.

For the custom file input, you need to add the `.custom-file-input` class to the `<input>` element and the `.custom-file-label` class to the `<label>` element.

This a basic Bootstrap 4 file input example:

```html
<div class="form-group">
    <label for="input1">Example file input</label>
    <input type="file" class="form-control-file" id="input1">
</div>
```

This is a second example with a custom file input:

```html
<div class="custom-file">
    <input type="file" class="custom-file-input" id="customInput">
    <label class="custom-file-label" for="customInput">Select file</label>
</div>
```

## Customize the File Input with Bootstrap

You can use the Bootstrap 4 classes and CSS to customize the custom file input.

Let's take the following example:

```html
<div class="container">
    <label class="custom-file" for="customInput">
        <input type="file" class="custom-file-input" id="customInput" aria-describedby="fileHelp">
        <span class="custom-file-control form-control-file"></span>
    </label>
</div>
```

This is the CSS code for customizing the file input:

```css
#customFile .custom-file-control:lang(en)::after {
  content: "Select file...";
}

#customFile .custom-file-control:lang(en)::before {
  content: "Click me";
}
```

## Displaying the Selected File Name with JavaScript

You can display the selected file name with JavaScript. 

Let's assume we have a `custom-file-input` element with label that is the next sibling element to the input.

We can use the following JavaScript code for displaying the file name after selecting a file"

```js
document.querySelector('.custom-file-input').addEventListener('change',function(e){
  var fileName = document.getElementById("exampleInputFile").files[0].name;
  var nextSibling = e.target.nextElementSibling
  nextSibling.innerText = fileName
})
```

## References

- [https://www.codeply.com/p/LtpNZllird](https://www.codeply.com/p/LtpNZllird)
- [https://stackoverflow.com/questions/43250263/bootstrap-4-file-input](https://stackoverflow.com/questions/43250263/bootstrap-4-file-input)


