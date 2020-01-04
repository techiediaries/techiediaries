---
layout: post
title: "Adonis Tutorial — CRUD REST API and JWT Authentication "
image: "images/content/adonis.png"
excerpt: "In this tutorial, you’ll be using Adonis 4 to build a REST API web application with JWT authentication and database access." 
tags : [node , adonis]
---

In this tutorial, you’ll be using Adonis 4 to build a REST API web application with JWT authentication and database access.

Adonis.js comes with many packages that you can use without re-inventing the wheel including JWT authentication. 

Throughout this tutorial, you’ll be building a CRUD  REST API and you’ll secure some operations  with JWT.


## Prerequisites

This tutorial has the following prerequisites:


- You need to have recent versions Node.js (**v8.0+**) and NPM installed on you system,
- You have a basic knowledge of JavaScript,
- You have a working knowledge of Node.js and NPM.


## Installing the Adonis CLI 4

Adonis provides a command line interface that allows developers to quickly generate Adonis projects and work with them.

In your terminal, run the following command to install the Adonis CLI:


    $ npm install -g @adonisjs/cli


> **Note**: Please note that you may need to use **sudo** to install npm packages globally if your system complains about any required permissions. In that case, if you still want to run your npm commands without **sudo**, you simply need to fix your npm permissions. Check   [Resolving EACCES permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally).
> At the time of this writing, **adonisjs/cli v4.0.10** will be installed on your system.

You can check for the installed version of Adonis CLI using:


    $ adonis --version
    4.0.10


## Creating an Adonis 4 Project

Next, in your terminal, run the following command to create a brand new Adonis 4 project:


    $ adonis new adonis-api-auth

The Adonis CLI will run a series of six tasks, such as:


- Checking for requirements (Node & npm),
- Making sure the `adonis-api-auth` folder is clean, 
- Cloning the `adonisjs/adonis-fullstack-app` template,
- Installing dependencies,
- Copying environment variables (.env),
- Generating key.

After that, you project will be ready!


## Serving your Adonis 4 Project

You can start by navigating inside your project’s folder and launch a development server:


    $ cd adonis-api-auth
    $ adonis serve --dev

Your web application will be served at `http://localhost:3333`.

If you point your web browser to that address, you should see the following page:


