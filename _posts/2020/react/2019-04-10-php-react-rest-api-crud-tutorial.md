---
layout: post
title: "PHP, MySQL & React REST API Tutorial with Example Form"
image: "images/content/react.png"
excerpt: "In this tutorial you will learn how to build a RESTful CRUD React app with PHP and MySQL." 
tags : [ php, react, mysql ]
---

Throughout this tutorial, we'll be using PHP with React and Axios to create a simple REST API application with CRUD operations. In the backend we'll use PHP  with a MySQL database.

The PHP backend will expose a set of RESTful API endpoints so we'll be using the Axios library for making Ajax calls from the React.js UI.

We'll also see how to handle forms in React and how to send multipart form data with Axios using [FormData](https://www.techiediaries.com/formdata/).

In this tutorial, we are going to integrate React with PHP using Babel in the browser and a `<script>` tag. As such, we'll serve the React application from PHP so we don't need to enable CORS in our server since both the backend and frontend are served from the same domain. 

We'll see the other approach of using two separate servers for the frontend and backend apps in another tutorial which will use the `create-react-app` to create the React project.    

## Prerequisites

You must have the following prerequsites in order to follow this tutorial comfortably:

- Knowledge of PHP and MySQL,
- Knowledge of JavaScript and React,
- PHP and MySQL installed on your development machine.  

## Creating the MySQL Database

Let's start by creating a MySQL database using the MySQL client (this usually gets installed when you install the MySQL server). Open a new terminal and run the following command:

```bash
mysql -u root -p
```

You'll be asked for your MySQL password. Make sure to submit the correct password and type **Enter** on your keyboard to confirm.

Next, you'll be presetend with the MySQL client CLI. You can create a database using the following SQL statement:

```bash
mysql> create database reactdb;
```

Next, let's add a SQL table in our database. Simpy run the following SQL instructions:

```bash
mysql> use reactdb;
mysql> CREATE TABLE `contacts` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `city` varchar(100),
  `country` varchar(100),
  `job` varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

We first run the `use` SQL instruction to select the `reactdb` database as our current working database. Next, we invoke the `CREATE TABLE <name_of_table>` statement to create a SQL table that has the following columns:

- id: A unique identifier for the person,
- name: The name of the person,
- email: The email for the person,
- city: The city of the person
- country: The country of the person
- job: The job occupied by the person

Basically, this is a simple database for managing your contacts data.

## Creating The PHP & MySQL RESTful API 

After creating the MySQL database, table and columns. Let's
now proceed to create a RESTful API interface exposed by a PHP application that runs CRUD operations against our previously-created MySQL table. Head back to your terminal and start by creating a directory for your project's files:

```bash
$ cd ~
$ mkdir php-react-rest-api-crud
```


## Create a REST API Endpoint

Now, let's create an endpoint that provides contacts data in a JSON format to our Vue frontend.

Create an `api` folder inside your project's root folder:

```bash
$ mkdir api
```

Navigate inside the `api` folder and create a `contacts.php` file and add the following content:

```php
<?php
$host = "localhost"; 
$user = "root"; 
$password = "YOUR_MYSQL_DB_PASSWORD"; 
$dbname = "reactdb"; 
$id = '';

$con = mysqli_connect($host, $user, $password,$dbname);

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
    case 'GET':
      $id = $_GET['id'];
      $sql = "select * from contacts".($id?" where id=$id":''); 
      break;
    case 'POST':
      $name = $_POST["name"];
      $email = $_POST["email"];
      $country = $_POST["country"];
      $city = $_POST["city"];
      $job = $_POST["job"];
      
      $sql = "insert into contacts (name, email, city, country, job) values ('$name', '$email', '$city', '$country', '$job')"; 
      break;
}

// run SQL statement
$result = mysqli_query($con,$sql);
 
// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'GET') {
    if (!$id) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
  } elseif ($method == 'POST') {
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  }

$con->close();
```

We first use the MySQLi PHP extension to create a connection to our MySQL database using the `mysqli_connect()` method. Next, we use the `$_SERVER['REQUEST_METHOD']` to retrieve the request method sent from the Axios client. If the request is GET, we create a SQL `SELECT` query. if the request is POST we create a SQL `INSERT` query with the post data retrieved from the `$_POST` object.

After that, we use the `mysqli_query()` method to run the query against our database table either to get or create data. Finally we use the `json_encode()` method to encode data as JSON data and send it to the client.  

You can serve your PHP application using the following command from the root of your project:

```bash
$ php -S 127.0.0.1:8080
```

## Create the React App

Next, navigate to the project's root folder and add an `index.php` file:

```bash
$ touch index.php
```

Next, open the `index.php` file and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP| MySQL | React.js | Axios Example</title>
    <script src= "https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src= "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <!-- Load Babel Compiler -->
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

</head>
<body>
</body>
</html>
```

