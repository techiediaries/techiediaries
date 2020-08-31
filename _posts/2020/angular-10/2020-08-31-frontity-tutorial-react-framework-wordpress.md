---
layout: bpost
title: "Frontity Tutorial: The React framework for WordPress"
image: "images/content/blazor.png"
excerpt: "In this tutorial, we'll learn about Frontity, The React framework for WordPress"
date: 2020-08-31
tags : [javascript , react, wordpress]
---

In this tutorial, we'll learn about Frontity, The React framework for WordPress.

WordPress is the most popular content management system built on top of PHP while React is the most front-end library for building user interfaces. Combining these two tools will allow you to build amazing modern apps.

You can also migrate your WordPress apps to use a modern React front-end and keep using the WordPress as a content management system while modernizing your apps with the latest technologies in the web today. 

## Use Frontity for Building WordPress/React Apps

Let's learn about Frontity, a tool that allows you to create websites using WordPress and React in the easiest way.

According to the [official website](https://frontity.org/):

>Frontity is the easiest way to create lightning fast websites using WordPress and React. Open source and free to use.

## How Frontity Works

When using WordPress and React, WordPress works as a headless CMS – just for creating and managing your content thanks to the WordPress REST-API which enables you to retrieve your content from the JavaScript/React interface.

Frontity apps built with React serve your content and run separately on a Node.js server.

Frontity connects seamlessly with WordPress so you can focus on building your website or blog. You don't need to deal with complex configuration.

## Using Frontity by Example

Let's now see how to use Frontity by example. First, as a prerequisite, you need to have [Node.js](https://nodejs.org/en/download/) installed on your local development machine.


You can run frontity using the `npx` command as follows:

```bash
$ npx frontity create wpreactapp
```

Wait for the command to install the dependencies and generate your app then run the following commands to start a local development server:

```bash
$ cd wpreactapp
$ npx frontity dev
```

Thanks to Frontity, you’ll be able to connect your React app to WordPress REST API, style, and deploy your app in no time with bundling and server-side rendering for boosting performance and SEO purposes!

## Configuring your Frontity App

You can configure your Frontity app in the `frontity.settings.js` file.

For example, you can simply set the `state.source.api` attribute to the URL of your WordPress REST API to connect your CMS content and get all your posts.


You can configure routing, navigation, packages, and head tags, etc. You can find more options in the [docs](https://docs.frontity.org/learning-frontity/setting).


## Connecting WordPress REST API to your Frontity App

You can easily connect your WordPress REST API URL to Frontity which works  both with `WordPress.org` and `WordPress.com` websites.


Simply open and add your WordPress REST endpoint to `state.source.api` attribute as follows:

```json
//frontity.settings.js

export const settings = {
  packages: [
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          api: "https://frontity.org/wp-json"
        },
      },
    }
  ],
};
```


Learn more about [connecting WordPress](https://docs.frontity.org/getting-started/connecting-to-wordpress).

## Styling your Frontity Theme with CSS-in-JS

After connecting your WordPress REST API, you'll want to customize your UI using CSS in JS which is is a popular approach among React developers.

These are the available options for styling your app.

### Styling with Styled

```js
import { styled } from "frontity";

const StyledDiv = styled.div`
    text-align: center;
    background: white;
`;
```

### The CSS prop

```js
import { css } from "frontity";

const Component = () => (
    <div css={css`background: red`}>
        React with WordPress App
    </div>
);
```

### React’s style prop


```js
const Page = () => (
  <div style={{
      margin: '10px',
      border: '1px solid black'
  }}>
    React with WordPress App
  </div>
);
```

Rather than using React’s style prop, you’re probably better off using the first two methods listed above.

### Using `<Global>`

You can also add global styles in the Global component as follows:

```js
import { Global, css } from "frontity";

const Page = () => (
    <>
        <Global
          styles={css`
            body {
                margin: 0;
                color: red;
            }
          `}
        />
        <OtherContent />
    </>
);
```

Check out this [live example](https://codesandbox.io/s/github/frontity/frontity-codesandbox?file=/package.json).


## Deploying your Frontity App 

After connecting your web app to WordPress and style the React UI with CSS. You'll be ready to deploy your it to any Node.js or serverless host.

Head back to your command-line interface and run the following commands:

```bash
$ npx frontity build
```

You can host the content of the `build` folder to any Node.js hosting.

See more information in the [docs](https://docs.frontity.org/deployment).

Check out the [official guide](https://docs.frontity.org/deployment/deploy-using-vercel) on how to deploy Frontity with Vercel.

Frontity recommends that you use two domains, or sub-domain: one for the WordPress backend, and a main domain for the Frontity/React frontend. 

You can also serve a production ready version of your app locally using the following command:

```bash
$ npx frontity serve
```

## Conclusion

In this tutorial, we've learned about Frontity, a tool for building modern web apps with WordPress REST API and a React front-end.

By using both the most popular CMS WordPress and the most popular front-end React library, you'll be able to take benefits from both worlds. WordPress with its easy to use content management features and modern user interfaces. 