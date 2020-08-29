---
layout: bpost
title: "Imports in Blazor WebAssembly with C# @using"
image: "images/content/blazor.png"
excerpt: "Learn how to do imports in Blazor WebAssembly with the C# @using directive"
date: 2020-08-29
tags : [blazor]
---

Most often than not, you'll need to use functionalities from .net libraries in your Blazor WebAssembly applications. In that case, you'll need to import them via the C# `@using` directive.


Let's say you need to use the `Debug.WriteLine()` method in your Blazor component:


```csharp
Debug.WriteLine("Hello Blazor!");
```

You need to import `System.Diagnostics` with the C# `@using` directive as follows:


```csharp
@using System.Diagnostics
```

If you need to use the method across multiple Blazor components, you can put the import line above in the `_Imports.razor` file. 


