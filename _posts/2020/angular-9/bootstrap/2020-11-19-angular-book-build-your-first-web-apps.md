---
layout: bpost
title: "Full-Stack Angular 11 and GraphQL Book"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "Throughout this book, we’ll build a full-stack web application with an Angular 11 front-end and a Node.js/GraphQL back-end" 
tags : [angular, angular8, angular-books] 
---

## PART 1: Setup Development Environment, GraphQL Server and Database

In this part, we’ll learn about our app’s architecture and requirements and we’ll set up our development environment for full-stack Angular 11 development. We’ll also set up a GraphQL server with Express.js and Apollo and connect a SQL database for storing the application data using TypeORM.

### CHAPTER 1:  App Architecture and Development Environment  

Throughout this book, we’ll build a full-stack web application with an Angular 11 front-end and a Node.js back-end so in this chapter, we'll first learn about the structure and the tools we need to build the app. Next, we'll prepare our machine for Angular, MySQL and Node.js development and initialize a new project based on the latest version of Angular. Finally, we’ll introduce you to debugging with the latest Angular’s Ivy runtime which will help you view and update your application state in DevTools.

### Main Chapter Headings 

1.  The Architecture and technologies
2.  Installing MySQL
3.  Installing and configuring Node.js in our development machine
4.  Installing Angular CLI, the official tool for initializing Angular projects
5.  Initializing our Angular project
6.  Debugging Angular applications

### Skills learned

1.  Architecture and learn about the technologies to use for building a full-stack app
2.  Learn how to install MySQL
3.  Install Node.js in the local development machine
4.  Install Angular CLI in the local development machine
5.  Use Angular CLI commands
6.  Debug Angular app using the Ivy runtime

### CHAPTER 2:  Setting up GraphQL with Node.js/Express.js and Apollo  
After setting up the development environment, installing Node.js, and initializing the Angular front-end project using the CLI, we'll next need to set up a Node.js server with GraphQL support to implement the back-end. In this chapter, we'll explain how to install Express.js and configure it with TypeScript and GraphQL. We’ll add routing, static assets and cors. Finally, we'll learn how to test our GraphQL server and debug it using Postman, GraphiQL and Apollo DevTools..

### Main Chapter Headings

1.  Installing Express.js
2.  Routing and middlewares in Express.js
3.  Setting up Apollo server with Node.js and Express
4.  Serving static assets
5.  Testing and Debugging the GraphQL server

### Skills learned

1.  Install Express.js
2.  Build a basic Express.js server with routing
3.  Add GraphQL support to Node.js server via Apollo
4.  Setup Express to serve static assets
5.  Test and debug the GraphQL server

### CHAPTER 3:  Connecting the Database with TypeORM  

Now that we have a back-end ready that can respond to GraphQL queries and a front-end project. We'll need to connect our database to store our data. We'll be using TypeORM for abstracting the database operations which allows you to use any prefered database management system for your app without changing the code. We’ll see how to integrate TypeORM with Apollo and then migrate and seed our database.

### Main Chapter Headings 

1.  Using a database with GraphQL
2.  Using TypeORM with Node.js
3.  Writing TypeORM models for our database
4.  Using Apollo together with TypeORM
5.  Migrating and Seeding Data with TypeORM

### Skills learned

1.  Set up a database
2.  Integrate TypeORM with Node.js
3.  Create database models for TypeORM
4.  Integrate TypeORM with Apollo
5.  Migrate the database

# PART 2: Build the Angular Front-End with Realtime Support

In the previous part we have prepared both the development environment for Angular and created a GraphQL server with Express.js and Apollo. In this part, we’ll implement the front-end of our application using Angular and Apollo. We’ll add routing and navigation between various modules and components then we’ll finally implement real-time support using GraphQL subscriptions.

### CHAPTER 4:  Angular Application Architecture and Routing  

In the previous chapters we created the front-end project using Angular CLI. In this chapter, we'll use Angular CLI to create the modules, services and components that compose the UI of our application. Angular allows us to create the front-end of our backend with a modular and component based architecture.

After creating the various artifacts needed in our app such as modules, services and components, we’ll introduce Angular routing and we’ll proceed to implement routing and navigation in our application to create a single page application.

### Main Chapter Headings 

1.  Understanding the Application Architecture with Modules, and Components
2.  Services and Dependency Injection
3.  Creating Modules and Components
4.  Understanding Angular Routing
5.  Adding Routes
6.  Adding Navigation

### Skills learned

1.  Understand Angular Architecture
2.  Understand Services and Dependency Injection
3.  Use Angular CLI to create modules, services, and components
4.  Understand Angular routing
5.  Add routes to different views
6.  Add navigation in the app

