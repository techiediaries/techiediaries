---
layout: post
title: "The OOP Concepts with TypeScript: Inheritance, Abstraction, Polymorphism and Encapsulation"
author: team
excerpt: "In this article, we'll learn about the Object Oriented Programming or OOP concepts in TypeScript such as inheritance, abstraction, polymorphism and encapsulation. " 
tags : [angular, angular8, typescript]
---

In this article, we'll learn about the Object Oriented Programming or OOP concepts in TypeScript such as inheritance, abstraction, polymorphism and encapsulation. 



## What is the Object Oriented Programming?

Object Oriented Programming or OOP is a programming paradigm that has four principles which are:


- **Inheritance**, 
- **Abstraction**, 
- **Polymorphism**, 
- And **Encapsulation**.


According to [Wikipedia](https://en.wikipedia.org/wiki/Object-oriented_programming):


> **Object-oriented programming** (**OOP**) is a programming paradigm based on the concept of "objects", which can contain data, in the form of fields (often known as attributes or properties), and code, in the form of procedures (often known as methods).
> …
> In OOP, computer programs are designed by making them out of objects that interact with one another. OOP languages are diverse, but the most popular ones are class-based, meaning that objects are instances of classes, which also determine their types.

At the heart of OOP is the concept of an object which may refer to an abstract or concrete object in our world so this makes it easier for programmers to model actual problems with computers languages before trying to find the solutions.

An object can have data (which form the properties or attributes of the real-world object) and code in a form of methods (which represent the behavior in the equivalent real-world object). Think of a car for example, it has a color, weight and speed and can move forward or backward.  

You can very easily create a “Car” object with an OOP language such as TypeScript to represent this car in the computer memory.

Again from [Wikipedia](https://en.wikipedia.org/wiki/Class-based_programming):


> **Class-based programming**, or more commonly **class-orientation**, is a style of Object-oriented programming(OOP) in which inheritance occurs via defining classes of objects, instead of inheritance occurring via the objects alone (compare [prototype-based programming](https://en.wikipedia.org/wiki/Prototype-based_programming)).


Unlike JavaScript which has a prototype-based OOP, TypeScript is a class-based OOP language.



> **Note**: ES6+ or modern JavaScript has introduced the concept of a class but it’s actually more of a syntactic sugar on top  of the prototype-based system.

 
In the English dictionary, the definition of **class** is:


>  a set or category of things having some property or attribute in common and differentiated from others by kind, type, or quality.

In a programming language, a **class** has the same meaning in the sense that it represents a category of objects or a **type** but it also has a concrete form as an extensible template of code for creating objects via **instantiation**.

Let’s refer back to our “Car” object. Before, you can create the object, you need to create the “Car” class which contains the data fields and methods (procedures which are attached to the class) that each car has, next, you **instantiate** the class to create one or more objects (cars).


> **Note**: An object is an instance of the class. In real-world, an object refers to the actual concrete object that we are modeling while the class refers to the abstract category of objects.

Next to the **class** concept sits the **inheritance** concept which is equally as important and can’t be separated from the **class** in OOP languages**.**  

We refer to ***Inheritance*** *in OOP when a class A inherits the properties of another class B. A is also said to extend B. This is a familiar behavior in nature where the children of humans or other creatures inherit the traits of their parents.*
   **
Thanks to ***inheritance***, we can reuse the fields and methods of the existing class which facilitates **reusability**, one of the goals of the ***OOP*** *paradigm*.
 
**I*****nheritance*** ****is a relationship between two classes where the class that is used as the basis for ***inheritance*** ****is refereed to as a **superclass** or **base class**. While the class that ***inherits*** from a base class is refereed to as a **subclass.**

In TypeScript, we use the  `extends` keyword  for defining an inheritance.

Inheritance implies **Polymorphism** (Another fundamental principle of OOP). Think of that, when a **class B and C** inherit the methods of a **class A**. They can customize or change the inherited methods as necessary. For example, both a **Plane** and a **Car** inherit a `move()` method from a **Vehicle** but the move behavior of a Plane is actually the flying instead of moving using wheels. So when we create the **Plane** class that extends the **Vehicle** class, we need to **override** the `move()` method to implement a flying behavior instead of the regular movement.  ****     

Overriding the inherited (parent) method and re-implementing its behavior is what refers to **Polymorphism**. In fact, the meaning of polymorphism from the Greek origin is when something occurs in many different forms.


## What about Encapsulation?

[Encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)) represents another principle of Object-oriented programming. The concept refers to the grouping of data variables and methods. The **class** in OOP languages ****enables encapsulation via providing the way to group data and methods.
  
*Encapsulation is also used to hide data and methods that are meant to be internal and only required for the inner working of the object.* In this meaning, encapsulation is equivalent to Abstraction, another fundamental principle of OOP.

TypeScript provides the programmer with access modifiers or keywords like `public`, `protected` and `private` to specify the degree of visibility of the class members to the outside.



