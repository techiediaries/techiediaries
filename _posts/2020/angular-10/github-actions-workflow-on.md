---
layout: bpost
title: "GitHub Actions Workflow Event Triggers with On"
image: "images/content/angular.png"
excerpt: ""
date: 2020-09-15
tags : [git , github]
---

>Github Actions enables you to create custom software development lifecycle workflows directly in your Github repository. These workflows are made out of different tasks so-called actions that can be run automatically on certain events.

>This enables you to include Continues Integration (CI) and continuous deployment (CD) capabilities and many other features directly in your repository.


>In this article, we are going to look at the core concepts of Github Actions and even dive into creating your own custom workflows.


Actions:
Actions are the smallest portable building block of a workflow and can be combined as steps to create a job. You can create your own Actions or use publicly shared Actions from the Marketplace.

Event:
Events are specific activities that trigger a workflow run. For example, a workflow is triggered when somebody pushes to the repository or when a pull request is created. Events can also be configured to listen to external events using Webhooks.

Runner:
A runner is a machine with the Github Actions runner application installed. Then runner waits for available jobs it can then execute. After picking up a job they run the job's actions and report the progress and results back to Github. Runners can be hosted on Github or self-hosted on your own machines/servers.

Job:
A job is made up of multiple steps and runs in an instance of the virtual environment. Jobs can run independently of each other or sequential if the current job depends on the previous job to be successful.

Step:
A step is a set of tasks that can be executed by a job. Steps can run commands or actions.

Workflow:
A Workflow is an automated process that is made up of one or multiple jobs and can be triggered by an event. Workflows are defined using a YAML file in the .github/workflows directory.


Creating a workflow file:
Workflows can be created inside the .github/workflows directory by adding a .yml workflow file. For example, add .github/workflows/continuous-deployment.yml to your project.

After creating the file you can start working on your workflow.

Here are the most important concepts for the workflow file.

Name:

The name of your workflow that is displayed on the Github actions page. If you omit this field, it is set to the file name.

name: Continuous Deployment
On:

The on keyword defines the Github events that trigger the workflow. You can provide a single event, array or events or a configuration map that schedules a workflow.

on: push
# or
on: [pull_request, issues]
Jobs:

A workflow run is made up of one or more jobs. Jobs define the functionality that will be run in the workflow and run in parallel by default.

jobs:
  my-job:
    name: My Job
    runs-on: ubuntu-latest
    steps:
    - name: Print a greeting
      run: |
        echo Hello there!
More about that in a later section.