---
layout: post
title: "React Routing Tutorial: Using React Router 4"
image: "images/content/react.jpg"
author: sebastian
excerpt: "In this tutorial, you will learn about routing in React using React Router 4."
tags : react 
---


In this tutorial, you will learn about routing in React using React Router 4. 

Routing is essential to most web applications. You cannot cover all of the features of your application in just one page. It would be overloaded, and your user would find it difficult to understand. 

Sharing links to pictures, profiles, or posts is also very important for a social network such as Graphbook. One advantageous feature, for example, is being able to send links to specific profiles. This requires each profile to have its own URL and page. Otherwise, it will not be possible to share a direct link to a single item of your application. It is also crucial to split content into different pages, due to **search engine optimization** (**SEO**).

At the moment, we render our complete application to HTML in the browser, based on the authentication status. Only the server implements a simple routing functionality. 

Carrying out client-side routing can save a lot of work and time for the user, if the router merely swaps out the correct parts in React, instead of reloading the page completely when following a link. 

It is vital that the application makes use of the HTML5 history implementation so that it handles the history of the browser. Importantly, this should also work for navigation in different directions. We should be able to go forward and backward with the arrow navigation buttons in the browser, without the need to re-render the application. No unnecessary page reloads should happen with this solution.

Common routing libraries that you may know about, such as Angular, Ember, or Ruby on Rails, use static routing. **Static routing** means that you configure your routing flow and the components to render upfront. Your application then processes the routing table in a separate step, renders the required components, and presents the results to the user.

With version 4 of React Router, which we’ll use, **dynamic routing** was introduced. The unique thing about it is that the routing takes place while the rendering of your application is running. It doesn't require the application to first process a configuration, in order to show the correct components. This approach fits with React's workflow well. The routing happens directly in your application, not in a preprocessed configuration.


## Installing React Router

To install React Router, simply run npm:


    $ npm install --save react-router-dom

From the package name, you might assume that this is not the main package for React. The reason for this is that React Router is a multi-package library. This comes in handy when using the same tool for multiple platforms. The core package is called react-router.

There are two further packages. The first one is the react-router-dom package, which we installed in the preceding code, and the second one is the react-router-native package. If at some point, you plan to build a React Native app, you can use the same routing, instead of using the browser's DOM for a real mobile app.

The first step that we will take introduces a simple router to get our current application working, including different paths for all of the screens. The routes that we are going to add are as follows:


- Our posts feed, chats, and the top bar, including the search box, should be accessible under the `/app` route of our application. The path is self-explanatory, but you could also use the `/` root as the main path.
- The login and signup forms should have a separate path, which will be accessible under the root `/` path. 
- We also have to handle a situation in which none of the preceding routes match. In that case, we could display a so-called 404 page, but instead, we are going to redirect to the root path directly.

There is one thing that we have to prepare before continuing. For development, we’ll use the webpack development server. To get the routing working out of the box, we will add two parameters to the `webpack.client.config.js` file. The devServer field should look as follows:


    devServer: {
      port: 3000,
      open: true,
      historyApiFallback: true,
    },

The `historyApiFallback` field tells the devServer to serve the `index.html` file, not only for the root path, http://localhost:3000/, but also when it would typically receive a 404 error (such as for paths like http://localhost:3000/app). This happens when the path does not match a file or folder that is normal when implementing routing.
The output field at the top of the config file must have a `publicPath` property:


    output: {
      path: path.join(__dirname, buildDirectory),
      filename: 'bundle.js',
      publicPath: '/',
    },

The `publicPath` property tells webpack to prefix the bundle URL to an absolute path, instead of a relative path. When this property is not included, the browser cannot download the bundle when visiting the sub-directories of our application, as we are implementing client-side routing. 

Let's begin with the first path, and bind the central part of our application, including the news feed, to the `/app` path.


## Implementing your first route

Before implementing the routing, we’ll clean up the `App.js` file. Create a `Main.js` file next to the `App.js` file in the client folder. Insert the following code:


    import React, { Component } from 'react';
    import Feed from './Feed';
    import Chats from './Chats';
    import Bar from './components/bar';
    import CurrentUserQuery from './components/queries/currentUser';
     
    export default class Main extends Component {
      render() {
        return (
          <CurrentUserQuery>
            <Bar changeLoginState={this.props.changeLoginState}/>
            <Feed />
            <Chats />
          </CurrentUserQuery>
        );
      }
    }

