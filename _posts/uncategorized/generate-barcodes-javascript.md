---
layout: post
title: "How To Generate Barcodes with JavaScript In The Browser and Node.js"
image: "images/content/generate-barcodes-javascript.png"
excerpt: "Generating Barcodes in JavaScript using Lindell's JsBarcode browser and Node.js library" 
tags : [javascript]
---

{% include image.html 
    img="images/content/generate-barcodes-javascript.png" 
    title="Generate Barcodes In JavaScript" 
%}

In this tutorial we are going to see how to generate Barcodes with JavaScript in both the browser and Node.js 

We are going to build two demo projects which showcase how to generate barcodes ,one for browsers and the 
other one for Node.js 

So lets get started .

Generating Barcodes on the browser demo 
--------------------------------------------
--------------------------------------------

Barcodes are 1-Dimension encoding formats used to encode information about products in different industrial 
areas but since the algorithms to generate those ,with different types ,barcodes are quite complex ,we are 
not going to reinvent the wheel .There are already many popular and open source libraries which implement 
different formats of Barcodes and we are going to use one of them available from GitHub .

But first lets setup our simple project scaffolding .

Using your terminal or command prompt .

Create a folder for this demo project .         

Create a libs folder which hosts our external libs .

Create an index.html file then copy and paste the following HTML code inside it .

