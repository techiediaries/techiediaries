---
layout: post
title: "Semantic Versioning/Semver for Laravel 6 Devs: Why there is a caret (^) in your composer.json"
image: "images/content/laravel.png"
excerpt: "You have heard that Laravel 6 has moved to semantic versioning (also called semver) but you are wondering what is that and does it impact how you work with your Laravel projects? Let's see in more details what is semantic versioning." 
tags : [laravel, laravel6] 
---

You have heard that Laravel 6 has moved to [semantic versioning](https://semver.org/) (also called semver) but you are wondering what is that and does it impact how you work with your Laravel projects? Let's see in more details what is semantic versioning.

In nutshell, since Laravel 6 uses semver, you now need to use version constraints like the famous caret when you are including the Laravel framework in your projects because the major releases include breaking changes.   



So, say you invoked the  `composer require laravel/ui` command to install the `laravel/ui` package in your project then you checked the `composer.json` file where you can see that there is something before the version numbers.

For example, this is a part of the `composer.json` file of a Laravel 6 project:

```json
{
    "name": "laravel/laravel",
    "type": "project",
    "description": "The Laravel Framework.",
    "keywords": [
        "framework",
        "laravel"
    ],
    "license": "MIT",
    "require": {
        "php": "^7.2",
        "fideloper/proxy": "^4.0",
        "laravel/framework": "^6.0",
        "laravel/tinker": "^1.0",
        "laravel/ui": "^1.0"
    },
    "require-dev": {
        "filp/whoops": "^2.0",
        "fzaninotto/faker": "^1.4",
        "mockery/mockery": "^1.0",
        "nunomaduro/collision": "^3.0",
        "phpunit/phpunit": "^8.0"
    },
    [...]
``` 
   
You can notice the caret symbol (^) in the versions of all packages in the `require` and `require-dev` objects. This is a part of the semver system.

As a first thought, you think of this as a way to let the package manager know that it can install versions other than the exactly specified number. And, you are right! But let's take a deep understanding of this.

## What is Semantic Versioning?

Semantic versioning is simply a set of rules that dictate the types of changes that increment the version number or more precisely each of the three numbers representing the version. It's also called semver and has the v.v.v form. For example 6.0.1. Each part has a name, and they are from left to right _major_,  _minor_, and  _patch_.
 
The developer of the package should adhere to the following rules when adding any features or making any changes: 

-  Breaking changes or features increment the major version number,
-  New non-breaking features increment the minor version number,
-  Bug fixes to existing features increment the patch version number.

Semantic Versioning is optional i.e not all developers are required to follow it when versioning their packages or apps but it will make your life easier.

## Enabling the package manager (e.g. Composer) to install new versions

Composer provides many ways that you can use to specify non-exact versions:

1.  Using operators like >= and <
2.  Using hyphens, e.g. 6.0 – 6.4
3.  Using wildcards (*), e.g. 6.0.*
4.  Using tilde (~), e.g. ~6.0.0
5.  Using caret (^), e.g. ^6.0.0

These are used to specify a range of versions, not an exact version which enables you to add a package in version 6.0.0  today and have an updated version later.

Tilde and caret version constraints are supported in Composer and they are also the constraints used in semantic versioning. This means you can enforce the Semver rules using Composer.

When you run the  `composer install`  in a project, the package that corresponds to each version in the `composer.json` file is installed. 

Instead of using an exact version in the `composer.json` file, you can use the  ~ and ^ symbols before the version number to give Composer the possibility to install newer versions when they are available following certain rules. You tell the package manager to install newly-available patch-level versions using the tilde (~) and newly-available minor or patch level versions with the caret symbol (^). 


See [Composer versions](https://getcomposer.org/doc/articles/versions.md)

Let's see how the tilde operator used with an example:

```bash
~6.0 this is equivalent to >=6.0.0 and <6.0.0 which is the same as 6.*
~6.0.0 this is equivalent to >=6.0.0 <6.1.0 which is same as 6.0.*
```

Now, let's see an example of the caret operator:

```bash
^6.0   means >=6.0.0 <7.0.0 which is the same as 6.*
^6.0.0 means >=6.0.0 <6.0.0 which is the same as 6.*
```

You also need to know that semantic versioning has different behavior on versions before 1.0.0 (i.e before a stable release). The minor versions can break backward compatibility. So, be careful when you are using use the tilde operator as you may install a version that breaks backwards compatibility.


## Conclusion

We have introduced the basic concepts of the semantic versioning system used in Laravel 6 and seen examples of how it works and how it allows Composer to install newer versions of the dependencies when they are available using the tilde and caret symbols.
    