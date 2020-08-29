---
layout: bpost
title: "Routing and Navigation in Blazor WebAssembly"
image: "images/content/blazor.png"
excerpt: "In this article, we'll see how to implement routing and navigation in your SPA application built with Blazor WebAssembly"
date: 2020-08-29
tags : [blazor]
---

In this article, we'll see how to implement routing and navigation in your SPA application built with Blazor WebAssembly.

In SPA frameworks, you need to use client-side routing and navigation to create apps with multiple views.

## Routing In Blazor WebAssembly

You can map a route to a Blazor component by using the @page directive at the top of your file. For example:

```csharp
@page "/a-route"
```

You can assign more than one route to a single component:


```csharp
@page "/route"
@page "/route/{ParamValue}"
```

To access the parameter, you can simply create a C# property with the name of the parameter as follows:

```csharp
[Parameter]
public string? ParamValue { get; set; }
```

The routes are defined in Blazor components but the router component can be found in the `App.razor` file:

```csharp
<Router AppAssembly="@typeof(Program).Assembly">
```

## Blazor Navigation

After implementing routing in your app, you'll also need navigation.

Just like routing, navigation is also simple. You simply need to use `NavigationManager` which needs to be injected in your component using the following syntax:

```csharp
@inject NavigationManager NavManager
```

Next, you can navigate to another component using the following syntax:


```csharp
NavManager.NavigateTo("route/1");
```

## Conclusion

In this short article, we've seen how you can implement routing and navigation in your SPA built using Blazor WebAssembly.

