---
layout: post
title: "Node.js, Express & React Tutorial — REST API CRUD By Example"
image: "images/content/vuejs.png"
excerpt: "Throughout this Vue.js with Node.js and Express tutorial we'll learn by example how to create a full-stack CRUD (Create, Read, Update and Delete) application." 
tags : [vue , node, nodejs]
---

In this tutorial, we'll use Node.js, Express.js and React to build a full-stack CRUD (Create, Read, Update and Delete) application.

Express is a Node based web micro-framework that allows you to quickly build REST APIs with JavaScript.

## Introduction


You will be building a simple CRUD application that allows you to create, read, update and delete records from a MongoDB database with a React front-end. You will use Express to build and expose the REST API that will be consumed from React using the Axios client.

Let's get started by creating a directory for our project's files. Open a new terminal and run the following command:

```bash
mkdir node-express-example
```

Next, navigate to your project's folder and run the `npm init` to create  `package.json` file:

```bash
cd react-node-express-example
npm init -y
```

The `-y` option tells npm to create a `package.json` file with default values. You can update those values with your project's information later.

Open the `package.json` file and add the following content:

```json
{
  "name": "vuenodeproject",
  "version": "1.0.0",
  "description": "A Vue with Node and Express back end Project",
  "scripts": {
  },
  "author": "",
  "license": "MIT",
  "devDependencies": {
  }
}
```

## Installing Back-End Dependencies

Now let's install the required dependencies:

```bash
npm install --save express body-parser cors mongoose nodemon
```

## Creating The Express Server

Inside your project's root folder create a `server.js` file and add the following content:

```js
var express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/vuenodedb").then(
          () => {console.log('Database connection is successful') },
          err => { console.log('Error when connecting to the database'+ err)}
);
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 4000;

app.listen( ()=>{
        console.log('Listening on port ' + port);
});

```

You need to install **MongoDB** database system on your development machine.

## Creating the Mongoose Model(s): Todo 

Create a models folder inside your project and add a `Todo.js` file with the following content:

```javascript
const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', TodoSchema);
```

