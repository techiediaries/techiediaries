---
layout: post
title: "ES6 Modules - Import, Export & Default for React Native Devs"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this article, we'll focus on understanding the import, export and default keywords used in ES6 modules" 
tags : [javascript, react , reactnative] 
---

I have been exploring React Native for building mobile apps with React and [JavaScript](https://www.techiediaries.com/javascript/). After generating my first project and started looking at the code, I noticed the use of the ES6 modern features like the `import` and `export` statements for importing and exporting modules and [arrow functions](https://www.techiediaries.com/javascript-arrow-function-default-parameters/), etc.

In this article, we'll focus on understanding the `import`, `export` and `default` keywords. 

In the `App.js` file, we have the following code, truncated for the sake of brevity:

```js
import React, {Fragment} from 'react';
/* [...] */

const App = () => {
  return (
    <Fragment>
        <!-- [...] -->
    </Fragment>
  );
};

/* [...] */

export default App;
```

In this file, we first import the `React` and `Fragment` APIs from the `react` package, next, we define a function-based React component that renders a bunch of React Native components. Finally, we export the `App` component using the `export default` statement.

### The `export` and `default` keywords

The `export` keyword is used to export the symbol but what about the `default` keyword?

Simply put, when you export a symbol as default, you don't need to specify its name (pay attention here, this is the name used inside the module for the symbol) when you need to import it.

Now, if we look at the `index.js` file, we'll see the following code:

```js
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

This is where our exported `App` component is imported using the `import` keyword:

```js
import App from './App';
```

We can use any name instead of `App` and will be still importing the `App` component. Because it's exported by default. For example, we can write the following instead:

```js
import MyApp from './App';
```

`MyApp` will be an alias for the `App` symbol (which is exported by default so we don't need to specify its "internal" name to import it). 

I hope, you understand the meaning of default because it may be confusing since developers usually use the same name used inside the module to import from another JS file. In our example, we used the `App` name for importing the `App` component from the `App.js` file.

If you want to learn more about ES6 modules, continue reading below.

## ES6 Modules

ES6 has introduced builtin support for modules in JavaScript so we don't need to use the other systems used in ES5 like:

-  CommonJS modules used in Node.js (CommonJS modules use `module.exports` for export code and `require(path)` to import code),
-  Asynchronous Module Definition (AMD) used in [RequireJS](http://requirejs.org/).

For more information, read [Writing Modular JavaScript With AMD, CommonJS & ES Harmony](https://addyosmani.com/writing-modular-js/) and [Axel Rauschmayer’s ExploringJS: Modules](https://exploringjs.com/es6/ch_modules.html#sec_modules-in-javascript).

Now, what's a module?

A module is a piece of code that encapsulates the code for specific functionality. It makes it easy to write decoupled and easy maintainable and testable code.

You can create a JavaScript module by simply creating a JavaScript file with the `js` extension and use the `export` keyword for exporting a piece of code (a symbol) such as a function, object or variable.
.

> **Note**: Unlike CommonJS modules which are loaded synchronously, ES6 Modules are loaded asynchronously which is better suited for the frontend code.

In ES6, you can export a symbol in two ways:

- Using named exports,
- Default exports.

You can use both of them inside the same module but it's not recommended.

### Default Export

Just like we've seen earlier, you can make a default export by using the `export` and `default` keywords in front of the symbol. Since it's the default export, you don't necessarily need to import it using the same name in your other JavaScript files but it is a common case to import default exports with the same names which were used to define them inside their modules.


### Named Export

You can use named exports in a module for exporting multiple symbols by simply using the `export` keyword in front of each symbol. These exports can be distinguished from each other using their names and are called **named exports**.

We can change our `App.js` file as follows:

```js
import React, {Fragment} from 'react';
/* [...] */

export const App = () => {
  return (
    <Fragment>
        <!-- [...] -->
    </Fragment>
  );
};

/* [...] */
```

We simply remove the `default` keyword to make a **named export** instead of a **default export**.

We can then import the `App` component in the `index.js` file as follows:

```js
import { App } from  './App';
``` 

First, we used the curly braces (ES6 destructuring assignment) and second we need to specify the same name used in the containing module i.e `App`.


If you have more than one named export. For example, `App`, `Header` and `Footer`, you can write the following statement to import them:

```js
import { App, Header, Footer } from  './App';
```

If you have a default export (for example the `App` function) and named exports (for example the `Header` and `Footer` components), you can import them as follows:

```js
import App, { Header, Footer } from  './App';
```

You can also import all the exported symbols using `*` and `as`:

```js
import * as app from './App';
```

You can then access each named export as a property:

```js
console.log(app.App);
console.log(app.Header);
console.log(app.Footer);
```
 
 
## Conclusion

As a wrap-up, we've seen how to use the `import`, `export` and `default` keywords for working with ES6 modules in React Native.