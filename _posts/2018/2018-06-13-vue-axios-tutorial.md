---
layout: post
title: "Vue Axios Tutorial by Example (CRUD API)"
image: "images/content/vue.png"
excerpt: "Throughout this tutorial with Vue.js and Axios we'll see how to add CRUD (Create, Read, Update and Delete) methods with a Vue front-end and a Python Django RESTful API back-end." 
tags : [python , django , javascript , vue, vuejs] 
---

In this **Vue Axios tutorial** we'll learn to use Axios (an http client) by example sending post, get, put and delete requests to a REST API. We'll see how to add **CRUD** (Create, Read, Update and Delete) methods with a **Vue.js** front-end and a  **Python Django** RESTful API back-end.

<div id="toc_container">
<p class="toc_title">Vue Axios Tutorial by Example</p>
<ul class="toc_list">
<li><a href="#Using_Axios_with_Vue">Using Axios with Vue</a></li>
<li>
<a href="#The_Django_Example_Back-End">The Django Example Back-End</a>
</li>
<li><a href="#Creating_Vue_Front-End">Creating the Vue Front-End</a></li>
<li><a href="#Installing_Axios_Http_Client">Installing Axios Http Client</a></li>
<li><a href="#Consuming_RESTful_API_Using_Axios">Consuming The RESTful API Using Axios</a></li>
<li><a href="#Vue_Axios_Get_Example">Vue and Axios GET Example</a></li>
<li><a href="#Example_Using_Http_GET_Calls">Example Using Http GET Calls</a></li>
<li><a href="#Vue_Axios_Post_Example">Vue and Axios Post Example</a></li>
<li><a href="#Vue_Axios_Put_Example">Vue and Axios Put Example</a></li>
<li><a href="#Vue_Axios_Delete_Example">Vue and Axios Delete Example</a></li>

<li><a href="#Conclusion">Conclusion</a></li>
</ul>
</div>

[Axios](https://github.com/axios/axios) is a promise-based modern http client library that runs on the browser and the server through Node.js. Axios works asynchronously and allows you to make HTTP calls to REST endpoints and consume REST APIs.

## <a name="Using_Axios_with_Vue">Using Axios with Vue</a>

We'll use Axios to send API or HTTP calls (We'll write code for sending GET, POST, DELETE and PUT HTTP requests.) from a Vue.js interface to a RESTful API back-end built with Django.  

First things first, let's get the back-end code.

## <a name="The_Django_Example_Back-End">Getting the Django Example Back-End</a>

