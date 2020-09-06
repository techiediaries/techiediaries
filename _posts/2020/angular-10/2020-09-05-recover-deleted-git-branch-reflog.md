---
layout: bpost
title: "Recover a Deleted Git Branch with Reflog"
image: "images/content/angular.png"
excerpt: "In this article, we'll see how to enable JSON comments in VS Code."
date: 2020-09-05 
tags : [angular]
---

In this quick tip, we'll see how to recover a removed Git branch using Reflog

First, run the following command to display the SHA1 of your commits:

```bash
$ git reflog
```

Look for the SHA1 code of your deleted branch and then run the following command:

```bash
$ git branch <sha1>
```

This will recover your deleted branch.