As you might have noticed, the preceding code is pretty much the same as the logged in condition inside the `App.js` file. The only change is that the `changeLoginState` function is taken from the properties, and is not directly a method of the component itself. This is because we split this part out of the `App.js` and put it into a separate file. This improves reusability for other components that we are going to implement.

Now, open and replace the `render` method of the `App` component to reflect those changes, as follows:


    render() {
      return (
        <div>
          <Helmet>
            <title>Graphbook - Feed</title>
            <meta name="description" content="Newsfeed of all your friends   
             on Graphbook" />
          </Helmet>
          <Router loggedIn={this.state.loggedIn} changeLoginState=
           {this.changeLoginState}/>
        </div>
      )
    }

If you compare the preceding method with the old one, you can see that we have inserted a `Router` component, instead of directly rendering either the posts feed or the login form. The original components of the `App.js` file are now in the previously created `Main.js` file. Here, we pass the `loggedIn` [state](https://www.techiediaries.com/react-setstate) variable and the `changeLoginState` function to the `Router` component. 

Remove the dependencies at the top, such as the `Chats` and `Feed` components, because we won't use them anymore thanks to the new `Main` component. Add the following line to the dependencies of our `App.js` file:


    import Router from './router';

To get this code working, we have to implement our custom `Router` component first. 

Generally, it is easy to get the routing running with React Router, and you are not required to separate the routing functionality into a separate file, but, that makes it more readable. To do this, create a new `router.js` file in the client folder, next to the `App.js` file, with the following content:


    import React, { Component } from 'react';
    import LoginRegisterForm from './components/loginregister';
    import Main from './Main';
    import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
     
    export default class Routing extends Component {
      render() {
        return (
          <Router>
            <Switch>
              <Route path="/app" component={() => <Main changeLoginState=
              {this.props.changeLoginState}/>}/>
            </Switch>
          </Router>
        )
      }
    }

At the top, we import all dependencies. They include the new `Main` component and the `react-router` package. The following is a quick explanation of all components that we are importing from the React Router package:


- `BrowserRouter` (or Router, for short, as we called it here) is the component that keeps the URL in the address bar in sync with the UI; it handles all of the routing logic.
- The `Switch` component forces the first matching `Route` or `Redirect` to be rendered. We need it to stop re-rendering the UI if the user is already in the location to which a redirect is trying to navigate. I generally recommend that you use the `Switch` component, as it catches unforeseeable routing errors.
- Route is the component that tries to match the given path to the URL of the browser. If this is the case, the component property is rendered. You can see in the preceding code snippet that we are not setting the `Main` component directly as a parameter; instead, we return it from a stateless function. This is required because the component property of a `Route` only accepts functions and not a component object. This solution allows us to pass the `changeLoginState` function to the `Main` component.
- `Redirect` navigates the browser to a given location. The component receives a property called to, filled by a path starting with a `/`. We are going to use this component in the next section.

The problem with the preceding code is that we are only listening for one route, which is `/app`. If you are not logged in, there will be many errors that are not covered. The best thing to do would be to redirect the user to the root path, where they can log in.


## Secured routes

**Secured routes** represent specific paths that are authenticated or have the correct authorization.

The recommended solution to implement secure routes in React Router version 4 is to write a small, stateless function that conditionally renders either a Redirect component or the component specified on the route that requires an authenticated user. We extract the component property of the route into the Component variable, which is a renderable React object. Insert the following code into the `router.js` file:


    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        rest.loggedIn === true
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/',
            }} />
      )} />
    )

We call the stateless function `PrivateRoute`. It returns a standard Route component, which receives all of the properties initially given to the `PrivateRoute` function. To pass all properties, we use a destructuring assignment with the .`..rest` syntax. Using the syntax inside of curly braces on a React component passes all fields of the rest object as properties to the component. The Route component is only rendered if the given path is matched.

Furthermore, the rendered component is dependent on the user's loggedIn state variable, which we have to pass. If the user is logged in, we render the Component without any problems. Otherwise, we redirect the user to the root path of our application using the Redirect component.

