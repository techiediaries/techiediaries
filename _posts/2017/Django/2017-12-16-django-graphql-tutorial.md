---
layout: post
title: "Building Django 3 HTTP APIs with GraphQL and Graphene"
image: "images/content/django4.jpg"
excerpt: "This tutorial will introduce you to GraphQL with Python, Django 3 and Graphene. We'll see how to create a simple Django 3 project to demonstrate how to build an API server based on GraphQL (instead of REST) then we'll see how to use graphiql_django, an interface for testing GraphQL queries and mutations before building your front-end application, to send GraphQL Queries (for getting data) and Mutations (for posting and updating data). In this part we'll be dealing with building the backend. In the next tutorials we will see how to use frameworks and libraries such as Angular and React to build a front-end application that consumes and updates our GraphQL server and advanced use cases such as user authentication, permissions and Relay" 
date: 2020-05-04
tags : [django , graphql] 
next : /django-graphql-tutorial/graphene
---

![](/images/content/django4.jpg)

**This tutorial will introduce you to GraphQL with Python, Django 3 and Graphene. We'll see how to create a simple Django 3 project to demonstrate how to build an API server based on GraphQL (instead of REST) then we'll see how to use *graphiql_django*, an interface for testing GraphQL queries and mutations before building your front-end application, to send GraphQL Queries (for getting data) and Mutations (for posting and updating data). In this part we'll be dealing with building the backend. In the next tutorials we will see how to use frameworks and libraries such as Angular and React to build a front-end application that consumes and updates our GraphQL server and advanced use cases such as user authentication, permissions and Relay**

