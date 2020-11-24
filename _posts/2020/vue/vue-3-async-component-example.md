---
layout: bpost
title: "Vue 3 Async Component Example"
image: "images/content/vue.png"
excerpt: "Vue 3 async component example" 
tags : [vuejs, vue-3] 
---

In this example, we'll see how to define an async component in Vue 3.

Let's take this simple Vue 3 example with TypeScript:

```ts
import { defineComponent, h, createApp } from 'vue'
import Hello from './Hello'

export const App = defineComponent({
  name: 'App',

  components: {
    Hello
  },
  
  render() {
    return h('div', ['This is app', h(Hello)])
  }
})

window.addEventListener('DOMContentLoaded', () => {
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)

  createApp(App).mount('#app')
})
```