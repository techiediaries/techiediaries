---
layout: post
title: "Vue CLI 4 Tutorial"
image: "images/content/vue.png"
excerpt: "Throughout this Vue tutorial with Django RESTful API, we are going to learn to use the Vue CLI v4 to generate our Vue front-end application" 
date: 2020-1-3
tags : [vue, vuejs] 
---

**Vue CLI 4** is the latest version of the Vue Command Line Interface. Throughout this tutorial, we are going to learn to use Vue CLI to generate our Vue front-end application.

<div id="toc_container">
<p class="toc_title">Vue CLI 4 Tutorial by Example</p>
<ul class="toc_list">
<li><a href="#Installing_Vue_CLI_4">Installing the Vue CLI v4</a></li>
<li><a href="#Create_Vue_App_CLI">Create a Vue Application with Vue CLI 4</a></li> 
<li><a href="#Serve_Vue_App_CLI_4">Serving the Vue Application with Vue CLI 4</a></li>
<li><a href="#Vue_App_Project_Anatomy">Vue Project's Anatomy</a></li>
<li><a href="#Vue_CLI_Build_Lint_Scripts">Vue CLI 4 Build and Lint Scripts</a></li>
<li><a href="#Vue_CLI_Environment_Variables">Environment Variables</a></li>
<li><a href="#Vue_CLI_Proxy">Using Proxies with Vue CLI v4</a></li> 
<li><a href="#Vue_CLI_Plugins">Adding Vue CLI Plugins</a></li>
<li><a href="#Vue_CLI_Inspect_Webpack">Inspect Your Webpack Config Without Ejecting</a></li>
<li><a href="#Conclusion">Conclusion</a></li>
</ul>
</div>

In this tutorial, we're going to see:

- How to install the latest version of Vue CLI — version 4
- How to use various features of the Vue CLI v4
- How to use the Vue CLI v3 to create a front-end 
- How to set environment variables for development and production 
- How to add a proxy to forward API calls
- How to install and add Vue CLI plugins manually etc. 

