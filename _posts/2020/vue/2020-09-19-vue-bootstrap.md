---
layout: post
title: "3+ Ways for Adding Bootstrap to Vue 3 Apps"
image: "images/content/vue.jpg"
excerpt: "In this article, we'll see the available options for adding Bootstrap to your Vue 3 apps" 
tags : [javascript , vue , bootstrap, vuejs] 
---

In this article, we'll see the available options for adding Bootstrap to your Vue 3 apps.

Bootstrap 4 has many new features such as the use of Flexbox, ES6 modules and a new card component (which you can use to easily craft card-based layouts in your Vue 3 apps such as the famous masonry layout without JavaScript/jQuery plugins or complex algorithms) etc.

You can use Bootstrap 4 to add mobile first styling to your Vue 3 application without re-inventing the wheel and without having to acquire deep CSS knowledge,  particularly if you need to create complex and responsive layouts.

Bootstrap 4 requires jQuery and Popper.js. jQuery is a DOM library that makes a direct manipulation of the DOM unlike Vue 3 which uses the virtual DOM approach so you'll want to avoid using jQuery within your Vue 3 application but this means you won't be able to use many Bootstrap 4 components that requires jQuery.

Don't worry though the community has provided some packages that integrate Bootstrap 4 with Vue  without resorting to jQuery.


## Bootstrap-Vue

At the time of this writing, Bootstrap-Vue doesn't support Vue 3 but BootstrapVue v4 will have Vue.js v3 support and Bootstrap v5 support according to this [issue](https://github.com/bootstrap-vue/bootstrap-vue/issues/5196) on GitHub.


Also, check out [How to use Vue 3 & Add Plugin Boostrap-vue?](https://stackoverflow.com/questions/63570340/how-to-use-vue-3-add-plugin-boostrap-vue)

[Bootstrap-Vue](https://bootstrap-vue.js.org/) provides more than 85 components, over 45 available plugins, several directives, and 1000+ icons, BootstrapVue provides one of the most comprehensive implementations of the Bootstrap v4.5 component and grid system available for Vue.js v2.6, complete with extensive and automated WAI-ARIA accessibility markup.

The Bootstrap-Vue project has done most of the heavy lifting of replacing jQuery with Vue by implementing Bootstrap features as Vue components.

![Vue 3 Bootstrap](https://screenshotscdn.firefoxusercontent.com/images/030f06e4-c4cc-4e09-aa12-e8843bc4192a.png)

### Adding Bootstrap-Vue Manually to your Vue App

Head over to your terminal and navigate inside your Vue project, next run the following command to intall `bootstrap-vue` as follows:

```bash
npm install bootstrap-vue bootstrap --save
```
`bootstrap-vue` requires Bootstrap CSS files so you need to install `bootstrap` too.

Next, you'll need to enable the *VueBootstrap* plugin in your  Vue app entry point.

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

### Using Bootstrap-Vue Using Templates

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

### Adding Bootstrap Using Vue CLI

Rather than installing it directly, we can use Bootstrap-Vue as a Vue CLI plugin. This takes care of any configuration boilerplate and will automatically add any dependencies so I highly recommend this approach.

Let's create a new Vue CLI project:

```bash
$ vue create bootstrap-vue-app
```

> Note that you will need to have Vue CLI installed in your dev environment already ([instructions here](https://cli.vuejs.org/guide/installation.html)).

Vue CLI will now take you through the Vue app setup. If you aren't sure what options to choose, just select "default".

Now, change into your new project directory:

```bash
$ cd bootstrap-vue-app
```

You can now add the Bootstrap-Vue plugin to your project. Unless you have reasons otherwise, I suggest you select "Y" for any prompts.

```bash
$ vue add bootstrap-vue
```

Thanks to the magic of Vue CLI, you have now set up a best-practice Vue & Bootstrap project with no configuration required!

## Using jQuery and Bootstrap 4 with Vue 3

You can use the original bootstrap library with jquery to style your Vue 3 application

```bash
$ npm install bootstrap jquery popper.js
```

> Note: If you’re not going to use Bootstrap’s JavaScript, and only going to use its styles, don’t worry about installing jQuery or Popper.js.

Finally, import it into the main script by adding these lines to the top of the `src/main.js` file:

```js
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
```

## Using Bootstrap 5 with Vue 3

Since it's not recommended to use jQuery with Vue, you can use Bootstrap 5 which is still in alpha version, with your Vue 3 project.


Bootstrap 5 has removed support for jQuery and used plain JavaScript for its components.

At this time, you can install Bootstrap 4 using the following command:

```bash
$ npm install bootstrap@next
```

## Conclusion

Using Bootstrap-Vue is the recommended way to integrate Bootstrap 4 with your Vue application since it offers Vue components for Bootsrap components that requires jQuery. However, at this time you'll need to wait for BootstrapVue v4 that will add support for both Vue 3 and Bootstrap 5.

Bootstrap 5 is also an option for styling your Vue 3 apps but it's still in alpha version. Bootstrap 5 has dropped support for jQuery and use only plain JavaScript for its components.

If you don't want to include jQuery in your Vue 3 apps, you can still use the CSS files of Bootsrap in your apps but that means you'll only be able to use components that don't require jQuery.
