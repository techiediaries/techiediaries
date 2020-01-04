---
layout: post
title: "Building an Ionic 3/Angular 4|5 Application with a GraphQL API"
image: "images/content/ionic.jpg"
excerpt: "In this tutorial we'll see how to build a CRUD Ionic 3 mobile application (or if you prefer an Angular 4+ web application) using the modern GraphQL-based API" 
tags : [ionic , graphql, angular] 
---

**Let's see how to build a CRUD Ionic 3 mobile application (or if you prefer an Angular 4+ web application) using the modern GraphQL-based API (instead of REST-based API). Since we need a backend to serve the API, we'll cover two options, we'll first see how to use the GraphQL Launchpad to easilly create an Apollo server in 60 lines of code then we'll see how you can build your own self hosted backend using Python and Django**

## Introduction to GraphQL

GraphQL is a modern standard for creating web **A**pplication **P**rogramming **I**nterfaces, commonly known as web APIs. For the last decade REST become the standard way for building APIs but thanks to Facebook there is now a more powerful alternative that have many advantages over REST.

>GraphQL is a query language for APIs and a runtime for fulfilling those >queries with your existing data. GraphQL provides a complete and >understandable description of the data in your API, gives clients the power >to ask for exactly what they need and nothing more, makes it easier to >evolve APIs over time, and enables powerful developer tools. --- [graphql.org](http://graphql.org)

So let's break this:

* GraphQL is a standard and runtime for building APIs not a programming language or a developer tool
* GraphQL gives you more control over your data i.e you can specify exactly what data attributes you want returned with the same query.
* You can use one query to fetch related-data 
* Unlike Rest APIs you are not dependent of the server implementation of your endpoints
* less round-trips to the server for getting all data you need

GraphQL is created and used internally by Facebook then [open sourced in 2015](https://code.facebook.com/posts/1691455094417024/graphql-a-data-query-language/).

Many big industry players are using GraphQL for implemeting their API layer such as:

* Facebook: the creator of GraphQL
* Github
* Shopify
* Product Hunt
* Pinterest
* Twitter
* yelp etc.

You can find more companies that are using GraphQL from this [link](http://graphql.org/users/).

## Queries and Mutations 

For working with GraphQL, you need to be familair with two important concepts which are **Queries** and **Mutations**.

Queries are used to query and retrieve data from the GraphQL server. For example, suppose you want to get the list of products from a GraphQL backend. Here is an example of a query you would send:

```json
query {  
    products{
        id,
        reference,
        quantity
    }
}
```

A Query is a JSON object which has a **root field** and a **payload**(a set of fields). Using a query, you can specify the name and the exact fields of the object to retrieve. 

You can also pass parameters to a query, for example for getting an object with its *id*. Here an example of a query you would send:

```json

query {
    product(id: 1) {
        id,
        reference
    }
}
```

You can also nest a query inside another query for getting related objects data. For example to get the products of the queryied families you would send something like:


```json

query {
    famillies {
        id,
        reference, 
        products{
            id,
            reference 
        }
    }
}
```

A mutation is a write that generally returns the newly modified data object (as opposed to a query, which is meant to be read-only)

## Using GraphQL: Servers

You can either build a backend which exposes a GraphQL-based API using your preferred language such as JavaScript/Node.js, PHP, Python or Ruby etc. Or you can also GraphQL based hosted services or headless content management systems such as:

* GraphCMS - GraphQL based Headless Content Management System.
* Graphcool - Your own GraphQL backend in under 5 minutes. Works with every * GraphQL client such as Relay and Apollo.
* Reindex - Instant GraphQL Backend for Your React Apps.
* Scaphold - GraphQL as a service that includes API integrations such as Stripe and Mailgun.
* Tipe - Next Generation API-first CMS with a GraphQL or REST API. Stop letting your CMS decide how you build your apps.


## Using GraphQL: Clients

## Consuming GraphQL API with Ionic 3/Angular 4

Apollo makes fetching the exact data you need for your component easy and allows you to put your queries exactly where you need them. All we need is to install apollo-angular, angular-client, and angular-tag packages.

## Create a New Ionic 3 App

Let’s start by creating a new Ionic 3 application using The Ionic CLI.

```bash
ionic start ionic-graphql-demo blank
```




