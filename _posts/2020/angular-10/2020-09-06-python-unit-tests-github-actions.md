---
layout: bpost
title: "Run your Python Unit Tests with GitHub Actions"
image: "images/content/python.png"
excerpt: "In this tutorial, we'll learn how to automatically run your Python unit tests using GitHub Actions"
date: 2020-09-06
tags : [python, django]
---

In this tutorial, we'll learn how to automatically run your Python unit tests using GitHub Actions.

We'll see how to set up a GitHub Actions workflow that install Python 3.6 inside a Ubuntu system along with our project's dependencies e.g. `pytest` and finnaly run the unit tests after pushing our code to a GitHub repository.  

Let's see how to automate running unit tests when making a commit and pushing your code to GitHub or when making a pull request. 

Thanks to [GitHub Actions](https://github.com/features/actions) it's now easier than before without using any external services and they even provide a good free tier.
 
This will allow you to spot  the right commit(s) that broke your code.


We'll be using [Python 3](https://www.python.org/), and we will be working in a virtual environment. This is a good practice for Python to isolate system packages from our project's package. Even if this is a small example but should be a practice that you need to always follow.

Let's start by creating and activating a virtual environment for our project, by running the following commands:

```bash
$ mkdir pytestexample
$ cd pytestexample
$ python3 -m venv .env
```

This will create a virtual environment called  `.env`  in our project's folder.

Next, we need to activate this virtual environment using the following command:

```bash
$ source .env/bin/activate
```

Next, let’s install `pytest` in our  project's virtual environment using the following command:

```bash
$ pip install pytest
```


### Setting up A Python Project with PyTest

We'll be using `pytest` for testing.

It can be installed using the following command inside your virtual environment:

```bash
$ pip install pytest
``` 

>Pytest expects our tests to be located in files whose names begin with `test_` or end with `_test.py`.


Next, go ahead and add some tests:
 
Next, we'll create a file named  `test_capitalize.py`, next add the following Python code:

```python
# test_capitalize.py

def capitalize_string(s):
    return s.capitalize()
```
 

Next, we'll need to write a test. We need prefix the test function name with  `test_`, since this is what pytest expects:

```python
# test_capitalize.py

def capitalize_string(s):
    if not isinstance(s, str):
        raise TypeError('Please provide a string')
    return s.capitalize()

def test_capitalize_string():
    assert capitalize_string('test') == 'Test'
```

You can run the test, by running the following command:

```bash
$ pytest
```

Finally, we need to create a `requirements.txt` file using the following command:

```bash
$ pip freeze > requirements.txt 
```
 
Now that we made sure that our example is running locally with this simple example, let's set up a GitHub Actions workflow for automatically running the test(s) when our code is pushed to GitHub.



## Setting up a GitHub Actions Workflow

You can create a workflow by creating a YAML file inside the `.github/workflows/ci.yml` folder. 

Next, open the file and add the following content:

```yaml
name: Run Python Tests
on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Python 3
        uses: actions/setup-python@v1
        with:
          python-version: 3.6
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      - name: Run tests with pytest
        run: pytest 
``` 

This workflow is named `Run Python Tests`. it will be started when pushing or pulling code from the master branch of our repository. It contains one job named `build` with four steps which will run inside a Ubuntu runner.

We first give the workflow access to the code of the repository using the `checkout@v2` action. Next, we add a step named  `Install Python 3` which makes use of the `setup-python@v1` action to install Python 3.6. Next, we add a step that will install the dependencies of our project in Ubuntu. Finally we add a step for running our tests using `pytest`.

Now you simply need to run the following commands to commit and push to GitHub repository and wait for your tests to automatically run:

```bash
$ git add -A
$ git commit -m "First commit"
$ git push origin master 
```

## Conclusion

In this tutorial, we've seen how to use a GitHub Actions workflow to automate running your Python tests with PyTest.

