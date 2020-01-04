---
layout: post
title: "Angular 2+ with Django Rest Framework tutorial (Part 3): Create database models "
image: "images/content/drf-angular-2.png"
excerpt: "Django REST framework (DRF) and Angular 2+ tutorial (Part 3)" 
tags : "django"
---

{% include image.html 
    img="images/content/drf-angular-2.png" 
    title="Django REST framework (DRF) and Angular 2 tutorial (Part 3)" 
%}

This is part 3 of our tutorial series to learn how to use Django Rest Framework with Angular 2+ by building 
a simple product inventory manager .


<a href="/django-rest-framework-angular-2" target="_blank">Django REST framework (DRF) with Angular 2+ tutorial (Part 1)</a>

<a href="/django-rest-framework-angular-2-part-2" target="_blank">Django REST framework (DRF) with Angular 2+ tutorial (Part 2)</a>

<a href="/django-rest-framework-angular-2-part-3" target="_blank">Django REST framework (DRF) with Angular 2+ tutorial (Part 3)</a>


On the first part we have installed Django and created the server side project .

On the second part we have installed Angular 2+ and created the client side project .

In this part we are going to create a Django app and database models  .

<h3>Creating the Django app </h3>

Lets start by creating a Django app so head over to your terminal and enter :

    cd ProductInventoryManager 
    python manage.py startapp core 

Then open your project <em>settings.py</em> and add this app to the list of installed apps 

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'rest_framework',
        'core'
    ]

Now we are ready to add database models .

Open <em>core/models.py </em> and get ready to add models .

<h3>Creating database models </h3>

Users can create products ,families ,locations and add transactions .A product belongs to a family of products and
has a location .To move products out or in the stock we use make a transaction .

A Family has these attributes : reference , title and description .


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

A Location has these attributes : reference , title and description .


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

A Product has these attributes : Title ,Description ,Unit Price ,SKU (Stock Keeping Unit)  , Barcode (ISBN, UPC etc.) ,Quantity ,minQuantity ,Unit .


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

A Transaction has these attributes : Date , Quantity , Unit Cost , Reason (New Stock - Usable Return - Unusable Return ) 
,UPC (Universal Product Code ) ,Comment .


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



Now you should be able to migrate your database to create actual tables .

Head over to your terminal and enter :

    python manage.py makemigrations 
    python manage.py migrate 


Conclusion 
----------------
----------------

This is the end of the part 3 .We have created a Django app and different Django models for our simple 
product inventory manager based on Angular 2+ and Django Rest Framework .


    

