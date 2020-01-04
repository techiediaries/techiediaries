---
layout: post
title: "GraphQL Tutorial with Angular 7/8 and Apollo Example"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this tutorial, we'll teach you about the fundamental GraphQL concepts starting with an introduction and then explain the building blocks for a GraphQL API. Next, we'll learn to consume a GraphQL API with Angular 7/8 and Apollo" 
tags : [angular , graphql] 
---


In this tutorial, we'll teach you about the fundamental GraphQL concepts starting with an introduction and then explaining the building blocks for a GraphQL API. Next, we'll see how to build an example Angular 7/8 app that consumes a GraphQL API from scratch using Apollo client. 

We'll be consuming a GraphQL API built with Node.JS and Express.


In a nutshell, you'll understand:

- What is GraphQL and why using it to build web APIs instead of REST,
- What is the difference between a Schema-first-approach vs. a Code-first-approach,
- What is a Schema and how to use it to define the structure of the data in your API,
- What's a Schema Definition Language (SDL) and how can be used to define a Schema, 
- What's a builtin scalar type and how to use it to create object types,
- What are object types and how they are used to define a Schema,
- Root types such as queries, mutations, and subscriptions,
- What's a resolver function,
- How to map resolvers to fields in the root types of a Schema,
- How to make executable Schemas to actually create a GraphQL API.  

For the practical example, we'll learn how to:

- Install Angular CLI 8
- Create an Angular 8 app
- Creating an Angular component for displaying consumed GraphQL API data
- Install and set up Angular Apollo using the `ng add` command
- Connect Angular Apollo to our GraphQL API server built with Node.JS and Express
- Consume the GraphQL API from our Angular component using Angular Apollo service


## Do You Need to Learn how to Build a GraphQL API?