![Adonis REST API with JWT Authentication](https://d2mxuefqeaa7sj.cloudfront.net/s_9D165DB0E83BBB22AFA478FC17B9A5F29CAC28FB1726C380CD09C85FB78A9918_1544279851768_Screenshot+17.png)



Congratulations! You’ve just created your first Adonis 4 project.


## Setting up a SQLite Database

Before implementing REST and JWT in our application, you first need to setup a database that will be used to persist your application data such as users.

For making things simple, we’ll be using a SQLite database (file-based database) but since Adonis abstracts any direct operations with the database using Lucid—the Adonis ORM, you can quickly switch to use a production database like MySQL by simply updating your configuration settings without the need to make any changes in the application’s code.

Without further ado, open the `.env` file in your project’s root folder, you’ll find many settings:


    HOST=127.0.0.1
    PORT=3333
    NODE_ENV=development
    APP_URL=http://${HOST}:${PORT}
    CACHE_VIEWS=false
    APP_KEY=gu38sEmKoZOrd0a0dHsPgdbTnrpXYfCp
    DB_CONNECTION=sqlite
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=
    DB_DATABASE=adonis
    SESSION_DRIVER=cookie
    HASH_DRIVER=bcrypt  

You can see that `DB_CONNECTION` is already set to `sqlite`. 

In `DB_DATABASE` set the database file to `./my.db`. This will create a `my.db.sqlite` database file in the project’s folder under the `database` folder after running the first migration in your project.


## Creating/Migrating the SQLite Database

In order to actually create the database, you need to migrate it but before that, you also need to install the `sqlite3` package from `npm`:


    $ npm install sqlite3 --save


> **Note**: This will install **sqlite3 v4.0.4** at the time of this writing.

Next, run the migration command:


    $ adonis migration:run


> **Note**: You maybe wondering, why do we need to migrate the database before creating any tables in our project? That’s simply because Adonis already uses some tables like `users` and `tokens` so when we run migrations at this point we’ll be creating a SQLite database with these two tables.

If you navigate inside your database folder and run `ls` you should find your database file there:


    $ ls
    factory.js  migrations  my.db.sqlite   


## Creating your Model(s)

We’ll be creating a simple contacts management application, so we’ll need a `Contact` model that will corresponds to a `contacts` table in the database (it will be created after migrating the database again).

Head back to your terminal, make sure you are inside the project’s root folder and run the following command:


    $ adonis make:model Contact -mc
    √ create  app\Models\Contact.js
    √ create  database\migrations\1544283016633_contact_schema.js
    √ create  app\Controllers\Http\ContactController.js

This command will allow us to generate a `Contact` model with its migration file and its controller.

Open the `database\migrations\xxxxxxxxxx_contact_schema.js` file and update accordingly:


    'use strict'
    /** @type {import('@adonisjs/lucid/src/Schema')} */
    const Schema = use('Schema')
    class ContactSchema extends Schema {
      up () {
        this.create('contacts', (table) => {
          table.increments()
          table.string('name')
          table.string('email')
          table.string('title')
          table.string('tel')
          table.timestamps()
        })
      }
      down () {
        this.drop('contacts')
      }
    }
    module.exports = ContactSchema

The schema already defines The `increments()` and `timestamps()` fields which will respectively generate an auto incremented and primary key `id`  for your table and the `created_at` and `updated_at` fields. 

We also added three other fields of type `string` which are the name, email and telephone of the contact.

In order to create the `contacts` table with the defined fields, you need to migrate the database once again:


## Defining Foreign Relationship(s): User & Contact

In your application, you will usually need to have relationships between the various database tables. For example, in our case, we could have a relationship between `User` (created by default in the project) and `Contact` models which simply represents the user that created the contact.

In order to add this relationship, you need to add a foreign key that can be called `user_id` which holds the id of the user who created the contact. This can be done using:


    table.integer('user_id').unsigned().references('id').inTable('users');


## The `belongsTo` and `hasMany` Relationships

  
You also need to update your `Contact` model to let it know of this relationship. Open the `*app/Models/Contact.js*` file and update it accordingly:


    'use strict'
    /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
    const Model = use('Model')
    class Contact extends Model {
        user() {
            return this.belongsTo('App/Models/User');
        }
    }
    module.exports = Contact

This will allow you to access the user who created the contact from the `Contact` model. 

You can also add a reverse relationship to the `User` model to enable you to easily get all the contacts created by some user. Open the `*app/Models/User.js*` file and add the following `contacts()` method:


    contacts () {
      return this.hasMany('App/Models/Contact')
    }


## Migrating the Database: Creating the `contacts` Table

 
That’s it. You can now migrate the database to create the table:


    $ adonis migration:run
    migrate: 1544283016633_contact_schema.js
    Database migrated successfully in 795 ms


## Creating the RESTful CRUD Controller: `ContactController`

The controller for the contacts is automatically created when you generated the model with the previous command. If you go and open the `app/Controllers/Http/ContactController.js` file, you will find the following code:


    'use strict'
    /** @typedef {import('@adonisjs/framework/src/Request')} Request */
    /** @typedef {import('@adonisjs/framework/src/Response')} Response */
    /** @typedef {import('@adonisjs/framework/src/View')} View */
    /**
     * Resourceful controller for interacting with contacts
     */
    class ContactController {
      /**
       * Show a list of all contacts.
       * GET contacts
       *
       * @param {object} ctx
       * @param {Request} ctx.request
       * @param {Response} ctx.response
       * @param {View} ctx.view
       */
      async index ({ request, response, view }) {
      }
      /**
       * Render a form to be used for creating a new contact.
       * GET contacts/create
       *
       * @param {object} ctx
       * @param {Request} ctx.request
       * @param {Response} ctx.response
       * @param {View} ctx.view
       */
      async create ({ request, response, view }) {
      }
      /**
       * Create/save a new contact.
       * POST contacts
       *
       * @param {object} ctx
       * @param {Request} ctx.request
       * @param {Response} ctx.response
       */
      async store ({ request, response }) {
      }
      /**
       * Display a single contact.
       * GET contacts/:id
       *
       * @param {object} ctx
       * @param {Request} ctx.request
       * @param {Response} ctx.response
       * @param {View} ctx.view
       */
      async show ({ params, request, response, view }) {
      }
      /**
       * Render a form to update an existing contact.
       * GET contacts/:id/edit
       *
       * @param {object} ctx
       * @param {Request} ctx.request
       * @param {Response} ctx.response
       * @param {View} ctx.view
       */
      async edit ({ params, request, response, view }) {
      }
      /**
       * Update contact details.
       * PUT or PATCH contacts/:id
       *
       * @param {object} ctx
       * @param {Request} ctx.request
       * @param {Response} ctx.response
       */
      async update ({ params, request, response }) {
      }
      /**
       * Delete a contact with id.
       * DELETE contacts/:id
       *
       * @param {object} ctx
       * @param {Request} ctx.request
       * @param {Response} ctx.response
       */
      async destroy ({ params, request, response }) {
      }
    }
    module.exports = ContactController
    

You can see that there many methods for making CRUD operations to create/save, update, delete and display all contacts or a contact by its `id`. 


> **Note**: You can also generate a controller using the `adonis make:controller --type http ContactController` command.

You need to provide implementations for the following methods:


- `index` for listing the contacts,
- `store` for creating and saving a contact,
- `update` for updating a contact by its `id`,
- `destroy` for deleting a contact by its `id`.

First, you need to import the `Contact` model in the `app/Controllers/Http/ContactController.js` file


    const Contact = use('App/Models/Contact');

You’ll be using the methods from this model to interact with the `contacts` table in the database.
 
Let’s first start by implementing the `index()` method:


    async index ({ request, response, view }) {
        let contacts = await Contact.query().with('user').fetch()
        return response.json(contacts)
    }

Next, let’s implement the `store()` method for creating new contacts and persist them in the database:


    async store ({ request, response }) {
        
        const name = request.input('name')
        const email = request.input('email')
        const title = request.input('title')
        const tel = request.input('tel')
        
        const contact = new Contact()
        contact.name = name
        contact.email = email
        contact.title = title
        contact.tel = tel
        
        await contact.save()
        return response.json(contact)
    }

Next, let’s implement the `update()` method for updating a contact by its `id`:


    async update ({ params, request, response }) {    
        const name = request.input('name')
        const email = request.input('email')
        const title = request.input('title')
        const tel = request.input('tel')
        
        let contact = await Contact.find(params.id)
        
        contact.name = name
        contact.email = email
        contact.title = title
        contact.tel = tel
        await contact.save()
        return response.json(contact)
    }

Finally, let’s implement the `destroy()` method for deleting a contact by its `id`:


    async destroy ({ params, request, response }) {
        await Contact.find(params.id).delete()
        return response.json({message: 'Contact deleted!'})
    } 


## Creating the Route(s)

To be able to access the various controller methods, you need to create routes. Open the `start/routes.js` file and add the following routes:


    Route.put('/api/contacts/:id', 'ContactController.update')
    Route.delete('/api/contacts/id', 'ContactController.destroy')
    Route.post('/api/contacts', 'ContactController.store')
    Route.get('/api/contacts', 'ContactController.index') 


## Adding JWT Authentication 

In order to protect certain endpoints from public access, you need to add authentication in your application using the JWT (JSON Web Tokens) approach.

Let’s continue with JWT auth in the second part of this tutorial: [Adonis Tutorial — CRUD REST API and JWT Authentication](https://www.techiediaries.com/adonis-jwt-authentication). 

## Testing the REST API Endpoints: cURL or Postman

You can use REST clients like cURL or Postman to interact with the `/api/contacts` endpoint. But first, you need to disable CSRF protection in your application.Open the `config/shield.js` file, and update it as follows:


      csrf: {
        enable: false,
        methods: ['POST', 'PUT', 'DELETE'],
        filterUris: [],
        cookieOptions: {
          httpOnly: false,
          sameSite: true,
          path: '/',
          maxAge: 7200
        }
      }

You can now send the following example request:


    POST http://127.0.0.1:3333/api/contacts
    {
      "name": "test",
      "email": "test@mail.com",
      "title": "developer",
      "tel": "+0 00 00 00 00"
    }

You should get a similar output:


![Adonis REST API TEST](https://d2mxuefqeaa7sj.cloudfront.net/s_9D165DB0E83BBB22AFA478FC17B9A5F29CAC28FB1726C380CD09C85FB78A9918_1544292522343_Screenshot_17.png)

## Conclusion

Throughout this tutorial series, you’ve used Adonis.js 4 to create a CRUD REST API with JWT authentication.  

