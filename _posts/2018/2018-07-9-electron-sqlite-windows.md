---
layout: post
title: "Building SQLite 3 for Electron in Windows"
image: "images/content/electron.png"
excerpt: "In this tutorial, we'll see how to use SQLite 3 with Electron. We'll specifically look at how to setup SQLIte 3 to work with Electron in a Windows development environment. " 
tags : "electron"
---

In this tutorial, we'll see how to use SQLite 3 with Electron. We'll specifically look at how to setup SQLIte 3 to work with Electron in a Windows development environment.    

Installing Electron is straightforward and easy but unfortunately that's not the case for SQLite 3 as it requires compiling to target the Electron ABI for Windows.

In nutshell. The steps required for setting up SQLIte 3 with Electron are: 

- Step 1: Installing Node.js and NPM for Windows
- Step 2: Installing Electon, electron-prebuilt and electron-rebuild 
- Step 3: Installing SQLite 3
- Step 4: Installing node-gyp
- Step 5: Installing python 2.7 and visual c++ dependencies
- Rebuild sqlite3 using `electron-rebuild -f -w sqlite3`
