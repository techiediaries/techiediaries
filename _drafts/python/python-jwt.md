If you like computer security topics, you will know that one of the most discussed and controversial topics is user authentication. Within its context, you will find a broad range of study areas, from new mechanisms to usability. It is, thus, to my surprise that JSON Web Tokens is a topic not often talked about, and I think it deserves to be in the spotlight today. We will see how easy it is to integrate it in an API authentication mechanism.

Key icon

Versus Sessions
There was a time when the only way to authenticate yourself into an application was by giving out credentials. Later came service APIs and sending out credentials in plain text was unacceptable. The idea of API tokens came up and nowadays, they are common practice.

Some of the disadvantages of giving out credentials to an application and maintaining a user’s state in relation to the application with session cookies are:

Data is stored in plain text on the server 
Even though the data is usually not stored in a public folder, anyone with access can read the contents of the session files.

Filesystem read/write requests 
Every time a session starts or its data is modified, the server needs to update the session file. The same goes for every time the application sends a session cookie. You will end up with a slow server if you have a considerable amount of users, unless you use alternative session stores.

Distributed/clustered applications 
Since the session files are stored in the file system by default, it is hard to have a distributed or clustered infrastructure for high availability applications that require the use of load balancers, clustered servers, etc… Other storage media and special configurations have to be made.

When dealing with service APIs that have restricted service calls, you will need to add your key to every request made (either in the request header, such as Authorization, or in the URL query string). API keys commonly rely on a centralized mechanism to control them. So if you want to mark an API key as invalid, it has to be revoked on the application side.

JWT
Since October 2010, there have been several proposals to use JSON based tokens. JWT or JSON Web Token was proposed on December 2010, having the following characteristics:

Intended for space constrained environments, such as HTTP Authorization headers or query string parameters.
Data to be transmitted in Javascript Object Notation format (JSON)
The data has to be the payload of a JSON Web Signature (JWS)
Represented using Base64 URL encoding
The JSON Web Signature is a cryptographic mechanism designed to secure data with a digital signature unique to the contents of the token in such a way that we are able to determine whether the data of the token has been tampered with or not.

The use of JWTs has many advantages over a single API key:

API keys are just random strings, while JWTs contain information and metadata that can describe user identity, authorization data and the validity of the token within a time frame or domain.
JWTs do not require a centralized issuing or revoking authority.
OAUTH2 compatible.
JWT data can be inspected.
JWTs have expiration controls.
On May 19th 2015, JWT became a published IETF RFC 7519.

What does it look like?
A JWT would look like the following:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0MTY5MjkxMDksImp0aSI6ImFhN2Y4ZDBhOTVjIiwic2NvcGVzIjpbInJlcG8iLCJwdWJsaWNfcmVwbyJdfQ.XCEwpBGvOLma4TCoh36FU7XhUbcskygS81HE1uHLf0E
It would appear that the string is just random characters concatenated together, and not very different from an API key. However, if you look closely, there are actually 3 strings, separated by a dot character.

The first and second strings are Base64 URL encoded JSON strings, so if we decode those, we will have the following results:

{
  "alg": "HS256",
  "typ": "JWT"
}
{
  "iat": 1416929109,
  "jti": "aa7f8d0a95c",
  "scopes": [
    "repo",
    "public_repo"
  ]
}
The first string is the JWS header, which states which cryptographic algorithm was used to generate the signature and the payload type. The second string is the payload, and passes along some standard fields, any data you wish to send within the token. The third string is the cryptographic signature, and will decode to binary data.

What is interesting about the signature is that the cryptographic algorithm requires a secret key, a string that only the issuer application has to know and should never be disclosed in any way. This way when the application receives a token, it can verify the signature against the contents of the token using said secret key. If the signature verification fails, we can know for sure that the data within the token has been tampered with and should be discarded.

You can take a look at jwt.io where you can play around with encoding and decoding JWTs.

Let’s Play
So how do we apply this to a PHP app? Let’s say we have a login mechanism that currently uses session cookies to store information about a user’s login state within the application. Please note that JWT was not designed to substitute session cookies. However, for this example, we will have a couple of services: one that generates a JWT based on the provided username and password, and another that will fetch a protected resource provided we supply a valid JWT.

Login page

Once we are signed in, we will be able to retrieve a protected resource from the application.

