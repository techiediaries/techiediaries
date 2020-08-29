---
layout: bpost
title: "Button OnClick Event Binding with Async Method In Blazor and C#"
image: "images/content/blazor.png"
excerpt: "In this example, we'll see how to bind actions to the HTML OnClick event that gets fired when you click on a button. We'll also see how to bind the click event to an async method"
date: 2020-08-28
tags : [blazor]
---

Thanks to Blazor and WebAssembly, we can run C# on web browsers to build client-side apps without using JavaScript and related frameworks like React, Vue or Angular.

In this example, we'll see how to bind actions to the HTML OnClick event that gets fired when you click on a button. We'll also see how to bind the click event to an async method.

## Binding the OnClick Event Using Blazor and C#

In this example, we'll use Blazor, to create a `Count` property of type integer. 

This `Count` property will contain the number of times we clicked on the button. Each time we click the button the `OnCount` variable will be incremented. 

In order to achieve that, we need to create an HTML button that calls a user defined function named `onClick` when the button is clicked.

This is the C# code for our example:


```csharp
@page "/example-1"
<h1>OnClick Event on Blazor</h1>

<button @onclick="@onClick">Click Me</button>

<p>You clicked the button @Count times</p>


@code { 
    public int Count { get; set; } = 0;
 
    private void onClick(MouseEventArgs e)
    {
        Count++;
    }
}
```

We use `@onclick` on the button element then `=` then a string that contains the function that will be used to handle the click event on the button prepended by `@`.

The function needs to be define in the C# code inside the `@code { ... }` block.

We also use the name of the variable prepended by `@` to display the value of the variable defined in the C# code.

## Blazor `OnClick` Event Binding with Inline Funtion

Here is a second example for binding the OnClick event to a function but this time we use an inline C# function to handle the button click:


```csharp
@page "/example-2"

<h1>Event Binding</h1>

<button onclick=@(() => Message = "Button Clicked")>Click Me</button> 

</br>
<p>Message: @Message</p>

@code {
    
    private string Message { get; set; } = "";
}
```

## Blazor Event Binding with Async Task Handler

In Blazor, you can bind the button click event with async task handler. This is an example of the button click event bound to an async method:

```csharp
@page "/example-2"

<h1>Event Binding with Async Method</h1>

<button @onclick="@onClick"> Click me </button>

@code {

    private async Task onClick()
    {
        await service.fetchData();
    }
}
```

## Conclusion

In this article, we have seen by example how to handle button OnClick event with C# and no JavaScript in Blazor. We've also seen how to bind the click event to an async method.