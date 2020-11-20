---
layout: bpost
title: "Vue 3 Playground"
image: "images/content/vue.png"
excerpt: "Vue 3 Playground" 
tags : [vuejs, vue-3] 
---

Vue 3 Playground stands as a learning project for those who want to get familiar with [the new features of Vue 3](https://composition-api.vuejs.org/).
[The official documentation](https://v3.vuejs.org/) is now available!

The project aims to include all the new features. If you find something missing please create an issue/PR.

The application is a shopping cart where you can alter the name, price and quantity of the products and
recalculates the total price based on the items and used coupon.

The playground is available also [in online version](https://codesandbox.io/s/github/blacksonic/vue-3-playground).

If you want to switch to the Typescript folder uncomment the link to the Typescript main file in `index.html`
and comment out the Javascript main file.

![Vue 3 Playground](https://github.com/techiediaries/vue-3-playground/raw/master/images/screenshot.png)

### New APIs covered

The Typescript equivalents can be found in the `src-typescript` folder (file names are the same).

- [createApp](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/main.js) - [API docs](https://v3.vuejs.org/api/application-api.html)
- [mount](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/main.js) - [API docs](https://v3.vuejs.org/api/application-api.html#mount)
- [use](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/main.js) - [API docs](https://v3.vuejs.org/api/application-api.html#use)
- [ref](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/hooks.js) - [API docs](https://v3.vuejs.org/api/refs-api.html#ref)
- [reactive](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/hooks.js) - [API docs](https://v3.vuejs.org/api/basic-reactivity.html#reactive)
- [computed](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/hooks.js) - [API docs](https://v3.vuejs.org/api/computed-watch-api.html#computed)
- [toRefs](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Cart.vue) - [Composition API docs](https://composition-api.vuejs.org/#code-organization)
- [watchEffect](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Cart.vue) - [API docs](https://v3.vuejs.org/api/computed-watch-api.html#watcheffect)
- [watch](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Cart.vue) - [API docs](https://v3.vuejs.org/api/computed-watch-api.html#watch)
- [onMount](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Cart.vue) - [API docs](https://v3.vuejs.org/api/composition-api.html#lifecycle-hooks)
- [onUnmount](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Cart.vue) - [API docs](https://v3.vuejs.org/api/composition-api.html#lifecycle-hooks)
- [onUpdate](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Cart.vue) - [API docs](https://v3.vuejs.org/api/composition-api.html#lifecycle-hooks)
- [onErrorCaptured](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Cart.vue) - [API docs](https://v3.vuejs.org/api/composition-api.html#lifecycle-hooks)
- [useStore](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/App.vue) - [Vuex 4 docs](https://github.com/vuejs/vuex/tree/4.0)
- [useRoute](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Checkout.vue) - [Vue 3 router docs](https://github.com/vuejs/vue-router-next)
- [emit](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Coupon.vue)
- [provide](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/version.js) - [API docs](https://v3.vuejs.org/api/composition-api.html#provide-inject)
- [inject](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/version.js) - [API docs](https://v3.vuejs.org/api/composition-api.html#provide-inject)
- [createStore](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/store.js) - [Vuex 4 docs](https://github.com/vuejs/vuex/tree/4.0)
- [createRouter](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/router.js) - [Vue 3 router docs](https://github.com/vuejs/vue-router-next)
- [defineComponent](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Payment.jsx) - [API docs](https://v3.vuejs.org/api/global-api.html#definecomponent)
- [defineAsyncComponent](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/AsyncPayment.js) - [API docs](https://v3.vuejs.org/api/global-api.html#defineasynccomponent)
- [h](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Spinner.js) - [API docs](https://v3.vuejs.org/guide/render-function.html)
- [JSX](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Payment.jsx)
- [Suspense](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Cart.vue)
- [Async Component](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Exchange.vue)
- [Teleport](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Header.vue) - [API docs](https://v3.vuejs.org/guide/teleport.html#using-with-vue-components)
- [Fragments](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/App.vue)
- [Multiple v-models](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Cart.vue) - [RFC docs](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0011-v-model-api-change.md)
- [Scoped slot](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/components/Cart.vue) - [RFC docs](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md)
- [Custom directive](https://github.com/techiediaries/vue-3-playground/blob/master/src-javascript/at-sign.js)

