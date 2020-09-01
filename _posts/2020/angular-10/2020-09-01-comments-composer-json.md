---
layout: bpost
title: "Adding Comments to Composer.json"
image: "images/content/php.png"
excerpt: "How to add comments to composer.json"
date: 2020-09-01
tags : [php]
---

[Composer](https://getcomposer.org/doc/00-intro.md) is a tool for dependency management in PHP. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you.

It's similar to npm for Node.js packages.

Composer makes use of a `composer.json` file for configuration which you'll need to start using the tool in your project. It describes the dependencies of your project and may contain other metadata as well.

Since this is considered a configuration file for your project's dependencies. In many situations, you would need to add comments to the file but unfortunately JSON by design doesn't permit comments.

## How to Add Comments to your `composer.json` File?

Since developers are problem solvers, they always find solutions or at least workarounds so how to add comments to your `composer.json` file?

There are various workarounds used by developers to [add comments to JSON](https://www.techiediaries.com/json-comments/) files generally. one of these methods that will suil well with `composer.json` is using an external tool that pre-process and parse the file and remove comments before running the project.

> Composer doesn't support that out of the box doesn't mean you cannot use commented json files since you can do preprocessing. Either with a php tool, a make file, a shell script, grunt etc. whatever you use as your build tool to run composer should be able to process the commented json file into a barebones json compliant file. You can even use a [php based jsmin tool](https://github.com/tedious/JShrink) if you prefer. [Source](https://github.com/composer/composer/issues/1988)




