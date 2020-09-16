---
layout: bpost
title: "Using Bootstrap 4 Instead of Tailwind in Laravel 8 with Laravel/UI v3 Package"
image: "images/content/laravel.png"
excerpt: "In this article, we'll see how to install Bootstrap 4 with Laravel 8 using the laravel/ui v3 scaffolding package and also how to use Bootstrap for the pagination views instead of the default Tailwind CSS" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

In this article, we'll see how to install Bootstrap 4 with Laravel 8 using the [`laravel/ui`](https://packagist.org/packages/laravel/ui) v3 scaffolding package and also how to use Bootstrap for the pagination views instead of the default Tailwind CSS.


## Laravel 8 Uses Jetstream and Tailwind by Default

Laravel 8 makes use of Jetstream by default for application scaffolding instead of the `laravel/ui` package.

Jetstream uses Tailwind instead of Bootstrap 4 for CSS styles and comes with two stacks - Livewire that uses Blade for templating and Inertia.js which uses Vue.js.

The Laravel team recommends developers to use Jetstream for new Laravel 8 projects but they have also updated the `laravel/ui` package to version 3 for using with Laravel 8, especially if you are updating your previous Laravel 7 app to the latest version.

>For those of you using the old "laravel/ui" package with Laravel 8, we have moved Laravel 8.x support to the 3.x branch. Please update your composer.json files accordingly. [Tweet](https://twitter.com/laravelphp/status/1304445936043798528)


Also, check out [Can we use laravel/ui in laravel 8 as like in laravel 7](https://github.com/laravel/framework/discussions/34214)


## Installing Bootstrap 4 in Laravel 8 Project

Even if Laravel 8 comes with Tailwind by default, you can still use any CSS framework for styling your apps.

For Laravel8, we can either install Bootstrap 4 in the usual way i.e by including the files in your main Blade template or use the `laravel/ui` v3 package by installing it from Composer.


First, create a new Laravel 8 project using the following command:

```bash
$ composer create-project laravel/laravel --prefer-dist laravel8-bootstrap
```

Next, navigate to your project's folder and install the latest version of the `laravel/ui` package as follows:

```bash
$ cd laravel8-bootstrap
$ composer require laravel/ui
```

Next, install Bootstrap 4 in your Laravel 8 project using the following command:

```bash
$ php artisan ui bootstrap
```

Finally, you need to install the bootstrap package and its dependencies from npm and compile the assets using the following commands:

```bash
$ npm install
$ npm run dev

 DONE  Compiled successfully in 22806ms                               6:13:23 PM

       Asset      Size   Chunks             Chunk Names
/css/app.css  4.21 MiB  /js/app  [emitted]  /js/app
  /js/app.js  1.33 MiB  /js/app  [emitted]  /js/app
```

## Using Bootstrap 4 in your Laravel 8 Blade Templates

After running the previous commands, you'll compile the Sass files of Bootstrap 4 to a single CSS file in the `public` folder of your project. You can include the JS and CSS files in your Blade templates as follows:

```html
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name', 'Laravel 8') }}</title>
    <script src="{{ asset('js/app.js') }}" defer></script>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <h1>Laravel 8 with Bootstrap 4 Styles</h1>
</body>
</html>
```

## Customizing The Pagination View with Bootstrap 4

According to the [official Laravel 8 docs](https://laravel.com/docs/8.x/pagination#using-bootstrap):

> By default, the views rendered to display the pagination links are compatible with the Tailwind CSS framework. However, if you are not using Tailwind, you are free to define your own views to render these links

Laravel includes pagination views built using Bootstrap CSS. To use these views instead of the default Tailwind views, you may call the paginator's `useBootstrap` method within your `AppServiceProvider`:

```css
use Illuminate\Pagination\Paginator;

public function boot()
{
    Paginator::useBootstrap();
}
```

Check out [How to fix laravel 8 UI paginate problem](https://stackoverflow.com/questions/63840416/how-to-fix-laravel-8-ui-paginate-problem)

## Conclusion

In this article, we've seen how to install  Bootstrap 4 with Laravel 8 using the `laravel/ui` v3 scaffolding package and also how to use Bootstrap for the pagination views instead of Tailwind CSS.