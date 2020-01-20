Django 3.0, the newest version of the Python framework that allows fast creation of database-backed websites and web services, now supports Python async, one of the most powerful new features in Python to make websites and network services faster.

Async allows Python programs, especially networking apps, to run more efficiently, but existing applications must be rewritten to use it. Django 3 will only work with Python 3.6 and later versions, the better to work with Python’s async programming features. 

A key way Django provides support for async is via ASGI, a protocol that serves as a standard interface between asynchronous Python applications and async-capable web servers. Previously, Django only supported WSGI, which only supported synchronous web applications. Django 3 will only allow async features to run in an app if it’s deployed as ASGI.

[ Learn Java from beginning concepts to advanced design patterns in this comprehensive 12-part course! ]
Django is a long-standing fixture of the Python web development community. It provides out-of-the-box implementations of many features common to websites—database connectivity, user accounts and user management, templating (to render web pages using data), logging and error handling, uploading files, and so on.


As with Python generally, Django’s convenience comes at the cost of relatively slow performance. Adding async to Django, though, means it may enjoy a performance boost for certain operations, such as handling multiple concurrent requests with less latency.

Many of the other new features on Django 3 are incremental, such as support for MariaDB 10.1 and up, removing APIs used for backward compatibility with Python 2 (as Python 2 is fast approaching end of support), and many additional features throughout.