Use the new `PrivateRoute` component in the `render` method of the `Router` and replace the old `Route`, as follows:


    <PrivateRoute path="/app" component={() => <Main changeLoginState=
     {this.props.changeLoginState}/>} loggedIn={this.props.loggedIn}/>

Notice that we pass the `loggedIn` property by taking the value from the properties of the Router itself. 

It initially receives the `loggedIn` property from the `App` component that we edited previously. The great thing is that the `loggedIn` variable can be updated from the parent `App` component at any time. 

This means that the `Redirect` component is rendered and the user is automatically navigated to the login form (if the user logs out, for example). We do not have to write separate logic to implement this functionality.

However, we have now created a new problem. We redirect from `/app` to `/` if the user is not logged in, but we do not have any routes set up for the initial '/' path. It makes sense for this path to either show the login form or to redirect the user to `/app` if the user is logged in. 

The pattern for the new component is the same as the preceding code for the `PrivateRoute` component but in the opposite direction. Add the new `LoginRoute` component to the `router.js` file, as follows:


    const LoginRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        rest.loggedIn === false
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/app',
            }} />
      )} />
    )

The preceding condition is inverted to render the original component. If the user is not logged in, the login form is rendered. Otherwise, they will be redirected to the posts feed. Add the new path to the router, as follows:


    <LoginRoute exact path="/" component={() => <LoginRegisterForm changeLoginState={this.props.changeLoginState}/>} loggedIn={this.props.loggedIn}
    />

The code looks the same as the `PrivateRoute` component, except that we now have a new property, called `exact`. If we pass this property to a route, the browser's location has to match one hundred percent. The following table shows a quick example, taken from the official React Router documentation:

| Router path | Browser path | exact | matches |
| ----------- | ------------ | ----- | ------- |
| /one        | /one/two     | true  | no      |
| /one        | /one/two     | false | yes     |


For the root path, we set `exact` to `true`, because otherwise, the path matches with any browser's location where a `/` is included, as you can see in the preceding table.

There are many more configuration options that React Router offers, such as enforcing trailing slashes, case sensitivity, and much more. 

You can find all of the options and examples in the official documentation at [https://reacttraining.com/react-router/web/api/](https://reacttraining.com/react-router/web/api/).


## Catch-all routes in React Router

Currently, we have two paths set up, which are `/app` and `/`. If a user visits a non-existent path, such as `/test`, they will see an empty screen. The solution is to implement a route that matches any path. For simplicity, we redirect the user to the root of our application, but you could easily replace the redirection with a typical 404 page.

Add the following code to the `router.js` file:


    class NotFound extends Component {
      render() {
        return (
          <Redirect to="/"/> );
      }
    }

The NotFound component is minimal. It just redirects the user to the root path. Add the next Route component to the `Switch` in the `Router`. Ensure that it is the last one on the list:


    <Route component={NotFound} />

As you can see, we are rendering a simple Route in the preceding code. What makes the route special is that we are not passing a path property with it. By default, the path is completely ignored and the component is rendered every time, except if there is a match with a previous component. 

That is why we added the route to the bottom of the Router. When no route matches, we redirect the user to the login screen in the root path, or, if the user is already logged in, we redirect them to a different screen using the routing logic of the root path. Our `LoginRoute` component handles this last case.

You can test all changes when starting the front end with npm run client and the back end with npm run server. We have now moved the current state of our application from a standard, single-route application to an application that differentiates the login form and the news feed based on the location of the browser.

*If you found this article interesting, you can explore* [*Hands-On Full-Stack Web Development with GraphQL and React*](https://www.amazon.com/Hands-Full-Stack-Development-GraphQL-React/dp/1789134528?utm_source=techiediaries&utm_medium=referral&utm_campaign=ThirdPartyPromotions) *to unearth the power of GraphQL, React, Apollo, Node, and Express for building a scalable, production-ready application.* [*Hands-On Full-Stack Web Development with GraphQL and React*](https://www.packtpub.com/web-development/hands-full-stack-web-development-graphql-and-react?utm_source=techiediaries&utm_medium=referral&utm_campaign=ThirdPartyPromotions) ***will guide you in implementing applications by using React, Apollo, Node.js and SQL.* 
