---
layout: bpost
title: "Vue 3 TypeScript Component Props Example"
image: "images/content/vue.png"
excerpt: "Vue 3 TypeScript Component Props Example" 
tags : [vuejs, vue-3] 
---

Vue 3 has first-class support for TypeScript. This is an example of using the `defineComponent`, `computed`, `ref` methods to define a component with props: 


```ts
import { defineComponent, computed, ref } from 'vue'

interface Product {
  name: string
  price: number
}

export default defineComponent({
  props: {
    product: {
      type: Object as () => Product,
      required: true
    }
  },

  setup ({ product }) {
    const p = computed(() => `${product.name} ${product.price}`)
    const title = ref('List of products')

    return {
      p,
      title
    }
  }
})
```

Our component accepts a required `product` prop of type `Product`. As you see we can strongly type the component props using TypeScript typing system.

The `setup` function is a new component method that acts as the entry point for using the Composition API with components. It gets invoked right after the initial props resolution when a component instance is created. It's called before the `beforeCreate` life-cycle hook.

We can access the props passed to the component from the first argument of the `setup` method. In our example, we dereference the `props` argument to extract the `product` prop which is the only prop that will be passed to our component.

If `setup` returns an object, the properties on the object will be merged on to the render context for the component's template. In our example, we return the `p` and `title` objects from the `setup` method to make them available in the component's template. 

The `ref` method takes an inner value and returns a reactive and mutable ref object which has a single property called `.value` that points to the inner value. However when a ref is returned as a property on the render context, i.e the object returned from `setup()` method, and accessed in the template, it automatically unwraps to the inner value so we don't have to append `.value` in the template:

```html
<template>
  <h1>{{ title }}</h1>
</template>
```

## References

- [https://vue-composition-api-rfc.netlify.app/api.html#setup](https://vue-composition-api-rfc.netlify.app/api.html#setup)