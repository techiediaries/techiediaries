---
layout: post
title: "How to Customize Django Admin Application"
image: "images/content/customize-django-admin.png"
excerpt: "How to Customize Django Admin Application" 
tags : django 
---

{% include image.html 
    img="images/content/customize-django-admin.png" 
    title="How to Customize Django Admin Application" 
%}


Django Admin interface or app is a powerful feature of Django framework as it allows you to automatically scaffold a full 
featured CRUD application for your database models saving you from reinventing the wheel when building admin interfaces 
or back offices for your projects .It can also be used for building quick prototypes .

Most developers are not aware of the hidden power of Django admin so in this tutorial we are going to show you 
how we can extend it to customize its look and also its behavior with custom actions .

The Admin site is enabled by default in each generated Django project .

To create an admin site or back office you need to follow these predefined steps :

First create your database models in models.py 

Next register your models with Django Admin in admin.py module .

Customize the admin area with optional look or custom actions and views .

Lets use the models from a simple product inventory manager where we have 4 models : Product ,Family , Location and 
Transaction .

After creating a skeleton project with django-admin.py utility .You'll have Django admin already included and 
configured for you all you have to do is creating the models and register them .

<h2>Creating a Django app </h2>

Create a Django app inside your project and add your models inside your app models.py file :

    python manage.py startapp inventory 

<h2>Adding models </h2>

In inventory/models.py 

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


<h2>Registering models with the Admin Site</h2>

After adding models we are now ready to add register them with the Admin site .So open <em>inventory/admin.py</em>
and import the models and register them 

    # -*- coding: utf-8 -*-
    from __future__ import unicode_literals

    from django.contrib import admin

    from .models import Product ,Family ,Location ,Transaction  

    admin.site.register(Product)
    admin.site.register(Family)
    admin.site.register(Location)
    admin.site.register(Transaction)

We have followed the simplest way of registering models but as we have said before Django Admin is highly customizable 
and we will see how to customize it later in this tutorial .

Now lets continue by first creating a login for your admin site so we can sign in to our admin interface 

<h2>Creating a super user for Django Admin login</h2>

To add a super user or admin to your database simply invoke :

    python manage.py createsuperuser

The command will prompt you for a username and password .Once they are entered you will be able to use them 
to login to your Admin site .

Next run your server with :

    python manage.py runserver    

Then go to <em>http://127.0.0.1:8000/admin</em> with your browser .

Enter your admin login credentials and hit enter ,you should be presented with an admin interface with 
all registered models .

Play with your Admin interface by entering some products to see how admin site operates .

<h2>Advanced customization </h2>

Lets start by customize admin site wide parameters ,namely the site title and header 

    admin.site.site_header = "My Product Inventory ";
    admin.site.site_title = "My Product Inventory ";

Now lets further customize our admin interface .Here is what we can do :

In List or Change Views we can add more displayed fields (Django Admin displays one field by default)

Add filters in List views to show filtered data rows . 

Add custom actions 

Choose which fields to dispaly in detail views .

Add inline related models in editing views .

<h3>Customize List Views with ModelAdmin Classes </h3>

To customize how a model is dispayed in the admin interface we add a ModelAdmin when regsitering the model .

There are two methods ,lets see them with the Product model .

    class ProductAdmin(admin.ModelAdmin):
        pass 
        
    admin.site.register(Product , ProductAdmin)
 
or 

    @admin.register(Product)
    class ProductAdmin(admin.ModelAdmin):
        pass 

<h3>Adding fields to display </h3>
Now lets add the fields we want to display :

    class ProductAdmin(admin.ModelAdmin):
        list_display = ['sku', 'title', 'unit', 'unitCost', 'quantity']

<h3>Adding List filters </h3>

After adding the fields to display in list view of Products lets add filters to be able to display fitered 
rows 

We want to filter by SKU and UNIT :

    class ProductAdmin(admin.ModelAdmin):
        list_display = ['sku', 'title', 'unit', 'unitCost', 'quantity']
        list_filter = ('sku', 'unit') 

You'll get a filtering box to the right of the list view .


<h3>Customize Detail Views </h3>

The detail view displays the fields vertically ,in the order they are declared in their models but you can customize 
the order of display ,which fields are displayed or excluded and the form sections ,you can also display fields 
horizontally or vertically  and other things .

the fields attribute displays the specified the fields in the order they are specified and group them horizontally 
if they are grouped with tuples 

    class ProductAdmin(admin.ModelAdmin):
        list_display = ['sku', 'title', 'unit', 'unitCost', 'quantity']
        list_filter = ('sku', 'unit')
        fields = [('family','location'),('sku','barcode'), ('title','description'),('unit', 'unitCost'), ('quantity','minQuantity')]


<h3>Adding form sections or fieldsets </h3>

You can further customize detail views with fieldsets or sections using fieldsets attribute.

Lets add three sections with names Section 1 , Section 2 and Section 3 .

    class ProductAdmin(admin.ModelAdmin):
        list_display = ['sku', 'title', 'unit', 'unitCost', 'quantity']
        list_filter = ('sku', 'unit')
        #fields = [('family','location'),('sku','barcode'), ('title','description'),('unit', 'unitCost'), ('quantity','minQuantity')]
        fieldsets = (
            ('Section 1', {
                'fields': ('family','location')
            }),
            ('Section 2', {
                'fields': ('title','description')
            }),        
            ('Section 3', {
                'fields': ('sku','barcode','unit', 'unitCost','quantity','minQuantity')
            }),
        ) 


Conclusion 
---------------
---------------

That's it ! you have seen how to register your models with Django Admin site and how to customize the admin site 
for better display and also how to create a super user to login to your admin interface .


