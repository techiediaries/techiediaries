---
layout: post
title: "CSS Centering with Angular 7/8 Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn how to center elements in CSS and Angular 8" 
tags : [angular , css] 
---

In this tutorial, we'll learn how to center elements in CSS and Angular 7/8 using the modern Flexbox layout. 

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

## Conclusion

In this quick example, we've seen how we can center elements in CSS horizontally and vertically using Flexblox which provides easy and clear ways to achieve that without resorting to old CSS tricks.

This example was demonstrated with an Angular 8 project but these tricks are not tied to Angular in any way.