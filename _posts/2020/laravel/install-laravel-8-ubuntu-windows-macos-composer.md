Laravel 8 is [released](https://laravel.com/docs/8.x/releases) on September, 2020 and you can start using it for building your new project or upgrade your existing Laravel project to this version.

Starting with Laravel 6, Laravel follows semver i.e a new major version will be released every six months.

## How to Install Laravel 8?

In this post, we'll see how to install the latest Laravel 7 version.

<s>If you go to packagist, and search for “laravel/laravel”  packages, you should see a version named [_dev-develop_](https://packagist.org/packages/laravel/laravel#dev-develop). This the package that you can use for installing Laravel 8 at this time.</s>

> Please note that Laravel 7 requires PHP 7.2.5+

Make sure you have the required PHP version and Composer installed on your machine, next open a new command-line interface and run the following command:

```bash
$ composer create-project --prefer-dist laravel/laravel laravel-7-example 
```

Wait for Composer to download the project's files and any php dependencies and run the following commands to start a development server:

```bash
$ cd laravel-7-example  
$ php artisan serve
```

Laravel 7 comes with many new features such as:

- Laravel Airlock
- Custom Eloquent Casts
- Blade Component Tags & Improvements
- HTTP Client
- Route Caching Speed Improvements, etc.

