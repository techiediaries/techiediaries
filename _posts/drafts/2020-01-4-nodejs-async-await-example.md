---
layout: bpost
title: "Async/Await Example in Node.JS"
image: "images/content/angular.jpg"
excerpt: "Async/Await Example in Node.JS" 
skipRss: true
tags : [drafts] 
---

In this quick example, we'll see how to use async/await syntax in Node.js but let's first get started with a small introduction.

```js
function handler (req, res) {
  return request('https://user-handler-service')
    .catch((err) => {
      logger.error('Http error', err)
      error.logged = true
      throw err
    })
    .then((response) => Mongo.findOne({ user: response.body.user }))
    .catch((err) => {
      !error.logged && logger.error('Mongo error', err)
      error.logged = true
      throw err
    })
    .then((document) => executeLogic(req, res, document))
    .catch((err) => {
      !error.logged && console.error(err)
      res.status(500).send()
    })
}
You can ma
```


