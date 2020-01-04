---
layout: post
title: "Python Pandas Tutorial: Dataframes"
image: "images/content/django.png"
excerpt: "In this tutorial you'll learn to build and train a simple neural network with Python 3 and Numpy" 
tags : [ python , django ]
---

In this tutorial we'll learn about Python Pandas library for maching learning and we'll see how to use Dataframes with example.


## What is Data Science and Why Python

Data scientist is a field that uses science to extract knowledge from data. It nowadys has the most demand in terms of jobs and biggest salaries.

Let's see the defintion of data science from [Wikipedia](https://en.wikipedia.org/wiki/Data_science):

> A multi-disciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data.

Also from Wikipedia: 

> Data science is the same concept as data mining and big data: "use the most powerful hardware, the most powerful programming systems, and the most efficient algorithms to solve problems".

Python is the lingua-franca language of data science. Along with other languages like R and recently [Julia](https://www.techiediaries.com/julia-data-science-tutorial-dataframe-csv).

Python is an easy to learn OOP programmming language with a great community that provides a varielty of mature tools for data science like Numpy and Pandas.

In this tutorial, we’ll take a look at Pandas, a popular and powerful tool for doing data analysis in Python. We'll particularly be learning about the Pandas DataFrame structure.

We'll first introduce Pandas to beginners, and we'll explain what Pandas DataFrame is and then we'll see how to create and work with DataFrame structures.

## Installing Python Pandas

>Installing Pandas can be tricky due to its dependencies on numerical computing libraries like NumPy, which include tools for integrating with Fortran and other low-level languages.

>If you’re not a Python expert, the easiest way to get started with Pandas is to install the Anaconda distribution of Python. Check the Pandas installation docs to see all of your options.

## Introducing Pandas for Python Developers

Pandas is a mature and very powerful open source Python library for easily analyzing data. 

Pandas will help you clean your data sets, merge more than one data sets together, finding statistics like the mean and deviation of your data columns, handling mmissing values by setting defaults. 


## Python Pandas DataFrame

After getting familiar with the concept of data science, Pandas and why you would need to use it in Python. Let's learn about DataFrame, one of the most important concepts in the Pandas library.

So, what is a Pandas DataFrame?

A DataFrame is a two dimensional labeled data structure with columns of different types and rows that contain data.

The DataFrame structure is built on top of Numpy, another popular Pythn blazing-fast library that makes use of C/C++ and Fortran its computations.


You can think of a DataFrame as an Excel spreadsheet loaded in your computer memory.

> **Note**: A DataFrame is similar to the `data.frame` object in R (A programming language for statistics).  
>
> DataFrame columns can have different types


You can load datasets in DataFrames from builtin Python structures like Dicts and persistent storage such as Excel, CSV, SQLite and SQL database.

Now that we are familiar with the basic concepts of a Pandas DataFrame, let's see with examples how we can work with DataFrames.

Let's consider this example tabular data contructed using Google Spreadsheets:

![Python Pandas DataFrame Example](https://i.imgur.com/EcWgvyb.png)

In this small data set, we have three columns - Name, Title and Salary and six rows of data.

Let's see how we can create a Python Pandas DataFrame from this data set.

## Creating and Viewing a Pandas DataFrame

In this section, we'll see how to create and view a Pandas DataFrame from our simple data table. We'll use the example data to learn the basic Pandas operations.

Let's create a Pandas DataFrame. We have many different ways to create a DataFrame, such as:

- Using a Python dictionary, 
- Using a list of dictionaries,  
- Using a CSV file: You can use a CSV file to create a DataFrame using the `read_csv()` method which can also take a HTTP URL to download and read the CSV file.
- Using a database, etc.

In this tutorial we'll see example of using a Python Dict as the source of data and also a CSV file.


```python
import pandas as pd
url = ''
df = pd.read_csv(url)
type(df)
<class 'pandas.core.frame.DataFrame'>
>>> print(df)
```

In the example above, we imported Pandas and aliased it to pd, as is common when working with Pandas. Then we used the read_csv() function to create a DataFrame from our CSV file. You can see that the returned object is of type pandas.core.frame.DataFrame. Further, printing the object shows us the entire DataFrame.

## Viewing a DataFrame With Head and Tail

When you first assemble a new DataFrame, you often want to look at your data to see what you’re working with. If your DataFrame is large, it can be overwhelming to print the entire DataFrame if you just want to see a few rows.

You can use the shead() and tail() methods on your DataFrame object to print a few rows.

df.head()
df.tail()
         
head() will print the first few rows of your DataFrame and tail() will print the last few rows.

Both methods will show five rows by default, but also accept an optional argument to print the number of rows you prefer.

Understanding Your DataFrame With Info and Describe
In addition to seeing a few example rows, you may want to get a feel for your DataFrame as a whole. Pandas has some useful methods here as well.

The info() method will provide information on your DataFrame structure, including the number of rows in your DataFrame, the names and types of your columns, and the amount of memory usage for your DataFrame.

df.info()
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 15 entries, 0 to 14
Data columns (total 7 columns):
date      15 non-null object
symbol    15 non-null object
open      15 non-null float64
high      15 non-null float64
low       15 non-null float64
close     15 non-null float64
volume    15 non-null int64
dtypes: float64(4), int64(1), object(2)
memory usage: 920.0+ bytes
The describe() method will include summary statistics for your numeric columns, such as the mean, standard deviation, and percentiles:

df.describe()

These methods can save you a lot of time as you familiarize yourself with your data.

Manipulating Data in Your DataFrame
Now, let’s learn how to manipulate data in our DataFrame. Pandas makes it easy to clean and munge your data before doing machine learning or other analyses.

In this section, we’ll continue to use our DataFrame from the previous section. We’ll see how to select particular rows, how to select particular columns, and how to add a new column

## Selecting Rows in a Pandas DataFrame

Often you want to select rows in your DataFrame that meet a particular condition. For example, imagine we want to operate on rows for a single stock symbol.

We can use the loc() method to pass an equality statement that filters for rows where the symbol is equal to AMZN. This will return all trading data for Amazon.


## Selecting Columns in a Pandas DataFrame

You can select a specific column in your DataFrame using dot notation on your DataFrame object. You’d do this by specifying the name of the column you’d like to retrieve.

In the example above, we’re selecting the open column for all rows.

This makes it hard to see additional details about each row. Often, you’ll want to select multiple rows for better context. You can use bracket syntax and pass an array of column names to select multiple columns.


There you have it! We just retrieved the date, symbol, and open columns for each row.

Adding a New Column to a Pandas DataFrame
For this last example, let’s see how to change our DataFrame. We’ll do this by adding an entirely new column.

Imagine you want a column that shows the change in price for each stock on each trading day. You can create a new column using bracket syntax, just like adding a new key to a Python dictionary.

14  2019-03-07   GOOG  1155.72
df['change'] = df['close'] - df['open']
df


In the example above, we created a new column, change, that shows the difference between the open and the close values for a day.

Notice how we were able to assign it by operating on the DataFrame rows directly. When adding columns like this, Pandas knows to use the values for each row when computing its value. This makes it easy to add new values that are computed from existing values in your DataFrame.

## Conclusion

Throughout this tutorial, we have learned about the essential concepts of Pandas and data science. Pandas is a popular data analysis library that can be used in Python.

Next, we learned about the Pandas DataFrame, the most important data structure in Pandas. We've seen how to create, describe and manipulate a Pandas DataFrame.


