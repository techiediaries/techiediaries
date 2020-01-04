---
layout: post
title: "JavaScript Interview Questions & Solutions"
image: "images/content/js.png"
excerpt: "JavaScript Interview Questions & Solutions" 
tags : [javascript]
---

JavaScript is most used programming language in the world. This is a list of interview questions and their solutions for helping you land your next JavaScript job.

## Question 1 — What's an `undefined` variable in JavaScript?

When you declare a variable and you don't assign it any value in the declaration, it will get `undefined` by default.
For example, if we declare the `foo` variable and you log it value in the console using:


    var foo;
    console.log(foo);

The output in the console will be `undefined`.


![JavaScript undefined value](https://d2mxuefqeaa7sj.cloudfront.net/s_DA944F5C49B11127A7DB0A77683543A15BC30FBB45108F0C4E495903D0BB16D1_1546092452421_undefined-vs-not-defined.png)



## Question 2 — What’s not defined in JavaScript?

If you try to use or reference a variable without first declare it, you’ll get a reference error with a *variable not defined* message. For example,  I did not declare the `bar` variable but still try to log its value on the console:


    console.log(bar);

You’ll get the famous **Uncaught** **ReferenceError: bar is not defined** message.


![JavaScript not defined error](https://d2mxuefqeaa7sj.cloudfront.net/s_DA944F5C49B11127A7DB0A77683543A15BC30FBB45108F0C4E495903D0BB16D1_1546093137334_not+defined.png)


[**ReferenceError**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError) is a JavaScript exception object that gets thrown when your try to use non- existent references (variables, functions or classes etc.)


## Question 3 — What’s the difference between ReferenceError and TypeError in JavaScript?

In JavaScript, there are many types of error exceptions, among them `ReferenceError` and `TypeError`. Simply put, you get a `ReferenceError` when you try to use a non existent reference (like an undeclared variable or function) and you get a `TypeError` when you try to execute an operation on an incompatible type.


    var foo = 0;
    undefined
    foo.toString()
    "0"
    foo.toExponential()
    "0e+0"
    foo.bar()
    VM706:1 Uncaught TypeError: foo.bar is not a function
        at <anonymous>:1:5


![ReferenceError vs. TypeError](https://d2mxuefqeaa7sj.cloudfront.net/s_DA944F5C49B11127A7DB0A77683543A15BC30FBB45108F0C4E495903D0BB16D1_1546095941955_referenceerrorvstypeerror.png)


Another example is:


    var foo;
    undefined
    foo()
    VM821:1 Uncaught TypeError: foo is not a function
        at <anonymous>:1:1

Here we are trying to call the variable `foo` as a function.

But pay attention, the foo variable is declared. If you don’t declare it, you’ll get a `ReferenceError` instead of `TypeError`:


    foobar()
    VM853:1 Uncaught ReferenceError: foobar is not defined
        at <anonymous>:1:1

Other built-in error types in JavaScript include `EvalError`, `SyntaxError` and `RangeError`.


## Question 4 — What’s a closure in JavaScript?

A closure is simply a function that’s defined inside another parent function. A more accurate definition: A closure is a JavaScript abstraction to refers to when an inner function has access to the outer function's variables, to the global variables and of course to the variables declared in its own scope.

In javaScript when a function finishes executing, its scope variables become undefined but using closures you can maintain the variables in the outer function. For example:


    function foobar(b){
        var base = b;
        return function foo(){
            return base + 1;
        }
    }
    
    var afoo = foobar(10);
    afoo()
    11  

 
 When the `afoo()` function starts running the `foobar()` function has already finished but the base variable stills maintains the `10` value.
 

![JavaScript closure example](https://d2mxuefqeaa7sj.cloudfront.net/s_DA944F5C49B11127A7DB0A77683543A15BC30FBB45108F0C4E495903D0BB16D1_1546100412636_closure.png)


  
One obvious benefit of using closure is simulating private and public variables and functions which don’t exist in JavaScript.

In our previous example, the `base` variable is private — the closure hides and maintains the execution context of the outer function.  

We can also export a public interface by returning an object that contains the function instead of the function. For example, our previous example becomes:


    function foobar(b){
        var base = b;
        var interface = {
                    foo: function(){
                            return base + 1;
                    }
            } 
        return interface;
    }
    
    var afoo = foobar(10);
    afoo.foo()
        
    11

 

Here we make the `foo()` method public.


![JavaScript closure example](https://d2mxuefqeaa7sj.cloudfront.net/s_DA944F5C49B11127A7DB0A77683543A15BC30FBB45108F0C4E495903D0BB16D1_1546101311983_closure1.png)


 

## Question 5 — How to implement the module pattern in JavaScript?

The module pattern is a well-known JS pattern that allows you to simulate private, public and protected member variables which you usually find in class-based OOP languages like Java.


    var Module = (function(){
            var private = 'this is a private variable';
            function setPrivate(val){
                    private = val;
            }
            function getPrivate(){
                    return private;
            }
            return {
                    setPrivate: setPrivate,
                    getPrivate: getPrivate
            };
    })()
    
    Module.getPrivate()
    "this is a private variable"
    Module.setPrivate('changed private variable')
    
    Module.getPrivate()
    "changed private variable"

We use a self-executing anonymous function to create an outer function that returns a JS object which has two methods that represent the public interface of the Module.

In the body of the outer function we add a `private` variable and two private methods for setting and accessing the variable.

Thanks to JS closures, the context of the outer function is preserved even after finish running the outer function.


![JavaScript Module pattern](https://d2mxuefqeaa7sj.cloudfront.net/s_DA944F5C49B11127A7DB0A77683543A15BC30FBB45108F0C4E495903D0BB16D1_1546102695757_module-pattern.png)



## Question 6 — What’s an IIFE in JavaScript?

IIFE stands for Immediately Invoked Function Expression and it’s a self executing function. For example:


    (function() {
     console.log('IIFE');
    })();
    IIFE

This above function will be defined and called immediately.


## Question 7 — How to empty an array in JavaScript?

Let’s suppose we have the following array:


    var arr = [100, 1000, 1, 50];

We can empty it completely in various ways:

You can create a new empty array and assign it to the `arr` reference so `arr` will be pointing to the new array instead.


    arr = [];

Make sure you use this method of you only have one reference to the original array ie only the `arr` reference. 

You can also use the length property of the array object:


    arr.length = 0;

  

    var arr = [100, 1000, 1, 50];
    undefined
    arr.length
    4
    arr.length = 0;
    0 


![Empty a JavaScript array](https://d2mxuefqeaa7sj.cloudfront.net/s_DA944F5C49B11127A7DB0A77683543A15BC30FBB45108F0C4E495903D0BB16D1_1546106891987_emptyarray.png)


You can also use the `pop()` method with a `for` loop:


    while(arr.length){
      arr.pop();
    }
    100
    arr
    []

we loop through the whole array and pop array elements one by one.


 

