## Style Binding & NgStyle in Angular 2


Factor JS The new open-source CMS for pro front-end developers. 🧐
ETHICAL AD BY CODEFUND 

It's easy to bind inline style in your Angular 2 templates. Here's how you would bind a single style value for example:

```
<p [style.background-color]="'darkorchid'">
  Quite something!
</p>
```

You can also specify the unit, here for example we set the unit in em, but px, % or rem could also be used:

```
<p [style.font-size.em]="'3'">
  A paragraph at 3em!
</p>
```

And here’s how you would conditionally set a style value depending on a property of the component:

<p [style.font-size.px]="isImportant ? '30' : '16'">
  Some text that may be important.
</p>
NgStyle for multiple values
Simple style binding is great for single values, but for applying multiple styles the easiest way is to use NgStyle:

<p [ngStyle]="myStyles">
  You say tomato, I say tomato
</p>
And then myStyles would be a property in the component that contains an object with css property names as the keys, like this:

myStyles = {
'background-color': 'lime',
'font-size': '20px',
'font-weight': 'bold'
}
Or it could be provided inline like this:

<p [ngStyle]="{'background-color': 'lime',
    'font-size': '20px',
    'font-weight': 'bold'}">
  You say tomato, I say tomato
</p>
Or the object can be the return value of a method:

<p [ngStyle]="setMyStyles()">
  You say tomato, I say tomato
</p>
In the associated component class

setMyStyles() {
  let styles = {
    'background-color': this.user.isExpired ? 'red' : 'transparent',
    'font-weight': this.isImportant ? 'bold' : 'normal'
  };
  return styles;
}