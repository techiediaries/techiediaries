---
layout: post
title: "Ionic 5 React Tutorial: Build a Mobile App with Ionic 5, Axios and React"
image: "images/content/react.png"
excerpt: "In this tutorial we'll look at how to use React with Ionic 5 and Axios to build a mobile application" 
date: 2020-02-14
tags : [react , ionic]
---

In this tutorial we'll be using Ionic 5, Axios and React to build a news application. We'll be making use of [NewsAPI.org](www.newsapi.org) for getting news data and we'll be using the Axios client to send API calls to the News REST API.

## Prerequisites

You need to have some prerequsisites before tackling this tutorial:

- Knowledge of JavaScript,
- Basic knowledge of React is necessary since we'll be using React as the frontend library,
- You need to have Node.js and NPM installed on your development machine. It's required by the `create-react-app` tool that will be used to generate a React project and start the local development server.

## Installing `create-react-app`

If you have `npm` installed on your machine. Open a terminal and run the following command to install `create-react-app` globally on your system:

```bash
$ npm install -g create-react-app
```

As the time of this writing, `create-react-app` **v2.1.8** will be installed.

## Creating a React Project

Next, let's use `create-react-app` to generate a React project. Head back to your terminal and run the following command:

```bash
$ create-react-app react-ionic-app
```

Next, navigate to your project's root folder and start the local development server using the following commands:

```bash
$ cd react-ionic-app
$ npm start
```

You server will be running from the `http://localhost:3000/` address.

## Adding Ionic to our React app

Now we need to install Ionic for React available from the `@ionic/react` package. We'll also install the `react-router` package since Ionic for React depends on it. Open a new terminal, navigate to your React project and run the following commands:

```bash
$ npm install @ionic/react react-router react-router-dom --save 
```

> **Note**:  At the time of this writing, `@ionic/react` **v0.0.5**(beta), `react-router` **v5.0.0** and `react-router-dom` **v5.0.0** will be installed.

## How to Use Ionic 5 Components in React

Open the `src/App.js` file and import Ionic 5 styles:

```js
import React, { Component } from 'react';

// Import Ionic 5 styles
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

import './App.css';
```
At this point, you can simply import the desired [Ionic 4 component](https://ionicframework.com/docs/components/) and use it in your application.

Let's import the following commponents:

```js
import {
  IonApp,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton
} from '@ionic/react';
```

Next, change the `render()` method to create to create an Ionic 5 UI with a card:

```js
class App extends Component {
  render() {
    return (
      <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>News App v1.0</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              News title
            </IonCardTitle>
            <IonCardSubtitle>
              News subtitle
            </IonCardSubtitle>

          </IonCardHeader>
          <IonCardContent>
            <IonButton >Read</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonApp>

    );
  }
}
export default App;
```

This is a screenshot of our UI at this point:

![Ionic 4 & React UI](https://i.imgur.com/K8pHABI.png)


## Installing Axios in Your React Project

We'll be using the Axios client to send Ajax requests to the News REST API.

Head back to your terminal and install Axios from npm using the following command:

```bash
$ npm install axios --save
```

As of this writing `axios` **v0.18.0** will be installed on your project.

## Getting News Data

Head over to the news API, register a new account a take note of your API key. Next, open the `src/App.js` file and add the following variables which hold the API key and URL:

```js
class App extends Component {
  API_KEY = 'YOUR_API_KEY';
  API_URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`;
```

Next, import `axios` and add the `componentDidMount()` method where you can send an API call to the News API:

```js
import axios from 'axios';


class App extends Component {
  API_KEY = 'YOUR_API_KEY';
  API_URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`

  state = {
    items: []
  }

  componentDidMount() {
    axios.get(this.API_URL).then(response => response.data)
    .then((data) => {
      this.setState({ items: data.articles })
      console.log(this.state.items)
     })
  }
  render() {
    return (
      <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>News App v1.0</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      {this.state.items.map((item) => (
                <IonCard>
                  <img src={item.urlToImage}/>
                <IonCardHeader>
      
                <IonCardTitle>
                {item.title}

                </IonCardTitle>
                 <IonCardSubtitle>
                    {item.author}
                  </IonCardSubtitle>
      
                </IonCardHeader>
                <IonCardContent>
                  <p>{item.content}</p>
                  <IonButton href={item.url}> Read</IonButton>
                </IonCardContent>
                </IonCard>
             
      ))}

      </IonContent>
    </IonApp>

    );
  }
}

export default App;
```

We store the articles in the `items` state variable after we fetch them with Axios. In the `render()` method we loop through the items state and display information related to each news article using an Ionic 5 card component.

This is a screenshot of our app at this point:

![Ionic 4/React app](https://i.imgur.com/tfIwLrd.png)

## Conclusion

In this tutorial we used Ionic 5 with React and Axios to build a simple news application with a mobile UI. At this time, Ionic/React is still at beta, we'll be adding more tutorials later when it reaches a stable release.




