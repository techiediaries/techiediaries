---
layout: bpost
title: "GitHub Actions: Workflow Manual and HTTP Post Triggers with workflow_dispatch and repository_dispatch"
image: "images/content/blazor.png"
excerpt: "In this article, we'll show you how to trigger your GitHub Actions workflow manually and by sending an HTTP POST request with workflow_dispatch and repository_dispatch"
date: 2020-09-02
tags : [git, github]
---

In this article, we'll show you how to trigger your GitHub Actions workflow manually and by sending an HTTP POST request with workflow_dispatch and repository_dispatch.

A [new manual trigger feature was added](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/%2069) as of July 2020 by GitHub to its GitHub Actions workflows. 

This manual trigger can be used to run a workflow either from the user interface (The “Actions” tab), or by sending an HTTP POST request which enables developers to trigger their workflow from outside GitHub.

## How to Manually Trigger a GitHub Actions Workflow

You can manually trigger your workflow using two types of actions:

- `workflow_dispatch` for triggering a specific workflow event.
- `repository_dispatch` for triggering all established workflows on the repository.

In our example, we'll assume we only have one workflow, so we'll be using the `repository_dispatch` event.


>You can now create workflows that are manually triggered with the new workflow_dispatch event. You will then see a ‘Run workflow’ button on the Actions tab, enabling you to easily trigger a run. You can choose which branch the workflow is run on. [Source](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/)

Head over to your project, and open the `<workflow>.yml` file. On the section that defines how the workflow will start, add the `repository_dispatch` trigger as follows:

```yaml
on:
  push:
    branches:
      - master
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - master
  repository_dispatch:
```

You can also specify types of events for the `repository_dispatch` event:
	
```yaml
on:
  push:
    branches:
      - master
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - master
  repository_dispatch:
    types: [backend_automation]
```

This will enables you to start your workflow using an HTTP post from outside GitHub. 

Next, let's also add the `workflow_dispatch` to enable starting the workflow from the user interface as follows:

```yaml
on:
  push:
    branches:
      - master
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - master
  repository_dispatch:
    types: [backend_automation]
  workflow_dispatch:
```


Finally, we need to change the `if` condition of `build_and_deploy_job` to include the `repository_dispatch` and `workflow_dispatch` events as follows:

```yaml
jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed') || github.event_name == 'repository_dispatch' || github.event_name == 'workflow_dispatch'
```

Now you can go an trigger the workflow from the GitHub user interface. 

## Understanding how to Manually Trigger GitHub Actions Workflows with HTTP Requests

You can trigger a GitHub Actions workflow manually by sending a `repository_dispatch` event. You can then run your GitHub Actions workflows using your predefined events.

You can manually trigger a `repository_dispatch` event, by sending a POST reauest to the following GitHub API endpoint:

```
POST /repos/:owner/:repo/dispatches
```

For example, using our example repository named `angular-bootstrap-demo`, with our GitHub username (techiediaries), we need to send an HTTP  Post request to the following endpoint:

```bash
https://api.github.com/repos/techiediaries/angular-bootstrap-demo/dispatches
```

Next, we'll see a detailed, example of triggering a `repository_dispatch` event using cURL to send an HTTP Post request.


## Starting the GitHub Actions Workflow Using an HTTP Post Request

To trigger the workflow by sending an http request, you need to get an access token that allows you to authenticate your request with GitHub instead of a password.

Access tokens are used for authentication in place of a password with the command line or with the GitHub API.

This access token should have a repository scope and can be generated from the **Developer settings** by following this [guide](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

Make sure to generate a token with `public_repo` and `workflow` scopes.

Finally, you can send an http request to trigger the workflow as follows:

```bash
curl \
-X POST \
-H "Accept: application/vnd.github.v3+json" \
-H "Authorization: token <your-token>" \
https://api.github.com/repos/:user/:repo/dispatches \
-d '{"event_type":"<your-event-type>"}'
```

Make sure to specify your access token, user, repo and event type which you used in the workflow.

## Conclusion

In this article, we've seen how to manually trigger a GitHub Actions workflow using the **Actions** tab in your repository or by sending an HTTP Post request after generating an access token with repository and workflow scopes for authentication to GitHub.