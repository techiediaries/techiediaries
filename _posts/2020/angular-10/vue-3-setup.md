---
layout: bpost
title: "Vue 3 Setup Function"
image: "images/content/vue3.png"
excerpt: "How to use Vue 3' setup function by example"
date: 2020-08-27
tags : [vue3, vuejs, vue]
---

In this example, we'll learn about the `setup()` function in Vue 3.


## What's the `Setup` Function in Vue 3?

Vue 3 introduced the composition api as an alternative to the options api in Vue 2 for writing components.

A Vue 3 component needs to have a `setup()` function which is a part the Composition API. This function will be executed before creating the component object. As a side effect, `this`, that refers to the component itself, is not available in the `setup()` function.

## Why Using the Vue 3 `Setup` Method?

In the body of the `setup()` function, you can declare the data properties, computed methods, watch methods, and any required JS methods needed by the component. 

It will then return an object containing all the public methods and data properties which you can then access from the component's template.