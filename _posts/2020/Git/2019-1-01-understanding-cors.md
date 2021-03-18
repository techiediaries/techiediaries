---
layout: post
title: "Understanding CORS" 
date: 2019-01-01
tags: []
excerpt: "Learning about CORS"
---

APIs are complex webs of interconnected applications, interfaces, frontends, and backends. Making sense of these systems is not always easy to do. When so much of the data coming into a system is from external sources that run the gamut from trusted to untrusted, known to unknown, the easiest way to classify that data is to classify it by the source origin – that is, to not talk about the nature of the data, but rather the nature of that which sent the data.

For this reason, much of the API space is governed by the idea of origin and the various restrictions upon such a system. Defining what is cross-origin, what is same-origin, and how those systems interact is a complex topic made even more so due to the nature of implicit trust across origins. Today, we will look at a system that intends to solve a lot of the issues raised by supporting multi-origin data types –  **Cross-Origin Resource Sharing**.

# What is “Origin”?

When discussing API interactions in the context of CORS, it helps to understand what an “origin” is. APIs are concerned as much with the request itself as with where the request came from. The source of the request is considered the “origin”, and both the relationship of the source in terms of the HTTP resource and the mode in which the request was made can create issues with origin restrictions.

By default, API systems typically run on a same-origin policy – that is, requests are generated internally and then responded to with data from an internal store (as long as they share the stated origin with the resource in question). For instance, if a request comes from  [example.com/api](http://example.com/api)  to “[example.com/api”](http://example.com/api%E2%80%9D), then this is the same origin, and as such, is implicitly trusted.

The problem comes with the fact that a variety of cross-origin requests can be normal and valid. For instance, a different domain request can absolutely be legitimate, especially if the requests are coming from domains separated by business logic. For instance, a request from  [examplecorporate.com/api](http://examplecorporate.com/api)  to  [exampleretail.com/api](http://exampleretail.com/api)  might be entirely valid, and in this case, even though the two domains are different, they are owned by the same provider. Other use cases, such as subdomains ([example.com](http://example.com/)  and  [resources.example.com](http://resources.example.com/)), port differences ([example.com](http://example.com/):80  and  [example.com](http://example.com/):10777), and protocol differences ([https://example.com](https://example.com/)  and  [http://example.com](http://example.com/)), can all be restricted due to same-origin policies, even if the requests and normal, legitimate, and sensible.

In many cases, the data must be separated due to simple business logic. For instance, if we have two APIs –  [images.example.com](http://images.example.com/)  and  [content.example.com](http://content.example.com/)  – we might need to pull from both to push a news article to  [publish.example.com](http://publish.example.com/). Even though they are all on the same site and (in theory) share a trusted network, they are technically different origins.

# What is CORS?

CORS is designed to support all of these use cases while still enabling robust security options. CORS is a  [W3C standard](https://www.w3.org/TR/cors/)  that serves as a middle ground – in essence; it allows a resource to allow some cross-origin requests while still rejecting others. This is safer and more flexible than other solutions that have been attempted because it is inclusionary – everything that is included as part of the cross-origin allowance is explicitly stated and understood.

This is part of the reason that CORS is often considered a boost to security. Other cross-origin options attempt to obfuscate the actual origin of the request – CORS, in comparison, allows that request to continue through transformation and inclusion, which provides a higher level of granularity. In a world of “all or nothing”, CORS gives options.

## How does CORS Work?

CORS does what it does through the inclusion of special headers. A properly configured server will provide these headers to browsers, which will then either parse the request or cause it to fail. There are many headers within the CORS standard, but the main enabling header is the Access-Control-Allow-Origin header, which specifies which origins can access which resources.

There are basically two types of CORS requests. Simple requests are those that use either the GET, POST, or HEAD verbs, a CORS safe-listed header is utilized, no ReadableStream object or event listeners are involved, and either  `application/x-www-form-urlencoded`,  `text/plain`, or  `multipart/form-data<c/ode> are used as the Content-Type header. Assuming all of these criteria are met, the request is considered “simple”.`

A more complex type of request is known as preflight. This is a term that you might find explicitly declared when CORS tooling is brought up, as its inclusion means some particular things are allowed that are not allowed in a simple request. A preflight request first sends an HTTP request using the OPTIONS verb to determine whether or not the request is safe and accepted. The result of this call determines what the CORS interaction and protocol response is. It does this by setting the request method (using Access-Control-Request Method), the custom headers (using Access-Control-Request-Headers), and the origin of the call.

## Practical Example

Let’s look at a practical example of where CORS might make sense. We can imagine a scenario in which we have a streaming video service that provides content on-demand to users. To fulfill our content obligations and deliver a strong offering to our users, we have servers that provide different kinds of content depending on what the user has marked in their settings. This saves bandwidth, increases the content service provision flow speed, and improves their user experience.

In order to leverage these benefits, we have our content organized via four APIs:

[media.example.com](http://media.example.com/)  
[closedcaptions.example.com](http://closedcaptions.example.com/)  
[accounts.example.com](http://accounts.example.com/)  
[content.example.com](http://content.example.com/)

Because all of our APIs have different domains, we would consider them cross-origin. We would need to configure each of these APIs to accept cross-origin requests from the others, which can be quite complicated – what we can do here is leverage our APIs and the CORS system to manipulate the headers seamlessly.

First, when a request enters our API, we will have the API check take the header contents, and pass it internally. From here, we can check the header value against a “whitelist” to see if it matches any of our internal domains. If it does, we can pass it forward to the CORS system using the Access-Control-Allow-Origin header response.

Here you can see just how powerful CORS is – with comparatively simple logic, and we can handle even a complex, multi-API situation such as this!

# CORS Considerations

As with any tool, CORS has several elements that make it exceedingly dangerous when misused. These areas of concern should be considered when setting up a CORS environment – while this list is not exhaustive of such concerns, it represents the most common misconfigurations, incorrect assumptions, and unfortunate mistakes seen in the wild.

## Allow All Wildcard

Perhaps the most common mistake is simply setting the Access-Control-Allow-Origin variable to a wildcard, “*”. What this does is allows all requests, regardless of origin. As discussed earlier, CORS is meant to be a middle ground between no cross-origin restrictions and an entirely locked down system – accordingly, using the wildcard, in this case, is basically the end of the spectrum with no cross-origin restrictions at all.

How secure would a safe be if any lock could turn the tumblers? How useful would an identification card be if anyone could print one? CORS is a powerful tool for securing things granularly – if you are going to allow all, you are really not using CORS. You are stripping CORS of its powers.

One or two use cases where this might be appropriate – for example, an open API that ties into third-party sites and is completely intent agnostic – but these are very much the exception and not the norm.

## Using Hybrid and Non-Standard Headers

One of the most common mistakes made when using CORS is a basic misunderstanding of the header system and how clients interact with it. CORS does not allow multiple domains in the Access-Control-Allow-Origin header, nor does it allow wildcard domains like  [example.com](http://example.com/)  – neither of these is correct uses of the system, even if they seem like they should work.

Furthermore, leaving off protocols can also create problems. CORS requires that you state the protocol in question – using  [http://localhost](http://localhost/)  will only work if you are already working on port 80. Similarly, if you try and state a non-standard port or protocol, such as  [example.com](http://example.com/)  instead of  [https://example.com](https://example.com/), your CORS setup will fail.

# Conclusion

CORS is actually a quite simple system once you understand both the need for it and the underlying system that drives it. Implementing CORS can result in more granular security; yes, it can also open up major new avenues for data interaction and transmission. Properly configured and created within a planned API architecture, CORS is a wonderful tool.
