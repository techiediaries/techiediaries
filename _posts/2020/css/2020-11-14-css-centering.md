---
layout: post
title: "CSS Centering (Text and Images) with Angular 11 Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn how to center elements in CSS and Angular 11" 
tags : [angular , css] 
---

In this tutorial, we'll learn how to center elements in CSS and Angular 7/8 using the modern Flexbox layout. 

We'll see how to center images in CSS both vertically and horizontally with Flexbox and how to center images inside flex div containers and then how to adjust that to the whole HTML page using viewport units.

Next, we'll learn how to center text in CSS horizontally and vertically with Flexbox.

Centering elements in CSS either horizontally or vertically was always tricky and developers have used many methods which sometimes didn't even make sense particularly for beginners. 

But with the advent of Flexbox, CSS centering became easier and clearer than ever.

We'll make use of [Stackblitz](https://stackblitz.com/edit/angular-css-center?file=src/app/app.component.css) for our Angular project.

## Horizontal Centering

Let's start with horizontal centering. Open the `src/app/app.component.html` file and add the following `<div>`:

```html
<div class="center">
  <h1>Hello Angular 8!</h1>
</div>
```

We add a `div` with a `center` class. Inside it, we add an `<h1>` tag.

Next, open the  `src/app/app.component.css` file and add the `center` class with the following styles:

```css
.center {
  display: flex;
  justify-content: center;
}
```

That's it. our content is horizontally centered by simply making the `div` a flex container and using the `justify-content` property. Here is a screenshot:

![CSS Center Example](https://www.diigo.com/file/image/badcbccczobperbpsczdrsqrqce/angular-css-center.jpg)

## Vertical Centering

Now, let's see how we can center the content vertically using Flexbox.

It's also easy to achieve that using Flexbox by simply adding `align-items:  center`. 

Let's first add the following styles to change the color and height of the containing `div` so we can see the content clearly centered vertically:

```css
.center {
  display: flex;
  height: 300px;
  background-color: #ff1124;
  justify-content: center;
}
```

This is the result:

![CSS Centering](https://www.diigo.com/file/image/badcbccczobperdseozdrsqrrbp/angular-css-center+-+StackBlitz.jpg)

Now, let's apply the vertical centering:

```css
.center {
  display: flex;
  height: 300px;
  background-color: #ff1124;
  justify-content: center;
  align-items: center;
}
```

This is the result:

![](https://www.diigo.com/file/image/badcbccczobperebcpzdrsqrrco/angular-css-center+-+StackBlitz.jpg)

This will center any elements inside the `div`. If you would like to center specific elements, you can use  `align-self: center`, instead, on the element.


```css
.center {
  display: flex;
  height: 300px;
  background-color: #ff1124;
  justify-content: center;
}

.center h1{
  align-self: center;
}
```

If you need to center on the whole page, you can simply give the div the same height as the page:

```css
.center {
  display: flex;
  background-color: #ff1124;
  justify-content: center;
  height: 100vh;
}


.center h1{
  align-self: center;
}
```

This is a screenshot:

![CSS Center Example](https://www.diigo.com/file/image/badcbccczobpereqcazdrsqrroe/angular-css-center+-+StackBlitz.jpg)


## Center Text in CSS Horizontally and Vertically with Flexbox

In this section, we'll learn how to center text in CSS horizontally and vertically with Flexbox.

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


## Centering Images Horizontally & Vertically in CSS With Flexbox

In this section, we'll see how to center images in CSS both vertically and horizontally with Flexbox.

We'll see how to center images inside flex div containers and then how to adjust that to the whole HTML page using viewport units.
 
Centering things in CSS, especially vertical centering, has been intimidating for many developers since we needed to use various hacks and tricks to center elements including text and images.

Thanks to Flexbox, CSS centering becomes easier than before and more straightforward.  
We'll show you how to center images in CSS by example using Flexbox.

## Horizontal CSS Centering

Let's see how to horizontally center an a div with an image.  We simply need to use the `justify-content` property and set the value to `center` on the flex container.

This is an example HTML code with a `div` element that contains an image:

```html
<div class="image-container">
    <img src="image.png" width="100">
</div>
```

To center the image inside the container div, we simply need to make the container a flex box and use the `justify-content` with the `center` value:

```css
.image-container {
  display: flex;
  justify-content: center;
}
```

That's it, we have seen how to horizontally center an image in CSS using Flex box without resorting to old tricks that can be intimidating, especially for new CSS designers and developers.

## Vertical CSS Centering

What's really most difficult is vertical centering but thanks to Flexbox, centering elements vertically is much easier. 

Taking the same HTML example with an image inside a div container:

```html
<div class="image-container">
    <img src="image.png" width="100">
</div>
```

This is the CSS code to center the image inside the div vertically:

```css
.image-container {
  display: flex;
  //justify-content: center;
  align-items: center;
}
```

We simply use the `align-items` property with the `center` value to center the image vertically inside the container div that should be a flex box.


You can also apply the `align-self` property with the value of `center` on the image element itself to center it vertically inside a flex container. This is more helpful if you have multiple elements and want to center a specific one:

```css
.image-container  img {
  align-self: center;
}
```

We have seen how to center images horizontally and vertically inside a container div but what if you need to center it in the full HTML page?

Since Flexbox needs to know the height of the container to align items, we simply need to set the height of the div as the height of the page which can be achieved using viewport units where `100vh` equals 100% of the height of the viewport.

```css
body {
  margin: 0;
}
.image-container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
```

## Conclusion

 
In this article, we've seen how we can center elements in CSS horizontally and vertically using Flexblox which provides easy and clear ways to achieve that without resorting to old CSS tricks.

This example was demonstrated with an Angular 8 project but these tricks are not tied to Angular in any way.

We have seen how to center text horizontally using the `text-align` property with the `center` value.

For vertically centering text in CSS, we have seen both an old and new way. For example, setting the line height  of the text to be centered to the same height as the container of the text or using Flexbox by simply setting the `justify-content` and `align-items` properties to `center`.

We've also seen how to center images inside a container div, horizontally and vertically, using Flexbox' properties like `justify-content` and `align-items` and setting their values to `center`. We have also seen how to center the image by example on the full page by simply making the height of the div as the height of the page using viewport units where `100vh` equals 100% of the height of the viewport.