# Class Binding with ngClass in Angular 9

It's easy to bind CSS classes to elements in your Angular 2 templates. You provide a class name with class.className between brackets in your templates and then an expression on the right that should evaluate to true or false to determine if the class should be applied. Here's how you would bind a single class for example:

```html
<div [class.active]="isActive">
  ...
</div>
```

## NgClass for multiple classes

When multiple classes should potentially be added, the NgClass directive comes in really handy. NgClass should receive an object with class names as keys and expressions that evaluate to true or false as values:

```html
<div [ngClass]="myClasses">
  ...
</div>
```

And then myClasses would be a property in the component that contains an object that looks like this:

```ts
myClasses = {
  important: this.isImportant,
  inactive: !this.isActive,
  saved: this.isSaved,
  long: this.name.length > 6
}
```

Of course the object can also be the return value of a method:

```html
<div [ngClass]="setMyClasses()">
  ...
</div>
```

In the associated component class

```ts
setMyClasses() {
  let classes = {
    important: this.isImportant,
    inactive: !this.isActive,
    saved: this.isSaved,
    long: this.name.length > 6
  };
  return classes;
}
```