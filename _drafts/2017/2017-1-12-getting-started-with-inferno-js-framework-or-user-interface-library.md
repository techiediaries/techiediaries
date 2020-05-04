---
layout: post
title: "Getting started with Inferno JS Framework or user interface library"
image: "images/content/getting-started-with-inferno-js-framework-or-user-interface-library/titleimage.png"
excerpt: "Throughout this tutorial we are going to learn about another JavaScript framework or more precisely UI library which is inspired and very similar to FaceBook's React library but has ore performance as it is designed as a mobile first library"
categories : javascript
tags : javascript
---

{% include image.html
   img="images/content/getting-started-with-inferno-js-framework-or-user-interface-library/bigimage.png"
       title="Getting started with Inferno JS Framework or user interface library"
%}

Throughout this tutorial we are going to learn about another JavaScript framework or more precisely UI library which is inspired and very similar to FaceBook's React library but has more performance as it is designed as a mobile first library .If you are already a React developer then you’ll find that you are familiar with most of Inferno’s concepts but most importantly why should you switch to Inferno instead of continuing using React ?

Inferno has the same concepts as React because it was heavily inspired from React but with the aim from its start to build an improved  react like user interface library which has  :

Better performance than React especially for  mobile apps .

Smaller size .it’s around 9kb  which means it’s faster to transfer and to parse.

Can be rendered in client and server .

Blazing and extremely fast UI library .Actually It’s the fastest user interface library in existence today . 

Inferno is an unopinionated UI library which means you have the choice to use and structure your project as you like .The library doesn’t get in the way  and in the same time offers you the tools necessary to reinvent the wheel.

# The story behind Inferno JS 

Nowadays everyone is trying to create another framework or library .Developers find themselves in front of multiple frameworks and libraries each day .So the question now .Do these people have strong reasons for building new frameworks with the existence of many of them ? Well I can’t answer for all of them but in the case of Inferno there is a strong reason behind creating a React like library .

Inferno began as an project or experience to test how can a user interface library solves the problem of performance or improve performance on mobile devices ,mainly targeting devices with poor resources .It’s true that mobile devices are becoming powerful each day but we can’t ignore the fact that existing and old devices are still used by a lot of people around the world ,especially in emerging countries .So a high performance library can solve many problems related to :

Battery time .

Memory consumption .

And general performance .

From this experience ,we’ve got an extremely performant  user interface library which has the same modern concepts such as component and virtual dom just like React but with a significant improvements in performance .Any React developer can switch to Inferno in no time because it has nearly the same API .

As you can see in this benchmark image Inferno is fast than the best existing frameworks today including React ,Angular ,Ember 2 and Vue 2 .

## Frameworks Benchmark

{% include image.html
   img="images/content/getting-started-with-inferno-js-framework-or-user-interface-library/frameworks-benchmark.png"
       title="frameworks benchmark"
%}

## User Interface Libraries benchmark 

{% include image.html
   img="images/content/getting-started-with-inferno-js-framework-or-user-interface-library/ui-libraries-benchmark.png"
       title="ui librarires benchmark"
%}

## Virtual DOM libraries Benchmark 

{% include image.html
   img="images/content/getting-started-with-inferno-js-framework-or-user-interface-library/virtualdom-benchmark.png"
       title="virtualdom benchmark"
%}


Features of Inferno 

Inferno has all the features of react plus performance related features .Now lets see a bunch of them 

Just like React ,Inferno has a component based and data binding architecture .
 
Just like React , Inferno is an isomorphic library if you don’t what this .It’s simply rendering on both the server and the client which is good for SEO .

Unlike react ,Inferno has also life cycle events on functional components .

Unlike React ,Inferno has controlled components for input/select/textarea elements .

Fastest UI interface library in existence when writing this article .
Lightweight library .Only 9kb in size .

Unopinionated and highly modular which doesn't make any restrictions on how you can structure your project built using Inferno .

# How to create your first Inferno application

Getting started with Inferno is easy and straightforward thanks to create-inferno-app which is a port of  Create React App .

You don’t need to configure your own build system from scratch which can be intimidating and time consuming if you are not familiar with modern JavaScript build systems .Just install create-inferno-app and run your project .

So open up your terminal on Linux and MAC or your command prompt on Windows then install create-inferno-app from the command line interface via npm .

    npm install -g create-inferno-app

You realize that you need Node.js installed on your local system if you want to be able to use Inferno build system .So if it is not installed start by installing the latest version of Node.js .Go to Nodejs official website and grab an installer for your OS .You can also use NVM or Node Version Manager to install it .Here is my tutorial on how to install Node.js under Ubuntu using NVM .

Next you need to create an Inferno App .Again from the CLI enter :

    create-inferno-app myApp

Last , just cd into your app folder and npm start

    cd myApp
    npm start

That’s it congratulations you have created your first Infero app quickly and with no pain .

Now just visit http://localhost:3000/  with your browser to see your app in action .

{% include image.html
   img="images/content/getting-started-with-inferno-js-framework-or-user-interface-library/inferno-app-running.png"
       title="Inferno app running"
%}
 
After developing your app .If you are ready for production then just run

    npm run build

To produce the production version of your app .

Now lets test a small example .Open up src/App.js file with your favorite text editor delete everything and add the following code 

    class App extends Component {
        componentDidMount() {
            setInterval(() => {
                this.setState({ 
                    time: (new Date()).toLocaleString() 
                });
            }, 200);
        }
        render() {
            return <h2>
                Current time: <span>{this.state.time}</span>
            </h2>
        }
    }

    export default App;

You should get a nice clock displaying current time 

    Current time: 1/9/2017, 5:54:46 PM

# Conclusion

So that’s the end of this getting started guide .The aim was to introduce you to a better alternative user interface library to React which is heavily inspired by React with more performance improvements targeting mainly mobile devices .