Make sure to follow me on twitter ([@techiediaries](https://twitter.com/techiediaries)) to be notified once the next tutorial parts are ready. 

GraphQL is a modern API standard for building Web APIs, invented and used internally by Facebook for its native mobile applications then later [open sourced](https://facebook.github.io/react/blog/2015/02/20/introducing-relay-and-graphql.html). GraphQL provides a better, powerful and flexible alternative to [REST](https://en.wikipedia.org/wiki/Representational_state_transfer). 

Before we dive into GraphQL concepts, let's understand what's REST:

REST stands for **Re**presentational **S**tate **T**ransfer and it's an architectural pattern for designing client/server distributed systems. Unlike GraphQL, it's not a standard but a set of constraints such as having a uniform interface or [statelessness](https://restfulapi.net/statelessness/) which means each HTTP request has to include all of the information needed by the server to fulfill the request, instead of being dependent on the server to keep track of the previous requests or saving the session state on the server.

These are the principles of REST:

>* Resources: expose easily understood directory structure URIs.
>* Representations: transfer JSON or XML to represent data objects and attributes.
>* Messages: use HTTP methods explicitly (for example, GET, POST, PUT, and DELETE).
>* Stateless: interactions store no client context on the server between requests. State dependencies limit and restrict scalability. The client holds session state.
>[https://spring.io/understanding/REST](https://spring.io/understanding/REST)

If you want to know more, watch this video, by Google Developers, that goes over the basic principles behind REST.

<iframe width="640" height="360" src="https://www.youtube.com/embed/YCcAE2SCQ6k" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>

An API (**A**pplication **P**rogramming **I**nterface) provides a way (or an interface) for clients to fetch data from servers. This establishes a relationship between a client and a server. In the case of REST, the established interface is inflexible and strongly coupled to the server implementation so if the server's implementation changes the depending clients, most often than not, will break.

In its essence, GraphQL allows developers to declaratively fetch data from a server. Most importantly, the clients are able to specify exactly what data they need. Also, unlike REST APIs where you usually have multiple endpoints which provide fixed data shapes or structures, a GraphQL server needs to only expose a single endpoint that provides, the requesting clients, with exactly the data they are asking for, no less no more.

GraphQL is adopted by many big companies, other than Facebook, such as GitHub, Twitter and Shopify etc. 

Nowadys, companies have rapidely and frequently changing data requirements. For this reason, companies are investing more money and time rewriting clients that access data using REST APIs. As such, GraphQL provides the better solution for developers to satisfy the needs for the uncertain data requirements.   

<iframe width="500" height="300" src="https://www.youtube.com/embed/zVNrqo9XGOs" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>


## REST vs. GraphQL

GraphQL allows you to query your server for the exact data that you need by sending a single request even for fetching data from related models.

With a REST API, you will usually communicate with multiple endpoints when trying to fetch data from a server so suppose you have this endpoint for accessing users data by their id `/users/<id>`, this endpoint `/users/<id>/posts` for accessing a user's posts and the last one for accessing the user's followers `/users/<id>/followers`


![](https://imgur.com/VIWd5I5.png) [Source](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/)

A client application, that needs data from this API, must send three HTTP requests to the available three endpoints to fetch  all required data. So first this will cause many round-trips to the server (consuming more resources) and secondly there will likely be extra data that will be fetched (this is called overfetching), which may not necessarily be used, as the client has no control over the requested data, that's because, in REST, the server dictates the shape of the data that can be sent.   

![](https://imgur.com/uY50GHz.png)
[Source](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/)

The same data can be fetched from the same API by sending only a single request to the GraphQL endpoint, the request contains a query of all data requirements from the client. The server parses the query and sends back the request data as a JSON object in the exact same format requested by the client.   
 
So as a recap, when using the Rest-based APIs the client will either get less than expected data (underfetching). In this case it needs to send more requests to retrieve all required data, or it will get more data (overfetching)than what it actually needs, which consumes the server resources for no reasons.


Thanks to GraphQL, the client can exactly describe the shape of the requested data with a JSON object and the server takes care of sending the data in the requested shape.

Let's take one more simple example to understand how GraphQL works.

Suppose we have a Django 3 web application with two models: *Products* and *Families*:

```python

class Product(models.Model):
    ## attributes

class Family(models.Model):
    ## attributes

```

Each product belongs to a family so they are related with a foreign key.

Now if you need to build a Rest API for this web app, you will have to create multiple endpoints, such as:

* */products*: for exposing all products or add a product with an *HTTP POST* method.
* */families*: for getting all families or add a family.
* */product/:id*: for getting or updating a product by id.
* */family/:id*: for getting or updating a family by id.


Now, let's suppose you want to get all products of a specified family, you will need to add another endpoint. For example something like: */family/:id/products* where *:id* is the identifier of the family of products.

Let's also suppose that a request to the endpoint */product/1* returns a serialized object, for example:

```json
{
    id : 1 ,
    reference : 'PR001' , 
    name : 'Product 001' ,
    description : 'Description of Product 001'
}
```

The problem is: What if you need to build another front end app, maybe for mobile devices, that needs more data. For example a *quantity* attribute. In this case, you have to add another endpoint or modify the existing endpoint to include the quantity.

In the case of Rest-based APIs, the server API architecture is strongly coupled with the client implementation, as a result if you need to change the API implementation on the server, you'll definitely end up breaking the existing clients. And if you need to add another client for your API, which needs less or more data, that's served by some endpoint(s), you'll have to change the server code responsible for serving the API in a way that doesn't break the existing clients. That means, in many cases, conserving the old endpoints and adding new endpoints.            


If you have ever developed an API with Django 3 or any other framework then you certainly experienced one or all 
of these issues we have talked about. Thanks to Facebook, GraphQL presents the solution for you!

Continuing with the simple example above. In the case of GraphQL, we can send a query that may look like:

```json
query {  
    product(id:1) {
        id,
        reference,
        quantity
    }
}
```

Which is going to return something like:

```json
{
    id : 1,
    reference : 'PR001', 
    quantity : 1000
}
```

We have neglected two attributes without causing any problems or changing the underlying server API.

Just query the data you want and the server will be able to send it back to you.

Now if you need to get all products of a specified family with GraphQL, say for example for the family with the id equals to *1*. You can simply send:

```json
query {  
    family(id:1) {
        id
        products {
            id,    
            reference,
            name,
            description,
            quantity
        }
    }
}
```

If you send this query to your GraphQL server, you'll get something similar to:

```json

{
    "id":"1",
    "products":[{"id":"1","reference":"PR001","name":"Product1","description":"..."} , ... ]
}    
```


Even if this example is fairly simple, you can see how powerful this new technology can be, for building Web APIs.

## Building a GraphQL Django 3 Application 

After the introduction to GraphQL vs. REST. Let's now learn how to build a simple real world example web application with Django 3 and Graphene: the Python implementation for GraphQL.

This tutorial assumes you have already setup your development machine to work with Python. You need to have Python, PIP (Python package manager) and optionally *virtualenv* installed. Python can be easily installed by grabbing the binaries for your operating system from the [official website](http://www.python.org/download). 

pip is installed Python if have Python **2 >=2.7.9** or Python **3 >=3.4** binaries downloaded from the official [python.org](http://www.python.org) website. Otherwise you can install it using [get-pip.py](https://bootstrap.pypa.io/get-pip.py).

```bash
python get-pip.py
``` 


For [virtualenv](https://pypi.python.org/pypi/virtualenv) you can use [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/) using pip:

```bash
pip install virtualenvwrapper
```   

Let's start by creating a new virtual and isolated environment for our project dependencies and then install the required packages including Django 3.

Head over to your terminal in Linux/Mac or command prompt in Windows then run the following:

```bash
virtualenv graphqlenv 
source graphqlenv/bin/activate 
```

This will create a new virtual environment and activate it.

Next install Django 3 and graphene packages with pip: 

```bash
pip install django 
pip install graphene_django
```

You can also install *graphiql_django* which provides a user interface for testing GraphQL queries against your server.

```bash
pip install graphiql_django
```

Next let's create a Django 3 project and add a single application:

```bash
python django-admin.py startproject inventory . 
cd inventory
python manage.py startapp inventory 
```

Open `settings.py` then add *inventory* and *graphene_django* to the *INSTALLED_APPS* array:

```python

INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'graphene_django',
        'inventory'
]
```

Next migrate the database with:

```bash
python manage.py migrate 
```

## Adding Django 3 Models

Open `inventory/models.py` then add:

```python

    # -*- coding: utf-8 -*-
    from __future__ import unicode_literals

    from django.db import models

    class Product(models.Model):

        sku = models.CharField(max_length=13,help_text="Enter Product Stock Keeping Unit")
        barcode = models.CharField(max_length=13,help_text="Enter Product Barcode (ISBN, UPC ...)")
        
        title = models.CharField(max_length=200, help_text="Enter Product Title")
        description = models.TextField(help_text="Enter Product Description")
        
        unitCost = models.FloatField(help_text="Enter Product Unit Cost")
        unit = models.CharField(max_length=10,help_text="Enter Product Unit ")
        
        quantity = models.FloatField(help_text="Enter Product Quantity")
        minQuantity = models.FloatField(help_text="Enter Product Min Quantity")
        
        family = models.ForeignKey('Family')
        location = models.ForeignKey('Location')
        
        
        def __str__(self):
            
            return self.title


    class Family(models.Model):

        reference = models.CharField(max_length=13, help_text="Enter Family Reference")
        title = models.CharField(max_length=200, help_text="Enter Family Title")
        description = models.TextField(help_text="Enter Family Description")
        
        unit = models.CharField(max_length=10,help_text="Enter Family Unit ")
        
        minQuantity = models.FloatField(help_text="Enter Family Min Quantity")
            
        
        def __str__(self):
            
            return self.title


    class Location(models.Model):


        reference = models.CharField(max_length=20, help_text="Enter Location Reference")
        title = models.CharField(max_length=200, help_text="Enter Location Title")
        description = models.TextField(help_text="Enter Location Description")
                    
        def __str__(self):
        
            return self.title


    class Transaction(models.Model):

        sku = models.CharField(max_length=13,help_text="Enter Product Stock Keeping Unit")
        barcode = models.CharField(max_length=13,help_text="Enter Product Barcode (ISBN, UPC ...)")
        
        comment = models.TextField(help_text="Enter Product Stock Keeping Unit")
    
        unitCost = models.FloatField(help_text="Enter Product Unit Cost")
        
        quantity = models.FloatField(help_text="Enter Product Quantity")

        product = models.ForeignKey('Product')

        date = models.DateField(null=True, blank=True)
        
        REASONS = (
            ('ns', 'New Stock'),
            ('ur', 'Usable Return'),
            ('nr', 'Unusable Return'),
        )


        reason = models.CharField(max_length=2, choices=REASONS, blank=True, default='ns', help_text='Reason for transaction')

        def __str__(self):
            
            return 'Transaction :  %d' % (self.id)

```


Next create migrations and apply them:

```bash
python manage.py makemigrations
python manage.py migrate
```

## Adding the Admin Interface

The next thing is to add the models to the *admin* interface so we can add some test data:

Open *inventory/admin.py* and add: 

```python

    # -*- coding: utf-8 -*-
    from __future__ import unicode_literals

    from django.contrib import admin

    from .models import Product ,Family ,Location ,Transaction  
    # Register your models here.

    admin.site.register(Product)
    admin.site.register(Family)
    admin.site.register(Location)
    admin.site.register(Transaction)
```

Next create a login to be able to access the admin app 

```bash
python manage.py createsuperuser 
```

Enter the *username* and *password* when prompted and hit enter.

Now run the local development server with:

```bash
python manage.py runserver
```


Navigate to *http://127.0.0.1:8000/admin* with your browser. Login and add some data for each model.

## GraphQL Concepts: the Schema and Type System

GraphQL is a strongly typed query language which can be used to describe the data structures of an API. GraphQL uses the concepts of schemas and types. Types define what's exposed in the API and grouped in a schema using the [GraphQL's SDL](https://www.graph.cool/docs/faq/graphql-sdl-schema-definition-language-kr84dktnp0/) language or the **S**chema **D**efinition **L**anguage.

The schema can be considered as a contract between the client and the server which states how a client can access the data in the server.


## Adding GraphQL Support: the Schema and the Object Types 

To be able to execute GraphQL queries against your web application you need to add a **Schema**, **Object Types** and a view function that receives the GraphQL queries.

### Creating the Schema 

Create *inventory/schema.py* then: 

First, create a subclass of *DjangoObjectType* for each model you want to query with GraphQL:

```python        

    import graphene

    from graphene_django.types import DjangoObjectType

    from .models import Family , Location , Product , Transaction 

    class FamilyType(DjangoObjectType):
        class Meta:
            model = Family 

    class LocationType(DjangoObjectType):
        class Meta:
            model = Location 

    class ProductType(DjangoObjectType):
        class Meta:
            model = Product 

    class TransactionType(DjangoObjectType):
        class Meta:
            model = Transaction

```

Next, create an abstract query: a subclass of *AbstractType* (It's abstract because it's an app level query). For each app you have, you need to create an app level abstract query and then combine all abstract queries with a concrete project level query.   

You need to create a subclass of *graphene.List* for each *DjangoObjectType* then create the *resolve_xxx()* methods for each Query member  

```python

    class Query(graphene.AbstractType):
        all_families = graphene.List(FamilyType)
        all_locations = graphene.List(LocationType)
        all_products = graphene.List(ProductType)
        all_transactions = graphene.List(TransactionType)

        def resolve_all_families(self, args, context, info):
            return Family.objects.all()

        def resolve_all_locations(self, args, context, info):
            return Location.objects.all()

        def resolve_all_products(self, args, context, info):
            return Product.objects.all()

        def resolve_all_transactions(self, args, context, info):
            return Transaction.objects.all()
```

### Creating the Project Level Query

Next create a project level Query. Create a project level `schema.py` file then add:

```python

    import graphene

    import inventory.schema 


    class Query(inventory.schema.Query, graphene.ObjectType):
        # This class extends all abstract apps level Queries and graphene.ObjectType
        pass

    schema = graphene.Schema(query=Query)
```


So we first create a Query class which extends all abstract queries and also *ObjectType* then we create a *graphene.Schema* object which takes the *Query* class as a parameter.

Now we need to add a *GRAPHINE* config object in `settings.py`

```python

GRAPHENE = {
        'SCHEMA': 'product_inventory_manager.schema.schema'
} 
```

### Adding the GraphQL View 

With GraphQL, you don't need multiple endpoints, only one, so let's create it: 

Open `urls.py` then add: 

```python

    from django.conf.urls import url
    from django.contrib import admin

    from graphene_django.views import GraphQLView

    from product_inventory_manager.schema import schema

    urlpatterns = [
        url(r'^admin/', admin.site.urls),
        url(r'^graphql', GraphQLView.as_view(graphiql=True)),
    ]
```

We have previously installed a GraphQL package for adding a user interface to test GraphQL queries so if you want to enable it you just set the graphiql parameter to *True*. 


## Serving the App and Testing GraphQL 

Now you are ready to test the GraphQL API, so start by serving your Django app with:

```bash
python manage.py runserver 
```

Then navigate to [localhost:8000/graphql](localhost:8000/graphql) with your browser and run some queries.

## Fetching Data with Queries

In traditional REST APIs you can fetch data by sending HTTP GET requests to pre-determined and pre-conceived endpoints where each endpoint returns a pre-defined and rigid structure. So the only way you have to express your client's data requirements is through the URLs of the available endpoints and their associated parameters. As a result, the client doesn't have much flexibility for defining its data requirements. 

For GraphQL, things are very different. The client needs only to communicate with a single endpoint which can return all requested information with flexible data structures. But since there is only one endpoint, the server needs more information to be passed to be able to properly figure out the data requirements of the client. Here comes the role of the query which is a simple JSON (**J**ava**S**cript **O**bject **N**otation) object that defines the requirements. 

### Example Queries

Let’s take a simple example of a query that can be sent to our GraphQL server:

```json

query {
    allProducts {
        id,
        sku
    }
}   
```

The *allProducts* field in the previous query is the **root field**. What follows the root field (i.e *id* and *sku*), is the **payload** of the query.

This previous query returns an array of all products which are currently stored in the database. Here’s an example response:


```json
{
    "data": {
        "allProducts": [
        {
            "id": "1",
            "sku": "Product001"
        }
        /*...*/
        ]
    }
}   
```

You can see that each product returned has two fields (the only fields that are specified in the query), an *id* and a *sku* even if a product has *10* fields.

If the client needs more that. All it has to do is adding the field in the query.

You can experiment with the other models and you can also add fields. 

Now what question you should ask. How do you get the names of the queries?

It's simple, just take the name of the field you create in the abstract query and transform it to camel case.

For example: 

```python

all_families = graphene.List(FamilyType) => allFamilies
        
all_locations = graphene.List(LocationType) => allLocations 
        
all_products = graphene.List(ProductType) => allProducts 
        
all_transactions = graphene.List(TransactionType) => allTransactions 
```


Then for each query specify the model fields you want to retrieve.

### How to Query the Relationships or Nested Data?

You can also query the relationships or nested data. So let's suppose that you need to get all families with their products. You can simply make this query: 

```json

query {
    allFamilies {
        id,
        reference, 
        productSet {
            id,
            sku 
        }
    }
}
```

Note that you need to add `<field>`+*Set* for nested lists.

An example response would look like the following:

```json

    {
    "data": {
        "allFamilies": [
        {
            "id": "1",
            "reference": "FM001",
            "productSet": [
            {
                "id": "1",
                "sku": "Product001"
            }
            ]
        },
        {
            "id": "2",
            "reference": "FM001",
            "productSet": []
        }
        ]
    }
    }
```

Now what if you need the parent family and the location of each product. That's also easy to do with GraphQL:

```json
query {
        allProducts {
            id,
            sku, 
            family {
                id
            }
            location {
                id
            }
            
        }
    }
```

## Querying Single Items Using Query Arguments

We have seen how to query all items but what if you need just one item by id. Go back to your abstract query in your app `schema.py` file then update it to be able to query for a single product: 

```python

product = graphene.Field(ProductType,id=graphene.Int())

```

Then a *resolve_xxx()* method: 

```python

def resolve_product(self, args, context, info):
        id = args.get('id')

        if id is not None:
            return Product.objects.get(pk=id)

        return None
```

In GraphQL, fields may have arguments that can be specified between parenthesis in the schema (just like a function declaration). For example, the *product* field can have an *id* parameter to return the product by its id. Here’s what an example query may look like:

```json

query {
    product(id: 1) {
        sku,
        barcode
    }
}
```

In the same way, you can add support for getting single families, locations and transactions.

## Writing Data with Mutations

A Mutation is a special **ObjectType** that can be used to create objects in the GraphQL server.

```python
import graphene

class CreateProduct(graphene.Mutation):
    class Arguments:
        sku = graphene.String()
        barcode = graphene.String()

    result = graphene.Boolean()
    product = graphene.Field(lambda: Product)

    def mutate(self, info, sku):
        product = Product(sku=sku)
        result = True
        return CreateProduct(product=product, result=result)
```
*product* and *result* are the output fields of the *Mutation* when it's resolved.

Inputs are the arguments that the Mutation *CreateProduct* needs for resolving, in this case *sku*, *barcode*, ... are the arguments for the mutation.

*mutate()* is the function that will be invoked once the mutation is called.

## Conclusion 

GraphQL is a very powerful technology for building Web APIs and thanks to Django 3 Graphene you can easily add the support for GraphQL to your Django 3 project.

You can find the code in this [GitHub repository](https://github.com/techiediaries/django-graphql-graphene-example)

  
 




