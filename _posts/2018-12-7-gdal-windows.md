---
layout: post
title: "Installing GDAL 2+ on Windows 7 & Windows 10"
image: "images/content/gdal.png"
excerpt: "In this post, you'll be seeing some easy ways to quickly download and install GDAL 2 on Windows 7 & Window 10. Remember that you can always resort to compile your own GDAL 2 binary from the source using Microsoft Visual Studio but this can only be required if you need the latest developed version that's not yet available from these repositories.
" 
tags : [gdal]
---

[GDAL](https://www.gdal.org/) stands for **Geospatial Data Abstraction Library** and it’s a popular open-source library for processing and manipulating [GIS data formats](https://en.wikipedia.org/wiki/GIS_file_formats).

In Windows 7 or Windows 10, you have many ways that you can follow to easily install GDAL 2+

## Installing GDAL 2 in Windows Using GISInternals

Tamas Szekeres maintains a repository for [GDAL Windows installers](http://www.gisinternals.com/release.php) that you can access from the provided link and grab the  GDAL installer for your wanted version.

[​GISInternals](http://www.gisinternals.com/sdk/)  maintained by Tamas Szekeres provides a set of installers of both Win32 and Win64 versions that are compiled with Microsoft Visual Studio.

After installing GDAL using the download installer, you need to configure your PATH environment variable in your system by adding the path for your GDAL installation to the variable so Windows knows where to find the correct binaries. 

>Alternately, you can also create a new `GDAL_DATA` variable provide the path to GDAL (for example`C:\Program Files  (x86)\GDAL\gdal-data`) as the value. 

## Installing GDAL in Windows Using OSGeo4W

If you somehow have any problem installing GDAL in your Windows system using installers from GISInternals. There is another easy alternative way. You can use [OSGeo4W](https://trac.osgeo.org/osgeo4w/) to install GDAL.  

OSGeo4W provides a complete development environment that contains all the required tools to work with with geographic data.

You can install OSGeo4W just like any typical Windows program using an installation Wizard that guides step by step throughout the whole process and configure your system accordingly.

In nutshell, this is what you need to do in order to install OSGeo4W:

1.  First head over to download page of OSGeo4W. For the **32bit** version check this [page](http://download.osgeo.org/osgeo4w/osgeo4w-setup-x86.exe)  or this [page](http://download.osgeo.org/osgeo4w/osgeo4w-setup-x86_64.exe)  for the **62bit** version. Please note that these links only provide the OSGeo4W network installer so you will still need a Internet connection to compete the installation process,
2. After downloading the network installer, simply run it,
3. Next, you need to select  the **Express Install** option , and then click  the **Next** button,
![Install GDAL 2](https://i.imgur.com/MnbBkEq.png)

5.  Next, you need to choose the packages you want to install (in our case we only need GDAL), and then click on the   **Next** button,
6.  Finally, wait for the chosen package(s) to be downloaded and installed by the wizard.

![Install GDAL 2 on Windows](https://i.imgur.com/iLpdDeP.png)

Please note that OSGeo4W provides a distribution for a many open source geospatial libraries for Windows XP, Windows 7 and Windows 10. OSGeo4W provides [​QGIS](http://qgis.org/), [​GDAL](http://www.gdal.org/), [​GRASS](http://grass.osgeo.org/) as many other packages that you can check from this page in the [official website](https://trac.osgeo.org/osgeo4w/wiki/PackageListing).

## Conclusion 

In this post, you've seen some easy ways to quickly download and install GDAL 2 on Windows 7 & Window 10. Remember that you can always resort to compile your own GDAL 2 binary from the source using Microsoft Visual Studio but this can only be required if you need the latest developed version that's not yet available from these repositories.
   
