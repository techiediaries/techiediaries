---
layout: post
title: "Access/Update CSS Variables with JavaScript"
image: "images/content/html5.png"
excerpt: "CSS variables (or custom properties) are powerful additions to CSS. Among other features, they allow you to live update the DOM in JavaScript. Dynamically updating CSS variables will make it easier to create advanced requirements such as dynamic and live themes." 
tags : [css]
---

CSS variables (or custom properties) are powerful additions to CSS. Among other features, they allow you to live update the DOM in JavaScript. Dynamically updating CSS variables will make it easier to create advanced requirements such as dynamic and live themes. 

Let's see, by a simple example, how we can dynamically update the colors of a page.

First, let's create an HTML page with the following code:
	
```html
<button  onclick="changeDocColor()">Change color</button>
 ```

The `setProperty()` method will accept any valid CSS code, the value string may include the var() function as well. That would allow us to predefine our color before using it, in order to perhaps reuse it elsewhere?

```css	
:root { --bg-color: blue; }
```

[`:root`](/css-root) is a CSS pseudo-class that selects (or matches) the root element of a  document. In the case of HTML, `:root` refers to the `<html>` element i.e using it is equivalent to using the `html` selector but has a higher specificity. 


By adding the CSS variables inside the `:root` selector we make them available in the global scope of the document so they are accessible from any other element.

We use `--` to define a CSS custom property.

```js
function changeBackgroundColor() {
    elem.style.setProperty('--bg-color', 'red');
}
```

Let's understand the code:

    4 — grab footer element
    5 — grab NodeList of all inputs on the page
    7 — input CHANGE EventListener
    8 — input MOUSEMOVE EventListener(updates dynamic margin on slide)
    10 — fn to set the value of the desired CSS var(note we add px to the margin var on line 14)