The [Vue CLI v4](https://github.com/vuejs/vue-cli) provides a new experience to developers as it allows you to easily generate new Vue projects with zero initial configuration but once your project needs more control you have the possibility to add more configuration options using plugins. Unlike **create-react-app**, you can customize your configuration without ejecting but only via Vue CLI plugins.  

[The Vue CLI](https://github.com/vuejs/vue-cli/blob/dev/docs/README.md) is a complete tooling system that provides many features, out of the box, such as:

- Interactive project scaffolding via `@vue/cli`.
- Zero configuration rapid prototyping via `@vue/cli` and `@vue/cli-service-global`.
- A runtime dependency (`@vue/cli-service`) that provides many features: It's upgradeable, built on top of webpack, has sensible defaults, configurable via in-project config file, extensible via plugins etc.
- Official plugins to support using powerful existing tools in the front-end ecosystem. So you don't need to eject webpack in order to customize your project's configuration.

## <a name="Installing_Vue_CLI_4">Installing the Vue CLI v4</a>

You can install the Vue CLI v4 from npm using the following command:

```bash
$ npm install -g @vue/cli
```

This will install the Vue CLI 4 globally on your system so depending on your *npm* configuration your may need super-user access i.e add *sudo* on debian-based systems.

Vue is using scoped packages for various packages such as the cli using the `@vue` namespace.

If you are using yarn instead of npm, you can run the following command instead:

```bash
yarn global add @vue/cli
```

## <a name="Create_Vue_App_CLI">Create a Vue Application with Vue CLI 4</a> 

Using the Vue CLI 4, you can create or generate a new Vue app by running the following command from your terminal:

```bash
$ vue create frontend 
```

You'll be asked for various features such as TypeScript support, adding the Vue Router, adding Vuex etc.

```bash
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select, <a> to t
oggle all, <i> to invert selection)
❯◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◯ Router
 ◯ Vuex
 ◯ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
```

Choose the features you need in your application and press *Enter*. Wait for application to get generated and for packages to install before you can use your newly created Vue application.

## <a name="Serve_Vue_App_CLI_4">Serving the Vue Application with Vue CLI 4</a>

After generating the new Vue application using Vue CLI v3, you can use various built-in scripts to work with the application. Navigate inside your project's root folder and run the following command in order to serve your front-end application using a local development server:

```bash
$ cd frontend
$ npm run serve
``` 
 
This is the output you are going to get:

```bash
 DONE  Compiled successfully in 2729ms                                  01:50:56

 
  App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.1.11:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```
Using your web browser, you can navigate to `http://localhost:8080/ ` to see your Vue application up and running.

![Vue CLI 4 Tutorial](https://i.imgur.com/vUv5NWz.png)


## <a name="Vue_App_Project_Anatomy">Vue Project's Anatomy</a>

The Vue front-end application generated with Vue CLI v4 has a special directory structure. Let's use the `tree` command to display this structure excluding the `node_modules` folder which contains installed packages:

```bash
tree -I "node_modules"
```  

The output is similar to the following:

```bash
.
├── babel.config.js
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.vue
    ├── assets
    │   └── logo.png
    ├── components
    │   └── HelloWorld.vue
    └── main.js
```

Let's quickly describe these files and folders:

- `babel.config.js`: Contains Babel (ES Transpiler that allows you to use modern JavaScript features which are not yet implemented on the browser ) configuration.
- `package.json`: Required for each Node.js module. It contains project's meta information and dependencies.
- `public`: This is a folder that contains public assets such as `index.html` and favicon.
- `src`: This is the folder where we are going to spend most time. It contains the source code of our Vue application
- `src/main.js`: This file contains the initialization or bootstrapping code of our application.
- `src/App.vue`: This file contains the main component of our Vue application.
- `src/assets`: It contains the static assets.
- `src/components`: It contains the components of our Vue application.

## <a name="Vue_CLI_Build_Lint_Scripts">Vue CLI 4 Build and Lint Scripts</a>

The Vue CLI v4 provides many other npm scripts (build and lint) which setups zero-configuration development and production environments with various features such as hot code or module reloading, concatenation, minification and linting etc.

If your open `package.json` of your project you'll see different available (serve, build and lint) scripts:

```json
...
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
``` 
All scripts use the `vue-cli-service` which has ready webpack configurations for development and production so you don't have to deal with Webpack when you are just starting to work with your project.

Once your Vue application is ready, you can run the build command to build a production ready version of your project:

```bash
$ cd frontend
$ npm run build
``` 

The *lint* command allows you to do code linting (static analysis for errors and bugs etc.):

```bash
$ cd frontend
$ npm run lint
``` 
 
## <a name="Vue_CLI_Environment_Variables">Environment Variables</a>

You can use environment variables with Vue CLI v4 by adding a `.env` file with the following structure:

```
VUE_APP_DEBUG=true
...
```

Your environment variable should start with `VUE_APP_`.

The Vue CLI will load your defined environment variables and make them available via `process.env`. For example, you can access the `VUE_APP_DEBUG` variable via `process.env.VUE_APP_DEBUG`.

You can also define environment variables to be available for specific environments i.e development or production by adding 	an appropriate suffix to the name of the environment file. For example:

- **`.env.development`**: For development 
- **`.env.production`**: For production

Environment variables defined in `.env` will be overridden with the same variables if they are defined in `.env.development` or `.env.production` etc.

## <a name="Vue_CLI_Proxy">Using Proxies with Vue CLI v4</a> 

Sometimes, when making API calls from your Vue front-end application, you'll need to use a proxy to proxy calls in order to avoid issues such as CORS related to Same Origin Policy enforced by web browsers. Vue CLI v4 provides a built-in feature to use a proxy.

You can configure a proxy by simply adding a **proxy** object to `package.json` file. For example:

```json
{
  "proxy": {
    "/api": "http://localhost:8000"
  }
}
```

So if you need to make API calls to Django server running at `http://localhost:8000` you simply call `http://localhost:8080/api/*` and Vue CLI will take care of forwarding the calls to `http://localhost:8000/*`.

## <a name="Vue_CLI_Plugins">Adding Vue CLI Plugins</a>

Vue CLI v4 makes use of plugins to provide different functionalities. When you choose features at the start of project initialization the Vue CLI installs and invokes the required plugins but you can also install any plugin and invoke it manually. For example, you can add the **Progressive Web App (PWA)** functionality using the following commands:

```bash
$ npm install @vue/cli-plugin-pwa
$ vue invoke pwa 
``` 
## <a name="Vue_CLI_Inspect_Webpack">Inspect Your Webpack Config Without Ejecting</a>

The Vue CLI relives you from manually dealing with Webpack configuration by providing plugins for configuring many features and dependencies. But, in many situations, you'll want to have access to the Webpack configuration file for making advanced things not available via a CLI plugin.

Aside from ejecting, the Vue CLI allows  you also to inspect the Webpack configuration to see what's the Vue CLI is generating. This will help you to make sure the generated configuration is what you're expecting. In your project generated with the Vue CLI, run the following command:

```bash
vue inspect
```

This will display the Webpack configuration in your terminal but you can write it into a file by running the following command:

```bash
vue inspect > webpack.config.js
```

You can also inspect portions of the configuration file using dots paths:

```bash
vue inspect resolveLoader.modules
```

## <a name="Conclusion">Conclusion</a>

In this tutorial, we've seen how to install the Vue CLI 4 and various features such as adding plugins, adding environment variables and proxying API calls.
