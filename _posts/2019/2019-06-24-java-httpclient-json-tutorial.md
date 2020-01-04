---
layout: post
title: "Java 11 HttpClient & Gson Tutorial: Send HTTP GET Requests and Parse JSON in a Single Source File Example"
image: "images/java.png"
excerpt: "In this tutorial, we'll learn about the HttpClient library introduced Java 11 for sending HTTP requests. We'll also see how to use the Gson library from Google to parse JSON data. 
" 
tags : [java]
---

In this tutorial, we'll learn about the `HttpClient` library introduced Java 11 for sending HTTP requests. We'll also see how to use the `Gson` library from Google to parse JSON data. 

We'll be using a single source file for our app which can be executed in Java 11 using the `java` command without first compiling it (using `javac`)just like a script file.

Prior to Java 11, developers had to use [URLConnection](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/URLConnection.html) to send HTTP requests. This package doesn't have an easy to use API and doesn't support the newer HTTP/2 protocol - As a result developers resorted to use third-party libraries like [Apache HTTP Client](https://hc.apache.org/httpcomponents-client-ga/) 

> **Note**: `HttpClient` doesn't currently have some advanced features like multi-part form data and compression support.

## Prerequisites

You will need to have Java 11 LTS version installed on your system. You can simply go to the [official website](https://www.oracle.com/technetwork/java/javase/downloads/index.html) and download the appropriate installer for your operating system. If you are using Ubuntu 19.04, you can also follow this [tutorial](https://www.techiediaries.com/ubuntu-install-oracle-java) to install Java 11 on your system.

You will also need some working knowledge of Java.

## How to Use HttpClient in Java 11 

`HttpClient` is available from the `java.net.http` package. 

Using `HttpClient` is as easy as adding one line of code:

```java
client = HttpClient.newHttpClient();
```

Or also:

```java
client = HttpClient.newBuilder().build();
```

You can also customize every aspect of the client:

```java
var client = HttpClient.newBuilder()
            .authenticator(Authenticator.getDefault())
            .connectTimeout(Duration.ofSeconds(60))
            .cookieHandler(CookieHandler.getDefault())
            .executor(Executors.newFixedThreadPool(3))
            .followRedirects(Redirect.NEVER)
            .priority(2) 
            .proxy(ProxySelector.getDefault())
            .sslContext(SSLContext.getDefault())
            .version(Version.HTTP_2)
            .sslParameters(new SSLParameters())
            .build();
```

These methods are used to change the default values of settings like:

- HTTP/2,
- Connection timeout,
- Redirection policy,
- Cookie handlers,
- Authentication,
- The proxy selector,
- SSL.
 
You can also use `HttpRequest` available from the `java.net.HttpRequest` package to create requests and `HttpResponse` available from the `java.net.HttpResponse` package  to work with response objects. For example:

```java
var httpRequest = HttpRequest.newBuilder()
        .uri(URI.create("https://www.techiediaries/feed.xml"))
        .GET()
        .build();
```

Here, we specify the request URI using the `uri()` method , we call the `GET()` method to specify a GET request and and we call `build()` to create an instance of `HttpRequest`. You can also use the other methods such as `GET()`, `POST()`, `DELETE()` and `PUT()` or you can use `method()` to specify any HTTP method:

```java
var request = HttpRequest.newBuilder(URI.create("https://www.techiediaries/feed.xml"))
        .method("HEAD", BodyPublishers.noBody())
        .build();
```

You can use `BodyPublishers.noBody()` for requests that don't expect a body.

After building your request, you can send it using the `send()` method of the client:

```java
HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
```

[`BodyHandlers.ofString()`](https://docs.oracle.com/en/java/javase/11/docs/api/java.net.http/java/net/http/HttpResponse.BodyHandlers.html#ofString()) converts the response raw data to a String. These are other options:

```java
BodyHandlers::ofByteArray
BodyHandlers::ofFile
BodyHandlers::ofString
BodyHandlers::ofInputStream
```

> **Note**: You can also send requests asynchronously using the `sendAsync()` method. Check the [docs](https://docs.oracle.com/en/java/javase/11/docs/api/java.net.http/java/net/http/HttpClient.html#sendAsync(java.net.http.HttpRequest,java.net.http.HttpResponse.BodyHandler)) for more information.

## Java 11 & HttpClient Example

Now, let's build a simple Java 11 example application that makes use of `HttpClient` to fetch data from a third-party REST API and display it. We'll be using a news REST API available from [newsapi](https://newsapi.org/).

You first need to head [to their website](https://newsapi.org/register) and register for an API key.

After submitting the form. You will be redirected to a page where you can get your API key.

## Java 11 Single Source Files or Scripts

Starting with Java 11, you can write script files as you don't have to first  compile your source code  with `javac` before  executing it with `java`.

For a single source code file, you can run the file directly with the `java` command and JVM will execute it. You can even use the shebang syntax in Unix based systems like Linux and macOS.
    
Open a new terminal, navigate inside a working folder and create a single file with the `.java` extension:

```bash
$ touch NewsScript.java
```

Next, open the file and add the following code:

```java
public class NewsScript {
 
    public static void main(String[] args) {
        System.out.println("### NewsScript! v1.0: Get Daily News ###");
    }
}
```

We simply create a Java class with a static main method and we call the `println()` method to display the `### NewsScript! v1.0: Get Daily News ###` string on the console.

Let's now run the file. Head back to your terminal and run the following command:

```bash
$ java NewsScript.java
```

If  you have Java 11, that should run the file and display the message on the console.

## Sending HTTP GET Requests with HttpClient

Now, let's actually get the news. In your source file add the following code:

```java
import  java.net.http.HttpClient;
import  java.net.http.HttpRequest;
import  java.net.http.HttpResponse;
import java.net.URI;

public class NewsScript {
 
    public static void main(String[] args) {
        System.out.println("### NewsScript! v1.0: Get Daily News ###");
        String API_KEY = "<YOUR_API_KEY_HERE>";
    
        var client = HttpClient.newHttpClient();

        var httpRequest = HttpRequest.newBuilder()
        .uri(URI.create(String.format("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=%s", API_KEY)))
        .GET()
        .build();

        try{
            var response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());
    


        }catch(Exception e){
            e.printStackTrace();
        }


    }
 
}
```

Make sure your replace  `<YOUR_API_KEY_HERE>` with your actual API key from the News API.

If your run this code, you should get the news data printed as a JSON string with news entries. 

## Parsing JSON Data with Gson

We need to parse the JSON string as a Java object so we can work with it. 

Since Java doesn't have any native JSON module, we'll make use of `gson`, a library by Google for working with JSON in Java. 

Since we are creating a single file script without Maven or Gradle, we need to download the jar file of the library and put it in the folder of our Java file. 

Head to this [Maven repo](https://repo1.maven.org/maven2/com/google/code/gson/gson/2.6.2/) and download the `.jar` file.

Now, when running the script, you should add the current folder in the class path of your app as follows:

```bash
$ java --class-path './*'  NewsScript.java
```

Next, let's parse our news data into Java objects. First, we need to create the following Data Transfer Objects or DTOs that correspond to the JSON structure of the returned data:

```java
class NewsDTO
{
  String status; 
  int totalResults;
  ArrayList<ArticleDTO> articles;
}

class ArticleDTO
{
  SourceDTO source;  
  String author;
  String title;
  String description;
  String url; 
}


class SourceDTO{
    String id;
    String name;
}
```

You need to import `ArrayList` using `import  java.util.ArrayList;` in your code.

> **Note**: These DTOs should be placed below the main class.

Next, import the `Gson` class:

```java
import  com.google.gson.Gson;
```

Next, change the code in the `try{} catch(){}` block  inside the `main()` method as follows:

```java
        try{
            var response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());

            NewsDTO obj = new Gson().fromJson(response.body(), NewsDTO.class);

            for (ArticleDTO art : obj.articles) {
			            System.out.println("### "+ art.title + " ### \n");
                        
                        System.out.println(art.description);
                        System.out.println("\nRead more: " + art.url + "\n");
                        
                        
		    }

        }catch(Exception e){
            e.printStackTrace();
        }
```

We simply call the `fromJson()` method available from the `Gson` instance and we pass in the response body which contains a JSON string. This will convert the string to an object  of the `NewsDTO` type. 

Finally, we iterate over the `articles` array (of `ArticleDTO` objects) from the `NewsDTO` object and we print the `title`, `description` and `URL` of each item to the standard output.

That's it! If we run our script using the following command:

```bash
$ java --class-path './*'  NewsScript.java
```

We should get something like the following screenshot:

![Java 11 HttpClient Example](https://www.diigo.com/file/image/badcbccczobcpdaaqbzdrpseabp/Screenshot+from+2019-06-24+01-23-28.jpg?k=e355496f2e2d47ec69d0bbfbacb29dff)

Enjoy your daily news from your terminal. You can click on each item's URL to read the full article on your web browser.

This is the full code source of the Java 11 script:

```java
import java.util.ArrayList;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

import com.google.gson.Gson;


public class NewsScript {
 
    public static void main(String[] args) {
        System.out.println("### NewsScript! v1.0: Get Daily News ###");
        String API_KEY = "<YOUR_API_KEY_HERE>";
    
        var client = HttpClient.newHttpClient();

        var httpRequest = HttpRequest.newBuilder()
        .uri(URI.create(String.format("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=%s", API_KEY)))
        .GET()
        .build();

        try{
            var response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            //System.out.println(response.body());
    
            NewsDTO obj = new Gson().fromJson(response.body(), NewsDTO.class);
            
            //System.out.println(obj.articles);

            for (ArticleDTO art : obj.articles) {
			            System.out.println("### "+ art.title + " ### \n");
                        
                        System.out.println(art.description);
                        System.out.println("\nRead more: " + art.url + "\n");
                        
                        
		    }

        }catch(Exception e){
            e.printStackTrace();
        }


    }
 
}

class NewsDTO
{
  String status; 
  int totalResults;
  ArrayList<ArticleDTO> articles;
}

class ArticleDTO
{
  SourceDTO source;  
  String author;
  String title;
  String description;
  String url; 
}


class SourceDTO{
    String id;
    String name;
}
```

## Conclusion

In this tutorial, we've used Java 11 `HttpClient` for sending HTTP requests with the `Gson` library for parsing JSON data to build a simple news application that allows you to read news from your terminal.

