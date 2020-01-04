---
layout: post
title: "Create Python REST API Tutorial: No Server Framework vs. Flask vs. Django "
image: "images/content/django.png"
excerpt: "In this tutorial you'll learn to build and train a simple neural network with Python 3 and Numpy" 
tags : [ python , django ]
---

This tutorial will be your definitive guide on Python REST APIs. We'll first introduce REST APIs for beginners, then we'll see how to create a simple REST API example without a server framework and finally we'll see popular frameworks and libraries to create REST APIs in Python such as Django, Flask, Django REST framewrok, Tastypie and Flask REST. 

>In technical terms, JSON Web Token or JWT is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

>This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

>For example, a server could generate a token that has the claim "logged in as admin" and provide that to a client. The client could then use that token to prove that it is logged in as admin. 

<iframe width="583" height="330" src="https://www.youtube.com/embed/K6pwjJ5h0Gg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Token-based authentication:

<iframe width="583" height="330" src="https://www.youtube.com/embed/woNZJMSNbuo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## JWT Format

A JSON Web Token or JWT looks like a string with three parts separated by dots. The following is an example of JWT:

JWT in the serialized form represents a string of the following format:

> header.payload.signature

The header component contains information about how JWT signature should be computed. The payload component is the data that is stored inside the JWT. This can be user information like user ID, name and email.

To create the signature component, you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that. Read more here.

In this tutorial, we won't have to worry about generating or encoding and decoding JWT because we will use a library called PHP-JWT.

## JWT vs OAuth

We explained JWT above. JWT is a token format and we can say it is a simple authentication protocol. OAuth is an authentication framework that can use JWT as a token.

OAuth is used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords.

Use JWT if:

You have very simple use-case, like a single client application.
Your users access their resources only through your own application.
You want a quick-to-implement and simple stateless HTTP authentication to an API.
Use OAuth if:

Your users can access their resources through another application you don't own.
You want to provide API to browser-based apps, native mobile apps or desktop apps.
You want to use an Authentication Server that keeps track of tokens.

https://stackoverflow.com/questions/39909419/jwt-vs-oauth-authentication

https://community.apigee.com/questions/21139/jwt-vs-oauth.html





