---
layout: post
title: "React Apollo Hooks & Testing: useQuery with refetch and MockedProvider example"
image: "images/content/react.png"
excerpt: "In this example, we'll see how to use the new useQuery hook available from the apollo react-hooks package to send GraphQL queries and receive response with fetched data from APIs. We'll also see how to test a React component that makes use of Apollo React hooks using MockedProvider available from @apollo/react-testing" 
tags : [react, graphql] 
---

In this example, we'll see how to use the new `useQuery` hook available from the apollo react-hooks package to send GraphQL queries and receive response with fetched data from APIs.

We'll also see how to test a React component that makes use of Apollo React hooks using `MockedProvider` available from `@apollo/react-testing`

The Apollo client provides two ways to send GraphQL queries:

- Using the query method,
- Using the `useQuery` React hook 

The `useQuery` React hook allows you to pass a GraphQL query and will take care of [fetching the data](https://www.techiediaries.com/react-axios/).
 automatically.

Please note that the useQuery hook is not a built-in React hook such as `useState` or `useEffect` hooks but a custom hook provided by the `@apollo/react-hooks package`   

We assume that you already have a React application ready. Let's also assume it's called `react-app`.

Navigate inside the project's folder and install the following libraries:

```bash
$ npm install graphql --save 
$ npm install graphql-tag --save

$ npm install apollo-client --save 
$ npm install apollo-link-http --save 
$ npm install apollo-cache-inmemory --save 

$ npm install react-apollo --save
```

Next, open the `src/index.js` file and add the following code to set up Apollo and connect it to your component(s) as follows:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://graphql-pokemon.now.sh/'
})

const client = new ApolloClient({
  cache,
  link
})


ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
```

Next, you can send GraphQL queries as follows:

```js
import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";


export const QUERY = gql`
{
    pokemons(first: 150) {
      id
      number
      name
    }
  }
`
function App() {
  const { data, loading, error, refetch } = useQuery(QUERY);

  if (loading) return <p>Loading data...</p>;
  if (error) return (
    <React.Fragment>
      <p>Oops, error! </p> 
      <button onClick={() => refetch()}>Please try again!</button>
    </React.Fragment>
  );

  console.log(data);

  return (
    <React.Fragment>
      <h1>
        React Apollo useQuery Example
  
      </h1>

      <div className="container">

        {data && data.pokemons &&
          data.pokemons.map((item, index) => (

            <div key={index}>
              <p>
                {item.name}
              </p>
            </div>

          ))}
      </div>
    </React.Fragment>
  );
}

export default App;
```

Let's explain the code! We first import the `useQuery` hook and `gql` tag (which parses a string into a GraphQL query).

Next, we defined a constant called `QUERY` which holds our GraphQL query.

Next, inside the `App` component, we call the `useQuery` hook with our example query which will take care of sending the query to the API and return a result object that has data and other information about the response.

Next, we destructure the result object into `data`, `error`, `loading` and `refetch` properties.

`refetch` is a function that can be used to re-send the GraphQL query in case of error.


Finally we do some conditional rendering depending on the values of the `error` and `loading` variables.

If data is done loading, we iterate over the `data` variable using the JavaScript `map()` method and display the name of each item.

When you call the useQuery React hook, Apollo returns the data along with other properties. Most importantly:

- loading: A boolean that tells if the request is still not done. If loading equals true, then the request is not yet finished. 
- error: It has information about what went wrong with your query if there is an error.
- data: An object that contains the result of the GraphQL query returned from the API server.

## Testing the Component 

Now how to test a React component that makes use of the `useQuery` hook?

We can use `MockedProvider` available from the `@apollo/react-testing` package as follows. 

Open the `src/App.test.js` file and update as follows:

```js
import { MockedProvider } from '@apollo/react-testing';
import { act, render } from '@testing-library/react';
import React from 'react';

import App, { QUERY } from './App';

const MOCKS = [
  {
    request: {
      query: QUERY,
    },
    result: {
      data: {
        pokemons: [
          {
            id: 1,
            number: 1
            name: 'Pikatchu'
          }],
      },
    },
  },
];

async function wait(ms = 0) {
  await act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}

it('renders', async () => {
  const { container } = render(
    <MockedProvider addTypename={false} mocks={MOCKS}>
      <App />
    </MockedProvider>
  );
  expect(container.textContent).toBe('Loading data...');

  await wait();

  expect(container.textContent).toMatch('React Apollo useQuery Example');
  expect(container.textContent).toMatch('Pikatchu');
});
```

## Conclusion

In this quick example, we've learned about the Apollo React useQuery hook and seen how to refetch data and how to test a React component that makes use of Apollo React hooks using the MockedProvider and [React Testing Library](https://github.com/testing-library/react-testing-library) 