We simply include the React, ReactDOM, Babel and Axios libraries from their CDNs. 

Next, in the `index.html`, in the `<body>` tag add a `<div>` tag where you can mount your React application:

{% raw %}
```html
<div id='root'></div>
```
{% endraw %}

Next, add a `<script>` tag of the `text/babel` type to create our React app:

```html
<body>
<div id='root'></div>

<script  type="text/babel">

class App extends React.Component {
  state = {
    contacts: []
  }
  render() {
    return (
        <React.Fragment>
        <h1>Contact Management</h1>
        <table border='1' width='100%' >
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>City</th>
            <th>Job</th>     
        </tr>

        {this.state.contacts.map((contact) => (
        <tr>
            <td>{ contact.name }</td>
            <td>{ contact.email }</td>
            <td>{ contact.country }</td>
            <td>{ contact.city }</td>
            <td>{ contact.job }</td>
        </tr>
        ))}
        </table>
        </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
</script>
</body>   
```

We first create a React component called `App` by extending the `React.Component` class. Next, we add a contacts variable to the `state` object which will be used to hold the contacts after we [fetch them from the PHP REST endpoint using Axios](https://www.techiediaries.com/react-axios/).

Next, we define a React `render()` method which returns a fragment that wraps the `<h1>` header and `<table>` elements.

In the table we loop through the `this.state.contacts` and we display each `<tr>` corresponding to each contact information.

Finally, we use the render() method of ReactDOM to actually mount our `App` component to the DOM.

The `contacts` array is empty. Let's use the Axios client to send a GET request to fetch data from `/api/contacts.php` endpoint exposed by the PHP server.

In the App component add a `componentDidMount()` life cycle method, which gets called when the component is mounted in the DOM, and inside it; add the code to fetch data:

```js
  componentDidMount() {
    const url = '/api/contacts.php'
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ contacts: data })
      console.log(this.state.contacts)
     })
  }
```

When data is fetched, we call the [React setState](https://www.techiediaries.com/react-setstate) method to update the state of the component with the fetched data.

## Create a React Form for Submitting Data 


Let's now add a React component that displays a form and handles submitting the form to the PHP backend. In your `index.php` file add the following component before the `App` component:


```js
class ContactForm extends React.Component {
    state = {
        name: '',
        email: '',
        country: '',
        city: '',
        job: '',

    }

    handleFormSubmit( event ) {
        event.preventDefault();
        console.log(this.state);
    }

    render(){
        return (
        <form>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}/>
            
            <label>Email</label>
            <input type="email" name="email" value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}/>
            
            <label>Country</label>
            <input type="text" name="country" value={this.state.country}
                onChange={e => this.setState({ country: e.target.value })}/>
            
            <label>City</label>
            <input type="text" name="city" value={this.state.city}
                onChange={e => this.setState({ city: e.target.value })}/>
            
            <label>Job</label>
            <input type="text" name="job" value={this.state.job}
                onChange={e => this.setState({ job: e.target.value })}/>
            
            <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Create Contact" />
        </form>);
    }
}
```

Next include it in the `App` component to be able to display it below the table:

```js

class App extends React.Component {
  // [...]
  render() {
    return (
        <React.Fragment>
            <!-- [...] -->
            <ContactForm />
        </React.Fragment>
    );
  }
}
``` 

Now let's change the `handleFormSubmit()` of `ContactForm` method to actually send the form data using Axios and FormData to our PHP REST endpoint which takes care of saving it in the MySQL database:

```js
    handleFormSubmit( event ) {
        event.preventDefault();
        

        let formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('city', this.state.city)
        formData.append('country', this.state.country)
        formData.append('job', this.state.job)

        axios({
            method: 'post',
            url: '/api/contacts.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            console.log(response)
            
        })
        .catch(function (response) {
            //handle error
            console.log(response)
        });
    }

```


## Conclusion

In this tutorial, we've seen how to use PHP with MySQL, React and Axios to create a simple REST API CRUD example application. We have also seen how to handle forms in React and submit data to the server.