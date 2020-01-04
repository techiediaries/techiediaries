---
layout: post
title: "Getting started with Django Rest Framework by Building a Simple Product Inventory Manager "
image: "images/content/customize-django-admin.png"
excerpt: "How to Customize Django Admin Application" 
tags : django 
---

{% include image.html 
    img="images/content/customize-django-admin.png" 
    title="Getting started with Django Rest Framework by Building a Simple Product Inventory Manager " 
%}


Django offers developers many packages/frameworks to build web Rest APIs ,among them Django Rest Framework or DRF 
which is by far the most popular and powerful Rest API Framework .

In this tutorial we will see how to use DRF to create a Rest API for a simple products inventory manager with 
4 models .

<h2>Getting started </h2>

Lets start by following these steps :

Create a virtual environement .

Install both Django and Django Rest Framework .

Create A Django project .

Create a Django app .

Add database models in inventory/models.py  

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
        
        def get_absolute_url(self):
            """
            Returns the url to access a particular instance of Product.
            """
            return reverse('product-detail-view', args=[str(self.id)])
        
        def __str__(self):
            
            return self.title

    class Family(models.Model):

        reference = models.CharField(max_length=13, help_text="Enter Family Reference")
        title = models.CharField(max_length=200, help_text="Enter Family Title")
        description = models.TextField(help_text="Enter Family Description")
        
        unit = models.CharField(max_length=10,help_text="Enter Family Unit ")
        
        minQuantity = models.FloatField(help_text="Enter Family Min Quantity")
            
        def get_absolute_url(self):
            """
            Returns the url to access a particular instance of Family.
            """
            return reverse('family-detail-view', args=[str(self.id)])
        
        def __str__(self):
            
            return self.title

    class Location(models.Model):

        reference = models.CharField(max_length=20, help_text="Enter Location Reference")
        title = models.CharField(max_length=200, help_text="Enter Location Title")
        description = models.TextField(help_text="Enter Location Description")
            
        def get_absolute_url(self):
            """
            Returns the url to access a particular instance of Location.
            """
            return reverse('family-detail-view', args=[str(self.id)])
        
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
            
        def get_absolute_url(self):
            """
            Returns the url to access a particular instance of Product.
            """
            return reverse('transaction-detail-view', args=[str(self.id)])
        
        def __str__(self):
            
            return 'Transaction :  %d' % (self.id)


<h2>Setting up Django Rest Framework </h2>

Open your project settings.py then add configuration options into a dictionay named REST_FRAMEWORK 

    REST_FRAMEWORK = {
    ‘DEFAULT_PERMISSION_CLASSES’:
        [‘rest_framework.permissions.IsAdminUser’],
    ‘PAGE_SIZE’: 10
    }

<h2>Serializers </h2>

What's a serializer ? 

A serializer is a Python class that's used to transform your models data to a serialized format such as JSON or XML .

Serializers are used in both ways from models data to JSON or from JSON to models data .

For each model that you want to expose via a Rest endpoint you need to have a serializer which is typically
placed in serializers.py module inside your app .

Lets create serializer classes for simple models (without related models) first, Location and Family .

To do that , we'll create a serializer class which extends ModelSerializer 

ModelSerializer is a subclass of Serializer which enables you to automatically create serializers with fields 
that map directly to a Django model fields .

You need to specify the model to serialize ,fields to include or exclude and depth which indicates the depth 
of relationships that should be traversed before reverting to a flat representation in case of related models .

A ModelSerializer performs these tasks for you:

Automatically generates Serializer fields based on the database Model .

Automatically generates Serializer validators .

Includes default Serialize .create() and .update() methods .

So for most cases you need to extend ModelSerializer or one of its subclasses to create Serializer classes. 

In inventory app create a <em>serializers.py</em> module then add :

    class LocationSerializer(serializers.ModelSerializer):
        class Meta:
            model = Location 
            fields = ('reference','title', 'description')


Then 

    class FamilySerializer(serializers.ModelSerializer):
        class Meta:
            model = Family 
            fields = ('reference', 'title', 'description','unit','minQuantity')

<h3>How to indicate the model to serialize ? </h3>

We simply use the model attribute of the Meta class of ModelSerializer 

<h3>How to indicate the model fields to include/exclude </h3>

We use fields attribute in Meta class to indicate the subset of fields to serialize or you can also use exclude
attribute to indicate which fields to omit of the serialization .

If you want to specify all fields use the special value '__all__' 

    class FamilySerializer(serializers.ModelSerializer):
        class Meta:
            model = Family 
            fields = '__all__'

You can exclude a field using exclude attribute :

    class FamilySerializer(serializers.ModelSerializer):
        class Meta:
            model = Family 
            exclude = 'minQuantity'


<h3>How to deal with related or nested models ? </h3>

Now lets create serializer classes for models with related (nested ) models : Product and Transaction

