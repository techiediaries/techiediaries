---
layout: bpost
title: "Enable JSON with Comments in VS Code"
image: "images/content/angular.png"
excerpt: "In this article, we'll see how to enable JSON comments in VS Code."
date: 2020-09-04 23:19
tags : [angular]
---


[JSON doesn't support comments](https://www.techiediaries.com/json-comments/) by default but some parsers and apps allow you to add comments especially that JSON is nowadays used for configuration files where comments can be very useful.

If you use Visual Studio Code IDE, comments can't be added to JSON files by default but you can enable them by setting JSONC (JSON with Comments) as the parser in VS Code. 

If you edit a JSON file that contains comments. VS Code will outputs an error saying: "Comments are not permitted in JSON."


Let's see how to enable JSON comments.

## Setting JSON with Comments In VS Code

Click on JSON at the bottom-right corner then type jsonc to use the JSON with Comments file association.

You can also configure JSONC for all JSON files by adding the following settings:

```json
"files.associations": {
    "<specific file>.json": "jsonc"
}
"files.associations": {
    "*.json": "jsonc"
}
```
