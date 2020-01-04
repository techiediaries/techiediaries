---
layout: post
title: "Using Bootstrap 4 with Vue"
image: "images/content/vue.jpg"
excerpt: "In this tutorial we'll see how to integrate Bootstrap 4 with a Vue 2.x application without using jQuery" 
tags : [javascript , vue , bootstrap, vuejs] 
---

In this article I'll show you how to integrate the latest version of Bootstrap (Bootstrap 4) with your Vue application.

Bootstrap 4 has many new features such as the use of Flexbox, ES6 modules and a new card component (which you can use to easily craft card-based layouts such as the famous Masonry layout without JavaScript/jQuery plugins or complex algorithms) etc.

You can use Bootstrap 4 to add mobile first styling to your Vue application without re-inventing the wheel and without having to acquire deep CSS knowledge  particularly if you need to create complex and responsive layouts.

Bootstrap 4 requires jQuery and Popper.js. jQuery is a DOM library that makes a direct manipulation of the DOM unlike Vue which uses the virtual DOM approach so you'll want to avoid using jQuery within your Vue application but this means you won't be able to use many Bootstrap 4 components that requires jQuery?

Don't worry though the community has provided some packages that integrate Bootstrap 4 with Vue  without resorting to jQuery. Let's see the most popular libraries 
 
So let's get started with the first library that you can use to integrate your Vue application with Bootstrap 4

 
## [Bootstrap-Vue](https://bootstrap-vue.js.org/)
  ![](https://screenshotscdn.firefoxusercontent.com/images/030f06e4-c4cc-4e09-aa12-e8843bc4192a.png) 



Head over to your terminal and navigate inside your Vue project then run the following command to intall `bootstrap-vue`

```bash
npm install bootstrap-vue bootstrap --save
```
`bootstrap-vue` requires Bootstrap CSS files so you need to install `bootstrap` too.

Next you'll need to enable the *VueBootstrap* plugin in your  Vue app entry point.

```js
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

You can also use these two templates to scaffold your Vue project  [webpack-simple](https://github.com/bootstrap-vue/webpack-simple) and [webpack](https://github.com/bootstrap-vue/webpack) which integrate `bootstrap-vue` out of the box.

For example this how you generate a new Vue project based `bootstrap-vue/webpack-simple` using the Vue CLI.
 
```bash
vue init bootstrap-vue/webpack-simple my-project
cd my-project 
npm install
```

You can then use different [Bootstrap 4 components](https://bootstrap-vue.js.org/docs/components/)

```html
<template>
<div>
  <b-button>This is a button</b-button>
  <b-button href="#">This is a link</b-button>
</div>
</template>
```

## Conclusion

Using Bootstrap-Vue is the recommended way to integrate Bootstrap 4 with your Vue 2 application since it offers Vue components for Bootsrap components that requires jQuery.
