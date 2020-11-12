---
layout: bpost
title: "Vue 3 Reactivity"
image: "images/content/vue.png"
excerpt: "In this tutorial, we'll learn about Vue 3 reactivity" 
tags : [vuejs, vue-3] 
---

We’re all excited that vuejs 3 is now out. However, how does it work?

If you want to use the new composition api, you’ll have to understand reactivity at a deeper level. The vue team agrees, because the new docs already include an explanation on reactivity.

However, after reading that and following some online courses, I still stumbled on some things that I wasn’t expecting.

### reactivity & non-reactivity in vuejs 2.x (options api)

In vue 2, you’re expected to make everything reactive. That’s great, but in order to really understand what’s going on, the difference between reactive and non-reactive has to become clear. And being a dev, I think in code. So here is non-reactivity in vue 2:

```
<template>
  <div id="app">
    <h1>Reactivity in Vue 2.*</h1>
    <table>
      <tr>
        <td>reactive</td>
        <td>{{ count }}</td>
        <td><button @click="incrementReactive">increment reactive</button></td>
      </tr>
      <tr>
        <td>nonreactive</td>
        <td>{{ nonReactiveCount }}</td>
        <td>
          <button @click="incrementNonReactive">increment reactive</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      count: 0,
    };
  },
  created() {
    this.nonReactiveCount = 0;
  },
  methods: {
    incrementReactive() {
      this.count++;
    },
    incrementNonReactive() {
      this.nonReactiveCount++;
    },
  },
};
</script>
```

As you can see, this.nonReactiveCount changes value when you click it’s button, but that change won’t show, until something reactive has updated.

What I hadn’t realised before is that **non-reactivity in vue 2 doesn’t mean things don’t change. It means the app you’re building won’t listen to that change, so it won’t update.**

### reactivity and non-reactivity in vuejs 3.x

In vue 3 we could do precisely what I did above. And if you want to check that out, you can see it [here](https://codesandbox.io/s/interesting-river-x387u?file=/src/App.vue). The only thing that’s changed is that we now need to call it by it’s name: the options-api.

However, the interesting part is of course when we start using the composition-api.

The main difference, from a reactivity standpoint, between the options and the composition-api is that with the options api reactivity is the default. With the composition-api, you manually create reactivity-instances each time you use it.

Using the composition api it looks like [this](https://codesandbox.io/s/confident-gould-ceqz6?from-embed=&file=/src/App.vue:0-756).

```
<script>
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    const count = ref(0);
    let nonReactiveCount = 0;

    return {
      count,
      nonReactiveCount,
    };
  },
  methods: {
    incrementReactive() {
      this.count++;
    },
    incrementNonReactive() {
      this.nonReactiveCount++;
    },
  },
};
</script>
```

So far so good. It behaves exactly the same. However, what happens when we move the methods themselves to the setup method?

```

  setup() {
    const count = ref(0);
    let nonReactiveCount = 0;
    const incrementReactive =() =>  {
      count.value++;
    }
    const incrementNonReactive = () => {
      nonReactiveCount++
    }
    return {
      count,
      nonReactiveCount,
      incrementReactive,
      incrementNonReactive
    };
  },
```

Now the incrementNonReactive-method no longer seems to work: nonReactiveCount doesn’t seem to increment. However, if you check the console, you’ll see that the value of nonReactiveCount DOES increase, however, the template-view doesn’t reflect that!

Clearly, in vue 3, reactivity through the composition api is more local than in the options api. When there’s a reactive change, the options api updates everything (within that vue instance) to the latest value, whereas the composition api updates only reactive values.

I thought this was a [bug, but it turns out it’s more of a legacy feature](https://github.com/vuejs/vue-next/issues/2281).

After I posted the above, I got a LOT more help understanding this on the github issue I had posted. Since my conclusion there has been approved by core-team members, I’ll just repeat it here:

> In the setup method I’ve set a variable ‘nonReactiveCount’ to 0. Its value gets exported to the vue-instance as the value of the exported ‘nonReactiveCount’ key. It’s not reactive.
> 
> I can increment this.nonReactiveCount through the methods, because it’s available on the ‘this’. I can see that reflected in the template as soon as a reactive change updates the virtual dom. this.nonReactiveCount no longer has anything to do with the variable ‘nonReactiveCount’ in the setup method (and to correct my blogpost I guess I’ll be showing that).
> 
> Through the incrementNonReactive function in the setup method, I can increment the variable ‘nonReactiveCount’ within the setup method. However, other than logging it, nothing else happens with that new value, because the variable isn’t available outside the setup method.
> 
> It only seems like it’s exported because of various shorthands used in the code:`  
> return  { nonReactiveCount } means:  
> return  { nonReactiveCount:  value-of-nonReactiveCount }`
> 
> nonReactiveCount does not (for instance) get re-exported when it changes. The export happens on setup (hence the name setup-method) and the value it has at that point is the value assigned to this.nonReactiveCount. this.nonReactiveCount and nonReactiveCount aren’t connected after that.

Thanks to [Thorsten Lünborg](https://github.com/LinusBorg)([LinusBorg](https://github.com/LinusBorg)) for explaining.