ModelSerializer uses primary keys for nested related models i.e if you are serializing a model which references 
other model(s) it will include the primary keys of these models in the serialized data .

For example lets create a serializer for Product model :

    class ProductSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Product 
            fields = ('sku','barcode', 'title', 'description','location','family')

As you can see we have included the related models location and family .In this case ModelSerializer takes
the primary keys by default so you'll get something like this, depending on data you have in your database . 

    [
        {
            "sku": "Product001",
            "barcode": "xxxxxxxxx",
            "title": "Product 001",
            "description": "product 001",
            "location": 1,
            "family": 1
        }
    ]  

What if you want to get the whole related objects ?

You can use the depth option in Meta class 

    class ProductSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Product 
            fields = ('sku','barcode', 'title', 'description','location','family')
            depth = 1

which outputs something like :

    [
        {
            "sku": "Product001",
            "barcode": "xxxxxxxxx",
            "title": "Product 001",
            "description": "product 001",
            "location": {
                "id": 1,
                "reference": "LOC001",
                "title": "Location 001",
                "description": "Location 001"
            },
            "family": {
                "id": 1,
                "reference": "FM001",
                "title": "FAMILY 001",
                "description": "Family 001",
                "unit": "kg",
                "minQuantity": 0.0
            }
        }
    ]

Or you can specify the fields explicitly .

    class ProductSerializer(serializers.ModelSerializer):
        
        location = LocationSerializer()
        family = FamilySerializer()
        class Meta:
            model = Product 
            fields = ('sku','barcode', 'title', 'description','location','family')


Now lets create a serializer for Transaction model : 


    class TransactionSerializer(serializers.ModelSerializer):
        
        product = ProductSerializer()
        class Meta:
            model = Transaction 
            fields = ('sku', 'barcode','product')

<h3>Different ways to serialize relationships </h3>

Using ModelSerializer ,the default way to serialize a relationship field is primary keys but we have also 
other representations such as :

Hyperlinks,

Complete nested instances ,

Custom representation 

<h2>HyperlinkedModelSerializer</h2>

To use Hyperlinks for relationships serialization we can use HyperlinkedModelSerializer which is similar to
ModelSerializer except that it uses hyperlinks instead of primary keys to represent relationships .

So lets change our serializer class for Product to use HyperlinkedModelSerializer 


    class ProductSerializer(serializers.HyperlinkedModelSerializer):
        
        class Meta:
            model = Product 
            fields = ('sku','barcode', 'title', 'description','location','family')



<h2>Creating API Views </h2>

Now after creating Serializer classes for different models ,the next step would be creating API views .

The Django Rest Framework provides its own Request and Response objects to build API views or API endpoints .

To create API views you can either use function based views with <em>@api_view</em> decorator or class based views 
by extending <em>APIView</em> or the generic subclasses of APIView which automatically do  most of the boilerplate 
work that otherwise we need to write by ourselves .

We will start by function based views :

So open <em>inventory/views</em> then add :

    # -*- coding: utf-8 -*-
    from rest_framework import status
    from rest_framework.decorators import api_view
    from rest_framework.response import Response
   
    from .models import Product , Location ,Family ,Transaction 
    from .serializers import *   

We have imported rest_framework classes and decorators to build api views then imported our models and serializers .

Next lets build list and detail views for each endpoint 

