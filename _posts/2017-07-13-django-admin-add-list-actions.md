---
layout: post
title: "How to Add Django Admin Custom List Actions "
image: "images/content/django-admin-add-list-actions.png"
excerpt: "How to easily add custom actions to Django Admin Lists" 
tags : django 
---

{% include image.html 
    img="images/content/django-admin-add-list-actions.png" 
    title="How to Add Django Admin Custom List Actions" 
%}


Django has an Admin package which can be used to scaffold a full CRUD application based on your registered models .
This is very useful for prototyping or even for creating working applications .

The Admin application is also extensible so you can very easily customize or extend the generated app to meet your 
preferences and requirements .    

Lists views in Django Admin are used to show a specific registered model data in tabular format with default bulk actions that can 
be applied to selected rows .  

In this tutorial we will see how to extend the Django Admin List views with custom actions .

<h2>Adding Custom List Actions </h2>

Actions in Admin app are just regular Python functions that have three parameters :

A ModelAdmin 

An HttpRequest 

A QuerySet 

So to add a cutsom action you need to add an action function in admin.py module where you register your models .

Lets take a simple real example .

First create a Django project then create an app then in :

In models.py module we add this Product model 

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
        
        #family = models.ForeignKey('Family')
        #location = models.ForeignKey('Location')
        
        def get_absolute_url(self):
            """
            Returns the url to access a particular instance of Product.
            """
            return reverse('product-detail-view', args=[str(self.id)])
        
        def __str__(self):
            
            return self.title

In admin.py module we register the Product model to add it to admin app 

    # -*- coding: utf-8 -*-
    from __future__ import unicode_literals

    from django.contrib import admin
    
    class ProductAdmin(admin.ModelAdmin):
        list_display = ['sku', 'title', 'unit', 'unitCost', 'quantity']

    admin.site.register(Product , ProductAdmin)

This tells the Admin App to show Product model data in a table with only these fields 

    'sku', 'title', 'unit', 'unitCost', 'quantity'

Which we have specified in list_display field of our ModelAdmin .    

And you will get a default action to delete the selected rows in bulk .

Now lets say you want to add a custom action to the list which sets the quantity to zero for the selected rows or 
products in our example .

To do that we just need to create an Action function an add it to actions field of our ModelAdmin .

    def set_quantity_zero(modelAdmin, request, queryset):
        for product in queryset:
            product.quantity = 0
            product.save()

    set_quantity_zero.short_description = 'Set Quantity to Zero'

    class ProductAdmin(admin.ModelAdmin):
        list_display = ['sku', 'title', 'unit', 'unitCost', 'quantity']
        actions = [set_quantity_zero, ]

    admin.site.register(Product , ProductAdmin)

You can also add your action functions as methods of your ModelAdmin 


    class ProductAdmin(admin.ModelAdmin):
        list_display = ['sku', 'title', 'unit', 'unitCost', 'quantity']
        actions = ['set_quantity_zero', ]

        def set_quantity_zero(self, request, queryset):
            for product in queryset:
                product.quantity = 0
                product.save()

        set_quantity_zero.short_description = 'Set Quantity to Zero'


You can now add some products with some quantities and go to your Products List ,select some of them and choose the action Set Quantity to Zero
from the actions dropdown menu .

Conclusion 
--------------------
--------------------

The Django Admin application is a very powerful feature of Django that can be extended and customized for your own 
requirements . 
