---
layout: bpost
title: "Centering Images Horizontally & Vertically in CSS With Flexbox"
image: "images/content/css.png"
excerpt: "In this article, we'll see how to center images in CSS both vertically and horizontally with Flexbox. We'll see how to center images inside flex div containers and then how to adjust that to the whole HTML page using viewport units" 
tags : [css ]
canonical: "https://www.techiediaries.com/css-centering/"
author: kaima 
---

In this article, we'll see how to center images in CSS both vertically and horizontally with Flexbox.

We'll see how to center images inside flex div containers and then how to adjust that to the whole HTML page using viewport units.
 
Centering things in CSS, especially vertical centering, has been intimidating for many developers since we needed to use various hacks and tricks to center elements including text and images.

Thanks to Flexbox, CSS centering becomes easier than before and more straightforward.  

In this article, we'll show you how to center images in CSS by example using Flexbox.

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

Throughout this article, we've seen how to center images inside a container div, horizontally and vertically, using Flexbox' properties like `justify-content` and `align-items` and setting their values to `center`. We have also seen how to center the image by example on the full page by simply making the height of the div as the height of the page using viewport units where `100vh` equals 100% of the height of the viewport.