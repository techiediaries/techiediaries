---
layout: post
title: "Build a Simple Neural Network with Python 3 and Numpy"
image: "images/content/django.png"
excerpt: "In this tutorial you'll learn to build and train a simple neural network with Python 3 and Numpy" 
tags : [ python , django ]
---

Throughout this practical tutorial we'll be learning about neural networks and we'll use Python 3 and Numpy to create a neural newtwork from scratch.

## Prerequisites

To complete this tutorial, you will need to have the following prerequisites:

- Python 3 and pip installed on your development machine,
- Knowledge of Python 3.

## Creating a Virtual Environemnt and Installing The Dependencies

Let's start by creating a virtual environment and installing the dependecies. Open a new terminal and run the following command to create your virtual environment:

```bash
$ python3 -m venv .env
```

Next, activate the virtual environment using the following command:

```bash
$ source .env/bin/activate
```

Next, we need to install `numpy` using `pip`:

```bash
$ pip install numpy
```

## Creating and Running a Simple Python 3 Application

Let's start by creating a simple Python script. In your terminal, create a folder and a Python file:

```bash
$ mkdir python-neural-network
$ cd python-neural-network
$ touch main.py
```

Open the `main.py` file and the following code for a basic Python program:

```python
if __name__ == "__main__":
    print("Neural Network v1.0")
```

If you run the `main.py` script using Python in your terminal:

```bash
$ python main.py
```

You should see **Neural Network v1.0** printed.

## Binary Classification Problems & Neural Networks

In this tutorial we'll use a binary classification problem and we'll be looking for a solution using a neural network.

In machine learning, classification is a technique for categorizing some data into separate classes/categories. In terms of mathematics, you can classify objects by defining an approximate mapping function between input and output.


In a binary classification problem we can classify things in two classes no more. This requires a simple neural network. 


> **Note**: As the number of classes grow the complexity of the neural network grows.


You can classify objects, persons, animals and abstract concepts, etc. For example:

- A person may be diabatic or not diabatic. 
- An email address may be spam or not spam.
- A person may be male or female and so on. 

In the first example, we have two classes: **diabatic** or **not diabatic** which can be encoded with 1 (true) or 0 (false).

In the second example, we have two classes: **spam** or **not spam** which can be encoded with 1 (true) or 0 (false) so you may guess why we call them **binary classification** problems.

In the third example we have also two classes, **male** or **female**. We can assign 1 for male and 0 for female or the inverse. 

> You can see that all classes are actually just labels so we can simply encode our data as zeros and ones and then assign a label to each code.

A classifier or classification algorithm makes use of training data to figure out how input relates to output (set of classes)  

Continuing with our previous example, we need to provide some data about actual spam and non-spam emails or diabtic or non-diabatic persons etc. This is called training data because it's used to train the algorithm or teach it to classify data. 

Classification is a **supervised learning** algorithm. Unlike **unsupervised learning* the outputs are also provided with the input in the training data. 

Classification is applied in many areas like marketing and medical diagnosis etc.

## Lazy and Eager Learners

Classificiation algorithms can be divided in two categories: **Lazy learners** and **Eager learners**. They simply make use of the provided training data in two different ways.

For lazy learning algorithms, training data is kept until there is a problem solving task in which case the classifier makes use of some techniques to choose the most related data in the provided training data to make a decision.

For eager learning algorithms, a classification mapping is created based on the training data before doing any problem solving tasks and then will be applied to solve any provided problem. 

> **Eager learners need to  train a model before trying to do any predictions.**


One of the most popular eager learning algorithms is **Artificial Neural Networks**.

## What is an Artificial Neural Network

>Artificial Neural Network is a set of connected input/output units where each connection has a weight associated with it started by psychologists and neurobiologists to develop and test computational analogs of neurons. During the learning phase, the network learns by adjusting the weights so as to be able to predict the correct class label of the input tuples.

There are many types of neural networks, such as:

- Feed-forward neural networks, 
- Convolutional neural networks, 
- Recurrent neural networks, etc.

A neural network can have multiple hidden layers depending on the complexity of the mapping function.  

A deep neural network is an example of a neural network with multiple hidden layers.



>Neural networks (NN), also called artificial neural networks (ANN) are a subset of learning algorithms within the machine learning field that are loosely based on the concept of biological neural networks.

>Basically, an ANN comprises of the following components:

An input layer that receives data and pass it on
A hidden layer
An output layer
Weights between the layers
A deliberate activation function for every hidden layer. In this simple neural network Python tutorial, we’ll employ the Sigmoid activation function.

>There are several types of neural networks. In this project, we are going to create the feed-forward or perception neural networks. This type of ANN relays data directly from the front to the back.

>Training the feed-forward neurons often need back-propagation, which provides the network with corresponding set of inputs and outputs. When the input data is transmitted into the neuron, it is processed, and an output is generated.

![](https://www.kdnuggets.com/wp-content/uploads/simple-neural-network.png)

## Creating a Python Class for A Neural Network

According to the basic definition of a neural network, let's create the following Python class the represents a neural network:

```python
class NeuralNetwork:
    def __init__(self, x, y):
        self.input      = x
        self.weights1   = np.random.rand(self.input.shape[1],4) 
        self.weights2   = np.random.rand(4,1)                 
        self.y          = y
        self.output     = np.zeros(y.shape)
```   

## Describing the Problem

Let's see the simple problem we want to solve with our neural network.

We want to develop 

https://www.kdnuggets.com/2018/10/simple-neural-network-python.html

https://medium.com/technology-invention-and-more/how-to-build-a-simple-neural-network-in-9-lines-of-python-code-cc8f23647ca1
