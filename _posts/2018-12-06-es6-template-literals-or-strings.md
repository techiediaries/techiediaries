---
layout: post
title: "es6 template strings or literals"
image: "images/content/es6-template-literals.png"
excerpt: "es6 template literals or strings" 
tags : es6 
---

**es6 template strings** or also **template literals** are a way to create strings which can have JavaScript expressions embedded inside. If you are a JavaScript developer, you can imagine how many useful things 
you can achieve using es6 template strings.

## How to define es6 template strings 

You can create a template string using back ticks: 

    let str = `This is a template literal in ES6`;

## The features of es6 template strings 

Template strings have many nice features, such as. 

- a template string can span many lines without escaping,
- string interpolation and embedded expressions without concatenation,
- string tags etc.

Let's see them in details

### Easy Multi-line Strings Without Escaping

You can easily write string variables with multi-line support without using the escape and new line operators.

You can simply write this: 

    const html = `
        <div>
            <p>Hello template literals </p>
        </div>
    `;    

I personally like to use template strings for multi-line support when I'm embedding other languages such as HTML markup or SQL queries inside JavaScript code. In this case you can have nice formatting of the text 
just like if you are using HTML or SQL in their own source files.     


This is very useful for formatting strings of text inside JavaScript code but es6 template string can do more than that. You can embed JavaScript expressions inside them and have them evaluated without further actions.

### String interpolation and embedded expressions

For example, I can simply define a JavaScript object or just a simple variable and use it inside a string (Interpolation):

    const profile = {
        username: 'mrnerd',
        email: 'Web Developer',
        country: 'Earth'
    }

    const html = `
    <div class="profile">
        <p>${profile.username}</p>
        <p>${profile.email}</p>
        <p>${profile.country}</p>
    </div>
    `;

So as you can see, with the `${}` interpolation operator we can reference any JavaScript variable or even an expression without using concatenation.

Now let's take a more advanced example. If you are familiar with server side or client side template engines or frameworks such as Handlebars, Jinja or Angular you probably have used constructs such as, `for each` or `ngFor` loops which allow you to iterate over a bunch of items inside templates. Thanks to es6 template strings you can now do that using plain JavaScript.

Lets take an array of profiles: 

    const profiles = [
        {username: 'mrnerd',email: 'Web Developer',country: 'Earth'},
        {username: 'ahnerd',email: 'Web Designer',country: 'Earth'},
        {username: 'aknerd',email: 'Web entrepreneur',country: 'Earth'},
    ];

Now let's create a template string which iterates over this array to create an HTML list of profiles:

    const html = `
    <ul class="profiles">
        ${ profiles.map(profile => 
                `<li> ${profile.username} </li>`
        ).join(' ') }
    </ul>
    `;

As we can embed JavaScript expressions in template strings, we have used a map method on the profiles array which returns an array of strings: 

    [<li>mrnerd</li>,<li>ahnerd</li>,<li>aknerd</li>]

Then we use `join(' ')` to get rid of the array comma, to finally get: 

    <ul class="profiles">
        <li> mrnerd </li> <li> ahnerd </li> <li> aknerd </li>
    </ul>    


### String tags 

Again if you are familiar with template engines you would know about tags but if you don't, they are simply a special kind of functions which 
can be used to preprocess and transform strings for some purpose like, for example:

- Better formatting,
- Escaping,
- Localization depending on your user location,
- Adding currencies etc.


You can simply tag a template by placing a function name before the string: 

    tag`Hello world by ${me}`;

But make sure you define the tagging function with the same name and a special signature 

    tag(strings,...values){
    }

The function receives the template string parts as arguments, the first parameter is an array of static parts of the string, the second parameters are placeholders variables which are embedded on the template string. You can use the tag parameters to decide how you are template string will be 
transformed.

The previous tag will be called as: 

    tag(["Hello" , "world"],me);


## Conclusion

Es6 template strings or literals introduce powerful features to JavaScript such as multiline strings support, string and expression interpolation and tagged templates.

You can use these features to build powerful code constructs which mimic things we used to find in template engines and web frameworks. You can also use them to create your own domain specific languages or DSLs.













