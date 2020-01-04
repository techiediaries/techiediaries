---
layout: post
title: "Vertical Center in Bootstrap 4"
image: "images/content/bootstrap.png"
excerpt: "In this article, we'll see different ways we can use to center an element vertically in Bootstrap 4." 
tags : [css , bootstrap]
---

Centering elements vertically in CSS or Bootstrap has been always challenging particularly for developers that are not CSS designers.
 
In this article, we'll see different ways we can use to center an element vertically in Bootstrap 4.

Bootstrap 4 has many new features which makes it easy than before to achieve different techniques.

To vertically align items, Bootstrap 4 provides different techniques, such as:
 
-  [Auto-margins](https://getbootstrap.com/docs/4.1/utilities/flex/#auto-margins) combined with Flexbox,
-  [Flex utilities](https://getbootstrap.com/docs/4.1/utilities/flex/)
-  [Vertical Align utilities](https://getbootstrap.com/docs/4.1/utilities/vertical-align/) for changing the vertical alignment of inline, inline-block, inline-table, and table cell elements combined with [Display utilities](https://getbootstrap.com/docs/4.1/utilities/display/)
 

When you want to center an element vertically, you would think of using the[Vertical Align utilities](https://getbootstrap.com/docs/4.1/utilities/vertical-align/) provided by Bootstrap which will will only work with inline elements but what if you want to vertically center an element inside its parent container? 


Let's suppose we have two `<div>` elements styled with Bootstrap `.row` and `.col-md-12` and you want to vertically center the column inside the row.

```html
<body>
<div class="container">
	<div class="row">
	<div id="col" class="col-md-12">
		This needs to be vertically centered.
	</div>
	</div>
</div>
</body>
```

## Vertically Center Elements with Auto Margins

You can center the `#col` element within its parent using auto margins but first you need to make the parent full-height.

Add the `.h-100` class to the row division which will make it take the full available height in its parent. Next, you can center the element using the `.my-auto` utility class:

```html
<body>
<div class="container">
	<div class="row h-100">
	<div id="col" class="col-md-12 my-auto">
		This needs to be vertically centered.
	</div>
	</div>
</div>
</body>
```

Using the `my-auto`  utility class is used to set auto margins on the y-axis, **my** stands for **margin** on **y-axis**:

```css
margin-top: auto;  
margin-bottom: auto;
```

## Vertically Centering Elements with Flexbox

Bootstrap 4 makes use of Flexbox. As such, you can now use the Flexbox utilities to easily achieve different techniques such as vertical center.

You simply need to use the `.align-self-center` class on your element to center it provided that its parent element has the `display: flex` property :

```html
<body>
<div class="container">
	<div class="row">
	<div id="col" class="col-md-12 align-self-center">
		This needs to be vertically centered.
	</div>
	</div>
</div>
</body>
```

> The `.row `class is a flex container so the Flexbox utilities will work fine on it.
> You can also use the  `.align-items-center`  on the  `.row` division  to vertically center all its children.

## Conclusion

In this post, you've seen various ways to vertically center elements within their parent containers.
