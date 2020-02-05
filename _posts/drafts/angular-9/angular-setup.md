# Angular 9/8 Environment Setup in Linux, macOS and Windows Guide

This guide will help you setup an environment for Angular 9/8 development.

After you have grasped the basics of Angular using online IDEs like Stackblitz, you are not ready for the next step and you should start by installing the development environment.

For front-end developers that used to build apps with HTML, CSS and JavaScript without using modern build tools, this might be  tedious for the first time but this is only done for one time.

In this article, we'll be dealing with the following things:

- Setup node and npm,
- Setup the Angular CLI,
- Create our first Angular 9 project,
- Setup an IDE, Visual Studio Code,

    

## Setting Up Node and NPM

In order to get the best possible development experience, and if you don’t have node yet installed: I advise you to go the  [nodejs.org](https://nodejs.org/en/)  website and install the latest version of node:

Please make sure not to use the long-term support version (LTS), but the latest version instead. We will be using node for frontend tooling purposes and for running our development server, and for that specific purpose, you will usually run into fewer issues if you use the latest version.

But, if you already have node installed (any version almost), there is a much better way to upgrade your node version than to run an installer - why you might not be able to in a company computer.

To avoid running into any issues with constant reinstallations of node, I suggest the following: instead of overwriting your current version of node with the latest one, let's use a simple command line tool that easily allows switching node versions.

### Why use a command line node versioning tool?

Using a tool like that has several advantages:

-   It’s very useful to be able to quickly change node versions if for example, we have multiple projects to maintain on the same machine, and each project needs different versions of node.
    
-   with such tool, upgrading to newer versions of node in the future will be much easier – we will not have to run an installer in your machine again
    

So first before starting, let’s make sure that you have at least some version of node installed on your machine.

### Installing The Nave Command Line Tool

If you are using a Linux or Mac environment, then let’s go ahead and install the  [nave command line tool](https://www.npmjs.com/package/nave), which is available on npm:

The command to install this tool is:

```
npm install -g nave

```

Please remember that you might have to add “sudo” at the beginning of some of the commands in this book if you are not an administrator on this machine.

If you are on Windows, you can instead install the nvm-windows tool that gives you equivalent functionality:

With a node version changing tool in place, lets then install a given version of node. For example, lets bring the version 7.9.0 to our development machine, and start a shell with it:

```
> nave use 7.9.0
#################################################### 100.0%
installed from binary

> node -v
v7.9.0

```

If using nvm-windows, the command would then be:

```
nvm use 7.9.0

```

In both cases the result would be the same, we have just started a new shell with the chosen version of on the path.

> if you are on Windows and looking for a Bash shell that does not take administration privileges to install, have a look at  [Git Bash](https://git-scm.com/downloads)

We will now be able in the future to easily upgrade versions – that's a great start! Now let’s continue laying the foundation for our development environment.

Npm is the official node package manager, but we will be using a different alternative. Let’s learn why we would want to use the Facebook Yarn Package Manager instead.

### Why Use The Yarn Package Manager instead of NPM?

While using npm, you might notice that sometimes you run into the following situations:

-   You run npm install, and you get an error on the terminal, then you run the same command again and the error is gone. This is sometimes caused by proxies and network issues, but a lot of times it's not the case
    
-   you have a project running on on your machine in one folder, but you checkout the code to another folder and install it there, and it's somehow not working there due to dependencies issues
    
-   your production or staging environment build fails due to dependency related errors that you don’t have on your local machine
    
-   Another developer working on the same project is running into dependencies issues but on your machine it's working great: or the other way around 🙂
    

All these issues are related to a couple of inherent problems of the way that the npm package manager works by default.

#### The biggest difference between Yarn and NPM

Npm uses semantic versioning, which means that we will take upon installation a dependency version of a library that is in a certain range of versions.

While on paper this sounds like a good idea to enable getting continuous patch updates of dependencies, in practice, it doesn't work as well as one could think.

Facebook used to run into these issues too in their internal builds, and so they have created an alternative package manager that they have first tested extensively internally and then open sourced: The Yarn Package Manager.

So let’s try it out and learn the advantages along the way. To install Yarn, let’s do the following:

```
npm install -g yarn

```

Yes I know, we used npm LOL 😊 I will likely be one of the last times though.

So we now have installed Yarn globally. Let's now use it as much as possible, because it will unlike npm “freeze” the dependency tree, and ensure that the code that runs in production and in other developers machine is the exact same code that runs on your machine as well.

### So how does Yarn Work Then?

It's actually quite simple, upon project installation Yarn will freeze the dependencies by making note of what libraries were installed in a file which is called  `yarn.lock`.

So to install a file and generate a lock file, we simply have to run the following command in the same directory as your  `package.json`  is:

```
yarn

```

This does the same as an an npm install, meaning:

-   it will inspect the package.json and calculate a tree of library dependencies
    
-   it will download all project dependencies and write them under the  `node_modules`  folder
    

This is so far what npm does as well, so why use Yarn instead?

### Two immediate Advantages of Yarn

At this point, if nothing else yarn would really be bringing us two very important advantages:

-   Yarn is much faster than npm, especially for projects with a lot of dependencies, like for example projects that are scaffolded using the Angular CLI
    
-   Using Yarn you will not run anymore into that very frequent scenario of having to either run npm install multiple times until it completes (with a couple of cache cleans in the middle), or having to delete  `node_modules`  and reinstall
    

### The Biggest Advantage Of Yarn

The improved speed and reliability alone would already make Yarn a better alternative. But those might not be the biggest advantage. The biggest thing about Yarn is that during the installation it will keep track about all the dependencies that it has installed.

Yarn will write the exact version numbers of each library that is has downloaded and it will put those in a text file, called a lock file. You will see it right next to your package.json once the installation completes.

#### A couple of things about the yarn.lock file

This is just a plain text file, here are some important points about it:

-   we should not edit it manually, only Yarn should modify its file in result of a command that we execute in the command line
    
-   we need to commit this file to source control
    

So what is the big advantage of having a lock file, and of the Yarn approach in general?

Committing the file ensures that any other developer using the same code base will have the same exact dependencies then you. This is really convenient because problems due to library differences are much more prevalent than one could think.

And what about when we commit something and the integration build fails due to differences between libraries in the continuous server machine and our local machine, how are we going to debug that?

Imagine the headache that such situation could cause, because you probably don’t have access to the file system of the integration server.

#### Yarn advantages in a Nutshell

Keeping a lock file and using the same exact dependency tree everywhere avoids so many time-consuming problems. In a Nutshell, and to summarize the advantages of Yarn we can say that:

> Yarn gives us faster, more reliable and most of all reproducible builds, meaning that we will never have to debug issues due to having different libraries on different machines

If you are looking for a guided tour to setting up Yarn, have a look at this video:

### About Npm Shrinkwrap

One final note about npm, its also possible to freeze dependencies in npm, but the process is reported to be non-deterministic, have a look  [here](https://yarnpkg.com/en/docs/migrating-from-npm#search)  at the Yarn docs regarding shrinkwrap:

> If you are using an npm-shrinkwrap.json file right now, be aware that you may end up with a different set of dependencies. Yarn does not support npm shrinkwrap files as they don’t have enough information in them to power Yarn’s more deterministic algorithm.

Also, have a look at this mention on the same docs about the Yarn lock file:

> It’s similar to npm’s npm-shrinkwrap.json, however, it’s not lossy and it creates reproducible results.

So I hope that this convinces you why we should use Yarn instead of npm. Let me know what you think of this approach, and let's continue setting up our development environment.

The next steps are: installing the CLI (and configure it to use Yarn), and installing an IDE.

### Installing the Angular Command Line Interface

Now that we have a package manager in place, let’s start using it to install everything that we need. To install the Angular CLI, which is a command line tool that we can use to scaffold Angular applications, we can run the following command:

```
yarn global add @angular/cli 

```

At this stage, if everything went well we should have the Angular CLI available at the command line. If we run this command we should have:

```
>ng --version

```

This should return you the CLI version that you just installed.

> WARNING: Yarn is a relatively new tool. If you run into issues installing global dependencies, such as for example you can’t find the CLI executable, you can always do one more use of npm:

```
npm install -g @angular/cli

```

Over time, this should not be necessary though. Now that we have the CLI installed, let’s start using it.

Note: This blog post is part of this ebook on Angular:

### Scaffolding Our First Angular Application Using the Angular CLI

The CLI will create a standard structure for our project, and setup a working build. The build needs dependencies, that will be downloaded by default using the npm package manager.

But its advisable to configure the CLI from the beginning to use the Yarn Package Manager instead:

```
ng set --global packageManager=yarn

```

Now if we use the multiple commands of the Angular CLI, we are going to be using yarn instead of npm. So things will go much faster and we will have reproducible builds for our project. Let's then scaffold our first application:

```
ng new hello-world-app

```

This is going to take a while, but it will create a new project structure and it will install all the needed dependencies in one go. We now have a ready to use project! We can run our application by simply doing:

```
cd hello-world-app

ng serve

```

The ng serve command should start a development server on your locahost port 4200, so if you go to your browser and enter the following url:

```
http://localhost:4200

```

You should see in the browser a blank screen with the message “app works!”.

We are going to review this application step-by-step in an upcoming post. But wouldn’t it be better to review the application already in our final development environment?

So let’s get that in place first, and we will take it from there.

### Setting Up an IDE – Webstorm or Visual Studio Code

There are a couple of great IDEs out there. For example, there is the Microsoft Visual Studio Code IDE, which is available here and is free:

[https://code.visualstudio.com](https://code.visualstudio.com/)

There is also the Webstorm IDE, with a couple of versions that you can try out, here is the free trial version:

[https://www.jetbrains.com/webstorm](https://www.jetbrains.com/webstorm)

And here is the free Early Access Program Edition, with all the latest features not released yet of the next upcoming version. These early access versions are very stable despite the name:

[https://confluence.jetbrains.com/display/WI/WebStorm+EAP](https://confluence.jetbrains.com/display/WI/WebStorm+EAP)

After installing the IDE, we just have to open the folder with the Angular CLI project in it, and a new project will be created.

Webstorm will automatically detect the Typescript version that you are using inside  `node_modules`, and will use that to compile the code and show any errors.

#### An important feature of our IDE environment

This means there won’t the need to configure Typescript manually and end up accidentally having different compiler behavior between the command line and the IDE for example.

This is what we want to avoid especially if just getting started with the Angular ecosystem, we want an initial experience where installations go smoothly and the IDE just works.

Webstorm also has some great Angular integration. For example, we can jump from the template directly to a component class method.

The installation of Webstorm should go smoothly, and with this, we have a development environment in place that will the basis for the exploring of the Angular framework that we are about to do.

### Conclusion and What’s Next

With this section, you should have a solid development environment in place. If you didn’t then please tell me in the comments what went wrong.