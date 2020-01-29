Nullish Coalescing proposal has been moved to stage 3, i.e. soon it will be added to JS standards, let’s see how it helps us.

How many times have you checked whether a variable is  `null`  or not? Not  `undefined`,  `''`  or  `false`  but just  `null`, I would typically add an if condition  `variable === null`  just for that, and I've done this countless number of times.

Consider the following code

let  counter;  
if(_response._data === null) counter = 1;  
else counter = _response._data;

What if we could do this easily without so much code to just check if it is  `null`  or not. Nullish coalescing just does that. Here's how it looks and works.

let  counter  = _response.data_ ??  1;  
// _now if data is 0 counter value is 0_// _if it is null or undefined we set it to 1;_

So only if the value is  `undefined`  or  `null`  then the default value will be used.

result = actualValue ?? defaultValue

Let’s see what we would get when we use the logical OR operator.

let  counter  = _response.data_ ||  1;  
// _here even if the value is 0, that is the value is defined_// _we still get 1, which we don't want._

To recap “Nullish coalescing” is essentially

a ?? b  
a !== undefined && a !== null ? a : b

# Current status and how to use

You can check the  [ECMAScript Next compatibility table](http://kangax.github.io/compat-table/esnext/#test-nullish_coalescing_operator_(??))  to find out where the ?? operator is supported.

Babel has the plugin`@babel/plugin-proposal-nullish-coalescing-operator`


![](https://miro.medium.com/max/1553/1*dq9wZFLrNPLINqyLN4nBjw.png)

**Nullish coalescing operator**

`??`  → Nullish coalescing operator.

The nullish coalescing operator  `??`,  is a  short-circuiting operator, like  `&&`  and  `||`, which will return the righthand side operand of the if the lefthand side operand is  `**null**`  or  `**undefined**`. Otherwise, it returns lefthand side operand.

The biggest difference is that other falsy values (empty string  `''`,  `0`,  `false`,  `NaN`) will still return the lefthand operand with  `??`  in comparison to  `||`  or  `&&`  which consider all falsy values.

let name;**name ?? "Anonymous";** // returns "Anonymous"name = "John";**name ?? "Anonymous"; // return "John"**name = '';name ?? "Anonumous" // returns ""

The nullish coalescing operator will replace the way we set the default value for a variable. Consider the function:

function printName(user) {  
   console.log(`Hi ${user.name} From JavaScript Jeep`);  
}

In the above function, we have a  `user`  argument. If the  `user`  object doesn’t contain  `name`, then it will result in  `undefined`. In older versions of JavaScript, we handled this with the following pattern:

function printName(user = {}) {  
     
   const name = user.name ? user.name : "Anonymous"; // Or another way  
     
    // const name = user.name || "Anonymous"; console.log(`Hi ${name} From JavaScript Jeep`);}

But with nullish coalescing:

function printName(user = {}) { **const name = user.name ?? "Anonymous";** console.log(`Hi ${name} From JavaScript Jeep`);}

# Why do we need nullish coalescing?

When using short-circuiting operator  `&&`  and  `||`, we need to handle all falsy values.

`||`  → This will return the first truthy value it finds. Otherwise, it returns last falsy value.

var a = 10, b = 0, c = null;a || b; // 10 (first truthy value)b || c; // null (last falsy value)

`&&`  → This will return first falsy value it finds. Otherwise, it returns last truthy value.

var a = 10, b = 0, c = null, d = 20;**a && b && c ;  // 0 (first falsy value)****a && d; // 20 (last truthy value)**

The problem with these short-circuiting operators is that in JavaScript:

`0, false, '', NaN`  → Are also falsy values

var name ;name = name || “Anonymous”; // Anonymous.

**But consider we are allowing empty string as valid name then:**

var name = '';name = name || “Anonymous”; // Anonymous.

So for cases like this, the best solution is the nullish coalescing operator, which will only set the default value if the left operand is either  `undefined`  or  `null`.

var name = ''; name ?? "Anonymous"; // **''**

Evaluations example:

**false ?? true; **  //false**0 ?? 1;   **       // 0**'' ?? 'Anonymous';** //''  
  
**null ?? 0 ;**      // 0**undefined ?? 0 ;** //0

And another:

function returnNull() {  
   return null;  
}function returnZero() {  
   return 0;  
}**returnNull() ?? returnZero(); // 0**

----------

Like the OR and AND logical operators, the righthand expression is not evaluated if the lefthand side proves to be neither  `null`  nor  `undefined`.

var a = 0;var b = 0;var c = a ?? ++b; a; // 0b; // 0c; // 0

# No Chaining with  `&&`  and  `||`  operator.

It is not possible to combine both the AND (`&&`) and OR operators (`||`) directly with  `??`.

// incorrect waynull || undefined ?? 0 ;// correct way(null || undefined) ?? 0;