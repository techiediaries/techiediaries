
If you have just started with Angular, you'll notice some new syntax like hashtags, for example let's take this one: 

```html
<input #searchBox (keyup)="search(searchBox.value)"
```

This is a typical HTML tag except that it has some new syntax like the hashtag and `(keyup)`.

So what is the meaning of  `#searchBox`? And how does it work?

This is part of Angular template syntax. It's a reference variable that references HTML elements in templates.

You can provide any valid name before the hashtag to define a reference variable.

The `()`  is for event binding.


here i give my component a template url

```ts
import {Component} from 'angular2/core';

@Component({
   selector: 'harrys-app',
   templateUrl: 'components/harry/helloworld.component.html'
})

export class HarrysApp {}
```

Templates render HTML. In a template you can use data, property binding and event binding. This is occomplished with the following sytax:

`#`  - variable declaration

`()`  - event binding

`[]`  - property binding

`[()]`  - two-way property binding

`{{ }}`  - interpolation

`*`  - structural directives

The  `#`  syntax can declare local variable names which references DOM objects in a template. E.g.

```
 <span [hidden]="harry.value">*</span>
 <input type="text" #harry>
 {{ harry.value }}
```