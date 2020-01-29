**ES6 introduced classes to JavaScript, but they can be too simplistic for complex applications. Class fields (also referred to as  _class properties_) aim to deliver simpler constructors with private and static members. The proposal is currently a  [TC39 stage 3: candidate](https://github.com/tc39/proposal-class-fields)  and is likely to be added to ES2019 (ES10). Private fields are currently supported in Node.js 12, Chrome 74, and Babel.**

A quick recap of ES6 classes is useful before we look at how class fields are implemented.

## ES6 Class Basics

JavaScript’s object-oriented inheritance model can confuse developers coming from languages such as C++, C#, Java, and PHP. For this reason, ES6 introduced  _classes_. They are primarily syntactical sugar but offer more familiar object-oriented programming concepts.

A class is an  _object template_  which defines how objects of that type behave. The following  `Animal`  class defines generic animals (classes are normally denoted with an initial capital to distinguish them from objects and other types):

```javascript
class Animal {

  constructor(name = 'anonymous', legs = 4, noise = 'nothing') {

    this.type = 'animal';
    this.name = name;
    this.legs = legs;
    this.noise = noise;

  }

  speak() {
    console.log(`${this.name} says "${this.noise}"`);
  }

  walk() {
    console.log(`${this.name} walks on ${this.legs} legs`);
  }

}

```

_Class declarations always execute in strict mode. There’s no need to add  `'use strict'`._

The  **constructor**  method is run when an object of the  **Animal**  type is created. It typically sets initial properties and handles other initializations.  `speak()`  and  `walk()`  are instance methods which add further functionality.

An object can now be created from this class with the  `new`  keyword:

```javascript
let rex = new Animal('Rex', 4, 'woof');
rex.speak();          // Rex says "woof"
rex.noise = 'growl';
rex.speak();          // Rex says "growl"

```

## Getters and Setters

_Setters_  are special methods used to define values only. Similarly,  _Getters_  are special methods used to return a value only. For example:

```javascript
class Animal {

  constructor(name = 'anonymous', legs = 4, noise = 'nothing') {

    this.type = 'animal';
    this.name = name;
    this.legs = legs;
    this.noise = noise;

  }

  speak() {
    console.log(`${this.name} says "${this.noise}"`);
  }

  walk() {
    console.log(`${this.name} walks on ${this.legs} legs`);
  }

  // setter
  set eats(food) {
    this.food = food;
  }

  // getter
  get dinner() {
    return `${this.name} eats ${this.food || 'nothing'} for dinner.`;
  }

}

let rex = new Animal('Rex', 4, 'woof');
rex.eats = 'anything';
console.log( rex.dinner );  // Rex eats anything for dinner.

```

## Child or Sub-classes

It’s often practical to use one class as the base for another. A  `Human`  class could inherit all the properties and methods from the  `Animal`  class using the  `extends`  keyword. Properties and methods can be added, removed, or changed as necessary so human object creation becomes easier and more readable:

```javascript
class Human extends Animal {

  constructor(name) {

    // call the Animal constructor
    super(name, 2, 'nothing of interest');
    this.type = 'human';

  }

  // override Animal.speak
  speak(to) {

    super.speak();
    if (to) console.log(`to ${to}`);

  }

}

```

`super`  refers to the parent class, so it’s usually the first call made in the  `constructor`. In this example, the Human  `speak()`  method overrides that defined in  `Animal`.

Object instances of  `Human`  can now be created:

```javascript
let don = new Human('Don');
don.speak('anyone');        // Don says "nothing of interest" to anyone

don.eats = 'burgers';
console.log( don.dinner );  // Don eats burgers for dinner.

```

## Static Methods and Properties

Defining a method with the  `static`  keyword allows it to be called on a class without creating an object instance. Consider the  `Math.PI`  constant: there’s no need to create a  `Math`  object before accessing the  `PI`  property.

ES6 doesn’t support static properties in the same way as other languages, but it is possible to add properties to the class definition itself. For example, the  `Human`  class can be adapted to retain a count of how many human objects have been created:

```javascript
class Human extends Animal {

  constructor(name) {

    // call the Animal constructor
    super(name, 2, 'nothing of interest');
    this.type = 'human';

    // update count of Human objects
    Human.count++;

  }

  // override Animal.speak
  speak(to) {

    super.speak();
    if (to) console.log(`to ${to}`);

  }

  // return number of human objects
  static get COUNT() {
    return Human.count;
  }

}

// static property of the class itself - not its objects
Human.count = 0;

```

The class’s static  `COUNT`  getter returns the number of humans accordingly:

```javascript
console.log(`Humans defined: ${Human.COUNT}`); // Humans defined: 0

let don = new Human('Don');

console.log(`Humans defined: ${Human.COUNT}`); // Humans defined: 1

let kim = new Human('Kim');

console.log(`Humans defined: ${Human.COUNT}`); // Humans defined: 2

```

## ES2019 Class Fields  _(NEW)_

The new class fields implementation allows public properties to initialized at the top of a class outside any constructor:

```javascript
class MyClass {

  a = 1;
  b = 2;
  c = 3;

}

```

This is equivalent to:

```javascript
class MyClass {

  constructor() {
    this.a = 1;
    this.b = 2;
    this.c = 3;
  }

}

```

If you still require a constructor, initializers will be executed before it runs.

### Static Class Fields

In the  [example above](https://www.sitepoint.com/javascript-private-class-fields/#static-methods-and-properties), static properties were inelegantly added to the class definition object after it had been defined. This isn’t necessary with class fields:

```javascript
class MyClass {

  x = 1;
  y = 2;
  static z = 3;

}

console.log( MyClass.z ); // 3

```

This is equivalent to:

```javascript
class MyClass {

  constructor() {
    this.x = 1;
    this.y = 2;
  }

}

MyClass.z = 3;

console.log( MyClass.z ); // 3

```

### Private Class Fields

All properties in ES6 classes are public by default and can be examined or modified  _outside_  the class. In the  `Animal`  examples above, there’s nothing to prevent the  `food`  property being changed without calling the  `eats`  setter:

```javascript
class Animal {

  constructor(name = 'anonymous', legs = 4, noise = 'nothing') {

    this.type = 'animal';
    this.name = name;
    this.legs = legs;
    this.noise = noise;

  }

  set eats(food) {
    this.food = food;
  }

  get dinner() {
    return `${this.name} eats ${this.food || 'nothing'} for dinner.`;
  }

}

let rex = new Animal('Rex', 4, 'woof');
rex.eats = 'anything';      // standard setter
rex.food = 'tofu';          // bypass the eats setter altogether
console.log( rex.dinner );  // Rex eats tofu for dinner.

```

Other languages often permit  `private`  properties to be declared. That’s not possible in ES6, so developers often work around it using the underscore convention (`_propertyName`),  [closures, symbols, or WeakMaps](https://curiosity-driven.org/private-properties-in-javascript). An underscore provides a hint to the developer, but there’s nothing to prevent them accessing that property.

In ES2019, private class fields are defined using a hash  `#`  prefix:

```javascript
class MyClass {

  a = 1;          // .a is public
  #b = 2;         // .#b is private
  static #c = 3;  // .#c is private and static

  incB() {
    this.#b++;
  }

}

let m = new MyClass();

m.incB(); // runs OK
m.#b = 0; // error - private property cannot be modified outside class

```

Note that there’s no way to define private methods, getters, or setters. A  [TC39 stage 3: draft proposal](https://github.com/tc39/proposal-private-methods)  suggests using a hash  `#`  prefix on names and it has been implemented in Babel. For example:

```javascript
class MyClass {

  // private property
  #x = 0;

  // private method (can only be called within the class)
  #incX() {
    this.#x++;
  }

  // private setter (can only be used within the class)
  set #setX(x) {
    this.#x = x;
  }

  // private getter (can only be used within the class)
  get #getX() {
    return this.$x;
  }

}

```

## Immediate Benefit: Cleaner React Code!

React components often have methods tied to DOM events. To ensure  `this`  resolves to the component, it’s necessary to  `bind`  every method accordingly. For example:

```javascript
class App extends Component {

  constructor() {

    super();

    this.state = { count: 0 };

    // bind all methods
    this.incCount = this.incCount.bind(this);
  }

  incCount() {
    this.setState(ps => { count: ps.count + 1 })
  }

  render() {

    return (
      <div>
        <p>{ this.state.count }</p>
        <button onClick={this.incCount}>add one</button>
      </div>
    );

  }
}

```

When  `incCount`  is defined as an ES2019 class field, it can be assigned as a function using the ES6  `=>`  fat arrow, which is automatically bound to the defining object. It’s no longer necessary to add  `bind`  declarations:

```javascript
class App extends Component {

  state = { count: 0 };

  incCount = () => {
    this.setState(ps => { count: ps.count + 1 })
  };

  render() {

    return (
      <div>
        <p>{ this.state.count }</p>
        <button onClick={this.incCount}>add one</button>
      </div>
    );

  }
}

```

## Class Fields: an Improvement?

ES6 class definitions were simplistic. ES2019 class fields require less code, aid readability, and enable some interesting object-oriented programming possibilities.

Using  `#`  to denote privacy has received some criticism, primarily because it’s ugly and feels like a hack. Most languages implement a  `private`  keyword, so attempting to use that member outside the class will be rejected by the compiler.

JavaScript is interpreted. Consider the following code:

```javascript
class MyClass {
  private secret = 123;
}

const myObject = new MyClass();
myObject.secret = 'one-two-three';

```

This would have thrown a runtime error on the last line, but that’s a severe consequence for simply attempting to set a property. JavaScript is purposely forgiving and ES5 permitted property modification on any object.

Although clunky, the  `#`  notation is invalid outside a class definition. Attempting to access  `myObject.#secret`  can throw a syntax error.