---
layout: bpost
title: "GitHub Actions & Angular 10/9: Install Node.js, Angular CLI and Deploy your App to GitHub Pages"
image: "images/content/angular.png"
excerpt: "In this quick example, we'll see how to use Github Actions to install Node.js and Angular CLI and deploy our Angular application to GitHub pages"
date: 2020-09-04
tags : [angular]
---

In this example, we'll see how to use Github Actions to install Node.js and Angular CLI 10 and then build and deploy our Angular 10 application or any previous version to GitHub pages.

## Step 1: Creating a GitHub Actions Workflow

Head over to your GitHub repository, next go to the **Actions** tab and set up a workflow by clicking on the **set up a workflow yourself** link as below:

![GitHub Actions Set up Workflow](https://www.techiediaries.com/assets/images/github-actions-setup-workflow.png)

You'll be taken to the following UI:

![GitHub Actions New Workflow](https://www.techiediaries.com/assets/images/new-github-actions-workflow.png)

A workflow named `main.yml` will be created inside the `.github/workflows` folder of our repository with the following content:

```yaml
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      # Runs a single command using the runners shell
      - name: Run a one-line script
        run: echo Hello, world!

      # Runs a set of commands using the runners shell
      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.

```

The workflow is made up of a single job with two steps that simply print some messages on the shell of a Ubuntu runner. 

## Step 2: Installing Node.JS and Angular CLI and Deploying to GitHub Pages

Let's modify the previous workflow to install Node.js and Angular CLI 10 and then build our project and deploy it to the web. 

{% raw %}
```yaml
name: CI
on:
  push:
    branches: [ master ]
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - uses: actions/setup-node@v1 #this will install Node and npm on Ubuntu
      with:
        node-version: '12.x'
    - run: npm install
    - run: npm install -g @angular/cli > /dev/null
    - run: ng build --prod --output-path=dist --base-href="https://techiediaries.github.io/angular-bootstrap-demo/"
    - name: Publish generated content to GitHub Pages
      uses: tsunematsu21/actions-publish-gh-pages@v1.0.1
      with:
          dir: dist
          branch: gh-pages
          token: ${{ secrets.ACCESS_TOKEN }}
```
{% endraw %}

We use the [tsunematsu21/actions-publish-gh-pages]() to deploy our app to GitHub pages. This action will need an access token that needs to be generated from your GitHub account's settings page.

## Step 3: Generating a New Access Token

Go to [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new) and generate a new token with the `repo` scope and make sure to copy it.

## Step 4: Creating a New Secret for Access Token

Next, head over to your repository' **Settings** tab, and next go to **Secrets** and create a **New secret**:  

![GitHub Secrets](https://www.techiediaries.com/assets/images/github-settings-secrets.png) 
Name your secret `ACCESS_TOKEN` and paste your access token.

## Step 5: Pushing and Starting your Workflow 

Finally, commit your workflow file to your repo. The workflow will start automatically since it's configured to start when we push code to the repo.

Go to the **Actions** tab to see the state of your build workflow:

![GitHub Workflow Progress](https://www.techiediaries.com/assets/images/github-workflow-progress.png)

You can even visualize when the steps of the build job are running:


![GitHub Workflow Progress](https://www.techiediaries.com/assets/images/github-actions-job-progress.png)

When completed successfully, you should have a `gh-pages` branch created in your repository that contains the content of the `dist` folder of our Angular application after being built with the previous build job.

See the app running from [https://techiediaries.github.io/angular-bootstrap-demo](https://techiediaries.github.io/angular-bootstrap-demo/).

## Conclusion

We've successfully published our Angular application to GitHub Pages using GitHub Actions. We've seen how to install Node.js, Angular CLI and build our Angular application for production inside a Ubuntu runner.
