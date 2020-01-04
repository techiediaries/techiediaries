---
layout: post
title: "Creating layouts with Flexbox — flex, flexDirection, justifyContent & alignItems"
image: "images/content/reactnative.png"
excerpt: "In this tutorial, we’ll learn about Flexbox properties such as flex, flexDirection, justifyContent & alignItems to build layouts in React Native"
tags: [ 'reactnative' ] 
categories: react-native-tutorial
---

In this tutorial, we’ll learn about Flexbox properties such as `flex`, `flexDirection`, `justifyContent` & `alignItems` to build layouts in React Native.

React Native makes use of Flexbox for creating layouts. This is the similar layout available in modern CSS except that the `flexDirection` defaults to `column` instead of `row`, and the `flex` parameter supports only a single number (a proportion of the available space).

In Flexbox, items are laid out horizontally or vertically (default) depending on the value of the `flexDirection` property (`row` | `column` | `row-reverse` | `column-reverse` ).

## The `flex` property

The `flex` property is designed to specify a proportion of the available space (vertical or horizontal depending on `flexDirection`) for a child element.


> **Note**: You don’t need to add `display: flex` to a container to make it a flex container. Elements are by default flex containers. 

You can also use properties like `justifyContent` and `alignItems` to align items either on the X-axis or the Y-axis.

## The `justifyContent` property

You can use the `[justifyContent](https://facebook.github.io/react-native/docs/layout-props#justifycontent)` property to define how to align items in the main axis of a container. The main axis can be either the X-axis or the Y-axis depending on the value of `flexDirection` which means:


- When `flexDirection`  is set to `column` , `justifyContent` will align items vertically,
- When `flexDirection`  is set to `row` , `justifyContent` will align items horizontally,

You can align items in many ways:


- `flex-start` (default): Align the items to the start of the container,
- `flex-end`: Align the items to the end of the container,
- `center`: Align the items in the center of the container,
- `space-between`: Align the items across the main axis of the container with equal space between them.
- `space-around`: Align the items across the main axis of the container, the remaining space will distributed around all items i.e to the beginning of the first child and end of the last child.

## The `alignItems` property

You can use the [`alignItems`](https://facebook.github.io/react-native/docs/layout-props#alignitems) property to specify how to align items along the cross axis of the container.

`alignItems` is similar to `justifyContent` but it aligns items according to the cross axis.

It takes the following values:


- `stretch` (default): Stretch children of a container to match the `height` of the container's cross axis.
- `flex-start` Align children of a container to the start of the container's cross axis.
- `flex-end` Align children of a container to the end of the container's cross axis.
- `center` Align children of a container in the center of the container's cross axis.
- `baseline` Align children of a container along a common baseline. Individual children can be set to be the reference baseline for their parents.


> **Note**: You can use this [playground](https://yogalayout.com/playground/) to visually play with Flexbox. 

Equipped with this basic information about Flexbox, let’s understand our previous snippet and improve it:


        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }

This is the style object applied to the `<View>` component.

We used the `flex` property to assign the available space to the container `<View>`. This means it will span all the viewport since we only have one `<View>` component. 

We used the `justifyContent` property with a `center` value to center the children of the `<View>` component vertically and the `alignItems` property set to `center` to center the children of the `<View>` horizontally.

This makes the **Hello, world!** text (wrapped within the `<Text>` component) vertically and horizontally centered in our application:


![React Native Text Example](https://paper-attachments.dropbox.com/s_546E03E6D3AEC752448040541BFE85E713119677F02CAE32E634AD5547D449ED_1564928638096_Screenshot_1564928597.png)


 




















