---
layout: post
title: "How to Pass, Access & Update Parent State from Child Components in React"
image: "images/content/react.png"
excerpt: "In this tutorial, you'll learn to access and update the state of a parent component from a child component in React" 
tags : [react]
skipRss: true
---

in a [previous tutorial](https://www.techiediaries.com/php-react-rest-api-crud-tutorial), we've built a simple React application with a parent `App` component and child `ContactForm` component. The parent component displays an HTML table of data which gets retrieved from a PHP API backend and stored in a state variable named `contacts`. This is the example `ContactForm` child component:

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

The child component renders an HTML form and stores its internal state comprised of the values of the form fields. It also provides a `handleFormSubmit()` method which handles submitting the form to the backend REST API using the Axios client and the `FormData` structure.

This is the implementation of the parent `App` component:

```js
class App extends React.Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    const url = '/api/contacts.php'
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ contacts: data })
      console.log(this.state.contacts)
     })
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
        <ContactForm />
        </React.Fragment>
    );
  }
}
```

The `App` component has a `contacts` state variable that will be used to hold data retrieved from a REST API with Axios. 

In the `componentDidMount()` method we send a call to the API and use the [React `setState()` method](https://www.techiediaries.com/react-setstate) to update the component state with the fetched data.

The `render()` method returns a React fragment and displays an HTML table of contacts data and the `ContactForm` component.

`ContactForm` is a child component of `App`.

We create new contacts in the `ContactForm` component and we want the new contact to be added to the HTML table (i.e to the parent `App` `contacts` state) without the need to refresh the table. 

This means we need to access the `contacts` state of the parent `App` component from the `ContactForm` child component so we can push the new contact to the `contacts` array in the `handleFormSubmit()` method of the child component when the Axios Promise is successfully resolved (i.e the contact is successfully created in the server).

## How to Access the Parent Component State from The Child Component in React

We can access the state of the parent React component using various methods such as **props** and the **context** API:

### Sending the Parent State as A Prop of Child Component 

You can send the state of the parent component as a prop to the child component:

```js
<ContactForm contacts={this.state.contacts} />
```

 In the parent component you can get the passed state as follows:

 ```js
 this.props.contacts
 ```

Since props are immutables, you can't update the parent state using this method.

## Using a Prop Method to Handle State Update

To be able to access and update state from the child component, we can add a method that handles updating the state to the parent component and pass the method as a prop to the child component instead of the state itself.

So, let's implement this step by step in our previous example. In the parent `App` component, add the following `handleStateChange()` method and bind it to the class:

```js
class App extends React.Component {
  
  constructor () {
    super();
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  state = {
    contacts: []
  }

  handleStateChange(value){
    event.preventDefault();
    let contacts = this.state.contacts;
    contacts.push(value);
    this.setState({ contacts : contacts })
  }
```

In the `handleStateChange()` method we grab the `contacts` state variable, we push the contact passed as a parameter and we use the [React `setState()` method](https://www.techiediaries.com/react-setstate) to update the state.

Next, pass the method as a prop to the child component:

```js
    <ContactForm handleStateChange = {this.handleStateChange} />
``` 

Next, call the `handleStateChange()` method in the `handleFormSubmit()` method of `ContactForm` and pass the new contact as a parameter:    

```js
handleFormSubmit( event ) {
        event.preventDefault();
        

        let formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('city', this.state.city)
        formData.append('country', this.state.country)
        formData.append('job', this.state.job)

        var contact = {};
        formData.forEach(function(value, key){
            contact[key] = value;
        });
        this.props.handleStateChange(contact);

        /* [...] */
}
```

## Use React Context API

Instead of props, you can also use the [Contexts API](https://facebook.github.io/react/docs/context.html). 

## Using Redux for Accessing and Updating Parent State from Child Component

If your application is more complex than this simple example, you can use a state management library like Redux and `connect()` both  the `App` and `ContactForm` components to the `contacts` in Redux store. In this case, the `contacts` state variable needs to be part of global app state.

## Conclusion

In this tutorial, we've seen how to access and update the state of a parent component from a child component.  





