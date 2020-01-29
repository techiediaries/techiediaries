
Two very common minor annoyances in Typescript code that uses  `.querySelector()`  and  `.querySelectorAll()`are often solved by explicitly type-casting with the  `as`  operator, e.g.:

let panel = document.querySelector(".panel") as HTMLElement;

This gets increasingly clumsy with  `.querySelectorAll()`  and arrays, etc.

## There’s a cleaner way.

First, if you know that your selector matches HTML elements, or specific elements types, you can use a type-argument:

let lists = document.querySelectorAll<HTMLElement>("ul.my-list");

This is much cleaner than explicitly type-casting with the  `as`  operator.

Secondly, you’ve probably noticed that the return-type of  `.querySelectorAll()`  isn’t an array — which is terribly unhandy when you want to for example filter or sort the elements. Here’s a really simple, type-safe way to convert query-results to arrays:

let inputs = [...form.querySelectorAll("input")];

Looks a bit odd! It’s actually the spread operator  `...`  which internally iterates over the query-result, and spreads the elements into the literal array created by the square brackets  `[]`  surrounding the expression.

You can then safely apply  `.filter()`  and  `.map()`  etc.

Of course, thanks to type-inference, the type-argument and spread operator also work together, and correctly infers types through to close arguments:

[...form.querySelectorAll<HTMLInputElement>("input")].map(input => {  
    input.value = "w00t!";  
});

Neat! :-)