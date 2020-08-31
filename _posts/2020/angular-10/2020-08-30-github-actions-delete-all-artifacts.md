---
layout: bpost
title: "How to Delete All Artifacts in GitHub Actions"
image: "images/content/blazor.png"
excerpt: "A quick example to show you how to delete all artifacts in GitHub Actions"
date: 2020-08-30
tags : [git, github]
---

A quick example to show you how to delete all artifacts in GitHub Actions.

We'll see how you can delete artifacts on GitHub Actions to avoid the storage limitations for private repositories.

## Introducing GitHub Actions

Github Actions is a CI service similar to other CI systems such as CircleCI, or Travis.  You can define your jobs in a yaml file inside your GitHub repository and instructs GitHub to automatically build, test and deploy your app on trigger events such as push and pull requests. 

In case you are using GitHub Actions with public repositories, you take benefit of unlimited computing time and unlimited storage but that's not the case with private repositories. For example for storage there is a limit of 500 MB.

## Artifacts

GitHub Actions provide *Artifacts* which are created when you need to temporarily store data to use in your job(s). Artifacts also count against the quota.

Previosuly you had to wait for 90 days for artifacts to auto-expire and free the taken space but recently GitHub added a new API endpoint for artifact deletion. This will allow you to keep your storage under limit on private GitHub repositories so you don't have to pay for the extra storage.

Let's now see how you can delete artifacts using two actions available from GitHub marketplace.

## Delete All Build Artifacts on Nightly Cleanups 

You can use nightly cleanups on your repositories to delete all build artifacts older than than a a number of days. 

You can delete all artifacts using the `kolpav/purge-artifacts-action`.

Simply add a `.github/workflows/nightly_cleanup.yml` file with the following configuration to your repository to trigger the `purge-artifacts-action` action in regular intervals and it will take care of deleting all artifacts older than your chosen number of days:

```yaml
name: 'nightly artifacts cleanup'
on:
  schedule:
    - cron: '0 1 * * *' # every night at 1 am UTC

jobs:
  delete-artifacts:
    runs-on: ubuntu-latest
    steps:
      - uses: kolpav/purge-artifacts-action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          expire-in: 7days # Set this to 0 to delete all artifacts
```


You can also check the [delete-run-artifacts](https://github.com/marketplace/actions/delete-run-artifacts) action which will help you delete all artifacts created by or attached to a workflow run once the run has completed. It works by spawning a separate workflow using a webhook. See this [link](https://github.com/marketplace/actions/delete-run-artifacts#how-to-use) for how to use this action.