In this tutorial, we'll be focusing on building the Vue.js and Axios front-end so we'll be using a previously built Django API available from this GitHub [repository](https://github.com/techiediaries/django-crm) 


Using the following command, you can clone the back-end code:

```bash
$ git clone https://github.com/techiediaries/django-crm
$ cd django-crm
```

Next, you need to create a virtual environment and install packages using [pipenv](https://github.com/pypa/pipenv): 

```bash
$ pipenv install
```

Next, activate the virtual environment using:

```bash
$ pipenv shell 
```
Finally, create and migrate the database and run the local development server using:

```bash
$ python manage.py migrate
$ python manage.py runserver
```

You server will be running from `http://localhost:8000`. You are now ready to create the Vue.js interface to communicate with the back-end using the Axios HTTP client.


## <a name="Creating_Vue_Front-End">Creating the Vue Front-End</a>

Navigate inside your project and create a front-end project using the Vue CLI we've installed on the previous [tutorial](/vue-cli-tutorial).

```bash
$ vue create frontend
```

That's it! You now have a Vue project ready.

You can serve your application using the following command:

```bash
$ vue serve
``` 

## <a name="Installing_Axios_Http_Client">Installing Axios Http Client</a>

The next step is to install Axios in your Vue project using the following command:

```bash
$ npm install --save axios
```

## <a name="Consuming_RESTful_API_Using_Axios">Consuming The RESTful API Using Axios</a>

After installing Axios, we'll use it to consume to RESTful API exposed from `http://localhost:8000`. 

To encapsulate all the code interfacing with REST API server we'll create a JavaScript class inside the `frontend` project and we'll add different methods to send API calls such as POST, GET, PUT and DELETE.

Go ahead and create `APIService.js` inside the `frontend/src` folder:

```bash
cd frontend/src
touch APIService.js
```

Next open `APIService.js` using your favorite code editor and add the following code to create the *APIService* class:

```js
import axios from 'axios';
const API_URL = 'http://localhost:8000';
export class APIService{

constructor(){
}

}
```

We've imported **axios**, defined an *API_URL* variable which holds the address of the REST API server and then declared and exported the *APIService* class with a constructor.

We have different REST endpoints such as `/api/accounts` and `/api/contacts` etc. Let's see an example with the `/api/contacts` endpoint:

## <a name="Vue_Axios_Get_Example">Vue and Axios GET Example</a>

Let's start by getting the list of contacts using an HTTP GET request. Add the following code to the `APIService.js`:

```js
getContacts() {
	const url = `${API_URL}/api/contacts/`;
	return axios.get(url).then(response => response.data);
}
```  

We declared a *getContacts()* method which makes a GET call, using the **axios.get()** method, to the `/api/contacts` endpoint. We are taking the *data* part from the response and then returning a Promise, from the function, which would resolve to an array of contacts or an error.

We also need a method to get single contacts by *id* or primary key. Let's add a second method to `APIService.js`:

```js
getContact(pk) {
	const url = `${API_URL}/api/contacts/${pk}`;
	return axios.get(url).then(response => response.data);
}
```

In the same way, the method returns a Promise which would resolve to a single contact or error.

### <a name="Example_Using_Http_GET_Calls">Example Using Http GET Calls</a>

After adding the two methods for sending GET requests to the API server, we can now call them from any Vue component.

First create a Vue components for displaying contacts. Navigate inside `frontend/src/components` then run the following command:

```bash
touch ListContacts.js
```

Open the `ListContacts.js` file and start by adding a template:

```html
<template>
<div>
<h1>Contacts ({{numberOfContacts}})</h1>


<table class="table table-bordered table-hover">

<thead>

<tr>

<th>#</th>

<th>First Name</th>
<th>Last Name</th>
<th>Email</th>
<th>Phone</th>
<th> Address </th>
<th>Actions</th>
</tr>
</thead>
<tbody>
<tr v-for="contact in contacts">

<th>{ { contact.pk } }</th>

<th>{ { contact.first_name } }</th>

<td>{ { contact.last_name } }</td>

<td>{ { contact.email } } </td>

<td>{ { contact.phone } }</td>


<td>{ { contact.address } }</td>

<td>

<button class="btn btn-danger" @click="deleteContact(contact)"> X</button>
</td>
</tr>
</tbody>
</table>
<div>
</div>
</div>

</template>
``` 

We use the *v-for* directive to loop through the *contacts* array and display information about each contact in a HTML table. 

Next, in the same file add the following JavaScript code:

```js
<script>
import {APIService} from '../APIService';

const API_URL = 'http://localhost:8000';
const apiService = new APIService();

export default {

name: 'ListContacts',

components: {

},

data() {

return {
contacts: [],
numberOfContacts:0,

};

},

methods: {

getContacts(){
	apiService.getContacts().then((data) => {

		this.contacts = data.data;
		this.numberOfContacts= data.count;
	});
},
},

mounted() {
this.getContacts();
},
}
</script>
```
 
 We first declare a *contacts* and *numberOfContacts* variables in the *data()* method of our Vue component. Next, we add a *getContacts()* method which call the *getContacts()* of the *APIService* instance we created in the start of the file. When the promise resolves we assign the results to our declared variables i.e *contacts* and *numberOfContacts*. In the *mounted()* method of the component we call the *getContacts()* method so we can get contacts to display as soon as the component is mounted.


## <a name="Vue_Axios_Post_Example">Vue and Axios Post Example</a>

Let's now see how we can post data to our RESTful API server by sending an http POST call using Axios. Add the following method to the `APIService.js` class:

```js
createContact(contact){

	const url = `${API_URL}/api/contacts/`;
	return axios.post(url,contact);
}
```

We declared a function *createContact()* which takes a *contact* object and send it via a POST request using **axios.post()** method. The function returns a Promise which can be resolved to success or error response.

## <a name="Vue_Axios_Put_Example">Vue and Axios Put Example</a>

After implementing the http POST method , let's see the code for making an http PUT method which can be used to update data.  In the  `APIService.js` class add the following method:

```js
updateContact(contact){

	const url = `${API_URL}/api/contacts/${contact.pk}`;
	return axios.put(url,contact);
}
```

The *updateContact()* method makes a PUT call to the API server by using the **axios.put()** method.

## <a name="Vue_Axios_Delete_Example">Vue and Axios Delete Example</a>

Let's see how to add a method for deleting contacts.   In the  `APIService.js` class, add the following method:
 
```js
deleteContact(contact){
	const url = `${API_URL}/api/contacts/${contact.pk}`;
	return axios.delete(url);
}
```

The *deleteContact()* use the **axios.delete()** method to send a DELETE request to the API server.

## <a name="Conclusion">Conclusion</a>

In this tutorial with Vue and Axios, we've seen how to implement CRUD (Create, Read, Update and Delete) functionality using the Axios http client with Vue.js and a REST API server.
