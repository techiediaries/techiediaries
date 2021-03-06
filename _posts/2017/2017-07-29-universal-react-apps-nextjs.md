---
layout: post
title: "Building Universal Server Rendered Apps with React and Next.js 3.0"
image: "images/content/universal-react-apps-nextjs.png"
excerpt: "How to build server rendered apps with Angular Universal Starter" 
tags : [react , nextjs ] 
---

{% include image.html 
    img="images/content/universal-react-apps-nextjs.png" 
    title="Universal React Apps with Next.js" 
%}


Next.js is a framework for quickly building universal (also called Isomorphic) server-rendered web apps with 
React. In this tutorial I'm going to get you started with Next.js to build an example demo app showing the 
essential concepts of server rendered React apps.

Building apps with Next.js is dead easy, you just create a <em>pages</em> directory and place React components in it.
 Next.js will take care of everything.

Now lets get started 

## Installing Next.js 2.0 

You can install Next.js 2.0 via npm with:

    npm install --save next react react-dom

## Installing Next.js 3.0 

 Next.js 3.0 is still in beta, you can also install it via npm with:

    npm install next@beta react react-dom --save


## Adding NPM Scripts to package.json 

Building apps with Next.js is a matter of using three commands:

    next
    next build
    next start 

So lets add NPM scripts to trigger these commands: 

  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },


## Adding Pages 

To create pages you first need to create a pages directory:

    mkdir pages 

### Adding the Home Page 

Create an index.js file inside pages folder and put this content in it:

    import Link from 'next/link'
    export default () => (
    <div>
                <Link href='/'><a>Home</a></Link> -
                <Link href='/about'><a>About Me</a></Link> - 
                <Link href='/contact'><a>Contact</a></Link>  
                <br></br>
                <p>This is the home page</p>
                
    </div>
    )


### Adding the About Page

Next create an about.js file inside pages folder then put the following content:

    import Link from 'next/link'
    export default () => (
    <div>
                <Link href='/'><a>Home</a></Link> -
                <Link href='/about'><a>About Me</a></Link> - 
                <Link href='/contact'><a>Contact</a></Link>  
                <br></br>
                <p>This is about page</p>
    </div>
    )


### Adding the Contact Page 

Add contact.js file inside pages folder then put the following:

    import Link from 'next/link'
    export default () => (
    <div>
                <Link href='/'><a>Home</a></Link> -
                <Link href='/about'><a>About Me</a></Link> - 
                <Link href='/contact'><a>Contact</a></Link>  
                <br></br>
                <p>This is the contact page</p>
                
    </div>
    )



Now you can launch next with:

    npm run dev 

Your app will be available from http://localhost:3000.

As you can see the names of files inside pages directory become the routes except for / which points to index.js





  





