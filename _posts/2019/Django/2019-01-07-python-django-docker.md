---
layout: post
title: "Setting up Python & Django Environments with Docker and Compose"
image: "images/content/angular.png"
excerpt: "In this tutorial we'll learn how to use Docker and Compose to create a portable development environment for developing Django applications." 
tags : []
---

Docker provides developers with powerful features when it comes to creating development and production environments or packaging applications. It allows you to develop your application without depending on your operating system dependencies which may be, in most cases, different from other systems where you test or deploy your final application. As a developer you may have encountered situations where your application works fine in your system but once you take it elsewhere to test it, in a client machine or in a production environment, it stops working. This is usually due to missing dependencies. 

Docker provides the perfect solution for this common problem, as it allows you to create containers in which your applications run. These containers are created from lightweight images. They share the system kernel and resources and provide isolated environments that can be reproduced later in any other system (Linux, Windows or MAC).

Docker uses a `Dockerfile` to define and describe the app's environment as should be exactly in each created image.

Docker Compose is another tool that allows you to create multiple containers for the same application. For example, your application needs multiple services such as a database (for example MySQL), an application server (for example Gunicorn) and a static server (for example nginx) etc. Compose allows you to automate the process of creating a container for each service that your application needs.

Compose uses a YAML file with the name `docker-compose.yml` to define the services to create containers for your application.
  
In this tutorial we'll learn how to use Docker and Compose to create a portable development environment for developing Django applications.

## Creating the Dockerfile

The first step is creating the `Dockerfile`. This file contains the image and the commands that will be used to create and run a container.

So, create a `Dockerfile` inside some folder and add the first command:

```bash
FROM python:3  
```

This is simply telling Docker to pull and use a [system image (Ubuntu) with Python 3 installed](https://hub.docker.com/_/python/) from the Docker hub registry. The Ubuntu image is very lightweight as it's striped from all the unnecessary packages.


