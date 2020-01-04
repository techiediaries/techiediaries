---
layout: post
title: "PHP React & Axios JWT Authentication Tutorial"
image: "images/content/react.png"
excerpt: "In this tutorial, you'll learn to create an example React application with a PHP REST API on top of a MySQL database." 
tags : [php , react]
skipRss: true
---

Throughout this tutorial, we'll learn how to access HTTP Headers in Spring REST controllers.

We'll first see how to use the `@RequestHeader` annotation to access HTTP headers, next we’ll take an in-depth of `@RequestHeader`.

## How to Access HTTP Headers In Spring REST Controllers

If we need access to a specific header, we can configure @RequestHeader with the header name:

```java
@GetMapping("/greeting")
public ResponseEntity<String> greeting(@RequestHeader("accept-language") String language) {
    // code that uses the language variable
    return new ResponseEntity<String>(greeting, HttpStatus.OK);
}
```

Then, we can access the value using the variable passed into our method. If a header named accept-language isn’t found in the request, the method returns a “400 Bad Request” error.

Our headers don’t have to be strings. For example, if we know our header is a number, we can declare our variable as a numeric type:

```java
@GetMapping("/double")
public ResponseEntity<String> doubleNumber(@RequestHeader("my-number") int myNumber) {
    return new ResponseEntity<String>(String.format("%d * 2 = %d", 
      myNumber, (myNumber * 2)), HttpStatus.OK);
}
```

##  Accessing All Headers

If we’re not sure which headers will be present, or we need more of them than we want in our method’s signature, we can use the @RequestHeader annotation without a specific name.

We have a few choices for our variable type: a Map, a MultiValueMap or a HttpHeaders object.

First, let’s get the request headers as a Map:

```java
@GetMapping("/listHeaders")
public ResponseEntity<String> listAllHeaders(@RequestHeader Map<String, String> headers) {
    headers.forEach((key, value) -> {
        LOG.info(String.format("Header '%s' = %s", key, value));
    });
 
    return new ResponseEntity<String>(String.format("Listed %d headers", headers.size()), HttpStatus.OK);
}
```

If we use a Map and one of the headers has more than one value, we’ll get only the first value.  This is the equivalent of using the getFirst method on a MultiValueMap.

If our headers may have multiple values, we can get them as a MultiValueMap:

```java
@GetMapping("/multiValue")
public ResponseEntity<String> multiValue(@RequestHeader MultiValueMap<String, String> headers) {
    headers.forEach((key, value) -> {
        LOG.info(String.format("Header '%s' = %s", key, value.stream().collect(Collectors.joining("|"))));
    });
         
    return new ResponseEntity<String>(String.format("Listed %d headers", headers.size()), HttpStatus.OK);
}
```

We can also get our headers as an HttpHeaders object:


```java
@GetMapping("/getBaseUrl")
public ResponseEntity<String> getBaseUrl(@RequestHeader HttpHeaders headers) {
    InetSocketAddress host = headers.getHost();
    String url = "http://" + host.getHostName() + ":" + host.getPort();
    return new ResponseEntity<String>(String.format("Base URL = %s", url), HttpStatus.OK);
}
```

The HttpHeaders object has accessors for common application headers.

When we access a header by name from a Map, MultiValueMap or the HttpHeaders object, we’ll get a null if it isn’t present.

## @RequestHeader Attributes

Now that we’ve gone over the basics of accessing request headers with the @RequestHeader annotation, let’s take a closer look at its attributes.

We’ve already used the name or value attributes implicitly when we’ve specifically named our header:

1
public ResponseEntity<String> greeting(@RequestHeader("accept-language") String language) {}
We can accomplish the same thing by using the name attribute:

1
public ResponseEntity<String> greeting(@RequestHeader(name = "accept-language") String language) {}
Next, let’s use the value attribute exactly the same way:

1
public ResponseEntity<String> greeting(@RequestHeader(value = "accept-language") String language) {}
When we name a header specifically, the header is required by default. If the header isn’t found in the request, the controller returns a 400 error.

Let’s use the required attribute to indicate that our header isn’t required:

```java
@GetMapping("/nonRequiredHeader")
public ResponseEntity<String> evaluateNonRequiredHeader(
  @RequestHeader(value = "optional-header", required = false) String optionalHeader) {
    return new ResponseEntity<String>(
      String.format("Was the optional header present? %s!", (optionalHeader == null ? "No" : "Yes")), 
      HttpStatus.OK);
}
```

Since our variable will be null if the header isn’t present in the request, we need to be sure to do the appropriate null checking.

Let’s use the defaultValue attribute to provide a default value for our header:

```
@GetMapping("/default")
public ResponseEntity<String> evaluateDefaultHeaderValue(
  @RequestHeader(value = "optional-header", defaultValue = "3600") int optionalHeader) {
    return new ResponseEntity<String>(String.format("Optional Header is %d", optionalHeader), 
    HttpStatus.OK);
}
```

## Conclusion

In this tutorial, we learned how to access request headers in Spring REST controllers. First, we used the @RequestHeader annotation to supply request headers to our controller methods.

After a look a the basics, we took a detailed look at the attributes for the @RequestHeader annotation.

The example code is available over on GitHub.


https://www.baeldung.com/spring-rest-http-headers