---
layout: bpost
title: "Get Current Branch Name in GitHub Actions with GITHUB_REF and Bash"
image: "images/content/blazor.png"
excerpt: "A quick example to show you how to get the current branch name in GitHub Actions with GITHUB_REF and Bash"
date: 2020-08-30
tags : [git, github]
---

Say you need to get current branch name in your GitHub Actions workflow.

You can use the `GITHUB_REF` variable which contains a full path like `refs/heads/feature-branch-1` but you need only the last pah segment i.e `feature-branch-1`.

You need to add a step for extracting the branch name from the `$GITHUB_REF` variable and make it the step output as follows:

```yaml
- name: Extract branch name
  shell: bash
  run: echo "##[set-output name=branch;]$(echo ${GITHUB_REF#refs/heads/})"
  id: extract_branch
```  


Please note that if you are using a pull request trigger to run your GitHub action, the `GITHUB_REF` variable will contain something like `refs/pull/421/merge` so if you will try to git push to that name it will most likely fail.

As a solution, you can use references on the GitHub context in your YAML e.g. `${{ github.head_ref }}`.

You can also use the [nelonoel/branch-name](https://github.com/nelonoel/branch-name) action as follows:

```yaml
name: build
on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - run: npm ci
    - uses: nelonoel/branch-name@v1
    # Use branch name for whatever purpose
    - run: echo ${BRANCH_NAME}
```

This is another example of a workflow for `push` and `pull_request` triggers:

```yaml
name: getBranchName
on: [pull_request, push]

jobs:
  which_branch:
    runs-on: ubuntu-latest
    steps:
      # extract branch name
      - name: Extract branch name
        if: github.event_name != 'pull_request'
        shell: bash
        run: echo "::set-env name=BRANCH_NAME::$(echo ${GITHUB_REF#refs/heads/})"
        id: extract_branch

      # extract branch name on pull request
      - name: Print branch name
        if: github.event_name == 'pull_request'
        run: echo "::set-env name=BRANCH_NAME::$(echo ${GITHUB_HEAD_REF})"

      # print branch name
      - name: Get branch name
        run: echo 'The branch name is' $BRANCH_NAME

```

## References

- [Stackoverflow](https://stackoverflow.com/questions/58033366/how-to-get-current-branch-within-github-actions)
