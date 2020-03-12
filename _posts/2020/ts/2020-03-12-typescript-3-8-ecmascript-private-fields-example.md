---
layout: bpost
title: "TypeScript 3.8 EcmaScript Private Fields/Variables by Example"
image: "images/content/typescript.png"
excerpt: "In this example, you will learn to use the Ecmascript private  field introduced TypeScript 3.8+"
date:  2020-03-12
categories: tyepescript
tags : [  typescript ]
---

In this example, you will learn to use the Ecmascript private field introduced TypeScript 3.8+.

## Why the EcmaScript Private Field?

In your JavaScript classes, member variables and methods can't be public or private. but EcmaScript has a stage 3 [proposal](https://github.com/tc39/proposal-class-fields/) to implement truly private access for class variables and methods.

As said, these variables will be truly private not emulated using the various techniques which are common on the JavaScript community.

## What About TypeScript Private and Public Methods?

Unlike JavaScript, TypeScript already provides the private and public keywords which can be used as the access modifiers for class member variables but these are only for compile-time i.e if you try to access a private field in your class instance, you'll have a compile time error by you could still access it in plain JavaScript:

```ts
class Customer {
  private email = 'my@email.com';
}
new Customer().email     // compile-time error
new Customer()['email']  // not private in JavaScript
```

## EcmaScript Private Field

Starting with TypeScript 3.8, we can use the EcmaScript private field in your classes to bring true private access in your code.

This is the same previous class written with private fields:

```ts
class Customer {
  #email = 'my@email.com';
  constructor() {
    console.log(this.#email); 
  }
}
```

Now, if you try to access the email private field, you will either get a syntax error or the undefined value:

```ts
new Customer().#email     // syntax error
new Customer()['#email']  // undefined
```

Check out [What's The Use Of TypeScript 3.8/ECMAScript Private Fields?](https://shabang.dev/question/whats-the-use-of-typescript-3-8-ecmascript-private-fields/)

