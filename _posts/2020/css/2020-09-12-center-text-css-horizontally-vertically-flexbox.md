---
layout: bpost
title: "Center Text in CSS Horizontally and Vertically with Flexbox"
image: "images/content/css.png"
excerpt: "In this article, we'll learn how to center text in CSS horizontally and vertically with Flexbox" 
tags : [css].
author: kaima 
---


In this article, we'll learn how to center text in CSS horizontally and vertically with Flexbox.

HTML has the `<center>` tag for centering text but you can also use `text-align` CSS property with the `center` value to center text horizontally.

For vertically centering text in CSS, we have old and new ways. For example, you could set the line height  of your text to the same height as the container of the text or better yet use Flexbox by simply setting the `justify-content` and `align-items` properties to `center`.


This what we'll be covering in this article:

-   Centering text without CSS using the `<center></center>` tag,
-   Centering text with CSS.
-  Centering text horizontally using  `text-align` property.
- Centering text vertically using Flexbox.

## Centering Text Horizontally Without CSS Using the `<center></center>` Tag

You can use the `<center>` tag to center the enclosed text. This is a quick example:

```html
<center>This text will be centered!</center>
```

Please note that this is not the recomended way to center text. Also the `<center>` tag is now deprecated. Event if still works you should use CSS to center text and to handle presentation. 

## Centering Text Horizontally with CSS

You can center text in CSS very easily using the `text-align` property with a `center` property.

For one text element that you want to center in your page, you can use the `style` property with the text-align property as follows:
 
```html 
<p style="text-align:center">This text will be centered!</p>
```

We simply set the value of `text-align` to `center`. 

### Using a CSS Class to Center Text Horizontally

In case, you need to center multiple text elements, it's better to use a CSS class instead of repeating the same CSS text centering code across multiple elements in your HTML document. For example:


```css
<style>
.centered-text {
 text-align: center
}
</style>
```

You can then apply the `.centered-text` class to your text element to center it as follows:

```html
<p class="centered-text">This text is centered!</p>
```

You can also use the `p` CSS selector to center text in  all `<p>` elements in your HTML document:

```css
<style>
p {
 text-align:center
}
</style>
```

So as we have seen, horizontally aligning text in CSS is quite easy. You just need add the `style` property and set the `text-align` to `center` or also using a class or a CSS selector.

## Centering Text in CSS Vertically Using the Line Height

What's more intimidating is vertically centering text.

There are old and new CSS methods to do that.

For example, for one line of text, you can easily vertically center it by setting the line height to be the same height as the container. Our container has 500 pixels in height, so if we only have one line of text we simply set the line height to 500 pixels and that text will be vertically centered.

## Centering Text in CSS Vertically Using Flexbox


But if you have more than one line of text, the previous trick will not work if we want to vertically center them. Fortunately for us, there is a modern approach which is using CSS Flexbox layout.

Let's take this example:

```html
<div class="container">
    <h1>Center text</h1>
    <h2>With Flexbox</h2>
</div>
```

```css
.container h1, .container h2 {
  text-align: center;
}

.container {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

We simply set the `display` property to `flex` and then set the `justify-content` and `align-items` properties to `center`.

## Conclusion

In this article, we have seen how to center text horizontally using the `text-align` property with the `center` value.

For vertically centering text in CSS, we have seen both an old and new way. For example, setting the line height  of the text to be centered to the same height as the container of the text or using Flexbox by simply setting the `justify-content` and `align-items` properties to `center`.



