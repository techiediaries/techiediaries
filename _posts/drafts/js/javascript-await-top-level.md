How to use top-level await in ES Modules

https://github.com/tc39/proposal-top-level-await

v8 recently introduced top-level await for ES modules. It’s a new proposed standard for ECMAScript, which has reached stage 3.

Note: it’s going to take some time before this feature will be usable in the production Node.js and in Chrome, but it’s worth taking a look

Right now we can use await only inside async functions. So it’s common to declare an immediately invoked async function expression to wrap it:

(async () => {
  await fetch(/* ... */)
})()
or also declare a function and then call it:

const doSomething = async () => {
  await fetch(/* ... */)
}

doSomething()
Top-level await will allow us to simply run

await fetch(/* ... */)
without all this boilerplate code.

With a caveat: this only works in ES modules. You can’t use this syntax outside of ES modules.

Normal scripts, and CommonJS modules, will continue to use immediately invoked function expressions or creating ad-hoc function like always.

TypeScript 3.8 introduced the top-level await

Most modern environments that provide I/O in JavaScript (like HTTP requests) is asynchronous, and many modern APIs return Promises. While this has a lot of benefits in making operations non-blocking, it makes certain things like loading files or external content surprisingly tedious.

fetch("...")
    .then(response => response.text())
    .then(greeting => { console.log(greeting) });
To avoid .then chains with Promises, JavaScript users often introduced an async function in order to use await, and then immediately called the function after defining it.

async function main() {
    const response = await fetch("...");
    const greeting = await response.text();
    console.log(greeting);
}

main()
    .catch(e => console.error(e))
To avoid introducing an async function, we can use a handy upcoming ECMAScript feature called “top-level await“.

Previously in JavaScript (along with most other languages with a similar feature), await was only allowed within the body of an async function. However, with top-level await, we can use await at the top level of a module.

const response = await fetch("...");
const greeting = await response.text();
console.log(greeting);

// Make sure we're a module
export {};
Note there’s a subtlety: top-level await only works at the top level of a module, and files are only considered modules when TypeScript finds an import or an export. In some basic cases, you might need to write out export {} as some boilerplate to make sure of this.

Top level await may not work in all environments where you might expect at this point. Currently, you can only use top level await when the target compiler option is es2017 or above, and module is esnext or system. Support within several environments and bundlers may be limited or may require enabling experimental support.
