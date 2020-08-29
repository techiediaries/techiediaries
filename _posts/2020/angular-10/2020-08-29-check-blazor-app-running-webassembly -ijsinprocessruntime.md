---
layout: bpost
title: "Check if Blazor App is Running On WebAssembly Using IJSInProcessRuntime"
image: "images/content/blazor.png"
excerpt: "Blazor apps can run both on server-side or client-side via webassembly. In this short example, we'll see how to check if your app is runnning with server-side Blazor or webassembly"
date: 2020-08-29
tags : [blazor]
---

Blazor apps can run both on server-side or client-side via webassembly. In this short example, we'll see how to check if your app is runnning with  server-side Blazor or webassembly.

The trick is to use the `IJSInProcessRuntime` interface. This is example which displays if the app is running inside a webassembly environment or in the server when clicking on a button.


```csharp
@page "/runtime"

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


