---
layout: post
url: /render-pdf-documents-node-js
title: Creating and Rendering PDF Documents with Node.js and PDFKit
author: mrnerd
tags : nodejs
---

In this tutorial you will learn to create and render PDF with JavaScript and Node.js. 

Rendering PDF documents is a task that you'll often need to do when building web applications that deals with PDF files. For example your applications may need to generate an invoice order as PDF.

In this tutorial, I'll introduce you to the PDFKit library to you can use to quickly create PDF files with JavaScript and Node.js

## Rendering PDF Documents with PDFKit

This library can be used to render PDF documents with ease,it works both on browser and on Node.js,you can create complex and multipages documents .If you are working with Node.js you can easily install via npm:

```bash
npm install pdfkit
```

Key features of this library are:

- you can work with Text
- you can work with vector graphics
- Font and Image embedding
- Annotations

### How to use PDFKit

```js
PDFDocument = require('pdfkit');

# Create a new document
doc = new PDFDocument();
Create your new document 

# Create a new PDF document
var doc = new PDFDocument();

# Pipe its output to a file
doc.pipe(fs.createWriteStream('output.pdf'));
You can create a page and add text with simple API and then finalize your doc 

# Add some text with annotations
doc.addPage()
   .fillColor("blue")
   .text('Here is a link!', 100, 100)
   .underline(100, 100, 160, 27, color: "#0000FF")
   .link(100, 100, 160, 27, 'http://google.com/');

# Finalize PDF file
doc.end();
```

For more information about PDFKit visit its official website.

PDFKit is available free and open source under the MIT license.

As you can see that working with PDFKit is easy, you can generate PDF documents with simple API and few lines of code.   





   
