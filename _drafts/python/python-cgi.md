# Python CGI Programming Tutorial: File Upload Example

In this tutorial, we'll learn about CGI programming with Python by creating a simple file upload CGI script.
 

## What is CGI

CGI stands for Common Gatway Interface. 

This is the definition of this technology from [Wikipedia](https://en.wikipedia.org/wiki/Common_Gateway_Interface)

>In computing, Common Gateway Interface (CGI) offers a standard protocol for web servers to execute programs that execute like console applications (also called command-line interface programs) running on a server that generates web pages dynamically. Such programs are known as CGI scripts or simply as CGIs. The specifics of how the script is executed by the server are determined by the server. In the common case, a CGI script executes at the time a request is made and generates HTML.

This means, you can create scripts in your server that execute whenever a client invokes  the script. The script executes and sends the results back as HTML.  

>    The current version is CGI/1.1 and CGI/1.2 is under progress.

To understand the concept of CGI, let us see what happens when we click a hyper link to browse a particular web page or URL.

-   Your browser contacts the HTTP web server and demands for the URL, i.e., filename.
-   Web Server parses the URL and looks for the filename. If it finds that file then sends it back to the browser, otherwise sends an error message indicating that you requested a wrong file.
-   Web browser takes response from web server and displays either the received file or error message.

However, it is possible to set up the HTTP server so that whenever a file in a certain directory is requested that file is not sent back; instead it is executed as a program, and whatever that program outputs is sent back for your browser to display. This function is called the Common Gateway Interface or CGI and the programs are called CGI scripts. These CGI programs can be a Python Script, PERL Script, Shell Script, C or C++ program, etc.

>An HTTP server invokes a Python CGI script so it can process user input that a user may submit through an HTML <FORM> or <ISINDEX> element.

Let's see this by example!

How can you create a CGI script with Python?

Python CGI module handles situations and helps debug scripts. With the latest addition, it also lends us support for uploading files from a form.



