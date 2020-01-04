---
layout: post
title: "Adding the Django CSRF Protection to React Forms"
image: "images/content/react.jpg"
excerpt: "In this tutorial you'll see how you can handle the Django CSRF token in React when using the Axios client or the fetch API. We'll also see how you can add CSRF in forms rendered dynamically with React" 
tags : [django , react , python] 
---

**In this tutorial you'll see how you can handle the Django CSRF token in React when using the Axios client or the fetch API. We'll also see how you can add CSRF in forms rendered dynamically with React**

![](/images/content/react.jpg)


More often than not when you are building React/Redux apps with a Django framework you'll need to send POST, PUT, PATCH and DELETE requests (which require a valid CSRF token included in each request) against an API endpoint using an HTTP client library such as Axios or the browser standard fetch API.

CSRF stands for Cross-Site Request Forgery and it's a type of [Cross Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attack that can be sent from a malicious site through a visitor's browser to your server. 

Django has a built in protection against CSRF attacks using the CSRF middleware which's included by default with each new project. Here is what Django docs says about the CSRF middleware  

>The CSRF middleware and template tag provides easy-to-use protection against Cross Site Request Forgeries. This type of attack occurs when a malicious website contains a link, a form button or some JavaScript that is intended to perform some action on your website, using the credentials of a logged-in user who visits the malicious site in their browser. A related type of attack, ‘login CSRF’, where an attacking site tricks a user’s browser into logging into a site with someone else’s credentials, is also covered.--[Django docs](https://docs.djangoproject.com/en/1.9/ref/csrf/#ajax)

Django also provides the `{ % csrf_token % }` tag that you need to include in your templates's forms that use a POST request to protect your application from being exploited using CSRF. Here is how you can use it: 

```html
<form action="" method="post">
{ % csrf_token % }
</form>
```


You don't need to explicetely include it if you are using Django Forms.

## Handling CSRF when Using React

When using JavaScript like React you need to find a way to handle CSRF tokens if if you don't want to disable it.

There are many methods you can use depending on the HTTP client you are using but generally you need to read the CSRF token from a Django cookie and send it with any requests to the Django back-end.

## Handling CSRF Tokens in React/Axios



For Axios client you have three options:

* you can manually attach the CSRF token in the header of each Axios call
* you can use the Axios `xsrfHeaderName` for each call
* you can use a default `xsrfHeaderName` (`axios.defaults.xsrfHeaderName = "X-CSRFToken"`)

Here is how you can simply use the CSRF token with Axios without any further configuration:

```javascript
import axios from 'axios';
 
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

```

## Handling CSRF Tokens in React/Fetch

Now let's see how you can do it using the fetch API.

The first step is to get CSRF token which can be retrieved from the Django `csrftoken` cookie (will be set only if you enabled CSRF protection in Django).

Now from the [Django docs](https://docs.djangoproject.com/en/1.9/ref/csrf/#ajax) you can find out how to get the csrf token from the cookie by using this simple JavaScript function:

```js
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
```

You can also find another implementation for this function from [Github](https://github.com/js-cookie/js-cookie/).

Now you can retrieve the CSRF token by calling the `getCookie('csrftoken')` function

```javascript
var csrftoken = getCookie('csrftoken');
```

Next you can use this csrf token when sending a request with `fetch()` by assigning the retrieved token to the `X-CSRFToken` header.


```javascript
  fetch(url, {
    credentials: 'include',
    method: 'POST',
    mode: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: {}
   })
  }
```

## Rendering the CSRF Token in React Forms

If you are using React to render forms instead of Django templates you also need to render the csrf token because the Django tag `{ % csrf_token % }` is not available at the client side so you need to create a higher order component that retrieves the token using the `getCookie()` function and render it in any form.

So first start by creating a HOC in `csrftoken.js`

```js
import React from 'react';

var csrftoken = getCookie('csrftoken');

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
export default CSRFToken;
```

Then you can simply import it and call it inside your form 

```js
import React, { Component , PropTypes} from 'react';
  
import CSRFToken from './csrftoken';

  
class aForm extends Component {
    render() {
        
        return (
                 <form action="/endpoint" method="post">
                        <CSRFToken />
                        <button type="submit">Send</button>
                 </form>
        );
    }
}
  
export default aForm;
```

## The Django CSRF Cookie

React renders components dynamically that's why Django might not be able to set a CSRF token cookie if you are rendering your form with React. This how [Django docs](https://docs.djangoproject.com/en/2.0/ref/csrf/) says about that:

>If your view is not rendering a template containing the csrf_token template tag, Django might not set the CSRF token cookie. This is common in cases where forms are dynamically added to the page. To address this case, Django provides a view decorator which forces setting of the cookie: ensure_csrf_cookie().

To solve this issue Django provides the [ensure_csrf_cookie](https://docs.djangoproject.com/en/2.0/ref/csrf/#django.views.decorators.csrf.ensure_csrf_cookie) decorator that you need to add to your view function. For example:

 

```python
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def myview(request):
    #...
```
## Handling CSRF Using React/Redux 

If you are using Redux to manage your application state you can use this module to [handle CSRF token in Redux](https://github.com/evenchange4/redux-csrf).


You can use by first installing it from npm with

```bash
npm install redux-csrf --save
```

Then you can use the `setCsrfToken(token)` API that set the CSRF token in the Redux store.

## Conclusion

The built in CSRF protection provided by Django is very useful to protect your server from malicious websites that can exploit your visitor browser to attack you but when using modern JavaScript libraries you will need to handle CSRF differently. In this article we have seen different ways to handle CSRF in React apps instead of disabling it.  


