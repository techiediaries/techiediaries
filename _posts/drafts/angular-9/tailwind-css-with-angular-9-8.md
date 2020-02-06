So, I've found a lot of crappy guides on the internet about how to integrate TailwindCSS with Angular 8, a lot of them involve some nasty hacks that I think are basically, shit. I've collated some information from various sources online to show you how I go about implementing TailwindCSS with Angular 8. If you're reading this and you don't know what TailwindCSS is, two things, one, where the hell have you been the past few years and two, go to tailwindcss.com and feast in the amazingness (is that even a word) that is Tailwind.

We'll be utilising the @angular-builders/custom-webpack package which will essentially allow us to tailor the webpack build to add tailwind into the build process.

First things first, install the following:

`npm i tailwindcss postcss-scss postcss-import postcss-loader @angular-builders/custom-webpack -D  
`

Next you need to open up your Angular project, I'm going to assume you're using sass, as well, why the fuck not?

Open your  `styles.scss`  file and add the following at the top.  

```
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

```

Next, you need to create the tailwind config file, to do so, open your terminal and smash in the following (inside the directory of your app of course).

`npx tailwind init`

Now we need to extend the webpack config, first, start by creating `webpack.config.js` at the root of your project, this is what it should look like  

```
module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    syntax: 'postcss-scss',
                    plugins: () => [
                        require('postcss-import'),
                        require('tailwindcss'),
                        require('autoprefixer'),
                    ]
                }
            }
        ]
    }
};

```

Once you've added that, modify the  `angular.json`  file to tell it to use the custom builder and config file.  

```
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-webpack:browser",
      "options": {
        "customWebpackConfig": {
          "path": "./webpack.config.js"
        }
      }
    },
    "serve": {
      "builder": "@angular-builders/custom-webpack:dev-server",
      "options": {
        "customWebpackConfig": {
          "path": "./webpack.config.js"
        }
      }
    }
  }
}

```

Now we're all up and ready to rumble, add some tailwind classes to an object and run

`npm start`

_Extra_

The whole point of Tailwind is to create custom utilities, you can do so by doing the following:

Modify your  `styles.scss`  and add 2 new custom imports.  

```
@import 'tailwindcss/base';
@import 'tailwindcss/components'; 
@import './custom-tailwind/custom-components.css'; // added
@import 'tailwindcss/utilities';
@import './custom-tailwind/custom-utilities.css'; // added

```

Make sure that they're added in the exact order above.

You can now create a folder inside the src directory called  `custom-tailwind`  
Inside this, you create the 2 files the same names as above, now you can create custom reusable utilities and components, for example:

`custom-components.css`  

```
.btn {
  @apply px-4;
  @apply py-2;
  @apply rounded;
  @apply bg-indigo-500;
  @apply text-white;
  transition: 200ms;
}

.btn:hover {
  @apply bg-indigo-600;
}

```

And now anywhere you want a button, just give it the class  `.btn` and it will apply all the tailwind classes.

For  `custom-utilities.css`, you can do the following:  

```
.rotate-0 {
    transform: rotate(0deg);
}
.rotate-90 {
    transform: rotate(90deg);
}
.rotate-180 {
    transform: rotate(180deg);
}
.rotate-270 {
    transform: rotate(270deg);
}

```

And now anywhere, you can just call these classes. Neat huh!

Enjoy the power that is TailwindCSS + Angular 8!