---
layout: bpost
title: Ionic 5 Content Padding Example 
date: 2020-03-30 13:33
categories: ionic 
author: ahmed
tags: [ionic, ionic-5]
excerpt: "In Ionic 5, there are some changes regarding how we  set padding of the ion-content component"
---

In Ionic 5, there are some changes regarding how we  set padding of the `ion-content` component.

We set the padding by using these CSS custom properties:

- `--padding-bottom` Bottom padding of the content

- `--padding-end` Right padding if direction is left-to-right, and left padding if direction is right-to-left of the content

- `--padding-start` Left padding if direction is left-to-right, and right padding if direction is right-to-left of the content

- `--padding-top` Top padding of the content

For example, in the SCSS file associated with your component, you need to add:

```scss
ion-content {
  --padding-bottom: 10px;
  --padding-end: 10px;
  --padding-start: 20px;
  --padding-top: 20px;
}
```

This should add padding inside the content area.

You need to replace the attributes Ionic 4 to CSS classes in Ionic 5. For example:



```markup
<ion-header text-center></ion-header>
<ion-content padding></ion-content>
```

Becomes:

```markup
<ion-header class="ion-text-center"></ion-header>
<ion-content class="ion-padding"></ion-content>
```

Or also

```markup
<ion-content color="primary" padding></ion-content>
```

Becomes:

```markup
<ion-content color="primary" class="ion-padding"></ion-content>
```


