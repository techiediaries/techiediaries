---
layout: bpost
title: "Blazor WebAssembly Logging: Console Log Example"
image: "images/content/blazor.png"
excerpt: "In this tutorial, we will learn how to use logging in Blazor WebAssembly"
date: 2020-08-29
tags : [blazor]
---

In JavaScript, you can log debug information on the browser's console using the famous `console.log()` method and similiar methods such as `console.info()` and `console.warn()`. How can you achieve the same thing with Blazor WebAssembly?

We have many ways such as using the C# `Console.WriteLine()` method.

If you are creating a Blazor server app, you'll get the output in the input window, but for Blazor WebAssembly, you'll get the output in the browser´s console. This is an example from the [previous article](https://www.techiediaries.com/check-blazor-app-running-webassembly -ijsinprocessruntime/):

## Logging with `Console.WriteLine`

```csharp
@page "/consolewriteline"

<button @onclick="@onClick"> Check Runtime </button>

@code {

    [Inject]
    protected IJSRuntime ijsRuntime { get; set; }

    private void onClick()
    {
        var isWebAssembly = this.ijsRuntime is IJSInProcessRuntime;

        if(isWebAssembly){
           Console.WriteLine("The app is running on WebAssembly");
        }
        else{
            Console.WriteLine("The app is running on sever-side");
        }

    }
}
```

## Logging Using JavaScript' `console.log()`

Since Blazor WebAssembly supports JavaScript interop. You can use JavaScript methods such as `console.log()` from helper methods in C#. 

For example:

```js
@page "/"
@inject IJSRuntime JSRuntime

<button @onclick=OnButtonClick>Log</button>

@code
{
	private async Task OnButtonClick()
	{
		await JSRuntime.InvokeVoidAsync("console.log", "Hello Blazor!");
	}
}
```

We first inject `IJSRuntime` using `@Inject`. Next, we call the `InvokeVoidAsync()` method and we pass as the first parameter the name of the JavaScript method to call, in our case it's the `console.log()` and as a second parameter the any parameter we want to pass to the JavaScript method. 
This is equivalent to `console.log("Hello Blazor!")`.

## Blazor Logging Framework

Blazor provides a logging framework using the ILogger, ILogger, ILoggerFactory and ILoggerProvider interfaces. 

First, we need to inject `Logger` or `ILogFactory` as follows:

```csharp
@inject ILogger Logger;
@inject ILoggerFactory LoggerFactory
```

Next, we can use the logging methods such as:

```csharp
Logger.LogWarning("");
```


## Conclusion

In this article, we learned how to log debug information on the browser's console in Blazor WebAssembly.



