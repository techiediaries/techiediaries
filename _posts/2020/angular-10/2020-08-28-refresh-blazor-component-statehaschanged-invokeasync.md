---
layout: bpost
title: "Refresh a Blazor Component with StateHasChanged and InvokeAsync"
image: "images/content/blazor.png"
excerpt: "Let's see by example how to use StateHasChanged and InvokeAsync to force UI refresh in blazor"
date: 2020-08-28
tags : [blazor]
---

In most scenarios, blazor will refresh UI components when changes are made. for example when events, such as button clicks, are triggered  but in some cases you'll need to refresh the UI manually. 

Let's see by example how to use `StateHasChanged` and `InvokeAsync` to force UI refresh.

## Refreshing the UI Using `StateHasChanged`

You can use the `StateHasChanged` life-cycle method to force the re-rendering of a blazor component. 

This is an example:


```csharp
@page "/refresh-ui"

@using System.Threading;

    @using System.Threading;  
    
  
    Counter: @Count  
    <br />  

    <button onclick=@Countdown>Start</button>  

@functions {  
    void Countdown()  
    {  
        var timer = new Timer(TimeCallBack, null, 1000, 1000);  
  
    }  
  
    void TimeCallBack(object state)  
    {  
        if (Count > 0)  
        {  
            Count--;  
            InvokeAsync(StateHasChanged);  
        }  
    }  
}  

```

`StateHasChanged()` is a method that informs the View that it needs to re-render. It's similar to components' life cycle methods and is only available in the `functions{}` block.

We create a `System.Threading.Timer` that will decrement the `Count` property and run `StateHasChanged` every 1000 milliseconds to refresh the component. It gets called using `InvokeAsync` to prevent Blazor throwing an exception when we are calling `StateHasChanged` from a thread.


Blazor supports one-way and two-way data binding just like modern client frameworks, such Angular.
