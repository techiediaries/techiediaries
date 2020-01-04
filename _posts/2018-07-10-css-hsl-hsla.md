---
layout: post
title: "HSL (and HSLa) Colors in CSS"
image: "images/content/css.png"
excerpt: "In this example, we'll learn to use the HSL (and HSLa) color scheme for defining colors in CSS." 
tags : [html, css , javascript]
---

CSS has a `hsl()` function that is used to define colors in the HSL format which stands for **H**ue, **Saturation** and **L**ightness. All these three values can be set in the `hsl()` function in their respective order.

The hue component of HSL specifies the angle (degrees) in the color wheel.

![HSL Color Wheel](https://i.imgur.com/RzGzNHZ.png)
HSL Color Wheel by [Erin Sowards](http://www.erinsowards.com/articles/2011/01/colors.php). 

- Red has a hue of 0° or 360°,
- Green has a hue of 120°,
- Blue has a hue of 240°.

HSL saturation defines the amount of color, 100% is full saturated color, and 0% is a de-saturated color (gray)

HSL lightness defines the luminance or the brightness of the color (100% of lightness corresponds to the white color for whetever value of hue, 0% of lightness corresponds to the black, and 50% of lightness corresponds to the normal state of the color defined in hue)

Let's take a look at the following CSS example:

```css
:root {
	background-color: hsl(0, 100%, 50%);
}
```



We define a full saturated and normal lightness red color for the background in the `:root` selector which corresponds to the `<html>` element. 

What I like most about HSL is that by remembering the 120, 240, 360 values for green, blue and red you can easily define a range of beautiful colors by playing with the saturation and lightness percentages.

## What About HSLA (Hue, Saturation, Lightness, Alpha)?

HSL has an alpha counterpart that takes a transparency value. It's the `hsla()` function, the last argument specifies the transparency (0 corresponds to full transparency and 1 corresponds to full opacity). For example:

```css
:root {
	background-color: hsla(0, 100%, 50%, 1);
}
```

## References

- [HSL reference](https://tympanus.net/codrops/css_reference/hsl/)
- [HSL Random Color Generator](http://www.mattgroeber.com/utilities/random-color-generator/)
- [Yay for HSLa](https://css-tricks.com/yay-for-hsla/)
- [HSL Color Picker](http://hslpicker.com/)
- [HSLa Explorer](https://css-tricks.com/examples/HSLaExplorer/)

