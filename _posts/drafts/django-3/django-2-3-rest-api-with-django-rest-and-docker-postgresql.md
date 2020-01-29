# Django Rest Framework API Setup w/ JSONApi and Postgres Database

![](https://miro.medium.com/max/30/0*x-8VJUbpbIXLAmUb.png?q=20)

![](https://miro.medium.com/max/600/0*x-8VJUbpbIXLAmUb.png)

# Django Rest Framework API Setup w/ JSONApi and Postgres Database

[](https://medium.com/@johnking_75842?source=post_page-----2cd11038b43b----------------------)

![John King](https://miro.medium.com/fit/c/48/48/0*2leYIk55440mVasX.)

[John King](https://medium.com/@johnking_75842?source=post_page-----2cd11038b43b----------------------)

Follow

[Jul 6, 2019](https://medium.com/@johnking_75842/django-rest-framework-api-setup-w-jsonapi-and-postgres-database-2cd11038b43b?source=post_page-----2cd11038b43b----------------------)  · 8 min read

It is common today to see web applications that are made up of a front end app (commonly written in Javascript) and a backend app that is written in some server side language (Java, Python, Javascript, Ruby, etc.). Frequently, the client side app will request data from that server side app using RESTful calls. This has become so common that many frameworks have implemented libraries that make setting up this kind of server side application less painful than setting it up from scratch would be.

Let’s set up a rest api using the Django Rest Framework and Django.

## Things used in this tutorial:

-   Python (setting specific version with pyenv)
-   Django (w/ Django Rest Framework)
-   JSONApi (for structuring responses)
-   Postgres Database (using docker-compose locally)

## Let’s get started

For this tutorial, you will need to use python v 3.6.8. Most systems will have python already installed, but typically you will find version 2.7.

There are multiple different ways to install different versions of python, but my favorite is using pyenv.

## Install pyenv

Clone the pyenv repo into the directory where you want it to live on your machine (here I use ~/.pyenv)

$ git clone https://github.com/pyenv/pyenv.git ~/.pyenv

Define environment variable  `PYENV_ROOT`

$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile  
$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile

Add  `pyenv init`  to your shell to enable shims and autocompletion

$ echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n eval "$(pyenv init -)"\nfi' >> ~/.bash_profile

Restart your shell so the path changes take effect.

$ exec "$SHELL"

You should now have the pyenv command available to you in the terminal, however you will need to make sure you have installed python build dependencies before you try to install a new version of python. This could vary depending on the environment. I am completing these steps for the mac environment. However, if you are working on linux or windows, you can refer to this page  [https://github.com/pyenv/pyenv/wiki](https://github.com/pyenv/pyenv/wiki)  for further instructions

If you haven’t done so, install Xcode Command Line Tools (`xcode-select --install`) and  [Homebrew](http://brew.sh/). Then:

brew install openssl readline sqlite3 xz zlib

Now lets install python 3.6.8

$ pyenv virtualenv 3.6.8 myvenv

Now if you type pyenv versions you should see 3.6.8 listed. Navigate to the directory where you plan to create your django application. Now set a local version for python here using pyenv. This will ensure that this project always uses version 3.6.8, but it will not effect the global python version.

$ cd /path/where/you/plan/to/create/django/project  
$ pyenv local 3.6.8

You should now have version 3.6.8 as the default version for this directory

## Create the Django project

It is common practice to create a virtual environment for python projects. This ensures that the dependencies for a particular project are scoped only to that particular project. It essentially creates a sandbox for that project to help with version collisions that can occur when using a global scope for multiple projects.

Let’s install virtualenv

$ pip install virtualenv

Now create a new virtual environment

$ virtualenv .venv

After that runs, you will need to activate that virtual environment

$ source ./.venv/bin/activate

You should now see (.venv) prefixed in your command line in the terminal indicating that the virtual environment is active. Now let’s install django and djangorestframework

pip install django  
pip install django-filter  
pip install djangorestframework

Now we can create the new project. I have seen different naming conventions, but I tend to name the main project as ‘app’

$ django-admin startproject app .

Now, lets create a new module in the project

$ django-admin startapp posts

This will create a structure like this:

|____migrations  
| |______init__.py  
|____models.py  
|______init__.py  
|____apps.py  
|____admin.py  
|____tests.py  
|____views.py

In the root level of the project, run:

$ pip freeze > requirements.txt

This can be used for installing the dependencies easily in the future

We also need to add the rest_framework and the posts app to the installed_apps section of the settings.py file

![](https://miro.medium.com/max/30/1*8ekkk151d8UUAWcXLWpfvQ.png?q=20)

![](https://miro.medium.com/max/734/1*8ekkk151d8UUAWcXLWpfvQ.png)

You can run the app by running the following command in the terminal

$ python manage.py runserver 0.0.0.0:8100

## Set up a postgres container using docker

Docker is a tool that uses containers to allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package.

We will be creating a postgres container that our django app will read from and write to

First, you will need to ensure that you have installed docker and docker-compose before you start. If you need help getting those installed, you can check these links

[https://docs.docker.com/v17.12/install/](https://docs.docker.com/v17.12/install/)

[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

Once you have those installed, create a file named docker-compose.yml in the root directory of your project and add these contents to the file

version: '2'  
services:  
db:  
image: postgres:9.5  
environment:  
- POSTGRES_USER:db_user  
- POSTGRES_PASSWORD:password  
- POSTGRES_DB:posts  
ports:  
- "5432:5432"  
volumes:  
- ./docker/postgresql/data:/var/lib/postgresql/data

After saving those changes to the docker-compose.yml file, you can run close that file and from the root directory of the project, run:

$ docker-compose up

This will start up the postgres database container. In the docker-compose.yml, you are:

-   configuring the user, password and database name
-   forwarding port 5432 so that the same port is mapped to the host and the container
-   and setting up a volume so that the data that you save to the database will be stored in there and persisted
-   *** One note if you are using a mac, you will need to use the docker app to give permissions for docker to be able to mount a volume in your file system. Otherwise it will give a permissions error**

We need to create the database, user and role in postgres inside the docker container. In order to do this, you will need to determine the name of your container. Inside the top level directory of your project (where your docker-compose.yml file is at) type:

$ docker-compose ps

This should show something like this:

![](https://miro.medium.com/max/30/1*5YtUXTZ_i2G5VTWDV6cBDA.png?q=20)

![](https://miro.medium.com/max/1194/1*5YtUXTZ_i2G5VTWDV6cBDA.png)

In this case ‘python-django_db_1’ would be the container name

We will now run commands inside the docker container from our host machine

$ docker exec -it YOUR_CONTAINER_NAME psql -U postgres -c "CREATE DATABASE YOUR_DB_NAME;"  
$ docker exec -it YOUR_CONTAINER_NAME psql -U postgres -c "CREATE USER YOUR_USER_NAME SUPERUSER PASSWORD 'YOUR_PASSWORD';"  
$ docker exec -it YOUR_CONTAINER_NAME psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE YOUR_DB_NAME TO YOUR_USER_NAME;"

You will need to replace YOUR_CONTAINER_NAME, YOUR_DB_NAME, YOUR_USER_NAME, YOUR_PASSWORD with the correct values for your project

You will now need to connect your django app to the postgres database

## Connect Django app to Postgres database

You will need to install the psycopg2 package.

However, in order for psycopg2 to build, you will need pg_config to be made available. Without installing the full postgres on your local machine, you can run:

brew install libpq

After that installs, you will need to update your PATH variable in bash_profile

$ echo 'export PATH="/usr/local/opt/libpq/bin:$PATH"' >> ~/.bash_profile

(You may need to open a new terminal window for your changes to .bash_profile to take effect) Now you should be able to install psycopg2 successfully

$ pip install psycopg2

Replace the default database config in the YOUR_PROJECT_NAME/app/settings.py files with:

DATABASES = {  
'default': {  
'ENGINE': 'django.db.backends.postgresql_psycopg2',  
'NAME': 'posts',  
'USER': 'user',  
'PASSWORD': 'password',  
'HOST': 'localhost',  
'PORT': '' # set to empty string for default  
}  
}

Check that you are able to fire up the django api and it runs successfully. Run python manage.py runserver 0.0.0.0:8100 and you should see something similar to:

![](https://miro.medium.com/max/30/1*aFFr77cS28WqV3zzyS-UCQ.png?q=20)

![](https://miro.medium.com/max/760/1*aFFr77cS28WqV3zzyS-UCQ.png)

Now that the database is set up and connected to the django app, we need to migrate the database to initialize all of the django specific tables in the database. Run:

$ python manage.py migrate

If the migrations ran correctly, you should now have the database set up and ready to go

One last thing here, let’s create a superuser in the database

$ python manage.py createsuperuser

Follow the prompts in the terminal to add a username, email and password. Now you should have an admin user created in your database.

## Install and set up djangorestframework-jsonapi

JSON:API is a specification for building apis. It is commonly used with front end frameworks like Emberjs. Djangorestframework-jsonapi makes it pretty easy to serialize your data into the json:api structure.

$ pip install djangorestframework-jsonapi

Don’t forget to run pip freeze to update your requirements.txt:

$ pip freeze > requirements.txt

You will need to add a block of code to the YOUR_PROJECT_DIR/app/settings.py file

REST_FRAMEWORK = {  
'PAGE_SIZE': 10,  
'EXCEPTION_HANDLER': 'rest_framework_json_api.exceptions.exception_handler',  
'DEFAULT_PAGINATION_CLASS':  
'rest_framework_json_api.pagination.JsonApiPageNumberPagination',  
'DEFAULT_PARSER_CLASSES': (  
'rest_framework_json_api.parsers.JSONParser',  
'rest_framework.parsers.FormParser',  
'rest_framework.parsers.MultiPartParser'  
),  
'DEFAULT_RENDERER_CLASSES': (  
'rest_framework_json_api.renderers.JSONRenderer',  
'rest_framework.renderers.BrowsableAPIRenderer',  
),  
'DEFAULT_METADATA_CLASS': 'rest_framework_json_api.metadata.JSONAPIMetadata',  
'DEFAULT_FILTER_BACKENDS': (  
'rest_framework_json_api.filters.QueryParameterValidationFilter',  
'rest_framework_json_api.filters.OrderingFilter',  
'rest_framework_json_api.django_filters.DjangoFilterBackend',  
'rest_framework.filters.SearchFilter',  
),  
'SEARCH_PARAM': 'filter[search]',  
'TEST_REQUEST_RENDERER_CLASSES': (  
'rest_framework_json_api.renderers.JSONRenderer',  
),  
'TEST_REQUEST_DEFAULT_FORMAT': 'vnd.api+json'  
}

## Set up the posts app

Let’s add a Post model to the posts app

In the posts/models.py files, add this:

from django.db import models  
from django.contrib.auth import get_user_model

User = get_user_model()

  
class Post(models.Model):  
user = models.OneToOneField(User, on_delete=models.CASCADE)  
name = models.CharField(max_length=255)  
content = models.TextField()  
created_on = models.DateTimeField(auto_now_add=True)

Next we need to create a serializer for this model. Create a file in the posts app directory called serializers.py and add this code to that file:

from rest_framework_json_api import serializers

from .models import Post

  
class PostSerializer(serializers.ModelSerializer):

class Meta:  
model = Post  
fields = '__all__'

Next we need to create a view. Add this code to the posts/views.py file:

from rest_framework import viewsets

from .models import Post  
from .serializers import PostSerializer

  
class BaseViewSet(viewsets.ModelViewSet):  
def get_queryset(self):  
return self.model.objects.all()

  
class PostViewset(BaseViewSet):  
serializer_class = PostSerializer  
model = Post

Next we need to create a urls.py file in the posts folder. Create that file and add this code:

from django.conf.urls import include, url  
from rest_framework import routers

from .views import PostViewset

api_router = routers.SimpleRouter()  
api_router.register(r'posts', PostViewset, base_name='post')

urlpatterns = [  
url(r'', include(api_router.urls))  
]

Next, since we created a new model, we will need to migrate the database. Run these two commands:

python manage.py makemigrations  
python manage.py migrate

At this point, you can run the app and visit localhost:8100/api/posts/

python manage.py runserver 0.0.0.0:8100

You should see something like:

![](https://miro.medium.com/max/30/1*KRVu9t_y6ekxFkopHbTBuw.png?q=20)

![](https://miro.medium.com/max/2452/1*KRVu9t_y6ekxFkopHbTBuw.png)

You can use the form at the bottom of this page to post data and create a record

![](https://miro.medium.com/max/30/1*auPvdI065E13BrhIeuh13w.png?q=20)

![](https://miro.medium.com/max/2500/1*auPvdI065E13BrhIeuh13w.png)

After doing so, you should see something like this in the payload body:

![](https://miro.medium.com/max/30/1*6mTF2igQS5UX9rHTZm5F8A.png?q=20)

![](https://miro.medium.com/max/2334/1*6mTF2igQS5UX9rHTZm5F8A.png)

At this point, you have now set up a django rest framework api that works locally with postgres database running in a docker container that returns json:api structured payloads!
