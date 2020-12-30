---
layout: post
title: "Install PHP 8 and New Features Tutorial"
image: "images/content/php.png"
excerpt: "Learn about the new features in PHP 8" 
tags : [php, php-8] 
---

PHP 8 is finally released with many new features and improvements in terms of performance, syntax, stability and security. 

In this tutorial, we'll be learning how to install PHP 8 on our development machine and take a look at the new features coming with this new version.

## Installing PHP 8 and Extensions

Before diving into PHP 8 features, we first need to download and install it 

On Ubuntu, you can follow these steps. Open a new terminal and run the following command:

```bash
$ sudo add-apt-repository ppa:ondrej/php
$ sudo apt-get update
```

This will add the PPA which contains all PHP packages and their dependencies such as `argon2` and `libzip`. 


Next, run the following command to install PHP 8:

```bash
$ sudo apt install php8.0-common php8.0-cli -y
```

This will install many PHP extensions via the `php8.0-common` package, and the CLI for PHP 8.


You can make sure PHP 8 is installed by running the following commands:

```bash
php -v # Display PHP version
php -m # Display the loaded PHP modules
```

You can install any additional package using the `php8.0-NAME` format. For example:

```bash
$ sudo apt install php8.0-{bz2,curl,mysql,xml}
```


> Please note that you don't need to install `php8.0-json` as it's now included by default

## PHP 8 New Features

Let's now see the new features of PHP 8.

### Named Parameters

PHP 8 added named parameters to functions and methods. For example:

```php
str_contains(needle: 'Bar', haystack: 'Foobar');
```

### Attributes

Attributes allows declaring meta-data for functions, classes, properties, and parameters. Attributes map to PHP class names (declared with an Attribute itself), and they can be fetched programmatically with PHP Reflection API.

```php
#[CustomAttribute]
class Foo {
    #[AnotherAttribute(42)]
    public function bar(): void {}
}
```

Attributes makes it easy and performant to declare Attributes/annotations that previously required storing them in DocBlock comments, and parsing the string to infer them.

### Constructor Properties

A new syntax to declare class properties right from the class constructor (__construct magic method).


```php
class User {
    public function __construct(private string $name) {}
}
```

In the constructor, PHP 8.0 supports declaring the visibility (public, private, or protected) and type. Those properties will be registered as class properties with same visibility and type they are declared in the constructor.

This backwards-incompatible feature can help reduce boilerplate code when declaring value-object classes.

Just-In-Time Compilation

PHP Opcache supports JIT. It's disabled by default, and if enabled, JIT compiles and caches native instructions. It does not make a noticeable difference in IO-bound web applications, but provides a performance boost for CPU-heavy applications.

```bash
# Enabling JIT in php.ini
opcache.enable=1
opcache.jit_buffer_size=100M
opcache.jit=tracing
```

Note that JIT is still new, and had bug fixes as late as a day before PHP 8.0.0 release. It makes debugging and profiling more difficult with the added extra layer.

### Union Types

Union Types extend type declarations (return types, parameters, and class properties) to declare more than one type.

function parse_value(string|int|float): string|null {}

It also supports false as a special type (for Boolean false), a trait that's prevalent in legacy code that did not use Exceptions.

### Null-safe Operator

Null-safe operator provides safety in method/property chaining when the return value or property can be null.

return $user->getAddress()?->getCountry()?->isoCode;

The ?-> null-safe operator short-circuits the rest of the expression if it encounters a null value, and immediately returns null without causing any errors.

### match expressions

Match expressions are similar to switch blocks, but match blocks provide type-safe comparisons, supports a return value, does not require break statements to break-out, and supports multiple matching values. it also guarantees that at least one branch is matched, ensuring all cases are accounted for.

$response = match('test') {
    'test' => $this->sendTestAlert(),
    'send' => $this->sendNuclearAlert(),
};

Not all switch blocks might convert well to match blocks. Code that requires backwards-compatibility, switch blocks with multiple statements (as opposed to single-line expressions), or expects fall-through functionality still fits the switch statements.

### WeakMaps

A WeakMap allows to store and associate arbitrary values for object keys, but without preventing the garbage collector from clearing it the object falls out of scope in everywhere else.

A WeakMap is similar to SplObjectStorage, as in both WeakMap and splObjectStorage use objectss as the key, and allows storage of arbitrary values. However, a WeakMap does not prevent the object from being garbage collected.