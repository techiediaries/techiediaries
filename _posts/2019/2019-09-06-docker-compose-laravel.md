---
layout: post
title: "Using Laravel 6 with Docker and Docker-Compose"
image: "images/content/laravel.png"
excerpt: "In this tutorial we'll learn how we can use Docker/Docker-compose to develop and run Laravel 6 applications locally" 
tags : [laravel, laravel6, laravel-6-tutorials-and-examples, docker] 
---

In this tutorial, we'll learn how we can use Docker and Compose to develop and run Laravel 6 applications locally. Following this tutorial you'll learn:

- What's Docker and Docker-compose,
- How to install Docker and Docker-Compose,
- How to use Docker to install and run Laravel 6 applications.


Docker is a container tool that allows developers and organizations to build, run and deploy applications using containers.

[Containers](https://www.docker.com/what-container) are standalone images that allow developers to package applications with their dependencies. They share the kernel and resources of the system where they are running and they provide isolated environments for applications.

Docker makes use of `Dockerfile` files to define and describe the parts and dependencies used by an application and also commands to run in order to install the dependences and start the application.

## Installing Docker

start by installing Docker for your type of operating system by following one of these official guides:

-   [**Ubuntu**](https://docs.docker.com/engine/installation/linux/ubuntu/)
-   [**Windows**](https://docs.docker.com/docker-for-windows/install/)
-   [**MacOS**](https://docs.docker.com/docker-for-mac/install/)

## Docker-Compose

The [official documentation](https://docs.docker.com/compose/overview/) describes docker-compose as:
 
>A tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. To learn more about all the features of Compose, see [the list of features](https://docs.docker.com/compose/overview/#features).

Using docker-compose involves three easy steps:

1.  First, you need to define/describe your app environment with a `Dockerfile` so you can reproduce it anywhere.
    
2.  Second, you need to create `docker-compose.yml`  file and define the services required for running your application so you can  run them in multi containers.
    
3.  Finally you just need to run `docker-compose up` and Compose will start all the services for your application

## Creating a Laravel 6 Project

Let's create a Laravel 6 project and then see how we can dockerize it using Docker.

We have different ways to create Laravel projects: Using Composer (PHP package manager), cloning from GitHub or downloading using cURL.

### Using Composer

If you have Composer installed on your system then you can simply use the following command to create a Laravel project:

```bash
composer create-project --prefer-dist laravel/laravel laravelproject
```

### Using GitHub Repository

Alternatively if you don't want to install Composer in your system, you can also clone Laravel from GitHub using:

```bash
git clone https://github.com/laravel/laravel.git laravelproject
```
`

### Installing the Project Dependencies

Now, let's install the project's dependencies. If you have Composer installed, simply run the following command from within your project's root folder:

```bash
composer install 
```

If you don't have Composer installed on your system. You can also use Docker with the official [composer](https://hub.docker.com/r/library/composer/) image to install dependencies by running the following command from the project's root folder:

```bash
docker run --rm -v $(pwd):/app composer/composer install
``` 

The `--rm` switch tells Docker to automatically clean up and remove the container after doing the task and exiting.
 
 This is what the [docs](https://docs.docker.com/v1.7/reference/run/) says about that:
 
 >By default a container’s file system persists even after the container exits. This makes debugging a lot easier (since you can inspect the final state) and you retain all your data by default. But if you are running short-term **foreground** processes, these container file systems can really pile up. If instead you’d like Docker to **automatically clean up the container and remove the file system when the container exits**, you can add the `--rm` flag:
 
 The command:  `-v $(pwd):/app` instructs Docker to mount the current directory on the host system retrieved using `$(pwd)` to `/app` in the container . What `app`? Simply because the composer tool in the container will look for a `composer.json` file in this folder.
 
 After finishing the installation, either way, you'll find a `vendor` folder with all dependencies inside your Laravel project.

## Creating a Dockerfile

Now, after installing Docker and Docker-compose and creating the laravel project let's create a `Dockerfile` to define our environmenet. Create a new `Dockerfile` file in the application directory and start by adding the first command:

```bash
FROM php:7.2.2-fpm
```

This tells Docker to download and use the `php:7.2.2-fpm` image.

Next add: 

```bash
RUN apt-get update -y && apt-get install -y libmcrypt-dev openssl
RUN docker-php-ext-install pdo mcrypt mbstring
```

This run `apt-get` to install the dependencies and extensions required by Laravel.

If you want to install Composer you can also add this command:

```bash
RUN apt-get -y curl
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
```

Now, add:

```bash
WORKDIR /app
COPY . /app
```

This tells Docker to set the working directory in the container to `/app` and copy the files (Laravel project) in our current folder (in our system host) to the `/app` folder in the container.

If you didn't install the dependencies using the previous methods you can install them using:

```bash
RUN composer install
```

Now, let's run the `artisan serve` command using the `CMD` command:

```bash
CMD php artisan serve --host=0.0.0.0 --port=8000
```

This will serve the Laravel project from the port `8000`.

Finally, you need to expose the port `8000` from the container using:

```bash
EXPOSE 8000
```

This is the complete Dockerfile:

```bash
FROM php:7.2.2-fpm
RUN apt-get update -y && apt-get install -y libmcrypt-dev openssl
RUN docker-php-ext-install pdo mcrypt mbstring
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo mcrypt mbstring
WORKDIR /app
COPY . /app
RUN composer install

CMD php artisan serve --host=0.0.0.0 --port=8000
EXPOSE 8000
```

## Building the Docker Image

After creating the `Dockerfile`, you are ready to create the actual Docker image. From your terminal, navigate to the root folder of your project and run:

```bash
docker build -t my-laravel-image .
```

Using the `-t` switch we can specify the tag/name of the Docker image. For the dot means the current folder will be used as the context for the image to be built. Remember the `COPY` command in the `Dockerfile`? its source folder is this folder so we can copy the files from our project to the container file-system.

## Running the Docker Image Using Docker

After building the Docker image (`my-laravel-image`) you can now run it using:

```bash
docker run -p 8000:8000 my-laravel-image
```

You can now access your application from your browser at `http://localhost:8000`.

## Running the Docker Image Using Docker-compose

Docker-compose is more useful to build multi containers for the same application but it can also used to run a single Docker image. So first, create a `docker-compose.yml` file in the root folder of your project and add the following content:

```bash
web:
    image: my-laravel-image
    ports:
        - 8000:8000
    volumes:
        - ./:/app
```

We are defining a volume using  `./:/var/www`  which simply mount our current directory `./` in the host system to   `/app` in the container. This will allow you to work on the source code in your project's folder and changes will be reflected in the container file-system (in our case `/app`) without executing any other commands.


## Conclusion

In this tutorial, we've seen how to use Docker to create a development environment with Laravel 6. We've seen how to use both Docker and docker-compose to run our Laravel 6 application in an isolated container.

