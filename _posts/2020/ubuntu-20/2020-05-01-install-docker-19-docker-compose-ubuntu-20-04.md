---
layout: post
title: "Install Docker 19 and Docker Compose On Ubuntu 20.04 LTS Focal Fossa"
image: "images/content/ubuntu.png"
excerpt: "In this tutorial, we'll go step by step in the process of installing the latest version of docker v19 and Docker Compose on Ubuntu 20.04 LTS" 
categories: ubuntu
tags : [ubuntu ]
---


Docker is an open source virtualization and containerization technology for building and containerizing your applications. It's a tool that allows you to create isolated containers that can be used to run your apps. In this tutorial, we'll go step by step in the process of installing the latest version of docker v19 on Ubuntu 20.04 LTS. We'll also see how to install `docker-compose` which is an indispensable tool for running multiple docker containers in your machine. 

According to the [official docs](https://docs.docker.com/engine/):

>Docker Engine is an open source containerization technology for building and containerizing your applications. Docker Engine acts as a client-server application with:
>-   A server with a long-running daemon process [`dockerd`](https://docs.docker.com/engine/reference/commandline/dockerd).
>-   APIs which specify interfaces that programs can use to talk to and instruct the Docker daemon.
>-   A command line interface (CLI) client [`docker`](https://docs.docker.com/engine/reference/commandline/cli/).


We'll see how to: 

-   Install docker 19 from the official Ubuntu 20.04 repositories
-   Enable docker to start after the system reboot
-   Install `docker-compose` from the official Ubuntu repositories,
-   Install the latest `docker-compose` version from the GitHub repository.


Before you can install docker in your Ubuntu 20.04 machine, make sure you have access to your system as root or you have the `sudo` rights.

## How to Install Docker On Ubuntu 20.04 LTS Step by Step 

Let's now see the required steps to install the latest version of docker on Ubuntu 20.04 LTS.

Open a new terminal and run the following command:

```bash
$ sudo apt install docker.io
``` 

This will install the `docker.io` package from the official Ubuntu 20.04 repositories.

Wait for the process to complete and run the following command to start and set it to start after the system reboot:

```bash
$ sudo systemctl enable --now docker
```

Next, ensure you have docker installed by running the following command:

```bash
$ docker --version
```

You should have the docker version displayed in your terminal.

Finally, you can run docker test using the `hello-world` container:

```bash
$ docker run hello-world
```

You should get the following output:

```bash
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

## How to Install Docker-Compose on Ubuntu 20.04 

Now that we have installed docker on our machine, let's also see how we can install docker compose.

In this section, we'll see how to:


-   Install `docker-compose` from the official Ubuntu 20.04 repositories,
-   Install the latest `docker-compose` version from the official GitHub repository.

Compose is an accompanying tool for docker that makes it easy to set up and run multi-container docker apps. 

It allows you to automate creating and starting all the services required from running your app such as a database server and an HTTP server, etc. and communicate between all the entities without issues. 

According to the [official docs](https://docs.docker.com/compose/):

>Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. To learn more about all the features of Compose, see [the list of features](https://docs.docker.com/compose/#features).

### Install the Stable Docker-Compose Version from the Ubuntu Repository
  
In most cases, it's recommended that you install  `docker-compose` from an official Ubuntu repository for a stable version but in case you need the latest version that's not available from the official repositories, you can install it from the source code available from its GitHub repository.  
  

Head back to your terminal and run the following command to installing `docker-compose` using `apt`:

```bash    
$ sudo apt install docker-compose
```

Wait for the process to complete, next run the following command to check that `docker-compose` has been successfully installed:

```bash
$ docker-compose version
docker-compose version 1.21.0, build unknown
docker-py version: 3.4.1
CPython version: 3.7.5
OpenSSL version: OpenSSL 1.1.1c  28 May 2019    
```

### Install the Latest Docker-Compose Version from GitHub

If you want to install the latest available `docker-compose` version, you need to use the [repository from GitHub](https://github.com/docker/compose/releases) to build it locally:

```bash
$ sudo wget -O  /usr/local/bin/docker-compose https://github.com/docker/compose/releases/download/1.25.0/docker-compose-Linux-x86_64
$ sudo chmod +x /usr/local/bin/docker-compose
```

You can check the version using the following command:

```bash
$ docker-compose version
docker-compose version 1.25.0, build 0a186604
docker-py version: 4.1.0
CPython version: 3.7.4
OpenSSL version: OpenSSL 1.1.0l  10 Sep 2019
```

## Conclusion

We have seen the required steps for installing docker 19 and `docker-compose` in our Ubuntu 20.04 machine using the official Ubuntu repositories.

Docker is a powerful tool for creating development environments that provides you with lightweight containers which use the same kernel as your system but provides independent environment or operating systems for building and running your apps without interfering with the apps in your system or other containers.   
