---
layout: post
title: "Django GIS Tutorial: GeoDjango and PostGIS"
image: "images/content/django.png"
excerpt: "In this tutorial, you will learn to use GeoDjango with Django apps to create GIS apps" 
tags : []
skip: true
---

GeoDjango is a geographic sub-framework of Django that allows developers to build GIS-based and location aware web applications.


After completing this tutorial, you'll acquire the following skills:

- You'll learn to use Django and Django management commands to create web projects.
- You'll learn to use GeoDjango to build GIS and location aware web applications.
- You'll learn to set up and use spatial databases with PostgreSQL via the PostGIS extender.

In this tutorial, you'll first get introduced to GeoDjango and you'll install the required dependencies for using GeoDjango in your Ubuntu, Windows or macOS system, such as GDAL 2, GEOS and PROJ.4.

## Prerequisites

Before, you can start using Django and GeoDjango,  you'll need a few prerequisites. On your development machine, you need to have:

- A recent version of Python 3 installed (Python **3.7** is the newest), 
- The `pip` and `venv` tools (Recent versions of Python 3 comes with both of them bundled as modules)
- The PostgreSQL database management system (alternatively you can also use SQLite for database in development)

You also need a basic knowledge of Python 3. As for Django, we'll be seeing all the required steps to create a web application from scratch and step by step so you can follow this tutorial even if you are a beginner Django developer.

## Tutorial Steps

You are going to achieve the following tasks in this tutorial:

- You'll create a virtual environment using `venv`,
- You'll install Django, 
- You'll setup your development environment for GeoDjango development by installing the required GeoDjango dependencies such as GDAL, GEOS and PROJ.4
- You'll create a Django project, configure GeoDjango and implement the application features.


## Introducing GeoDjango

GeoDjango stands for Geographic Django and it's a framework that makes part of Django and can be used for creating applications which make use of geospatial or geographic data. These applications can be either full-fledged GIS (Geographic Information System) systems or simple web location based applications.  

The great thing about GeoDjango is its tight integration with the Django ORM which allows you to manipulate spatial data in geospatial databases like PostGIS, Oracle or MySQL or any other database from high level API that abstracts the differences between the different implementations and also the complexities related to spatial queries.
  
You can use GeoDjango to make queries that find the distances between two locations on earth and the areas of objects among other things. 

GeoDjango requires a spatial database and the following libraries installed on your system:

