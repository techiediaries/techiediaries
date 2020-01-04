---
layout: post
title: "Julia Data Science Tutorial: Working with DataFrames and CSV"
image: "images/content/julia.png"
excerpt: "Julia Data Science Tutorial" 
tags : [ julia ]
---

In this tutorial we'll take our first steps in data science with Julia programming language and we'll see how to work with a DataFrame and CSV. We'll learn about:

- What's data science
- How to Install Julia in Ubuntu
- How to Install Packages in Julia
- What is a DataFrame
- Creating a Julia DataFrame from Vectors
- Creating a Julia DataFrame from Dictionaries
- Reading and Writing CSV Files
- Writing a DataFrame to CSV File
- Reading a CSV File 


## What is Data Science

First what's data science and what data scientists exactly do? 

[Wikipedia](https://en.wikipedia.org/wiki/Data_science) defines data science as:

> A multi-disciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data.

Also from Wikipedia: 

> Data science is the same concept as data mining and big data: "use the most powerful hardware, the most powerful programming systems, and the most efficient algorithms to solve problems".

Data science comprises fields like statistics, data analysis, machine learning and their related methods.

Investopedia defines data science as:

>As a field of Big Data geared toward providing meaningful information based on large amounts of complex data. Data science, or data-driven science, combines different fields of work in statistics and computation in order to interpret data for the purpose of decision making. 

So what do you need to become a data scientist?

You first need to learn a programming language like Python or [Julia](https://julialang.org/).

Python is most known for its use in data science but Julia is also a promising language and one of the fatest growing programming languages for data science.

Julia is a high-level, high-performance and dynamic programming language for technical computing.

Data science is all about databases and large data sets. Julia has official tools for working  with almost all databases using `JDBC.jl` and `ODBC.jl` drivers. In addition, it also integrates with the Hadoop ecosystem using `Spark.jl`, `HDFS.jl`, and `Hive.jl`.

Julia also provides tools, such as DataFrames, JuliaDB, Queryverse and JuliaGraphs, to work with multidimensional datasets quickly, perform aggregations, joins and preprocessing operations in parallel, and save them to disk in efficient formats. 


You can also use packages from Python, R, C/Fortran, C++, and Java in your Julia code if you want to work with a specific library.

## How to Install Julia in Ubuntu

Let's now see how to install Julia in Ubuntu. As of this writing, the current stable release is **v1.1.0**.

Open a new terminal and run the following commands to download Julia binary for Ubuntu from the [offcial website](https://julialang.org/downloads/) and extract it:

```bash
$ cd ~
$ wget https://julialang-s3.julialang.org/bin/linux/x64/1.1/julia-1.1.0-linux-x86_64.tar.gz 

$ tar xvfa julia-1.1.0-linux-x86_64.tar.gz
``` 

Next, you need to put the `~/julia-1.1.0/bin/` path in your system  $PATH variable to be able to access the `julia` binary from any directory.

```bash
$ echo PATH=\$PATH:~/julia-1.1.0/bin/ >> ~/.profile
$ source ~/.profile
```

Now, you can run `julia` using the following command:

```bash
$ julia
```

This is the output of the program:

```bash
              _
   _       _ _(_)_     |  Documentation: https://docs.julialang.org
  (_)     | (_) (_)    |
   _ _   _| |_  __ _   |  Type "?" for help, "]?" for Pkg help.
  | | | | | | |/ _` |  |
  | | |_| | | | (_| |  |  Version 1.1.0 (2019-01-21)
 _/ |\__'_|_|_|\__'_|  |  Official https://julialang.org/ release
|__/                   |

```

You can quit the program using `exit()` or press **Ctrl-D**.

> **Note**: You can also run Julia in the browser on [JuliaBox.com](https://juliabox.com/) with Jupyter notebooks. 


## How to Install Packages in Julia

One important aspect of any programming language is package management. Julia provides the `Pkg` package for installing packages. 

> **Note**:  Julia has more than [2000 Julia packages](https://pkg.julialang.org/). See [the list of the most used Julia packages](https://juliaobserver.com/packages).

You can install a specific package using the `Pkg.add("package_name")` command.

Let's see this by example. Head back to your terminal and run `julia` then run the following code:

```julia
julia> Pkg.add("DataFrames")
``` 

You will get the following error:

```julia
ERROR: UndefVarError: Pkg not defined
Stacktrace:
 [1] top-level scope at none:0
```

That's because `Pkg` itself is a package in Julia so you need to import it using the `using` keyword:

```julia
julia> using Pkg
julia> Pkg.add("DataFrames")
```

This will download and install the `DataFrames` package and all its dependecies.


You can check the installed packages by calling `Pkg.installed()`:

```julia
julia> Pkg.installed()
Dict{String,Union{Nothing, VersionNumber}} with 1 entry:
  "DataFrames" => v"0.17.1"
```
> **Note**: You can check the [official docs](https://docs.julialang.org/en/v1/stdlib/Pkg/index.html) for more information about how to work with packages in Julia.

## What is a DataFrame?

A DataFrame is a 2-dimensional labeled data structure that can have columns of different types.

You can see a DataFrame as an Excel sheet.

You can load datasets in your DataFrame memory structure from other Julia buitin structures or persistent storage such as Excel, CSV and SQL database.

Let's consider this example tabular data contructed using Google Spreadsheets:

![Julia DataFrame Example](https://i.imgur.com/EcWgvyb.png)

We have three columns - Name, Title and Salary and six rows.

Let's now see how we can construct a Julia DataFrame from this table.

### Creating a Julia DataFrame from Vectors

From our example, we can see that each column can be seen as a Vector.

The first vector is `Name =  ["N1", "N2", "N3", "N4", "N5", "N6"]`

The second vector is `Title =  ["Engineer", "Developer", "Designer", "DB Administrator", "Mobile Developer", "Data Scientist"]`

The third vector is `Salary =  [20000, 30000, 25000, 26000, 30000, 40000]`

> **Note**: Just like Mathematics, In Julia a Vector is a special type of Matrix that has only one row (row matrix) or one column (column matrix).
>
> This is also called a 1D-Array


Just like most programming languages you use arrays in Julia for creating ordered collections of elements. In Julia you can use the square brackets and commas to create arrays. 

In Julia, you can use arrays for representing lists, vectors, tables, and matrices.



Head back to your Julia interpeter and run the following code

```julia
julia> using DataFrames
julia> df = DataFrame(Name =  ["N1", "N2", "N3", "N4", "N5", "N6"], Title =  ["Engineer", "Developer", "Designer", "DB Administrator", "Mobile Developer", "Data Scientist"], Salary =  [20000, 30000, 25000, 26000, 30000, 40000])
```

We create a DataFrame from our previous vectors (or arrays).

You should get the following output:


```julia
6×3 DataFrame
│ Row │ Name   │ Title            │ Salary │
│     │ String │ String           │ Int64  │
├─────┼────────┼──────────────────┼────────┤
│ 1   │ N1     │ Engineer         │ 20000  │
│ 2   │ N2     │ Developer        │ 30000  │
│ 3   │ N3     │ Designer         │ 25000  │
│ 4   │ N4     │ DB Administrator │ 26000  │
│ 5   │ N5     │ Mobile Developer │ 30000  │
│ 6   │ N6     │ Data Scientist   │ 40000  │

```

This means we created a DataFrame with six rows and three columns. It's exactly our table in the spreadsheet!

![Julia DataFrame Example](https://i.imgur.com/yUq2kg3.png)


### Creating a Julia DataFrame from Dictionaries

You can use `Dict` to create a dictionary in Julia. Given a single iterable argument, let's construct a Dict whose key-value pairs are taken from 2-tuples (key,value).

#### Examples


```julia
julia> Dict([("A", 1), ("B", 2)])
  Dict{String,Int64} with 2 entries:
    "B" => 2
    "A" => 1
```

Alternatively, a sequence of pair arguments may be passed.

```julia
julia> Dict("A"=>1, "B"=>2)
  Dict{String,Int64} with 2 entries:
    "B" => 2
    "A" => 1
```

Let's now see how we can contruct our previous DataFrame from our example table. 


Let's first define our pairs:


The first pair is `"Name" =>  ["N1", "N2", "N3", "N4", "N5", "N6"]`

The second pair is `"Title" =>  ["Engineer", "Developer", "Designer", "DB Administrator", "Mobile Developer", "Data Scientist"]`

The third pair is `"Salary" =>  [20000, 30000, 25000, 26000, 30000, 40000]`


In you terminal run the following code to create a DataFrame from a Dict:

```julia
julia> df = DataFrame(Dict("Name" =>  ["N1", "N2", "N3", "N4", "N5", "N6"], "Title" =>  ["Engineer", "Developer", "Designer", "DB Administrator", "Mobile Developer", "Data Scientist"], "Salary" =>  [20000, 30000, 25000, 26000, 30000, 40000]))
```

Again, we get the following output:

```julia
6×3 DataFrame
│ Row │ Name   │ Salary │ Title            │
│     │ String │ Int64  │ String           │
├─────┼────────┼────────┼──────────────────┤
│ 1   │ N1     │ 20000  │ Engineer         │
│ 2   │ N2     │ 30000  │ Developer        │
│ 3   │ N3     │ 25000  │ Designer         │
│ 4   │ N4     │ 26000  │ DB Administrator │
│ 5   │ N5     │ 30000  │ Mobile Developer │
│ 6   │ N6     │ 40000  │ Data Scientist   │
```


## Reading and Writing CSV Files

We can use ths [CSV.jl](https://github.com/JuliaData/CSV.jl) package to read and write CSV files.

Head back to your julia terminal and import `CSV.jl` using the following code:

```julia
julia> using Pkg
Pkg.add("CSV")
```  

This will download and install the CSV package and its dependencies.

Next, import the CSV methods using the following code:

```julia
julia> using CSV
```

### Writing a DataFrame to CSV

Next, let's write our previous DataFrame to a `data.csv` file using the following code:

```julia
julia> CSV.write("data.csv", df)
"data.csv"
``` 

You should find the `data.csv` file in your current directory from which you invoked `julia`.

### Reading a CSV File

You can read a CSV file using the CSV.read() method. Let's read our `data.csv` file back using the following code:

```julia
julia> CSV.read("data.csv")
```

The result is a DataFrame as follows:

```julia
6×3 DataFrame
│ Row │ Name    │ Salary │ Title            │
│     │ String⍰ │ Int64⍰ │ String⍰          │
├─────┼─────────┼────────┼──────────────────┤
│ 1   │ N1      │ 20000  │ Engineer         │
│ 2   │ N2      │ 30000  │ Developer        │
│ 3   │ N3      │ 25000  │ Designer         │
│ 4   │ N4      │ 26000  │ DB Administrator │
│ 5   │ N5      │ 30000  │ Mobile Developer │
│ 6   │ N6      │ 40000  │ Data Scientist   │
```

## Conclusion

In this tutorial we introduced you to data science with the Julia programming language. We have seen what's data science and how to install Julia in Ubuntu then seen the definition of the DataFrame structure and how to create a DataFrame from our example tabular data using the DataFrames package.





