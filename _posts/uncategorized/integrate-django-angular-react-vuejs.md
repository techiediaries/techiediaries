---
layout: post
title: "5 Ways to Integrate React, Vue and Angular with Django"
image: "images/content/axios.jpg"
excerpt: "" 
tags : [django , javascript] 
---


**When you are building modern API-based web applications you will need to integrate a front-end framework such as React, VueJS or Angular etc. with a server side framework such as Python Django. So in this post we'll see different ways you can use to integrate your front-end and backend apps.**

 

SPA + granular API: Use Django as a REST API backend, and provide all your page data via API endpoints that are queried by a monolithic SPA React app (this is the approach I see taught online the most). This approach is great for a microservices-style backend, because the frontend doesn’t care how the backend is built, or what endpoints it hits, as long as it gets the data it needs.
- Webpack is optimized for this approach.
- Frontend can be built on top of lots of separate microservice endpoints
- Frontend handles routing & switching to new pages
- Very hard to nail server-side rendering (could be bad for search indexing)
- Loads slowly on bad connections since data takes many round trips
SPA + 1 request-per-page API: Provide each page’s data as one request The frontend still handles routing, but the backend is built with 1 view per page, instead of many smaller REST API endpoints. It’s generally easier to start this way rather than exposing separate endpoints for every query, but it couples your backend & frontend logic fairly tightly.
- Frontend handles routing & switching to new pages
- Frontend relies on all almost its data coming from one endpoint
- Faster load times, easier caching than having separate endpoints
- Easier to do server-side rendering because views match the frontend data
- Decent performance on bad connections, but still requires 2 round-trips
Templated JS Snippets: Compose React components using the template system, by including fragments of JS code to build up an html template that renders the desired page (instead of mounting one component file with the whole page defined in JS). This approach requires the most haxxing in my experience, as you totally ignore the benefits of JS imports and break your ability to lint pages, minify JS, and compile pages to the minimum amount of JS needed. This is the approach libraries like django-react-templatetags use, it allows for server-side rendering, but it introduces a lot of complexity (including a node server!) into your backend.
- No AJAX requests needed, all data is served with the page
- Backend handles all routing, frontend links are normal hrefs
- Server side rendering is very easy, data is all provided by one view, and snippets can be rendered independently and cached
- Easy to swap out react components for non-react on a piece-by-piece basis
- Very fast load times, rendered snippets can be cached and served together with their data (great for search indexing)
- 1 round-trip page-loads if html page is cached
Page as a Component (our approach): Compose pages in JS, include each page as a cacheable <script> in the template, pass it data via props. This approach combines the best of both worlds, you get page composition in React, but also easy server-side rendering and caching of whole pages at a time. It’s also easier to manage the data flow when you don’t have separate react snippets, as all components are laid out hierarchically from one mount point downwards.
- Slightly harder to mix & match template fragments with React components
- More customizable build process than with Templated JS Snippets
- Flexible, works equally well for non-React pages like Vue.js or Angular
- Easier to manage data flow bc. of single JS entry point (esp. with redux)
- 1 round-trip page-loads if script bundle is cached