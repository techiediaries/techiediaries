---
layout: bpost
title: "VS Code: Automatically Organize TypeScript Imports"
image: "images/content/angular.png"
excerpt: "In this quick tip, we'll see how to configure VS Code to automatically organize TypeScript imports upon saving your source code files"
date: 2020-09-06
tags : [angular, typescript, vscode]
---

In this quick tip, we'll see how to configure VS Code to automatically organize TypeScript imports upon saving your source code files.

VS Code allows you to remove any unused TypeScript imports, sort existing imports by name and file paths.

## VS Code: Automatically Organize TypeScript Imports

You can configure VS Code automatically organize TypeScript imports by following these simple steps.

First, open the settings using ⇧⌘P or Ctrl+Shift+P, search for `Preferences: Configure Language Specific Settings...` Press `Enter` on your keyboard then search for `TypeScript`. This will open the `settings.json file` where you need to simply add the following settings:

```json
"[typescript]": {
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    }
},
"[typescriptreact]": {
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    }
}
```

This instructs VS Code to automatically organize TypeScript imports when saving the `.ts` and `.tsx` files.