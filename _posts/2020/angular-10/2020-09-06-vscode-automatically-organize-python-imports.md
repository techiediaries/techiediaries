---
layout: post
title: "VS Code: Automatically Organize Python Imports"
image: "images/content/python.png"
excerpt: "In this quick tip, we'll see how to configure VS Code to automatically organize Python imports upon saving your source code files"
date: 2020-09-06
tags : [python, django, vscode]
---

In this quick tip, we'll see how to configure VS Code to automatically organize Python imports upon saving your source code files.


## VS Code: Automatically Organize Python Imports

You can configure VS Code to automatically sort and organize Python imports upon saving files.

First need to install the `isort` package system-wide using the following command:

```bash
$ pipenv install isort --dev
```

Open the settings using `⇧⌘P` or `Ctrl+Shift+P`, next search for  `Preferences: Configure Language Specific Settings...`. Press `Enter` and then search for `Python`. In the `settings.json` file that will be opened, add the following settings:

```json
"[python]": {
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    }
}
```

Now upon saving files with the `.py` extension, VS Code will automatically  sort and organize the imports.