### CHAPTER 5:  Integrating the Angular Front-End with the GraphQL Back-End  

Angular allows us to create the front-end of our backend with a modular and component based architecture. In this chapter, we'll learn how to use the Apollo client to connect the front-end with the GraphQL backend.

### Main Chapter Headings 

1.  Installing and configuring Apollo in the frontend
2.  Sending GraphQL queries with Apollo
3.  Mutating data with Apollo

### Skills learned

1.  Set up Apollo
2.  Send GraphQL queries
3.  Mutate data with GraphQL

### CHAPTER 6:  Implementing Authentication with Angular and GraphQL  

In this chapter, we are going to learn about the necessary concepts for adding authentication with Angular and GraphQL. We’ll learn what’s JWT and how to implement authentication with JWT and Apollo.

### Main Chapter Headings 

1.  What’s JWT
2.  Implementing authentication with Node.js and Apollo
3.  Signing up and logging Users
4.  Protecting GraphQL queries and mutations
5.  Protecting Routes

### Skills learned

1.  Understand JWT
2.  Implement authentication
3.  Implement login and signup interface
4.  Protect GraphQL queries and mutations
5.  Protect routes from public access

### CHAPTER 7:  Handling Image Uploads  

We want to allow users to upload their images so in this chapter, we’ll learn how to upload images using Amazon Web Services, Angular and Express.js.

### Main Chapter Headings

1.  Setting up AWS
2.  Setting up a AWS S3 Bucket
3.  Implementing Image Uploads in the server
4.  Uploading images with Angular and Apollo

### Skills learned

1.  Set up AWS
2.  Set up AWS S3
3.  Implement image uploads in server
4.  Implement image upload in client

### CHAPTER 8:  Adding Realtime Support  

In this chapter, we’ll learn how to add realtime support to our application to fetch new data from the server without the need to constantly refresh the app. To achieve this we’ll use GraphQL subscriptions with Apollo.

### Main Chapter Headings 

1.  GraphQL and WebSockets
2.  Implementing GraphQL Subscriptions with Apollo
3.  Implementing JWT Auth with Subscriptions

### Skills learned

1.  Use websockets with GraphQL
2.  Use GraphQL subscriptions to add realtime support
3.  Add JWT auth to GraphQL subscriptions

# PART 3: Server-side Rendering, Testing and Deployment

After building our app in the previous part, now we’ll add server-side rendering to our app, test our code for any unexpected errors and we’ll deploy it to AWS Lambda using the Serverless framework..

### CHAPTER 9:  Adding Server-side Rendering  

At this point, we have a Single Page App with multiple routes and views thanks to client-side routing. In this chapter, we’ll learn about server-side rendering and its benefits and then we’ll proceed to implement SSR in our app.

### Main Chapter Headings 

1.  Introducing Server-Side Rendering
2.  Implementing SSR with Express and Angular
3.  Implementing JWT with SSR
4.  Running GraphQL Queries with SSR

### Skills learned

1.  Learn what’s SSR
2.  Implement SSR in Angular
3.  Implement JWT with SSR
4.  Use GraphQL with SSR

### CHAPTER 10:  Testing Angular and GraphQL API  

We have written a lot of code in the back-end and front-end. In this chapter, we’ll learn how to write tests for our backend and frontend code to make sure everything works as expected. Next, we’ll build our app and deploy it to Heroku.

### Main Chapter Headings 

1.  Testing GraphQL APIs
2.  Testing the Angular Front-End

### Skills learned

1.  Write tests for the GraphQL API
2.  Write tests for Angular code

### CHAPTER 11:  Deploying your App with the Serverless Framework and AWS Lambda  

Now that we have tested our code back-end and front-end’ code. In this chapter, we’ll learn about serverless and then we’ll build our app and deploy it to AWS Lambda using the Serverless framework.

### Main Chapter Headings

1.  Setting up and Configuring Apollo Cache
2.  What’s Serverless and its Benefits
3.  Setting Apollo Server to Work with Lambda
4.  Deploying the App with the Serverless Framework


### Skills learned

1.  Implement Caching
2.  Learn what’s serverless
3.  Set up Apollo server to work with Lambda
4.  Deploy the app with the serverless framework


Subscribe to our mailing list to be notified when the book is ready for purchase!

<iframe class="mj-w-res-iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://app.mailjet.com/widget/iframe/64nF/GeD" width="100%"></iframe>

<script type="text/javascript" src="https://app.mailjet.com/statics/js/iframeResizer.min.js"></script>