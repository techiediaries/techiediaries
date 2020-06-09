---
layout: post
title: "Angular 8 Data (Event & Property) Binding Tutorial: Build your First Angular App"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll continue building our calculator application using Angular 8. We'll be particularly learning about data binding both event and property binding. " 
tags : [  angular  , angular8]
---

In this tutorial, we'll continue building our calculator application using Angular 8. We'll be particularly learning about data binding both event and property binding. 

Up until now, our template is just plain HTML but Angular provides other constructs that we can use in the templates such as data binding (interpolation, event and property binding). 

Simply put, data binding is a fundamental concept in Angular that allows developers to make communication between a component and its view or more precisly the DOM. This way you don't need to manually push data from your component to the DOM and back. 

> Learn how to build a full-stack app in our [Angular 10 CRUD tutorial](https://www.techiediaries.com/angular/angular-9-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/).

Angular provides four types of data binding and they are essentically different in the way data flows i.e from the component to the DOM, from the DOM to the component or both ways:

- Interpolation: Data flows from the component to the DOM - It's used to display the value of a component member variable in the associated template, e.g. `{{ foobar }}`. We use curly braces for interpolation.

- Property binding: Data flows from the component to a property of an element in the DOM. It's used to bind a component member variable to an attribute of a DOM such as the value attribue of an `<input>` tag (For example: `<input type="text" [value]="foobar">`). We use brackets for property binding.

- Event binding: Data flows from the DOM to the component. When a DOM event, such as a `click`, is triggered, the bound method from the component is called. For example: `<button (click)="sayHi()">Hi</button>` - The `sayHi()` method will be called so it needs to be defined in the component class. We use parentheses for event binding.

- Two-way data binding: Data flows both ways. For example:  `<input type="text" [(ngModel)]="foobar">` (The `foobar` variable needs to be defined in the component). The input element and `foobar` will have the same value and when one changes, the other one changes to the same value accordingly. We use the banana in the box syntax which combines brackets and parentheses for two-way data binding. `ngModel` is a special directive that binds to the `value` attribute of the `<input>` and `<textarea>` elements but you can constrcut two-way data binding for any property in the DOM or component. Two-way data binding = property binding + event binding.
  
Equipped with this information, let's implement our calculator application.

We have DOM elements for operations and numbers and where to display the result of the operation(s).

We need to get the value of the number or the type of the operation when the user clicks on the corresponding DOM element, calculate the result and display it in the results element.

In the template, we have four sets of keys: 

- digits (0-9), 
- operators (+, -, *, /, =), 
- a decimal point (.) 
- and a reset key. 

Let's see how we can use Angular to listen for clicks on the calculator and determine what type of key was pressed.


Open the `src/app/calculator/calculator.component.ts` file and start by defining the following member variables of the component:

```js
export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;
```

- The `currentNumber` variable holds the string that will be displayed in the result input element.
- The `firstOperand` variable holds the value of the first operand of the operation.
- The `operator` variable holds the operation.
- The `waitForSecondNumber` variable holds a boolean value indicating if the user has finished typing the first operand and ready to enter the second operand of the operation. 

Next, define the `getNumber()` method that will be used to get the current number:

```ts
  public getNumber(v: string){
    console.log(v);
    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;

    }
  }
```

Next, define the `getDecimal()` method which appends the decimal point to the current number:

```ts
  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }
```

Next define the `doCalculation()` method which performs the calculation depending on the operator type:

```ts
  private doCalculation(op , secondOp){
    switch (op){
      case '+':
      return this.firstOperand += secondOp; 
      case '-': 
      return this.firstOperand -= secondOp; 
      case '*': 
      return this.firstOperand *= secondOp; 
      case '/': 
      return this.firstOperand /= secondOp; 
      case '=':
      return secondOp;
    }
  }
```

Next, define the `getOperation()` that will be used to get the performed operation:

```ts
  public getOperation(op: string){
    console.log(op);

    if(this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);

    }else if(this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
 
  }
```

Finally, define the `clear()` method that will be used to clear the result area and reset the calculations:

```ts
  public clear(){
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
```

Now, you need to use data binding to bind these methods to the template.

## Angular Property Binding by Example

We have defined variables and methods in the component. Now, we'll need to bind them to the template.

Let's start with the `currentNumber` variable which holds the value of the currently typed number. Let's use property binding to bind `currentNumber` to the `value` attribute of the `<input>` element as follows:

```html
<div class="calculator">

  <input type="text" class="calculator-screen" [value]="currentNumber" disabled />
  
  <!-- [...] -->
``` 

We use brackets around the `value` attribute to create a property binding.

Now, our current number will be displayed in our calculator and when the value of the `currentNumber` variable changes, the displayed value will change accordingly without having to manually add any code to update the DOM.

## Angular Event Binding by Example

Next, when a digit button is clicked we need to call the `getNumber()` method to append the digit to the current number string. For this, we can use Angular event binding to bind the `getNumber()` method to the `click` event of buttons displaying the digits. Changte your component template as follows:

```html
<div class="calculator">

  <input type="text" class="calculator-screen" [value]="currentNumber" disabled />
  
  <div class="calculator-keys">
    
    <!-- [...] -->

    <button type="button" (click) = "getNumber('7')" value="7">7</button>
    <button type="button" (click) = "getNumber('8')" value="8">8</button>
    <button type="button" (click) = "getNumber('9')" value="9">9</button>


    <button type="button" (click) = "getNumber('4')" value="4">4</button>
    <button type="button" (click) = "getNumber('5')" value="5">5</button>
    <button type="button" (click) = "getNumber('6')" value="6">6</button>


    <button type="button" (click) = "getNumber('1')" value="1">1</button>
    <button type="button" (click) = "getNumber('2')" value="2">2</button>
    <button type="button" (click) = "getNumber('3')" value="3">3</button>


    <button type="button" (click) = "getNumber('0')" value="0">0</button>
    <!-- [...] -->
  </div>
</div>
``` 

We use the parentheses around the `click` event to create an event binding.

Next, let's bind the `getOperation()`, `getDecimal()` and `clear()` methods to the `click` event of their respective buttons:

```html
  <div class="calculator-keys">
    
    <button type="button" (click) = "getOperation('+')" class="operator" value="+">+</button>
    <button type="button" (click) = "getOperation('-')" class="operator" value="-">-</button>
    <button type="button" (click) = "getOperation('*')" class="operator" value="*">&times;</button>
    <button type="button" (click) = "getOperation('/')" class="operator" value="/">&divide;</button>

    <!-- [...] -->

    <button type="button" (click) = "getDecimal()" class="decimal" value=".">.</button>
    <button type="button" (click) = "clear()"  class="all-clear" value="all-clear">AC</button>

    <button type="button" (click) = "getOperation('=')" class="equal-sign" value="=">=</button>

  </div>
</div>    
```

That's it our calculator is ready!

## Conclusion

In this tutorial, we've finished building our simple calculator application with Angular 8. We've learned about the types of data bindings and we've seen example of event and property binding in Angular 8.
