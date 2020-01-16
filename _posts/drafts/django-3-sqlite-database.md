Database Setup
Almost all web applications use something called a database. In this django tutorial you will learn how to use a simple database called SQLIte3. If you'd like to use another database like MySQL click here.

Modifying settings.py
The first step to setting up our database is to tell django that we have added an application to our project and that it requires some setup. To do this we need to navigate to the settings.py file from within our interior site directory and add the following line to the installed apps section: 'main.apps.MainConfig', If you've named your application something other than main you will need to replace "main" and "Main" with the name of your application.

# Application definition

INSTALLED_APPS = [
'django.contrib.admin',
'django.contrib.auth',
'django.contrib.contenttypes',
'django.contrib.sessions',
'django.contrib.messages',
'django.contrib.staticfiles',
'main.apps.MainConfig', # <- add this
]

Migrations
Django has it's own version control system that is called migrations. Similar to GIT when you make a change that requires any new dependencies to be installed you need to tell django from the command line. Each change you make will be logged as a migration and can be viewed afterwards to allow you to revert to previous versions.

To tell django to start setting up our database use the following command (make sure you are in the directory containing manage.py).
$ python manage.py migrate


Now we should see an empty SQLite database in our directory.

Defining Models
Now that we have setup our database we need to define some models for storing information. To do this navigate to the models.py from inside our application folder. For this tutorial we will be creating a basic to-do list. This means we will need a model for a to-do list and for each of the items on our to-do list.

When we define a model we simply create a class that is the name of our model that inherits from models.Model. Then we define all of the fields or attributes of our model as class variables. We can also add methods to use on our models. We will create the two models as seen below:

from django.db import models

# Create your models here.
class ToDoList(models.Model):
name = models.CharField(max_length=200)

def __str__(self):
return self.name


class Item(models.Model):
todolist = models.ForeignKey(ToDoList, on_delete=models.CASCADE)
text = models.CharField(max_length=300)
complete = models.BooleanField()

def __str__(self):
return self.text

For a full list of the different fields you may use see here.

Making Migrations
Now that we've updated our models file we need to tell django to make changes to our database. To do this we use the following command:
python manage.py makemigrations main. If your app is named something else replace "main" with its name.

Finally to apply the migrations we use:
python manage.py migrate

Working With Our Database
Now that we've defined some models we can start adding information to our database. The commands shown below were executed in a python shell, however they can be used from your python files in the same/similar ways.

from main.models import Item, ToDoList # import will be different depending on script location

list1 = ToDoList(name="Tim's List") # create a ToDoList

list1.save() # saves the ToDoList in the database

print(list1.id) # prints 1, each list is given an id automatically

print(ToDoList.objects.all()) # prints all of the ToDoLists in the database

find_list = ToDoList.objects.get(name="Tim's list") # gets the ToDoList object(s) with name "Tim's List"

# Since we defined a relationship between Item and ToDoList each ToDoList has an "item_set"

print(list1.item_set.all()) # get all of the items on a ToDoList

list1.create(text="Go to the mall", complete=False) # add an item to the ToDoList

list1.name = "new name" # change the name of the list

list1.save() # save changes

list1.delete() # delete the list

We used these commands from the command line to demonstrate how they work. Typically you will just use these from your python scripts.