Our `Todo` model is very simple as it only contains a `name` field of type `String`. We have also set  [*timestamps*] (http://mongoosejs.com/docs/guide.html#timestamps) to *true* which automatically adds two new fields: `createdAt` and `updatedAt` to the schema.

## Creating Express Routes

First, let's require the *Todo* model:

```js
var Todo = require('./models/Todo');
```

Next, let's instantiate an Express router:

```js
var router = express.Router();
```

### Creating a Todo: Express.js POST Route Example

Now let's add a POST route that handles HTTP POST requests. In the same file add the following code:

```js
...
router.route('/create').post((req, res) => {
  var todo = new Todo(req.body);
   todo.save().then( todo => {
   res.status(200).json({'message': 'Todo successfully added '});
   })
   .catch(err => {
    res.status(400).send("Error when saving to database");
   });
});
``` 

### Getting Todos: Express.js GET Route Example

Next, let's add a GET route that handles HTTP GET requests. Add the following code:

```js
router.route('/todos').get((req, res) => {
  Todo.find((err, todos) =>{
    if(err){
      console.log(err);
    }
    else {
      res.json(todos);
    }
  });
});
```

### Getting a Todo by Id: Express.js GET by Id Route Example

```js
router.route('/todos/:id').get((req, res) => {
  var id = req.params.id;
  Todo.findById(id, (err, todo) =>{
      res.json(todo);
  });
});
```

### Updating a Todo by Id: Express.js PUT Route Example

```js
router.route('/todos/:id').put((req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo)
      return next(new Error('Error getting the todo!'));
    else {
      todo.name = req.body.name;
      todo.save().then( todo => {
          res.json('Todo updated successfully');
      })
      .catch(err => {
            res.status(400).send("Error when updating the todo");
      });
    }
  });
});
```

### Deleting a Todo by Id: Express.js DELETE Route Example

```js
router.route('/todos/:id').get((req, res) => {
  Todo.findByIdAndRemove({_id: req.params.id}, (err,todo) =>{
        if(err) res.json(err);
        else res.json('Todo successfully removed');
    });
});
```
 
## Starting your Express.js API Back-End

```bash
node server.js
```

You should have the following output in the terminal:

```bash
Listening on port 4000
```

## Installing Vue CLI v3 

We'll use the Vue CLI to generate the Vue front-end application. Let's start by installing the Vue CLI if you have not done so yet using the following command:

```bash
npm install --global @vue/cli 
```

## Generating a Vue Application Using Vue CLI v3

Let's now generate a new Vue application inside our project's root folder

```bash
$ vue create frontend
```

Next navigate inside your `frontend` folder and install **Axios** by running the following command:

```bash
$ npm install --save axios
```

**Axios** is a Promise based HTTP client that we'll be using to make HTTP calls from our Vue front-end application to our Express.js REST API backend running at `http://localhost:4000` with CORS enabled.

## Creating Vue Components

Inside `frontend/src/components` add two Vue components:

- `CreateTodo.vue`: for creating todos.
- `ListTodo.vue`: for displaying fetched todos.


### Creating a Todo 

Open `components/CreateTodo.vue` and add the following content:

```js
<template>
<div id="container" class="container">

<div class="row">

<div class="col-sm-8 offset-sm-2">
<div class="alert alert-warning" v-show="showError" >
<button type="button" class="close" @click="hideMessage()">X</button>
<strong>Error!</strong>
</div>
<h1>Create a Todo</h1>

<div class="info-form">
<form>
<div class="form-group">
<label for="name">Todo name</label>
<input v-model="todo.name" type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter Name">
<small id="nameHelp" class="form-text text-muted">Enter your todo's name</small>
</div>
</form>

<button class="btn btn-primary" v-if="!this.todo.id" @click="createTodo()" ><span>Create</span>
<button class="btn btn-primary" v-if="this.todo.id" @click="updateTodo()" ><span>Update</span></button>

<button class="btn btn-primary" @click="newTodo()" >New..</button>
</div>
</div>
</div>
</div>
</template>
<script>
import {APIService} from '../APIService';

const apiService = new APIService();

export default {

name: 'CreateTodo',

components: {
},

data() {
	return {
		showError: false,
		todo: {}
	};

},

methods: {
createTodo(){
apiService.createTodo(this.todo).then((result)=>{

console.log(result);
if(result.status === 201){
	this.todo = result.data;
}
},(error)=>{

	this.showError = true;

});
},
updateTodo(){
apiService.updateTodo(this.todo).then((result)=>{
	console.log(result);
},(error)=>{
	this.showError = true;
});
},
newTodo(){
	this.todo = {};
}
},

mounted() {
if(this.$route.params.pk){
	apiService.getTodo(this.$route.params.pk).then((todo)=>{
	this.todo = todo;
})
}
},
}
</script>
<style scoped>
.aform{
margin-left: auto;
width: 60%;
}
</style>
```

### Listing Todos

Open `components/ListTodo.vue` and add the following content:

```js
<template>
<div>
<h1>Todos ({{numberOfTodos}})</h1>
<table class="table table-bordered table-hover">
<thead>
<tr>
<th>#</th>
<th>Name</th>
<th>Actions</th>
</tr>
</thead>
<tbody>

<tr v-for="todo in todos" @click="selectTodo(todo)">

<th>{{todo.id}}</th>

<td>{{product.name}}</td>

<td>
<button class="btn btn-danger" @click="deleteTodo(todo)"> X</button>
<a class="btn btn-primary" v-bind:href="'/todo-update/' + todo.id"> &#9998; </a>
</td>
</tr>
</tbody>
</table>
</div>
</template>
<script>
import {APIService} from '../APIService';
const API_URL = 'http://localhost:4000';

const apiService = new APIService();

export default {

name: 'ListTodo',

components: {
},

data() {

return {

todos: [],
numberOfTodos:0
};

},

methods: {

getTodos(){
apiService.getTodos().then((data) => {

this.todos = data.data;
this.numberOfProducts = data.count;

});
},
deleteTodo(todo){

apiService.deleteTodo(todo).then((r)=>{



if(r.status === 204)
{


alert("Todo deleted");

this.$router.go()

}

})

},
},

mounted() {

this.getTodos();

},

}

</script>

<style scoped>

.list-horizontal li {

display:inline-block;

}

.list-horizontal li:before {

content: '\00a0\2022\00a0\00a0';

color:#999;

color:rgba(0,0,0,0.5);

font-size:11px;

}

.list-horizontal li:first-child:before {

content: '';

}

</style>
```

### Adding the API Service

```js
import axios from 'axios';
const API_URL = 'http://localhost:8000';

export class APIService{

constructor(){
}

getTodos() {

const url = `${API_URL}/api/todos/`;

return axios.get(url).then(response => response.data);
}
getTodo(pk) {

const url = `${API_URL}/api/todos/${pk}`;

return axios.get(url).then(response => response.data);

}

deleteTodo(todo){

const url = `${API_URL}/api/todos/${todo.pk}`;
	return axios.delete(url);
}

	createTodo(todo){
	const url = `${API_URL}/api/todos/`;
	return axios.post(url,todo);
}

updateTodo(todo){
const url = `${API_URL}/api/todos/${todo.pk}`;
return axios.put(url,todo);
}
}
``` 

## Conclusion

In this tutorial, we've created a CRUD application with Node.js and Vue which consumes a REST API created with Express.