-  GEOS  that stands for Geometry Engine Open Source and implements the  [OCG Simple Feature for SQL specification](http://www.opengeospatial.org/standards/sfs).
    
- [GDAL](https://www.gdal.org/) that stands for Geospatial Data Abstraction Library. It’s an open-source library that abstracts working with [GIS data formats](https://en.wikipedia.org/wiki/GIS_file_formats).
    
- [PROJ.4](https://proj4.org/)  that stands for Cartographic Projections library and implements the required APIs for working with spatial reference systems and projections.

## Installing the Geospatial Libraries (GDAL and PROJ.4)

GeoDjango requires the open source GDAL, GEOS and PROJ.4 libraries for working with spatial databases, spatial reference systems, GIS data formats and performs mathematical operations related to geography and locations.

### Installing GEOS on Ubuntu 

You can install GEOS on Ubuntu using this command:

```bash
$ sudo apt-get install libgeos-dev
```

### Installing GEOS on macOS

You can install GEOS on macOS using Homebrew via this simple command:

```bash
$ brew install geos
```

### Installing PROJ.4 on Ubuntu 

PROJ.4 is cartographic projections library that's onlt required if you are using a SQLite database with the SpatiaLite extension  or PostgreSQL with the PostGIS extension. 
 
You can install the binary for PROJ.4 in Ubuntu using the following command:

```bash
$ sudo apt-get install binutils libproj-dev
```

### Installing PROJ.4 on macOS

To install PROJ.4 on macOS using the following command:

```bash
$ brew install proj
```
 
### Installing GDAL 2.2+ on Ubuntu

You can install GDAL 2.2 in different ways depending on your operating system.

For Ubuntu, you can use the following command:

```bash
$ sudo apt-get install gdal-bin libgdal-dev
$ sudo apt-get install python3-gdal   
```

>A new UbuntisGIS is available on [​UbuntuGIS launchpad](https://launchpad.net/~ubuntugis) and provides recent packages of GDAL for recent Ubuntu distributions. For more information, you can check the [​UbuntuGIS](https://wiki.ubuntu.com/UbuntuGIS)page.

### Installing GDAL 2 on Windows

For Windows, you can go to [Tamas Szekeres’ Windows binaries](http://www.gisinternals.com/release.php) and download the  GDAL installer.

> [​GISInternals](http://www.gisinternals.com/sdk/)  maintained by Tamas Szekeres contains a complete set of Win32 and Win64 binary packages (compiled with VC2005/VC2008/VC2010/VC2012/VC2013).

Make sure you configure the path to the GDAL binaries in your system using system variables.

Simply, create a new `GDAL_DATA` variable and then add the path (for example`C:\Program Files  (x86)\GDAL\gdal-data`) to GDAL as the value. You can also just add GDAL installation folder to the `PATH` environment Variable

You can also install GDAL on Windows using [OSGeo4W](https://trac.osgeo.org/osgeo4w/) which sets up a complete environment with the required tools for working with geographic data.

These are the requires steps that you can follow:

1.  Go to the website and grab the  OSGeo4W network installer. For [the ​32bit version](http://download.osgeo.org/osgeo4w/osgeo4w-setup-x86.exe)  or  [​for the 64bit version](http://download.osgeo.org/osgeo4w/osgeo4w-setup-x86_64.exe),  
2.  Next, start the network installer.
3.  You'll have many options, choose  **Express Install** and click on **Next**.
4.  Next, choose the packages you want to install. Since we want GDAL, un-select all the other packages  and click on  **Next**.
5.  After that, all the required packages will be downloaded and installed automatically in your Windows system.

If you can't find the icon on desktop, you can look on the start menu for the **OSGEO4W Shell** to start a shell where you can run GDAL commands.

To verify the instaled version of GDAL, you can run the following command in the OSGEO4W Shell:

```bash
C:\>gdalinfo --version
GDAL 2.3.2, released 2018/09/21
```

>OSGeo4W provides a complete distribution of a many open source geospatial libraries for Windows XP, 7 & 10. OSGeo4W. This includes [​QGIS](http://qgis.org/), [​GDAL](http://www.gdal.org/) and [​GRASS](http://grass.osgeo.org/) among many other packages that you can check from [this page](https://trac.osgeo.org/osgeo4w/wiki/PackageListing).

### Installing GDAL 2 on macOS

For macOS, you also have different options for installing GDAL 2 which includes:

- Using Conda and a virtualenv
- Using Homebrew, the official package manager for macOS,
- Using the “GDAL Complete” Framework installer from [kyngchaos.com](http://www.kyngchaos.com/software/frameworks), and adding GDAL Framework to your path after installation. 

### Installing GDAL 2 on macOS using “GDAL Complete” Framework

In order to install GDAL using this approach, you can simpy follow these steps:

1. First, launch the installer from the **Downloads** folder and wait for the packages to be downloaded.
2. Search for the `*.pkg` files in the folder (both `gdal.pkg` and `numpy.pkg`), launch them and follow the setup wizards.

Next, you need to configure the path to your GDAL installation folder.  You have two methods:

Open a Terminal and run the following command:  

```bash
$ export PATH=/Library/Frameworks/GDAL.framework/Programs:$PATH
```

You can also run the following command:

```bash 
$ echo 'export PATH=/Library/Frameworks/GDAL.framework/Programs:$PATH' >> ~/.bash_profile` `source ~/.bash_profile
```

This will persist the command throughout sessions.

### Installing GDAL 2 in macOS via Homebrew 

in macOS, you can use the Homebrew package manager to install GDAL 2 using the following command:

```bash
$ brew install gdal2
``` 

You can check for the installed version of GDAL using the `gdal-config` command:

```bash
$ gdal-config --version
```

Or also using `gdalinfo` via the following command:

```bash
$ gdalinfo  --version 
```

You should get the installed version of GDAL. Otherwise the command will not be recognized by your system.

You can find more information how to download GDAL for the different system from [the official websites of GDAL](http://trac.osgeo.org/gdal/wiki/DownloadingGdalBinaries).

## Creating a Virtual Environment & Installing Django

On Python 3, you can use the `venv` module to create a virtual environment for your project:

```bash
$ python -m venv env
``` 

Next, you need to activate in your current terminal window using the `source` command:

```bash
$ source env/bin/activate
```

That's it! You can now start installing the required package(s).

You can install Django from PyPI using `pip`:

```bash
$ pip install django
```

## Creating a Django Project

You can now create a Django project using the `django-admin.py` script which will be available in your terminal once your activate the virtual environment and install Django inside it:

```bash
$ django-admin.py startproject restaurants
```
## Installing PostgreSQL

In your terminal, run the following command to install PostgreSQL in your system if it's not already installed:

```bash
$ sudo apt-get install postgresql
```

## Creating a PostgreSQL Database

 Create a database using the following command:

```bash
$ sudo -u postgres createdb mydb
```

You also need to install the `psycopg2` PostgreSQL adapter for Python using `pip`

```bash
$ pip install psycopg2-binary
```

## Installing PostGIS in your Database

You first need to connect to your created database using `psql`:

```bash
$ sudo -u postgres psql -d mydb
```

Next, you can to enable the `postgis` extension in your database:

```bash
$ CREATE EXTENSION postgis;
```

### Configuring the PostgreSQL Database

Open the  `settings.py`  file and add  `django.contrib.gis.db.backends.postgis`  as the engine and use your database credentials to connect to your PostgreSQL database:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'YOUR_POSTGIS_DATABASE_NAME',
        'USER': 'YOUR_DATABASE_USER_NAME',
        'PASSWORD': 'YOUR_DATABASE_USER_PASSWORD',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}
```

Change `YOUR_POSTGIS_DATABASE_NAME`, `YOUR_DATABASE_USER_NAME` and `YOUR_DATABASE_USER_PASSWORD` with your actual credentials.

## Setting up GeoDjango in your Project

You can add GeoDjango to your project it by adding the  `gis` module in your project's installed apps.

Open the  `settings.py`  file and add the  `'django.contrib.gis'`  module to the `INSTALLED_APPS`  array:

```python
INSTALLED_APPS = [
    # [...]
    'django.contrib.gis'
]
```

