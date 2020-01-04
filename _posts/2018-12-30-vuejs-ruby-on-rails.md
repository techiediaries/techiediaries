---
layout: post
title: "Using Vue.js with Ruby on Rails 5.2 Application"
image: "images/content/vue.png"
excerpt: "In this tutorial you'll be learning how to use Vue.js in your Ruby on Rails web application" 
tags : [rails , vue]
---


Vue is a progressive JavaScript library for building user interfaces inspired by both Angular and React. You can use Vue.js with Ruby on Rails to build full-stack web applications using different approaches, such as:

- Using separate front-end (Vue.js) and back-end apps (Ruby on Rails),
- Including Vue.js in Ruby on Rails views 

In this tutorial, we'll see how to use Vue.js in your Rails application without creating a separate back-end. This is useful if you want to use Vue.js instead of plain JS or jQuery.

## Creating a Ruby on Rails Project

Let's start by creating a new Ruby on Rails project using the following command:

```bash
$ rails new vuerailsdemo --skip-turbolinks --webpack=vue
```

The `--webpack=vue` option tells Rais to use Webpack for managing assets. 

You need to put your JavaScript code in the `app/javascript/packs` folder. 

### Creating a Controller & View

Now let's proceed by creating a Rails controller and view using the following command:

```bash
$ rails generate controller Main index
```

Next, let's make the `index` action as the root of your Rails application. Open the `config/routes.rb` file and add:

```ruby
root 'main#index'

```

#### Hello Vue

Create a `app/javascript/packs/vueapp.js` file and add the following code to create a Vue instance:

```javascript
import Vue from 'vue/dist/vue.esm'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    },
    methods: {}
  });
});
```

The Vue instance takes a bunch of properties such as `el` used to specify the selector of the DOM element here to attach the instance, `data` used for adding any data required by the Vue instance and methods for adding any methods you need to use.

Next, open the `app/views/main/index.html.erb` file,  and add a `<div>` with the `#app` id

```erb
<h1>Rails & Vue.js App</h1>

<div id="app">
  {{ message }}
</div>

```

We use the parentheses to display the content of the message variable of the Vue instance in our template.

Next, you need to include the `app/javascript/packs/vueapp.js` file in the `application.html.erb` file. Open the `app/views/layouts/application.html.erb` file and use the `javascript_pack_tag` tag to include the JS file  inside `<head>`.

```erb
<%= javascript_pack_tag 'vueapp' %>

```

That's all you need to include Vue.js in your Rails view.

## Serving your Ruby on Rails Application

Head back to your terminal and run the following command to serve your Rails web application:

```bash
$ rails s
```

Now, navigate to the `http://localhost:3000` address with your web browser to see your app up and running.


You can see from this simple example how easy it is to use Vue.js within your Rails application. Rails 5.1+ added support for Webpack which you can use to include modern JavaScript frameworks and libraries like Vue.js or React.
