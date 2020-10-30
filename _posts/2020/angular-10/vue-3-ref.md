---
layout: bpost
title: "Vue 3 Ref Example"
image: "images/content/vue3.png"
excerpt: "How to define reactive variables in Vue 3 using Ref"
date: 2020-08-27
tags : [vue3, vuejs, vue]
---

In this example, we'll learn about the `ref()` function in Vue 3.

In Vue 3, you can use the `ref()` function to define a reactive variable.

## Declaring Reactive Variables from Primitives

Ref is used to declare reactive variables from primitive types such as:

- String
- Number
- BigInt
- Boolean
- Symbol
- Null
- Undefined


For example:

```js
import { ref } from "vue";

export default {
  setup() {
    const name = ref("");
    const num = ref(1);
    const bool = ref(true);
    const n = ref(null);
  }
};
```

## Vue 3 Ref Example

Now, let's consider this Vue 3 component:

```js
<template>
  <h1>{{ productName }}</h1>
</template>

<script>
  import { ref } from "vue";

  export default {
    setup() {
      const productName = ref("Product 001");

      return { productName };
    }
  };
</script>
```

The `ref()` function takes a value and returns a reactive and mutable ref object. 

You can access or mutate the value of the ref object using the `.value` property but that's only inside the `setup()` method. In the corresponding template, you can use the name of the variable as usual i.e `productName` in our case. 





Why don't you need to use the `productName.value` property in the template:

```html
<template>
  <h1>{{ productName }}</h1>
</template>
```

Simply because When a ref is returned as a property on the rendering context (i.e from the `setup()` method) in the template, it gets unwraped to the original primitive value. 