As far as Angular is concerned, you only need to know how to consume a GraphQL API not how to build it, but if you want to take it further, you can learn how to use Node.js to build a web API with our easy-to-follow [tutorial](https://www.techiediaries.com/node-express-js-graphql-tutorial).

Angular is not a server-side framework, so it can't be used to build web APIs with GraphQL but as an Angular developer, most often than not, you would need to consume an API which may be, very well, written in GraphQL as the technology became very popular in the recent years.

As a frontend developer, you are not required to know about server-side technologies like GraphQL but will definitively help you to better communicate with the backend team/developer if you know the fundamental concepts of GraphQL.


> **Note**: GraphQL has been open-sourced and released as an open-source [specification](http://facebook.github.io/graphql/October2016/), so the GraphQL API server can be developed in any server-side programming language that you know including TypeScript (On top of Node.js).

## What is GraphQL?

GraphQL stands for Graph Query Language.

The [official website](https://graphql.org/) defines GraphQL as:

> A query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

So, GraphQL is a [query language](https://en.wikipedia.org/wiki/Query_language) (In the same sense as SQL is a query language) but not for databases, instead it's designed for querying data over the HTTP protocol and creating an API in the same way REST is used but with more advantages.      

It's also a runtime that provides the actual mechanisms for processing the API queries and returning data and responses.

GraphQL allows you to provide a complete description of the data used in your application. As a result, clients will be able to query for the exact data that they need no less, no more. If you used REST before, you can imagine how powerful the GraphQL approach is.

GraphQL was originally created by Facebook and later open-sourced. Nowadays, more companies are using it ranging from IBM and GitHub to Twitter and PayPal. 
 
## Advantages of GraphQL

According to the official website, these are the advantages of GraphQL:

- Ask for what you need,  get exactly that.
- Get many resources in a single request.
- Describe what’s possible with a type system.
- Move faster with powerful developer tools like [Graph_i_QL](https://github.com/graphql/graphiql).

Since you can describe the exact data that you need to fetch from your API server, you can send only a single HTTP request for multiple resources instead of many requests in the case of REST.

This means you'll have less network overhead and more performance.

When using REST,  things may become tedious and error-prone for complex data requirements but with GraphQL, you can have nested queries which make it easy to get related data without trying to figure out how much requests you need to send and in what order. You may even end up failing to get the desired data if a proper endpoint is not present in the backend in the case of REST but not with GraphQL.

## What is a GraphQL Schema?

A **GraphQL schema** is a fundamental concept around which you can build your API.  

The first step of building a GraphQL API is the definition of the **schema**. You can consider a schema as a blueprint for all of the data that you can return in your API.

The schema describes the data types and the relationships between them. It also defines the possible queries that can be used to fetch data and what mutations can be used to create and update data.

A schema may contain types and their fields, queries, mutations, and subscriptions. a type can be either an object type or builtin scalar. 

Additional information can be added as custom  **directives**.

You need to include at most one `schema` definition
when using the type system definition language.

In this example, a GraphQL schema is defined with both query and mutation root types:

```graphql
schema {
  query: QueryRootType
  mutation: MutationRootType
}
```

### What is an SDL?

GraphQL provides its own Schema Definition Language or SDL which provides an agnostic way to define a GraphQL schema no matter what programming language is used.

### Schema-first-approach vs. Code-first-approach

You can write a GraphQL API in one of two approaches, a **schema first approach** or **code first approach**. The latter approach is more tied to a specific implementation provided by a programming language since you need to use code to define your GraphQL schema.

In a schema-first approach, we write our schema in the GraphQL SDL language and we call some methods to execute it. We then need to map resolvers (the methods that actually implement the queries and mutations) to fields. This is the leading approach in the GraphQL community.

In a schema-first approach, you write your data types, queries and mutations in the schema first then you add the implementation using resolvers.
 
This offers many benefits, for example, it allows frontend developers to start building the UI based on the schema before it's implemented by backend developers.

## GraphQL Scalar and Object Types

In GraphQL, types are en essential concept. In fact, everything in the schema is a type even queries and mutations.

>Queries, mutations, and subscriptions are called [root types](http://graphql.org/learn/schema/#the-query-and-mutation-types).

The basic elements of a GraphQL schema are object types, which define a type of object you can fetch from your API, and what fields it has. We create the object types out of the builtin scalar types.
 
GraphQL provides various built-in scalar types defined by the [specification](https://facebook.github.io/graphql/#sec-Scalars) such as:

- ID,
- String,
- Int,
- Float,
- Boolean


It also allows you to create object types for describing the structure of your data.

You can define a type using the `type` keyword:

```graphql
type Employee {
  id: ID!
  name: String
  phone: String
  address: String
  emails: [String]
}
```

`Employee` is an object type, created using the builtin scalar types. It doesn’t provide any functionality except defining the structure or shape of our employee _model_ in the application/database. 

It's composed of fields. A field has a name and a type:

```graphql
name: String
```

> **Note**: In addition to scalar types, a field can use any other type defined in the schema definition.

You can make the field **non-nullable** by adding an **exclamation mark**, as follows:

```graphql
id: ID!
```

You can define **list fields** using **square brackets** around the type:

```graphql
emails: [String]
```

To implement the API, you will need to add **fields** to the **root types** (Queries, Mutations, and Subscriptions) of the GraphQL schema. These types define the  **entry points** for the GraphQL API.

### GraphQL Enums

An  `enum`  allows you to define a type that has a predefined set of possible values. For example:

```graphql
enum Category {
  CAT1
  CAT2
}

```

### GraphQL Interfaces

An  `interface`  is comprised of a list of fields and can be implemented by a GraphQL type which must have the same fields as the implemented interface:

```graphql
interface Person {
  name: String!
}

```

You can use the `implements` keyword to implement the interface:

```graphql
type Employee implements Person {
}
```

## What is a GraphQL Query Type?

A GraphQL query is a root type that defines the shape of the queries that can be accepted by the API server. For example:

```graphql
type Query {
  empolyee(id: ID!): Employee
}
```

This root type exposes an `employee` field that takes an ID and returns an `Employee`.

> **Note**: The root types of a schema define the shape of the queries and mutations that will be permitted by the API server. This enables GraphQL to provide a concise contract for client-server communication.

## What is a GraphQL Mutation Type?

Mutations are root types that are used to create, update or delete data. They are similar to the  `PUT`,  `POST`,  `PATCH`  and  `DELETE`  operations in REST APIs.

We use the `Query`  root type to define the entry-points for operations used to fetch data and the  `Mutation` root type to add the entry points for the operations to create, update and delete data.

For example:

```graphql
type Mutation {
  addEmployee(name: String, phone: String, emails: String[], address: String): Employee
}
```

Here we add a single `addEmployee` mutation which accepts the `name`, `phone`, `emails` and `address`  arguments (also called **input types**) and returns the created `Employee` object.

## What is a GraphQL Resolver?

When you build GraphQL APIs, the process is centered around the `schema`. The process is generally as follows:

-   You create the schema definition,
-   And you implement the actual operations using the resolver functions.

GraphQL makes a separation between the  **structure** and **behaviour**.

The structure is defined with the schema. You then need to write an implementation that provides the behavior of the fields in the root types. This is done with what's called a **resolver** function which needs to be provided for each field in the root types.

A question that arises is how to **map the resolver functions to the fields**?

This can be done in many approaches. In the code-first approach, you have objects that you can use to define fields and resolvers in the same place. See [`graphene-js`](https://github.com/graphql-js/graphene) or [express-graphql](https://github.com/graphql/express-graphql) for JavaScript. 

In the schema first approach, you can't add resolvers directly in the schema, but you have various APIs (available from different packages such as `GraphQL.js` and `graph-tools`) to map the resolvers after defining your schema such as:

- Using the `buildSchema()` method which is available from the [GraphQL.js](https://github.com/graphql/graphql-js) package,
- Using the `makeExecutableSchema()` method of the [`graphql-tools`](https://github.com/apollographql/graphql-tools) package.

## Consuming a Node.js GraphQL API with Angular 8 and Apollo

Let's now see how to consume a Node.js GraphQL API built in this [tutorial]() using Angular 8 and Apollo.

### Installing Angular CLI 8

Before we can initialize our Angular project, we need to install Angular CLI. Make sure you have Node.JS and NPM installed on your development machine and open a new terminal then run the following command:

```bash
$ npm install -g @angular/cli
```

That's it, we are ready to create our Angular project and consume a GraphQL API.

### Creating an Angular 8 App

Let's start by generating our Angular 8 application. Open a new terminal and run the following command:

```bash
$ ng new angular-graphql-example
```

You'll be prompted if you would like to add routing to your project and which stylesheets format would you like to use. You can answer yes for routing and CSS for stylesheets.

Next, navigate to your project's folder and serve your app using the following commands:

```bash
$ cd angular-graphql-example
$ ng serve
```

Your application will be available from `http://localhost:4200`.


## Creating an Angular Component for Displaying GraphQL API Data


We'll be consuming a Node.js GraphQL API for an employees database, so we don't need many components in our application. We already have the App component which we can use for displaying our GraphQL API data, but let's create a component and add a route for it in the router configuration for best practices. Open a new terminal anf run the following commands:

```bash
$ cd angular-graphql-example
$ ng generate component employees
```

Next, open the `src/app/app-routing.module.ts` file and add a route for the employees component to the router configuration:

```ts
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent
  }
]
```

We can now access the component from the `http://localhost:4200/employees` path.

## Installing Apollo for Angular 8

We'll be making use of Apollo with Angular 8 to consume the GraphQL API, so we'll need to run the following command for setting up Apollo in our project:

```bash
$ ng add apollo-angular
```

[apollo-angular](https://github.com/apollographql/apollo-angular) enables you to fetch data from your GraphQL server and use it for building complex and reactive UIs using the Angular framework. Apollo Angular may be used in any context that Angular may be used. 


## Connecting Angular Apollo to our GraphQL API server

Now, we can connect our Angular components with the GraphQL server for consuming data. Open the `src/app/graphql.module.ts` file and update the `uri` variable with your GraphQL URL as follows:

```ts
const uri = 'https://repl.it/@techiediaries/Node-GraphQL-Example/graphql'; // <-- add the URL of the GraphQL server here
```

That's all what we need to connect our Angular 8 application with our Node.js GraphQL server.

## Consuming GraphQL APIs with Angular Apollo Service

Let's proceed to consuming the GraphQL API using the Apollo service. Open the `src/app/employees/employees.component.ts` file and add the following imports:

```ts
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
```

Next, before the component definition, add the following GraphQL query:

```ts
const EMPLOYEES_QUERY = gql`
  query {
    employees {
        id,
        name,
        email,
        phone,
        address
    }
  }
`;
```

The `gql` tag allows you to create a GraphQL query object from a template string.

Next, update the component as follows to send a GraphQL query when the component is initialized:

```ts
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  
  employees: any[] = [];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: EMPLOYEES_QUERY,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.employees = result.data && result.data.employees;
    });
  }

}
```

In the `ngOnInit()` method we call the `apollo.watchQuery()` method to initialize data fetching. Next, we subscribe to any data changes using the `valueChanges.subscribe()` method and we set the `employees` array with the data consumed from the GraphQL server.

## Conclusion

In this tutorial, we've introduced you to the fundamental GraphQL concepts such as:
- Schemas, 
- Scalar and object types, 
- Queries, mutations, and subscriptions,
- Resolvers.

We have seen the difference between the schema first approach and code first approach for creating GraphQL APIs. How you can make an executable schema  using methods like `buildSchema()` and `makeExecutableSchema()` from the `GraphQL.js` and `graph-tools` packages.

Next, we have created a GraphQL client application with Angular 8 and Apollo for consuming a GraphQL API server built with Node.JS and Express. 
