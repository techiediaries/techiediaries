---
layout: post
title: "Vue 3 Composition API Tutorial with Ref, Reactive and Life-Cycle Events Example"
date: 2020-02-04 03:32
categories: vue-js 
tags: [vue-3]
excerpt: "In this tutorial, we will learn about the Vue 3 Composition API by example" 
---

In this tutorial, we will learn about the Vue 3 Composition API by example

## What's and Why the Vue 3 Composition API?

If you have used Vue before, particularly in a big project, there is a good chance tat you have problems with organizing your code when you started to implement more features in your app. This is why the Composition API, was added in the upcoming Vue 3 version, It is a new syntax that provides developers a new way to create components, compose and organize them by features.


Vue 2 components may become hard to maintain becaue your code is organized using the Options API i.e  data, methods, and computed, etc.


Using Vue 3 Composition API, you can organize the code by feature, putting the feature’s code in its own JavaScript function that can have reactive state and life-cycle methods.


## How to Use the Vue 3 Composition API?

Since Vue 3 is not released yet, you can use the Composition API in your Vue 2 app via a  [plugin](https://github.com/vuejs/composition-api).

Let's take a small example.



```js
<template>
  <button @click="increment">
    Count is: , double is: 
  </button>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>
```

## Setup Function

The setup function is where you put your data and functions for your feature. You could also move your feature code into its own function outside of the setup or its own javascript file and then would have to declare the code in the setup function and return it to use.

-   Takes two optional arguments props, and context
-   Create methods, data state, functions inside setup function
-   All of the methods, functions need to be returned from the setup function
-   Shared code can be imported and then declared in the setup function (must be returned)
-   Does not have access to this

## Refs vs Reactive

There are two ways to deal with state and reactivity in the setup function,  _refs_  and  _reactive_. Using one over the other is a matter of preference and coding style. They both allow Vue to keep track of your state.

-   Need to be imported to be used
-   Data using  _refs_  or  _reactive_  need to be returned as objects from setup function

Knowing when to use refs and reactive can be confusing and best practices are still being  [developed](https://vue-composition-api-rfc.netlify.com/#ref-vs-reactive)

-   Refs are great for declaring single variables
-   Reactive is great for listing all your state inside objects
-   Reactive objects cannot be destructured or spread without using the  _toRefs method_

## Working with refs

[Ref example](https://vue-composition-api-rfc.netlify.com/#api-introduction)

```
<template>
  <button @click="increment">
    Count is: {{ count.value }}, double is: {{ count.value * 2 }}
  </button>
</template>

<script>
  import { ref, watch } from 'vue'

  let count = ref(0)

  function increment() {
    count.value++
  }

  const renderContext = {
    count,
    increment
  }

  watch(() => {
    renderTemplate(
      `<button @click="increment">8</button>`,
      renderContext
    )
  })
</script>

```

Refs in the setup function work differently then refs in the rest of Vue. In the setup function when using a ref you declare the variable and set the initial value using  `ref()`.  `let todo = ref('')`  Working with your data in the template section of the component you need to reference the data with the name of the ref and  _add .value_  at the end

`<h1> {{ todo.value }} </h1>`

## Working with reactive

Reactive takes an object and returns a reactive object

```
setup() {
Const todos = reactive({
item: ''
}) }

```

-   Computed properties can be included inside a reactive object
-   Use the toRefs method (creates a plain object with reactive properties) when destructuring or spreading an object  `return {...toRefs(todos)}`

## Using computed properties

Used with refs or reactive when you have state that depends on other state.  `let firstTodo = computed(( ) => {return todo[0] } )`

-   Can be used inside a reactive objects
-   If you are using refs you will need to remember to add .value to the end of your ref name to access the value.

## Context argument

The second optional argument in the setup function that allows you to call methods like emit that are not available in the setup function.

-   Examples:  _context.attrs, context.slots, context.parent, context.root, context.emit_

## Life-cycle hooks

-   Three lifecycle methods:  _onMounted, onUpdated, onUnmounted_
-   Declare them inside setup function

If you want to  [start experimenting with the composition API](https://github.com/vuejs/composition-api)  you can use it as a plugin with Vue 2.
