---
layout: post
title: 
date: 2020-01-20 02:26
category: 
author: 
tags: []
summary: 
---


Rails version 6 is out! One of the most exciting things about the newest release of Rails is the treatment of JavaScript as a first-class citizen. Webpacker is now bundled by default with every new project bootstrapped with the Rails CLI, along with support for using Angular, React or Vue. I personally am a big fan of React, and wanted to test how easy it would be to setup a new Rails project with support for React right out of the box. Let’s get started building a simple app!

First, you’ll want to make sure you update to Rails 6. You’ll need to have Ruby 2.5 or greater installed: type  `ruby -v`  in your shell to see what version you are working with. I recommend using  [RVM](https://rvm.io/)  for managing multiple installations. If needed, you can install a specific version by running the command  `rvm install 2.6.3`. Next, update the Rails CLI:  `gem update rails`. Now, when you type  `rails -v`, you should see something like  `Rails 6.0.0`.

Great! Let’s create our app:

rails new PROJECT_NAME -BT --webpack=react

Here, I am telling Rails to skip setting up the testing framework, to skip bundling, and to install dependencies for React. The next thing we will want to do is add the  `react-rails`  gem, which incorporates a generator for React components into the list of available Rails tasks as well as allowing us to do server-side rendering with React. Let’s add this gem and do an initial git commit:

bundle add react-rails  
git add . && git commit -m "initial commit"

At the terminal, if you now type  `rails g --help`, you should see two new commands available:  `react:install`  and  `react:component`. Let’s run the install command now, which will add some additional files to our Rails project:

rails g react:install

That completes the setup for all of the tooling! If you want to take a peek at  `package.json`  in your project root directory, you will see all of the necessary React dependencies like Babel and Webpack are being required. Additionally, the install command that we just ran added a few lines of code to  `app/javascript/packs/application.js`.

At this point, I am going to create a database model with some bogus data to display inside of a React component. Let’s create a  `users`  resource:

rails g resource User f_name:string l_name:string

And in  `db/seeds.rb`  (using the Faker gem):

require 'faker'ActiveRecord::Base.connection.tables.each do |t|  
  ActiveRecord::Base.connection.reset_pk_sequence!(t)  
end25.times do  
  first_name = Faker::Name.first_name  
  last_name = Faker::Name.last_name User.create(f_name: first_name, l_name: last_name)  
end

You’ll need to run  `rails db:migrate && rails db:seed`  to run the migration for the  `users`  table and seed the data. Now, let’s create a component using the generator:

rails g react:component Users users:array

By specifying  `users:array`  we are stating that the component should expect a prop called  `users`  which is an array. If you take a peek in the file that has been generated, you should see this set up in the prop types.

Set up the component to look as follows:

class Users extends React.Component {  
  render() {  
    return (  
      <div>  
        <h1>All Users</h1>  
        <ul>  
          {this.props.users.map(user => (  
            <li key={user.id}>{`${user.f_name} ${user.l_name}`}</li>  
          ))}  
        </ul>  
      </div>  
    );  
  }  
}

Let’s set up the controller action in  `users_controller.rb`:

class UsersController < ApplicationController  
  def index  
    @users = User.all  
    render component: 'Users', props: { users: @users }  
  end  
end

If you now run  `rails s`  and navigate to  `[http://localhost:3000/users](http://localhost:3000/users)`  in your browser, you should see our component with all of the user names displayed! 🎉 Congratulations, you’ve just done your first server-side rendering in Rails 6 with React!
