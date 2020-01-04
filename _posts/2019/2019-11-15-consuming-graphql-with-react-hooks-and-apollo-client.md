---
layout: post
title: "Consuming GraphQL APIs with React Hooks (useQuery) & Apollo Client"
image: "images/content/react.png"
excerpt: "Throughout this tutorial, we'll see by example how to consume and fetch a GraphQL API with React Hooks and Apollo Client" 
tags : [react, graphql] 
---

Throughout this tutorial, we'll see by example how to consume and fetch a GraphQL API with React Hooks and [Apollo Client](https://www.apollographql.com/).

We'll particularly see how to use the `useQuery` hook to send GraphQL queries to the server and the `gql` tag to write GraphQL queries.

The GraphQL API is hosted in this [link](https://graphql-pokemon.now.sh/) and provides information about Pokémons.

These are the steps of this tutorial:

- Step 1 - Setup 
- Step 2 - Initializing a New React Project
- Step 3 - Setting up The Apollo Client 
- Step 4 - Initializing the Apollo Client with The In-Memory Cache and HTTP Link
- Step 5 - Linking the Apollo Client to React Component(s)
- Step 6 - Sending GraphQL Queries & Consuming the API
- Step 7 - Building the React Application


Before we can start, we'll need to have a few things.

## Requirements

if you want to follow this tutorial step by step, you will need to have the following requirements

- Node.JS and NPM installed on your development machine,
- Familiarity with modern JavaScript/ES6+,
- Working experience of React. 

You can easily get the binaries of Node and NPM from the [official website](https://nodejs.org/en/download/) or better yet use [NVM](https://github.com/nvm-sh/nvm), a POSIX-compliant bash script to install and manage multiple active versions of Node.

## Step 1 - Setup 

Let's get started with the first step where we'll set up `create-react-app`, the official tool for quickly creating and working with React projects.

Open a new command-line interface and execute the following command:

```bash
$ npm install -g create-react-app
```

> **Note:** In case you get any EACCESS errors when installing the package globally on your system. make sure to add `sudo` before your command in Linux and macOS, or use a command prompt with administrator access in Windows. You can also just fix your [npm permissions](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally). 


When writing this tutorial **create-react-app v3.1.1** was installed.


## Step 2 - Initializing a New React Project

In the second step, we'll initialize a new React project.


Head over to your command-line interface and execute the following command:

```bash
$ create-react-app react-graphql-example
```

Next, run the local development server using the following commands:

```bash
$ cd react-graphql-example
$ npm start
```

The development server will be running from the `http://localhost:3000` address.

This is a screenshot of the React application in a web browser: 

![React GraphQL Example](https://www.diigo.com/file/image/rscqpoqzocdeperodzdsodqdbs/React+App.jpg?k=44aa45f1b25ab934e8566dba04800718)


## Step 3 - Setting up The Apollo Client 

In this step, we'll set up the Apollo client.

Apollo Client is a data management solution designed for GraphQL. 

Apollo provides intelligent caching that enables it to be a single source of truth for the local and remote data in your application.

These are the required libraries for setting up Apollo:

- [graphql](https://www.npmjs.com/package/graphql): The GraphQL implementation in JavaScrip,
- [apollo-client](https://www.npmjs.com/package/apollo-client): A GraphQL client that supports  React and other libraries,
- [apollo-cache-inmemory](https://www.npmjs.com/package/apollo-cache-inmemory): A cache implementation for Apollo Client,
- [apollo-link-http](https://www.npmjs.com/package/apollo-link-http): The most common Apollo Link, a system of modular components for GraphQL networking.
- [react-apollo](https://www.npmjs.com/package/react-apollo): This library provides the integrations for Apollo in React, 
- [graphql-tag](https://www.npmjs.com/package/graphql-tag): This library exports multiple utilities for working with GraphQL queries.


Head over to a new command-line interface and install the mentionned libraries using the following commands:

```bash
$ npm install graphql --save 
$ npm install graphql-tag --save

$ npm install apollo-client --save 
$ npm install apollo-link-http --save 
$ npm install apollo-cache-inmemory --save 

$ npm install react-apollo --save 
```


## Step 4 - Initializing the Apollo Client with The In-Memory Cache and HTTP Link

In this step, we'll initialize the Apollo client.

Go to the `src/index.js` file in your React project and start by adding the following imports:

```js
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
```

We simply import the Apollo client, in-memory cache and HTTP link libraries.

Next, initialize both the in-memory cache and the HTTP link as follows

```js
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://graphql-pokemon.now.sh/'
})
```

We provide the URI of our GraphQL API to the HTTP link via the `uri` parameter. This library is responsible for networking.

Finally, initialize the Apollo client as follows:

```js
const client = new ApolloClient({
  cache,
  link
})
```

We simply create an instance of `ApolloClient` and we pass the cache and link objects we previously created.


## Step 5 - Linking the Apollo Client to React Component(s)

In this step, we'll link the Apollo Client, we created in the previous step, with our React component(s) using the new Apollo's hooks which allows us to easily make GraphQL operations from the UI.

Head back to the `src/index.js` file in your React project and start by importing `ApolloProvider` as follows:  

```js
import { ApolloProvider } from '@apollo/react-hooks';
```

Next, wrap the `App` component with `ApolloProvider` as follows:

```js
/* [...] */
ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
```


## Step 6 - Sending GraphQL Queries & Consuming the API

In this step, we'll see how to send GraphQL queries to consume the API.

Head to the `src/App.js` file in your React project and add the following imports:

```js
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
```

The `useQuery` hook allows you to send a GraphQL query to the server while the `gql` tag enables you to write multi-line GraphQL queries.

The `useQuery` hook exposes the error, loading and data properties from a result object.

Next, add the following example GraphQL query in the `src/App.js` file:

```js
const EXAMPLE_QUERY = gql`
{
    pokemons(first: 90) {
      id
      number
      name,
      image
    }
  }
```

This query will allow you to get the first 90 pokémons with their id, number, name, and image.

Next, execute the GraphQL query using the `useQuery` hook as follows:  

```js
function App() {
  const { data, loading, error } = useQuery(EXAMPLE_QUERY);

  if (loading) return <p>Still loading..</p>;
  if (error) return <p>There is an error!</p>;
```

We simply destructure the object returned from the `useQuery()` hook to get the data, loading and error attributes.

When `loading` equas `true` i.e when data is still being received, the `App` component will render **Still loading..**.

If there is an error the component will render **There is an error!**.

Otherwise we'll have our data in the data variable which we can render as follows:

```js
  return (
    <React.Fragment>
      <div className="container">

        {data && data.pokemons &&
          data.pokemons.map((pokemon, index) => (

            <div key={index}>

              <img src={pokemon.image} />
              <div>
                <h3>{pokemon.name}</h3>
                
              </div>
            </div>

          ))}
      </div>
    </React.Fragment>
  );
```



## Step 7 - Building the React Application

In this step, we'll see how to build your application.

Head over to your command-line interface and run the followng command:

```bash
$ npm run build
```

This command will output an optimized production-ready bundle in the `build` folder of your React project that you can upload to your hosting server.


## Conclusion

In this step by step tutorial, we've seen how to consume a GraphQL API in a React example application using the Apollo client and React hooks.