For Products 

    @api_view(['GET', 'POST'])
    def product_list(request):
        """
        List all products, or create a new product.
        """
        if request.method == 'GET':
            products = Product.objects.all()
            serializer = ProductSerializer(products,context={'request': request} ,many=True)
            return Response(serializer.data)
        elif request.method == 'POST':
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['GET', 'PUT', 'DELETE'])
    def product_detail(request, pk):
        """
        Retrieve, update or delete a product instance.
        """
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = ProductSerializer(product,context={'request': request})
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = ProductSerializer(product, data=request.data,context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


You can continue with the other endpoints using the same methodology or better yet we'll use generic class based views 
which do all of this automatically . 


    class family_list(generics.ListCreateAPIView):
        queryset = Family.objects.all()
        serializer_class = FamilySerializer

    class family_detail(generics.RetrieveUpdateDestroyAPIView):
        queryset = Family.objects.all()
        serializer_class = FamilySerializer

    class location_list(generics.ListCreateAPIView):
        queryset = Location.objects.all()
        serializer_class = LocationSerializer

    class location_detail(generics.RetrieveUpdateDestroyAPIView):
        queryset = Location.objects.all()
        serializer_class =  LocationSerializer

    class transaction_list(generics.ListCreateAPIView):
        queryset = Transaction.objects.all()
        serializer_class = TransactionSerializer

    class transaction_detail(generics.RetrieveUpdateDestroyAPIView):
        queryset = Transaction.objects.all()
        serializer_class =  TransactionSerializer


So for list endpoints you need to extend generics.ListCreateAPIView and for detail endpoints you need to extend 
generics.RetrieveUpdateDestroyAPIView .

You need also to specify the queryset and serializer_class in each class based view .

<h2>Using Mixins for more control</h2>

Mixins provide more control by allowing you to compose reusable code for CRUD operations .

Rest Framework provides 5 mixins and a Genric API view :

mixins.ListModelMixin

mixins.CreateModelMixin

mixins.RetrieveModelMixin

mixins.UpdateModelMixin

mixins.DestroyModelMixin

generics.GenericAPIView

Now lets see how to compose an api view using mixins by changing one of our generic class based views  .

In views.py 

First import mixins 

    from rest_framework import status , generics , mixins

Then change family_detail to 

    class family_list(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):

        queryset = Family.objects.all()
        serializer_class = FamilySerializer

If you run your development server and visit <em>http://127.0.0.1:8000/families/</em> You'll get :

    GET /families/
    HTTP 405 Method Not Allowed
    Allow: OPTIONS
    Content-Type: application/json
    Vary: Accept

    {
        "detail": "Method \"GET\" not allowed."
    }

To solve this you just need to add an implementation for .get() and .post() methods :

    class family_list(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):

        queryset = Family.objects.all()
        serializer_class = FamilySerializer
        
        def get(self, request, *args, **kwargs):
            return self.list(request, *args, **kwargs)

        def post(self, request, *args, **kwargs):
            return self.create(request, *args, **kwargs)

You just bind .get() and .post() to the appropriate methods inherited from the mixins .

Now we should get our data from this endpoint :

    GET /families/
    HTTP 200 OK
    Allow: GET, POST, HEAD, OPTIONS
    Content-Type: application/json
    Vary: Accept

    {
        "count": 2,
        "next": null,
        "previous": null,
        "results": [
            {
                "reference": "FM001",
                "title": "FAMILY 001",
                "description": "Family 001",
                "unit": "kg",
                "minQuantity": 0.0
            },
            {
                "reference": "FM001",
                "title": "FAMILY 001",
                "description": "Familly 001",
                "unit": "kg",
                "minQuantity": 1.0
            }
        ]
    }

GenericAPIView provides the core functionality ,the mixins provide .list() and .create() operations but we need 
to explicitly bind get() and post() to the appropriate operations . 

We can also do the same to detail views .Lets take another example :

    class family_detail(mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin,generics.GenericAPIView):
        
        queryset = Family.objects.all()
        serializer_class = FamilySerializer

        def get(self, request, *args, **kwargs):
            return self.retrieve(request, *args, **kwargs)

        def put(self, request, *args, **kwargs):
            return self.update(request, *args, **kwargs)

        def delete(self, request, *args, **kwargs):
            return self.destroy(request, *args, **kwargs)    

<h2>Adding URLs or Endpoints </h2>

Now that we have created views either by using long function based views or by using generic class based views It's
time to create urls or mappings between API endpoints and views .

Open <em>urls.py</em> then add 

    from django.conf.urls import url
    from django.contrib import admin

    from inventory import views

We import the necessary tools then we add the url mappings : 


    urlpatterns = [
        url(r'^admin/', admin.site.urls),
        url(r'^products/$', views.product_list),
        url(r'^products/(?P<pk>[0-9]+)$', views.product_detail),
        url(r'^families/$', views.family_list.as_view()),
        url(r'^families/(?P<pk>[0-9]+)$', views.family_detail.as_view()),
        url(r'^locations/$', views.location_list.as_view()),
        url(r'^locations/(?P<pk>[0-9]+)$', views.location_detail.as_view()),
        url(r'^transactions/$', views.transaction_list.as_view()),
        url(r'^transactions/(?P<pk>[0-9]+)$', views.transaction_detail.as_view()),
    ]


For function based views we use the view function directly .For class based views we use the .as_view() method 
of the class . 

<h2>Testing our Products Inventory Manager API </h2>

You should now be able to run your server and start playing with diffrent API endpoints

/products/ 

/families/

/locations/ 

/transactions/

You can also use the admin interface(/admin/) to submit some data .

If you can not login you can create a super user with :

    python manage.py createsuperuser 

Then enter you chosen username and password .

P.S 
----------
----------

If you get an error saying :

`HyperlinkedRelatedField` requires the request in the serializer context. Add `context={'request': request}` when instantiating the serializer.

You can simply add <em>context={'request': request}</em> when serializing models which refer to related models .  

For Products :

    serializer = ProductSerializer(products,context={'request': request} ,many=True)

For Transactions : 

    serializer = TransactionSerializer(transactions,context={'request': request} ,many=True)


If you get an <b>ImproperlyConfigured</b> exception saying :
	
Could not resolve URL for hyperlinked relationship using view name "location-detail". You may have failed to include the related model in your API, or incorrectly configured the `lookup_field` attribute on this field.

You just need to specify the correct endpoint for the corresponding detail endpoint :

Because it's a HyperlinkedModelSerializer your serializer is trying to resolve the URL for the related Location on your Product instance.



